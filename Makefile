# minify

minify:
	uglifyjs -nc jquery.expect.js > jquery.expect.min.js

#
# Adapted from bootstrap
#
tests	:
	node test/server.js &
	phantomjs test/phantom.js "http://localhost:8080/test"
	kill -9 `cat test/pid.txt`
	rm test/pid.txt