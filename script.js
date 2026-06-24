const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx1PYzFAmufvV3jR-_GJfSeoB_AR2MYhdc46AR9NKPuLvLnCZFkUl3H3qZru2eSGo4E/exec";

const form = document.querySelector("#signup-form");
const statusText = document.querySelector("#form-status");
const submitButton = form.querySelector("button");

function setStatus(message, type = "") {
  statusText.textContent = message;
  statusText.className = `form-status ${type}`.trim();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!APPS_SCRIPT_URL) {
    setStatus("尚未設定 Apps Script Web App URL，請先完成 Google Sheet 部署。", "error");
    return;
  }

  const payload = Object.fromEntries(new FormData(form).entries());
  submitButton.disabled = true;
  setStatus("送出中...");

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });

    form.reset();
    setStatus("報名成功，資料已送出。", "success");
  } catch (error) {
    setStatus(`送出失敗：${error.message}`, "error");
  } finally {
    submitButton.disabled = false;
  }
});
