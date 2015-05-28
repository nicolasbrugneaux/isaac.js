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
        key: 'setImage',
        value: function setImage(image) {
            var _this2 = this;

            var type = arguments[1] === undefined ? 'image' : arguments[1];

            if (type === 'canvas') {
                this.image = true;
                this._image = image;
            } else if (image !== this.image) {
                this.image = image;
                this.ready = false;
                this._image = new Image();
                this._image.onload = function () {
                    return _this2.ready = true;
                };
                this._image.src = this.image;
            }
        }
    }, {
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
            var x = Math.round(this._x);
            var y = Math.round(this._y);

            // ctx.fillStyle = 'red';
            // ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );
            if (this.image && this.ready) {
                _canvas.ctx.drawImage(this._image, x, y);
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var isaacImg = _images2['default'].characters.isaac;
var sprite = new Image();
sprite.src = isaacImg.sprite;

var Isaac = (function (_Character) {
    function Isaac() {
        var _this = this;

        _classCallCheck(this, Isaac);

        _get(Object.getPrototypeOf(Isaac.prototype), 'constructor', this).call(this, 28, 35, null, 200, 'Isaac', 3);

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new _collection2['default']();
        this._attackSpeed = 500; // 1 shoot / second
        this._direction = { x: 0, y: 1 };
        this.updateImage(this._direction);
        document.addEventListener('keydown', function (e) {
            return _this._keysDown.add(e.keyCode);
        });
        document.addEventListener('keyup', function (e) {
            return _this._keysDown['delete'](e.keyCode);
        });
    }

    _inherits(Isaac, _Character);

    _createClass(Isaac, [{
        key: 'x',
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_LEFT_ISAAC < value && value < _constants.LIMIT_RIGHT_ISAAC) {
                this._x = value;
            }
        }
    }, {
        key: 'y',
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_TOP_ISAAC < value && value < _constants.LIMIT_BOTTOM_ISAAC) {
                this._y = value;
            }
        }
    }, {
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;
            var keysDown = this._keysDown;

            this.updateImage(false, now);

            if (deplacement === 0) {
                return false;
            }

            if (keysDown.size === 0) {
                return false;
            }

            if (keysDown.has(_constants.KEY_W) && !(keysDown.has(_constants.KEY_A) || keysDown.has(_constants.KEY_D))) // vertical
                {
                    this.y -= deplacement;
                } else if (keysDown.has(_constants.KEY_W)) // diagonal
                {
                    this.y -= Math.sqrt(deplacement);
                } else if (keysDown.has(_constants.KEY_S) && !(keysDown.has(_constants.KEY_A) || keysDown.has(_constants.KEY_D))) //vertical
                {
                    this.y += deplacement;
                } else if (keysDown.has(_constants.KEY_S)) // diagonal
                {
                    this.y += Math.sqrt(deplacement);
                }

            if (keysDown.has(_constants.KEY_A) && !(keysDown.has(_constants.KEY_W) || keysDown.has(_constants.KEY_S))) {
                this.x -= deplacement;
            } else if (keysDown.has(_constants.KEY_A)) {
                this.x -= Math.sqrt(deplacement);
            } else if (keysDown.has(_constants.KEY_D) && !(keysDown.has(_constants.KEY_W) || keysDown.has(_constants.KEY_S))) {
                this.x += deplacement;
            } else if (keysDown.has(_constants.KEY_D)) {
                this.x += Math.sqrt(deplacement);
            }

            this.updateDirection(now);

            return true;
        }
    }, {
        key: 'updateDirection',
        value: function updateDirection(now) {
            var keysDown = this._keysDown;

            var direction = {};
            if (keysDown.has(_constants.KEY_UP)) {
                direction.y = -1;
            } else if (keysDown.has(_constants.KEY_DOWN)) {
                direction.y = 1;
            } else {
                direction.y = 0;
            }

            if (keysDown.has(_constants.KEY_LEFT)) {
                direction.x = -1;
            } else if (keysDown.has(_constants.KEY_RIGHT)) {
                direction.x = 1;
            } else {
                direction.x = 0;
            }

            if (direction.x !== 0 || direction.y !== 0) {
                this._direction = direction;
            }

            if ((keysDown.has(_constants.KEY_UP) || keysDown.has(_constants.KEY_DOWN) || keysDown.has(_constants.KEY_LEFT) || keysDown.has(_constants.KEY_RIGHT)) && (!this._lastShoot || now - this._lastShoot >= this._attackSpeed)) {
                this._lastShoot = now;
                this.updateImage(true, now);
                this.shoot();
            }
        }
    }, {
        key: 'updateImage',
        value: function updateImage(isShooting, now) {
            var head = undefined;

            if (isShooting || !isShooting && now - this._lastShoot <= this._attackSpeed / 2) {
                head = isaacImg.head.shootingDirections;
            } else {
                head = isaacImg.head.directions;
            }

            var direction = this._direction;
            var x = undefined;
            var y = undefined;

            switch (direction.x) {
                case -1:
                    // console.log( 'left' );
                    x = head.left[0];
                    y = head.left[1];
                    break;
                case 1:
                    // console.log( 'right' );
                    x = head.right[0];
                    y = head.right[1];
                    break;
            }

            switch (direction.y) {
                case -1:
                    // console.log( 'up' );
                    x = head.up[0];
                    y = head.up[1];
                    break;
                case 1:
                    // console.log( 'down' );
                    x = head.down[0];
                    y = head.down[1];
                    break;
            }

            // leags
            _canvas.ctx.drawImage(sprite, 0, 25, 18, 14, this._x + 5, this._y + 20, 18, 14);
            // head
            _canvas.ctx.drawImage(sprite, x, y, isaacImg.head.width, isaacImg.head.height, this._x, this._y, isaacImg.head.width, isaacImg.head.height);
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
            var x = undefined;
            var y = undefined;

            switch (this._direction.x) {
                case -1:
                    x = this._x;
                    y = this._y + 2;
                    break;
                case 0:
                    x = this._x + 8;

                    switch (this._direction.y) {
                        case -1:
                            y = this._y - 2;
                            break;
                        case 1:
                            y = this._y + 6;
                            break;
                    }

                    break;
                case 1:
                    x = this._x + 15;
                    y = this._y + 2;
                    break;
            }

            this._tears.add(new _tear2['default'](x, y, this._direction));
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
            _canvas.ctx.fillText((0, _utilsStringRepeat2['default'])('❤ ', this.hp), 35, 13);
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dynamicActor = require('./dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var _constants = require('../constants');

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var Tear = (function (_DynamicActor) {
    function Tear(x, y, direction) {
        var speed = arguments[3] === undefined ? 3 : arguments[3];

        _classCallCheck(this, Tear);

        _get(Object.getPrototypeOf(Tear.prototype), 'constructor', this).call(this, 13, 13, _images2['default'].tears['default']);

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

            if (_constants.LIMIT_LEFT - this.sizeX === this._x || this._x === _constants.LIMIT_RIGHT + this.sizeX || _constants.LIMIT_TOP - this.sizeY === this._y && this._y === _constants.LIMIT_BOTTOM + this.sizeY) {} else {
                _get(Object.getPrototypeOf(Tear.prototype), 'render', this).call(this);
            }
        }
    }]);

    return Tear;
})(_dynamicActor2['default']);

exports['default'] = Tear;
module.exports = exports['default'];

// explode

},{"../constants":10,"../images":11,"./dynamic-actor":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _canvas = require('./canvas');

var LIMIT_TOP_ISAAC = 40;
exports.LIMIT_TOP_ISAAC = LIMIT_TOP_ISAAC;
var LIMIT_BOTTOM_ISAAC = _canvas.canvas.height - 95;
exports.LIMIT_BOTTOM_ISAAC = LIMIT_BOTTOM_ISAAC;
var LIMIT_LEFT_ISAAC = 55;
exports.LIMIT_LEFT_ISAAC = LIMIT_LEFT_ISAAC;
var LIMIT_RIGHT_ISAAC = _canvas.canvas.width - 85;

exports.LIMIT_RIGHT_ISAAC = LIMIT_RIGHT_ISAAC;
var LIMIT_TOP = 55;
exports.LIMIT_TOP = LIMIT_TOP;
var LIMIT_BOTTOM = _canvas.canvas.height - 65;
exports.LIMIT_BOTTOM = LIMIT_BOTTOM;
var LIMIT_LEFT = 60;
exports.LIMIT_LEFT = LIMIT_LEFT;
var LIMIT_RIGHT = _canvas.canvas.width - 75;

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
// preload all images for now.

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var images = {
    rooms: {
        'default': 'build/img/room.png'
    },
    characters: {
        isaac: {
            sprite: 'build/img/isaac_sprite_custom.png',
            head: {
                width: 28,
                height: 25,
                directions: {
                    down: [0, 0],
                    up: [28 * 4, 0],
                    left: [28 * 6, 0],
                    right: [28 * 2, 0]
                },
                shootingDirections: {
                    down: [28, 0],
                    up: [28 * 5, 0],
                    left: [28 * 7, 0],
                    right: [28 * 3, 0]
                }
            },
            legs: {
                width: 18,
                height: 14,
                directions: {
                    down: [0, 25],
                    up: [18 * 5, 25],
                    left: [0, 25],
                    right: [0, 25]
                }
            } }
    },
    tears: {
        'default': 'build/img/tear.png'
    },
    items: {},
    monsters: {},
    obstacles: {
        rocks: {
            sprite: 'build/img/rocks_sprite.png',
            'default': {
                width: 170,
                height: 172,
                position: [0, 0]
            },
            special: {
                width: 170,
                height: 172,
                position: [170, 0]
            } }
    } };

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvc3RyaW5nL3JlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7K0JDQWtCLG9CQUFvQjs7Ozs4QkFDckIsbUJBQW1COzs7O3NCQUNELFVBQVU7O0FBRTdDLElBQUks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LDRCQUE0QjtBQUNwQyx1QkFDQTtBQUNJLHFCQUFLLEVBQUUsR0FBRztBQUNWLHNCQUFNLEVBQUUsR0FBRztBQUNYLHdCQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ25CO0FBQ0QsbUJBQU8sRUFDUDtBQUNJLHFCQUFLLEVBQUUsR0FBRztBQUNWLHNCQUFNLEVBQUUsR0FBRztBQUNYLHdCQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3JCLEVBQ0o7S0FDSixFQUNKLENBQUM7O3FCQUVhLE1BQU07Ozs7Ozs7Ozs7cUJDN0VOLFVBQUUsR0FBRyxFQUFFLEtBQUssRUFDM0I7QUFDSSxRQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxXQUFRLEtBQUssRUFBRSxFQUNmO0FBQ0ksWUFBSSxJQUFJLEdBQUcsQ0FBQztLQUNmO0FBQ0QsV0FBTyxJQUFJLENBQUM7Q0FDZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgSXNhYWMgZnJvbSAnLi9jb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBSb29tIGZyb20gJy4vY29tcG9uZW50cy9yb29tJztcbmltcG9ydCB7IGRpc3BsYXlDdHgsIGNhbnZhcyB9IGZyb20gJy4vY2FudmFzJztcblxubGV0IGFjdG9ycyA9XG5bXG4gICAgbmV3IFJvb20oKSxcbiAgICBuZXcgSXNhYWMoKVxuXTtcblxuY29uc3Qgcm9vbSA9IGFjdG9yc1swXTsgLy8gc2hvcnRjdXRcbmNvbnN0IGlzYWFjID0gYWN0b3JzWzFdOyAvLyBzaG9ydGN1dFxuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBmb3IgKCBsZXQgaT0wLCBsZW49YWN0b3JzLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICB7XG4gICAgICAgIGlmICggIWFjdG9yc1tpXS5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0b3JzW2ldLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGRpc3BsYXlDdHguZHJhd0ltYWdlKCBjYW52YXMsIDAsIDAgKTsgLy8gZHJhdyBzb21ldGhpbmcgdmlzaWJsZSBvbmx5IG9uY2UgcGVyIGZyYW1lLlxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBtYWluICk7XG59O1xuXG5pc2FhYy5yZXNwYXduKCByb29tICk7XG5tYWluKCk7XG4iLCJleHBvcnQgY29uc3QgZGlzcGxheUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwJyApO1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlDdHggPSBkaXNwbGF5Q2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblxuZXhwb3J0IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5jYW52YXMud2lkdGggPSBkaXNwbGF5Q2FudmFzLndpZHRoO1xuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlDYW52YXMuaGVpZ2h0O1xuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCBzaXplWCwgc2l6ZVksIGltYWdlPW51bGwgKVxuICAgIHtcbiAgICAgICAgdGhpcy5zaXplWCA9IHNpemVYO1xuICAgICAgICB0aGlzLnNpemVZID0gc2l6ZVk7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5feCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3kgPSBudWxsO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEltYWdlKCBpbWFnZSwgdHlwZT0naW1hZ2UnIClcbiAgICB7XG4gICAgICAgIGlmICggdHlwZSA9PT0gJ2NhbnZhcycgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGltYWdlICE9PSB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLnNpemVYIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLnNpemVZIC8gMlxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCggdGhpcy5feCApO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCggdGhpcy5feSApO1xuXG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLnNpemVYLCB0aGlzLnNpemVZICk7XG4gICAgICAgIGlmICggdGhpcy5pbWFnZSAmJiB0aGlzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHkgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnLi9keW5hbWljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHNpemVYLCBzaXplWSwgaW1hZ2UsIHNwZWVkLCBuYW1lLCBocCApXG4gICAge1xuICAgICAgICBzdXBlciggc2l6ZVgsIHNpemVZLCBpbWFnZSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGdldCBuYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdDYW5cXCd0IGNoYW5nZSBuYW1lLCBuYW1lIHNldHRlcjonICsgdmFsdWUgKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwID49IHZhbHVlICYmIHZhbHVlIDwgMTAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhckNvbGxlY3Rpb25cbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uID0gW107XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbGxlY3Rpb24ubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGFkZCggaXRlbSApXG4gICAge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnB1c2goIGl0ZW0gKTtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gKVxuICAgIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9jb2xsZWN0aW9uLmluZGV4T2YoIGl0ZW0gKTtcblxuICAgICAgICBpZiAoIGluZGV4ID4gLTEgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uID0gdGhpcy5fY29sbGVjdGlvbi5maWx0ZXIoICggaXRlbSApID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5hY3RpdmU7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgZm9yICggbGV0IGk9MCwgbGVuPXRoaXMuX2NvbGxlY3Rpb24ubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9jb2xsZWN0aW9uW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJy4vYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCBzaXplWCwgc2l6ZVksIGltYWdlPW51bGwsIHNwZWVkPTI1NiApXG4gICAge1xuICAgICAgICBzdXBlciggc2l6ZVgsIHNpemVZLCBpbWFnZSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi9jaGFyYWN0ZXInO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCBUZWFyIGZyb20gJy4vdGVhcic7XG5pbXBvcnQgcmVwZWF0IGZyb20gJy4uL3V0aWxzL3N0cmluZy9yZXBlYXQnO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1BfSVNBQUMsXG4gICAgTElNSVRfQk9UVE9NX0lTQUFDLFxuICAgIExJTUlUX0xFRlRfSVNBQUMsXG4gICAgTElNSVRfUklHSFRfSVNBQUMsXG4gICAgS0VZX1VQLFxuICAgIEtFWV9ET1dOLFxuICAgIEtFWV9MRUZULFxuICAgIEtFWV9SSUdIVCxcbiAgICBLRVlfVyxcbiAgICBLRVlfUyxcbiAgICBLRVlfQSxcbiAgICBLRVlfRFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IGltYWdlcyBmcm9tICcuLi9pbWFnZXMnO1xuXG5jb25zdCBpc2FhY0ltZyA9IGltYWdlcy5jaGFyYWN0ZXJzLmlzYWFjO1xuY29uc3Qgc3ByaXRlID0gbmV3IEltYWdlKCk7XG5zcHJpdGUuc3JjID0gaXNhYWNJbWcuc3ByaXRlO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElzYWFjIGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIDI4LCAzNSwgbnVsbCwgMjAwLCAnSXNhYWMnLCAzICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBuZXcgQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLl9hdHRhY2tTcGVlZCA9IDUwMDsgLy8gMSBzaG9vdCAvIHNlY29uZFxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB7eDogMCwgeTogMX07XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2UoIHRoaXMuX2RpcmVjdGlvbiApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IHRoaXMuX2tleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uZGVsZXRlKCBlLmtleUNvZGUgKSApO1xuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl94ICYmIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiYgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuXG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2UoIGZhbHNlLCBub3cgKTtcblxuICAgICAgICBpZiAoIGRlcGxhY2VtZW50ID09PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5zaXplID09PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgJiZcbiAgICAgICAgICAgICEoIGtleXNEb3duLmhhcyggS0VZX0EgKSB8fCBrZXlzRG93bi5oYXMoIEtFWV9EICkgKSApIC8vIHZlcnRpY2FsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUyApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgKSAvL3ZlcnRpY2FsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IE1hdGguc3FydCggZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIGRlcGxhY2VtZW50ICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0QgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfVyApIHx8IGtleXNEb3duLmhhcyggS0VZX1MgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9EICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5zcXJ0KCBkZXBsYWNlbWVudCApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oIG5vdyApO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgdXBkYXRlRGlyZWN0aW9uKCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uID0ge307XG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICAoIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRpcmVjdGlvbi54ICE9PSAwIHx8IGRpcmVjdGlvbi55ICE9PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfRE9XTiApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9MRUZUICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKSAmJiAoICF0aGlzLl9sYXN0U2hvb3QgfHxcbiAgICAgICAgICAgICggbm93IC0gdGhpcy5fbGFzdFNob290ID49IHRoaXMuX2F0dGFja1NwZWVkICkgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IG5vdztcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSW1hZ2UoIHRydWUsIG5vdyApO1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSW1hZ2UoIGlzU2hvb3RpbmcsIG5vdyApXG4gICAge1xuICAgICAgICBsZXQgaGVhZDtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWNJbWcuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWNJbWcuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnbGVmdCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5sZWZ0WzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLmxlZnRbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coICdyaWdodCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5yaWdodFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaGVhZC5yaWdodFsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbi55IClcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggJ3VwJyApO1xuICAgICAgICAgICAgICAgIHggPSBoZWFkLnVwWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLnVwWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnZG93bicgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5kb3duWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLmRvd25bMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZWFnc1xuICAgICAgICBjdHguZHJhd0ltYWdlKCBzcHJpdGUsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCApO1xuICAgICAgICAvLyBoZWFkXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHNwcml0ZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjSW1nLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhY0ltZy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhY0ltZy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWNJbWcuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZXNwYXduKCByb29tIClcbiAgICB7XG4gICAgICAgIHRoaXMueCA9IHJvb20uc2l6ZVggLyAyO1xuICAgICAgICB0aGlzLnkgPSByb29tLnNpemVZIC8gMjtcbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMuYWRkKCBuZXcgVGVhciggeCwgeSwgdGhpcy5fZGlyZWN0aW9uICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLl90ZWFycy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMucmVuZGVyKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjUwLCA1MCwgNTApJztcbiAgICAgICAgY3R4LmZvbnQgPSAnMjBweCBIZWx2ZXRpY2EnO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIGN0eC5maWxsVGV4dCggcmVwZWF0KCAn4p2kICcsIHRoaXMuaHAgKSwgMzUsIDEzICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmltcG9ydCBpbWFnZXMgZnJvbSAnLi4vaW1hZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbSBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIGltYWdlPWltYWdlcy5yb29tcy5kZWZhdWx0IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCA4MDAsIDQ4MCwgaW1hZ2UgKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnLi9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7XG4gICAgTElNSVRfVE9QLFxuICAgIExJTUlUX0JPVFRPTSxcbiAgICBMSU1JVF9MRUZULFxuICAgIExJTUlUX1JJR0hUXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgaW1hZ2VzIGZyb20gJy4uL2ltYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeCwgeSwgZGlyZWN0aW9uLCBzcGVlZD0zIClcbiAgICB7XG4gICAgICAgIHN1cGVyKCAxMywgMTMsIGltYWdlcy50ZWFycy5kZWZhdWx0ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSBkaXJlY3Rpb24ueCAqIHNwZWVkO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IGRpcmVjdGlvbi55ICogc3BlZWQ7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIExJTUlUX0xFRlQgLSB0aGlzLnNpemVYIDw9IHRoaXMuX3ggJiYgdGhpcy5feCA8PSBMSU1JVF9SSUdIVCArIHRoaXMuc2l6ZVggJiZcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuc2l6ZVkgPD0gdGhpcy5feSAmJiB0aGlzLl95IDw9IExJTUlUX0JPVFRPTSArIHRoaXMuc2l6ZVk7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4gICAgICAgIGlmICggTElNSVRfTEVGVCAtIHRoaXMuc2l6ZVggPT09IHRoaXMuX3ggfHwgdGhpcy5feCA9PT0gTElNSVRfUklHSFQgKyB0aGlzLnNpemVYIHx8XG4gICAgICAgICAgICBMSU1JVF9UT1AgLSB0aGlzLnNpemVZID09PSB0aGlzLl95ICYmIHRoaXMuX3kgPT09IExJTUlUX0JPVFRPTSArIHRoaXMuc2l6ZVkgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBleHBsb2RlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUF9JU0FBQyA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTV9JU0FBQyA9IGNhbnZhcy5oZWlnaHQgLSA5NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUX0lTQUFDID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFRfSVNBQUMgPSBjYW52YXMud2lkdGggLSA4NTtcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSA2NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNjA7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA3NTtcblxuZXhwb3J0IGNvbnN0IEtFWV9VUCA9IDM4O1xuZXhwb3J0IGNvbnN0IEtFWV9ET1dOID0gNDA7XG5leHBvcnQgY29uc3QgS0VZX0xFRlQgPSAzNztcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCBLRVlfVyA9IDg3O1xuZXhwb3J0IGNvbnN0IEtFWV9BID0gNjU7XG5leHBvcnQgY29uc3QgS0VZX1MgPSA4MztcbmV4cG9ydCBjb25zdCBLRVlfRCA9IDY4O1xuIiwiLy8gcHJlbG9hZCBhbGwgaW1hZ2VzIGZvciBub3cuXG5cbmNvbnN0IGltYWdlcyA9XG57XG4gICAgcm9vbXM6XG4gICAge1xuICAgICAgICBkZWZhdWx0OiAnYnVpbGQvaW1nL3Jvb20ucG5nJ1xuICAgIH0sXG4gICAgY2hhcmFjdGVyczpcbiAgICB7XG4gICAgICAgIGlzYWFjOlxuICAgICAgICB7XG4gICAgICAgICAgICBzcHJpdGU6ICdidWlsZC9pbWcvaXNhYWNfc3ByaXRlX2N1c3RvbS5wbmcnLFxuICAgICAgICAgICAgaGVhZDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNSxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZG93bjogWzAsIDBdLFxuICAgICAgICAgICAgICAgICAgICB1cDogWzI4KjQsIDBdLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBbMjgqNiwgMF0sXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBbMjgqMiwgMF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRvd246IFsyOCwgMF0sXG4gICAgICAgICAgICAgICAgICAgIHVwOiBbMjgqNSwgMF0sXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFsyOCo3LCAwXSxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFsyOCozLCAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdzOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDE0LFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkb3duOiBbMCwgMjVdLFxuICAgICAgICAgICAgICAgICAgICB1cDogWzE4KjUsIDI1XSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogWzAsIDI1XSxcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IFswLCAyNV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbiAgICB0ZWFyczpcbiAgICB7XG4gICAgICAgIGRlZmF1bHQ6ICdidWlsZC9pbWcvdGVhci5wbmcnXG4gICAgfSxcbiAgICBpdGVtczpcbiAgICB7XG4gICAgfSxcbiAgICBtb25zdGVyczpcbiAgICB7XG4gICAgfSxcbiAgICBvYnN0YWNsZXM6XG4gICAge1xuICAgICAgICByb2NrczpcbiAgICAgICAge1xuICAgICAgICAgICAgc3ByaXRlOiAnYnVpbGQvaW1nL3JvY2tzX3Nwcml0ZS5wbmcnLFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbMCwgMF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzcGVjaWFsOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFsxNzAsIDBdXG4gICAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlcztcbiIsImV4cG9ydCBkZWZhdWx0ICggc3RyLCB0aW1lcyApID0+XG57XG4gICAgbGV0IF9zdHIgPSAnJztcbiAgICB3aGlsZSAoIHRpbWVzLS0gKVxuICAgIHtcbiAgICAgICAgX3N0ciArPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBfc3RyO1xufTtcbiJdfQ==
