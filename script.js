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

_