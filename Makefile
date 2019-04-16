NAME := remove-element
XPI := $(NAME).xpi
SOURCE := icons js manifest.json

.PHONY: build clean

build:
	zip -r $(XPI) $(SOURCE)

clean:
	$(RM) $(XPI)
