chrome.runtime.onMessage.addListener(
  function (req, sender, sendResponse) {
    console.log('req', req)
    if (req.sender === 'popup') startProcess(req, sendResponse)
   // if (req.sender === 'content') endProcess(req, sendResponse)
  }
)

function startProcess (req, sendResponse) {
  console.log('Send event to content')
  sendResponse('sent message to active tab')
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: req.action, data: req }, function (res) {
      console.log(res)
      // sendResponse('sent message to active tab')
    })
  })
}

function endProcess (req, sendResponse) {
  
}
