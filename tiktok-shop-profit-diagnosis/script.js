document.documentElement.classList.add("js-ready");

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll("[data-reveal]").forEach((element) => {
  if (observer) {
    observer.observe(element);
  } else {
    element.classList.add("is-visible");
  }
});

const copyButtons = document.querySelectorAll("[data-copy]");

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy") || "";

    try {
      await navigator.clipboard.writeText(value);
      button.textContent = "已复制";
    } catch (error) {
      button.textContent = "复制失败，请手动复制";
    }

    window.setTimeout(() => {
      button.textContent = "复制微信号";
    }, 1800);
  });
});

const leadForm = document.getElementById("lead-form");
const feedback = document.getElementById("form-feedback");

if (leadForm && feedback) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "信息已记录，请直接通过微信或邮箱继续沟通样例诊断需求。";
  });
}
