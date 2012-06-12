// Simple phantom.js integration script
// Adapted from Bootstrap

function waitFor(testFx, onReady, timeOutMillis) {
  var maxtimeOutMillis = timeOutMillis ? timeOutMillis :  10000 //< Default Max Timout is 10000
    , start = new Date().getTime()
    , condition = false
    , interval = setInterval(function () {
        if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
          // If not time-out yet and condition not yet fulfilled
          condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()) //< defensive code
        } else {
          if (!condition) {
            // If condition still not fulfilled (timeout but condition is 'false')
            console.log("'waitFor()' timeout")
            phantom.exit(1)
          } else {
            // Condition fulfilled (timeout and/or condition is 'true')
            typeof(onReady) === "string" ? eval(onReady) : onReady() //< Do what it's supposed to do once the condition is fulfilled
            clearInterval(interval) //< Stop this interval
          }
        }
    }, 100) //< repeat check every 100ms
}


if (phantom.args.length === 0 || phantom.args.length > 2) {
  console.log('Usage: phantom.js URL')
  phantom.exit()
}

var page = new WebPage()

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
  console.log(msg)
};

page.open(phantom.args[0], function(status){
  if (status !== "success") {
    console.log("Unable to access network")
    phantom.exit()
  } else {
    waitFor(function(){
      return page.evaluate(function(){
        return window.DONE
      })
    }, function(){
      var failedNum = page.evaluate(function(){
        return $('.fail').length;
      });
      
      var log = page.evaluate(function () {
        var join = Array.prototype.join;
        return join.call($('.test h2').map(function (){
          var s = $(this).parent().is('.fail') ? '✖ ' : '✓ ';
          $(this).find('.duration').remove();
          return s + $(this).text();
        }), '\n');
      });

      console.log(log);

      phantom.exit((parseInt(failedNum, 10) > 0) ? 1 : 0)
    })
  }
})