(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _canvas = require('canvas');

var _layers = require('layers');

var main = function main() {
    _layers.background.render();
    _layers.foreground.render();

    _canvas.displayCtx.drawImage(_canvas.canvas, 0, 0); // draw something visible only once per frame.

    requestAnimationFrame(main);
};

main();

},{"canvas":2,"layers":24}],2:[function(require,module,exports){
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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _canvas = require('canvas');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _imagesHUD = require('images/HUD');

var HUD = (function () {
    function HUD() {
        var _this = this;

        _classCallCheck(this, HUD);

        this.images = [];
        this._images = [];

        var elements = {
            hearts: _imagesHUD.hearts,
            bombs: _imagesHUD.bombs
        };
        Object.keys(elements).forEach(function (prop) {
            var element = elements[prop];
            _this.images[prop] = element.sprite;

            var image = {
                image: new Image(),
                ready: false
            };
            _this._images[prop] = image;

            image.image.onload = function () {
                return image.ready = true;
            };
            image.image.src = element.sprite;
        });
    }

    _createClass(HUD, [{
        key: 'render',
        value: function render() {

            if (this._images.hearts.ready) {
                var width = _imagesHUD.hearts.width * 1.5;
                var height = _imagesHUD.hearts.height * 1.5;
                var initialX = 10;
                var initialY = 10;
                var originalHp = _store2['default'].get('player').hp;

                var hp = originalHp;
                var x = initialX;
                var y = initialY;

                var _hp = 0;

                while (_hp < hp) {
                    var _hearts$default$position = _slicedToArray(_imagesHUD.hearts['default'].position, 2);

                    var spriteX = _hearts$default$position[0];
                    var spriteY = _hearts$default$position[1];

                    if (_hp + 0.5 === hp) {
                        var _hearts$halfdefault$position = _slicedToArray(_imagesHUD.hearts.halfdefault.position, 2);

                        spriteX = _hearts$halfdefault$position[0];
                        spriteY = _hearts$halfdefault$position[1];

                        _canvas.ctx.drawImage(this._images.hearts.image, spriteX, spriteY, _imagesHUD.hearts.width, _imagesHUD.hearts.height, x, y, width, height);
                    } else {
                        _canvas.ctx.drawImage(this._images.hearts.image, spriteX, spriteY, _imagesHUD.hearts.width, _imagesHUD.hearts.height, x, y, width, height);
                    }

                    x += width;
                    _hp += 1;

                    if (7 < _hp && 8 >= _hp) {
                        y += height;
                        x = initialX;
                    }
                }
            }

            if (this._images.bombs.ready) {
                var width = _imagesHUD.bombs.width;
                var height = _imagesHUD.bombs.height;
                var initialX = 5;
                var initialY = 55;
                var playerBombs = _store2['default'].get('playerItems').get('bomb');
                var count = playerBombs ? playerBombs.quantity : 0;

                var _bombs$default$position = _slicedToArray(_imagesHUD.bombs['default'].position, 2);

                var spriteX = _bombs$default$position[0];
                var spriteY = _bombs$default$position[1];

                _canvas.ctx.drawImage(this._images.bombs.image, spriteX, spriteY, _imagesHUD.bombs.width, _imagesHUD.bombs.height, initialX, initialY, width, height);

                _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
                _canvas.ctx.font = '15px Helvetica';
                _canvas.ctx.textAlign = 'left';
                _canvas.ctx.textBaseline = 'top';
                _canvas.ctx.fillText('x ' + count, initialX + width, initialY + 6);
            }
        }
    }]);

    return HUD;
})();

exports['default'] = HUD;
module.exports = exports['default'];

},{"canvas":2,"images/HUD":18,"store":25}],4:[function(require,module,exports){
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

        var _ref$x = _ref.x;
        var x = _ref$x === undefined ? null : _ref$x;
        var _ref$y = _ref.y;
        var y = _ref$y === undefined ? null : _ref$y;
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;

        _classCallCheck(this, Actor);

        this.width = width;
        this.height = height;
        this.image = image || null;
        this._x = x;
        this._y = y;

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

            if ('canvas' === type) {
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
        key: 'render',
        value: function render() {
            var x = Math.round(this._x);
            var y = Math.round(this._y);
            _canvas.ctx.fillStyle = 'red';
            _canvas.ctx.fillRect(this._x, this._y, this.width, this.height);

            if (this.image && this.ready) {
                if ('image' === this.image.type) {
                    _canvas.ctx.drawImage(this._image, x, y);
                } else if ('sprite' === this.image.type && this.renderSprite) {
                    this.renderSprite();
                }
            }
        }
    }, {
        key: 'x',
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._x = value;
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._y = value;
        }
    }, {
        key: 'center',
        get: function get() {
            return {
                x: this._x + this.width / 2,
                y: this._y + this.height / 2
            };
        }
    }]);

    return Actor;
})();

exports['default'] = Actor;
module.exports = exports['default'];

},{"../canvas":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsCollectible = require('components/collectible');

var _componentsCollectible2 = _interopRequireDefault(_componentsCollectible);

var _componentsDynamicActor = require('components/dynamic-actor');

var _componentsDynamicActor2 = _interopRequireDefault(_componentsDynamicActor);

var _canvas = require('canvas');

var _imagesItems = require('images/items');

var _utilsPhysicsCollisions = require('utils/physics/collisions');

var _utilsPhysicsCollisions2 = _interopRequireDefault(_utilsPhysicsCollisions);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var BombActor = (function (_DynamicActor) {
    function BombActor(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, BombActor);

        _get(Object.getPrototypeOf(BombActor.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesItems.bombs.width, height: _imagesItems.bombs.height, image: {
                type: 'sprite',
                src: _imagesItems.bombs.sprite
            } });

        this.damages = 1.5;
        this.active = false;
    }

    _inherits(BombActor, _DynamicActor);

    _createClass(BombActor, [{
        key: 'drop',
        value: function drop() {
            var _this = this;

            this.active = true;
            setTimeout(function () {
                return _this.renderExplosion();
            }, 4000); // 4 seconds after

            _store2['default'].get('tears').push(this);
        }
    }, {
        key: 'renderExplosion',
        value: function renderExplosion() {
            this.active = false;
            this.width = 50;
            this.height = 50;
        }
    }, {
        key: 'renderSprite',
        value: function renderSprite() {
            var bombName = 1 === this.quantity ? 'default' : 'double';

            var _ref2 = _imagesItems.bombs[bombName].position || [0, 0];

            var _ref22 = _slicedToArray(_ref2, 2);

            var x = _ref22[0];
            var y = _ref22[1];

            // console.log( this.x, this.y );

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }]);

    return BombActor;
})(_componentsDynamicActor2['default']);

var Bomb = (function (_Collectible) {
    function Bomb(_ref3) {
        var x = _ref3.x;
        var y = _ref3.y;

        _classCallCheck(this, Bomb);

        _get(Object.getPrototypeOf(Bomb.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesItems.bombs.width, height: _imagesItems.bombs.height, image: {
                type: 'sprite',
                src: _imagesItems.bombs.sprite
            } });

        this.quantity = 0.2 > Math.random() ? 2 : 1;
    }

    _inherits(Bomb, _Collectible);

    _createClass(Bomb, [{
        key: 'renderSprite',
        value: function renderSprite() {
            var bombName = 1 === this.quantity ? 'default' : 'double';

            var _ref4 = _imagesItems.bombs[bombName].position || [0, 0];

            var _ref42 = _slicedToArray(_ref4, 2);

            var x = _ref42[0];
            var y = _ref42[1];

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }, {
        key: 'toItem',
        value: function toItem() {
            return {
                type: 'bomb',
                quantity: this.quantity,
                isDroppable: true
            };
        }
    }, {
        key: 'toDroppable',
        value: function toDroppable() {
            return BombActor; // return the class so the wearer can do new on it.
        }
    }]);

    return Bomb;
})(_componentsCollectible2['default']);

exports['default'] = Bomb;
module.exports = exports['default'];

},{"canvas":2,"components/collectible":7,"components/dynamic-actor":10,"images/items":20,"store":25,"utils/physics/collisions":26}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsDynamicActor = require('components/dynamic-actor');

var _componentsDynamicActor2 = _interopRequireDefault(_componentsDynamicActor);

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
        get: function get() {
            return this._name;
        },
        set: function set(value) {
            throw new Error('Can\'t change name, name setter:' + value);
        }
    }, {
        key: 'hp',
        get: function get() {
            return this._hp;
        },
        set: function set(value) {
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
})(_componentsDynamicActor2['default']);

exports['default'] = Character;
module.exports = exports['default'];

},{"components/dynamic-actor":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsStaticActor = require('components/static-actor');

var _componentsStaticActor2 = _interopRequireDefault(_componentsStaticActor);

var Collectible = (function (_StaticActor) {
    function Collectible() {
        _classCallCheck(this, Collectible);

        _get(Object.getPrototypeOf(Collectible.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(Collectible, _StaticActor);

    _createClass(Collectible, [{
        key: 'toItem',
        value: function toItem() {
            throw new Error('toItem() must be implemented');
        }
    }]);

    return Collectible;
})(_componentsStaticActor2['default']);

exports['default'] = Collectible;
module.exports = exports['default'];

},{"components/static-actor":15}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var Collection = (function (_Array) {
    function Collection(_ref) {
        var _ref$collection = _ref.collection;
        var collection = _ref$collection === undefined ? [] : _ref$collection;
        var _ref$shouldUpdateBeforeRender = _ref.shouldUpdateBeforeRender;
        var shouldUpdateBeforeRender = _ref$shouldUpdateBeforeRender === undefined ? false : _ref$shouldUpdateBeforeRender;
        var _ref$shouldUpdateAfterRender = _ref.shouldUpdateAfterRender;
        var shouldUpdateAfterRender = _ref$shouldUpdateAfterRender === undefined ? false : _ref$shouldUpdateAfterRender;

        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), "constructor", this).call(this);
        this.push.apply(this, _toConsumableArray(collection));

        this._shouldUpdateBeforeRender = shouldUpdateBeforeRender;
        this._shouldUpdateAfterRender = shouldUpdateAfterRender;
    }

    _inherits(Collection, _Array);

    _createClass(Collection, [{
        key: "remove",
        value: function remove(item) {
            var index = this.indexOf(item);

            if (-1 < index) {
                this.splice(index, 1);
            }
        }
    }, {
        key: "update",
        value: function update() {
            var len = this.length;
            var newThis = [];

            for (var i = 0; i < len; i++) {
                var item = this[i];

                if (item.update) {
                    item.update();
                }

                if (false === item.active) {
                    if (item.renderDestroy) {
                        item.renderDestroy();
                    }
                } else {
                    newThis.push(item);
                }
            }

            if (newThis.length !== len) {
                this.splice(len - 1);

                for (var j = 0, lenj = newThis.length; j < lenj; j++) {
                    this[j] = newThis[j];
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this._shouldUpdateBeforeRender && !this.isEmpty) {
                this.update();
            }

            for (var i = 0, len = this.length; i < len; i++) {
                this[i].render();
            }

            if (this._shouldUpdateAfterRender && !this.isEmpty) {
                this.update();
            }
        }
    }, {
        key: "isEmpty",
        get: function get() {
            return 0 === this.length;
        }
    }]);

    return Collection;
})(Array);

exports["default"] = Collection;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsStaticActor = require('components/static-actor');

var _componentsStaticActor2 = _interopRequireDefault(_componentsStaticActor);

var DestructibleStaticActor = (function (_StaticActor) {
    function DestructibleStaticActor(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;
        var hp = _ref.hp;

        _classCallCheck(this, DestructibleStaticActor);

        _get(Object.getPrototypeOf(DestructibleStaticActor.prototype), 'constructor', this).call(this, { x: x, y: y, width: width, height: height, image: image });

        this._hp = hp;
        this.active = true;
        this._dmgInterval = 500;
        this._lastDmg = Date.now();
    }

    _inherits(DestructibleStaticActor, _StaticActor);

    _createClass(DestructibleStaticActor, [{
        key: 'hp',
        get: function get() {
            return this._hp;
        },
        set: function set(value) {
            if (0 < value) {
                this._hp = value;
            } else {
                this.active = false;
            }
        }
    }]);

    return DestructibleStaticActor;
})(_componentsStaticActor2['default']);

exports['default'] = DestructibleStaticActor;
module.exports = exports['default'];

},{"components/static-actor":15}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsActor = require('components/actor');

var _componentsActor2 = _interopRequireDefault(_componentsActor);

var DynamicActor = (function (_Actor) {
    function DynamicActor(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var width = _ref.width;
        var height = _ref.height;
        var image = _ref.image;
        var speed = _ref.speed;

        _classCallCheck(this, DynamicActor);

        _get(Object.getPrototypeOf(DynamicActor.prototype), 'constructor', this).call(this, { x: x, y: y, width: width, height: height, image: image });

        this._speed = speed || 256;
    }

    _inherits(DynamicActor, _Actor);

    _createClass(DynamicActor, [{
        key: 'speed',
        get: function get() {
            return this._speed;
        },
        set: function set(value) {
            this._speed = value;
        }
    }]);

    return DynamicActor;
})(_componentsActor2['default']);

exports['default'] = DynamicActor;
module.exports = exports['default'];

},{"components/actor":4}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsDestructibleStaticActor = require('components/destructible-static-actor');

var _componentsDestructibleStaticActor2 = _interopRequireDefault(_componentsDestructibleStaticActor);

var _canvas = require('canvas');

var _imagesObstacles = require('images/obstacles');

var Fire = (function (_DestructibleStaticActor) {
    function Fire(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Fire);

        _get(Object.getPrototypeOf(Fire.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesObstacles.fire.width, height: _imagesObstacles.fire.height, hp: 3, image: {
                type: 'sprite',
                src: _imagesObstacles.fire.sprite
            } });

        this._state = 0;
        this._states = _imagesObstacles.fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
        this.damages = 0.5;
    }

    _inherits(Fire, _DestructibleStaticActor);

    _createClass(Fire, [{
        key: 'renderSprite',
        value: function renderSprite() {
            if (0 === this.hp) {
                this.setImage(_imagesObstacles.fire.sprite);
                _get(Object.getPrototypeOf(Fire.prototype), 'render', this).call(this);
                return;
            }
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
})(_componentsDestructibleStaticActor2['default']);

exports['default'] = Fire;
module.exports = exports['default'];

},{"canvas":2,"components/destructible-static-actor":9,"images/obstacles":21}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _canvas = require('canvas');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _componentsCharacter = require('components/character');

var _componentsCharacter2 = _interopRequireDefault(_componentsCharacter);

var _componentsTear = require('components/tear');

var _componentsTear2 = _interopRequireDefault(_componentsTear);

var _utilsPhysicsCollisions = require('utils/physics/collisions');

var _constants = require('../constants');

var _imagesCharacters = require('images/characters');

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
        this._tears = _store2['default'].get('tears');
        this._attackSpeed = 500; // 1 shoot / second
        this.damages = 1;
        this._direction = { x: 0, y: 1 };
        this.collidingWidth = this.width - 2;
        this.collidingHeight = this.height - 10;
        document.addEventListener('keydown', function (e) {
            return _this._keysDown.add(e.keyCode);
        });
        document.addEventListener('keyup', function (e) {
            return _this._keysDown['delete'](e.keyCode);
        });

        this._dmgInterval = 500;
        this._lastDmg = Date.now();

        this.respawn();
    }

    _inherits(Isaac, _Character);

    _createClass(Isaac, [{
        key: 'pickupItems',
        value: function pickupItems() {
            var items = _store2['default'].get('items');
            var playerItems = _store2['default'].get('playerItems');
            var collectible = (0, _utilsPhysicsCollisions.isColliding)(this, items);

            if (!collectible) {
                return;
            }

            items.remove(collectible);
            var item = collectible.toItem();

            for (var i = 0; i < item.quantity; i++) {
                var existingItem = playerItems.get(item.type) || { quantity: 0, items: [] };

                existingItem.quantity += 1;

                if (item.isDroppable) {
                    existingItem.items.push(collectible.toDroppable());
                }

                playerItems.set(item.type, existingItem);
            }
        }
    }, {
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;
            var keysDown = this._keysDown;
            var direction = { x: 0, y: 1 };

            if (0 === deplacement) {
                return false;
            }

            if (0 === keysDown.size) {
                return false;
            }

            if (keysDown.has(_constants.KEY_W) && !(keysDown.has(_constants.KEY_A) || keysDown.has(_constants.KEY_D))) // vertical
                {
                    this.y -= deplacement;
                    direction.y = -1;
                } else if (keysDown.has(_constants.KEY_W)) // diagonal
                {
                    this.y -= Math.sqrt(Math.pow(deplacement, 2) / 2);
                } else if (keysDown.has(_constants.KEY_S) && !(keysDown.has(_constants.KEY_A) || keysDown.has(_constants.KEY_D))) // vertical
                {
                    this.y += deplacement;
                    direction.y = 1;
                } else if (keysDown.has(_constants.KEY_S)) // diagonal
                {
                    this.y += Math.sqrt(Math.pow(deplacement, 2) / 2);
                }

            if (keysDown.has(_constants.KEY_A) && !(keysDown.has(_constants.KEY_W) || keysDown.has(_constants.KEY_S))) // horizontal
                {
                    this.x -= deplacement;
                    direction.x = -1;
                } else if (keysDown.has(_constants.KEY_A)) // diagonal
                {
                    this.x -= Math.sqrt(Math.pow(deplacement, 2) / 2);
                    direction.x = -1;
                } else if (keysDown.has(_constants.KEY_D) && !(keysDown.has(_constants.KEY_W) || keysDown.has(_constants.KEY_S))) // horizontal
                {
                    this.x += deplacement;
                    direction.x = 1;
                } else if (keysDown.has(_constants.KEY_D)) // diagonal
                {
                    this.x += Math.sqrt(Math.pow(deplacement, 2) / 2);
                    direction.x = 1;
                }

            this._direction = direction;

            this.updateShootingDirection(now);
        }
    }, {
        key: 'updateShootingDirection',
        value: function updateShootingDirection(now) {
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

            if (0 !== direction.x || 0 !== direction.y) {
                this._direction = direction;
            }

            if ((keysDown.has(_constants.KEY_UP) || keysDown.has(_constants.KEY_DOWN) || keysDown.has(_constants.KEY_LEFT) || keysDown.has(_constants.KEY_RIGHT)) && (!this._lastShoot || now - this._lastShoot >= this._attackSpeed)) {
                this._lastShoot = now;
                this.shoot();
            }

            if (keysDown.has(_constants.KEY_SPACE) && (!this._lastBomb || 500 <= now - this._lastBomb)) {
                this._lastBomb = now;
                this.dropBomb();
            }
        }
    }, {
        key: 'respawn',
        value: function respawn() {
            this._x = _canvas.canvas.width / 2;
            this._y = _canvas.canvas.height / 2;
        }
    }, {
        key: 'dropBomb',
        value: function dropBomb() {
            var playerItems = _store2['default'].get('playerItems');
            var existingItem = playerItems.get('bomb');

            if (existingItem.quantity) {
                var x = this.x;
                var y = this.y;

                var _existingItem$items = _toArray(existingItem.items);

                var Bomb = _existingItem$items[0];

                var bombs = _existingItem$items.slice(1);

                existingItem.items = bombs;
                existingItem.quantity -= 1;

                var bomb = new Bomb({ x: x, y: y });
                bomb.drop();

                playerItems.set('bomb', existingItem);
            }
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

            this._tears.push(new _componentsTear2['default']({
                x: x,
                y: y,
                direction: this._direction,
                creator: this,
                damages: this.damages
            }));
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
                    var _head$left = _slicedToArray(head.left, 2);

                    x = _head$left[0];
                    y = _head$left[1];

                    break;
                case 1:
                    var _head$right = _slicedToArray(head.right, 2);

                    x = _head$right[0];
                    y = _head$right[1];

                    break;
            }

            if (isShooting || !isShooting && !x) {
                switch (direction.y) {
                    case -1:
                        var _head$up = _slicedToArray(head.up, 2);

                        x = _head$up[0];
                        y = _head$up[1];

                        break;
                    case 1:
                        var _head$down = _slicedToArray(head.down, 2);

                        x = _head$down[0];
                        y = _head$down[1];

                        break;
                }
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
        }
    }, {
        key: 'x',
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            if (value !== this._x && _constants.LIMIT_LEFT_ISAAC < value && value < _constants.LIMIT_RIGHT_ISAAC) {
                var oldX = this._x;
                this._x = value;
                var enemy = (0, _utilsPhysicsCollisions.isColliding)(this, _store2['default'].get('monsters'));

                if (!enemy && !(0, _utilsPhysicsCollisions.isColliding)(this, _store2['default'].get('obstacles'))) {
                    this._x = value;
                    this.pickupItems();

                    return;
                }

                this._x = oldX;

                var now = Date.now();
                if (enemy && now - this._lastDmg > this._dmgInterval) {
                    this.hp -= enemy.damages || 1;
                    this._lastDmg = now;
                }
            }
        }
    }, {
        key: 'y',
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            if (value !== this._y && _constants.LIMIT_TOP_ISAAC < value && value < _constants.LIMIT_BOTTOM_ISAAC) {
                var oldY = this._y;
                this._y = value;

                var enemy = (0, _utilsPhysicsCollisions.isColliding)(this, _store2['default'].get('monsters'));

                if (!enemy && !(0, _utilsPhysicsCollisions.isColliding)(this, _store2['default'].get('obstacles'))) {
                    this._y = value;
                    this.pickupItems();

                    return;
                }

                var now = Date.now();
                this._y = oldY;

                if (enemy && now - this._lastDmg > this._dmgInterval) {
                    this.hp -= enemy.damages || 1;
                    this._lastDmg = now;
                }
            }
        }
    }]);

    return Isaac;
})(_componentsCharacter2['default']);

exports['default'] = Isaac;
module.exports = exports['default'];

},{"../constants":17,"canvas":2,"components/character":6,"components/tear":16,"images/characters":19,"store":25,"utils/physics/collisions":26}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsStaticActor = require('components/static-actor');

var _componentsStaticActor2 = _interopRequireDefault(_componentsStaticActor);

var _canvas = require('canvas');

var _imagesObstacles = require('images/obstacles');

var Rock = (function (_StaticActor) {
    function Rock(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Rock);

        _get(Object.getPrototypeOf(Rock.prototype), 'constructor', this).call(this, { x: x, y: y, width: 50, height: 51, image: {
                type: 'sprite',
                src: _imagesObstacles.rocks.sprite
            } });

        this._isSpecial = 0.05 > Math.random();
    }

    _inherits(Rock, _StaticActor);

    _createClass(Rock, [{
        key: 'renderSprite',
        value: function renderSprite() {
            var _ref2 = this._isSpecial ? _imagesObstacles.rocks.special.position : _imagesObstacles.rocks['default'].position;

            var _ref22 = _slicedToArray(_ref2, 2);

            var x = _ref22[0];
            var y = _ref22[1];

            _canvas.ctx.drawImage(this._image, x, y, _imagesObstacles.rocks.width, _imagesObstacles.rocks.height, this._x, this._y, this.width, this.height);
        }
    }]);

    return Rock;
})(_componentsStaticActor2['default']);

exports['default'] = Rock;
module.exports = exports['default'];

},{"canvas":2,"components/static-actor":15,"images/obstacles":21}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsActor = require('components/actor');

var _componentsActor2 = _interopRequireDefault(_componentsActor);

var _imagesRooms = require('images/rooms');

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
})(_componentsActor2['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"components/actor":4,"images/rooms":22}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsActor = require('components/actor');

var _componentsActor2 = _interopRequireDefault(_componentsActor);

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
})(_componentsActor2['default']);

exports['default'] = StaticActor;
module.exports = exports['default'];

},{"components/actor":4}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsDynamicActor = require('components/dynamic-actor');

var _componentsDynamicActor2 = _interopRequireDefault(_componentsDynamicActor);

var _constants = require('../constants');

var _imagesTears = require('images/tears');

var _layers = require('layers');

var _utilsPhysicsCollisions = require('utils/physics/collisions');

var Tear = (function (_DynamicActor) {
    function Tear(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var direction = _ref.direction;
        var speed = _ref.speed;
        var creator = _ref.creator;
        var damages = _ref.damages;

        _classCallCheck(this, Tear);

        _get(Object.getPrototypeOf(Tear.prototype), 'constructor', this).call(this, { width: 13, height: 13, image: { type: 'image', src: _imagesTears.defaultTear } });

        this._x = x;
        this._y = y;
        this.active = true;
        this._speed = speed || 4;
        this._creator = creator;
        this.damages = damages;

        this.xVelocity = direction.x * this._speed;
        this.yVelocity = direction.y * this._speed;
    }

    _inherits(Tear, _DynamicActor);

    _createClass(Tear, [{
        key: 'update',
        value: function update() {
            this._x += this.xVelocity;
            this._y += this.yVelocity;

            this.active = this.active && this.inBounds;
        }
    }, {
        key: 'inBounds',
        get: function get() {
            var _this = this;

            if (_constants.LIMIT_LEFT - this.width > this._x || this._x > _constants.LIMIT_RIGHT + this.width || _constants.LIMIT_TOP - this.height > this._y || this._y > _constants.LIMIT_BOTTOM + this.height) {
                return false;
            }

            var collider = (0, _utilsPhysicsCollisions.isColliding)(this, _layers.foreground.filter(function (item) {
                return item !== _this._creator;
            }));
            if (collider) {
                if ('number' === typeof collider.hp) {

                    collider.hp -= this.damages;
                }

                return false;
            }

            return true;
        }
    }]);

    return Tear;
})(_componentsDynamicActor2['default']);

exports['default'] = Tear;
module.exports = exports['default'];

},{"../constants":17,"components/dynamic-actor":10,"images/tears":23,"layers":24,"utils/physics/collisions":26}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _canvas = require('canvas');

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

},{"canvas":2}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var hearts = {
    sprite: 'build/img/hearts_sprite.png',
    width: 16,
    height: 16,
    empty: {
        position: [32, 0]
    },
    'default': {
        position: [0, 0]
    },
    halfdefault: {
        position: [16, 0]
    },
    spirit: {
        position: [0, 16]
    },
    halfspirit: {
        position: [16, 16]
    },
    evil: {
        position: [32, 16]
    },
    halfevil: {
        position: [48, 16]
    },
    reinforced: {
        position: [48, 0]
    },
    halfreinforced: {
        position: [64, 0]
    }
};

exports.hearts = hearts;
var bombs = {
    sprite: 'build/img/bombs_sprite.png',
    width: 32,
    height: 32,
    'default': {
        position: [0, 0]
    }
};

exports.bombs = bombs;
exports['default'] = {
    hearts: hearts,
    bombs: bombs
};

},{}],19:[function(require,module,exports){
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
    }
};

exports.isaac = isaac;
exports['default'] = {
    isaac: isaac
};

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var bombs = {
    sprite: 'build/img/bombs_sprite.png',
    width: 32,
    height: 32,
    'default': {
        position: [0, 0]
    },
    double: {
        position: [32, 0]
    }
};

exports.bombs = bombs;
exports['default'] = {
    bombs: bombs
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var rocks = {
    sprite: 'build/img/rocks_sprite.png',
    width: 170,
    height: 172,
    'default': {
        width: 170,
        height: 172,
        position: [0, 0]
    },
    special: {
        width: 170,
        height: 172,
        position: [170, 0]
    }
};

exports.rocks = rocks;
var fire = {
    sprite: 'build/img/fire_sprite.png',
    dead: 'build/img/fire_dead.png',
    width: 31,
    height: 34,
    states: 6
};

exports.fire = fire;
exports['default'] = {
    rocks: rocks,
    fire: fire
};

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultRoom = 'build/img/room.png';

exports.defaultRoom = defaultRoom;
exports['default'] = {
    'default': defaultRoom
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultTear = 'build/img/tear.png';

exports.defaultTear = defaultTear;
exports['default'] = {
    'default': defaultTear
};

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _componentsCollection = require('components/collection');

var _componentsCollection2 = _interopRequireDefault(_componentsCollection);

var _componentsRoom = require('components/room');

var _componentsRoom2 = _interopRequireDefault(_componentsRoom);

var _componentsHUD = require('components/HUD');

var _componentsHUD2 = _interopRequireDefault(_componentsHUD);

var _componentsRock = require('components/rock');

var _componentsRock2 = _interopRequireDefault(_componentsRock);

var _componentsFire = require('components/fire');

var _componentsFire2 = _interopRequireDefault(_componentsFire);

var _componentsBomb = require('components/bomb');

var _componentsBomb2 = _interopRequireDefault(_componentsBomb);

var _componentsIsaac = require('components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

_store2['default'].set('room', new _componentsRoom2['default']());
_store2['default'].set('HUD', new _componentsHUD2['default']());

_store2['default'].set('tears', new _componentsCollection2['default']({ shouldUpdateBeforeRender: true }));

_store2['default'].set('obstacles', new _componentsCollection2['default']({ collection: [new _componentsRock2['default']({ x: 450, y: 120 }), new _componentsRock2['default']({ x: 65, y: 65 }), new _componentsRock2['default']({ x: 115, y: 65 }), new _componentsRock2['default']({ x: 165, y: 65 }), new _componentsRock2['default']({ x: 65, y: 116 }), new _componentsRock2['default']({ x: 115, y: 116 }), new _componentsRock2['default']({ x: 165, y: 116 })], shouldUpdateBeforeRender: true }));

_store2['default'].set('items', new _componentsCollection2['default']({ collection: [new _componentsBomb2['default']({ x: 82, y: 356 })] }));

_store2['default'].set('monsters', new _componentsCollection2['default']({ collection: [new _componentsFire2['default']({ x: 703, y: 65 })], shouldUpdateBeforeRender: true }));

_store2['default'].set('player', new _componentsIsaac2['default']());
_store2['default'].set('playerItems', new Map());

var background = new _componentsCollection2['default']({ collection: [_store2['default'].get('room'), _store2['default'].get('HUD')] });

exports.background = background;
var foreground = new _componentsCollection2['default']({ collection: [_store2['default'].get('obstacles'), _store2['default'].get('monsters'), _store2['default'].get('items'), _store2['default'].get('tears'), _store2['default'].get('player')] });

exports.foreground = foreground;
window.Store = _store2['default'];
window.Player = _store2['default'].get('player');
window.items = _store2['default'].get('items');
//
// export const obstacles = foreground[0];
// export const monsters = foreground[1];
// export const player = foreground[2];

},{"components/HUD":3,"components/bomb":5,"components/collection":8,"components/fire":11,"components/isaac":12,"components/rock":13,"components/room":14,"store":25}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = new Map();
exports["default"] = Store;
module.exports = exports["default"];

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsCollection = require('components/collection');

var _componentsCollection2 = _interopRequireDefault(_componentsCollection);

var getColliders = function getColliders(target, other) {
    // ignore collision with self
    if (target === other) {
        return false;
    }

    var x = target.x;
    var width = target.collidingWidth || target.width;
    var y = target.y;
    var height = target.collidingHeight || target.height;

    if (Array.isArray(other) || other instanceof _componentsCollection2['default']) {
        var colliders = [];
        for (var i = 0, len = other.length; i < len; i++) {
            var _colliders = getColliders(target, other[i]);

            if (_colliders) {
                colliders.push.apply(colliders, _colliders);
            }
        }

        return colliders.length ? colliders : false;
    }

    var _x = other.x;
    var _width = other.collidingWidth || other.width;
    var _y = other.y;
    var _height = other.collidingHeight || other.height;

    var top = y + height >= _y;
    var right = x <= _x + _width;
    var bottom = y + height <= _y + _height;
    var left = x + width >= _x;

    if (left && right && bottom && top) {
        return [other];
    }

    return false;
};

exports.getColliders = getColliders;
var isColliding = function isColliding(target, other) {
    // ignore collision with self
    if (target === other) {
        return false;
    }

    var x = target.x;
    var width = target.collidingWidth || target.width;
    var y = target.y;
    var height = target.collidingHeight || target.height;

    if (Array.isArray(other) || other instanceof _componentsCollection2['default']) {
        for (var i = 0, len = other.length; i < len; i++) {
            var collider = isColliding(target, other[i]);
            if (collider) {
                return collider;
            }
        }

        return false;
    }

    var _x = other.x;
    var _width = other.collidingWidth || other.width;
    var _y = other.y;
    var _height = other.collidingHeight || other.height;

    var top = y + height >= _y;
    var right = x <= _x + _width;
    var bottom = y + height <= _y + _height;
    var left = x + width >= _x;

    if (left && right && bottom && top) {
        return other;
    }

    return false;
};
exports.isColliding = isColliding;

},{"components/collection":8}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3RpYmxlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9keW5hbWljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZmlyZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2lzYWFjLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvcm9jay5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvSFVELmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9jaGFyYWN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9pdGVtcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvb2JzdGFjbGVzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9yb29tcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvdGVhcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvbGF5ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3N0b3JlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxRQUFROztzQkFDSixRQUFROztBQUUvQyxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLFlBSmlCLFVBQVUsQ0FJaEIsTUFB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QUFNLENBQUM7O0FBRXRELFFBQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQzdCLFFBQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDO0FBQy9CLFFBQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUMxQyxRQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7QUFFN0IsUUFBSyxJQUFJLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxHQUFHLEVBQ25DO0FBQ0ksZUFBTyxLQUFLLENBQUM7S0FDaEI7O0FBRUQsV0FBTyxLQUFLLENBQUM7Q0FDaEIsQ0FBQztRQTNDVyxXQUFXLEdBQVgsV0FBVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBkaXNwbGF5Q3R4LCBjYW52YXMgfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCB9IGZyb20gJ2xheWVycyc7XG5cbmNvbnN0IG1haW4gPSAoKSA9Plxue1xuICAgIGJhY2tncm91bmQucmVuZGVyKCk7XG4gICAgZm9yZWdyb3VuZC5yZW5kZXIoKTtcblxuICAgIGRpc3BsYXlDdHguZHJhd0ltYWdlKCBjYW52YXMsIDAsIDAgKTsgLy8gZHJhdyBzb21ldGhpbmcgdmlzaWJsZSBvbmx5IG9uY2UgcGVyIGZyYW1lLlxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBtYWluICk7XG59O1xuXG5tYWluKCk7XG4iLCJleHBvcnQgY29uc3QgZGlzcGxheUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwJyApO1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlDdHggPSBkaXNwbGF5Q2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblxuZXhwb3J0IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5jYW52YXMud2lkdGggPSBkaXNwbGF5Q2FudmFzLndpZHRoO1xuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlDYW52YXMuaGVpZ2h0O1xuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCB7IGhlYXJ0cywgYm9tYnMgfSBmcm9tICdpbWFnZXMvSFVEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFydHMsXG4gICAgICAgICAgICBib21icyxcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmtleXMoIGVsZW1lbnRzICkuZm9yRWFjaCggcHJvcCA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZWxlbWVudHNbcHJvcF07XG4gICAgICAgICAgICB0aGlzLmltYWdlc1twcm9wXSA9IGVsZW1lbnQuc3ByaXRlO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXNbcHJvcF0gPSBpbWFnZTtcblxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uub25sb2FkID0gKCkgPT4gaW1hZ2UucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uuc3JjID0gZWxlbWVudC5zcHJpdGU7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5oZWFydHMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhlYXJ0cy53aWR0aCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGhlYXJ0cy5oZWlnaHQgKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDEwO1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFkgPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsSHAgPSBTdG9yZS5nZXQoICdwbGF5ZXInICkuaHA7XG5cbiAgICAgICAgICAgIGxldCBocCA9IG9yaWdpbmFsSHA7XG4gICAgICAgICAgICBsZXQgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgbGV0IHkgPSBpbml0aWFsWTtcblxuICAgICAgICAgICAgbGV0IF9ocCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlICggX2hwIDwgaHAgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhlYXJ0cy5kZWZhdWx0LnBvc2l0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfaHAgKyAwLjUgPT09IGhwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmhhbGZkZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgeCArPSB3aWR0aDtcbiAgICAgICAgICAgICAgICBfaHAgKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmICggNyA8IF9ocCAmJiA4ID49IF9ocCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ICs9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmJvbWJzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBib21icy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGJvbWJzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gNTtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxZID0gNTU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb21icyA9IFN0b3JlLmdldCggJ3BsYXllckl0ZW1zJyApLmdldCggJ2JvbWInICk7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHBsYXllckJvbWJzID8gcGxheWVyQm9tYnMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBib21icy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmJvbWJzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBib21icy53aWR0aCwgYm9tYnMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IDAgPT09IGNvdW50ID8gJ3JnYigxNzUsIDE3NSwgMTc1KScgOiAncmdiKDIyNSwgMjI1LCAyMjUpJztcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE1cHggSGVsdmV0aWNhJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoIGB4ICR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCwgaW5pdGlhbFkgKyA2ICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHg9bnVsbCwgeT1udWxsLCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9IClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZSB8fCBudWxsO1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEltYWdlKCBpbWFnZSwgdHlwZT0naW1hZ2UnIClcbiAgICB7XG4gICAgICAgIGlmICggJ2NhbnZhcycgPT09IHR5cGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGltYWdlICE9PSB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCB0aGlzLl94ICk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCB0aGlzLl95ICk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSAmJiB0aGlzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCAnaW1hZ2UnID09PSB0aGlzLmltYWdlLnR5cGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICggJ3Nwcml0ZScgPT09IHRoaXMuaW1hZ2UudHlwZSAmJiB0aGlzLnJlbmRlclNwcml0ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTcHJpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBib21icyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5pbXBvcnQgZ2V0Q29sbGlkZXJzIGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5jbGFzcyBCb21iQWN0b3IgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxLjU7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZHJvcCgpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHRoaXMucmVuZGVyRXhwbG9zaW9uKCksIDQwMDAgKTsgLy8gNCBzZWNvbmRzIGFmdGVyXG5cbiAgICAgICAgU3RvcmUuZ2V0KCAndGVhcnMnICkucHVzaCggdGhpcyApO1xuICAgIH1cblxuICAgIHJlbmRlckV4cGxvc2lvbigpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLndpZHRoID0gNTA7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNTA7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGJvbWJOYW1lID0gMSA9PT0gdGhpcy5xdWFudGl0eSA/ICdkZWZhdWx0JyA6ICdkb3VibGUnO1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IGJvbWJzW2JvbWJOYW1lXS5wb3NpdGlvbiB8fCBbMCwgMCwgXTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyggdGhpcy54LCB0aGlzLnkgKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb21iIGV4dGVuZHMgQ29sbGVjdGlibGVcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMC4yID4gTWF0aC5yYW5kb20oKSA/IDIgOiAxO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBib21iTmFtZSA9IDEgPT09IHRoaXMucXVhbnRpdHkgPyAnZGVmYXVsdCcgOiAnZG91YmxlJztcbiAgICAgICAgY29uc3QgWyB4LCB5IF0gPSBib21ic1tib21iTmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cblxuICAgIHRvSXRlbSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2JvbWInLFxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHksXG4gICAgICAgICAgICBpc0Ryb3BwYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0b0Ryb3BwYWJsZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gQm9tYkFjdG9yOyAvLyByZXR1cm4gdGhlIGNsYXNzIHNvIHRoZSB3ZWFyZXIgY2FuIGRvIG5ldyBvbiBpdC5cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsSHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX29yaWdpbmFsSHA7XG4gICAgICAgICAgICBpZiAoIHRoaXMucmVzcGF3biApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aWJsZSBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ3RvSXRlbSgpIG11c3QgYmUgaW1wbGVtZW50ZWQnICk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5XG57XG4gICAgY29uc3RydWN0b3IoIHsgY29sbGVjdGlvbj1bXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyPWZhbHNlLCBzaG91bGRVcGRhdGVBZnRlclJlbmRlcj1mYWxzZSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHVzaCggLi4uY29sbGVjdGlvbiApO1xuXG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciA9IHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgPSBzaG91bGRVcGRhdGVBZnRlclJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gMCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCBpdGVtIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleE9mKCBpdGVtICk7XG5cbiAgICAgICAgaWYgKCAtMSA8IGluZGV4IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG5ld1RoaXMgPSBbXTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIGl0ZW0udXBkYXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGZhbHNlID09PSBpdGVtLmFjdGl2ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLnJlbmRlckRlc3Ryb3kgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5kZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5ld1RoaXMucHVzaCggaXRlbSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBuZXdUaGlzLmxlbmd0aCAhPT0gbGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGxlbiAtIDEgKTtcblxuICAgICAgICAgICAgZm9yICggbGV0IGogPSAwLCBsZW5qID0gbmV3VGhpcy5sZW5ndGg7IGogPCBsZW5qOyBqKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNbal0gPSBuZXdUaGlzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIGhwIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDwgdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgMjU2O1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZpcmUgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZSBleHRlbmRzIERlc3RydWN0aWJsZVN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBmaXJlLndpZHRoLCBoZWlnaHQ6IGZpcmUuaGVpZ2h0LCBocDogMywgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmaXJlLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gZmlyZS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBpZiAoIDAgPT09IHRoaXMuaHAgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNldEltYWdlKCBmaXJlLnNwcml0ZSApO1xuICAgICAgICAgICAgc3VwZXIucmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBTdG9yZS5nZXQoICd0ZWFycycgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuICAgICAgICB0aGlzLmNvbGxpZGluZ1dpZHRoID0gdGhpcy53aWR0aCAtIDI7XG4gICAgICAgIHRoaXMuY29sbGlkaW5nSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSAxMDtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdtb25zdGVycycgKSApO1xuXG4gICAgICAgICAgICBpZiAoICFlbmVteSAmJiAhaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RG1nID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcblxuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHBpY2t1cEl0ZW1zKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3RpYmxlID0gaXNDb2xsaWRpbmcoIHRoaXMsIGl0ZW1zICk7XG5cbiAgICAgICAgaWYgKCAhY29sbGVjdGlibGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoIGNvbGxlY3RpYmxlICk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb2xsZWN0aWJsZS50b0l0ZW0oKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoIGl0ZW0udHlwZSApIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmICggaXRlbS5pc0Ryb3BwYWJsZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zLnB1c2goIGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVySXRlbXMuc2V0KCBpdGVtLnR5cGUsIGV4aXN0aW5nSXRlbSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCB0aW1lLCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuXG4gICAgICAgIGlmICggMCA9PT0gZGVwbGFjZW1lbnQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIDAgPT09IGtleXNEb3duLnNpemUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB4ID0gdGhpcy54O1xuICAgICAgICAgICAgY29uc3QgeSA9IHRoaXMueTtcbiAgICAgICAgICAgIGNvbnN0IFtCb21iLCAuLi5ib21ic10gPSBleGlzdGluZ0l0ZW0uaXRlbXM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0uaXRlbXMgPSBib21icztcbiAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5xdWFudGl0eSAtPSAxO1xuXG4gICAgICAgICAgICBjb25zdCBib21iID0gbmV3IEJvbWIoIHsgeCwgeSwgfSApO1xuICAgICAgICAgICAgYm9tYi5kcm9wKCk7XG5cbiAgICAgICAgICAgIHBsYXllckl0ZW1zLnNldCggJ2JvbWInLCBleGlzdGluZ0l0ZW0gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob290KClcbiAgICB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgODtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoIHRoaXMuX2RpcmVjdGlvbi55IClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSAtIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3ggKyAxNTtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90ZWFycy5wdXNoKCBuZXcgVGVhcihcbiAgICAgICAge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuX2RpcmVjdGlvbixcbiAgICAgICAgICAgIGNyZWF0b3I6IHRoaXMsXG4gICAgICAgICAgICBkYW1hZ2VzOiB0aGlzLmRhbWFnZXMsXG4gICAgICAgIH0gKSApO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBpc1Nob290aW5nID0gdGhpcy5faXNTaG9vdGluZztcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICBsZXQgaGVhZDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA8PSB0aGlzLl9hdHRhY2tTcGVlZCAvIDIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYWQgPSBpc2FhYy5oZWFkLnNob290aW5nRGlyZWN0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYWQgPSBpc2FhYy5oZWFkLmRpcmVjdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBpc1Nob290aW5nIHx8ICggIWlzU2hvb3RpbmcgJiYgIXggKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbi55IClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICBbIHgsIHkgXSA9IGhlYWQudXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmRvd247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGVhZ3NcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCApO1xuICAgICAgICAvLyBoZWFkXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5feCwgdGhpcy5feSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IG5vdyAtIHRoaXMuX3RoZW47XG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoIGRlbHRhIC8gMTAwMCwgbm93ICk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgcm9ja3MgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiA1MCwgaGVpZ2h0OiA1MSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiByb2Nrcy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9pc1NwZWNpYWwgPSAwLjA1ID4gTWF0aC5yYW5kb20oKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgWyB4LCB5IF0gPSB0aGlzLl9pc1NwZWNpYWwgPyByb2Nrcy5zcGVjaWFsLnBvc2l0aW9uIDogcm9ja3MuZGVmYXVsdC5wb3NpdGlvbjtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgcm9ja3Mud2lkdGgsIHJvY2tzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5pbXBvcnQgeyBkZWZhdWx0Um9vbSB9IGZyb20gJ2ltYWdlcy9yb29tcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20gZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IGltYWdlLCB9ID0geyBpbWFnZTogeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IGRlZmF1bHRSb29tLCB9LCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiA4MDAsIGhlaWdodDogNDgwLCBpbWFnZSwgfSApO1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZGVmYXVsdFRlYXIgfSBmcm9tICdpbWFnZXMvdGVhcnMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCB9IGZyb20gJ2xheWVycyc7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlYXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCBkaXJlY3Rpb24sIHNwZWVkLCBjcmVhdG9yLCBkYW1hZ2VzIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGg6IDEzLCBoZWlnaHQ6IDEzLCBpbWFnZTogeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IGRlZmF1bHRUZWFyLCB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgNDtcbiAgICAgICAgdGhpcy5fY3JlYXRvciA9IGNyZWF0b3I7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IGRhbWFnZXM7XG5cbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSBkaXJlY3Rpb24ueCAqIHRoaXMuX3NwZWVkO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IGRpcmVjdGlvbi55ICogdGhpcy5fc3BlZWQ7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgaWYgKCBMSU1JVF9MRUZUIC0gdGhpcy53aWR0aCA+IHRoaXMuX3ggfHwgdGhpcy5feCA+IExJTUlUX1JJR0hUICsgdGhpcy53aWR0aCB8fFxuICAgICAgICAgICAgTElNSVRfVE9QIC0gdGhpcy5oZWlnaHQgPiB0aGlzLl95IHx8IHRoaXMuX3kgPiBMSU1JVF9CT1RUT00gKyB0aGlzLmhlaWdodCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKCBpdGVtID0+IGl0ZW0gIT09IHRoaXMuX2NyZWF0b3IgKSApO1xuICAgICAgICBpZiAoIGNvbGxpZGVyIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCAnbnVtYmVyJyA9PT0gdHlwZW9mIGNvbGxpZGVyLmhwIClcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLmhwIC09IHRoaXMuZGFtYWdlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1BfSVNBQUMgPSA0MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT01fSVNBQUMgPSBjYW52YXMuaGVpZ2h0IC0gOTU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVF9JU0FBQyA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUX0lTQUFDID0gY2FudmFzLndpZHRoIC0gODU7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1AgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT00gPSBjYW52YXMuaGVpZ2h0IC0gNjU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDYwO1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gNzU7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG5leHBvcnQgY29uc3QgS0VZX1NQQUNFID0gMzI7XG5leHBvcnQgY29uc3QgS0VZX1cgPSA4NztcbmV4cG9ydCBjb25zdCBLRVlfQSA9IDY1O1xuZXhwb3J0IGNvbnN0IEtFWV9TID0gODM7XG5leHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbiIsImV4cG9ydCBjb25zdCBoZWFydHMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9oZWFydHNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZW1wdHk6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsxNiwgMCwgXSxcbiAgICB9LFxuICAgIHNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMTYsIF0sXG4gICAgfSxcbiAgICBoYWxmc3Bpcml0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsxNiwgMTYsIF0sXG4gICAgfSxcbiAgICBldmlsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMTYsIF0sXG4gICAgfSxcbiAgICBoYWxmZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbNDgsIDE2LCBdLFxuICAgIH0sXG4gICAgcmVpbmZvcmNlZDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbNDgsIDAsIF0sXG4gICAgfSxcbiAgICBoYWxmcmVpbmZvcmNlZDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbNjQsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2JvbWJzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaGVhcnRzLFxuICAgIGJvbWJzLFxufTtcbiIsImV4cG9ydCBjb25zdCBpc2FhYyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2lzYWFjX3Nwcml0ZV9jdXN0b20ucG5nJyxcbiAgICBoZWFkOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDI4LFxuICAgICAgICBoZWlnaHQ6IDI1LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA0LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNiwgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAyLCAwLCBdLFxuICAgICAgICB9LFxuICAgICAgICBzaG9vdGluZ0RpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFsyOCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA1LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNywgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAzLCAwLCBdLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDI1LCBdLFxuICAgICAgICAgICAgdXA6IFsxOCAqIDUsIDI1LCBdLFxuICAgICAgICAgICAgbGVmdDogWzAsIDI1LCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFswLCAyNSwgXSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBpc2FhYyxcbn07XG4iLCJleHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9ib21ic19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgZG91YmxlOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3Qgcm9ja3MgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9yb2Nrc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMTcwLFxuICAgIGhlaWdodDogMTcyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgc3BlY2lhbDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzE3MCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZpcmUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9maXJlX3Nwcml0ZS5wbmcnLFxuICAgIGRlYWQ6ICdidWlsZC9pbWcvZmlyZV9kZWFkLnBuZycsXG4gICAgd2lkdGg6IDMxLFxuICAgIGhlaWdodDogMzQsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICByb2NrcyxcbiAgICBmaXJlLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0Um9vbSA9ICdidWlsZC9pbWcvcm9vbS5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRSb29tLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0VGVhciA9ICdidWlsZC9pbWcvdGVhci5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUZWFyLFxufTtcbiIsImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IFJvb20gZnJvbSAnY29tcG9uZW50cy9yb29tJztcbmltcG9ydCBIVUQgZnJvbSAnY29tcG9uZW50cy9IVUQnO1xuaW1wb3J0IFJvY2sgZnJvbSAnY29tcG9uZW50cy9yb2NrJztcbmltcG9ydCBGaXJlIGZyb20gJ2NvbXBvbmVudHMvZmlyZSc7XG5pbXBvcnQgQm9tYiBmcm9tICdjb21wb25lbnRzL2JvbWInO1xuaW1wb3J0IElzYWFjIGZyb20gJ2NvbXBvbmVudHMvaXNhYWMnO1xuXG5TdG9yZS5zZXQoICdyb29tJywgbmV3IFJvb20oKSApO1xuU3RvcmUuc2V0KCAnSFVEJywgbmV3IEhVRCgpICk7XG5cblN0b3JlLnNldCggJ3RlYXJzJywgbmV3IENvbGxlY3Rpb24oIHsgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnb2JzdGFjbGVzJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgUm9jayggeyB4OiA0NTAsIHk6IDEyMCwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDY1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDExNiwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTY1LCB5OiAxMTYsIH0gKSxcbl0sIHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjogdHJ1ZSwgfSApICk7XG5cblN0b3JlLnNldCggJ2l0ZW1zJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgQm9tYiggeyB4OiA4MiwgeTogMzU2LCB9ICksXG5dLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBGaXJlKCB7IHg6IDcwMywgeTogNjUsIH0gKSxcbl0sIHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjogdHJ1ZSwgfSApICk7XG5cblN0b3JlLnNldCggJ3BsYXllcicsIG5ldyBJc2FhYygpICk7XG5TdG9yZS5zZXQoICdwbGF5ZXJJdGVtcycsIG5ldyBNYXAoKSApO1xuXG5cbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdyb29tJyApLFxuICAgIFN0b3JlLmdldCggJ0hVRCcgKSxcbl0sIH0gKTtcblxuZXhwb3J0IGNvbnN0IGZvcmVncm91bmQgPSBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSxcbiAgICBTdG9yZS5nZXQoICdtb25zdGVycycgKSxcbiAgICBTdG9yZS5nZXQoICdpdGVtcycgKSxcbiAgICBTdG9yZS5nZXQoICd0ZWFycycgKSxcbiAgICBTdG9yZS5nZXQoICdwbGF5ZXInICksXG5dLCB9ICk7XG5cblxud2luZG93LlN0b3JlID0gU3RvcmU7XG53aW5kb3cuUGxheWVyID0gU3RvcmUuZ2V0KCAncGxheWVyJyApO1xud2luZG93Lml0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4vL1xuLy8gZXhwb3J0IGNvbnN0IG9ic3RhY2xlcyA9IGZvcmVncm91bmRbMF07XG4vLyBleHBvcnQgY29uc3QgbW9uc3RlcnMgPSBmb3JlZ3JvdW5kWzFdO1xuLy8gZXhwb3J0IGNvbnN0IHBsYXllciA9IGZvcmVncm91bmRbMl07XG4iLCJjb25zdCBTdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNvbnN0IGdldENvbGxpZGVycyA9ICggdGFyZ2V0LCBvdGhlciApID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAoIHRhcmdldCA9PT0gb3RoZXIgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHggPSB0YXJnZXQueDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldC5jb2xsaWRpbmdXaWR0aCB8fCB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5jb2xsaWRpbmdIZWlnaHQgfHwgdGFyZ2V0LmhlaWdodDtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggb3RoZXIgKSB8fCBvdGhlciBpbnN0YW5jZW9mIENvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXJzID0gW107XG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgbGVuID0gb3RoZXIubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBfY29sbGlkZXJzID0gZ2V0Q29sbGlkZXJzKCB0YXJnZXQsIG90aGVyW2ldICk7XG5cbiAgICAgICAgICAgIGlmICggX2NvbGxpZGVycyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLnB1c2guYXBwbHkoIGNvbGxpZGVycywgX2NvbGxpZGVycyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpZGVycy5sZW5ndGggPyBjb2xsaWRlcnMgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIuY29sbGlkaW5nV2lkdGggfHwgb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5jb2xsaWRpbmdIZWlnaHQgfHwgb3RoZXIuaGVpZ2h0O1xuXG4gICAgY29uc3QgdG9wID0geSArIGhlaWdodCA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCA8PSBfeSArIF9oZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHggKyB3aWR0aCA+PSBfeDtcblxuICAgIGlmICggbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wIClcbiAgICB7XG4gICAgICAgIHJldHVybiBbb3RoZXIsIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQ29sbGlkaW5nID0gKCB0YXJnZXQsIG90aGVyICkgPT5cbntcbiAgICAvLyBpZ25vcmUgY29sbGlzaW9uIHdpdGggc2VsZlxuICAgIGlmICggdGFyZ2V0ID09PSBvdGhlciApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBvdGhlciApIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbiApXG4gICAge1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGFyZ2V0LCBvdGhlcltpXSApO1xuICAgICAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKCBsZWZ0ICYmIHJpZ2h0ICYmIGJvdHRvbSAmJiB0b3AgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG4iXX0=
