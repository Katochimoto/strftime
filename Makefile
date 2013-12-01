TESTS=test/spec/*.js

all: node_modules build

node_modules: package.json
	npm install
	touch node_modules

build: node_modules
	./node_modules/.bin/requirer index.js strftime.js

prod: build
	./node_modules/.bin/uglifyjs -o strftime.min.js strftime.js

test: node_modules
	./node_modules/.bin/mocha --reporter dot $(TESTS)
	./node_modules/.bin/jshint .
	./node_modules/.bin/jscs .

doc:
	jsdoc -c $(CURDIR)/jsdoc.json $(CURDIR)/lib

.PHONY: all test
