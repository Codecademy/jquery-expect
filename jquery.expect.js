
(function (global) {

  /**
   * Exports.
   */

  global.$expect = $expect;
  $expect.Assertion = Assertion;

  /**
   * Possible assertion flags.
   */

  var flags = {
      not: ['to', 'be', 'have', 'include', 'only']
    , to: ['be', 'have', 'include', 'only', 'not']
    , is: []
    , are: []
    , only: ['have']
    , have: ['own']
    , has: ['own']
    , be: ['an']
  };

  function $expect (obj) {
    return new Assertion(obj);
  }

  function keys (obj) {
    return $.map(obj, function (_, k) {
      return k;
    });
  }

  function i ($obj) {
    return $obj.selector;
  }

  //source: http://wowmotty.blogspot.com/2009/06/convert-jquery-rgb-output-to-hex-color.html
  function rgb2hex (rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
  }

  // source: http://www.w3.org/TR/css3-color/#svg-color
  var COLORS = {
    'aliceblue': '#F0F8FF'
  , 'antiquewhite': '#FAEBD7'
  , 'aqua': '#00FFFF'
  , 'aquamarine': '#7FFFD4'
  , 'azure': '#F0FFFF'
  , 'beige': '#F5F5DC'
  , 'bisque': '#FFE4C4'
  , 'black': '#000000'
  , 'blanchedalmond': '#FFEBCD'
  , 'blue': '#0000FF '
  , 'blueviolet': '#8A2BE2'
  , 'brown': '#A52A2A'
  , 'burlywood': '#DEB887'
  , 'cadetblue': '#5F9EA0'
  , 'chartreuse': '#7FFF00'
  , 'chocolate': '#D2691E'
  , 'coral': '#FF7F50'
  , 'cornflowerblue': '#6495ED'
  , 'cornsilk': '#FFF8DC '
  , 'crimson': '#DC143C '
  , 'cyan': '#00FFFF '
  , 'darkblue': '#00008B'
  , 'darkcyan': '#008B8B'
  , 'darkgoldenrod': '#B8860B'
  , 'darkgray': '#A9A9A9 '
  , 'darkgreen': '#006400 '
  , 'darkgrey': '#A9A9A9 '
  , 'darkkhaki': '#BDB76B '
  , 'darkmagenta': '#8B008B '
  , 'darkolivegreen': '#556B2F '
  , 'darkorange': '#FF8C00 '
  , 'darkorchid': '#9932CC '
  , 'darkred': '#8B0000'
  , 'darksalmon': '#E9967A '
  , 'darkseagreen': '#8FBC8F '
  , 'darkslateblue': '#483D8B '
  , 'darkslategray': '#2F4F4F '
  , 'darkslategrey': '#2F4F4F '
  , 'darkturquoise': '#00CED1 '
  , 'darkviolet': '#9400D3 '
  , 'deeppink': '#FF1493 '
  , 'deepskyblue': '#00BFFF'
  , 'dimgray': '#696969 '
  , 'dimgrey': '#696969 '
  , 'dodgerblue': '#1E90FF'
  , 'firebrick': '#B22222 '
  , 'floralwhite': '#FFFAF0'
  , 'forestgreen': '#228B22'
  , 'fuchsia': '#FF00FF '
  , 'gainsboro': '#DCDCDC '
  , 'ghostwhite': '#F8F8FF '
  , 'gold': '#FFD700 '
  , 'goldenrod': '#DAA520 '
  , 'gray': '#808080 '
  , 'green': '#008000 '
  , 'greenyellow': '#ADFF2F '
  , 'grey': '#808080 '
  , 'honeydew': '#F0FFF0 '
  , 'hotpink': '#FF69B4 '
  , 'indianred': '#CD5C5C'
  , 'indigo': '#4B0082 '
  , 'ivory': '#FFFFF0 '
  , 'khaki': '#F0E68C '
  , 'lavender': '#E6E6FA'
  , 'lavenderblush': '#FFF0F5 '
  , 'lawngreen': '#7CFC00 '
  , 'lemonchiffon': '#FFFACD '
  , 'lightblue': '#ADD8E6 '
  , 'lightcoral': '#F08080 '
  , 'lightcyan': '#E0FFFF '
  , 'lightgoldenrodyellow': '#FAFAD2 '
  , 'lightgray': '#D3D3D3 '
  , 'lightgreen': '#90EE90 '
  , 'lightgrey': '#D3D3D3 '
  , 'lightpink': '#FFB6C1 '
  , 'lightsalmon': '#FFA07A '
  , 'lightseagreen': '#20B2AA'
  , 'lightskyblue': '#87CEFA '
  , 'lightslategray': '#778899 '
  , 'lightslategrey': '#778899 '
  , 'lightsteelblue': '#B0C4DE '
  , 'lightyellow': '#FFFFE0 '
  , 'lime': '#00FF00 '
  , 'limegreen': '#32CD32 '
  , 'linen': '#FAF0E6 '
  , 'magenta': '#FF00FF '
  , 'maroon': '#800000 '
  , 'mediumaquamarine': '#66CDAA '
  , 'mediumblue': '#0000CD '
  , 'mediumorchid': '#BA55D3 '
  , 'mediumpurple': '#9370DB '
  , 'mediumseagreen': '#3CB371 '
  , 'mediumslateblue': '#7B68EE '
  , 'mediumspringgreen': '#00FA9A'
  , 'mediumturquoise': '#48D1CC '
  , 'mediumvioletred': '#C71585 '
  , 'midnightblue': '#191970 '
  , 'mintcream': '#F5FFFA '
  , 'mistyrose': '#FFE4E1 '
  , 'moccasin': '#FFE4B5 '
  , 'navajowhite': '#FFDEAD'
  , 'navy': '#000080 '
  , 'oldlace': '#FDF5E6 '
  , 'olive': '#808000 '
  , 'olivedrab': '#6B8E23 '
  , 'orange': '#FFA500 '
  , 'orangered': '#FF4500 '
  , 'orchid': '#DA70D6 '
  , 'palegoldenrod': '#EEE8AA '
  , 'palegreen': '#98FB98 '
  , 'paleturquoise': '#AFEEEE '
  , 'palevioletred': '#DB7093 '
  , 'papayawhip': '#FFEFD5 '
  , 'peachpuff': '#FFDAB9 '
  , 'peru': '#CD853F '
  , 'pink': '#FFC0CB '
  , 'plum': '#DDA0DD '
  , 'powderblue': '#B0E0E6 '
  , 'purple': '#800080 '
  , 'red': '#FF0000'
  , 'rosybrown': '#BC8F8F'
  , 'royalblue': '#4169E1'
  , 'saddlebrown': '#8B4513'
  , 'salmon': '#FA8072 '
  , 'sandybrown': '#F4A460 '
  , 'seagreen': '#2E8B57 '
  , 'seashell': '#FFF5EE '
  , 'sienna': '#A0522D '
  , 'silver': '#C0C0C0 '
  , 'skyblue': '#87CEEB '
  , 'slateblue': '#6A5ACD '
  , 'slategray': '#708090 '
  , 'slategrey': '#708090 '
  , 'snow': '#FFFAFA'
  , 'springgreen': '#00FF7F'
  , 'steelblue': '#4682B4'
  , 'tan': '#D2B48C'
  , 'teal': '#008080'
  , 'thistle': '#D8BFD8'
  , 'tomato': '#FF6347'
  , 'turquoise': '#40E0D0'
  , 'violet': '#EE82EE'
  , 'wheat': '#F5DEB3'
  , 'white': '#FFFFFF'
  , 'whitesmoke': '#F5F5F5'
  , 'yellow': '#FFFF00'
  , 'yellowgreen': '#9ACD32'
  };

  /**
   * Constructor
   *
   * @api private
   */

  function Assertion (obj, flag, parent) {
    this.obj = obj instanceof jQuery ? obj : $(obj);
    this.flags = {};

    if (undefined != parent) {
      this.flags[flag] = true;

      for (var i in parent.flags) {
        if (parent.flags.hasOwnProperty(i)) {
          this.flags[i] = true;
        }
      }
    }

    var $flags = flag ? flags[flag] : keys(flags)
      , self = this

    if ($flags) {
      for (var i = 0, l = $flags.length; i < l; i++) {
        // avoid recursion
        if (this.flags[$flags[i]]) continue;

        var name = $flags[i]
          , assertion = new Assertion(this.obj, name, this)
  
        if ('function' == typeof Assertion.prototype[name]) {
          // clone the function, make sure we dont touch the prot reference
          var old = this[name];
          this[name] = function () {
            return old.apply(self, arguments);
          }

          for (var fn in Assertion.prototype) {
            if (Assertion.prototype.hasOwnProperty(fn) && fn != name) {
              this[name][fn] = $.proxy(assertion[fn], assertion);
            }
          }
        } else {
          this[name] = assertion;
        }
      }
    }
  };

  /**
   * Performs an assertion
   *
   * @api private
   */

  Assertion.prototype.assert = function (truth, msg, error) {
    var msg = this.flags.not ? error : msg
      , ok = this.flags.not ? !truth : truth;

    if (!ok) {
      throw new Error(msg);
    }

    this.and = new Assertion(this.obj);
  };

  /**
   * Check if the $ object has any elements.
   *
   * @api public
   */

  Assertion.prototype.exist = function (msg) {
    this.assert(
        !!this.obj.length
        , msg || 'expected ' + i(this.obj) + ' to exist'
        , msg || 'expected ' + i(this.obj) + ' not to exist');
    return this;
  };

  /**
   * Has n elements.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.elements =
  Assertion.prototype.items =
  Assertion.prototype.length = function (n, msg) {
    var len = this.obj.length;
    this.assert(
        n == len
      , msg || 'expected ' + i(this.obj) + ' to have a length of ' + n + ' but got ' + len
      , msg || 'expected ' + i(this.obj) + ' to not have a length of ' + len);
    return this;
  };


  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.greaterThan =
  Assertion.prototype.above = function (n, msg) {
    this.assert(
        this.obj.length > n
      , msg || 'expected ' + i(this.obj) + ' to have a length greater than ' + n
      , msg || 'expected ' + i(this.obj) + ' to have a length less than ' + n);
    return this;
  };


  /**
   * Assert numeric value below _n_.
   *
   * @param {Number} n
   * @api public
   */

  Assertion.prototype.lessThan =
  Assertion.prototype.below = function (n, msg) {
    this.assert(
        this.obj.length < n
      , msg || 'expected ' + i(this.obj) + ' to have a length less than ' + n
      , msg || 'expected ' + i(this.obj) + ' to have a length greater than ' + n);
    return this;
  };

  /**
   * Checks if the obj exactly equals another.
   *
   * @api public
   */
  Assertion.prototype.eql =
  Assertion.prototype.equal = function ($el, msg) {
    $el = $el instanceof jQuery ? $el : $($el);
    
    var eq = $el.length == this.obj.length
        &&  !!this.obj.map(function (i, el) {
          return $.inArray(el, $el);
        }).length;

    this.assert(
        eq
      , msg || 'expected ' + i(this.obj) + ' to equal ' + i($el)
      , msg || 'expected ' + i(this.obj) + ' to not equal ' + i($el));
    return this;
  };

  Assertion.prototype.attr = function (prop, val, msg) {
    var got;
    this.assert(
        (got = this.obj.attr(prop)) === val
      , msg || 'expected ' + i(this.obj) + ' to have an attribute ' + prop + ' equals to ' + val
      , msg || 'expected ' + i(this.obj) + ' to not have an attribute ' + prop + ' equals to ' + val);
    return this;
  };


    // Given rgb or color name return the hex representation.
  function normalizeColor (color) {
    if (color.match(/^#/)) {
      return color.toUpperCase();
    } else if (color.match(/^rgb/)) {
      return rgb2hex(color).toUpperCase();
    } else {
      return COLORS[$.trim(color)];
    }
  }

  function compareQuad ($el, prop, val) {
    val = val.split(/\s/);

    var passing = true
      , got = $.map(['top', 'right', 'bottom', 'left'], function (dir, i) {
        var got;
        // 4 values or 2 values repeat or 1 value repeat.
        if ((val[i] || val[i - 2] || val[0]) !== (got = $el.css(prop + '-' + dir))) passing = false;
        return got;
      });

    if (!passing) return got.join(' ');
  }

  Assertion.prototype.css = function (prop, val, msg) {
    var obj = this.obj;
    var template = function (got) {
      return msg || 'expected ' + i(obj) + ' to have its ' + prop 
                  + ' style equal to ' + val + ( got ? ' but got ' + got : '');
    };

    
    var got;
    switch (prop) {
      case 'backgroundColor':
      case 'background-color':
      case 'color':
        this.assert(
          (got = normalizeColor(this.obj.css(prop))) === normalizeColor(val)
        , template(got)
        , template());
        break;

      case 'border-style':
      case 'border-color':
      case 'border-width':
      case 'margin':
      case 'padding':
        this.assert(
          !(got = compareQuad(this.obj, prop, val))
        , template(got)
        , template());
        break;

      case 'border-top':
      case 'border-right':
      case 'border-left':
      case 'border-bottom':

        ['width', 'style', 'color'].forEach(function () {

        })
      case 'border':

        break;
      default:
        this.assert(
          (got = this.obj.css(prop)) === val
        , template(got)
        , template())
    }

    return this;
  };

  Assertion.prototype.text = function (val, strict, msg) {
    if ('boolean' != typeof strict) {
      msg = strict;
      strict = false;
    }

    var re = /[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g
      , text = this.obj.text();

    this.assert(
        strict ? text === val
               : text.replace(re, '').toLowerCase() === val.replace(re, '').toLowerCase()
      , msg || 'expected ' + i(this.obj) + ' text to be equal to ' + val + ' but got ' + text
      , msg || 'expected ' + i(this.obj) + ' text to not be equal to ' + val);

    return this;
  };

  $.each([ 'html', 'val'
         , 'width', 'innerWidth', 'outerWidth'
         , 'height', 'innerHeight', 'outerHeight'
         , 'scrollLeft', 'scrollTop'
         ], function (_, fn) {
          Assertion.prototype[fn] = function (val, msg) {
            var got;
            this.assert(
                (got = this.obj[fn]()) === val
              , msg || 'expected ' + i(this.obj) + ' to have a ' + fn + ' of ' + val + ' but got ' + got
              , msg || 'expected ' + i(this.obj) + ' not to have a ' + fn + ' of ' + val)
            return this;
          };
        });

  $.each([ 'children', 'closest', 'find', 
         , 'next', 'nextAll', 'nextUntil'
         , 'offsetParent', 'parent', 'parents'
         , 'parentsUntil', 'prev', 'prevAll'
         , 'prevUntil', 'siblings'
         ], function (_, fn) {
          Assertion.prototype[fn] = function (val, msg) {
            var got = this.obj[fn](val);

            this.assert(
                !!got.length
              , msg || 'expected ' + i(this.obj) + ' to have ' + fn + ' ' + val
              , msg || 'expected ' + i(this.obj) + ' not to have ' + fn + ' ' + val);

            this.that = this.which = new Assertion(got);

            return this;
          }
         });

  // alias
  Assertion.prototype.contain = Assertion.prototype.find;

  Assertion.prototype.an =
  Assertion.prototype.a = function (obj, msg) {
    this.assert(
        this.obj.is(obj)
      , msg || 'xx'
      , msg || 'x');
    return this;
  };

  Assertion.prototype.end = function () {
    return new Assertion(this.obj.end());
  };

})(this);
