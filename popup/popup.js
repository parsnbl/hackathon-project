document.querySelectorAll('input[name="animal"]').forEach((elem)=>{
  elem.addEventListener('change', async function(event) {
    await changeAnimalSetting();
  });
});

async function changeAnimalSetting() {
  const currentAnimal = await chrome.storage.sync.get("animal");
  if (currentAnimal === cat) {
    chrome.storage.set({ animal: "dog" })
  } else {
    chrome.storage.set({ animal: "cat"})
  }
  
}