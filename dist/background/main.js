import {someModule} from './src/something-functional-module.js'

// Bind toggle extension popup
function bindBrowserAction() {
    console.log('bindBrowserAction');
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.query({active: true, currentWindow: true}, ([currentTab]) => {
            chrome.tabs.sendMessage(currentTab.id, {message: 'clicked_browser_action'})
        })
    });
}

// It's enter point in background script via onInstalled hook
chrome.runtime.onInstalled.addListener(async () => {
    bindBrowserAction();

    // Our custom actions
    init()
});

function init() {
    someModule()
}