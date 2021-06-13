document.getElementById('start').onclick = startProcess
document.getElementById('copy-url').onclick = copyUrl
document.getElementById('copy-pr').onclick = copyPost

function hideElements (elements = []) {
  elements.forEach(element => element.style.display = 'none')
}

function showElements (elements = []) {
  elements.forEach(element => element.style.display = 'block')
}

function startProcess() {
  // showElements([
  //   document.getElementById('copy-url'),
  //   document.getElementById('copy-pr')
  // ])
  
  // hideElements([
  //   document.getElementById('start').style.display = 'none'
  // ])

  const message = {
    sender: "popup",
    receiver: "background",
    action: "pr"
  }
  chrome.runtime.sendMessage(message, function (response) {
    console.log(response)
  })
}

chrome.runtime.onMessage.addListener(
  function (req, sender, sendResponse) {
    if (req.receiver === 'popup') showUrl(req, sendResponse)
  }
)

function showUrl(req, sendResponse) {
  const PR_POST = constructPRPost(req)
  // document.getElementById('url').textContent = req.presentUrl
  // document.getElementById('title').textContent = PR_POST
  navigator.clipboard.writeText(PR_POST)
  sendResponse('Done')
}

function constructPRPost(req) {
  const { presentUrl, issueTitle } = req
  const issueNumber = presentUrl.split('/')[presentUrl.split('/').length - 1]
  const prPost = `PR: ${issueTitle.trim()} ( outlier-api #${issueNumber.trim()} )`
  return prPost
}

function copyUrl() {
  const copyText = document.getElementById('url')
  navigator.clipboard.writeText(copyText.textContent)
}

function copyPost() {
  const copyText = document.getElementById('title')
  navigator.clipboard.writeText(copyText.textContent)
}
