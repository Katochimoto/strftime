TESTS=test/spec/*.js

all: npm build

npm:
	npm install

build:
	./node_modules/requirer/bin/requirer index.js strftime.js

prod: build
	./node_modules/uglify-js/bin/uglifyjs -o strftime.min.js strftime.js

test:
	./node_modules/.bin/mocha --reporter dot $(TESTS)
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .

.PHONY: all test
