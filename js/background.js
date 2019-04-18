'use strict';

let propertyDefault = {
    id : 'remove-element',
    title : '「 Remove element 」',
    type : 'normal',
    contexts : [ 'all' ]
};

let tabId = 0;

let contextmenuUpdate = (title, onclicked) => {
    let property = {
        title : title || propertyDefault.title,
        type : propertyDefault.type,
        contexts : propertyDefault.contexts
    };
    if (onclicked) property.onclick = onclicked;
    chrome.contextMenus.update(propertyDefault.id, property);
};

let onActiveChanged = (info) => {
    contextmenuUpdate();
};

let onClicked = () => {
    let callback = () => contextmenuUpdate();
    chrome.tabs.sendMessage(tabId, 'clicked', callback);
};

let onMessage = (request, sender, sendResponse) => {
    tabId = sender.tab.id;
    if (request.captured) {
        contextmenuUpdate(request.title, onClicked);
    } else {
        contextmenuUpdate();
    }
    sendResponse({});
};

chrome.contextMenus.create(propertyDefault);
chrome.runtime.onMessage.addListener(onMessage);
chrome.tabs.onActivated.addListener(onActiveChanged);
