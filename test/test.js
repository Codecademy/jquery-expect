function alias (fn) {
  var b = $expect('body');
  for (var i = 1; i < arguments.length; i++) {
    try {
      expect(b[fn]).to.be(b[arguments[i]]);  
    } catch (e) {
      throw new Error('wrong alias ' + arguments[i])
    }
    
  }
}

function err (fn, msg) {
  try {
    fn();
    throw new Error('Expected an error');
  } catch (err) {
    expect(msg).to.be(err.message);
  }
}

describe('$expect', function () {

  it('should test exist', function () {
    $expect('#mocha').to.exist();
    $expect('foobar').not.to.exist();

    err(function () {
      $expect('foobar').to.exist();
    }, 'expected foobar to exist');

    err(function () {
      $expect('#mocha').not.to.exist();
    }, 'expected #mocha not to exist');

    err(function () {
      $expect('foobar').to.exist('foo my bar');
    }, 'foo my bar');
  });

  it('should test for length', function () {
    // Check alias
    alias('items', 'length', 'elements');

    $expect('#mocha').to.have.items(1);
    $expect('#mocha').not.to.have.items(4);
    $expect('#four-list li').to.have.items(4);

    err(function () {
      $expect('#four-list li').not.to.have.items(4);
    }, 'expected #four-list li to not have a length of 4');

    err(function () {
      $expect('#four-list li').not.to.have.items(4, 'foo my bar');
    }, 'foo my bar');

  });

  it('should test for above', function () {
    alias('above', 'greaterThan');
    
    $expect('#four-list li').to.be.above(2);
    $expect('#four-list li').not.to.be.above(4);

    err(function () {
      $expect('#four-list li').to.be.above(4);
    }, 'expected #four-list li to have a length greater than 4');

    err(function () {
      $expect('#four-list li').to.be.above(4, 'foo my bar');
    }, 'foo my bar');
  });

  it('should test for below', function () {
    alias('below', 'lessThan');

    $expect('#four-list li').to.be.below(5);
    $expect('#four-list li').not.to.be.below(4);

    err(function () {
      $expect('#four-list li').to.be.below(4);
    }, 'expected #four-list li to have a length less than 4');

    err(function () {
      $expect('#four-list li').to.be.below(4, 'blah');
    }, 'blah');
    
  });

  it('should test for equal', function () {
    alias('equal', 'eql');
    $expect('#four-list').to.eql('#four-list')
    $expect('#four-list').to.eql($('#four-list'));

    $expect('#four-list li').to.eql('li.item');
    $expect('#four-list').not.to.eql('li');

    var $l = $('#four-list').add('li.first');
    $expect('#four-list').not.to.eql($l);

    err(function () {
      $expect('#four-list').not.to.be.eql('#four-list');
    }, 'expected #four-list to not equal #four-list');

    err(function () {
      $expect('#four-list').not.to.be.eql('#four-list', 'blah');
    }, 'blah');

	err(function() {
	  $expect($('#four-list li').first()).to.be.eql($('#four-list li').last(), 'unequal equal')
	}, 'unequal equal');
  });

  it('should test for attr', function () {
    $expect('.link').to.have.attr('href', 'http://google.com');
    $expect('.link').not.to.have.attr('data-target', 'http://google.com');

    err(function () {
      $expect('.link').not.to.have.attr('href', 'http://google.com');
    }, 'expected .link to not have an attribute href equals to http://google.com');

    err(function () {
      $expect('.link').not.to.have.attr('href', 'http://google.com', 'blah');
    }, 'blah');

    $expect('.link').to.have.attr('id');
    $expect('.link').to.not.have.attr('style');

    err(function () {
      $expect('.link').to.have.attr('style');
    }, 'expected .link to have an attribute style');
  });

  it('should test text and contain', function () {
    $expect('.link').to.contain('google');
    $expect('.link2').to.contain('codecademy');
    $expect('.link').to.contain('Goog', true);

    err(function () {
      $expect('.link').to.contain('goog', true, 'foobar');
    }, 'foobar');

    $expect('.link').to.have.text('Google.');

    $expect('.link').to.have.text(7);
    $expect('.link').not.to.have.text(10);

    err(function () {
      $expect('.link2').to.have.text(10);      
    }, 'expected .link2 text to be of length 10 but got 15');

    err(function () {
      $expect('.link').to.have.text('foo')
    }, 'expected .link text to be equal to foo but got Google.')

    err(function () {
      $expect('.link').to.not.contain('google', 'blah')
    }, 'blah');

    err(function () {
      $expect('.link').to.have.text('google', 'blah2')
    }, 'blah2');

    $expect('.link').to.have.text(/goog/i);
    err(function () {
      $expect('.link').to.have.text(/code/i);
    }, 'expected .link text to match /code/i');
  });

  it('should test dimensions (width, height)', function () {
    $expect('.dimensions').to.have.width(50);
    $expect('.dimensions').to.have.outerWidth(64);
    $expect('.dimensions').to.have.innerWidth(60);

    $expect('.dimensions').to.have.height(50);
    $expect('.dimensions').to.have.outerHeight(64);
    $expect('.dimensions').to.have.innerHeight(60);

    $expect('.dimensions').to.have.width('> 49')
                      .and.to.have.width('>= 50')
                      .and.to.have.width('< 51')
                      .and.to.have.width('<= 50')
  });
  
  it('should test for html, val', function () {
    $expect('.html').to.have.html('<a>XX</a><p>YY</p>');
    err(function () {
      $expect('.html').not.to.have.html('<a>XX</a><p>YY</p>');
    }, 'expected .html not to have HTML <a>XX</a><p>YY</p>');
    err(function () {
      $expect('.html').not.to.have.html('<a>XX</a><p>YY</p>', 'blah');
    }, 'blah');
    
    $expect('.val').to.have.val('myval');
    err(function () {
      $expect('.val').not.to.have.val('myval', 'blah');
    }, 'blah');
  });

  // HOW TO TEST SCROLLTOP / LEFT ?

  it('should test traversal', function () {
    $expect('.parent').to.have.children('.child');
    $expect('.parent').not.to.have.children('.first');

    $expect('.parent').to.have('.child');
    $expect('.parent').to.have($('.child'));
    $expect('.parent').not.to.have($('.first'));
    $expect('body').to.have('.parent');

    err(function () {
      $expect('.parent').to.have.children('blah');  
    }, 'expected .parent to have children blah');

    err(function () {
      $expect('.parent').to.have.children('blah', 'blah');  
    }, 'blah')
    

    $expect('.child').to.have.parent('.parent');
    $expect('.child').to.have.parents('.parent');
    $expect('.child').to.have.closest('.parent');

    $expect('.child').to.not.have.parentsUntil('.parent');
    $expect('.child').to.have.parentsUntil('body');

    $expect('.abs').to.have.offsetParent('.parent');

    $expect('.order-list').to.have.children('li');
    $expect('.order-list li.first').to.have.siblings('li');
    $expect('.order-list li.first').to.have.next('.second');
    $expect('.order-list li.first').to.have.nextAll('.fourth');
    $expect('.order-list li.first').to.have.nextUntil('.fourth');
    $expect('.order-list li.first').to.not.have.nextUntil('.second');
    
    $expect('.order-list li.third').to.have.prev('.second');
    $expect('.order-list li.third').to.have.prevAll('.first');
    $expect('.order-list li.third').to.have.prevUntil('.first');
    $expect('.order-list li.third').to.not.have.prevUntil('.second');

  });

  it('should test and', function () {
    $expect('.child').to.have.parent('.parent')
                 .and.to.have.parents('.parent')
                 .and.to.have.closest('.parent');
  });

  it('should test that, end', function () {
    $expect('.parent').to.have.children('.child')
                        .that.has.children('.abs')
                          .that.has.text('a').end().end()
                      .to.be.a('.parent');
  });

  it('should test css', function () {
    $expect('.red').to.have.css('color', '#FF0000')
                    .and.have.css('color', 'red')
                    .and.have.css('color', 'rgb(255,0,0)');

    $expect('.padder').to.have.css('padding', '1px 2px 3px 4px');
    $expect('.padder').to.have.css('margin', '1px 2px 3px 4px');
    $expect('.padder').to.have.css('border', '1px solid red');

    $expect('.half-pad').to.have.css('padding', '1px 2px');
    $expect('.half-pad').to.have.css('margin', '1px 2px');
    $expect('.half-pad').to.have.css('border-style', 'dashed solid double dotted');
    $expect('.half-pad').to.have.css('border-color', 'red');
    $expect('.half-pad').to.have.css('border-color', 'red red');

    $expect('.half-pad').to.have.css('border-width', '2px 2px 2px 2px')

    $expect('.half-pad').to.have.css('border-top', '2px dashed red')
    err(function () {
      $expect('.half-pad').to.have.css('border-top', 'dashed');
    }, 'expected .half-pad to have its border-top style equal to dashed but got 2px dashed #FF0000');

    $expect('.half-pad').to.have.css('border-top', '2px dashed red')
    $expect('.padder').to.have.css('border', '1px solid red')

    err(function () {
      $expect('.padder').to.have.css('border', '1px solid yellow');
    },  'expected .padder to have its border style equal to 1px solid yellow but got 1px solid #FF0000')
    

    $expect('.pad').to.have.css('padding', '10px');
    $expect('.pad').to.have.css('margin', '10px');

    err(function () {
      $expect('.padder').to.have.css('padding', '1px 2px 3px 5px');
    }, 'expected .padder to have its padding style equal to 1px 2px 3px 5px but got 1px 2px 3px 4px');
  

    $expect('.paragraphs1 p').to.have.css('display', 'block');

    err(function () {
      // last one is block;
      $expect('.paragraphs2 p').to.have.css('display', 'inline');
    }, 'expected .paragraphs2 p to have its display style equal to inline but got block')
    
    $expect('.dashed').to.have.css('border', '1px dashed #ccc');

    err(function () {
      $expect('.dashed').to.exist().and.be.empty().and.have.css('border', '1px dashed #fff', 'foooo');
    }, 'foooo');

    err(function () {
      $expect('.dashed').to.exist().and.be.empty().and.have.css(
                                                                 'border'
                                                               , '1px dashed #fff'
                                                               , function (willThrow) {
                                                                expect(willThrow).to.be.ok();
                                                                return 'bar the foo'
                                                               });
    }, 'bar the foo');
  });

  // it('should test event tests', function (n) {
  //   var s = 0;
  //   $(window).on('scroll.once', function () {
  //     $(window).off('scroll.once');
  //     $('body').append('<div class="after-scroll" />');
  //     $(window).scrollTop(s);
  //   });

  //   $expect.Assertion.asyncWait = function (evt, dfd) {
  //     dfd.then(n, n);
  //   };

  //   $expect.Assertion.asyncDone = function (evt, dfd) {
  //     expect(dfd.state()).to.be('resolved');
  //   };

  //   $expect(window).to.scroll(function () {
  //     $expect('body').to.have('.after-scroll');

  //     err(function () {
  //       // Old api. contain used to alias find.
  //       $expect('body').to.contain('.after-scroll');
  //     }, 'expected body to contain ".after-scroll"');
  //   });

  //   setTimeout(function () {
  //     s = $(window).scrollTop();
  //     $(window).scrollTop(500);
  //   });
  // });

  it('should test for a', function () {
    $expect('div').to.be.a('div');
    $expect('.order-list').to.be.an('ol');
    $expect('.order-list').to.be.a($('#foolist'));

    err(function () {
      $expect('div').to.be.a('li');
    }, 'expected div to be li');

    err(function () {
      $expect('div').to.be.a($('li.first'));
    }, 'expected div to be li.first');

    err(function () {
      $expect('div').to.be.a($('li.first'), 'foobar');
    }, 'foobar');
    
  });

  it('should test for class', function () {
    $expect('#foolist').to.have.class('order-list');
    
    $expect('#four-list li').to.have.class('item');

    err(function () {
      $expect('li').to.have.class('first');
    }, 'expected li to have class first');

    err(function () {
      $expect('#foolist').to.have.class('foo');
    }, 'expected #foolist to have class foo');

    err(function () {
      $expect('#foolist').to.have.class('foo', 'foobar');
    }, 'foobar');

  });

  it('should test for shorthand attributes (hidden, visible etc.)', function () {
    $expect('.hidden').to.be.hidden();
    $expect('#foolist').to.be.visible();
    $expect('.checked').to.be.checked();
    $expect('.selected').to.be.selected();
    $expect('.disabled').to.be.disabled();
    err(function () {
      $expect('li.first').to.be.disabled(); 
    }, 'expected li.first to be disabled');

    $expect('.hidden').to.be.empty();

    err(function () {
      $expect('#foolist').to.be.empty('foobar');
    }, 'foobar');
  });

  it('should test passing function as message', function () {
    err(function () {
      $expect('div').not.to.exist(function (willThrow) {
        expect(this).to.be.a($expect.Assertion);
        expect(this.obj).to.be.a($);
        $expect(this.obj).to.be.eql('div');
        expect(willThrow).to.be.ok();
        return 'foo bar error';
      });
    }, 'foo bar error');
  });

  it('should correctly test shorthand border-radius', function () {
    $expect('.radius').to.have.css('border-radius', '10px');
  });

  it('should throw default errors', function () {
    err(function() {
      $expect($('.radius')[0]).to.have.children('.foo');
    }, 'expected div.radius to have children .foo');
  });
});
