
chrome.runtime.onInstalled.addListener(() => {
    console.log('************BACKGROUND SCRIPT LOADED***********');

    chrome.contextMenus.create({
        id: "reply",
        title: "Respond to this email: \%s",
        contexts: ["selection"],
    });
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "reply") {
        console.log("Selected Text: " + info.selectionText)
        chrome.storage.local.set({ prompt: info.selectionText })
        chrome.runtime.sendMessage({ selectionText: info.selectionText });
    }
});


// chrome.runtime.onMessage.addListener(
//     function(email, sender, sendResponse)  {
//         console.log(email)
//     }
// )

// listen for selectionchange event.


// chrome.tabs.onActivated.addListener(function (tab) {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var activeTab = tabs[0];
//         console.log("here is a msg from gavin: " + activeTab.getSelection().toString());

//     });
// });