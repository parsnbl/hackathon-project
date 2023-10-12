let ANIMAL = 'cat';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    const errorPage = makeErrorPage(request);
    const html = document.querySelector('html')
    html.style.padding = "0px"
    document.body = errorPage;
    sendResponse({ message: `request recieved: ${request}` });
  }
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.animal?.newValue) {
    ANIMAL = changes.animal.newValue;
  }
});

/*
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.debug);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});
*/

/*
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
*/

function makeErrorPage(code) {
  const url =
    ANIMAL === 'cat'
      ? `https://http.cat/${code}`
      : `https://http.dog/${code}.jpg`;

  const body = document.createElement('body');

  const img = document.createElement('img');
  img.setAttribute('src', url);
  img.style.height = '100%'

  const frame = document.createElement('div');
  frame.classList.add('frame');

  frame.append(img);
  body.append(frame);

  body.style.margin = '0px';
  body.style.background = 'none';
  body.style.backgroundColor = '#000000e6';
  body.style.maxWidth = 'none';
  body.style.maxHeight = 'none';
  body.style.padding = '0px';
  body.style.height = '100vh';

  return body;
}
