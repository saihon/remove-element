NAME := remove-element
DIST := dist
SOURCE := src

.PHONY: clean prepar prepar-firefox prepar-chrome build-chrome build-firefox

clean:
	rm -rf $(DIST) $(NAME).zip $(NAME).xpi

prepar: clean
	mkdir $(DIST) && cp -r $(SOURCE)/icons $(SOURCE)/js $(DIST)

prepar-firefox: prepar
	cp $(SOURCE)/manifest-firefox.json $(DIST)/manifest.json

prepar-chrome: prepar
	cp $(SOURCE)/manifest-chrome.json $(DIST)/manifest.json

build-firefox: prepar-firefox
	cd $(DIST) && zip -r ../$(NAME).xpi ./*

build-chrome: prepar-chrome
	zip -r $(NAME).zip $(DIST)