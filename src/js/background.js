"use strict";

function getDefaultMenuItem() {
    return Object.freeze({
        id: "remove-element",
        title: "「 Remove element 」",
        type: "normal",
        contexts: ["all"],
    });
}

function updateMenuItem(title) {
    const defaultMenuItem = getDefaultMenuItem();
    const menuItem = {
        title: title || defaultMenuItem.title,
        type: defaultMenuItem.type,
        contexts: defaultMenuItem.contexts,
    };
    chrome.contextMenus.update(defaultMenuItem.id, menuItem);
}

function onClicked(info, tab) {
    const defaultMenuItem = getDefaultMenuItem();
    if (info.menuItemId == defaultMenuItem.id) {
        chrome.tabs.sendMessage(tab.id, "clicked", () => updateMenuItem());
    }
}

function onMessage(request, sender, sendResponse) {
    updateMenuItem(request.title);
    sendResponse({});
}

function onInstalled() {
    chrome.contextMenus.create(getDefaultMenuItem());
}

chrome.runtime.onInstalled.addListener(onInstalled);
chrome.contextMenus.onClicked.addListener(onClicked);
chrome.runtime.onMessage.addListener(onMessage);
