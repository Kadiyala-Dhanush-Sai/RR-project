document.addEventListener("DOMContentLoaded", () => {
  console.log("WARNING PAGE LOADED");

  const backBtn = document.getElementById("backBtn");
  const continueBtn = document.getElementById("continueBtn");

  backBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "GO_BACK" });
  });

  continueBtn.addEventListener("click", () => {
    const target = new URLSearchParams(location.search).get("url");
    chrome.runtime.sendMessage({
      action: "CONTINUE_ANYWAY",
      url: target
    });
  });

  chrome.storage.local.get(
    ["lastRiskScore", "lastReasons"],
    data => {
      console.log("STORAGE DATA:", data);

      const scoreEl = document.getElementById("riskScore");
      const reasonsEl = document.getElementById("riskReasons");

      scoreEl.innerText = (data.lastRiskScore || 0) + "%";

      reasonsEl.innerHTML =
        "<p>Detected issues:</p><ul>" +
        (data.lastReasons || []).map(r => `<li>${r}</li>`).join("") +
        "</ul>";
    }
  );
});