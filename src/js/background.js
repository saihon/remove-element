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

const cm = contextMenu();

const onInstalled = () => {
    // Menu creation is within onInstalled listener.
    // https://developer.chrome.com/docs/extensions/mv3/service_workers/#initialization
    // https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/
    chrome.contextMenus.create(cm.item);
};
chrome.runtime.onInstalled.addListener(onInstalled);
chrome.contextMenus.onClicked.addListener(cm.onClicked);
chrome.runtime.onMessage.addListener(cm.onMessage);
