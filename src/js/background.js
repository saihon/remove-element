"use strict";

function contextMenu() {
    const item = {
        id: "remove-element",
        title: "「 Remove element 」",
        type: "normal",
        contexts: ["all"],
    };

    const update = (title) => {
        const menuItem = {
            title: title || item.title,
            type: item.type,
            contexts: item.contexts,
        };
        chrome.contextMenus.update(item.id, menuItem);
    };

    const onClicked = (info, tab) => {
        if (info.menuItemId == item.id) {
            chrome.tabs.sendMessage(tab.id, "clicked", () => update());
        }
    };

    const onMessage = (request, sender, sendResponse) => {
        update(request.title);
        sendResponse({});
    };

    return {
        item,
        onClicked,
        onMessage,
    };
}

function onInstalledListener(details) {
    chrome.contextMenus.create(contextMenu().item);
}
chrome.runtime.onInstalled.addListener(onInstalledListener);
chrome.contextMenus.onClicked.addListener(contextMenu().onClicked);
chrome.runtime.onMessage.addListener(contextMenu().onMessage);
