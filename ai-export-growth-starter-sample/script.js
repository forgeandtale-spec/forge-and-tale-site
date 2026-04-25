const CONTACT_MESSAGE = "请通过微信联系：AI-GTM\n可直接发送你的产品链接、产品介绍或目标市场假设。";

const scrollTriggers = document.querySelectorAll("[data-scroll-target]");
const contactTriggers = document.querySelectorAll("[data-contact-trigger]");

scrollTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetId = trigger.getAttribute("data-scroll-target");
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

contactTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    window.alert(CONTACT_MESSAGE);
  });
});
