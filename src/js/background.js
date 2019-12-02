'use strict';

let propertyDefault = {
    id : 'remove-element',
    title : '「 Remove element 」',
    type : 'normal',
    contexts : [ 'all' ]
};

let tabId = 0;

let contextmenuUpdate = (title) => {
    let property = {
        title : title || propertyDefault.title,
        type : propertyDefault.type,
        contexts : propertyDefault.contexts,
        onclick : onClicked
    };
    chrome.contextMenus.update(propertyDefault.id, property);
};

let onActiveChanged = (info) => contextmenuUpdate();

let onClicked = () => {
    chrome.tabs.sendMessage(tabId, 'clicked', onActiveChanged);
};

let onMessage = (request, sender, sendResponse) => {
    tabId = sender.tab.id;
    contextmenuUpdate(request.title);
    sendResponse({});
};

chrome.contextMenus.create(propertyDefault);
chrome.runtime.onMessage.addListener(onMessage);
chrome.tabs.onActivated.addListener(onActiveChanged);
