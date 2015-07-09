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

var _utilsStringRepeat = require('utils/string/repeat');

var _utilsStringRepeat2 = _interopRequireDefault(_utilsStringRepeat);

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

},{"canvas":2,"images/HUD":18,"store":25,"utils/string/repeat":27}],4:[function(require,module,exports){
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

var _canvas = require('canvas');

var _imagesItems = require('images/items');

var Bomb = (function (_Collectible) {
    function Bomb(_ref) {
        var x = _ref.x;
        var y = _ref.y;

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

            var _ref2 = _imagesItems.bombs[bombName].position || [0, 0];

            var _ref22 = _slicedToArray(_ref2, 2);

            var x = _ref22[0];
            var y = _ref22[1];

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }, {
        key: 'toItem',
        value: function toItem() {
            return {
                type: 'bomb',
                quantity: this.quantity
            };
        }
    }]);

    return Bomb;
})(_componentsCollectible2['default']);

exports['default'] = Bomb;
module.exports = exports['default'];

},{"canvas":2,"components/collectible":7,"images/items":20}],6:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _canvas = require('canvas');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _componentsCharacter = require('components/character');

var _componentsCharacter2 = _interopRequireDefault(_componentsCharacter);

var _componentsTear = require('components/tear');

var _componentsTear2 = _interopRequireDefault(_componentsTear);

var _utilsPhysicsIsColliding = require('utils/physics/is-colliding');

var _utilsPhysicsIsColliding2 = _interopRequireDefault(_utilsPhysicsIsColliding);

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
            var collectible = (0, _utilsPhysicsIsColliding2['default'])(this, items);

            if (!collectible) {
                return;
            }

            items.remove(collectible);
            var item = collectible.toItem();
            var existingItem = playerItems.get(item.type) || { quantity: 0 };

            existingItem.quantity += item.quantity || 0;
            playerItems.set(item.type, existingItem);
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
                console.log('droppin the bomb!');
                // this.dropBomb();
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
                var enemy = (0, _utilsPhysicsIsColliding2['default'])(this, _store2['default'].get('monsters'));

                if (!enemy && !(0, _utilsPhysicsIsColliding2['default'])(this, _store2['default'].get('obstacles'))) {
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

                var enemy = (0, _utilsPhysicsIsColliding2['default'])(this, _store2['default'].get('monsters'));

                if (!enemy && !(0, _utilsPhysicsIsColliding2['default'])(this, _store2['default'].get('obstacles'))) {
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

},{"../constants":17,"canvas":2,"components/character":6,"components/tear":16,"images/characters":19,"store":25,"utils/physics/is-colliding":26}],13:[function(require,module,exports){
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

var _utilsPhysicsIsColliding = require('utils/physics/is-colliding');

var _utilsPhysicsIsColliding2 = _interopRequireDefault(_utilsPhysicsIsColliding);

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

            var collider = (0, _utilsPhysicsIsColliding2['default'])(this, _layers.foreground.filter(function (item) {
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

},{"../constants":17,"components/dynamic-actor":10,"images/tears":23,"layers":24,"utils/physics/is-colliding":26}],17:[function(require,module,exports){
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

exports['default'] = isColliding;
module.exports = exports['default'];

},{"components/collection":8}],27:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3RpYmxlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9keW5hbWljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZmlyZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2lzYWFjLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvcm9jay5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9zdGF0aWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvSFVELmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9jaGFyYWN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9pdGVtcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvb2JzdGFjbGVzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9yb29tcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvdGVhcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvbGF5ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3N0b3JlLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzL3BoeXNpY3MvaXMtY29sbGlkaW5nLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3V0aWxzL3N0cmluZy9yZXBlYXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztzQkNBbUMsUUFBUTs7c0JBQ0os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UUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUM7QUFDL0IsUUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLE1BQU0sSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO0FBQzFDLFFBQU0sSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDOztBQUU3QixRQUFLLElBQUksSUFBSSxLQUFLLElBQUksTUFBTSxJQUFJLEdBQUcsRUFDbkM7QUFDSSxlQUFPLEtBQUssQ0FBQztLQUNoQjs7QUFFRCxXQUFPLEtBQUssQ0FBQztDQUNoQixDQUFDOztxQkFFYSxXQUFXOzs7Ozs7Ozs7O3FCQy9DWCxVQUFFLEdBQUcsRUFBRSxLQUFLLEVBQzNCO0FBQ0ksUUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsV0FBUSxLQUFLLEVBQUUsRUFDZjtBQUNJLFlBQUksSUFBSSxHQUFHLENBQUM7S0FDZjtBQUNELFdBQU8sSUFBSSxDQUFDO0NBQ2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZvcmVncm91bmQsIGJhY2tncm91bmQgfSBmcm9tICdsYXllcnMnO1xuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBiYWNrZ3JvdW5kLnJlbmRlcigpO1xuICAgIGZvcmVncm91bmQucmVuZGVyKCk7XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBoZWFydHMsIGJvbWJzIH0gZnJvbSAnaW1hZ2VzL0hVRCc7XG5pbXBvcnQgcmVwZWF0IGZyb20gJ3V0aWxzL3N0cmluZy9yZXBlYXQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVURcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXTtcblxuICAgICAgICBjb25zdCBlbGVtZW50cyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYXJ0cyxcbiAgICAgICAgICAgIGJvbWJzLFxuICAgICAgICB9O1xuICAgICAgICBPYmplY3Qua2V5cyggZWxlbWVudHMgKS5mb3JFYWNoKCBwcm9wID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBlbGVtZW50c1twcm9wXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW3Byb3BdID0gZWxlbWVudC5zcHJpdGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGltYWdlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IEltYWdlKCksXG4gICAgICAgICAgICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlc1twcm9wXSA9IGltYWdlO1xuXG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5vbmxvYWQgPSAoKSA9PiBpbWFnZS5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5zcmMgPSBlbGVtZW50LnNwcml0ZTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmhlYXJ0cy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGVhcnRzLndpZHRoICogMS41O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaGVhcnRzLmhlaWdodCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gMTA7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWSA9IDEwO1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxIcCA9IFN0b3JlLmdldCggJ3BsYXllcicgKS5ocDtcblxuICAgICAgICAgICAgbGV0IGhwID0gb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGxldCB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICBsZXQgeSA9IGluaXRpYWxZO1xuXG4gICAgICAgICAgICBsZXQgX2hwID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKCBfaHAgPCBocCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoIF9ocCArIDAuNSA9PT0gaHAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuaGFsZmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoO1xuICAgICAgICAgICAgICAgIF9ocCArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKCA3IDwgX2hwICYmIDggPj0gX2hwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuYm9tYnMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGJvbWJzLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gYm9tYnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA1O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFkgPSA1NTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvbWJzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAnYm9tYicgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQm9tYnMgPyBwbGF5ZXJCb21icy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuYm9tYnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGJvbWJzLndpZHRoLCBib21icy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTVweCBIZWx2ZXRpY2EnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYHggJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoLCBpbml0aWFsWSArIDYgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2UgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5feCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3kgPSBudWxsO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbWFnZSggaW1hZ2UsIHR5cGU9J2ltYWdlJyApXG4gICAge1xuICAgICAgICBpZiAoICdjYW52YXMnID09PSB0eXBlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBpbWFnZSAhPT0gdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgY2VudGVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCggdGhpcy5feCApO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCggdGhpcy5feSApO1xuICAgICAgICAvLyBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCggdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggJ2ltYWdlJyA9PT0gdGhpcy5pbWFnZS50eXBlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoICdzcHJpdGUnID09PSB0aGlzLmltYWdlLnR5cGUgJiYgdGhpcy5yZW5kZXJTcHJpdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3ByaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlibGUgZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aWJsZSc7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgYm9tYnMgfSBmcm9tICdpbWFnZXMvaXRlbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb21iIGV4dGVuZHMgQ29sbGVjdGlibGVcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMC4yID4gTWF0aC5yYW5kb20oKSA/IDIgOiAxO1xuICAgIH07XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgYm9tYk5hbWUgPSAxID09PSB0aGlzLnF1YW50aXR5ID8gJ2RlZmF1bHQnIDogJ2RvdWJsZSc7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gYm9tYnNbYm9tYk5hbWVdLnBvc2l0aW9uIHx8IFswLCAwLCBdO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdib21iJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBuYW1lLCBocCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxIcCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlICk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdGhpcy5fb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZXNwYXduIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RpYmxlIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAndG9JdGVtKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCcgKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgQXJyYXlcbntcbiAgICBjb25zdHJ1Y3RvciggeyBjb2xsZWN0aW9uPVtdLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI9ZmFsc2UsIHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyPWZhbHNlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wdXNoKCAuLi5jb2xsZWN0aW9uICk7XG5cbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyID0gc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyO1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciA9IHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiAwID09PSB0aGlzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gKVxuICAgIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4T2YoIGl0ZW0gKTtcblxuICAgICAgICBpZiAoIC0xIDwgaW5kZXggKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV3VGhpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmICggaXRlbS51cGRhdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggZmFsc2UgPT09IGl0ZW0uYWN0aXZlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ucmVuZGVyRGVzdHJveSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3VGhpcy5wdXNoKCBpdGVtICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG5ld1RoaXMubGVuZ3RoICE9PSBsZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSggbGVuIC0gMSApO1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaiA9IDAsIGxlbmogPSBuZXdUaGlzLmxlbmd0aDsgaiA8IGxlbmo7IGorKyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpc1tqXSA9IG5ld1RoaXNbal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLl9zaG91bGRVcGRhdGVCZWZvcmVSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciAmJiAhdGhpcy5pc0VtcHR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlc3RydWN0aWJsZVN0YXRpY0FjdG9yIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgaHAgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZG1nSW50ZXJ2YWwgPSA1MDA7XG4gICAgICAgIHRoaXMuX2xhc3REbWcgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCAyNTY7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IERlc3RydWN0aWJsZVN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZGVzdHJ1Y3RpYmxlLXN0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZmlyZSB9IGZyb20gJ2ltYWdlcy9vYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlIGV4dGVuZHMgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGZpcmUud2lkdGgsIGhlaWdodDogZmlyZS5oZWlnaHQsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZpcmUuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmaXJlLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSAwLjU7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGlmICggMCA9PT0gdGhpcy5ocCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW1hZ2UoIGZpcmUuc3ByaXRlICk7XG4gICAgICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzLCBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnY29tcG9uZW50cy9jaGFyYWN0ZXInO1xuaW1wb3J0IFRlYXIgZnJvbSAnY29tcG9uZW50cy90ZWFyJztcbmltcG9ydCBpc0NvbGxpZGluZyBmcm9tICd1dGlscy9waHlzaWNzL2lzLWNvbGxpZGluZyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBTdG9yZS5nZXQoICd0ZWFycycgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuICAgICAgICB0aGlzLmNvbGxpZGluZ1dpZHRoID0gdGhpcy53aWR0aCAtIDI7XG4gICAgICAgIHRoaXMuY29sbGlkaW5nSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSAxMDtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdtb25zdGVycycgKSApO1xuXG4gICAgICAgICAgICBpZiAoICFlbmVteSAmJiAhaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RG1nID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcblxuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHBpY2t1cEl0ZW1zKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3RpYmxlID0gaXNDb2xsaWRpbmcoIHRoaXMsIGl0ZW1zICk7XG5cbiAgICAgICAgaWYgKCAhY29sbGVjdGlibGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoIGNvbGxlY3RpYmxlICk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb2xsZWN0aWJsZS50b0l0ZW0oKTtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtID0gcGxheWVySXRlbXMuZ2V0KCBpdGVtLnR5cGUgKSB8fCB7IHF1YW50aXR5OiAwLCB9O1xuXG4gICAgICAgIGV4aXN0aW5nSXRlbS5xdWFudGl0eSArPSBpdGVtLnF1YW50aXR5IHx8IDA7XG4gICAgICAgIHBsYXllckl0ZW1zLnNldCggaXRlbS50eXBlLCBleGlzdGluZ0l0ZW0gKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7IHg6IDAsIHk6IDEsIH07XG5cbiAgICAgICAgaWYgKCAwID09PSBkZXBsYWNlbWVudCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCA9PT0ga2V5c0Rvd24uc2l6ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgKSAvLyB2ZXJ0aWNhbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gZGVwbGFjZW1lbnQ7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueSA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUyApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgKSAvLyB2ZXJ0aWNhbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9BICkgJiZcbiAgICAgICAgICAgICEoIGtleXNEb3duLmhhcyggS0VZX1cgKSB8fCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSApIC8vIGhvcml6b250YWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9EICkgJiZcbiAgICAgICAgICAgICEoIGtleXNEb3duLmhhcyggS0VZX1cgKSB8fCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSApIC8vIGhvcml6b250YWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9EICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcblxuICAgICAgICB0aGlzLnVwZGF0ZVNob290aW5nRGlyZWN0aW9uKCBub3cgKTtcbiAgICB9XG5cblxuICAgIHVwZGF0ZVNob290aW5nRGlyZWN0aW9uKCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0ge307XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRE9XTiApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9MRUZUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAwICE9PSBkaXJlY3Rpb24ueCB8fCAwICE9PSBkaXJlY3Rpb24ueSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKCAoIGtleXNEb3duLmhhcyggS0VZX1VQICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9SSUdIVCApICkgJiYgKCAhdGhpcy5fbGFzdFNob290IHx8XG4gICAgICAgICAgICAoIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA+PSB0aGlzLl9hdHRhY2tTcGVlZCApICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBub3c7XG4gICAgICAgICAgICB0aGlzLnNob290KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1NQQUNFICkgJiZcbiAgICAgICAgICAgICggIXRoaXMuX2xhc3RCb21iIHx8IDUwMCA8PSBub3cgLSB0aGlzLl9sYXN0Qm9tYiApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdEJvbWIgPSBub3c7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggJ2Ryb3BwaW4gdGhlIGJvbWIhJyApO1xuICAgICAgICAgICAgLy8gdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIHNob290KClcbiAgICB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgODtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoIHRoaXMuX2RpcmVjdGlvbi55IClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSAtIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyA2O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3ggKyAxNTtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90ZWFycy5wdXNoKCBuZXcgVGVhcihcbiAgICAgICAge1xuICAgICAgICAgICAgeCxcbiAgICAgICAgICAgIHksXG4gICAgICAgICAgICBkaXJlY3Rpb246IHRoaXMuX2RpcmVjdGlvbixcbiAgICAgICAgICAgIGNyZWF0b3I6IHRoaXMsXG4gICAgICAgICAgICBkYW1hZ2VzOiB0aGlzLmRhbWFnZXMsXG4gICAgICAgIH0gKSApO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBpc1Nob290aW5nID0gdGhpcy5faXNTaG9vdGluZztcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICBsZXQgaGVhZDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmIG5vdyAtIHRoaXMuX2xhc3RTaG9vdCA8PSB0aGlzLl9hdHRhY2tTcGVlZCAvIDIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYWQgPSBpc2FhYy5oZWFkLnNob290aW5nRGlyZWN0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYWQgPSBpc2FhYy5oZWFkLmRpcmVjdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBpc1Nob290aW5nIHx8ICggIWlzU2hvb3RpbmcgJiYgIXggKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN3aXRjaCAoIGRpcmVjdGlvbi55IClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICBbIHgsIHkgXSA9IGhlYWQudXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmRvd247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGVhZ3NcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCApO1xuICAgICAgICAvLyBoZWFkXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5feCwgdGhpcy5feSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBkZWx0YSA9IG5vdyAtIHRoaXMuX3RoZW47XG4gICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgdGhpcy51cGRhdGUoIGRlbHRhIC8gMTAwMCwgbm93ICk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgcm9ja3MgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiA1MCwgaGVpZ2h0OiA1MSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiByb2Nrcy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9pc1NwZWNpYWwgPSAwLjA1ID4gTWF0aC5yYW5kb20oKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgWyB4LCB5IF0gPSB0aGlzLl9pc1NwZWNpYWwgPyByb2Nrcy5zcGVjaWFsLnBvc2l0aW9uIDogcm9ja3MuZGVmYXVsdC5wb3NpdGlvbjtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgcm9ja3Mud2lkdGgsIHJvY2tzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5pbXBvcnQgeyBkZWZhdWx0Um9vbSB9IGZyb20gJ2ltYWdlcy9yb29tcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20gZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IGltYWdlLCB9ID0geyBpbWFnZTogeyB0eXBlOiAnaW1hZ2UnLCBzcmM6IGRlZmF1bHRSb29tLCB9LCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiA4MDAsIGhlaWdodDogNDgwLCBpbWFnZSwgfSApO1xuICAgICAgICB0aGlzLl94ID0gMDtcbiAgICAgICAgdGhpcy5feSA9IDA7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGF0aWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgZGVmYXVsdFRlYXIgfSBmcm9tICdpbWFnZXMvdGVhcnMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCB9IGZyb20gJ2xheWVycyc7XG5pbXBvcnQgaXNDb2xsaWRpbmcgZnJvbSAndXRpbHMvcGh5c2ljcy9pcy1jb2xsaWRpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAxMywgaGVpZ2h0OiAxMywgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0VGVhciwgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuXG4gICAgfVxuXG4gICAgZ2V0IGluQm91bmRzKClcbiAgICB7XG4gICAgICAgIGlmICggTElNSVRfTEVGVCAtIHRoaXMud2lkdGggPiB0aGlzLl94IHx8IHRoaXMuX3ggPiBMSU1JVF9SSUdIVCArIHRoaXMud2lkdGggfHxcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuaGVpZ2h0ID4gdGhpcy5feSB8fCB0aGlzLl95ID4gTElNSVRfQk9UVE9NICsgdGhpcy5oZWlnaHQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xsaWRlciA9IGlzQ29sbGlkaW5nKCB0aGlzLCBmb3JlZ3JvdW5kLmZpbHRlciggaXRlbSA9PiBpdGVtICE9PSB0aGlzLl9jcmVhdG9yICkgKTtcbiAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocCApXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaWRlci5ocCAtPSB0aGlzLmRhbWFnZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMueFZlbG9jaXR5O1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5hY3RpdmUgJiYgdGhpcy5pbkJvdW5kcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMgfSBmcm9tICdjYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QX0lTQUFDID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NX0lTQUFDID0gY2FudmFzLmhlaWdodCAtIDk1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlRfSVNBQUMgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVF9JU0FBQyA9IGNhbnZhcy53aWR0aCAtIDg1O1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDY1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlQgPSA2MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVCA9IGNhbnZhcy53aWR0aCAtIDc1O1xuXG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCJleHBvcnQgY29uc3QgaGVhcnRzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaGVhcnRzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGVtcHR5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBoYWxmZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDAsIF0sXG4gICAgfSxcbiAgICBzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZnNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDE2LCBdLFxuICAgIH0sXG4gICAgZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZmV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAxNiwgXSxcbiAgICB9LFxuICAgIHJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZnJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzY0LCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9ib21ic19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGhlYXJ0cyxcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3QgaXNhYWMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9pc2FhY19zcHJpdGVfY3VzdG9tLnBuZycsXG4gICAgaGVhZDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAyOCxcbiAgICAgICAgaGVpZ2h0OiAyNSxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDAsIF0sXG4gICAgICAgICAgICB1cDogWzI4ICogNCwgMCwgXSxcbiAgICAgICAgICAgIGxlZnQ6IFsyOCAqIDYsIDAsIF0sXG4gICAgICAgICAgICByaWdodDogWzI4ICogMiwgMCwgXSxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvb3RpbmdEaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMjgsIDAsIF0sXG4gICAgICAgICAgICB1cDogWzI4ICogNSwgMCwgXSxcbiAgICAgICAgICAgIGxlZnQ6IFsyOCAqIDcsIDAsIF0sXG4gICAgICAgICAgICByaWdodDogWzI4ICogMywgMCwgXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGxlZ3M6XG4gICAge1xuICAgICAgICB3aWR0aDogMTgsXG4gICAgICAgIGhlaWdodDogMTQsXG4gICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFswLCAyNSwgXSxcbiAgICAgICAgICAgIHVwOiBbMTggKiA1LCAyNSwgXSxcbiAgICAgICAgICAgIGxlZnQ6IFswLCAyNSwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMCwgMjUsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaXNhYWMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvYm9tYnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxuICAgIGRvdWJsZTpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgYm9tYnMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE3MCxcbiAgICBoZWlnaHQ6IDE3MixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxuICAgIHNwZWNpYWw6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFsxNzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBmaXJlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZmlyZV9zcHJpdGUucG5nJyxcbiAgICBkZWFkOiAnYnVpbGQvaW1nL2ZpcmVfZGVhZC5wbmcnLFxuICAgIHdpZHRoOiAzMSxcbiAgICBoZWlnaHQ6IDM0LFxuICAgIHN0YXRlczogNixcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgcm9ja3MsXG4gICAgZmlyZSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFRlYXIgPSAnYnVpbGQvaW1nL3RlYXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0VGVhcixcbn07XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcbmltcG9ydCBSb29tIGZyb20gJ2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgSFVEIGZyb20gJ2NvbXBvbmVudHMvSFVEJztcbmltcG9ydCBSb2NrIGZyb20gJ2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICdjb21wb25lbnRzL2ZpcmUnO1xuaW1wb3J0IEJvbWIgZnJvbSAnY29tcG9uZW50cy9ib21iJztcbmltcG9ydCBJc2FhYyBmcm9tICdjb21wb25lbnRzL2lzYWFjJztcblxuU3RvcmUuc2V0KCAncm9vbScsIG5ldyBSb29tKCkgKTtcblN0b3JlLnNldCggJ0hVRCcsIG5ldyBIVUQoKSApO1xuXG5TdG9yZS5zZXQoICd0ZWFycycsIG5ldyBDb2xsZWN0aW9uKCB7IHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjogdHJ1ZSwgfSApICk7XG5cblN0b3JlLnNldCggJ29ic3RhY2xlcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IFJvY2soIHsgeDogNDUwLCB5OiAxMjAsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxMTUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTY1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDY1LCB5OiAxMTYsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxMTUsIHk6IDExNiwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogMTE2LCB9ICksXG5dLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdpdGVtcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEJvbWIoIHsgeDogODIsIHk6IDM1NiwgfSApLFxuXSwgfSApICk7XG5cblN0b3JlLnNldCggJ21vbnN0ZXJzJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgRmlyZSggeyB4OiA3MDMsIHk6IDY1LCB9ICksXG5dLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdwbGF5ZXInLCBuZXcgSXNhYWMoKSApO1xuU3RvcmUuc2V0KCAncGxheWVySXRlbXMnLCBuZXcgTWFwKCkgKTtcblxuXG5leHBvcnQgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgU3RvcmUuZ2V0KCAncm9vbScgKSxcbiAgICBTdG9yZS5nZXQoICdIVUQnICksXG5dLCB9ICk7XG5cbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICksXG4gICAgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICksXG4gICAgU3RvcmUuZ2V0KCAnaXRlbXMnICksXG4gICAgU3RvcmUuZ2V0KCAndGVhcnMnICksXG4gICAgU3RvcmUuZ2V0KCAncGxheWVyJyApLFxuXSwgfSApO1xuXG5cbndpbmRvdy5TdG9yZSA9IFN0b3JlO1xud2luZG93LlBsYXllciA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcbndpbmRvdy5pdGVtcyA9IFN0b3JlLmdldCggJ2l0ZW1zJyApO1xuLy9cbi8vIGV4cG9ydCBjb25zdCBvYnN0YWNsZXMgPSBmb3JlZ3JvdW5kWzBdO1xuLy8gZXhwb3J0IGNvbnN0IG1vbnN0ZXJzID0gZm9yZWdyb3VuZFsxXTtcbi8vIGV4cG9ydCBjb25zdCBwbGF5ZXIgPSBmb3JlZ3JvdW5kWzJdO1xuIiwiY29uc3QgU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlvbic7XG5cbmNvbnN0IGlzQ29sbGlkaW5nID0gKCB0YXJnZXQsIG90aGVyICkgPT5cbntcbiAgICAvLyBpZ25vcmUgY29sbGlzaW9uIHdpdGggc2VsZlxuICAgIGlmICggdGFyZ2V0ID09PSBvdGhlciApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBvdGhlciApIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbiApXG4gICAge1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGFyZ2V0LCBvdGhlcltpXSApO1xuICAgICAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKCBsZWZ0ICYmIHJpZ2h0ICYmIGJvdHRvbSAmJiB0b3AgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQ29sbGlkaW5nO1xuIiwiZXhwb3J0IGRlZmF1bHQgKCBzdHIsIHRpbWVzICkgPT5cbntcbiAgICBsZXQgX3N0ciA9ICcnO1xuICAgIHdoaWxlICggdGltZXMtLSApXG4gICAge1xuICAgICAgICBfc3RyICs9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIF9zdHI7XG59O1xuIl19
