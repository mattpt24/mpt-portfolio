// Initialize the Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    // Check if the section has entered the viewport
    if (entry.isIntersecting) {
      // Add the 'active' class which triggers all CSS transitions
      entry.target.classList.add('active');
      
      // Stop observing once the animation has played out
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.95
});

// Target all elements with the 'cool-section' class
document.querySelectorAll('.has-observer').forEach(section => {
  observer.observe(section);
});