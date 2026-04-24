const materialChecklistText = `可直接整理给我的资料：
1. 店里的项目和价格表
2. 客户最常问的 5-10 个问题
3. 平时回复客户的聊天截图，打码也可以
4. 常做的 3-5 张款式图
5. 现在怎么记录预约
6. 有没有新客活动、老客福利、闺蜜同行活动
7. 主要在哪里发内容：朋友圈、小红书、抖音、美团
8. 老客一般多久回来一次，是否会主动提醒`;

const scrollButtons = document.querySelectorAll("[data-scroll-target]");
const copyButton = document.getElementById("copyMaterialsButton");
const copyStatus = document.getElementById("copyStatus");

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-scroll-target");
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  const success = document.execCommand("copy");
  document.body.removeChild(textarea);
  return success;
}

function showCopyFeedback(message, isSuccess) {
  copyStatus.textContent = message;
  copyButton.textContent = isSuccess ? "已复制" : "复制资料清单";
  copyButton.disabled = false;
}

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    copyButton.disabled = true;
    copyButton.textContent = "复制中...";

    try {
      const success = await copyText(materialChecklistText);

      if (!success) {
        throw new Error("copy failed");
      }

      showCopyFeedback("资料清单已复制，可以直接发给客户或老板。", true);

      window.setTimeout(() => {
        copyButton.textContent = "复制资料清单";
      }, 1800);
    } catch (error) {
      showCopyFeedback("复制失败，请手动复制页面中的资料清单。", false);
    }
  });
}
