document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('#slider');

  chrome.storage.local.get('ANIMAL', result => {
    if (result.ANIMAL === 'dog') {
      slider.checked = true;
    }
  });

  slider.addEventListener('change', () => {
    const curANIMAL = slider.checked ? 'dog' : 'cat';

    chrome.storage.local.set({ ANIMAL: curANIMAL });
  });
});
