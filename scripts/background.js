let cache = {}

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

chrome.webNavigation.onCompleted.addListener(async details => {
    if (cache["details"] && details.tabId === cache["tabId"]) {
        const response = await chrome.tabs.sendMessage(cache["tabId"] ,cache["details"]);
        cache = {}
        console.log(response)
    }
})