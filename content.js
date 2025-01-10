let events = [];

function recordEvent(event) {
  let selector = getSelector(event.target);
  let seleniumCode = "driver.find_element(By.CSS_SELECTOR, '" + selector + "')";

  if (event.type === 'click') {
    seleniumCode += ".click()";
  } else if (event.type === 'input') {
    seleniumCode += `.send_keys('${event.target.value}')`;
  }

  events.push(seleniumCode);
}

function getSelector(element) {
  if (element.id) {
    return `#${element.id}`;
  } else if (element.className) {
    return `.${element.className.split(' ').join('.')}`;
  } else {
    return element.tagName.toLowerCase();
  }
}

window.addEventListener('click', recordEvent);
window.addEventListener('input', recordEvent);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'stop-recording') {
    sendResponse({ code: events.join('\n') });
    events = [];
  }
});