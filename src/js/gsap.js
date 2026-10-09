gsap.to(".about-hero__img", {
  // index 0 = -300px, index 1 = -600px, index 2 = -900px, index 3 = -1200px
  y: (index) => -300 * (index + 0.5), 
  rotate: 10,
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "+=1000",
    scrub: 1
  }
});


gsap.to(".overlay", {
  width: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "+=1000",
    scrub: 1,
    pin: true,
  }
});


import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@12.34.0/+esm"

inView(".about-hero__img", () => {
  animate(
    ".about-hero__img", 
    { opacity: [0, 1], y: [50, 0] }, 
    { 
      // 0.06s interval, 1s base delay
      delay: stagger(0.09, 1), 
      type: "spring",
      stiffness: 40, 
      damping: 8,    
      mass: 2,
    }
  );
});

