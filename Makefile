# minify

minify:
	uglifyjs -nc jquery.expect.js > jquery.expect.min.js

#
# Adapted from bootstrap
#
test:
	node test/server.js 8080 &
	phantomjs test/phantom.js "http://localhost:8080/test"
	kill -9 `cat test/pid.txt`
	rm test/pid.txt


# Tests in browser
test-browser:
	node test/server.js


.PHONY: test
