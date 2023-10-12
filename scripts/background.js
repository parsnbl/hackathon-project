let cache = {}

//refresh content scripts
chrome.runtime.onInstalled.addListener(async () => {
  for (const contentScript of chrome.runtime.getManifest().content_scripts) {
    for (const tab of await chrome.tabs.query({url: contentScript.matches})) {
      if (tab.url.slice(0,9) !== 'chrome://') {
        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: contentScript.js,
        });
      }
    }
  }
});

//add failed requests to the cache
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.type === 'main_frame' && details.statusCode > 400) {
      console.log('Starting send message')  
      cache["tabId"] = details.tabId;
      cache["details"] = details.statusCode
    }
  },
  { urls: ['<all_urls>'] }
);

//when the navigation is finished, send to the outermost frame the cache, then empty it
chrome.webNavigation.onCompleted.addListener(async details => {
  console.log(details)
    if (cache["details"] && details.tabId === cache["tabId"] && details.frameType === 'outermost_frame') {
      try {
        const response = await chrome.tabs.sendMessage(cache["tabId"] ,cache["details"]);
        cache = {}
      }  catch(err) {
        console.error('err:', err, 'cache:', cache, 'details:', details);
      }
      
    }
})

// set the icon whenever we change it
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local') {
    chrome.storage.local.get('ANIMAL', result => {
      if (result.ANIMAL) {
        ANIMAL = result.ANIMAL;
    
        const icon =
          ANIMAL === 'cat'
            ? '../assets/catemoj-16.png'
            : '../assets/dogemoj-16.png';
        chrome.action.setIcon({path: icon });
        console.log(icon);
      }
    });
  }
});

