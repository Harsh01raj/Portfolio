// HARSH.SYS — interactive portfolio effects
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let width, height, columns, drops;
const chars = "01アイウエオカキクケコサシスセソタチツテト";
function resizeMatrix() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  columns = Math.floor(width / 18);
  drops = Array(columns).fill(1);
}
function drawMatrix() {
  ctx.fillStyle = "rgba(5, 9, 7, 0.075)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#39e879";
  ctx.font = "12px monospace";
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * 18, drops[i] * 18);
    if (drops[i] * 18 > height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(drawMatrix);
}
resizeMatrix();
drawMatrix();
window.addEventListener("resize", resizeMatrix);

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Mobile navigation.
const nav = document.getElementById("nav");
document.getElementById("menuToggle").addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));

// Custom cursor, disabled on touch devices via CSS.
const cursor = document.getElementById("customCursor");
window.addEventListener("mousemove", (event) => {
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});
document.querySelectorAll("a, button").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.style.width = "34px";
    cursor.style.height = "34px";
  });
  item.addEventListener("mouseleave", () => {
    cursor.style.width = "18px";
    cursor.style.height = "18px";
  });
});

// Terminal-style welcome message.
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
window.addEventListener("load", () => {
  setTimeout(() => showToast("SYSTEM MESSAGE: WELCOME TO HARSH.SYS"), 900);
});
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("href");
    if (target && target.length > 1) {
      const section = document.querySelector(target);
      if (section) showToast(`ACCESSING MODULE: ${section.id.toUpperCase()}`);
    }
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
