# $expect
A jQuery assertion library based on [LearnBoost's expect.js](https://github.com/LearnBoost/expect.js)

# API
For all API methods the last argument passed will override the default assertion error message.

### exist
Check the existence by asserting that there is at least one element in the jQuery collection.

```javascript
$expect('div').to.exist();
$expect('div').to.exist('Please add a div to the page!');

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
If a Regex is passed in then it will be matched against the text.

```javascript
$expect('.link-1').to.have.text(10);
$expect('.link-1').to.have.text(/code/i);
$expect('.link-1').to.have.text('Codecademy');
$expect('.link-2').to.have.text('Google', 'Why not?');
```

### contain
Asserts that an element contains a certain text.  
By default punctuation, whitespace, and case would be ingored. Pass in a second `true` argument to ensure a strict check.

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


