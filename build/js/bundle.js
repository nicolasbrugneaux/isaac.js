(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _canvas = require('./canvas');

var _layers = require('./layers');

var main = function main() {
    for (var i = 0, len = _layers.background.length; i < len; i++) {
        var actor = _layers.background[i];

        if (Array.isArray(actor)) {
            for (var j = 0, lenj = actor.length; j < lenj; j++) {
                actor[j].render();
            }
        } else {
            actor.render();
        }
    }

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

},{"./canvas":2,"./layers":18}],2:[function(require,module,exports){
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
            // ctx.fillStyle = 'red';
            // ctx.fillRect( this._x, this._y, this.width, this.height );

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
        this._originalHp = hp;
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
            if (0 < value) {
                this._hp = value;
            } else {
                this._hp = this._originalHp;
                if (this.respawn) {
                    this.respawn();
                }
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

var _staticActor = require('./static-actor');

var _staticActor2 = _interopRequireDefault(_staticActor);

var _canvas = require('../canvas');

var _imagesObstacles = require('../images/obstacles');

var Fire = (function (_StaticActor) {
    function Fire(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Fire);

        _get(Object.getPrototypeOf(Fire.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesObstacles.fire.width, height: _imagesObstacles.fire.height, image: {
                type: 'sprite',
                src: _imagesObstacles.fire.sprite
            } });

        this._state = 0;
        this._states = _imagesObstacles.fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
    }

    _inherits(Fire, _StaticActor);

    _createClass(Fire, [{
        key: 'renderSprite',
        value: function renderSprite() {
            var now = Date.now();
            if (now - this._then > this._interval) {
                this._state = (this._state + 1) % this._states;
                this._then = now;
            }

            var x = this.width * this._state;
            var y = 0;

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }]);

    return Fire;
})(_staticActor2['default']);

exports['default'] = Fire;
module.exports = exports['default'];

},{"../canvas":2,"../images/obstacles":15,"./static-actor":11}],8:[function(require,module,exports){
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

        this._canTakeDmg = true;
        this._dmgInterval = 500;
        this._lastDmg = Date.now();

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
                var shouldTakeDmg = (0, _utilsPhysicsIsColliding2['default'])(this, _layers.monsters);

                if (!shouldTakeDmg && !(0, _utilsPhysicsIsColliding2['default'])(this, _layers.obstacles)) {
                    this._x = value;
                } else {
                    this._x = oldX;

                    var now = Date.now();
                    if (shouldTakeDmg && now - this._lastDmg > this._dmgInterval) {
                        this.hp -= 1;
                        this._lastDmg = now;
                    }
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

                var shouldTakeDmg = (0, _utilsPhysicsIsColliding2['default'])(this, _layers.monsters);

                if (!shouldTakeDmg && !(0, _utilsPhysicsIsColliding2['default'])(this, _layers.obstacles)) {
                    this._y = value;
                } else {
                    var now = Date.now();
                    this._y = oldY;

                    if (shouldTakeDmg && now - this._lastDmg > this._dmgInterval) {
                        this.hp -= 1;
                        this._lastDmg = now;
                    }
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

},{"../canvas":2,"../constants":13,"../images/characters":14,"../layers":18,"../utils/physics/is-colliding":19,"../utils/string/repeat":20,"./character":4,"./collection":5,"./tear":12}],9:[function(require,module,exports){
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

},{"../canvas":2,"../images/obstacles":15,"./static-actor":11}],10:[function(require,module,exports){
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

},{"../images/rooms":16,"./actor":3}],11:[function(require,module,exports){
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

},{"./actor":3}],12:[function(require,module,exports){
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

},{"../constants":13,"../images/tears":17,"../layers":18,"../utils/physics/is-colliding":19,"./dynamic-actor":6}],13:[function(require,module,exports){
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

},{"./canvas":2}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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
var fire = {
    sprite: 'build/img/fire_sprite.png',
    width: 31,
    height: 34,
    states: 6
};

exports.fire = fire;
exports['default'] = {
    rocks: rocks,
    fire: fire
};

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultRoom = 'build/img/room.png';

exports.defaultRoom = defaultRoom;
exports['default'] = {
    'default': defaultRoom
};

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultTear = 'build/img/tear.png';

exports.defaultTear = defaultTear;
exports['default'] = {
    'default': defaultTear
};

},{}],18:[function(require,module,exports){
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

var _componentsFire = require('./components/fire');

var _componentsFire2 = _interopRequireDefault(_componentsFire);

var background = [new _componentsRoom2['default']()];

exports.background = background;
var foreground = [
// obstacles, they honestly don't need to be grouped in an array
[new _componentsRock2['default']({ x: 450, y: 120 }), new _componentsRock2['default']({ x: 65, y: 65 }), new _componentsRock2['default']({ x: 115, y: 65 }), new _componentsRock2['default']({ x: 165, y: 65 }), new _componentsRock2['default']({ x: 65, y: 116 }), new _componentsRock2['default']({ x: 115, y: 116 }), new _componentsRock2['default']({ x: 165, y: 116 })],
// monsters
[new _componentsFire2['default']({ x: 703, y: 65 })],
// player
new _componentsIsaac2['default']()];

exports.foreground = foreground;
var obstacles = foreground[0];
exports.obstacles = obstacles;
var monsters = foreground[1];
exports.monsters = monsters;
var player = foreground[2];
exports.player = player;

},{"./components/fire":7,"./components/isaac":8,"./components/rock":9,"./components/room":10}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9maXJlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvaXNhYWMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb2NrLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvcm9vbS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3N0YXRpYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3RlYXIuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29uc3RhbnRzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9jaGFyYWN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3Jvb21zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy90ZWFycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9sYXllcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvcGh5c2ljcy9pcy1jb2xsaWRpbmcuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvc3RyaW5nL3JlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxVQUFVOztzQkFDTixVQUFVOztBQUVqRCxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLFNBQU0sSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBQyxRQUpGLFVBQVUsQ0FJRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFDbEQ7QUFDSSxZQUFJLEtBQUssR0FBRyxRQU5DLFVBQVUsQ0FNQSxDQUFDLENBQUMsQ0FBQzs7QUFFMUIsWUFBSyxLQUFLLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBRSxFQUMzQjtBQUNJLGlCQUFNLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxJQUFJLEdBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUMvQztBQUNJLHFCQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDckI7U0FDSixNQUVEO0FBQ0ksaUJBQUssQ0FBQyxNQUFNLEVBQUUs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QU0sQ0FBQyxNQUFNLENBQUM7O0FBRTdCLFFBQUssS0FBSyxDQUFDLE9BQU8sQ0FBRSxLQUFLLENBQUUsRUFDM0I7QUFDSSxlQUFPLEtBQUssQ0FBQyxJQUFJLENBQUUsVUFBQSxNQUFNO21CQUFJLFdBQVcsQ0FBRSxNQUFNLEVBQUUsTUFBTSxDQUFFO1NBQUEsQ0FBRSxDQUFDO0tBQ2hFOztBQUVELFFBQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDbkIsUUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztBQUMzQixRQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ25CLFFBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7O0FBRTdCLFFBQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQyxRQUFNLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQztBQUMvQixRQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQy9DLFFBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDOztBQUU3QixXQUFPLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLEdBQUcsQ0FBQztDQUN6QyxDQUFDOztxQkFFYSxXQUFXOzs7Ozs7Ozs7O3FCQy9CWCxVQUFFLEdBQUcsRUFBRSxLQUFLLEVBQzNCO0FBQ0ksUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBUSxLQUFLLEVBQUUsRUFDZjtBQUNJLFlBQUksSUFBSSxHQUFHLENBQUM7S0FDZjtBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCB9IGZyb20gJy4vbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgZm9yICggbGV0IGk9MCwgbGVuPWJhY2tncm91bmQubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgIHtcbiAgICAgICAgbGV0IGFjdG9yID0gYmFja2dyb3VuZFtpXTtcblxuICAgICAgICBpZiAoIEFycmF5LmlzQXJyYXkoIGFjdG9yICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaj0wLCBsZW5qPWFjdG9yLmxlbmd0aDsgaiA8IGxlbmo7IGorKyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYWN0b3Jbal0ucmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhY3Rvci5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoIGxldCBpPTAsIGxlbj1mb3JlZ3JvdW5kLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICB7XG4gICAgICAgIGxldCBhY3RvciA9IGZvcmVncm91bmRbaV07XG5cbiAgICAgICAgaWYgKCBBcnJheS5pc0FycmF5KCBhY3RvciApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yICggbGV0IGo9MCwgbGVuaj1hY3Rvci5sZW5ndGg7IGogPCBsZW5qOyBqKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFjdG9yW2pdLnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgYWN0b3IucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9IClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZSB8fCBudWxsO1xuICAgICAgICB0aGlzLl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5feSA9IG51bGw7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEltYWdlKCBpbWFnZSwgdHlwZT0naW1hZ2UnIClcbiAgICB7XG4gICAgICAgIGlmICggdHlwZSA9PT0gJ2NhbnZhcycgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGltYWdlICE9PSB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLmhlaWdodCAvIDJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQoIHRoaXMuX3ggKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoIHRoaXMuX3kgKTtcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlICYmIHRoaXMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuaW1hZ2UudHlwZSA9PT0gJ2ltYWdlJyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCB0aGlzLmltYWdlLnR5cGUgPT09ICdzcHJpdGUnICYmIHRoaXMucmVuZGVyU3ByaXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNwcml0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICcuL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIG5hbWUsIGhwIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsSHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX29yaWdpbmFsSHA7XG4gICAgICAgICAgICBpZiAoIHRoaXMucmVzcGF3biApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyQ29sbGVjdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgYWRkKCBpdGVtIClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucHVzaCggaXRlbSApO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSApXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbGxlY3Rpb24uaW5kZXhPZiggaXRlbSApO1xuXG4gICAgICAgIGlmICggaW5kZXggPiAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uLmZpbHRlciggKCBpdGVtICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIGlmICggIWl0ZW0uYWN0aXZlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ucmVuZGVyRGVzdHJveSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGZvciAoIGxldCBpPTAsIGxlbj10aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fY29sbGVjdGlvbltpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICcuL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCAyNTY7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJy4vc3RhdGljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQgeyBmaXJlIH0gZnJvbSAnLi4vaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpcmUgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogZmlyZS53aWR0aCwgaGVpZ2h0OiBmaXJlLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmaXJlLnNwcml0ZVxuICAgICAgICB9IH0gKTtcblxuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZpcmUuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAoIHRoaXMuX3N0YXRlICsgMSApICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMsIGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQgeyBtb25zdGVycywgb2JzdGFjbGVzIH0gZnJvbSAnLi4vbGF5ZXJzJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnLi9jaGFyYWN0ZXInO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmltcG9ydCBUZWFyIGZyb20gJy4vdGVhcic7XG5pbXBvcnQgcmVwZWF0IGZyb20gJy4uL3V0aWxzL3N0cmluZy9yZXBlYXQnO1xuaW1wb3J0IGlzQ29sbGlkaW5nIGZyb20gJy4uL3V0aWxzL3BoeXNpY3MvaXMtY29sbGlkaW5nJztcbmltcG9ydCB7XG4gICAgTElNSVRfVE9QX0lTQUFDLFxuICAgIExJTUlUX0JPVFRPTV9JU0FBQyxcbiAgICBMSU1JVF9MRUZUX0lTQUFDLFxuICAgIExJTUlUX1JJR0hUX0lTQUFDLFxuICAgIEtFWV9VUCxcbiAgICBLRVlfRE9XTixcbiAgICBLRVlfTEVGVCxcbiAgICBLRVlfUklHSFQsXG4gICAgS0VZX1csXG4gICAgS0VZX1MsXG4gICAgS0VZX0EsXG4gICAgS0VZX0Rcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnLi4vaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlXG4gICAgICAgIH0gfSApO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gbmV3IENvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0ge3g6IDAsIHk6IDF9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IHRoaXMuX2tleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uZGVsZXRlKCBlLmtleUNvZGUgKSApO1xuXG4gICAgICAgIHRoaXMuX2NhblRha2VEbWcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRUYWtlRG1nID0gaXNDb2xsaWRpbmcoIHRoaXMsIG1vbnN0ZXJzICk7XG5cbiAgICAgICAgICAgIGlmICggIXNob3VsZFRha2VEbWcgJiYgIWlzQ29sbGlkaW5nKCB0aGlzLCBvYnN0YWNsZXMgKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSBvbGRYO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBpZiAoIHNob3VsZFRha2VEbWcgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGFzdERtZyA9IG5vdztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feSAmJlxuICAgICAgICAgICAgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRZID0gdGhpcy5feTtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcblxuICAgICAgICAgICAgY29uc3Qgc2hvdWxkVGFrZURtZyA9IGlzQ29sbGlkaW5nKCB0aGlzLCBtb25zdGVycyApO1xuXG4gICAgICAgICAgICBpZiAoICFzaG91bGRUYWtlRG1nICYmICFpc0NvbGxpZGluZyggdGhpcywgb2JzdGFjbGVzICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSBvbGRZO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBzaG91bGRUYWtlRG1nICYmIG5vdyAtIHRoaXMuX2xhc3REbWcgPiB0aGlzLl9kbWdJbnRlcnZhbCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhwIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCB0aW1lLCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcblxuICAgICAgICBpZiAoIGRlcGxhY2VtZW50ID09PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5zaXplID09PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgIC8vIGRpYWdvbmFsIGRpc3RhbmNlIHNob3VsZCBiZSArLU1hdGguc3FydCggZGVwbGFjZW1lbnQgLyAyICkuLi4gYnV0IGl0IGZlZWxzIHNvIHNsb3cuXG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgJiZcbiAgICAgICAgICAgICEoIGtleXNEb3duLmhhcyggS0VZX0EgKSB8fCBrZXlzRG93bi5oYXMoIEtFWV9EICkgKSApIC8vIHZlcnRpY2FsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUyApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgKSAvL3ZlcnRpY2FsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IE1hdGguc3FydCggZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIGRlcGxhY2VtZW50ICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0QgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfVyApIHx8IGtleXNEb3duLmhhcyggS0VZX1MgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9EICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5zcXJ0KCBkZXBsYWNlbWVudCApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaXJlY3Rpb24oIG5vdyApO1xuICAgIH1cblxuXG4gICAgdXBkYXRlRGlyZWN0aW9uKCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcblxuICAgICAgICBsZXQgZGlyZWN0aW9uID0ge307XG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICAoIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRpcmVjdGlvbi54ICE9PSAwIHx8IGRpcmVjdGlvbi55ICE9PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfRE9XTiApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9MRUZUICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKSAmJiAoICF0aGlzLl9sYXN0U2hvb3QgfHxcbiAgICAgICAgICAgICggbm93IC0gdGhpcy5fbGFzdFNob290ID49IHRoaXMuX2F0dGFja1NwZWVkICkgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IG5vdztcbiAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3Bhd24oKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMuX3kgPSBjYW52YXMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMuYWRkKCBuZXcgVGVhciggeyB4OiB4LCB5OiB5LCBkaXJlY3Rpb246IHRoaXMuX2RpcmVjdGlvbiwgY3JlYXRvcjogdGhpcyB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnbGVmdCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5sZWZ0WzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLmxlZnRbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coICdyaWdodCcgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5yaWdodFswXTtcbiAgICAgICAgICAgICAgICB5ID0gaGVhZC5yaWdodFsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbi55IClcbiAgICAgICAge1xuICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyggJ3VwJyApO1xuICAgICAgICAgICAgICAgIHggPSBoZWFkLnVwWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLnVwWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCAnZG93bicgKTtcbiAgICAgICAgICAgICAgICB4ID0gaGVhZC5kb3duWzBdO1xuICAgICAgICAgICAgICAgIHkgPSBoZWFkLmRvd25bMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsZWFnc1xuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgMCwgMjUsIDE4LCAxNCwgdGhpcy5feCArIDUsIHRoaXMuX3kgKyAyMCwgMTgsIDE0ICk7XG4gICAgICAgIC8vIGhlYWRcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQsXG4gICAgICAgICAgICB0aGlzLl94LCB0aGlzLl95LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fdGhlbjtcbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICB0aGlzLnVwZGF0ZSggZGVsdGEgLyAxMDAwLCBub3cgKTtcbiAgICAgICAgc3VwZXIucmVuZGVyKCk7XG5cbiAgICAgICAgdGhpcy5fdGVhcnMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuX3RlYXJzLnJlbmRlcigpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiKDI1MCwgNTAsIDUwKSc7XG4gICAgICAgIGN0eC5mb250ID0gJzIwcHggSGVsdmV0aWNhJztcbiAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICBjdHguZmlsbFRleHQoIHJlcGVhdCggJ+KdpCAnLCB0aGlzLmhwICksIDM1LCAxMyApO1xuXG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJy4vc3RhdGljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQgeyByb2NrcyB9IGZyb20gJy4uL2ltYWdlcy9vYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2NrIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IDUwLCBoZWlnaHQ6IDUxLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IHJvY2tzLnNwcml0ZVxuICAgICAgICB9IH0gKTtcblxuICAgICAgICB0aGlzLl9pc1NwZWNpYWwgPSBNYXRoLnJhbmRvbSgpIDwgMC4wNTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IHRoaXMuX2lzU3BlY2lhbCA/IDE3MCA6IDA7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCAxNzAsIDE3MiwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmltcG9ydCB7IGRlZmF1bHRSb29tIH0gZnJvbSAnLi4vaW1hZ2VzL3Jvb21zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbSBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgaW1hZ2UgfT17IGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFJvb20gfSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiA4MDAsIGhlaWdodDogNDgwLCBpbWFnZSAgfSApO1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJy4vYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG5cbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICcuL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnLi4vaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICcuLi9sYXllcnMnO1xuaW1wb3J0IGlzQ29sbGlkaW5nIGZyb20gJy4uL3V0aWxzL3BoeXNpY3MvaXMtY29sbGlkaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIGRpcmVjdGlvbiwgc3BlZWQsIGNyZWF0b3IgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMTMsIGhlaWdodDogMTMsIGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFRlYXIgfSB9ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgNDtcbiAgICAgICAgdGhpcy5fY3JlYXRvciA9IGNyZWF0b3I7XG5cbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSBkaXJlY3Rpb24ueCAqIHRoaXMuX3NwZWVkO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IGRpcmVjdGlvbi55ICogdGhpcy5fc3BlZWQ7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIExJTUlUX0xFRlQgLSB0aGlzLndpZHRoIDw9IHRoaXMuX3ggJiYgdGhpcy5feCA8PSBMSU1JVF9SSUdIVCArIHRoaXMud2lkdGggJiZcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuaGVpZ2h0IDw9IHRoaXMuX3kgJiYgdGhpcy5feSA8PSBMSU1JVF9CT1RUT00gKyB0aGlzLmhlaWdodCAmJlxuXG4gICAgICAgICAgICAhaXNDb2xsaWRpbmcoIHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKCBpdGVtID0+IGl0ZW0gIT09IHRoaXMuX2NyZWF0b3IgKSApO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMueFZlbG9jaXR5O1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5hY3RpdmUgJiYgdGhpcy5pbkJvdW5kcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMgfSBmcm9tICcuL2NhbnZhcyc7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1BfSVNBQUMgPSA0MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT01fSVNBQUMgPSBjYW52YXMuaGVpZ2h0IC0gOTU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVF9JU0FBQyA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUX0lTQUFDID0gY2FudmFzLndpZHRoIC0gODU7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1AgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT00gPSBjYW52YXMuaGVpZ2h0IC0gNjU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDYwO1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gNzU7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG5leHBvcnQgY29uc3QgS0VZX1NQQUNFID0gMzI7XG5leHBvcnQgY29uc3QgS0VZX1cgPSA4NztcbmV4cG9ydCBjb25zdCBLRVlfQSA9IDY1O1xuZXhwb3J0IGNvbnN0IEtFWV9TID0gODM7XG5leHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbiIsImV4cG9ydCBjb25zdCBpc2FhYyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2lzYWFjX3Nwcml0ZV9jdXN0b20ucG5nJyxcbiAgICBoZWFkOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDI4LFxuICAgICAgICBoZWlnaHQ6IDI1LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMF0sXG4gICAgICAgICAgICB1cDogWzI4KjQsIDBdLFxuICAgICAgICAgICAgbGVmdDogWzI4KjYsIDBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCoyLCAwXVxuICAgICAgICB9LFxuICAgICAgICBzaG9vdGluZ0RpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFsyOCwgMF0sXG4gICAgICAgICAgICB1cDogWzI4KjUsIDBdLFxuICAgICAgICAgICAgbGVmdDogWzI4KjcsIDBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCozLCAwXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBsZWdzOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE4LFxuICAgICAgICBoZWlnaHQ6IDE0LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMjVdLFxuICAgICAgICAgICAgdXA6IFsxOCo1LCAyNV0sXG4gICAgICAgICAgICBsZWZ0OiBbMCwgMjVdLFxuICAgICAgICAgICAgcmlnaHQ6IFswLCAyNV1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGlzYWFjXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzAsIDBdXG4gICAgfSxcbiAgICBzcGVjaWFsOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMTcwLCAwXVxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZmlyZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2ZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMxLFxuICAgIGhlaWdodDogMzQsXG4gICAgc3RhdGVzOiA2XG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIHJvY2tzLFxuICAgIGZpcmVcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbVxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0VGVhciA9ICdidWlsZC9pbWcvdGVhci5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUZWFyXG59O1xuIiwiaW1wb3J0IElzYWFjIGZyb20gJy4vY29tcG9uZW50cy9pc2FhYyc7XG5pbXBvcnQgUm9vbSBmcm9tICcuL2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgUm9jayBmcm9tICcuL2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICcuL2NvbXBvbmVudHMvZmlyZSc7XG5cbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kID1cbltcbiAgICBuZXcgUm9vbSgpLFxuXTtcblxuZXhwb3J0IGNvbnN0IGZvcmVncm91bmQgPVxuW1xuICAgIC8vIG9ic3RhY2xlcywgdGhleSBob25lc3RseSBkb24ndCBuZWVkIHRvIGJlIGdyb3VwZWQgaW4gYW4gYXJyYXlcbiAgICBbXG4gICAgICAgIG5ldyBSb2NrKCB7IHg6IDQ1MCwgeTogMTIwIH0gKSxcbiAgICAgICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDY1IH0gKSxcbiAgICAgICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiA2NSB9ICksXG4gICAgICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogNjUgfSApLFxuICAgICAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogMTE2IH0gKSxcbiAgICAgICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiAxMTYgfSApLFxuICAgICAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDExNiB9IClcbiAgICBdLFxuICAgIC8vIG1vbnN0ZXJzXG4gICAgW1xuICAgICAgICBuZXcgRmlyZSggeyB4OiA3MDMsIHk6IDY1IH0gKVxuICAgIF0sXG4gICAgLy8gcGxheWVyXG4gICAgbmV3IElzYWFjKCksXG5dO1xuXG5leHBvcnQgY29uc3Qgb2JzdGFjbGVzID0gZm9yZWdyb3VuZFswXTtcbmV4cG9ydCBjb25zdCBtb25zdGVycyA9IGZvcmVncm91bmRbMV07XG5leHBvcnQgY29uc3QgcGxheWVyID0gZm9yZWdyb3VuZFsyXTtcbiIsImNvbnN0IGlzQ29sbGlkaW5nID0gKCB0YXJnZXQsIG90aGVyICkgPT5cbntcbiAgICAvLyBpZ25vcmUgY29sbGlzaW9uIHdpdGggc2VsZlxuICAgIGlmICggdGFyZ2V0ID09PSBvdGhlciApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBvdGhlciApIClcbiAgICB7XG4gICAgICAgIHJldHVybiBvdGhlci5zb21lKCBfb3RoZXIgPT4gaXNDb2xsaWRpbmcoIHRhcmdldCwgX290aGVyICkgKTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ICsgMiA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCAtIDEwIDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgcmV0dXJuIGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQ29sbGlkaW5nO1xuIiwiZXhwb3J0IGRlZmF1bHQgKCBzdHIsIHRpbWVzICkgPT5cbntcbiAgICBsZXQgX3N0ciA9ICcnO1xuICAgIHdoaWxlICggdGltZXMtLSApXG4gICAge1xuICAgICAgICBfc3RyICs9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIF9zdHI7XG59O1xuIl19
