(() => {
    'use strict';

    let instance;

    function RemoveElement() {
        let self     = this;
        self.element = null;
        chrome.runtime.onMessage.addListener(self.reciever.bind(self));
    };

    RemoveElement.prototype.send = function(element) {
        let self = this;
        let o    = {captured : false, title : '「 ERROR 」'};
        if (element) {
            o.captured = true;
            o.title = '「  ' + element.localName + ' : ' + element.offsetWidth +
                      ' x ' + element.offsetHeight + ' 」';
            self.element = element;
        }
        chrome.runtime.sendMessage(o);
    };

    RemoveElement.prototype.reciever = function(request, send, sendResponse) {
        let self = this;
        if (request == 'clicked' && self.element) {
            let parent;
            if (parent = self.element.parentNode) {
                parent.removeChild(self.element);
            }
            self.element = null;
        }
        sendResponse({});
    };

    let mousedown = (e) => {
        if (e.button != 2) return;
        // e.preventDefault();
        // e.stopImmediatePropagation();
        let _instance = instance;
        if (!(_instance instanceof RemoveElement)) {
            _instance = instance = new RemoveElement();
        }
        _instance.send(e.target);
    };

    let loaded = () => document.addEventListener('mousedown', mousedown, false);
    window.addEventListener('DOMContentLoaded', loaded, false);
})();
