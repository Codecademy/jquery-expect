# $expect
A jQuery assertion library based on [LearnBoost's expect.js](https://github.com/LearnBoost/expect.js)

## API
For all API methods the last argument passed will override the default assertion error message.

### exist
Check the existence by asserting that there is at least one element in the jQuery collection.

```javascript
$expect('div').to.exist();
$expect('div').to.exist('Please add a div to the page!');

```

### Error message
As mentioned above, $expect ships with default error messages for each of the assertion API  
available. But also gives the user the ability to override these error messages.  

The argument following the last formal argument of any assertion method would be considered  
as the error message overriding argument.

You could either pass in a simple string or a function that should return a string to override  
the default message.

The passed in function could act as a cleanup function before throwing the assertion error.  
It would be passed a boolean stating whether the assertion would throw or not.

```javascript
$expect('div').to.exist(function (willThrow) {
  // Some cleanup code.
  return 'Please add a div to the page.'
});
```

### items / elements / length
Asserts the `.length` property.

```javascript
$expect('ol > li').to.have.items(4);
```

### above / greaterThan
Asserts that the `.length` property is greater than a given number.

```javascript
$expect('li').to.be.above(4);
```

### below / lessThan
Asserts that the `.length` property is less than a given number.

```javascript
$expect('li').to.be.lessThan(5);
```

### be / a / an
Asserts that each element in a jQuery collection matches the passed in selector.  

```javascript
$expect('div').to.be('.widget');
$expect('input').to.be('[type=text]');
$expect('.win').to.be.a('div');
$expect('.list').to.be.an('ol');
```

Internally calls `$().is` so it can be passed either a selector, a function, a jQuery object, or an element.  
For more info check out the [jQuery docs](http://api.jquery.com/is/).

```javascript
$expect('h1').to.be($headers);
```

### eql / equal
Asserts that one jQuery collection has the exact same elements as another.  
Can accept a jQuery collection or simply a selector

```javascript
$expect('li.first').to.be.equal('li:first');
$expect('div').to.be.equal($('.all-the-divs'));
```

### attr
Asserts the existence of an attribute and its equality if a value was passed in.

```javascript
$expect('.container').to.have.attr('id', 'content');
$expect('.some-input').to.have.attr('value');
```

### text
Asserts that an element has the exact same text.  
If a number is passed in then the length of the text would be checked.  
If a RegExp is passed in then it will be matched against the text.

```javascript
$expect('.link-1').to.have.text(10);
$expect('.link-1').to.have.text(/code/i);
$expect('.link-1').to.have.text('Codecademy');
$expect('.link-2').to.have.text('Google', 'Why not?');
```

### contain
Asserts that an element contains a certain text.  
By default punctuation, whitespace, and case would be ignored. Pass in a second `true` argument to ensure a strict check.

```javascript
$expect('body').to.contain('author');
$expect('.links').to.contain('people');
$expect('.content').to.contain('Amjad', 'My name must exist and be capitalized');
```

### Dimension check
Asserts the `width`, `innerWidth`, `outerWidth`, `height`, `innerHeight`,   
`outerHeight`, `scrollTop`, and `scrollTop` of an element.  
Can either pass in a number or a string with the operation prepended to it.

```javascript
$expect('.nav').to.have.width(250);
$expect('.header').to.have.innerWidth('>= 50')
              .and.to.have.innerWidth('<= 250');
```

### value / val
Asserts that an input element has a certain value. Calls `$().val`.  

```javascript
$expect('input.password').to.have.val('PlainText');
```

### html
Asserts that an element has an html string. Calls `$().html`.  

```javascript
$expect('body').to.have.html('<div>foo</div>');
```

### Traversing
Asserts the existence of element in different directions of the DOM tree.  
Relies on jQuery's traversal methods.

```javascript
$expect('body').to.have.children('.foos');
$expect('#so-lonely').to.have.siblings('.party-elements');
```

`$().find` is aliased to `$().have`

```javascript
$expect('body').to.have('input');
```

### class
Asserts the existence of a class or multiple space separated classes on each element of a collection.  

```javascript
$expect('input[type=text]').to.have.class('on field');
```

### Shorthand attributes
Convenience methods for checking the following attributes and selectors:  
`visible`, `hidden`, `selected`, `checked`, `disabled`, `empty`.

```javascript
$expect('h2').to.be.hidden();
$expect('input.submit').not.to.be.hidden('Please hide the submit button for now!');
$expect('body').not.to.be.empty();
```

### Chaining
You can chain assertions on an object just like you can chain methods in jQuery.  

#### And
Chains assertions on the original object.  

```javascript
$expect('div.container').to.exist().and.not.be.empty().and.to.have.width('>= 250');
```

#### that / which
Chains assertions on different elements after calling any of the traversal methods.

```javascript
$expect('ul.todos').to.exist()
               .and.to.have.children('li.items').that.has.css('border', '1px solid red');
               									.and.has.attr('data-id');
```

When chaining on traveresed elements just as in jQuery you can always call `.end` to get  
the original object back.  

```javascript
$expect('div.container').to.have.siblings('.pane').that.has.css('float', 'left')
				   end().to.be('.loading');
```

### Testing events
$expect defines two static methods on its exposed `Assertion` class that works as asynchronous signals  
for testing events:  

 * `asyncWait`: is called when we start waiting for an async event to happen. Called with two arguments   
                a) event type string b) a deferred object that is resolved when the event is fired.
 * `asyncDone`: is called when the event is fired and passed a) event type string b) a deferred object  
                that is either rejected with the an error if the async callback threw one or resolved  
                with the return value from it.  


```javascript
it('should test for setting the navigation to position fixed after scrolling the page', function (next) {
  
  // Assign the fail and pass handlers of the deferred object to be the mocha next function.
  // Incase of an error it would be passed and caught by mocha.
  $expect.Assertion.asyncWait = function (evt, dfd) {
    dfd.then(next, next);
  };

  // Called after the event has fired. 
  $expect.Assertion.asyncDone = function (evt, dfd) 
    // Here we are using the expect.js library to check the state of the deferred object.
    // If everything went as expected it should be resolved.
    expect(dfd.state()).to.be('resolved');
  };

  // The actual call to the async event. Expect the window to scroll.
  // And when that happens expect the nav-bar to become position fixed.
  $expect(window).to.scroll(function () {
    $expect('.nav-bar').to.have.css('position', 'fixed');
  });

  // Now emulate the actual scrolling.
  setTimeout(function () {
    $(window).scrollTop(500);
  }, 100);
});
```     

## License
MIT License.  
Copyright (c) 2012 Amjad Masad &lt;amjad@codecademy.com&gt; Ryzac, Inc.
