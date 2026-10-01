import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@12.34.0/+esm";

const headers = document.querySelectorAll(".hero__heading");

headers.forEach((h1) => {
  // Split text into words, then split words into individual letter spans
  h1.innerHTML = h1.textContent
    .trim()
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="word">${word
          .split("")
          .map((char) => `<span>${char}</span>`)
          .join("")}</span>`
    )
    .join(" ");

  
  // Trigger animation for each header when it enters view
  inView(h1, () => {
    animate(
      h1.querySelectorAll("span span"), // Target only the letter spans for animation
      { opacity: [0, 1], y: [30, 0] },
      { 
        delay: stagger(0.025, { start: 0.3 }),
        type: "spring",
        stiffness: 500,
        damping: 20,
      }
    );
  });
});
