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

if (typeof browser !== "undefined") {
    /*
     * > Place menu creation using menus.create or its alias contextMenus.create
     * > in a runtime.onInstalled listener.
     * > Also, note that the menus.onClicked event or its alias contextMenus.onClicked
     * > must be used to handle menu entry click events from an event page,
     * > instead of the onclick parameter of the contextMenus.create or contextMenus.update methods.
     * > If the onclick property of menus.create or its alias contextMenus.create are
     * > used from a call originating from an event page, they throw synchronously.
     * > https://extensionworkshop.com/documentation/develop/manifest-v3-migration-guide/
     */
    chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create(contextMenu().item));
} else {
    chrome.contextMenus.create(contextMenu().item);
}
chrome.contextMenus.onClicked.addListener(contextMenu().onClicked);
chrome.runtime.onMessage.addListener(contextMenu().onMessage);
