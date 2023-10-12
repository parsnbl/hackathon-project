const ANIMAL = 'cat';

chrome.webNavigation.onErrorOccured.addListener((details) => {
  console.log(details);
});

// document.addEventListener('DOMContentLoaded', () => {
//     const code = 404
//     const errorPage = makeErrorPage(code)
//     document.body.appendChild(errorPage)
// })

function makeErrorPage(code) {
  const imgURL =
    ANIMAL === 'dog'
      ? `https://http.dog/${code}.jpg`
      : `https://http.cat/${code}`;

  const img = document.createElement('img');
  img.classList.add('animal-img');
  img.setAttribute('src', imgURL);

  const frame = document.createElement('div');
  frame.classList.add('frame');
  frame.appendChild(img);

  return frame;
}
