(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var _canvas = require('./canvas');

var _constants = require('./constants');

var _utils = require('./utils');

var _isaac = require('./isaac');

var _isaac2 = _interopRequireDefault(_isaac);

var keysDown = new Set();
document.addEventListener('keydown', function (e) {
    return keysDown.add(e.keyCode);
});
document.addEventListener('keyup', function (e) {
    return keysDown['delete'](e.keyCode);
});

var reset = function reset() {
    _isaac2['default'].x = _canvas.canvas.width / 2;
    _isaac2['default'].y = _canvas.canvas.height / 2;
};

var update = function update(modifier) {
    var deplacement = _isaac2['default'].speed * modifier;

    if (keysDown.size === 0) {
        return false;
    }

    if (keysDown.has(_constants.KEY_UP)) // UP
        {
            _isaac2['default'].y -= deplacement;
        } else if (keysDown.has(_constants.KEY_DOWN)) // DOWN
        {
            _isaac2['default'].y += deplacement;
        }

    if (keysDown.has(_constants.KEY_LEFT)) // LEFT
        {
            _isaac2['default'].x -= deplacement;
        } else if (keysDown.has(_constants.KEY_RIGHT)) // RIGHT
        {
            _isaac2['default'].x += deplacement;
        }

    return true;
};

// Draw the things!

var render = function render() {
    if (_images2['default'].background.ready) {
        _canvas.ctx.drawImage(_images2['default'].background.img, 0, 0);
    }

    if (_images2['default'].isaac.ready) {
        _canvas.ctx.drawImage(_images2['default'].isaac.img, _isaac2['default'].x, _isaac2['default'].y);
    }

    if (_images2['default'].background.ready && _images2['default'].isaac.ready) {
        firstRender = false;
    }

    _canvas.ctx.fillStyle = 'rgb(250, 50, 50)';
    _canvas.ctx.font = '20px Helvetica';
    _canvas.ctx.textAlign = 'left';
    _canvas.ctx.textBaseline = 'top';
    _canvas.ctx.fillText(_utils.repeat('❤ ', _isaac2['default'].hp), 35, 13);
};

var then = Date.now();
var firstRender = true;
var main = function main() {
    var now = Date.now();
    var delta = now - then;

    if (firstRender || update(delta / 1000)) {
        console.log(firstRender, _isaac2['default']);
        render();
    }
    then = now;

    requestAnimationFrame(main);
};

reset();
main();

},{"./canvas":2,"./constants":3,"./images":4,"./isaac":5,"./utils":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var canvas = document.getElementById('app');
exports.canvas = canvas;
var ctx = canvas.getContext('2d');
exports.ctx = ctx;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _canvas = require('./canvas');

var LIMIT_TOP = 40;
exports.LIMIT_TOP = LIMIT_TOP;
var LIMIT_BOTTOM = _canvas.canvas.height - 100;
exports.LIMIT_BOTTOM = LIMIT_BOTTOM;
var LIMIT_LEFT = 55;
exports.LIMIT_LEFT = LIMIT_LEFT;
var LIMIT_RIGHT = _canvas.canvas.width - 85;
exports.LIMIT_RIGHT = LIMIT_RIGHT;
var KEY_UP = 38;
exports.KEY_UP = KEY_UP;
var KEY_DOWN = 40;
exports.KEY_DOWN = KEY_DOWN;
var KEY_LEFT = 37;
exports.KEY_LEFT = KEY_LEFT;
var KEY_RIGHT = 39;
exports.KEY_RIGHT = KEY_RIGHT;

},{"./canvas":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// preload all images for now.

var images = {
    background: {
        src: 'build/img/room.png',
        ready: false,
        img: new Image()
    },
    isaac: {
        src: 'build/img/isaac.png',
        ready: false,
        img: new Image()
    }
};

for (var prop in images) {
    if (images.hasOwnProperty(prop)) {
        images[prop].img.onload = (function (prop) {
            images[prop].ready = true;
        }).bind(null, prop);
        images[prop].img.src = images[prop].src;
    }
}

exports['default'] = images;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _constants = require('./constants');

var Isaac = (function () {
    function Isaac() {
        var speed = arguments[0] === undefined ? 256 : arguments[0];
        var hp = arguments[1] === undefined ? 3 : arguments[1];

        _classCallCheck(this, Isaac);

        this._x = 0;
        this._y = 0;
        this._speed = speed;
        this._hp = hp;
    }

    _createClass(Isaac, [{
        key: 'speed',
        get: function () {
            return this._speed;
        }
    }, {
        key: 'hp',
        get: function () {
            return this._hp;
        },
        set: function (value) {
            this._hp = value;
        }
    }, {
        key: 'x',
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_LEFT < value && value < _constants.LIMIT_RIGHT) {
                this._x = value;
            }
        }
    }, {
        key: 'y',
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_TOP < value && value < _constants.LIMIT_BOTTOM) {
                this._y = value;
            }
        }
    }]);

    return Isaac;
})();

exports['default'] = new Isaac();
module.exports = exports['default'];

},{"./constants":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var repeat = function repeat(str, times) {
    var _str = '';
    while (times--) {
        _str += str;
    }
    return _str;
};
exports.repeat = repeat;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2lzYWFjLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztzQkNBbUIsVUFBVTs7OztzQkFDRCxVQUFVOzt5QkFNL0IsYUFBYTs7cUJBQ0csU0FBUzs7cUJBQ2QsU0FBUzs7OztBQUUzQixJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBRSxTQUFTLEVBQUUsVUFBRSxDQUFDO1dBQU0sUUFBUSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsT0FBTyxDQUFFO0NBQUEsQ0FBRSxDQUFDO0FBQzNFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBRSxPQUFPLEVBQUUsVUFBRSxDQUFDO1dBQU0sUUFBUSxVQUFPLENBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBRTtDQUFBLENBQUUsQ0FBQzs7QUFFNUUsSUFBTSxLQUFLLEdBQUcsU0FBUixLQUFLLEdBQ1g7QUFDSSx1QkFBTSxDQUFDLEdBQUcsUUFoQkwsTUFBTSxDQWdCTSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLHVCQUFNLENBQUMsR0FBRyxRQWpCTCxNQUFNLENBaUJNLE1BQU0sR0FBRyxDQUFDLENB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QUUsQ0FBQztTQUNsQjthQVVJLFVBQUUsS0FBSyxFQUNaO0FBQ0ksZ0JBQUssS0FBSyxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksV0FuRDlCLFNBQVMsR0FtRGlDLEtBQUssSUFBSSxLQUFLLGNBbER4RCxZQUFZLEFBa0QyRCxFQUNuRTtBQUNJLG9CQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQzthQUNuQjtTQUNKOzs7V0FqREMsS0FBSzs7O3FCQXFESSxJQUFJLEtBQUssRUFBRTs7Ozs7Ozs7O0FDNURuQixJQUFNLE1BQU0sR0FBRyxTQUFULE1BQU0sQ0FBSyxHQUFHLEVBQUUsS0FBSyxFQUNsQztBQUNJLFFBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLFdBQVEsS0FBSyxFQUFFLEVBQ2Y7QUFDSSxZQUFJLElBQUksR0FBRyxDQUFDO0tBQ2Y7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmLENBQUE7UUFSWSxNQUFNLEdBQU4sTUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaW1hZ2VzIGZyb20gJy4vaW1hZ2VzJztcbmltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHtcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hUXG59IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IHJlcGVhdCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IElzYWFjIGZyb20gJy4vaXNhYWMnO1xuXG5sZXQga2V5c0Rvd24gPSBuZXcgU2V0KCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IGtleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IGtleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuY29uc3QgcmVzZXQgPSAoKSA9Plxue1xuICAgIElzYWFjLnggPSBjYW52YXMud2lkdGggLyAyO1xuICAgIElzYWFjLnkgPSBjYW52YXMuaGVpZ2h0IC8gMjtcbn1cblxuY29uc3QgdXBkYXRlID0gKCBtb2RpZmllciApID0+XG57XG4gICAgY29uc3QgZGVwbGFjZW1lbnQgPSBJc2FhYy5zcGVlZCAqIG1vZGlmaWVyO1xuXG4gICAgaWYgKCBrZXlzRG93bi5zaXplID09PSAwIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1VQICkgKSAvLyBVUFxuICAgIHtcbiAgICAgICAgSXNhYWMueSAtPSBkZXBsYWNlbWVudDtcbiAgICB9XG4gICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApIC8vIERPV05cbiAgICB7XG4gICAgICAgIElzYWFjLnkgKz0gZGVwbGFjZW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApICkgLy8gTEVGVFxuICAgIHtcbiAgICAgICAgSXNhYWMueCAtPSBkZXBsYWNlbWVudDtcbiAgICB9XG4gICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKSAvLyBSSUdIVFxuICAgIHtcbiAgICAgICAgSXNhYWMueCArPSBkZXBsYWNlbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIERyYXcgdGhlIHRoaW5ncyFcblxuXG5jb25zdCByZW5kZXIgPSAoKSA9Plxue1xuICAgIGlmICggaW1hZ2VzLmJhY2tncm91bmQucmVhZHkgKVxuICAgIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggaW1hZ2VzLmJhY2tncm91bmQuaW1nLCAwLCAwICk7XG4gICAgfVxuXG4gICAgaWYgKCBpbWFnZXMuaXNhYWMucmVhZHkgKVxuICAgIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggaW1hZ2VzLmlzYWFjLmltZywgSXNhYWMueCwgSXNhYWMueSApO1xuICAgIH1cblxuICAgIGlmICggaW1hZ2VzLmJhY2tncm91bmQucmVhZHkgJiYgaW1hZ2VzLmlzYWFjLnJlYWR5IClcbiAgICB7XG4gICAgICAgIGZpcnN0UmVuZGVyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiKDI1MCwgNTAsIDUwKVwiO1xuICAgIGN0eC5mb250ID0gXCIyMHB4IEhlbHZldGljYVwiO1xuICAgIGN0eC50ZXh0QWxpZ24gPSBcImxlZnRcIjtcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJ0b3BcIjtcbiAgICBjdHguZmlsbFRleHQoIHJlcGVhdCggJ+KdpCAnLCBJc2FhYy5ocCApLCAzNSwgMTMgKTtcbn1cblxubGV0IHRoZW4gPSBEYXRlLm5vdygpO1xubGV0IGZpcnN0UmVuZGVyID0gdHJ1ZTtcbmNvbnN0IG1haW4gPSAoKSA9Plxue1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgaWYgKCBmaXJzdFJlbmRlciB8fCB1cGRhdGUoIGRlbHRhIC8gMTAwMCApIClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKCBmaXJzdFJlbmRlciwgSXNhYWMgKTtcbiAgICAgICAgcmVuZGVyKCk7XG4gICAgfVxuICAgIHRoZW4gPSBub3c7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG1haW4gKTtcbn1cblxucmVzZXQoKTtcbm1haW4oKTtcbiIsImV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA4NTtcbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG4iLCIvLyBwcmVsb2FkIGFsbCBpbWFnZXMgZm9yIG5vdy5cblxuY29uc3QgaW1hZ2VzID1cbntcbiAgICBiYWNrZ3JvdW5kOlxuICAgIHtcbiAgICAgICAgc3JjOiAnYnVpbGQvaW1nL3Jvb20ucG5nJyxcbiAgICAgICAgcmVhZHkgOiBmYWxzZSxcbiAgICAgICAgaW1nOiBuZXcgSW1hZ2UoKVxuICAgIH0sXG4gICAgaXNhYWM6XG4gICAge1xuICAgICAgICBzcmM6ICdidWlsZC9pbWcvaXNhYWMucG5nJyxcbiAgICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgICBpbWc6IG5ldyBJbWFnZSgpXG4gICAgfVxufVxuXG5mb3IgKCBsZXQgcHJvcCBpbiBpbWFnZXMgKVxue1xuICAgIGlmICggaW1hZ2VzLmhhc093blByb3BlcnR5KCBwcm9wICkgKVxuICAgIHtcbiAgICAgICAgaW1hZ2VzW3Byb3BdLmltZy5vbmxvYWQgPSAoIHByb3AgKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpbWFnZXNbcHJvcF0ucmVhZHkgPSB0cnVlO1xuICAgICAgICB9LmJpbmQoIG51bGwsIHByb3AgKTtcbiAgICAgICAgaW1hZ2VzW3Byb3BdLmltZy5zcmMgPSBpbWFnZXNbcHJvcF0uc3JjO1xuICAgIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBpbWFnZXM7XG4iLCJpbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVFxufSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmNsYXNzIElzYWFjXG57XG4gICAgY29uc3RydWN0b3IoIHNwZWVkPTI1NiwgaHA9MyApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJiBMSU1JVF9MRUZUIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9SSUdIVCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl94ICYmIExJTUlUX1RPUCA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBJc2FhYygpO1xuIiwiZXhwb3J0IGNvbnN0IHJlcGVhdCA9ICggc3RyLCB0aW1lcyApID0+XG57XG4gICAgbGV0IF9zdHIgPSAnJztcbiAgICB3aGlsZSAoIHRpbWVzLS0gKVxuICAgIHtcbiAgICAgICAgX3N0ciArPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBfc3RyO1xufVxuIl19
