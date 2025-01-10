let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let outputArea = document.getElementById("output");

startButton.addEventListener("click", async () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    });
  });
});

stopButton.addEventListener("click", () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  chrome.runtime.sendMessage({ action: "stop-recording" }, (response) => {
    outputArea.value = response.code;
  });
});