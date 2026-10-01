
const elements = document.querySelectorAll('.floating-box');

// Track mouse/touch coordinates
let mouse = { x: -1000, y: -1000, active: false };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
});

window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
    }
}, { passive: true });

// Initialize physics state for each element
const physicsObjects = Array.from(elements).map(el => {
    return {
        element: el,
        x: Math.random() * (window.innerWidth - 120),
        y: Math.random() * (window.innerHeight - 120),
        vx: (Math.random() - 0.5) * 3, // Initial horizontal velocity
        vy: (Math.random() - 0.5) * 3, // Initial vertical velocity
        width: 110,
        height: 110,
        friction: 0.98                // Slows down momentum gradually
    };
});

function updatePhysics() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    physicsObjects.forEach(obj => {
        // Apply velocity to position
        obj.x += obj.vx;
        obj.y += obj.vy;

        // Apply friction
        obj.vx *= obj.friction;
        obj.vy *= obj.friction;

        // Add a tiny random drift so they never completely freeze
        obj.vx += (Math.random() - 0.5) * 0.05;
        obj.vy += (Math.random() - 0.5) * 0.05;

        // Wall collisions (Bounce off screen borders)
        if (obj.x <= 0) {
            obj.x = 0;
            obj.vx *= -1; // Reverse direction
        } else if (obj.x >= screenWidth - obj.width) {
            obj.x = screenWidth - obj.width;
            obj.vx *= -1;
        }

        if (obj.y <= 0) {
            obj.y = 0;
            obj.vy *= -1;
        } else if (obj.y >= screenHeight - obj.height) {
            obj.y = screenHeight - obj.height;
            obj.vy *= -1;
        }

        // Cursor collision / Repulsion effect
        const centerX = obj.x + obj.width / 2;
        const centerY = obj.y + obj.height / 2;
        const dx = centerX - mouse.x;
        const dy = centerY - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 130; // Distance at which the cursor "hits" the element

        if (distance < repelRadius && mouse.active) {
            const angle = Math.atan2(dy, dx);
            const force = (repelRadius - distance) / repelRadius;
            
            // Push element away based on how close the cursor is
            obj.vx += Math.cos(angle) * force * 8;
            obj.vy += Math.sin(angle) * force * 8;
        }

        // Apply visual movement using hardware-accelerated CSS transform
        obj.element.style.transform = `translate3d(${obj.x}px, ${obj.y}px, 0)`;
    });

    requestAnimationFrame(updatePhysics);
}

// Start the animation loop
requestAnimationFrame(updatePhysics);