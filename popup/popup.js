

async function changeAnimalSetting() {
  const currentAnimal = await chrome.storage.sync.get("animal");
  if (currentAnimal === cat) {
    chrome.storage.set({ animal: "dog" })
  } else {
    chrome.storage.set({ animal: "cat"})
  }
  
}