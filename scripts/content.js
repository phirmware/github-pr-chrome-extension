chrome.runtime.onMessage.addListener(
  function (req, sender, sendResponse) {
    if (req.action === 'pr') createPRPost(sendResponse)
  }
)

function createPRPost (sendResponse) {
  console.log('Content recieved message, creating PR post')
  const presentUrl = window.location.href
  const issueTitle = document.getElementsByClassName('js-issue-title')[0].textContent
  const message = {
    sender: 'content',
    receiver: 'popup',
    presentUrl,
    issueTitle
  }
  chrome.runtime.sendMessage(message, function (response) {
    sendResponse(response)
  })
}
