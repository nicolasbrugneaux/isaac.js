(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsIsaac = require('./components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

var _componentsRoom = require('./components/room');

var _componentsRoom2 = _interopRequireDefault(_componentsRoom);

var actors = [new _componentsRoom2['default'](), new _componentsIsaac2['default']()];

var room = actors[0]; // shortcut
var isaac = actors[1]; // shortcut

var main = function main() {
    for (var i = 0, len = actors.length; i < len; i++) {
        if (!actors[i].ready) {
            continue;
        }

        actors[i].render();
    }

    requestAnimationFrame(main);
};

isaac.respawn(room);
main();

},{"./components/isaac":6,"./components/room":7}],2:[function(require,module,exports){
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _canvas = require('../canvas');

var Actor = (function () {
    function Actor(sizeX, sizeY) {
        var _this = this;

        var image = arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, Actor);

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.image = image;
        this._x = null;
        this._y = null;

        if (this.image) {
            this.ready = false;
            this._image = new Image();
            this._image.onload = function () {
                return _this.ready = true;
            };
            this._image.src = this.image;
        } else {
            this.ready = true;
        }
    }

    _createClass(Actor, [{
        key: 'x',
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        }
    }, {
        key: 'y',
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._y = value;
        }
    }, {
        key: 'render',
        value: function render() {
            _canvas.ctx.fillStyle = 'red';
            _canvas.ctx.fillRect(this._x, this._y, this.sizeX, this.sizeY);

            if (this.image && this.ready) {
                _canvas.ctx.drawImage(this._image, this._x, this._y);
            }
        }
    }]);

    return Actor;
})();

exports['default'] = Actor;
module.exports = exports['default'];

},{"../canvas":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dynamicActor = require('./dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var Character = (function (_DynamicActor) {
    function Character(sizeX, sizeY, image, speed, name, hp) {
        _classCallCheck(this, Character);

        _get(Object.getPrototypeOf(Character.prototype), 'constructor', this).call(this, sizeX, sizeY, image);

        this._speed = speed;
        this._hp = hp;
        this._name = name;
    }

    _inherits(Character, _DynamicActor);

    _createClass(Character, [{
        key: 'name',
        get: function () {
            return this._name;
        },
        set: function (value) {
            throw new Error('Can\'t change name, name setter:' + value);
        }
    }, {
        key: 'hp',
        get: function () {
            return this._hp;
        },
        set: function (value) {
            if (0 >= value && value < 10) {
                this._hp = value;
            }
        }
    }]);

    return Character;
})(_dynamicActor2['default']);

exports['default'] = Character;
module.exports = exports['default'];

},{"./dynamic-actor":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x3,
    property = _x4,
    receiver = _x5; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var DynamicActor = (function (_Actor) {
    function DynamicActor(sizeX, sizeY) {
        var image = arguments[2] === undefined ? null : arguments[2];
        var speed = arguments[3] === undefined ? 256 : arguments[3];

        _classCallCheck(this, DynamicActor);

        _get(Object.getPrototypeOf(DynamicActor.prototype), 'constructor', this).call(this, sizeX, sizeY, image);

        this._speed = speed;
    }

    _inherits(DynamicActor, _Actor);

    _createClass(DynamicActor, [{
        key: 'speed',
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        }
    }]);

    return DynamicActor;
})(_actor2['default']);

exports['default'] = DynamicActor;
module.exports = exports['default'];

},{"./actor":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _canvas = require('../canvas');

var _character = require('./character');

var _character2 = _interopRequireDefault(_character);

var _utilsStringRepeat = require('../utils/string/repeat');

var _utilsStringRepeat2 = _interopRequireDefault(_utilsStringRepeat);

var _constants = require('../constants');

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var Isaac = (function (_Character) {
    function Isaac() {
        var _this2 = this;

        _classCallCheck(this, Isaac);

        _get(Object.getPrototypeOf(Isaac.prototype), 'constructor', this).call(this, 28, 35, _images2['default'].characters.isaac, 256, 'Isaac', 3);

        this._then = Date.now();
        this._keysDown = new Set();
        document.addEventListener('keydown', function (e) {
            return _this2._keysDown.add(e.keyCode);
        });
        document.addEventListener('keyup', function (e) {
            return _this2._keysDown['delete'](e.keyCode);
        });
    }

    _inherits(Isaac, _Character);

    _createClass(Isaac, [{
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
    }, {
        key: 'move',
        value: function move(time) {
            var deplacement = this.speed * time;

            if (deplacement === 0) {
                return false;
            }

            if (this._keysDown.size === 0) {
                return false;
            }

            if (this._keysDown.has(_constants.KEY_UP)) // UP
                {
                    this.y -= deplacement;
                } else if (this._keysDown.has(_constants.KEY_DOWN)) // DOWN
                {
                    this.y += deplacement;
                }

            if (this._keysDown.has(_constants.KEY_LEFT)) // LEFT
                {
                    this.x -= deplacement;
                } else if (this._keysDown.has(_constants.KEY_RIGHT)) // RIGHT
                {
                    this.x += deplacement;
                }

            return true;
        }
    }, {
        key: 'respawn',
        value: function respawn(room) {
            this.x = room.sizeX / 2;
            this.y = room.sizeY / 2;
        }
    }, {
        key: 'render',
        value: function render() {
            var now = Date.now();
            var delta = now - this._then;
            this._then = now;
            this.move(delta / 1000);

            // if ( this.move( delta / 1000 ) )
            // {
            _get(Object.getPrototypeOf(Isaac.prototype), 'render', this).call(this);

            _canvas.ctx.fillStyle = 'rgb(250, 50, 50)';
            _canvas.ctx.font = '20px Helvetica';
            _canvas.ctx.textAlign = 'left';
            _canvas.ctx.textBaseline = 'top';
            _canvas.ctx.fillText(_utilsStringRepeat2['default']('❤ ', this.hp), 35, 13);
            // }
        }
    }]);

    return Isaac;
})(_character2['default']);

exports['default'] = Isaac;
module.exports = exports['default'];

},{"../canvas":2,"../constants":8,"../images":9,"../utils/string/repeat":10,"./character":4}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var Room = (function (_Actor) {
    function Room() {
        var image = arguments[0] === undefined ? _images2['default'].rooms['default'] : arguments[0];

        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, 800, 480, image);
        this._x = 0;
        this._y = 0;
    }

    _inherits(Room, _Actor);

    return Room;
})(_actor2['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../images":9,"./actor":3}],8:[function(require,module,exports){
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

},{"./canvas":2}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// preload all images for now.

var images = {
    rooms: {
        'default': 'build/img/room.png'
    },
    characters: {
        isaac: 'build/img/isaac.png'
    },
    items: {},
    monsters: {},
    obstacles: {
        poop: '',
        redPoop: 'build/img/red_poop.png'
    }
};

exports['default'] = images;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

exports['default'] = function (str, times) {
    var _str = '';
    while (times--) {
        _str += str;
    }
    return _str;
};

module.exports = exports['default'];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2lzYWFjLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvcm9vbS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzL3N0cmluZy9yZXBlYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OytCQ0FrQixvQkFBb0I7Ozs7OEJBQ3JCLG1CQUFtQjs7OztBQUVwQyxJQUFJLE1BQU0sR0FDVixDQUNJLGlDQUFVLEVBQ1Ysa0NBQVcsQ0FDZCxDQUFDOztBQUVGLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXhC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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgSXNhYWMgZnJvbSAnLi9jb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBSb29tIGZyb20gJy4vY29tcG9uZW50cy9yb29tJztcblxubGV0IGFjdG9ycyA9XG5bXG4gICAgbmV3IFJvb20oKSxcbiAgICBuZXcgSXNhYWMoKVxuXTtcblxuY29uc3Qgcm9vbSA9IGFjdG9yc1swXTsgLy8gc2hvcnRjdXRcbmNvbnN0IGlzYWFjID0gYWN0b3JzWzFdOyAvLyBzaG9ydGN1dFxuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBmb3IgKCBsZXQgaT0wLCBsZW49YWN0b3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICB7XG4gICAgICAgIGlmICggIWFjdG9yc1tpXS5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0b3JzW2ldLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxuaXNhYWMucmVzcGF3biggcm9vbSApO1xubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwJyApO1xuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCBzaXplWCwgc2l6ZVksIGltYWdlPW51bGwgKVxuICAgIHtcbiAgICAgICAgdGhpcy5zaXplWCA9IHNpemVYO1xuICAgICAgICB0aGlzLnNpemVZID0gc2l6ZVk7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5feCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3kgPSBudWxsO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuc2l6ZVgsIHRoaXMuc2l6ZVkgKTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB0aGlzLl94LCB0aGlzLl95ICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJy4vZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCBzaXplWCwgc2l6ZVksIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHNpemVYLCBzaXplWSwgaW1hZ2UgKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlICk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA+PSB2YWx1ZSAmJiB2YWx1ZSA8IDEwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvciggc2l6ZVgsIHNpemVZLCBpbWFnZT1udWxsLCBzcGVlZD0yNTYgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHNpemVYLCBzaXplWSwgaW1hZ2UgKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4vY2hhcmFjdGVyJztcbmltcG9ydCByZXBlYXQgZnJvbSAnLi4vdXRpbHMvc3RyaW5nL3JlcGVhdCc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVCxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hUXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgaW1hZ2VzIGZyb20gJy4uL2ltYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElzYWFjIGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIDI4LCAzNSwgaW1hZ2VzLmNoYXJhY3RlcnMuaXNhYWMsIDI1NiwgJ0lzYWFjJywgMyApO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJiBMSU1JVF9MRUZUIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9SSUdIVCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl94ICYmIExJTUlUX1RPUCA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbW92ZSggdGltZSApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuXG4gICAgICAgIGlmICggZGVwbGFjZW1lbnQgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLnNpemUgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1VQICkgKSAvLyBVUFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0RPV04gKSApIC8vIERPV05cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApICkgLy8gTEVGVFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKSAvLyBSSUdIVFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXNwYXduKCByb29tIClcbiAgICB7XG4gICAgICAgIHRoaXMueCA9IHJvb20uc2l6ZVggLyAyO1xuICAgICAgICB0aGlzLnkgPSByb29tLnNpemVZIC8gMjtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB0aGlzLm1vdmUoIGRlbHRhIC8gMTAwMCApO1xuXG4gICAgICAgIC8vIGlmICggdGhpcy5tb3ZlKCBkZWx0YSAvIDEwMDAgKSApXG4gICAgICAgIC8vIHtcbiAgICAgICAgICAgIHN1cGVyLnJlbmRlcigpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYigyNTAsIDUwLCA1MCknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMjBweCBIZWx2ZXRpY2EnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggcmVwZWF0KCAn4p2kICcsIHRoaXMuaHAgKSwgMzUsIDEzICk7XG4gICAgICAgIC8vIH1cblxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuaW1wb3J0IGltYWdlcyBmcm9tICcuLi9pbWFnZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggaW1hZ2U9aW1hZ2VzLnJvb21zLmRlZmF1bHQgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIDgwMCwgNDgwLCBpbWFnZSApO1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA4NTtcbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG4iLCIvLyBwcmVsb2FkIGFsbCBpbWFnZXMgZm9yIG5vdy5cblxuY29uc3QgaW1hZ2VzID1cbntcbiAgICByb29tczpcbiAgICB7XG4gICAgICAgIGRlZmF1bHQ6ICdidWlsZC9pbWcvcm9vbS5wbmcnXG4gICAgfSxcbiAgICBjaGFyYWN0ZXJzOlxuICAgIHtcbiAgICAgICAgaXNhYWM6ICdidWlsZC9pbWcvaXNhYWMucG5nJ1xuICAgIH0sXG4gICAgaXRlbXM6XG4gICAge1xuICAgIH0sXG4gICAgbW9uc3RlcnM6XG4gICAge1xuICAgIH0sXG4gICAgb2JzdGFjbGVzOlxuICAgIHtcbiAgICAgICAgcG9vcDogJycsXG4gICAgICAgIHJlZFBvb3A6ICdidWlsZC9pbWcvcmVkX3Bvb3AucG5nJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlcztcbiIsImV4cG9ydCBkZWZhdWx0ICggc3RyLCB0aW1lcyApID0+XG57XG4gICAgbGV0IF9zdHIgPSAnJztcbiAgICB3aGlsZSAoIHRpbWVzLS0gKVxuICAgIHtcbiAgICAgICAgX3N0ciArPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBfc3RyO1xufTtcbiJdfQ==
