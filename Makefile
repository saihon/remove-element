NAME := remove-element
TARGET = firefox

.PHONY: build clean build-chrome build-firefox

build: build-$(TARGET)

build-firefox:
	zip -r $(NAME).xpi src/icons src/js src/manifest.json

build-chrome:
	zip -r $(NAME).zip src

clean:
	$(RM) $(NAME).zip $(NAME).xpi
