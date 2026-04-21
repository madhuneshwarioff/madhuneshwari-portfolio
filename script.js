const glow = document.querySelector(".cursor-glow");
const revealItems = document.querySelectorAll(".reveal");
const tiltItems = document.querySelectorAll("[data-tilt]");
const magneticItems = document.querySelectorAll(".magnetic");
const hoverGlowItems = document.querySelectorAll(
  ".project-card, .cert-card, .glass-card, .skill-panel"
);

window.addEventListener("pointermove", (event) => {
  if (glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 40}ms`;
  observer.observe(item);
});

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    item.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

magneticItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.16;
    item.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

hoverGlowItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    item.style.setProperty("--mx", `${x}%`);
    item.style.setProperty("--my", `${y}%`);
  });
});
