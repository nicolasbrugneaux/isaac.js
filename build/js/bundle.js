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

        _get(Object.getPrototypeOf(Isaac.prototype), 'constructor', this).call(this, 28, 35, null, 256, 'Isaac', 3);

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new _collection2['default']();
        this._attackSpeed = 1000; // 1 shoot / second
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
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;
            this.updateImage();

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
        key: 'updateImage',
        value: function updateImage(direction) {
            direction = this._direction;
            var x = undefined;
            var y = undefined;
            switch (direction.x) {
                case -1:
                    // console.log( 'left' );
                    x = isaacImg.head.directions.left[0];
                    y = isaacImg.head.directions.left[1];
                    break;
                case 1:
                    // console.log( 'right' );
                    x = isaacImg.head.directions.right[0];
                    y = isaacImg.head.directions.right[1];
                    break;
            }

            switch (direction.y) {
                case -1:
                    // console.log( 'up' );
                    x = isaacImg.head.directions.up[0];
                    y = isaacImg.head.directions.up[1];
                    break;
                case 1:
                    // console.log( 'down' );
                    x = isaacImg.head.directions.down[0];
                    y = isaacImg.head.directions.down[1];
                    break;
            }
            var center = this.center;
            // leags
            _canvas.ctx.drawImage(sprite, 0, 25, 18, 14, center.x + 5, center.y + 20, 18, 14);
            // head
            _canvas.ctx.drawImage(sprite, x, y, isaacImg.head.width, isaacImg.head.height, center.x, center.y, isaacImg.head.width, isaacImg.head.height);
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
            var x = Math.round(this.center.x);
            var y = Math.round(this.center.y);

            var colour = _canvas.ctx.createRadialGradient(x, y, 0, x, y, this.sizeX / 2);
            colour.addColorStop(0, '#0099FF');
            colour.addColorStop(1, '#00ABEB');

            _canvas.ctx.beginPath();
            _canvas.ctx.ellipse(x, y, this.sizeX / 2, this.sizeX / 2, 0, 0, Math.PI * 2);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvc3RyaW5nL3JlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7K0JDQWtCLG9CQUFvQjs7Ozs4QkFDckIsbUJBQW1COzs7O3NCQUNELFVBQVU7O0FBRTdDLElBQUks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RSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDYix5QkFBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztpQkFDakI7YUFDSixFQUNKO0tBQ0o7QUFDRCxTQUFLLEVBQ0wsRUFDQztBQUNELFlBQVEsRUFDUixFQUNDO0FBQ0QsYUFBUyxFQUNUO0FBQ0ksWUFBSSxFQUFFLEVBQUU7QUFDUixlQUFPLEVBQUUsd0JBQXdCO0tBQ3BDO0NBQ0osQ0FBQzs7cUJBRWEsTUFBTTs7Ozs7Ozs7OztxQkNwRE4sVUFBRSxHQUFHLEVBQUUsS0FBSyxFQUMzQjtBQUNJLFFBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLFdBQVEsS0FBSyxFQUFFLEVBQ2Y7QUFDSSxZQUFJLElBQUksR0FBRyxDQUFDO0tBQ2Y7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBJc2FhYyBmcm9tICcuL2NvbXBvbmVudHMvaXNhYWMnO1xuaW1wb3J0IFJvb20gZnJvbSAnLi9jb21wb25lbnRzL3Jvb20nO1xuaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5sZXQgYWN0b3JzID1cbltcbiAgICBuZXcgUm9vbSgpLFxuICAgIG5ldyBJc2FhYygpXG5dO1xuXG5jb25zdCByb29tID0gYWN0b3JzWzBdOyAvLyBzaG9ydGN1dFxuY29uc3QgaXNhYWMgPSBhY3RvcnNbMV07IC8vIHNob3J0Y3V0XG5cbmNvbnN0IG1haW4gPSAoKSA9Plxue1xuICAgIGZvciAoIGxldCBpPTAsIGxlbj1hY3RvcnMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgIHtcbiAgICAgICAgaWYgKCAhYWN0b3JzW2ldLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBhY3RvcnNbaV0ucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZGlzcGxheUN0eC5kcmF3SW1hZ2UoIGNhbnZhcywgMCwgMCApOyAvLyBkcmF3IHNvbWV0aGluZyB2aXNpYmxlIG9ubHkgb25jZSBwZXIgZnJhbWUuXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG1haW4gKTtcbn07XG5cbmlzYWFjLnJlc3Bhd24oIHJvb20gKTtcbm1haW4oKTtcbiIsImV4cG9ydCBjb25zdCBkaXNwbGF5Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhcHAnICk7XG5leHBvcnQgY29uc3QgZGlzcGxheUN0eCA9IGRpc3BsYXlDYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuXG5leHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbmNhbnZhcy53aWR0aCA9IGRpc3BsYXlDYW52YXMud2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUNhbnZhcy5oZWlnaHQ7XG5leHBvcnQgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHNpemVYLCBzaXplWSwgaW1hZ2U9bnVsbCApXG4gICAge1xuICAgICAgICB0aGlzLnNpemVYID0gc2l6ZVg7XG4gICAgICAgIHRoaXMuc2l6ZVkgPSBzaXplWTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5feSA9IG51bGw7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2UoIGltYWdlLCB0eXBlPSdpbWFnZScgKVxuICAgIHtcbiAgICAgICAgaWYgKCB0eXBlID09PSAnY2FudmFzJyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggaW1hZ2UgIT09IHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGNlbnRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHRoaXMuc2l6ZVggLyAyLFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHRoaXMuc2l6ZVkgLyAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCB0aGlzLl94ICk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCB0aGlzLl95ICk7XG5cbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuc2l6ZVgsIHRoaXMuc2l6ZVkgKTtcbiAgICAgICAgaWYgKCB0aGlzLmltYWdlICYmIHRoaXMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICcuL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvciggc2l6ZVgsIHNpemVZLCBpbWFnZSwgc3BlZWQsIG5hbWUsIGhwIClcbiAgICB7XG4gICAgICAgIHN1cGVyKCBzaXplWCwgc2l6ZVksIGltYWdlICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPj0gdmFsdWUgJiYgdmFsdWUgPCAxMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyQ29sbGVjdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgYWRkKCBpdGVtIClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucHVzaCggaXRlbSApO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSApXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbGxlY3Rpb24uaW5kZXhPZiggaXRlbSApO1xuXG4gICAgICAgIGlmICggaW5kZXggPiAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uLmZpbHRlciggKCBpdGVtICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBmb3IgKCBsZXQgaT0wLCBsZW49dGhpcy5fY29sbGVjdGlvbi5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb25baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHNpemVYLCBzaXplWSwgaW1hZ2U9bnVsbCwgc3BlZWQ9MjU2IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCBzaXplWCwgc2l6ZVksIGltYWdlICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICcuL2NoYXJhY3Rlcic7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IFRlYXIgZnJvbSAnLi90ZWFyJztcbmltcG9ydCByZXBlYXQgZnJvbSAnLi4vdXRpbHMvc3RyaW5nL3JlcGVhdCc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVCxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9EXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgaW1hZ2VzIGZyb20gJy4uL2ltYWdlcyc7XG5cbmNvbnN0IGlzYWFjSW1nID0gaW1hZ2VzLmNoYXJhY3RlcnMuaXNhYWM7XG5jb25zdCBzcHJpdGUgPSBuZXcgSW1hZ2UoKTtcbnNwcml0ZS5zcmMgPSBpc2FhY0ltZy5zcHJpdGU7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXNhYWMgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlciggMjgsIDM1LCBudWxsLCAyNTYsICdJc2FhYycsIDMgKTtcblxuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fbGFzdFNob290ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl90ZWFycyA9IG5ldyBDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX2F0dGFja1NwZWVkID0gMTAwMDsgLy8gMSBzaG9vdCAvIHNlY29uZFxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB7eDogMCwgeTogMX07XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2UoIHRoaXMuX2RpcmVjdGlvbiApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IHRoaXMuX2tleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uZGVsZXRlKCBlLmtleUNvZGUgKSApO1xuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl94ICYmIExJTUlUX0xFRlQgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiYgTElNSVRfVE9QIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT00gKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlKCk7XG5cbiAgICAgICAgaWYgKCBkZXBsYWNlbWVudCA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uc2l6ZSA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfVyApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9TICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9BICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0QgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCk7XG5cbiAgICAgICAgaWYgKCAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1VQICkgfHxcbiAgICAgICAgICAgIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0RPV04gKSB8fFxuICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIHx8XG4gICAgICAgICAgICB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApICkgJiYgKCAhdGhpcy5fbGFzdFNob290IHx8XG4gICAgICAgICAgICAoIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA+PSB0aGlzLl9hdHRhY2tTcGVlZCApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBub3c7XG4gICAgICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZURpcmVjdGlvbigpXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLnNpemUgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyZWN0aW9uID0ge307XG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0xFRlQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRpcmVjdGlvbi54ICE9PSAwIHx8IGRpcmVjdGlvbi55ICE9PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlSW1hZ2UoIGRpcmVjdGlvbiApXG4gICAge1xuICAgICAgICBkaXJlY3Rpb24gPSB0aGlzLl9kaXJlY3Rpb247XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnbGVmdCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaXNhYWNJbWcuaGVhZC5kaXJlY3Rpb25zLmxlZnRbMF07XG4gICAgICAgICAgICAgICAgeSA9IGlzYWFjSW1nLmhlYWQuZGlyZWN0aW9ucy5sZWZ0WzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAncmlnaHQnICk7XG4gICAgICAgICAgICAgICAgeCA9IGlzYWFjSW1nLmhlYWQuZGlyZWN0aW9ucy5yaWdodFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaXNhYWNJbWcuaGVhZC5kaXJlY3Rpb25zLnJpZ2h0WzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAndXAnICk7XG4gICAgICAgICAgICAgICAgeCA9IGlzYWFjSW1nLmhlYWQuZGlyZWN0aW9ucy51cFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaXNhYWNJbWcuaGVhZC5kaXJlY3Rpb25zLnVwWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnZG93bicgKTtcbiAgICAgICAgICAgICAgICB4ID0gaXNhYWNJbWcuaGVhZC5kaXJlY3Rpb25zLmRvd25bMF07XG4gICAgICAgICAgICAgICAgeSA9IGlzYWFjSW1nLmhlYWQuZGlyZWN0aW9ucy5kb3duWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IHRoaXMuY2VudGVyO1xuICAgICAgICAvLyBsZWFnc1xuICAgICAgICBjdHguZHJhd0ltYWdlKCBzcHJpdGUsIDAsIDI1LCAxOCwgMTQsIGNlbnRlci54ICsgNSwgY2VudGVyLnkgKyAyMCwgMTgsIDE0ICk7XG4gICAgICAgIC8vIGhlYWRcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggc3ByaXRlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWNJbWcuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjSW1nLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgY2VudGVyLngsIGNlbnRlci55LFxuICAgICAgICAgICAgaXNhYWNJbWcuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjSW1nLmhlYWQuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgcmVzcGF3biggcm9vbSApXG4gICAge1xuICAgICAgICB0aGlzLnggPSByb29tLnNpemVYIC8gMjtcbiAgICAgICAgdGhpcy55ID0gcm9vbS5zaXplWSAvIDI7XG4gICAgfVxuXG4gICAgc2hvb3QoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdGVhcnMuYWRkKCBuZXcgVGVhciggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5fZGlyZWN0aW9uICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLl90ZWFycy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMucmVuZGVyKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjUwLCA1MCwgNTApJztcbiAgICAgICAgY3R4LmZvbnQgPSAnMjBweCBIZWx2ZXRpY2EnO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIGN0eC5maWxsVGV4dCggcmVwZWF0KCAn4p2kICcsIHRoaXMuaHAgKSwgMzUsIDEzICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmltcG9ydCBpbWFnZXMgZnJvbSAnLi4vaW1hZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbSBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIGltYWdlPWltYWdlcy5yb29tcy5kZWZhdWx0IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCA4MDAsIDQ4MCwgaW1hZ2UgKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnLi9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHgsIHksIGRpcmVjdGlvbiwgc3BlZWQ9NSApXG4gICAge1xuICAgICAgICBzdXBlciggMTUsIDE1ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSBkaXJlY3Rpb24ueCAqIHNwZWVkO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IGRpcmVjdGlvbi55ICogc3BlZWQ7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIExJTUlUX0xFRlQgLSB0aGlzLnNpemVYIDw9IHRoaXMuX3ggJiYgdGhpcy5feCA8PSBMSU1JVF9SSUdIVCArIHRoaXMuc2l6ZVggJiZcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuc2l6ZVkgPD0gdGhpcy5feSAmJiB0aGlzLl95IDw9IExJTUlUX0JPVFRPTSArIHRoaXMuc2l6ZVk7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCggdGhpcy5jZW50ZXIueCApO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCggdGhpcy5jZW50ZXIueSApO1xuXG4gICAgICAgIGNvbnN0IGNvbG91ciA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCggeCwgeSwgMCwgeCwgeSwgdGhpcy5zaXplWCAvIDIgKTtcbiAgICAgICAgY29sb3VyLmFkZENvbG9yU3RvcCggMCwnIzAwOTlGRicgKTtcbiAgICAgICAgY29sb3VyLmFkZENvbG9yU3RvcCggMSwnIzAwQUJFQicgKTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5lbGxpcHNlKCB4LCB5LCB0aGlzLnNpemVYIC8gMiwgdGhpcy5zaXplWCAvIDIsIDAsIDAsIE1hdGguUEkgKiAyICk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29sb3VyO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJy4vY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSAxMDA7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gODU7XG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCIvLyBwcmVsb2FkIGFsbCBpbWFnZXMgZm9yIG5vdy5cblxuY29uc3QgaW1hZ2VzID1cbntcbiAgICByb29tczpcbiAgICB7XG4gICAgICAgIGRlZmF1bHQ6ICdidWlsZC9pbWcvcm9vbS5wbmcnXG4gICAgfSxcbiAgICBjaGFyYWN0ZXJzOlxuICAgIHtcbiAgICAgICAgaXNhYWM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9pc2FhY19zcHJpdGVfY3VzdG9tLnBuZycsXG4gICAgICAgICAgICBoZWFkOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyOCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI1LFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkb3duOiBbMCwwXSxcbiAgICAgICAgICAgICAgICAgICAgdXA6IFsyOCo0LCAwXSxcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogWzI4KjYsIDBdLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogWzI4KjIsIDBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ3M6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDE4LFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTQsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRvd246IFswLDI1XSxcbiAgICAgICAgICAgICAgICAgICAgdXA6IFsxOCo1LCAyNV0sXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFswLCAyNV0sXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBbMCwgMjVdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaXRlbXM6XG4gICAge1xuICAgIH0sXG4gICAgbW9uc3RlcnM6XG4gICAge1xuICAgIH0sXG4gICAgb2JzdGFjbGVzOlxuICAgIHtcbiAgICAgICAgcG9vcDogJycsXG4gICAgICAgIHJlZFBvb3A6ICdidWlsZC9pbWcvcmVkX3Bvb3AucG5nJ1xuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGltYWdlcztcbiIsImV4cG9ydCBkZWZhdWx0ICggc3RyLCB0aW1lcyApID0+XG57XG4gICAgbGV0IF9zdHIgPSAnJztcbiAgICB3aGlsZSAoIHRpbWVzLS0gKVxuICAgIHtcbiAgICAgICAgX3N0ciArPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBfc3RyO1xufTtcbiJdfQ==
