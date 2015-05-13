(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsIsaac = require('./components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

var _componentsRoom = require('./components/room');

var _componentsRoom2 = _interopRequireDefault(_componentsRoom);

var _canvas = require('./canvas');

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

    _canvas.displayCtx.drawImage(_canvas.canvas, 0, 0); // draw something visible only once per frame.

    requestAnimationFrame(main);
};

isaac.respawn(room);
main();

},{"./canvas":2,"./components/isaac":7,"./components/room":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var displayCanvas = document.getElementById('app');
exports.displayCanvas = displayCanvas;
var displayCtx = displayCanvas.getContext('2d');

exports.displayCtx = displayCtx;
var canvas = document.createElement('canvas');
exports.canvas = canvas;
canvas.width = displayCanvas.width;
canvas.height = displayCanvas.height;
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
        key: 'center',
        get: function () {
            return {
                x: this._x + this.sizeX / 2,
                y: this._y + this.sizeY / 2
            };
        }
    }, {
        key: 'render',
        value: function render() {
            // ctx.fillStyle = 'red';
            // ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );

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

},{"./dynamic-actor":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TearCollection = (function () {
    function TearCollection() {
        _classCallCheck(this, TearCollection);

        this._collection = [];
    }

    _createClass(TearCollection, [{
        key: "length",
        get: function () {
            return this._collection.length;
        }
    }, {
        key: "isEmpty",
        get: function () {
            return this._collection.length === 0;
        }
    }, {
        key: "add",
        value: function add(item) {
            this._collection.push(item);
        }
    }, {
        key: "remove",
        value: function remove(item) {
            var index = this._collection.indexOf(item);

            if (index > -1) {
                this._collection.splice(index, 1);
            }
        }
    }, {
        key: "update",
        value: function update() {
            this._collection = this._collection.filter(function (item) {
                item.update();
                return item.active;
            });
        }
    }, {
        key: "render",
        value: function render() {
            for (var i = 0, len = this._collection.length; i < len; i++) {
                this._collection[i].render();
            }
        }
    }]);

    return TearCollection;
})();

exports["default"] = TearCollection;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
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

},{"./actor":3}],7:[function(require,module,exports){
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

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _tear = require('./tear');

var _tear2 = _interopRequireDefault(_tear);

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
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new _collection2['default']();
        this._attackSpeed = 1000; // 1 shoot / second
        this._direction = { x: 0, y: 1 };
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
        key: 'updateDirection',
        value: function updateDirection() {
            if (this._keysDown.size === 0) {
                return;
            }

            var direction = {};
            if (this._keysDown.has(_constants.KEY_UP)) {
                direction.y = -1;
            } else if (this._keysDown.has(_constants.KEY_DOWN)) {
                direction.y = 1;
            } else {
                direction.y = 0;
            }

            if (this._keysDown.has(_constants.KEY_LEFT)) {
                direction.x = -1;
            } else if (this._keysDown.has(_constants.KEY_RIGHT)) {
                direction.x = 1;
            } else {
                direction.x = 0;
            }

            if (direction.x !== 0 || direction.y !== 0) {
                this._direction = direction;
            }
        }
    }, {
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;

            if (deplacement === 0) {
                return false;
            }

            if (this._keysDown.size === 0) {
                return false;
            }

            if (this._keysDown.has(_constants.KEY_W)) {
                this.y -= deplacement;
            } else if (this._keysDown.has(_constants.KEY_S)) {
                this.y += deplacement;
            }

            if (this._keysDown.has(_constants.KEY_A)) {
                this.x -= deplacement;
            } else if (this._keysDown.has(_constants.KEY_D)) {
                this.x += deplacement;
            }

            this.updateDirection();

            if ((this._keysDown.has(_constants.KEY_UP) || this._keysDown.has(_constants.KEY_DOWN) || this._keysDown.has(_constants.KEY_LEFT) || this._keysDown.has(_constants.KEY_RIGHT)) && (!this._lastShoot || now - this._lastShoot >= this._attackSpeed)) {
                this._lastShoot = now;
                this.shoot();
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
        key: 'shoot',
        value: function shoot() {
            this._tears.add(new _tear2['default'](this._x, this._y, this._direction));
        }
    }, {
        key: 'render',
        value: function render() {
            var now = Date.now();
            var delta = now - this._then;
            this._then = now;

            this.update(delta / 1000, now);
            _get(Object.getPrototypeOf(Isaac.prototype), 'render', this).call(this);

            this._tears.update();
            this._tears.render();

            _canvas.ctx.fillStyle = 'rgb(250, 50, 50)';
            _canvas.ctx.font = '20px Helvetica';
            _canvas.ctx.textAlign = 'left';
            _canvas.ctx.textBaseline = 'top';
            _canvas.ctx.fillText(_utilsStringRepeat2['default']('❤ ', this.hp), 35, 13);
        }
    }]);

    return Isaac;
})(_character2['default']);

exports['default'] = Isaac;
module.exports = exports['default'];

},{"../canvas":2,"../constants":10,"../images":11,"../utils/string/repeat":12,"./character":4,"./collection":5,"./tear":9}],8:[function(require,module,exports){
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

},{"../images":11,"./actor":3}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dynamicActor = require('./dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var _canvas = require('../canvas');

var _constants = require('../constants');

var Tear = (function (_DynamicActor) {
    function Tear(x, y, direction) {
        var speed = arguments[3] === undefined ? 5 : arguments[3];

        _classCallCheck(this, Tear);

        _get(Object.getPrototypeOf(Tear.prototype), 'constructor', this).call(this, 15, 15);

        this._x = x;
        this._y = y;
        this.active = true;

        this.xVelocity = direction.x * speed;
        this.yVelocity = direction.y * speed;
    }

    _inherits(Tear, _DynamicActor);

    _createClass(Tear, [{
        key: 'inBounds',
        get: function () {
            return _constants.LIMIT_LEFT - this.sizeX <= this._x && this._x <= _constants.LIMIT_RIGHT + this.sizeX && _constants.LIMIT_TOP - this.sizeY <= this._y && this._y <= _constants.LIMIT_BOTTOM + this.sizeY;
        }
    }, {
        key: 'update',
        value: function update() {
            this._x += this.xVelocity;
            this._y += this.yVelocity;

            this.active = this.active && this.inBounds;
        }
    }, {
        key: 'render',
        value: function render() {
            var colour = _canvas.ctx.createRadialGradient(this.center.x, this.center.y, 0, this.center.x, this.center.y, this.sizeX / 2);
            colour.addColorStop(0, '#0099FF');
            colour.addColorStop(1, '#00ABEB');

            _canvas.ctx.beginPath();
            _canvas.ctx.ellipse(this.center.x, this.center.y, this.sizeX / 2, this.sizeX / 2, 0, 0, Math.PI * 2);
            _canvas.ctx.closePath();

            _canvas.ctx.fillStyle = colour;
            _canvas.ctx.fill();
        }
    }]);

    return Tear;
})(_dynamicActor2['default']);

exports['default'] = Tear;
module.exports = exports['default'];

},{"../canvas":2,"../constants":10,"./dynamic-actor":6}],10:[function(require,module,exports){
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
var KEY_SPACE = 32;
exports.KEY_SPACE = KEY_SPACE;
var KEY_W = 87;
exports.KEY_W = KEY_W;
var KEY_A = 65;
exports.KEY_A = KEY_A;
var KEY_S = 83;
exports.KEY_S = KEY_S;
var KEY_D = 68;
exports.KEY_D = KEY_D;

},{"./canvas":2}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvc3RyaW5nL3JlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7K0JDQWtCLG9CQUFvQjs7Ozs4QkFDckIsbUJBQW1COzs7O3NCQUNELFVBQVU7O0FBRTdDLElBQUks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U0FBSyxFQUNMO0FBQ0ksbUJBQVMsb0JBQW9CO0tBQ2hDO0FBQ0QsY0FBVSxFQUNWO0FBQ0ksYUFBSyxFQUFFLHFCQUFxQjtLQUMvQjtBQUNELFNBQUssRUFDTCxFQUNDO0FBQ0QsWUFBUSxFQUNSLEVBQ0M7QUFDRCxhQUFTLEVBQ1Q7QUFDSSxZQUFJLEVBQUUsRUFBRTtBQUNSLGVBQU8sRUFBRSx3QkFBd0I7S0FDcEM7Q0FDSixDQUFDOztxQkFFYSxNQUFNOzs7Ozs7Ozs7O3FCQ3pCTixVQUFFLEdBQUcsRUFBRSxLQUFLLEVBQzNCO0FBQ0ksUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBUSxLQUFLLEVBQUUsRUFDZjtBQUNJLFlBQUksSUFBSSxHQUFHLENBQUM7S0FDZjtBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IElzYWFjIGZyb20gJy4vY29tcG9uZW50cy9pc2FhYyc7XG5pbXBvcnQgUm9vbSBmcm9tICcuL2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgeyBkaXNwbGF5Q3R4LCBjYW52YXMgfSBmcm9tICcuL2NhbnZhcyc7XG5cbmxldCBhY3RvcnMgPVxuW1xuICAgIG5ldyBSb29tKCksXG4gICAgbmV3IElzYWFjKClcbl07XG5cbmNvbnN0IHJvb20gPSBhY3RvcnNbMF07IC8vIHNob3J0Y3V0XG5jb25zdCBpc2FhYyA9IGFjdG9yc1sxXTsgLy8gc2hvcnRjdXRcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgZm9yICggbGV0IGk9MCwgbGVuPWFjdG9ycy5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAge1xuICAgICAgICBpZiAoICFhY3RvcnNbaV0ucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdG9yc1tpXS5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxuaXNhYWMucmVzcGF3biggcm9vbSApO1xubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvciggc2l6ZVgsIHNpemVZLCBpbWFnZT1udWxsIClcbiAgICB7XG4gICAgICAgIHRoaXMuc2l6ZVggPSBzaXplWDtcbiAgICAgICAgdGhpcy5zaXplWSA9IHNpemVZO1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgICAgIHRoaXMuX3ggPSBudWxsO1xuICAgICAgICB0aGlzLl95ID0gbnVsbDtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgY2VudGVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgdGhpcy5zaXplWCAvIDIsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgdGhpcy5zaXplWSAvIDJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuc2l6ZVgsIHRoaXMuc2l6ZVkgKTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB0aGlzLl94LCB0aGlzLl95ICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJy4vZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCBzaXplWCwgc2l6ZVksIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHNpemVYLCBzaXplWSwgaW1hZ2UgKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlICk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA+PSB2YWx1ZSAmJiB2YWx1ZSA8IDEwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYXJDb2xsZWN0aW9uXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IFtdO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb24ubGVuZ3RoO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBhZGQoIGl0ZW0gKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5wdXNoKCBpdGVtICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCBpdGVtIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fY29sbGVjdGlvbi5pbmRleE9mKCBpdGVtICk7XG5cbiAgICAgICAgaWYgKCBpbmRleCA+IC0xIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbi5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb24uZmlsdGVyKCAoIGl0ZW0gKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYWN0aXZlO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGZvciAoIGxldCBpPTAsIGxlbj10aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbltpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvciggc2l6ZVgsIHNpemVZLCBpbWFnZT1udWxsLCBzcGVlZD0yNTYgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHNpemVYLCBzaXplWSwgaW1hZ2UgKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4vY2hhcmFjdGVyJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgVGVhciBmcm9tICcuL3RlYXInO1xuaW1wb3J0IHJlcGVhdCBmcm9tICcuLi91dGlscy9zdHJpbmcvcmVwZWF0JztcbmltcG9ydCB7XG4gICAgTElNSVRfVE9QLFxuICAgIExJTUlUX0JPVFRPTSxcbiAgICBMSU1JVF9MRUZULFxuICAgIExJTUlUX1JJR0hULFxuICAgIEtFWV9VUCxcbiAgICBLRVlfRE9XTixcbiAgICBLRVlfTEVGVCxcbiAgICBLRVlfUklHSFQsXG4gICAgS0VZX1NQQUNFLFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9EXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgaW1hZ2VzIGZyb20gJy4uL2ltYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElzYWFjIGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIDI4LCAzNSwgaW1hZ2VzLmNoYXJhY3RlcnMuaXNhYWMsIDI1NiwgJ0lzYWFjJywgMyApO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gbmV3IENvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSAxMDAwOyAvLyAxIHNob290IC8gc2Vjb25kXG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHt4OiAwLCB5OiAxfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJiBMSU1JVF9MRUZUIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9SSUdIVCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl94ICYmIExJTUlUX1RPUCA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGlyZWN0aW9uKClcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uc2l6ZSA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkaXJlY3Rpb24gPSB7fTtcbiAgICAgICAgaWYgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9VUCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfRE9XTiApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggZGlyZWN0aW9uLnggIT09IDAgfHwgZGlyZWN0aW9uLnkgIT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIHVwZGF0ZSggdGltZSwgbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gdGhpcy5zcGVlZCAqIHRpbWU7XG5cbiAgICAgICAgaWYgKCBkZXBsYWNlbWVudCA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uc2l6ZSA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfVyApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9TICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9BICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0QgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKCAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1VQICkgfHxcbiAgICAgICAgICAgIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0RPV04gKSB8fFxuICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIHx8XG4gICAgICAgICAgICB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApICkgJiYgKCAhdGhpcy5fbGFzdFNob290IHx8XG4gICAgICAgICAgICAoIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA+PSB0aGlzLl9hdHRhY2tTcGVlZCApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBub3c7XG4gICAgICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXNwYXduKCByb29tIClcbiAgICB7XG4gICAgICAgIHRoaXMueCA9IHJvb20uc2l6ZVggLyAyO1xuICAgICAgICB0aGlzLnkgPSByb29tLnNpemVZIC8gMjtcbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICB0aGlzLl90ZWFycy5hZGQoIG5ldyBUZWFyKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl9kaXJlY3Rpb24gKSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IG5vdyAtIHRoaXMuX3RoZW47XG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoIGRlbHRhIC8gMTAwMCwgbm93ICk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMuX3RlYXJzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLl90ZWFycy5yZW5kZXIoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYigyNTAsIDUwLCA1MCknO1xuICAgICAgICBjdHguZm9udCA9ICcyMHB4IEhlbHZldGljYSc7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KCByZXBlYXQoICfinaQgJywgdGhpcy5ocCApLCAzNSwgMTMgKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuaW1wb3J0IGltYWdlcyBmcm9tICcuLi9pbWFnZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggaW1hZ2U9aW1hZ2VzLnJvb21zLmRlZmF1bHQgKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIDgwMCwgNDgwLCBpbWFnZSApO1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICcuL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcbmltcG9ydCB7XG4gICAgTElNSVRfVE9QLFxuICAgIExJTUlUX0JPVFRPTSxcbiAgICBMSU1JVF9MRUZULFxuICAgIExJTUlUX1JJR0hUXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeCwgeSwgZGlyZWN0aW9uLCBzcGVlZD01IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCAxNSwgMTUgKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IGRpcmVjdGlvbi54ICogc3BlZWQ7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gZGlyZWN0aW9uLnkgKiBzcGVlZDtcblxuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICByZXR1cm4gTElNSVRfTEVGVCAtIHRoaXMuc2l6ZVggPD0gdGhpcy5feCAmJiB0aGlzLl94IDw9IExJTUlUX1JJR0hUICsgdGhpcy5zaXplWCAmJlxuICAgICAgICAgICAgTElNSVRfVE9QIC0gdGhpcy5zaXplWSA8PSB0aGlzLl95ICYmIHRoaXMuX3kgPD0gTElNSVRfQk9UVE9NICsgdGhpcy5zaXplWTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlICYmIHRoaXMuaW5Cb3VuZHM7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbG91ciA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCggdGhpcy5jZW50ZXIueCwgdGhpcy5jZW50ZXIueSwgMCwgdGhpcy5jZW50ZXIueCwgdGhpcy5jZW50ZXIueSwgdGhpcy5zaXplWCAvIDIgKTtcbiAgICAgICAgY29sb3VyLmFkZENvbG9yU3RvcCggMCwnIzAwOTlGRicgKTtcbiAgICAgICAgY29sb3VyLmFkZENvbG9yU3RvcCggMSwnIzAwQUJFQicgKTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5lbGxpcHNlKCB0aGlzLmNlbnRlci54LCB0aGlzLmNlbnRlci55LCB0aGlzLnNpemVYIC8gMiwgdGhpcy5zaXplWCAvIDIsIDAsIDAsIE1hdGguUEkgKiAyICk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSAxMDA7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gODU7XG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCIvLyBwcmVsb2FkIGFsbCBpbWFnZXMgZm9yIG5vdy5cblxuY29uc3QgaW1hZ2VzID1cbntcbiAgICByb29tczpcbiAgICB7XG4gICAgICAgIGRlZmF1bHQ6ICdidWlsZC9pbWcvcm9vbS5wbmcnXG4gICAgfSxcbiAgICBjaGFyYWN0ZXJzOlxuICAgIHtcbiAgICAgICAgaXNhYWM6ICdidWlsZC9pbWcvaXNhYWMucG5nJ1xuICAgIH0sXG4gICAgaXRlbXM6XG4gICAge1xuICAgIH0sXG4gICAgbW9uc3RlcnM6XG4gICAge1xuICAgIH0sXG4gICAgb2JzdGFjbGVzOlxuICAgIHtcbiAgICAgICAgcG9vcDogJycsXG4gICAgICAgIHJlZFBvb3A6ICdidWlsZC9pbWcvcmVkX3Bvb3AucG5nJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlcztcbiIsImV4cG9ydCBkZWZhdWx0ICggc3RyLCB0aW1lcyApID0+XG57XG4gICAgbGV0IF9zdHIgPSAnJztcbiAgICB3aGlsZSAoIHRpbWVzLS0gKVxuICAgIHtcbiAgICAgICAgX3N0ciArPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBfc3RyO1xufTtcbiJdfQ==
