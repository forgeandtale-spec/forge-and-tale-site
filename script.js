const analysisForm = document.querySelector("#job-analysis-form");
const previewResultButton = document.querySelector("#preview-result-button");
const resultsSection = document.querySelector("#results");
const formFeedback = document.querySelector("#form-feedback");

const overviewMajor = document.querySelector("#overview-major");
const overviewGrade = document.querySelector("#overview-grade");
const overviewRole = document.querySelector("#overview-role");
const resultSummary = document.querySelector("#result-summary");
const resumeIssuesList = document.querySelector("#resume-issues-list");
const jobSuggestionsList = document.querySelector("#job-suggestions-list");
const interviewTipsList = document.querySelector("#interview-tips-list");

const openContactModalButton = document.querySelector("#open-contact-modal");
const closeContactModalButton = document.querySelector("#close-contact-modal");
const contactModal = document.querySelector("#contact-modal");
const contactForm = document.querySelector("#contact-form");
const contactFeedback = document.querySelector("#contact-feedback");

const toggleWechatPanelButton = document.querySelector("#toggle-wechat-panel");
const wechatPanel = document.querySelector("#wechat-panel");

const scrollButtons = document.querySelectorAll("[data-scroll-target]");
const pageHeader = document.querySelector(".site-header");

const sampleResult = {
  major: "市场营销",
  grade: "大三",
  targetRole: "内容运营",
  mainConcern: "不知道简历怎么改，也不确定自己的岗位方向是不是合适",
  resumeIssues: [
    "经历描述过于笼统，缺少结果和数据支撑",
    "技能部分不够清晰，岗位相关性偏弱",
    "项目经历结构不完整，重点不突出"
  ],
  jobSuggestions: [
    "你更适合从运营、销售支持、用户增长等岗位切入",
    "当前目标岗位和你的现有经历匹配度一般，建议补强相关经历",
    "建议优先搜索这些关键词：运营助理 / 用户运营 / 内容运营 / 实习生"
  ],
  interviewTips: [
    "请介绍一下你自己",
    "为什么想投这个岗位",
    "你过去做过的最有结果的一件事是什么",
    "如果面试官追问项目细节，你应该如何回答"
  ]
};

function getHeaderOffset() {
  return (pageHeader?.offsetHeight || 0) + 20;
}

function smoothScrollTo(selector) {
  const target = document.querySelector(selector);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

function setFieldErrorState(field, hasError) {
  field.classList.toggle("is-invalid", hasError);
}

function clearFieldErrorStates(form) {
  form.querySelectorAll(".is-invalid").forEach((field) => {
    field.classList.remove("is-invalid");
  });
}

function validateRequiredFields(form) {
  const requiredFields = Array.from(form.querySelectorAll("[required]"));
  let isValid = true;

  requiredFields.forEach((field) => {
    const hasError = !field.value.trim();
    setFieldErrorState(field, hasError);

    if (hasError) {
      isValid = false;
    }
  });

  return isValid;
}

function renderList(element, items) {
  element.innerHTML = "";

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    element.appendChild(listItem);
  });
}

function containsAnyText(source, keywords) {
  return keywords.some((keyword) => source.includes(keyword));
}

function buildAnalysisResult(formData) {
  const major = formData.get("major").trim();
  const grade = formData.get("grade").trim();
  const targetRole = formData.get("targetRole").trim();
  const resumeContent = formData.get("resumeContent").trim();
  const mainConcern = formData.get("mainConcern").trim();
  const combinedText = `${targetRole} ${resumeContent} ${mainConcern}`.toLowerCase();

  const resumeIssues = [];
  const jobSuggestions = [];
  const interviewTips = [];

  if (resumeContent.length < 80) {
    resumeIssues.push("简历内容偏少，信息不够支撑岗位判断，建议补充经历、项目和技能。");
  } else {
    resumeIssues.push("已有简历信息基础尚可，但经历表达还可以进一步压缩并突出重点。");
  }

  if (!/\d/.test(resumeContent)) {
    resumeIssues.push("经历中缺少数据、结果或量化表达，建议补充具体成果。");
  } else {
    resumeIssues.push("你已经有部分结果表达，接下来可以统一用更清晰的结构呈现。");
  }

  if (!containsAnyText(combinedText, ["项目", "实习", "活动", "比赛", "学生会"])) {
    resumeIssues.push("项目或实践经历信号偏弱，建议增加能体现执行力和成果的案例。");
  } else {
    resumeIssues.push("项目或实践经历有一定基础，但还需要更贴近目标岗位来表达。");
  }

  if (containsAnyText(combinedText, ["运营", "新媒体", "内容", "用户", "增长"])) {
    jobSuggestions.push(`从你的信息看，"${targetRole}"方向可以继续尝试，但更适合从执行型或助理型岗位切入。`);
    jobSuggestions.push("建议优先关注内容运营、用户运营、社群运营、增长运营等更容易积累成果的岗位。");
    jobSuggestions.push("搜索关键词可优先尝试：运营助理 / 内容运营 / 用户运营 / 实习生。");

    interviewTips.push("为什么想做运营类岗位？你对这个岗位的理解是什么？");
    interviewTips.push("你过去是否做过拉新、内容策划、活动执行或数据复盘相关事情？");
  } else if (containsAnyText(combinedText, ["开发", "java", "前端", "后端", "测试", "算法", "产品"])) {
    jobSuggestions.push(`你的目标岗位是"${targetRole}"，建议优先补强与项目经历、技能栈和岗位要求之间的对应关系。`);
    jobSuggestions.push("如果是技术或产品方向，简历需要明确项目背景、你的职责、技术方案和结果。");
    jobSuggestions.push("搜索关键词可优先尝试：实习生 / 初级岗位 / 校招 / 对口技术方向。");

    interviewTips.push("请介绍一个你参与过的项目，并说明你具体负责了什么。");
    interviewTips.push("如果让你复盘一个项目，你会如何说明问题、方案和结果？");
  } else {
    jobSuggestions.push(`当前目标岗位是"${targetRole}"，建议先明确岗位职责，再检查自己经历是否能对上核心要求。`);
    jobSuggestions.push("如果暂时不确定方向，可以先从助理岗、支持岗、实习岗入手，快速积累一段对口经历。");
    jobSuggestions.push("投递时建议准备 2 到 3 个相邻岗位方向，避免只押一个岗位。");

    interviewTips.push("为什么想投这个岗位？你理解这个岗位的核心工作是什么？");
    interviewTips.push("你过去做过的最有结果的一件事是什么？如果重来一次你会怎么优化？");
  }

  if (containsAnyText(mainConcern, ["简历", "不会写", "怎么改"])) {
    interviewTips.push("如果面试官根据简历追问细节，你是否能讲清背景、动作和结果？");
  }

  if (containsAnyText(mainConcern, ["面试", "不会回答", "紧张"])) {
    interviewTips.push("请做一段 1 分钟自我介绍，并提前准备 2 个能体现优势的具体案例。");
  }

  if (["大一", "大二"].includes(grade)) {
    jobSuggestions.push("你目前处于较早阶段，建议优先积累校园项目、社团成果或短期实习经历。");
  } else if (["大三", "大四", "研一", "研二"].includes(grade)) {
    jobSuggestions.push("你当前阶段更适合尽快聚焦岗位方向，并准备完整的投递与面试素材。");
  }

  interviewTips.unshift("请介绍一下你自己。");

  return {
    major,
    grade,
    targetRole,
    mainConcern,
    resumeIssues: resumeIssues.slice(0, 3),
    jobSuggestions: jobSuggestions.slice(0, 3),
    interviewTips: interviewTips.slice(0, 4)
  };
}

function showResults(result, mode = "custom") {
  overviewMajor.textContent = result.major || "待填写";
  overviewGrade.textContent = result.grade || "待填写";
  overviewRole.textContent = result.targetRole || "待填写";

  if (mode === "sample") {
    resultSummary.textContent = "以下是示例分析结果，帮助你快速了解页面展示效果。";
  } else {
    resultSummary.textContent = `以下是基于你的专业、年级和目标岗位生成的初步建议。建议先处理最明显的问题，再继续优化投递方向。`;
  }

  renderList(resumeIssuesList, result.resumeIssues);
  renderList(jobSuggestionsList, result.jobSuggestions);
  renderList(interviewTipsList, result.interviewTips);

  resultsSection.classList.remove("is-hidden");
  smoothScrollTo("#results");
}

scrollButtons.forEach((button) => {
  button.addEventListener("click", () => {
    smoothScrollTo(button.dataset.scrollTarget);
  });
});

document.querySelectorAll('.top-nav a[href^="#"], .brand[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href) {
      return;
    }

    event.preventDefault();
    smoothScrollTo(href);
  });
});

previewResultButton.addEventListener("click", () => {
  showResults(sampleResult, "sample");
});

analysisForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formFeedback.textContent = "";
  formFeedback.classList.remove("is-success");

  const isValid = validateRequiredFields(analysisForm);
  if (!isValid) {
    formFeedback.textContent = "请先完整填写必填信息后再开始分析。";
    return;
  }

  const formData = new FormData(analysisForm);
  const result = buildAnalysisResult(formData);
  showResults(result);

  formFeedback.textContent = "分析完成，已为你生成初步建议。";
  formFeedback.classList.add("is-success");
});

analysisForm.querySelectorAll("input, select, textarea").forEach((field) => {
  const syncFieldState = () => {
    if (field.hasAttribute("required")) {
      setFieldErrorState(field, !field.value.trim());
    }
  };

  field.addEventListener("input", syncFieldState);
  field.addEventListener("change", syncFieldState);
});

function openContactModal() {
  const targetRoleField = analysisForm.elements.namedItem("targetRole");
  const contactRoleField = contactForm.elements.namedItem("contactRole");

  if (
    targetRoleField instanceof HTMLInputElement &&
    contactRoleField instanceof HTMLInputElement &&
    !contactRoleField.value.trim()
  ) {
    contactRoleField.value = targetRoleField.value.trim();
  }

  contactModal.hidden = false;
  contactModal.classList.remove("is-hidden");
  contactModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeContactModal() {
  contactModal.hidden = true;
  contactModal.classList.add("is-hidden");
  contactModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success");
}

openContactModalButton.addEventListener("click", openContactModal);
closeContactModalButton.addEventListener("click", closeContactModal);

contactModal.addEventListener("click", (event) => {
  if (event.target === contactModal) {
    closeContactModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !contactModal.classList.contains("is-hidden")) {
    closeContactModal();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactFeedback.textContent = "";
  contactFeedback.classList.remove("is-success");

  const isValid = validateRequiredFields(contactForm);
  if (!isValid) {
    contactFeedback.textContent = "请先填写完整信息后再提交。";
    return;
  }

  contactFeedback.textContent = "提交成功，我们会尽快联系你。";
  contactFeedback.classList.add("is-success");
  contactForm.reset();
  clearFieldErrorStates(contactForm);

  setTimeout(() => {
    closeContactModal();
  }, 1400);
});

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  const syncFieldState = () => {
    setFieldErrorState(field, field.hasAttribute("required") && !field.value.trim());
  };

  field.addEventListener("input", syncFieldState);
  field.addEventListener("change", syncFieldState);
});

toggleWechatPanelButton.addEventListener("click", () => {
  const isCollapsed = wechatPanel.classList.contains("is-collapsed");
  wechatPanel.classList.toggle("is-collapsed");
  toggleWechatPanelButton.textContent = isCollapsed ? "收起微信咨询方式" : "直接加微信咨询";
});
