'use strict';

let propertyDefault = {
    id : 'remove-element',
    title : '「 Remove element 」',
    type : 'normal',
    contexts : [ 'all' ]
};

let contextmenuUpdate = (title) => {
    let property = {
        title : title || propertyDefault.title,
        type : propertyDefault.type,
        contexts : propertyDefault.contexts,
        onclick : onClicked
    };
    chrome.contextMenus.update(propertyDefault.id, property);
};

let onClicked = (_, tab) => {
    chrome.tabs.sendMessage(tab.id, 'clicked', () => contextmenuUpdate());
};

let onMessage = (request, sender, sendResponse) => {
    contextmenuUpdate(request.title);
    sendResponse({});
};

chrome.contextMenus.create(propertyDefault);
chrome.runtime.onMessage.addListener(onMessage);