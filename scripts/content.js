let ANIMAL = 'cat';

chrome.storage.local.get('ANIMAL', result => {
  if (result.ANIMAL) {
    ANIMAL = result.ANIMAL;

    const icon =
      ANIMAL === 'cat'
        ? '../assets/catemoj-16.png'
        : '../assets/dogemoj-16.png';
    chrome.action.setIcon({ path: icon });
    console.log(icon);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request) {
    const errorPage = makeErrorPage(request);
    const html = document.querySelector('html');
    html.style.padding = '0px';
    document.body = errorPage;
    sendResponse({ message: `request recieved: ${request}` });
  }
});

function makeErrorPage(code) {
  const url =
    ANIMAL === 'cat'
      ? `https://http.cat/${code}`
      : `https://http.dog/${code}.jpg`;

  const body = document.createElement('body');

  const img = document.createElement('img');
  img.setAttribute('src', url);
  img.style.height = '100%';

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

  const audio = document.createElement('audio');
  audio.setAttribute('src', 'cat_sound.wav');
  audio.setAttribute('autoplay', 'true');
  audio.setAttribute('loop', 'true');
  body.append(audio);

  return body;
}
