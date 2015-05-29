(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _canvas = require('./canvas');

var _layers = require('./layers');

var main = function main() {
    _layers.background.render();

    for (var i = 0, len = _layers.foreground.length; i < len; i++) {
        var actor = _layers.foreground[i];

        if (Array.isArray(actor)) {
            for (var j = 0, lenj = actor.length; j < lenj; j++) {
                actor[j].render();
            }
        } else {
            actor.render();
        }
    }

    _canvas.displayCtx.drawImage(_canvas.canvas, 0, 0); // draw something visible only once per frame.

    requestAnimationFrame(main);
};

main();

},{"./canvas":2,"./layers":17}],2:[function(require,module,exports){
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
    function Actor(_ref) {
        var _this = this;

        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;

        _classCallCheck(this, Actor);

        this.width = width;
        this.height = height;
        this.image = image || null;
        this._x = null;
        this._y = null;

        if (this.image) {
            this.ready = false;
            this._image = new Image();
            this._image.onload = function () {
                return _this.ready = true;
            };
            this._image.src = this.image.src;
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
            return this._y;
        },
        set: function (value) {
            this._y = value;
        }
    }, {
        key: 'center',
        get: function () {
            return {
                x: this._x + this.width / 2,
                y: this._y + this.height / 2
            };
        }
    }, {
        key: 'render',
        value: function render() {
            var x = Math.round(this._x);
            var y = Math.round(this._y);

            if (this.image && this.ready) {
                if (this.image.type === 'image') {
                    _canvas.ctx.drawImage(this._image, x, y);
                } else if (this.image.type === 'sprite' && this.renderSprite) {
                    this.renderSprite();
                }
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
    function Character(_ref) {
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;
        var speed = _ref.speed;
        var name = _ref.name;
        var hp = _ref.hp;

        _classCallCheck(this, Character);

        _get(Object.getPrototypeOf(Character.prototype), 'constructor', this).call(this, { width: width, height: height, image: image });

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
                if (!item.active) {
                    if (item.renderDestroy) {
                        item.renderDestroy();
                    }

                    return false;
                }

                return true;
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var DynamicActor = (function (_Actor) {
    function DynamicActor(_ref) {
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;
        var speed = _ref.speed;

        _classCallCheck(this, DynamicActor);

        _get(Object.getPrototypeOf(DynamicActor.prototype), 'constructor', this).call(this, { width: width, height: height, image: image });

        this._speed = speed || 256;
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

var _layers = require('../layers');

var _character = require('./character');

var _character2 = _interopRequireDefault(_character);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _tear = require('./tear');

var _tear2 = _interopRequireDefault(_tear);

var _utilsStringRepeat = require('../utils/string/repeat');

var _utilsStringRepeat2 = _interopRequireDefault(_utilsStringRepeat);

var _utilsPhysicsIsColliding = require('../utils/physics/is-colliding');

var _utilsPhysicsIsColliding2 = _interopRequireDefault(_utilsPhysicsIsColliding);

var _constants = require('../constants');

var _imagesCharacters = require('../images/characters');

var Isaac = (function (_Character) {
    function Isaac() {
        var _this = this;

        _classCallCheck(this, Isaac);

        _get(Object.getPrototypeOf(Isaac.prototype), 'constructor', this).call(this, { width: 28, height: 35, speed: 200, name: 'Isaac', hp: 3, image: {
                type: 'sprite',
                src: _imagesCharacters.isaac.sprite
            } });

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new _collection2['default']();
        this._attackSpeed = 500; // 1 shoot / second
        this._direction = { x: 0, y: 1 };
        document.addEventListener('keydown', function (e) {
            return _this._keysDown.add(e.keyCode);
        });
        document.addEventListener('keyup', function (e) {
            return _this._keysDown['delete'](e.keyCode);
        });

        this.respawn();
    }

    _inherits(Isaac, _Character);

    _createClass(Isaac, [{
        key: 'x',
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_LEFT_ISAAC < value && value < _constants.LIMIT_RIGHT_ISAAC) {
                var oldX = this._x;
                this._x = value;

                if (!(0, _utilsPhysicsIsColliding2['default'])(this, _layers.foreground)) {
                    this._x = value;
                } else {
                    this._x = oldX;
                }
            }
        }
    }, {
        key: 'y',
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value !== this._y && _constants.LIMIT_TOP_ISAAC < value && value < _constants.LIMIT_BOTTOM_ISAAC) {
                var oldY = this._y;
                this._y = value;

                if (!(0, _utilsPhysicsIsColliding2['default'])(this, _layers.foreground)) {
                    this._y = value;
                } else {
                    this._y = oldY;
                }
            }
        }
    }, {
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;
            var keysDown = this._keysDown;

            if (deplacement === 0) {
                return false;
            }

            if (keysDown.size === 0) {
                return false;
            }

            // diagonal distance should be +-Math.sqrt( deplacement / 2 )... but it feels so slow.

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
                this.shoot();
            }
        }
    }, {
        key: 'respawn',
        value: function respawn() {
            this._x = _canvas.canvas.width / 2;
            this._y = _canvas.canvas.height / 2;
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

            this._tears.add(new _tear2['default']({ x: x, y: y, direction: this._direction, creator: this }));
        }
    }, {
        key: 'renderSprite',
        value: function renderSprite() {
            var isShooting = this._isShooting;
            var now = Date.now();
            var direction = this._direction;
            var head = undefined;
            var x = undefined;
            var y = undefined;

            if (isShooting || !isShooting && now - this._lastShoot <= this._attackSpeed / 2) {
                head = _imagesCharacters.isaac.head.shootingDirections;
            } else {
                head = _imagesCharacters.isaac.head.directions;
            }

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
            _canvas.ctx.drawImage(this._image, 0, 25, 18, 14, this._x + 5, this._y + 20, 18, 14);
            // head
            _canvas.ctx.drawImage(this._image, x, y, _imagesCharacters.isaac.head.width, _imagesCharacters.isaac.head.height, this._x, this._y, _imagesCharacters.isaac.head.width, _imagesCharacters.isaac.head.height);
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

},{"../canvas":2,"../constants":12,"../images/characters":13,"../layers":17,"../utils/physics/is-colliding":18,"../utils/string/repeat":19,"./character":4,"./collection":5,"./tear":11}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _staticActor = require('./static-actor');

var _staticActor2 = _interopRequireDefault(_staticActor);

var _canvas = require('../canvas');

var _imagesObstacles = require('../images/obstacles');

var Rock = (function (_StaticActor) {
    function Rock(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Rock);

        _get(Object.getPrototypeOf(Rock.prototype), 'constructor', this).call(this, { x: x, y: y, width: 50, height: 51, image: {
                type: 'sprite',
                src: _imagesObstacles.rocks.sprite
            } });

        this._isSpecial = Math.random() < 0.05;
    }

    _inherits(Rock, _StaticActor);

    _createClass(Rock, [{
        key: 'renderSprite',
        value: function renderSprite() {
            var x = this._isSpecial ? 170 : 0;
            var y = 0;

            _canvas.ctx.drawImage(this._image, x, y, 170, 172, this._x, this._y, this.width, this.height);
        }
    }]);

    return Rock;
})(_staticActor2['default']);

exports['default'] = Rock;
module.exports = exports['default'];

},{"../canvas":2,"../images/obstacles":14,"./static-actor":10}],9:[function(require,module,exports){
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

var _imagesRooms = require('../images/rooms');

var Room = (function (_Actor) {
    function Room() {
        var _ref = arguments[0] === undefined ? { image: { type: 'image', src: _imagesRooms.defaultRoom } } : arguments[0];

        var image = _ref.image;

        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, { width: 800, height: 480, image: image });
        this._x = 0;
        this._y = 0;
    }

    _inherits(Room, _Actor);

    return Room;
})(_actor2['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../images/rooms":15,"./actor":3}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var StaticActor = (function (_Actor) {
    function StaticActor(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;

        _classCallCheck(this, StaticActor);

        _get(Object.getPrototypeOf(StaticActor.prototype), 'constructor', this).call(this, { width: width, height: height, image: image });

        this._x = x;
        this._y = y;
    }

    _inherits(StaticActor, _Actor);

    return StaticActor;
})(_actor2['default']);

exports['default'] = StaticActor;
module.exports = exports['default'];

},{"./actor":3}],11:[function(require,module,exports){
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

var _constants = require('../constants');

var _imagesTears = require('../images/tears');

var _layers = require('../layers');

var _utilsPhysicsIsColliding = require('../utils/physics/is-colliding');

var _utilsPhysicsIsColliding2 = _interopRequireDefault(_utilsPhysicsIsColliding);

var Tear = (function (_DynamicActor) {
    function Tear(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var direction = _ref.direction;
        var speed = _ref.speed;
        var creator = _ref.creator;

        _classCallCheck(this, Tear);

        _get(Object.getPrototypeOf(Tear.prototype), 'constructor', this).call(this, { width: 13, height: 13, image: { type: 'image', src: _imagesTears.defaultTear } });

        this._x = x;
        this._y = y;
        this.active = true;
        this._speed = speed || 4;
        this._creator = creator;

        this.xVelocity = direction.x * this._speed;
        this.yVelocity = direction.y * this._speed;
    }

    _inherits(Tear, _DynamicActor);

    _createClass(Tear, [{
        key: 'inBounds',
        get: function () {
            var _this = this;

            return _constants.LIMIT_LEFT - this.width <= this._x && this._x <= _constants.LIMIT_RIGHT + this.width && _constants.LIMIT_TOP - this.height <= this._y && this._y <= _constants.LIMIT_BOTTOM + this.height && !(0, _utilsPhysicsIsColliding2['default'])(this, _layers.foreground.filter(function (item) {
                return item !== _this._creator;
            }));
        }
    }, {
        key: 'update',
        value: function update() {
            this._x += this.xVelocity;
            this._y += this.yVelocity;

            this.active = this.active && this.inBounds;
        }
    }]);

    return Tear;
})(_dynamicActor2['default']);

exports['default'] = Tear;
module.exports = exports['default'];

},{"../constants":12,"../images/tears":16,"../layers":17,"../utils/physics/is-colliding":18,"./dynamic-actor":6}],12:[function(require,module,exports){
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

},{"./canvas":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var isaac = {
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
    } };

exports.isaac = isaac;
exports['default'] = {
    isaac: isaac
};

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var rocks = {
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
    } };

exports.rocks = rocks;
exports['default'] = {
    rocks: rocks
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultRoom = 'build/img/room.png';

exports.defaultRoom = defaultRoom;
exports['default'] = {
    'default': defaultRoom
};

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultTear = 'build/img/tear.png';

exports.defaultTear = defaultTear;
exports['default'] = {
    'default': defaultTear
};

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsIsaac = require('./components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

var _componentsRoom = require('./components/room');

var _componentsRoom2 = _interopRequireDefault(_componentsRoom);

var _componentsRock = require('./components/rock');

var _componentsRock2 = _interopRequireDefault(_componentsRock);

var background = new _componentsRoom2['default']();

exports.background = background;
var foreground = [[new _componentsRock2['default']({ x: 450, y: 120 }), new _componentsRock2['default']({ x: 65, y: 65 }), new _componentsRock2['default']({ x: 115, y: 65 }), new _componentsRock2['default']({ x: 165, y: 65 }), new _componentsRock2['default']({ x: 65, y: 116 }), new _componentsRock2['default']({ x: 115, y: 116 }), new _componentsRock2['default']({ x: 165, y: 116 })], new _componentsIsaac2['default']()];

exports.foreground = foreground;
window.isaac = foreground[1];
window.lowerRock = foreground[0];

},{"./components/isaac":7,"./components/rock":8,"./components/room":9}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isColliding = function isColliding(target, other) {
    // ignore collision with self
    if (target === other) {
        return false;
    }

    var x = target.x;
    var width = target.width;
    var y = target.y;
    var height = target.height;

    if (Array.isArray(other)) {
        return other.some(function (_other) {
            return isColliding(target, _other);
        });
    }

    var _x = other.x;
    var _width = other.width;
    var _y = other.y;
    var _height = other.height;

    var top = y + height + 2 >= _y;
    var right = x <= _x + _width;
    var bottom = y + height - 10 <= _y + _height;
    var left = x + width >= _x;

    return left && right && bottom && top;
};

exports["default"] = isColliding;
module.exports = exports["default"];

},{}],19:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3JvY2suanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb29tLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvdGVhci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL2NoYXJhY3RlcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL29ic3RhY2xlcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvcm9vbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3RlYXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2xheWVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy91dGlscy9waHlzaWNzL2lzLWNvbGxpZGluZy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy91dGlscy9zdHJpbmcvcmVwZWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7c0JDQW1DLFVBQVU7O3NCQUNOLFVBQVU7O0FBRWpELElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxHQUNWO0FBQ0ksWUFKaUIsVUFBVSxDQUloQixNQUFNLEVBQUUsQ0FBQzs7QUFFcEIsU0FBTSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFDLFFBTmQsVUFBVSxDQU1lLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUNsRDtBQUNJLFlBQUksS0FBSyxHQUFHLFFBUlgsVUFBVSxDQVFZLENBQUMsQ0FBQyxDQUFDOztBQUUxQixZQUFLLEtBQUssQ0FBQyxPQUFPLENBQUUsS0FBSyxDQUFFLEVBQzNCO0FBQ0ksaUJBQU0sSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLElBQUksR0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQy9DO0FBQ0kscUJBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyQjtTQUNKLE1BRUQ7QUFDSSxpQkFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2xCO0tBQ0o7O0FBRUQs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LENBQUUsVUFBQSxNQUFNO21CQUFJLFdBQVcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFO1NBQUEsQ0FBRSxDQUFDO0tBQ2hFOztBQUVELFFBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbkIsUUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFFBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTdCLFFBQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQyxRQUFNLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztBQUMvQixRQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQy9DLFFBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDOztBQUU3QixXQUFPLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUN6QyxDQUFDOztxQkFFYSxXQUFXOzs7Ozs7Ozs7O3FCQy9CWCxVQUFFLEdBQUcsRUFBRSxLQUFLLEVBQzNCO0FBQ0ksUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBUSxLQUFLLEVBQUUsRUFDZjtBQUNJLFlBQUksSUFBSSxHQUFHLENBQUM7S0FDZjtBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCB9IGZyb20gJy4vbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgYmFja2dyb3VuZC5yZW5kZXIoKTtcblxuICAgIGZvciAoIGxldCBpPTAsIGxlbj1mb3JlZ3JvdW5kLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICB7XG4gICAgICAgIGxldCBhY3RvciA9IGZvcmVncm91bmRbaV07XG5cbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KCBhY3RvciApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yICggbGV0IGo9MCwgbGVuaj1hY3Rvci5sZW5ndGg7IGogPCBsZW5qOyBqKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjdG9yW2pdLnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0b3IucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9IClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZSB8fCBudWxsO1xuICAgICAgICB0aGlzLl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5feSA9IG51bGw7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEltYWdlKCBpbWFnZSwgdHlwZT0naW1hZ2UnIClcbiAgICB7XG4gICAgICAgIGlmICggdHlwZSA9PT0gJ2NhbnZhcycgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGltYWdlICE9PSB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLmhlaWdodCAvIDJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQoIHRoaXMuX3ggKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoIHRoaXMuX3kgKTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5pbWFnZS50eXBlID09PSAnaW1hZ2UnIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIHRoaXMuaW1hZ2UudHlwZSA9PT0gJ3Nwcml0ZScgJiYgdGhpcy5yZW5kZXJTcHJpdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3ByaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJy4vZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPj0gdmFsdWUgJiYgdmFsdWUgPCAxMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyQ29sbGVjdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgYWRkKCBpdGVtIClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucHVzaCggaXRlbSApO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSApXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbGxlY3Rpb24uaW5kZXhPZiggaXRlbSApO1xuXG4gICAgICAgIGlmICggaW5kZXggPiAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uLmZpbHRlciggKCBpdGVtICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmICggIWl0ZW0uYWN0aXZlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ucmVuZGVyRGVzdHJveSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGZvciAoIGxldCBpPTAsIGxlbj10aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbltpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCAyNTY7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzLCBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCB9IGZyb20gJy4uL2xheWVycyc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJy4vY2hhcmFjdGVyJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJy4vY29sbGVjdGlvbic7XG5pbXBvcnQgVGVhciBmcm9tICcuL3RlYXInO1xuaW1wb3J0IHJlcGVhdCBmcm9tICcuLi91dGlscy9zdHJpbmcvcmVwZWF0JztcbmltcG9ydCBpc0NvbGxpZGluZyBmcm9tICcuLi91dGlscy9waHlzaWNzL2lzLWNvbGxpZGluZyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9EXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBpc2FhYyB9IGZyb20gJy4uL2ltYWdlcy9jaGFyYWN0ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXNhYWMgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMjgsIGhlaWdodDogMzUsIHNwZWVkOiAyMDAsIG5hbWU6ICdJc2FhYycsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGlzYWFjLnNwcml0ZVxuICAgICAgICB9IH0gKTtcblxuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fbGFzdFNob290ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl90ZWFycyA9IG5ldyBDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX2F0dGFja1NwZWVkID0gNTAwOyAvLyAxIHNob290IC8gc2Vjb25kXG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHt4OiAwLCB5OiAxfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJlxuICAgICAgICAgICAgTElNSVRfTEVGVF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFRfSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRYID0gdGhpcy5feDtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCAhaXNDb2xsaWRpbmcoIHRoaXMsIGZvcmVncm91bmQgKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSBvbGRYO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGlmICggIWlzQ29sbGlkaW5nKCB0aGlzLCBmb3JlZ3JvdW5kICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSggdGltZSwgbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gdGhpcy5zcGVlZCAqIHRpbWU7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG5cbiAgICAgICAgaWYgKCBkZXBsYWNlbWVudCA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uc2l6ZSA9PT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICAvLyBkaWFnb25hbCBkaXN0YW5jZSBzaG91bGQgYmUgKy1NYXRoLnNxcnQoIGRlcGxhY2VtZW50IC8gMiApLi4uIGJ1dCBpdCBmZWVscyBzbyBzbG93LlxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgKSAvLyB2ZXJ0aWNhbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSBNYXRoLnNxcnQoIGRlcGxhY2VtZW50ICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy92ZXJ0aWNhbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnNxcnQoIGRlcGxhY2VtZW50ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfVyApIHx8IGtleXNEb3duLmhhcyggS0VZX1MgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gTWF0aC5zcXJ0KCBkZXBsYWNlbWVudCApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9EICkgJiZcbiAgICAgICAgICAgICEoIGtleXNEb3duLmhhcyggS0VZX1cgKSB8fCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlRGlyZWN0aW9uKCBub3cgKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZURpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG5cbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHt9O1xuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1VQICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAgKCBrZXlzRG93bi5oYXMoIEtFWV9MRUZUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBkaXJlY3Rpb24ueCAhPT0gMCB8fCBkaXJlY3Rpb24ueSAhPT0gMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCAoIGtleXNEb3duLmhhcyggS0VZX1VQICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApICkgJiYgKCAhdGhpcy5fbGFzdFNob290IHx8XG4gICAgICAgICAgICAoIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA+PSB0aGlzLl9hdHRhY2tTcGVlZCApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBub3c7XG4gICAgICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNwYXduKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggPSBjYW52YXMud2lkdGggLyAyO1xuICAgICAgICB0aGlzLl95ID0gY2FudmFzLmhlaWdodCAvIDI7XG4gICAgfVxuXG4gICAgc2hvb3QoKVxuICAgIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIHN3aXRjaCAoIHRoaXMuX2RpcmVjdGlvbi54IClcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feDtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3ggKyA4O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnkgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95IC0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDY7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDE1O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RlYXJzLmFkZCggbmV3IFRlYXIoIHsgeDogeCwgeTogeSwgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sIGNyZWF0b3I6IHRoaXMgfSApICk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGlzU2hvb3RpbmcgPSB0aGlzLl9pc1Nob290aW5nO1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLl9kaXJlY3Rpb247XG4gICAgICAgIGxldCBoZWFkO1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgaWYgKCBpc1Nob290aW5nIHx8ICggIWlzU2hvb3RpbmcgJiYgbm93IC0gdGhpcy5fbGFzdFNob290IDw9IHRoaXMuX2F0dGFja1NwZWVkIC8gMiApIClcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuc2hvb3RpbmdEaXJlY3Rpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuZGlyZWN0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbi54IClcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggJ2xlZnQnICk7XG4gICAgICAgICAgICAgICAgeCA9IGhlYWQubGVmdFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaGVhZC5sZWZ0WzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAncmlnaHQnICk7XG4gICAgICAgICAgICAgICAgeCA9IGhlYWQucmlnaHRbMF07XG4gICAgICAgICAgICAgICAgeSA9IGhlYWQucmlnaHRbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coICd1cCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC51cFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaGVhZC51cFsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggJ2Rvd24nICk7XG4gICAgICAgICAgICAgICAgeCA9IGhlYWQuZG93blswXTtcbiAgICAgICAgICAgICAgICB5ID0gaGVhZC5kb3duWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGVhZ3NcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCApO1xuICAgICAgICAvLyBoZWFkXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5feCwgdGhpcy5feSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IG5vdyAtIHRoaXMuX3RoZW47XG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoIGRlbHRhIC8gMTAwMCwgbm93ICk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuXG4gICAgICAgIHRoaXMuX3RlYXJzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLl90ZWFycy5yZW5kZXIoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYigyNTAsIDUwLCA1MCknO1xuICAgICAgICBjdHguZm9udCA9ICcyMHB4IEhlbHZldGljYSc7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KCByZXBlYXQoICfinaQgJywgdGhpcy5ocCApLCAzNSwgMTMgKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICcuL3N0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuaW1wb3J0IHsgcm9ja3MgfSBmcm9tICcuLi9pbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiA1MCwgaGVpZ2h0OiA1MSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiByb2Nrcy5zcHJpdGVcbiAgICAgICAgfSB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gTWF0aC5yYW5kb20oKSA8IDAuMDU7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHggPSB0aGlzLl9pc1NwZWNpYWwgPyAxNzAgOiAwO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgMTcwLCAxNzIsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJy4vYWN0b3InO1xuXG5pbXBvcnQgeyBkZWZhdWx0Um9vbSB9IGZyb20gJy4uL2ltYWdlcy9yb29tcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20gZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IGltYWdlIH09eyBpbWFnZTogeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IGRlZmF1bHRSb29tIH0gfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UgIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuXG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnLi9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7XG4gICAgTElNSVRfVE9QLFxuICAgIExJTUlUX0JPVFRPTSxcbiAgICBMSU1JVF9MRUZULFxuICAgIExJTUlUX1JJR0hUXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBkZWZhdWx0VGVhciB9IGZyb20gJy4uL2ltYWdlcy90ZWFycyc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kIH0gZnJvbSAnLi4vbGF5ZXJzJztcbmltcG9ydCBpc0NvbGxpZGluZyBmcm9tICcuLi91dGlscy9waHlzaWNzL2lzLWNvbGxpZGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCBkaXJlY3Rpb24sIHNwZWVkLCBjcmVhdG9yIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGg6IDEzLCBoZWlnaHQ6IDEzLCBpbWFnZTogeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IGRlZmF1bHRUZWFyIH0gfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuXG4gICAgfVxuXG4gICAgZ2V0IGluQm91bmRzKClcbiAgICB7XG4gICAgICAgIHJldHVybiBMSU1JVF9MRUZUIC0gdGhpcy53aWR0aCA8PSB0aGlzLl94ICYmIHRoaXMuX3ggPD0gTElNSVRfUklHSFQgKyB0aGlzLndpZHRoICYmXG4gICAgICAgICAgICBMSU1JVF9UT1AgLSB0aGlzLmhlaWdodCA8PSB0aGlzLl95ICYmIHRoaXMuX3kgPD0gTElNSVRfQk9UVE9NICsgdGhpcy5oZWlnaHQgJiZcblxuICAgICAgICAgICAgIWlzQ29sbGlkaW5nKCB0aGlzLCBmb3JlZ3JvdW5kLmZpbHRlciggaXRlbSA9PiBpdGVtICE9PSB0aGlzLl9jcmVhdG9yICkgKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlICYmIHRoaXMuaW5Cb3VuZHM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QX0lTQUFDID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NX0lTQUFDID0gY2FudmFzLmhlaWdodCAtIDk1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlRfSVNBQUMgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVF9JU0FBQyA9IGNhbnZhcy53aWR0aCAtIDg1O1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDY1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlQgPSA2MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVCA9IGNhbnZhcy53aWR0aCAtIDc1O1xuXG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCJleHBvcnQgY29uc3QgaXNhYWMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9pc2FhY19zcHJpdGVfY3VzdG9tLnBuZycsXG4gICAgaGVhZDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAyOCxcbiAgICAgICAgaGVpZ2h0OiAyNSxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDBdLFxuICAgICAgICAgICAgdXA6IFsyOCo0LCAwXSxcbiAgICAgICAgICAgIGxlZnQ6IFsyOCo2LCAwXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjgqMiwgMF1cbiAgICAgICAgfSxcbiAgICAgICAgc2hvb3RpbmdEaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMjgsIDBdLFxuICAgICAgICAgICAgdXA6IFsyOCo1LCAwXSxcbiAgICAgICAgICAgIGxlZnQ6IFsyOCo3LCAwXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjgqMywgMF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDI1XSxcbiAgICAgICAgICAgIHVwOiBbMTgqNSwgMjVdLFxuICAgICAgICAgICAgbGVmdDogWzAsIDI1XSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMCwgMjVdXG4gICAgICAgIH1cbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBpc2FhY1xufTtcbiIsImV4cG9ydCBjb25zdCByb2NrcyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL3JvY2tzX3Nwcml0ZS5wbmcnLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFswLCAwXVxuICAgIH0sXG4gICAgc3BlY2lhbDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzE3MCwgMF1cbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICByb2Nrc1xufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0Um9vbSA9ICdidWlsZC9pbWcvcm9vbS5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRSb29tXG59O1xuIiwiZXhwb3J0IGNvbnN0IGRlZmF1bHRUZWFyID0gJ2J1aWxkL2ltZy90ZWFyLnBuZyc7XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZGVmYXVsdDogZGVmYXVsdFRlYXJcbn07XG4iLCJpbXBvcnQgSXNhYWMgZnJvbSAnLi9jb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBSb29tIGZyb20gJy4vY29tcG9uZW50cy9yb29tJztcbmltcG9ydCBSb2NrIGZyb20gJy4vY29tcG9uZW50cy9yb2NrJztcblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgUm9vbSgpO1xuXG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZCA9XG5bXG4gICAgW1xuICAgICAgICBuZXcgUm9jayggeyB4OiA0NTAsIHk6IDEyMCB9ICksXG4gICAgICAgIG5ldyBSb2NrKCB7IHg6IDY1LCB5OiA2NSB9ICksXG4gICAgICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogNjUgfSApLFxuICAgICAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDY1IH0gKSxcbiAgICAgICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDExNiB9ICksXG4gICAgICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogMTE2IH0gKSxcbiAgICAgICAgbmV3IFJvY2soIHsgeDogMTY1LCB5OiAxMTYgfSApXG4gICAgXSxcbiAgICBuZXcgSXNhYWMoKVxuXTtcblxud2luZG93LmlzYWFjID0gZm9yZWdyb3VuZFsxXTtcbndpbmRvdy5sb3dlclJvY2sgPSBmb3JlZ3JvdW5kWzBdO1xuIiwiY29uc3QgaXNDb2xsaWRpbmcgPSAoIHRhcmdldCwgb3RoZXIgKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKCB0YXJnZXQgPT09IG90aGVyIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG90aGVyICkgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyLnNvbWUoIF9vdGhlciA9PiBpc0NvbGxpZGluZyggdGFyZ2V0LCBfb3RoZXIgKSApO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgKyAyID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IC0gMTAgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICByZXR1cm4gbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaXNDb2xsaWRpbmc7XG4iLCJleHBvcnQgZGVmYXVsdCAoIHN0ciwgdGltZXMgKSA9Plxue1xuICAgIGxldCBfc3RyID0gJyc7XG4gICAgd2hpbGUgKCB0aW1lcy0tIClcbiAgICB7XG4gICAgICAgIF9zdHIgKz0gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gX3N0cjtcbn07XG4iXX0=
