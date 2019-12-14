NAME := remove-element
TARGET = all

.PHONY: build clean build-all build-chrome build-firefox

build: build-$(TARGET)

build-all: build-firefox build-chrome

build-firefox:
	@cd ./src && \
	zip -r ../$(NAME).xpi icons js manifest.json

build-chrome:
	zip -r $(NAME).zip src

clean:
	$(RM) $(NAME).zip $(NAME).xpi
