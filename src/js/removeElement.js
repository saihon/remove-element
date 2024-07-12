"use strict";

let instance;

function RemoveElement() {
    const self = this;
    self.element = null;
    chrome.runtime.onMessage.addListener(self.receiver.bind(self));
}

RemoveElement.prototype.send = function (element) {
    const self = this,
        o = {};
    if (element) {
        o.title = `「 ${element.localName} : ${element.offsetWidth || "?"} x ${
            element.offsetHeight || "?"
        } 」`;
        self.element = element;
    }
    chrome.runtime.sendMessage(o);
};

RemoveElement.prototype.receiver = function (request, send, sendResponse) {
    const self = this;
    if (request == "clicked" && self.element) {
        const parent = self.element.parentNode;
        if (parent) parent.removeChild(self.element);
        self.element = null;
    }
    sendResponse({});
};

const onContextmenu = (e) => {
    if (!(instance instanceof RemoveElement)) {
        instance = new RemoveElement();
    }
    instance.send(e.target);
};

document.addEventListener("contextmenu", onContextmenu, false);
