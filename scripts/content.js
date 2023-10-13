let ANIMAL = 'cat';

chrome.storage.local.get('ANIMAL', result => {
  if (result.ANIMAL) {
    ANIMAL = result.ANIMAL;
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
  const sound = ANIMAL === 'cat' ? '../assets/cat_sound.wav' : './assets/dog_bark.wav';
  const body = document.createElement('body');
  const audio = document.createElement('audio');
  const audioSrc = chrome.runtime.getURL(sound);
  audio.setAttribute('src', audioSrc);
  if (ANIMAL === 'cat') {
    audio.volume = 0.2;
  }
  body.append(audio);

  const img = document.createElement('img');
  img.setAttribute('src', url);
  img.style.height = '100%';
  img.style.cursor = 'pointer';

  img.addEventListener('click', () => {
    audio.play();
  });

  const frame = document.createElement('div');
  frame.classList.add('frame');

  frame.append(img);

  // const playButton = document.createElement('button');
  // playButton.innerText = 'Click to Cheer Up';
  // playButton.addEventListener('click', () => {
  //   audio.play();
  // });
  // playButton.classList.add('play-button');
  // frame.append(playButton);

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
