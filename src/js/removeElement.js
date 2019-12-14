'use strict';

let instance;

function RemoveElement() {
    let self     = this;
    self.element = null;
    chrome.runtime.onMessage.addListener(self.reciever.bind(self));
};

RemoveElement.prototype.send = function(element) {
    let self = this, o = {};
    if (element) {
        o.title = '「  ' + element.localName + ' : ' +
                  (element.offsetWidth || '??') + ' x ' +
                  (element.offsetHeight || '??') + ' 」';
        self.element = element;
    }
    chrome.runtime.sendMessage(o);
};

RemoveElement.prototype.reciever = function(request, send, sendResponse) {
    let self = this;
    if (request == 'clicked' && self.element) {
        let parent = self.element.parentNode;
        if (parent) parent.removeChild(self.element);
        self.element = null;
    }
    sendResponse({});
};

let onContextmenu = (e) => {
    if (!(instance instanceof RemoveElement)) {
        instance = new RemoveElement();
    }
    instance.send(e.target);
};

document.addEventListener('contextmenu', onContextmenu, false);
