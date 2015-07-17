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
            // ctx.fillStyle = 'red';
            // ctx.fillRect( this._x, this._y, this.width, this.height );

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
            var _this2 = this;

            setTimeout(function () {
                return _this2.active = false;
            }, 1000); // 4 seconds after
            this.width = 50;
            this.height = 50;
        }
    }, {
        key: 'renderSprite',
        value: function renderSprite() {
            var _bombs$default$position = _slicedToArray(_imagesItems.bombs['default'].position, 2);

            var x = _bombs$default$position[0];
            var y = _bombs$default$position[1];

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }]);

    return BombActor;
})(_componentsDynamicActor2['default']);

var Bomb = (function (_Collectible) {
    function Bomb(_ref2) {
        var x = _ref2.x;
        var y = _ref2.y;

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

            var _ref3 = _imagesItems.bombs[bombName].position || [0, 0];

            var _ref32 = _slicedToArray(_ref3, 2);

            var x = _ref32[0];
            var y = _ref32[1];

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
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var Collection = (function (_Array) {
    function Collection(_ref) {
        var _ref$collection = _ref.collection;
        var collection = _ref$collection === undefined ? [] : _ref$collection;
        var _ref$shouldUpdateBeforeRender = _ref.shouldUpdateBeforeRender;
        var shouldUpdateBeforeRender = _ref$shouldUpdateBeforeRender === undefined ? false : _ref$shouldUpdateBeforeRender;
        var _ref$shouldUpdateAfterRender = _ref.shouldUpdateAfterRender;
        var shouldUpdateAfterRender = _ref$shouldUpdateAfterRender === undefined ? false : _ref$shouldUpdateAfterRender;

        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this);
        this.push.apply(this, _toConsumableArray(collection));

        this._shouldUpdateBeforeRender = shouldUpdateBeforeRender;
        this._shouldUpdateAfterRender = shouldUpdateAfterRender;
    }

    _inherits(Collection, _Array);

    _createClass(Collection, [{
        key: 'remove',
        value: function remove(item) {
            var index = this.indexOf(item);

            if (-1 < index) {
                this.splice(index, 1);
            }
        }
    }, {
        key: 'update',
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

                    var layer = item.inactiveLayer;
                    if (layer) {
                        _store2['default'].get(layer).push(item);
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
        key: 'render',
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
        key: 'isEmpty',
        get: function get() {
            return 0 === this.length;
        }
    }]);

    return Collection;
})(Array);

exports['default'] = Collection;
module.exports = exports['default'];

},{"store":25}],9:[function(require,module,exports){
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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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
            var _ref2 = this.active ? _imagesObstacles.fireBase.position : _imagesObstacles.fireBase.deadPosition;

            var _ref22 = _slicedToArray(_ref2, 2);

            var woodX = _ref22[0];
            var woodY = _ref22[1];

            _canvas.ctx.drawImage(this._image, woodX, woodY, this.width, this.height, this._x, this._y + 17, this.width, this.height);

            if (!this.active) {
                this.damages = 0;
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
    }, {
        key: 'inactiveLayer',
        get: function get() {
            return 'backgroundObstacles';
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

            if (existingItem && existingItem.quantity) {
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
    width: 31,
    height: 34,
    states: 6
};

exports.fire = fire;
var fireBase = {
    sprite: 'build/img/deadfire_sprite.png',
    width: 32,
    height: 32,
    position: [0, 34],
    deadPosition: [32, 34]
};

exports.fireBase = fireBase;
exports['default'] = {
    rocks: rocks,
    fire: fire,
    fireBase: fireBase
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
_store2['default'].set('backgroundObstacles', new _componentsCollection2['default']({ collection: [] }));

_store2['default'].set('tears', new _componentsCollection2['default']({ shouldUpdateBeforeRender: true }));

_store2['default'].set('obstacles', new _componentsCollection2['default']({ collection: [new _componentsRock2['default']({ x: 450, y: 120 }), new _componentsRock2['default']({ x: 65, y: 65 }), new _componentsRock2['default']({ x: 115, y: 65 }), new _componentsRock2['default']({ x: 165, y: 65 }), new _componentsRock2['default']({ x: 65, y: 116 }), new _componentsRock2['default']({ x: 115, y: 116 }), new _componentsRock2['default']({ x: 165, y: 116 })], shouldUpdateBeforeRender: true }));

_store2['default'].set('items', new _componentsCollection2['default']({ collection: [new _componentsBomb2['default']({ x: 82, y: 356 })] }));

_store2['default'].set('monsters', new _componentsCollection2['default']({ collection: [new _componentsFire2['default']({ x: 703, y: 65 })], shouldUpdateBeforeRender: true }));

_store2['default'].set('player', new _componentsIsaac2['default']());
_store2['default'].set('playerItems', new Map());

var background = new _componentsCollection2['default']({ collection: [_store2['default'].get('room'), _store2['default'].get('backgroundObstacles'), _store2['default'].get('HUD')] });

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3RpYmxlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9keW5hbWljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZmlyZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2lzYWFjLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvcm9jay5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvSFVELmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9jaGFyYWN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9pdGVtcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvb2JzdGFjbGVzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9yb29tcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvdGVhcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvbGF5ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3N0b3JlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxRQUFROztzQkFDSixRQUFROztBQUUvQyxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLFlBSmlCLFVBQVUsQ0FJaEIsTUFB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ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGRpc3BsYXlDdHgsIGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgYmFja2dyb3VuZC5yZW5kZXIoKTtcbiAgICBmb3JlZ3JvdW5kLnJlbmRlcigpO1xuXG4gICAgZGlzcGxheUN0eC5kcmF3SW1hZ2UoIGNhbnZhcywgMCwgMCApOyAvLyBkcmF3IHNvbWV0aGluZyB2aXNpYmxlIG9ubHkgb25jZSBwZXIgZnJhbWUuXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG1haW4gKTtcbn07XG5cbm1haW4oKTtcbiIsImV4cG9ydCBjb25zdCBkaXNwbGF5Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhcHAnICk7XG5leHBvcnQgY29uc3QgZGlzcGxheUN0eCA9IGRpc3BsYXlDYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuXG5leHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbmNhbnZhcy53aWR0aCA9IGRpc3BsYXlDYW52YXMud2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUNhbnZhcy5oZWlnaHQ7XG5leHBvcnQgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IHsgaGVhcnRzLCBib21icyB9IGZyb20gJ2ltYWdlcy9IVUQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVURcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXTtcblxuICAgICAgICBjb25zdCBlbGVtZW50cyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYXJ0cyxcbiAgICAgICAgICAgIGJvbWJzLFxuICAgICAgICB9O1xuICAgICAgICBPYmplY3Qua2V5cyggZWxlbWVudHMgKS5mb3JFYWNoKCBwcm9wID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1twcm9wXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW3Byb3BdID0gZWxlbWVudC5zcHJpdGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGltYWdlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IEltYWdlKCksXG4gICAgICAgICAgICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlc1twcm9wXSA9IGltYWdlO1xuXG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5vbmxvYWQgPSAoKSA9PiBpbWFnZS5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5zcmMgPSBlbGVtZW50LnNwcml0ZTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmhlYXJ0cy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGVhcnRzLndpZHRoICogMS41O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaGVhcnRzLmhlaWdodCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gMTA7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWSA9IDEwO1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxIcCA9IFN0b3JlLmdldCggJ3BsYXllcicgKS5ocDtcblxuICAgICAgICAgICAgbGV0IGhwID0gb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGxldCB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICBsZXQgeSA9IGluaXRpYWxZO1xuXG4gICAgICAgICAgICBsZXQgX2hwID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKCBfaHAgPCBocCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoIF9ocCArIDAuNSA9PT0gaHAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuaGFsZmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoO1xuICAgICAgICAgICAgICAgIF9ocCArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKCA3IDwgX2hwICYmIDggPj0gX2hwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuYm9tYnMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGJvbWJzLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gYm9tYnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA1O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFkgPSA1NTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvbWJzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAnYm9tYicgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQm9tYnMgPyBwbGF5ZXJCb21icy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuYm9tYnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGJvbWJzLndpZHRoLCBib21icy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTVweCBIZWx2ZXRpY2EnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYHggJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoLCBpbml0aWFsWSArIDYgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeD1udWxsLCB5PW51bGwsIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlIHx8IG51bGw7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2UoIGltYWdlLCB0eXBlPSdpbWFnZScgKVxuICAgIHtcbiAgICAgICAgaWYgKCAnY2FudmFzJyA9PT0gdHlwZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggaW1hZ2UgIT09IHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGNlbnRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQoIHRoaXMuX3ggKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoIHRoaXMuX3kgKTtcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlICYmIHRoaXMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICdpbWFnZScgPT09IHRoaXMuaW1hZ2UudHlwZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCAnc3ByaXRlJyA9PT0gdGhpcy5pbWFnZS50eXBlICYmIHRoaXMucmVuZGVyU3ByaXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNwcml0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3RpYmxlIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlibGUnO1xuaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGJvbWJzIH0gZnJvbSAnaW1hZ2VzL2l0ZW1zJztcbmltcG9ydCBnZXRDb2xsaWRlcnMgZnJvbSAndXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5cbmNsYXNzIEJvbWJBY3RvciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogYm9tYnMud2lkdGgsIGhlaWdodDogYm9tYnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGJvbWJzLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDEuNTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkcm9wKClcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCggKCkgPT4gdGhpcy5yZW5kZXJFeHBsb3Npb24oKSwgNDAwMCApOyAvLyA0IHNlY29uZHMgYWZ0ZXJcblxuICAgICAgICBTdG9yZS5nZXQoICd0ZWFycycgKS5wdXNoKCB0aGlzICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRXhwbG9zaW9uKClcbiAgICB7XG4gICAgICAgIHNldFRpbWVvdXQoICgpID0+IHRoaXMuYWN0aXZlID0gZmFsc2UsIDEwMDAgKTsgLy8gNCBzZWNvbmRzIGFmdGVyXG4gICAgICAgIHRoaXMud2lkdGggPSA1MDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA1MDtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgWyB4LCB5IF0gPSBib21icy5kZWZhdWx0LnBvc2l0aW9uO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbWIgZXh0ZW5kcyBDb2xsZWN0aWJsZVxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogYm9tYnMud2lkdGgsIGhlaWdodDogYm9tYnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGJvbWJzLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAwLjIgPiBNYXRoLnJhbmRvbSgpID8gMiA6IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGJvbWJOYW1lID0gMSA9PT0gdGhpcy5xdWFudGl0eSA/ICdkZWZhdWx0JyA6ICdkb3VibGUnO1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IGJvbWJzW2JvbWJOYW1lXS5wb3NpdGlvbiB8fCBbMCwgMCwgXTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9tYicsXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgICAgIGlzRHJvcHBhYmxlOiB0cnVlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRvRHJvcHBhYmxlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBCb21iQWN0b3I7IC8vIHJldHVybiB0aGUgY2xhc3Mgc28gdGhlIHdlYXJlciBjYW4gZG8gbmV3IG9uIGl0LlxuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBuYW1lLCBocCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxIcCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlICk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdGhpcy5fb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZXNwYXduIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RpYmxlIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAndG9JdGVtKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCcgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgQXJyYXlcbntcbiAgICBjb25zdHJ1Y3RvciggeyBjb2xsZWN0aW9uPVtdLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI9ZmFsc2UsIHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyPWZhbHNlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wdXNoKCAuLi5jb2xsZWN0aW9uICk7XG5cbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyID0gc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyO1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciA9IHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiAwID09PSB0aGlzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gKVxuICAgIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4T2YoIGl0ZW0gKTtcblxuICAgICAgICBpZiAoIC0xIDwgaW5kZXggKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV3VGhpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmICggaXRlbS51cGRhdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggZmFsc2UgPT09IGl0ZW0uYWN0aXZlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ucmVuZGVyRGVzdHJveSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0uaW5hY3RpdmVMYXllcjtcbiAgICAgICAgICAgICAgICBpZiAoIGxheWVyIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN0b3JlLmdldCggbGF5ZXIgKS5wdXNoKCBpdGVtICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5ld1RoaXMucHVzaCggaXRlbSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBuZXdUaGlzLmxlbmd0aCAhPT0gbGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGxlbiAtIDEgKTtcblxuICAgICAgICAgICAgZm9yICggbGV0IGogPSAwLCBsZW5qID0gbmV3VGhpcy5sZW5ndGg7IGogPCBsZW5qOyBqKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNbal0gPSBuZXdUaGlzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIGhwIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDwgdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgMjU2O1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZpcmUsIGZpcmVCYXNlIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpcmUgZXh0ZW5kcyBEZXN0cnVjdGlibGVTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogZmlyZS53aWR0aCwgaGVpZ2h0OiBmaXJlLmhlaWdodCwgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogZmlyZS5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZpcmUuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDAuNTtcbiAgICB9XG5cbiAgICBnZXQgaW5hY3RpdmVMYXllcigpXG4gICAge1xuICAgICAgICByZXR1cm4gJ2JhY2tncm91bmRPYnN0YWNsZXMnO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBsZXQgWyB3b29kWCwgd29vZFkgXSA9IHRoaXMuYWN0aXZlID8gZmlyZUJhc2UucG9zaXRpb24gOiBmaXJlQmFzZS5kZWFkUG9zaXRpb247XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB3b29kWCwgd29vZFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95ICsgMTcsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5hY3RpdmUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZXMgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBTdG9yZS5nZXQoICd0ZWFycycgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuICAgICAgICB0aGlzLmNvbGxpZGluZ1dpZHRoID0gdGhpcy53aWR0aCAtIDI7XG4gICAgICAgIHRoaXMuY29sbGlkaW5nSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSAxMDtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdtb25zdGVycycgKSApO1xuXG4gICAgICAgICAgICBpZiAoICFlbmVteSAmJiAhaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RG1nID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcblxuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHBpY2t1cEl0ZW1zKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3RpYmxlID0gaXNDb2xsaWRpbmcoIHRoaXMsIGl0ZW1zICk7XG5cbiAgICAgICAgaWYgKCAhY29sbGVjdGlibGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoIGNvbGxlY3RpYmxlICk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb2xsZWN0aWJsZS50b0l0ZW0oKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoIGl0ZW0udHlwZSApIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmICggaXRlbS5pc0Ryb3BwYWJsZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zLnB1c2goIGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVySXRlbXMuc2V0KCBpdGVtLnR5cGUsIGV4aXN0aW5nSXRlbSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCB0aW1lLCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuXG4gICAgICAgIGlmICggMCA9PT0gZGVwbGFjZW1lbnQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIDAgPT09IGtleXNEb3duLnNpemUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0gJiYgZXhpc3RpbmdJdGVtLnF1YW50aXR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbQm9tYiwgLi4uYm9tYnNdID0gZXhpc3RpbmdJdGVtLml0ZW1zO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zID0gYm9tYnM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IG5ldyBCb21iKCB7IHgsIHksIH0gKTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoICdib21iJywgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMucHVzaCggbmV3IFRlYXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICBjcmVhdG9yOiB0aGlzLFxuICAgICAgICAgICAgZGFtYWdlczogdGhpcy5kYW1hZ2VzLFxuICAgICAgICB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmICF4ICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnVwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5kb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCAwLCAyNSwgMTgsIDE0LCB0aGlzLl94ICsgNSwgdGhpcy5feSArIDIwLCAxOCwgMTQgKTtcbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IHJvY2tzIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogNTAsIGhlaWdodDogNTEsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogcm9ja3Muc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gMC4wNSA+IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gdGhpcy5faXNTcGVjaWFsID8gcm9ja3Muc3BlY2lhbC5wb3NpdGlvbiA6IHJvY2tzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJvb20gfSBmcm9tICdpbWFnZXMvcm9vbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyBpbWFnZSwgfSA9IHsgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0Um9vbSwgfSwgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UsIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAxMywgaGVpZ2h0OiAxMywgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0VGVhciwgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICBpZiAoIExJTUlUX0xFRlQgLSB0aGlzLndpZHRoID4gdGhpcy5feCB8fCB0aGlzLl94ID4gTElNSVRfUklHSFQgKyB0aGlzLndpZHRoIHx8XG4gICAgICAgICAgICBMSU1JVF9UT1AgLSB0aGlzLmhlaWdodCA+IHRoaXMuX3kgfHwgdGhpcy5feSA+IExJTUlUX0JPVFRPTSArIHRoaXMuaGVpZ2h0IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGhpcywgZm9yZWdyb3VuZC5maWx0ZXIoIGl0ZW0gPT4gaXRlbSAhPT0gdGhpcy5fY3JlYXRvciApICk7XG4gICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICdudW1iZXInID09PSB0eXBlb2YgY29sbGlkZXIuaHAgKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuaHAgLT0gdGhpcy5kYW1hZ2VzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlICYmIHRoaXMuaW5Cb3VuZHM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUF9JU0FBQyA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTV9JU0FBQyA9IGNhbnZhcy5oZWlnaHQgLSA5NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUX0lTQUFDID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFRfSVNBQUMgPSBjYW52YXMud2lkdGggLSA4NTtcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSA2NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNjA7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA3NTtcblxuZXhwb3J0IGNvbnN0IEtFWV9VUCA9IDM4O1xuZXhwb3J0IGNvbnN0IEtFWV9ET1dOID0gNDA7XG5leHBvcnQgY29uc3QgS0VZX0xFRlQgPSAzNztcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCBLRVlfVyA9IDg3O1xuZXhwb3J0IGNvbnN0IEtFWV9BID0gNjU7XG5leHBvcnQgY29uc3QgS0VZX1MgPSA4MztcbmV4cG9ydCBjb25zdCBLRVlfRCA9IDY4O1xuIiwiZXhwb3J0IGNvbnN0IGhlYXJ0cyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2hlYXJ0c19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBlbXB0eTpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDAsIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZmRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAwLCBdLFxuICAgIH0sXG4gICAgc3Bpcml0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAxNiwgXSxcbiAgICB9LFxuICAgIGV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZldmlsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMTYsIF0sXG4gICAgfSxcbiAgICByZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZyZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs2NCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvYm9tYnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBoZWFydHMsXG4gICAgYm9tYnMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGlzYWFjID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaXNhYWNfc3ByaXRlX2N1c3RvbS5wbmcnLFxuICAgIGhlYWQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMjgsXG4gICAgICAgIGhlaWdodDogMjUsXG4gICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFswLCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDQsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA2LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDIsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzI4LCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDUsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA3LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDMsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBsZWdzOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE4LFxuICAgICAgICBoZWlnaHQ6IDE0LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMjUsIF0sXG4gICAgICAgICAgICB1cDogWzE4ICogNSwgMjUsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMCwgMjUsIF0sXG4gICAgICAgICAgICByaWdodDogWzAsIDI1LCBdLFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGlzYWFjLFxufTtcbiIsImV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2JvbWJzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBkb3VibGU6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGJvbWJzLFxufTtcbiIsImV4cG9ydCBjb25zdCByb2NrcyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL3JvY2tzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAxNzAsXG4gICAgaGVpZ2h0OiAxNzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBzcGVjaWFsOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMTcwLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZmlyZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2ZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMxLFxuICAgIGhlaWdodDogMzQsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuXG5leHBvcnQgY29uc3QgZmlyZUJhc2UgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9kZWFkZmlyZV9zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBwb3NpdGlvbjogWzAsIDM0LCBdLFxuICAgIGRlYWRQb3NpdGlvbjogWzMyLCAzNCwgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgcm9ja3MsXG4gICAgZmlyZSxcbiAgICBmaXJlQmFzZSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFRlYXIgPSAnYnVpbGQvaW1nL3RlYXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0VGVhcixcbn07XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcbmltcG9ydCBSb29tIGZyb20gJ2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgSFVEIGZyb20gJ2NvbXBvbmVudHMvSFVEJztcbmltcG9ydCBSb2NrIGZyb20gJ2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICdjb21wb25lbnRzL2ZpcmUnO1xuaW1wb3J0IEJvbWIgZnJvbSAnY29tcG9uZW50cy9ib21iJztcbmltcG9ydCBJc2FhYyBmcm9tICdjb21wb25lbnRzL2lzYWFjJztcblxuU3RvcmUuc2V0KCAncm9vbScsIG5ldyBSb29tKCkgKTtcblN0b3JlLnNldCggJ0hVRCcsIG5ldyBIVUQoKSApO1xuU3RvcmUuc2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246IFtdLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAndGVhcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBSb2NrKCB7IHg6IDQ1MCwgeTogMTIwLCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiAxMTYsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDExNiwgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBCb21iKCB7IHg6IDgyLCB5OiAzNTYsIH0gKSxcbl0sIH0gKSApO1xuXG5TdG9yZS5zZXQoICdtb25zdGVycycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEZpcmUoIHsgeDogNzAzLCB5OiA2NSwgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAncGxheWVyJywgbmV3IElzYWFjKCkgKTtcblN0b3JlLnNldCggJ3BsYXllckl0ZW1zJywgbmV3IE1hcCgpICk7XG5cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIFN0b3JlLmdldCggJ3Jvb20nICksXG4gICAgU3RvcmUuZ2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycgKSxcbiAgICBTdG9yZS5nZXQoICdIVUQnICksXG5dLCB9ICk7XG5cbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICksXG4gICAgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICksXG4gICAgU3RvcmUuZ2V0KCAnaXRlbXMnICksXG4gICAgU3RvcmUuZ2V0KCAndGVhcnMnICksXG4gICAgU3RvcmUuZ2V0KCAncGxheWVyJyApLFxuXSwgfSApO1xuXG5cbndpbmRvdy5TdG9yZSA9IFN0b3JlO1xud2luZG93LlBsYXllciA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcbndpbmRvdy5pdGVtcyA9IFN0b3JlLmdldCggJ2l0ZW1zJyApO1xuLy9cbi8vIGV4cG9ydCBjb25zdCBvYnN0YWNsZXMgPSBmb3JlZ3JvdW5kWzBdO1xuLy8gZXhwb3J0IGNvbnN0IG1vbnN0ZXJzID0gZm9yZWdyb3VuZFsxXTtcbi8vIGV4cG9ydCBjb25zdCBwbGF5ZXIgPSBmb3JlZ3JvdW5kWzJdO1xuIiwiY29uc3QgU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2xsaWRlcnMgPSAoIHRhcmdldCwgb3RoZXIgKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKCB0YXJnZXQgPT09IG90aGVyIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG90aGVyICkgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IFtdO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgX2NvbGxpZGVycyA9IGdldENvbGxpZGVycyggdGFyZ2V0LCBvdGhlcltpXSApO1xuXG4gICAgICAgICAgICBpZiAoIF9jb2xsaWRlcnMgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbGxpZGVycy5wdXNoLmFwcGx5KCBjb2xsaWRlcnMsIF9jb2xsaWRlcnMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsaWRlcnMubGVuZ3RoID8gY29sbGlkZXJzIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAoIGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcCApXG4gICAge1xuICAgICAgICByZXR1cm4gW290aGVyLCBdO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NvbGxpZGluZyA9ICggdGFyZ2V0LCBvdGhlciApID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAoIHRhcmdldCA9PT0gb3RoZXIgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHggPSB0YXJnZXQueDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldC5jb2xsaWRpbmdXaWR0aCB8fCB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5jb2xsaWRpbmdIZWlnaHQgfHwgdGFyZ2V0LmhlaWdodDtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggb3RoZXIgKSB8fCBvdGhlciBpbnN0YW5jZW9mIENvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRhcmdldCwgb3RoZXJbaV0gKTtcbiAgICAgICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaWRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIuY29sbGlkaW5nV2lkdGggfHwgb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5jb2xsaWRpbmdIZWlnaHQgfHwgb3RoZXIuaGVpZ2h0O1xuXG4gICAgY29uc3QgdG9wID0geSArIGhlaWdodCA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCA8PSBfeSArIF9oZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHggKyB3aWR0aCA+PSBfeDtcblxuICAgIGlmICggbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wIClcbiAgICB7XG4gICAgICAgIHJldHVybiBvdGhlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuIl19
