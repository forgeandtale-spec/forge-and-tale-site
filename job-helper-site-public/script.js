const pageHeader = document.querySelector(".site-header");
const scrollButtons = document.querySelectorAll("[data-scroll-target]");

function getHeaderOffset() {
  return (pageHeader?.offsetHeight || 0) + 16;
}

function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { scrollTarget } = button.dataset;
    if (!scrollTarget) {
      return;
    }

    smoothScrollTo(scrollTarget);
  });
});

document.querySelectorAll('a[href^="#"], .brand[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href) {
      return;
    }

    event.preventDefault();
    smoothScrollTo(href);
  });
});
