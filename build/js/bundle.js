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

},{"canvas":2,"layers":25}],2:[function(require,module,exports){
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
            bombs: _imagesHUD.bombs,
            keys: _imagesHUD.keys,
            coins: _imagesHUD.coins,
            hardMode: _imagesHUD.hardMode,
            noAchievement: _imagesHUD.noAchievement
        };

        Object.keys(elements).forEach(function (prop) {
            var sprite = elements[prop].sprite;

            _this.images[prop] = sprite;

            var image = {
                image: new Image(),
                ready: false
            };
            _this._images[prop] = image;

            image.image.onload = function () {
                return image.ready = true;
            };
            image.image.src = sprite;
        });
    }

    _createClass(HUD, [{
        key: 'render',
        value: function render() {

            if (this._images.hearts.ready) {
                var width = _imagesHUD.hearts.width * 1.5;
                var height = _imagesHUD.hearts.height * 1.5;
                var initialX = 10;
                var _initialY = 10;
                var originalHp = _store2['default'].get('player').hp;

                var hp = originalHp;
                var x = initialX;
                var y = _initialY;

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

            var initialY = 40;

            if (this._images.coins.ready) {
                initialY += 20;

                var width = _imagesHUD.coins.width;
                var height = _imagesHUD.coins.height;
                var initialX = 8;
                var playerCoins = _store2['default'].get('playerItems').get('coin');
                var count = playerCoins ? playerCoins.quantity : 0;

                var _coins$default$position = _slicedToArray(_imagesHUD.coins['default'].position, 2);

                var spriteX = _coins$default$position[0];
                var spriteY = _coins$default$position[1];

                _canvas.ctx.drawImage(this._images.coins.image, spriteX, spriteY, _imagesHUD.coins.width, _imagesHUD.coins.height, initialX, initialY, width, height);

                _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
                _canvas.ctx.font = '14px monospace';
                _canvas.ctx.textAlign = 'left';
                _canvas.ctx.textBaseline = 'top';
                _canvas.ctx.fillText('' + count, initialX + width + 3, initialY);
            }

            if (this._images.bombs.ready) {

                initialY += 20;

                var width = _imagesHUD.bombs.width;
                var height = _imagesHUD.bombs.height;
                var initialX = 8;
                var playerBombs = _store2['default'].get('playerItems').get('bomb');
                var count = playerBombs ? playerBombs.quantity : 0;

                var _bombs$default$position = _slicedToArray(_imagesHUD.bombs['default'].position, 2);

                var spriteX = _bombs$default$position[0];
                var spriteY = _bombs$default$position[1];

                _canvas.ctx.drawImage(this._images.bombs.image, spriteX, spriteY, _imagesHUD.bombs.width, _imagesHUD.bombs.height, initialX, initialY, width, height);

                _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
                _canvas.ctx.font = '14px monospace';
                _canvas.ctx.textAlign = 'left';
                _canvas.ctx.textBaseline = 'top';
                _canvas.ctx.fillText('' + count, initialX + width + 3, initialY);
            }

            if (this._images.keys.ready) {

                initialY += 20;

                var width = _imagesHUD.keys.width;
                var height = _imagesHUD.keys.height;
                var initialX = 8;
                var playerKeys = _store2['default'].get('playerItems').get('key');
                var count = playerKeys ? playerKeys.quantity : 0;

                var _keys$default$position = _slicedToArray(_imagesHUD.keys['default'].position, 2);

                var spriteX = _keys$default$position[0];
                var spriteY = _keys$default$position[1];

                _canvas.ctx.drawImage(this._images.keys.image, spriteX, spriteY, _imagesHUD.keys.width, _imagesHUD.keys.height, initialX, initialY, width, height);

                _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
                _canvas.ctx.font = '14px monospace';
                _canvas.ctx.textAlign = 'left';
                _canvas.ctx.textBaseline = 'top';
                _canvas.ctx.fillText('' + count, initialX + width + 3, initialY);
            }

            if (_store2['default'].get('hardMode') && this._images.hardMode.ready) {
                initialY += 20;

                var width = _imagesHUD.hardMode.width;
                var height = _imagesHUD.hardMode.height;
                var initialX = 8;

                var _hardMode$default$position = _slicedToArray(_imagesHUD.hardMode['default'].position, 2);

                var spriteX = _hardMode$default$position[0];
                var spriteY = _hardMode$default$position[1];

                _canvas.ctx.drawImage(this._images.hardMode.image, spriteX, spriteY, _imagesHUD.hardMode.width, _imagesHUD.hardMode.height, initialX, initialY, width, height);
            }

            if (_store2['default'].get('noAchievement') && this._images.noAchievement.ready) {
                initialY += 20;

                var width = _imagesHUD.noAchievement.width;
                var height = _imagesHUD.noAchievement.height;
                var initialX = 8;

                var _noAchievement$default$position = _slicedToArray(_imagesHUD.noAchievement['default'].position, 2);

                var spriteX = _noAchievement$default$position[0];
                var spriteY = _noAchievement$default$position[1];

                _canvas.ctx.drawImage(this._images.noAchievement.image, spriteX, spriteY, _imagesHUD.noAchievement.width, _imagesHUD.noAchievement.height, initialX, initialY, width, height);
            }
        }
    }]);

    return HUD;
})();

exports['default'] = HUD;
module.exports = exports['default'];

},{"canvas":2,"images/HUD":19,"store":26}],4:[function(require,module,exports){
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

            var type = arguments.length <= 1 || arguments[1] === undefined ? 'image' : arguments[1];

            if ('canvas' === type) {
                this.image = true;
                this._image = image;
            } else if (image !== this.image) {
                this.image = {
                    type: type,
                    src: image
                };
                this.ready = false;
                this._image = new Image();
                this._image.onload = function () {
                    return _this2.ready = true;
                };
                this._image.src = this.image.src;
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

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
    _inherits(BombActor, _DynamicActor);

    function BombActor(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, BombActor);

        _get(Object.getPrototypeOf(BombActor.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesItems.bombs.width, height: _imagesItems.bombs.height, image: {
                type: 'sprite',
                src: _imagesItems.bombs.sprite
            } });

        this.damages = 1.0;
        this.active = false;
        this.isExploding = false;
        this._interval = 60; // time between frames of explosion
        this._then = Date.now();
        this._state = 0;
    }

    _createClass(BombActor, [{
        key: 'drop',
        value: function drop() {
            this.active = true;
            setTimeout(this.renderExplosion.bind(this), 4000); // 4 seconds after

            _store2['default'].get('tears').push(this);
        }
    }, {
        key: 'renderExplosion',
        value: function renderExplosion() {
            this.width = _imagesItems.bombs.explosion.width;
            this.height = _imagesItems.bombs.explosion.height;
            this.setImage(_imagesItems.bombs.explosion.sprite, 'sprite');
            this.isExploding = true;

            // DESTROY ALL THE THINGS NOW
        }
    }, {
        key: 'renderSprite',
        value: function renderSprite() {
            var x = undefined,
                y = undefined;
            var _x = undefined,
                _y = undefined;
            var now = Date.now();

            if (this.isExploding) {
                x = this._state * this.width;
                y = 0;
                _x = this._x - _imagesItems.bombs.width;
                _y = this._y - _imagesItems.bombs.height * 2;

                if (now - this._then > this._interval) {
                    this._state += 1;
                    this._then = now;

                    if (this._state === _imagesItems.bombs.explosion.states) {
                        this.active = false;
                    }
                }
            } else if (!this.isExploding) {
                var _bombs$default$position = _slicedToArray(_imagesItems.bombs['default'].position, 2);

                x = _bombs$default$position[0];
                y = _bombs$default$position[1];
                _x = this._x;
                _y = this._y;
            }

            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, _x, _y, this.width, this.height);
        }
    }]);

    return BombActor;
})(_componentsDynamicActor2['default']);

var Bomb = (function (_Collectible) {
    _inherits(Bomb, _Collectible);

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

},{"canvas":2,"components/collectible":8,"components/dynamic-actor":11,"images/items":21,"store":26,"utils/physics/collisions":27}],6:[function(require,module,exports){
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
    _inherits(Character, _DynamicActor);

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
                this._hp = value <= (this.maxHp || 16) ? value : this.maxHp || 16;
            } else if (0 >= value) {
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

},{"components/dynamic-actor":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _componentsCollectible = require('components/collectible');

var _componentsCollectible2 = _interopRequireDefault(_componentsCollectible);

var _canvas = require('canvas');

var _imagesItems = require('images/items');

var Coin = (function (_Collectible) {
    _inherits(Coin, _Collectible);

    function Coin(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Coin);

        _get(Object.getPrototypeOf(Coin.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesItems.coins.width, height: _imagesItems.coins.height, image: {
                type: 'sprite',
                src: _imagesItems.coins.sprite
            } });

        var rand = Math.random();
        this._state = Math.round(Math.random() * _imagesItems.coins.states);
        this._states = _imagesItems.coins.states;
        this._interval = 100; // ms
        this._then = Date.now();

        if (0.1 < rand) {
            this.quantity = 1;
            this._name = 'default';
        } else if (0.05 < rand) {
            this.quantity = 5;
            this._name = 'nickel';
        } else if (0.02 < rand) {
            this.quantity = 10;
            this._name = 'dime';
        } else if (0.005 < rand) {
            this.quantity = 25;
            this._name = 'quarter';
        }

        // no sprite for the big moneyz yet.
        this.quantity = 1;
    }

    _createClass(Coin, [{
        key: 'renderSprite',
        value: function renderSprite() {
            // const [ x, y ] = coins[this._name].position || [0, 0, ];
            // ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );

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
        key: 'toItem',
        value: function toItem() {
            return {
                type: 'coin',
                quantity: this.quantity
            };
        }
    }]);

    return Coin;
})(_componentsCollectible2['default']);

exports['default'] = Coin;
module.exports = exports['default'];

},{"canvas":2,"components/collectible":8,"images/items":21}],8:[function(require,module,exports){
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
    _inherits(Collectible, _StaticActor);

    function Collectible() {
        _classCallCheck(this, Collectible);

        _get(Object.getPrototypeOf(Collectible.prototype), 'constructor', this).apply(this, arguments);
    }

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

},{"components/static-actor":16}],9:[function(require,module,exports){
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
    _inherits(Collection, _Array);

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

},{"store":26}],10:[function(require,module,exports){
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
    _inherits(DestructibleStaticActor, _StaticActor);

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

},{"components/static-actor":16}],11:[function(require,module,exports){
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
    _inherits(DynamicActor, _Actor);

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

},{"components/actor":4}],12:[function(require,module,exports){
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
    _inherits(Fire, _DestructibleStaticActor);

    function Fire(_ref) {
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Fire);

        _get(Object.getPrototypeOf(Fire.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesObstacles.fire.width, height: _imagesObstacles.fire.height, hp: 3, image: {
                type: 'sprite',
                src: _imagesObstacles.fire.sprite
            } });

        this._state = Math.round(Math.random() * _imagesObstacles.fire.states);
        this._states = _imagesObstacles.fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
        this.damages = 0.5;
    }

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

},{"canvas":2,"components/destructible-static-actor":10,"images/obstacles":22}],13:[function(require,module,exports){
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
    _inherits(Isaac, _Character);

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
        this.maxHp = 16;
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

},{"../constants":18,"canvas":2,"components/character":6,"components/tear":17,"images/characters":20,"store":26,"utils/physics/collisions":27}],14:[function(require,module,exports){
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
    _inherits(Rock, _StaticActor);

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

},{"canvas":2,"components/static-actor":16,"images/obstacles":22}],15:[function(require,module,exports){
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
    _inherits(Room, _Actor);

    function Room() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? { image: { type: 'image', src: _imagesRooms.defaultRoom } } : arguments[0];

        var image = _ref.image;

        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, { width: 800, height: 480, image: image });
        this._x = 0;
        this._y = 0;
    }

    return Room;
})(_componentsActor2['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"components/actor":4,"images/rooms":23}],16:[function(require,module,exports){
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
    _inherits(StaticActor, _Actor);

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

    return StaticActor;
})(_componentsActor2['default']);

exports['default'] = StaticActor;
module.exports = exports['default'];

},{"components/actor":4}],17:[function(require,module,exports){
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
    _inherits(Tear, _DynamicActor);

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

},{"../constants":18,"components/dynamic-actor":11,"images/tears":24,"layers":25,"utils/physics/collisions":27}],18:[function(require,module,exports){
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

},{"canvas":2}],19:[function(require,module,exports){
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
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    'default': {
        position: [0, 16]
    }
};

exports.bombs = bombs;
var keys = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    'default': {
        position: [16, 0]
    },
    golden: {
        position: [16, 16]
    }
};

exports.keys = keys;
var coins = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    'default': {
        position: [0, 0]
    }
};

exports.coins = coins;
var hardMode = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    'default': {
        position: [32, 0]
    }
};

exports.hardMode = hardMode;
var noAchievement = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    'default': {
        position: [32, 16]
    }
};

exports.noAchievement = noAchievement;
exports['default'] = {
    hearts: hearts,
    bombs: bombs,
    keys: keys,
    coins: coins,
    hardMode: hardMode,
    noAchievement: noAchievement
};

},{}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
    },
    explosion: {
        sprite: 'build/img/explosion_sprite.png',
        width: 96,
        height: 96,
        states: 12
    }
};

exports.bombs = bombs;
var coins = {
    sprite: 'build/img/coins_sprite.png',
    width: 20,
    height: 15,
    states: 6
};

exports.coins = coins;
exports['default'] = {
    bombs: bombs
};

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultRoom = 'build/img/room.png';

exports.defaultRoom = defaultRoom;
exports['default'] = {
    'default': defaultRoom
};

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultTear = 'build/img/tear.png';

exports.defaultTear = defaultTear;
exports['default'] = {
    'default': defaultTear
};

},{}],25:[function(require,module,exports){
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

var _componentsCoin = require('components/coin');

var _componentsCoin2 = _interopRequireDefault(_componentsCoin);

var _componentsIsaac = require('components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

var _volumeController = require('volume-controller');

var _volumeController2 = _interopRequireDefault(_volumeController);

_store2['default'].set('room', new _componentsRoom2['default']());
_store2['default'].set('HUD', new _componentsHUD2['default']());
_store2['default'].set('noAchievement', true);
_store2['default'].set('hardMode', false);
_store2['default'].set('sounds', new _volumeController2['default']());
_store2['default'].set('backgroundObstacles', new _componentsCollection2['default']({ collection: [] }));

_store2['default'].set('tears', new _componentsCollection2['default']({ shouldUpdateBeforeRender: true }));

_store2['default'].set('obstacles', new _componentsCollection2['default']({ collection: [new _componentsRock2['default']({ x: 450, y: 120 }), new _componentsRock2['default']({ x: 65, y: 65 }), new _componentsRock2['default']({ x: 115, y: 65 }), new _componentsRock2['default']({ x: 165, y: 65 }), new _componentsRock2['default']({ x: 65, y: 116 }), new _componentsRock2['default']({ x: 115, y: 116 }), new _componentsRock2['default']({ x: 165, y: 116 })], shouldUpdateBeforeRender: true }));

_store2['default'].set('items', new _componentsCollection2['default']({ collection: [new _componentsBomb2['default']({ x: 82, y: 356 }), new _componentsCoin2['default']({ x: 140, y: 375 }), new _componentsCoin2['default']({ x: 160, y: 375 }), new _componentsCoin2['default']({ x: 180, y: 375 }), new _componentsCoin2['default']({ x: 200, y: 375 }), new _componentsCoin2['default']({ x: 680, y: 80 }), new _componentsCoin2['default']({ x: 680, y: 65 })] }));

_store2['default'].set('monsters', new _componentsCollection2['default']({ collection: [new _componentsFire2['default']({ x: 703, y: 65 }), new _componentsFire2['default']({ x: 650, y: 65 })], shouldUpdateBeforeRender: true }));

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

},{"components/HUD":3,"components/bomb":5,"components/coin":7,"components/collection":9,"components/fire":12,"components/isaac":13,"components/rock":14,"components/room":15,"store":26,"volume-controller":28}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = new Map();
exports["default"] = Store;
module.exports = exports["default"];

},{}],27:[function(require,module,exports){
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

},{"components/collection":9}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _volumeElements = require('volume-elements');

var text = 'undefined' === typeof _volumeElements.volumeDisplay.innerText ? 'textContent' : 'innerText';

var VolumeController = (function () {
    function VolumeController() {
        var volume = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];
        var muted = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, VolumeController);

        this.volume = volume;
        this.muted = muted;

        this.updateDisplay(_volumeElements.volumeDisplay);
        this.observe(_volumeElements.volumeSlider);
    }

    _createClass(VolumeController, [{
        key: 'observe',
        value: function observe(input) {
            var _this = this;

            input.addEventListener('change', function (_ref) {
                var target = _ref.target;

                _this.volume = target.value;
                _this.updateDisplay(_volumeElements.volumeDisplay);
            });
        }
    }, {
        key: 'updateDisplay',
        value: function updateDisplay(span) {
            span[text] = this._volume + ' %';
        }
    }, {
        key: 'volume',
        get: function get() {
            return this._volume;
        },
        set: function set(value) {
            if (0 <= value && 100 >= value) {
                this._volume = value;
            }
        }
    }, {
        key: 'muted',
        get: function get() {
            return this._muted;
        },
        set: function set(value) {
            this._muted = !!value;
        }
    }]);

    return VolumeController;
})();

exports['default'] = VolumeController;
module.exports = exports['default'];

},{"volume-elements":29}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var volumeSlider = document.getElementById('js-volume');
exports.volumeSlider = volumeSlider;
var volumeDisplay = document.getElementById('js-volume--display');
exports.volumeDisplay = volumeDisplay;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvaW4uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2ZpcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3JvY2suanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb29tLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvdGVhci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvaXRlbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL29ic3RhY2xlcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvcm9vbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3RlYXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2xheWVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9zdG9yZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy91dGlscy9waHlzaWNzL2NvbGxpc2lvbnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdm9sdW1lLWNvbnRyb2xsZXIuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdm9sdW1lLWVsZW1lbnRzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7c0JDQW1DLFFBQVE7O3NCQUNKLFFBQVE7O0FBRS9DLElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxHQUNWO0FBQ0ksWUFKaUIsVUFBVSxDQUloQixNQUFNLEVBQUUsQ0FBQztBQUNwQixZQUxLLFVBQVUsQ0FLSixNQUFNLEVBQUUsQ0FBQzs7QUFFcEIsWUFSSyxVQUFVLENBUUosU0FBUyxTQVJILE1BQU0sRUFRTyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7O0FBRXJDLHlCQUFxQixDQUFFLElBQUksQ0FBRSxDQUFDO0NBQ2pDLENBQUM7O0FBRUYsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7O0FDYkEsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBRSxLQUFLLENBQUUsQ0FBQztRQUFqRCxhQUFhLEdBQWIsYUFBYTtBQUNuQixJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBRSxDQUFDOztRQUE5QyxVQUFVLEdBQVYsVUFBVTtBQUVoQixJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFFLFFBQVEsQ0FBRSxDQUFDO1FBQTVDLE1BQU0sR0FBTixNQUFNO0FBQ25CLE1BQU0sQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUNuQyxNQUFNLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDOUIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUFoQyxHQUFHLEdBQUgsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDTkksUUFBUTs7cUJBQ1YsT0FBTzs7Ozt5QkFDMkMsWUFBWTs7SUFFM0QsR0FBRztBQUVULGFBRk0sR0FBRyxHQUdwQjs7OzhCQUhpQixHQUFHOztBQUloQixZQUFJLENBQUMsTUFBTSxHQUFH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QUM7UUFBdEQsWUFBWSxHQUFaLFlBQVk7QUFDbEIsSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBRSxvQkFBb0IsQ0FBRSxDQUFDO1FBQWhFLGFBQWEsR0FBYixhQUFhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGRpc3BsYXlDdHgsIGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgYmFja2dyb3VuZC5yZW5kZXIoKTtcbiAgICBmb3JlZ3JvdW5kLnJlbmRlcigpO1xuXG4gICAgZGlzcGxheUN0eC5kcmF3SW1hZ2UoIGNhbnZhcywgMCwgMCApOyAvLyBkcmF3IHNvbWV0aGluZyB2aXNpYmxlIG9ubHkgb25jZSBwZXIgZnJhbWUuXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIG1haW4gKTtcbn07XG5cbm1haW4oKTtcbiIsImV4cG9ydCBjb25zdCBkaXNwbGF5Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhcHAnICk7XG5leHBvcnQgY29uc3QgZGlzcGxheUN0eCA9IGRpc3BsYXlDYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuXG5leHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggJ2NhbnZhcycgKTtcbmNhbnZhcy53aWR0aCA9IGRpc3BsYXlDYW52YXMud2lkdGg7XG5jYW52YXMuaGVpZ2h0ID0gZGlzcGxheUNhbnZhcy5oZWlnaHQ7XG5leHBvcnQgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IHsgaGVhcnRzLCBib21icywga2V5cywgY29pbnMsIGhhcmRNb2RlLCBub0FjaGlldmVtZW50IH0gZnJvbSAnaW1hZ2VzL0hVRCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVRFxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID1cbiAgICAgICAge1xuICAgICAgICAgICAgaGVhcnRzLFxuICAgICAgICAgICAgYm9tYnMsXG4gICAgICAgICAgICBrZXlzLFxuICAgICAgICAgICAgY29pbnMsXG4gICAgICAgICAgICBoYXJkTW9kZSxcbiAgICAgICAgICAgIG5vQWNoaWV2ZW1lbnQsXG4gICAgICAgIH07XG5cbiAgICAgICAgT2JqZWN0LmtleXMoIGVsZW1lbnRzICkuZm9yRWFjaCggcHJvcCA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB7IHNwcml0ZSB9ID0gZWxlbWVudHNbcHJvcF07XG4gICAgICAgICAgICB0aGlzLmltYWdlc1twcm9wXSA9IHNwcml0ZTtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGltYWdlOiBuZXcgSW1hZ2UoKSxcbiAgICAgICAgICAgICAgICByZWFkeTogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5faW1hZ2VzW3Byb3BdID0gaW1hZ2U7XG5cbiAgICAgICAgICAgIGltYWdlLmltYWdlLm9ubG9hZCA9ICgpID0+IGltYWdlLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGltYWdlLmltYWdlLnNyYyA9IHNwcml0ZTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmhlYXJ0cy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGVhcnRzLndpZHRoICogMS41O1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaGVhcnRzLmhlaWdodCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gMTA7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWSA9IDEwO1xuICAgICAgICAgICAgY29uc3Qgb3JpZ2luYWxIcCA9IFN0b3JlLmdldCggJ3BsYXllcicgKS5ocDtcblxuICAgICAgICAgICAgbGV0IGhwID0gb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGxldCB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICBsZXQgeSA9IGluaXRpYWxZO1xuXG4gICAgICAgICAgICBsZXQgX2hwID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKCBfaHAgPCBocCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoIF9ocCArIDAuNSA9PT0gaHAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuaGFsZmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoO1xuICAgICAgICAgICAgICAgIF9ocCArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKCA3IDwgX2hwICYmIDggPj0gX2hwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluaXRpYWxZID0gNDA7XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuY29pbnMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBjb2lucy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGNvaW5zLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckNvaW5zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAnY29pbicgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQ29pbnMgPyBwbGF5ZXJDb2lucy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGNvaW5zLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuY29pbnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGNvaW5zLndpZHRoLCBjb2lucy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYCR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCArIDMsIGluaXRpYWxZICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5ib21icy5yZWFkeSApXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gYm9tYnMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBib21icy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb21icyA9IFN0b3JlLmdldCggJ3BsYXllckl0ZW1zJyApLmdldCggJ2JvbWInICk7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHBsYXllckJvbWJzID8gcGxheWVyQm9tYnMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBib21icy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmJvbWJzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBib21icy53aWR0aCwgYm9tYnMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IDAgPT09IGNvdW50ID8gJ3JnYigxNzUsIDE3NSwgMTc1KScgOiAncmdiKDIyNSwgMjI1LCAyMjUpJztcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE0cHggbW9ub3NwYWNlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoIGAke2NvdW50fWAsIGluaXRpYWxYICsgd2lkdGggKyAzLCBpbml0aWFsWSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMua2V5cy5yZWFkeSApXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0ga2V5cy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGtleXMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyS2V5cyA9IFN0b3JlLmdldCggJ3BsYXllckl0ZW1zJyApLmdldCggJ2tleScgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyS2V5cyA/IHBsYXllcktleXMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBrZXlzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMua2V5cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwga2V5cy53aWR0aCwga2V5cy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYCR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCArIDMsIGluaXRpYWxZICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIFN0b3JlLmdldCggJ2hhcmRNb2RlJyApICYmIHRoaXMuX2ltYWdlcy5oYXJkTW9kZS5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhhcmRNb2RlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaGFyZE1vZGUuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoYXJkTW9kZS5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmhhcmRNb2RlLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoYXJkTW9kZS53aWR0aCwgaGFyZE1vZGUuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggU3RvcmUuZ2V0KCAnbm9BY2hpZXZlbWVudCcgKSAmJiB0aGlzLl9pbWFnZXMubm9BY2hpZXZlbWVudC5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IG5vQWNoaWV2ZW1lbnQud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBub0FjaGlldmVtZW50LmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gbm9BY2hpZXZlbWVudC5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLm5vQWNoaWV2ZW1lbnQuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIG5vQWNoaWV2ZW1lbnQud2lkdGgsIG5vQWNoaWV2ZW1lbnQuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeD1udWxsLCB5PW51bGwsIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlIHx8IG51bGw7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2UoIGltYWdlLCB0eXBlPSdpbWFnZScgKVxuICAgIHtcbiAgICAgICAgaWYgKCAnY2FudmFzJyA9PT0gdHlwZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggaW1hZ2UgIT09IHRoaXMuaW1hZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHNyYzogaW1hZ2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHNldCB5KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgY2VudGVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCggdGhpcy5feCApO1xuICAgICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZCggdGhpcy5feSApO1xuICAgICAgICAvLyBjdHguZmlsbFN0eWxlID0gJ3JlZCc7XG4gICAgICAgIC8vIGN0eC5maWxsUmVjdCggdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBpZiAoIHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggJ2ltYWdlJyA9PT0gdGhpcy5pbWFnZS50eXBlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoICdzcHJpdGUnID09PSB0aGlzLmltYWdlLnR5cGUgJiYgdGhpcy5yZW5kZXJTcHJpdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3ByaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlibGUgZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aWJsZSc7XG5pbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgYm9tYnMgfSBmcm9tICdpbWFnZXMvaXRlbXMnO1xuaW1wb3J0IGdldENvbGxpZGVycyBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuY2xhc3MgQm9tYkFjdG9yIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBib21icy53aWR0aCwgaGVpZ2h0OiBib21icy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogYm9tYnMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMS4wO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRXhwbG9kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNjA7IC8vIHRpbWUgYmV0d2VlbiBmcmFtZXMgb2YgZXhwbG9zaW9uXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgfVxuXG4gICAgZHJvcCgpXG4gICAge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoIDo6dGhpcy5yZW5kZXJFeHBsb3Npb24sIDQwMDAgKTsgLy8gNCBzZWNvbmRzIGFmdGVyXG5cbiAgICAgICAgU3RvcmUuZ2V0KCAndGVhcnMnICkucHVzaCggdGhpcyApO1xuICAgIH1cblxuICAgIHJlbmRlckV4cGxvc2lvbigpXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gYm9tYnMuZXhwbG9zaW9uLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGJvbWJzLmV4cGxvc2lvbi5oZWlnaHQ7XG4gICAgICAgIHRoaXMuc2V0SW1hZ2UoIGJvbWJzLmV4cGxvc2lvbi5zcHJpdGUsICdzcHJpdGUnICk7XG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIERFU1RST1kgQUxMIFRIRSBUSElOR1MgTk9XXG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGxldCB4LCB5O1xuICAgICAgICBsZXQgX3gsIF95O1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmICggdGhpcy5pc0V4cGxvZGluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIFt4LCB5XSA9IFt0aGlzLl9zdGF0ZSAqIHRoaXMud2lkdGgsIDAsIF07XG4gICAgICAgICAgICBbX3gsIF95XSA9IFt0aGlzLl94IC0gYm9tYnMud2lkdGgsIHRoaXMuX3kgLSBib21icy5oZWlnaHQgKiAyLCBdO1xuXG4gICAgICAgICAgICBpZiAoIG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgKz0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9zdGF0ZSA9PT0gYm9tYnMuZXhwbG9zaW9uLnN0YXRlcyApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggIXRoaXMuaXNFeHBsb2RpbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICBbIHgsIHkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBbX3gsIF95XSA9IFt0aGlzLl94LCB0aGlzLl95LCBdO1xuICAgICAgICB9XG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIF94LCBfeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbWIgZXh0ZW5kcyBDb2xsZWN0aWJsZVxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogYm9tYnMud2lkdGgsIGhlaWdodDogYm9tYnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGJvbWJzLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAwLjIgPiBNYXRoLnJhbmRvbSgpID8gMiA6IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGJvbWJOYW1lID0gMSA9PT0gdGhpcy5xdWFudGl0eSA/ICdkZWZhdWx0JyA6ICdkb3VibGUnO1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IGJvbWJzW2JvbWJOYW1lXS5wb3NpdGlvbiB8fCBbMCwgMCwgXTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9tYicsXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgICAgIGlzRHJvcHBhYmxlOiB0cnVlLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHRvRHJvcHBhYmxlKClcbiAgICB7XG4gICAgICAgIHJldHVybiBCb21iQWN0b3I7IC8vIHJldHVybiB0aGUgY2xhc3Mgc28gdGhlIHdlYXJlciBjYW4gZG8gbmV3IG9uIGl0LlxuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBuYW1lLCBocCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxIcCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAnQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlICk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZSA8PSAoIHRoaXMubWF4SHAgfHwgMTYgKSA/IHZhbHVlIDogdGhpcy5tYXhIcCB8fCAxNjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggMCA+PSB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdGhpcy5fb3JpZ2luYWxIcDtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZXNwYXduIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBjb2lucyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvaW4gZXh0ZW5kcyBDb2xsZWN0aWJsZVxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogY29pbnMud2lkdGgsIGhlaWdodDogY29pbnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGNvaW5zLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IE1hdGgucm91bmQoICggTWF0aC5yYW5kb20oKSAqIGNvaW5zLnN0YXRlcyApICk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGNvaW5zLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmICggMC4xIDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAxO1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICdkZWZhdWx0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggMC4wNSA8IHJhbmQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gNTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnbmlja2VsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggMC4wMiA8IHJhbmQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTA7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ2RpbWUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwLjAwNSA8IHJhbmQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gMjU7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ3F1YXJ0ZXInO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm8gc3ByaXRlIGZvciB0aGUgYmlnIG1vbmV5eiB5ZXQuXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAxO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICAvLyBjb25zdCBbIHgsIHkgXSA9IGNvaW5zW3RoaXMuX25hbWVdLnBvc2l0aW9uIHx8IFswLCAwLCBdO1xuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cblxuICAgIHRvSXRlbSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2NvaW4nLFxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHksXG4gICAgICAgIH07XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvc3RhdGljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlibGUgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIHRvSXRlbSgpXG4gICAge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICd0b0l0ZW0oKSBtdXN0IGJlIGltcGxlbWVudGVkJyApO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBBcnJheVxue1xuICAgIGNvbnN0cnVjdG9yKCB7IGNvbGxlY3Rpb249W10sIHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcj1mYWxzZSwgc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXI9ZmFsc2UgfSApXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnB1c2goIC4uLmNvbGxlY3Rpb24gKTtcblxuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVCZWZvcmVSZW5kZXIgPSBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI7XG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUFmdGVyUmVuZGVyID0gc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXI7XG4gICAgfVxuXG4gICAgZ2V0IGlzRW1wdHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIDAgPT09IHRoaXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSApXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXhPZiggaXRlbSApO1xuXG4gICAgICAgIGlmICggLTEgPCBpbmRleCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBjb25zdCBuZXdUaGlzID0gW107XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gdGhpc1tpXTtcblxuICAgICAgICAgICAgaWYgKCBpdGVtLnVwZGF0ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCBmYWxzZSA9PT0gaXRlbS5hY3RpdmUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggaXRlbS5yZW5kZXJEZXN0cm95IClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVuZGVyRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGxheWVyID0gaXRlbS5pbmFjdGl2ZUxheWVyO1xuICAgICAgICAgICAgICAgIGlmICggbGF5ZXIgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3RvcmUuZ2V0KCBsYXllciApLnB1c2goIGl0ZW0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmV3VGhpcy5wdXNoKCBpdGVtICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG5ld1RoaXMubGVuZ3RoICE9PSBsZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSggbGVuIC0gMSApO1xuXG4gICAgICAgICAgICBmb3IgKCBsZXQgaiA9IDAsIGxlbmogPSBuZXdUaGlzLmxlbmd0aDsgaiA8IGxlbmo7IGorKyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpc1tqXSA9IG5ld1RoaXNbal07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLl9zaG91bGRVcGRhdGVCZWZvcmVSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzW2ldLnJlbmRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciAmJiAhdGhpcy5pc0VtcHR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlc3RydWN0aWJsZVN0YXRpY0FjdG9yIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgaHAgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZG1nSW50ZXJ2YWwgPSA1MDA7XG4gICAgICAgIHRoaXMuX2xhc3REbWcgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCAyNTY7XG4gICAgfVxuXG4gICAgZ2V0IHNwZWVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBzZXQgc3BlZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IERlc3RydWN0aWJsZVN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZGVzdHJ1Y3RpYmxlLXN0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZmlyZSwgZmlyZUJhc2UgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZSBleHRlbmRzIERlc3RydWN0aWJsZVN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBmaXJlLndpZHRoLCBoZWlnaHQ6IGZpcmUuaGVpZ2h0LCBocDogMywgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmaXJlLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlID0gTWF0aC5yb3VuZCggKCBNYXRoLnJhbmRvbSgpICogZmlyZS5zdGF0ZXMgKSApO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmaXJlLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSAwLjU7XG4gICAgfVxuXG4gICAgZ2V0IGluYWN0aXZlTGF5ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICdiYWNrZ3JvdW5kT2JzdGFjbGVzJztcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgbGV0IFsgd29vZFgsIHdvb2RZIF0gPSB0aGlzLmFjdGl2ZSA/IGZpcmVCYXNlLnBvc2l0aW9uIDogZmlyZUJhc2UuZGVhZFBvc2l0aW9uO1xuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgd29vZFgsIHdvb2RZLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSArIDE3LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGlmICggIXRoaXMuYWN0aXZlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5kYW1hZ2VzID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAoIHRoaXMuX3N0YXRlICsgMSApICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMsIGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICdjb21wb25lbnRzL2NoYXJhY3Rlcic7XG5pbXBvcnQgVGVhciBmcm9tICdjb21wb25lbnRzL3RlYXInO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1BfSVNBQUMsXG4gICAgTElNSVRfQk9UVE9NX0lTQUFDLFxuICAgIExJTUlUX0xFRlRfSVNBQUMsXG4gICAgTElNSVRfUklHSFRfSVNBQUMsXG4gICAgS0VZX1VQLFxuICAgIEtFWV9ET1dOLFxuICAgIEtFWV9MRUZULFxuICAgIEtFWV9SSUdIVCxcbiAgICBLRVlfVyxcbiAgICBLRVlfUyxcbiAgICBLRVlfQSxcbiAgICBLRVlfRCxcbiAgICBLRVlfU1BBQ0UsXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBpc2FhYyB9IGZyb20gJ2ltYWdlcy9jaGFyYWN0ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXNhYWMgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMjgsIGhlaWdodDogMzUsIHNwZWVkOiAyMDAsIG5hbWU6ICdJc2FhYycsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGlzYWFjLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gU3RvcmUuZ2V0KCAndGVhcnMnICk7XG4gICAgICAgIHRoaXMuX2F0dGFja1NwZWVkID0gNTAwOyAvLyAxIHNob290IC8gc2Vjb25kXG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDE7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHsgeDogMCwgeTogMSwgfTtcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdXaWR0aCA9IHRoaXMud2lkdGggLSAyO1xuICAgICAgICB0aGlzLmNvbGxpZGluZ0hlaWdodCA9IHRoaXMuaGVpZ2h0IC0gMTA7XG4gICAgICAgIHRoaXMubWF4SHAgPSAxNjtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdtb25zdGVycycgKSApO1xuXG4gICAgICAgICAgICBpZiAoICFlbmVteSAmJiAhaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RG1nID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcblxuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHBpY2t1cEl0ZW1zKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3RpYmxlID0gaXNDb2xsaWRpbmcoIHRoaXMsIGl0ZW1zICk7XG5cbiAgICAgICAgaWYgKCAhY29sbGVjdGlibGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoIGNvbGxlY3RpYmxlICk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb2xsZWN0aWJsZS50b0l0ZW0oKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoIGl0ZW0udHlwZSApIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmICggaXRlbS5pc0Ryb3BwYWJsZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zLnB1c2goIGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVySXRlbXMuc2V0KCBpdGVtLnR5cGUsIGV4aXN0aW5nSXRlbSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCB0aW1lLCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuXG4gICAgICAgIGlmICggMCA9PT0gZGVwbGFjZW1lbnQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIDAgPT09IGtleXNEb3duLnNpemUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0gJiYgZXhpc3RpbmdJdGVtLnF1YW50aXR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbQm9tYiwgLi4uYm9tYnNdID0gZXhpc3RpbmdJdGVtLml0ZW1zO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zID0gYm9tYnM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IG5ldyBCb21iKCB7IHgsIHksIH0gKTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoICdib21iJywgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMucHVzaCggbmV3IFRlYXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICBjcmVhdG9yOiB0aGlzLFxuICAgICAgICAgICAgZGFtYWdlczogdGhpcy5kYW1hZ2VzLFxuICAgICAgICB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmICF4ICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnVwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5kb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCAwLCAyNSwgMTgsIDE0LCB0aGlzLl94ICsgNSwgdGhpcy5feSArIDIwLCAxOCwgMTQgKTtcbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IHJvY2tzIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogNTAsIGhlaWdodDogNTEsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogcm9ja3Muc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gMC4wNSA+IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gdGhpcy5faXNTcGVjaWFsID8gcm9ja3Muc3BlY2lhbC5wb3NpdGlvbiA6IHJvY2tzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJvb20gfSBmcm9tICdpbWFnZXMvcm9vbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyBpbWFnZSwgfSA9IHsgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0Um9vbSwgfSwgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UsIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAxMywgaGVpZ2h0OiAxMywgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0VGVhciwgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICBpZiAoIExJTUlUX0xFRlQgLSB0aGlzLndpZHRoID4gdGhpcy5feCB8fCB0aGlzLl94ID4gTElNSVRfUklHSFQgKyB0aGlzLndpZHRoIHx8XG4gICAgICAgICAgICBMSU1JVF9UT1AgLSB0aGlzLmhlaWdodCA+IHRoaXMuX3kgfHwgdGhpcy5feSA+IExJTUlUX0JPVFRPTSArIHRoaXMuaGVpZ2h0IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGhpcywgZm9yZWdyb3VuZC5maWx0ZXIoIGl0ZW0gPT4gaXRlbSAhPT0gdGhpcy5fY3JlYXRvciApICk7XG4gICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICdudW1iZXInID09PSB0eXBlb2YgY29sbGlkZXIuaHAgKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuaHAgLT0gdGhpcy5kYW1hZ2VzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlICYmIHRoaXMuaW5Cb3VuZHM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUF9JU0FBQyA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTV9JU0FBQyA9IGNhbnZhcy5oZWlnaHQgLSA5NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUX0lTQUFDID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFRfSVNBQUMgPSBjYW52YXMud2lkdGggLSA4NTtcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSA2NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNjA7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA3NTtcblxuZXhwb3J0IGNvbnN0IEtFWV9VUCA9IDM4O1xuZXhwb3J0IGNvbnN0IEtFWV9ET1dOID0gNDA7XG5leHBvcnQgY29uc3QgS0VZX0xFRlQgPSAzNztcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCBLRVlfVyA9IDg3O1xuZXhwb3J0IGNvbnN0IEtFWV9BID0gNjU7XG5leHBvcnQgY29uc3QgS0VZX1MgPSA4MztcbmV4cG9ydCBjb25zdCBLRVlfRCA9IDY4O1xuIiwiZXhwb3J0IGNvbnN0IGhlYXJ0cyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2hlYXJ0c19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBlbXB0eTpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDAsIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZmRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAwLCBdLFxuICAgIH0sXG4gICAgc3Bpcml0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAxNiwgXSxcbiAgICB9LFxuICAgIGV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZldmlsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMTYsIF0sXG4gICAgfSxcbiAgICByZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZyZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs2NCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMTYsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBrZXlzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDAsIF0sXG4gICAgfSxcbiAgICBnb2xkZW46XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAxNiwgXSxcbiAgICB9LFxufTtcblxuXG5leHBvcnQgY29uc3QgY29pbnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgaGFyZE1vZGUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG5vQWNoaWV2ZW1lbnQgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMTYsIF0sXG4gICAgfSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBoZWFydHMsXG4gICAgYm9tYnMsXG4gICAga2V5cyxcbiAgICBjb2lucyxcbiAgICBoYXJkTW9kZSxcbiAgICBub0FjaGlldmVtZW50LFxufTtcbiIsImV4cG9ydCBjb25zdCBpc2FhYyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2lzYWFjX3Nwcml0ZV9jdXN0b20ucG5nJyxcbiAgICBoZWFkOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDI4LFxuICAgICAgICBoZWlnaHQ6IDI1LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA0LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNiwgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAyLCAwLCBdLFxuICAgICAgICB9LFxuICAgICAgICBzaG9vdGluZ0RpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFsyOCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA1LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNywgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAzLCAwLCBdLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDI1LCBdLFxuICAgICAgICAgICAgdXA6IFsxOCAqIDUsIDI1LCBdLFxuICAgICAgICAgICAgbGVmdDogWzAsIDI1LCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFswLCAyNSwgXSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBpc2FhYyxcbn07XG4iLCJleHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9ib21ic19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgZG91YmxlOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxuICAgIGV4cGxvc2lvbjpcbiAgICB7XG4gICAgICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9leHBsb3Npb25fc3ByaXRlLnBuZycsXG4gICAgICAgIHdpZHRoOiA5NixcbiAgICAgICAgaGVpZ2h0OiA5NixcbiAgICAgICAgc3RhdGVzOiAxMixcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvY29pbnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDIwLFxuICAgIGhlaWdodDogMTUsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3Qgcm9ja3MgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9yb2Nrc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMTcwLFxuICAgIGhlaWdodDogMTcyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgc3BlY2lhbDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzE3MCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZpcmUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9maXJlX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMSxcbiAgICBoZWlnaHQ6IDM0LFxuICAgIHN0YXRlczogNixcbn07XG5cblxuZXhwb3J0IGNvbnN0IGZpcmVCYXNlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZGVhZGZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgcG9zaXRpb246IFswLCAzNCwgXSxcbiAgICBkZWFkUG9zaXRpb246IFszMiwgMzQsIF0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIHJvY2tzLFxuICAgIGZpcmUsXG4gICAgZmlyZUJhc2UsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGRlZmF1bHRSb29tID0gJ2J1aWxkL2ltZy9yb29tLnBuZyc7XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZGVmYXVsdDogZGVmYXVsdFJvb20sXG59O1xuIiwiZXhwb3J0IGNvbnN0IGRlZmF1bHRUZWFyID0gJ2J1aWxkL2ltZy90ZWFyLnBuZyc7XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZGVmYXVsdDogZGVmYXVsdFRlYXIsXG59O1xuIiwiaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlvbic7XG5pbXBvcnQgUm9vbSBmcm9tICdjb21wb25lbnRzL3Jvb20nO1xuaW1wb3J0IEhVRCBmcm9tICdjb21wb25lbnRzL0hVRCc7XG5pbXBvcnQgUm9jayBmcm9tICdjb21wb25lbnRzL3JvY2snO1xuaW1wb3J0IEZpcmUgZnJvbSAnY29tcG9uZW50cy9maXJlJztcbmltcG9ydCBCb21iIGZyb20gJ2NvbXBvbmVudHMvYm9tYic7XG5pbXBvcnQgQ29pbiBmcm9tICdjb21wb25lbnRzL2NvaW4nO1xuaW1wb3J0IElzYWFjIGZyb20gJ2NvbXBvbmVudHMvaXNhYWMnO1xuaW1wb3J0IFZvbHVtZUNvbnRyb2xsZXIgZnJvbSAndm9sdW1lLWNvbnRyb2xsZXInO1xuXG5TdG9yZS5zZXQoICdyb29tJywgbmV3IFJvb20oKSApO1xuU3RvcmUuc2V0KCAnSFVEJywgbmV3IEhVRCgpICk7XG5TdG9yZS5zZXQoICdub0FjaGlldmVtZW50JywgdHJ1ZSApO1xuU3RvcmUuc2V0KCAnaGFyZE1vZGUnLCBmYWxzZSApO1xuU3RvcmUuc2V0KCAnc291bmRzJywgbmV3IFZvbHVtZUNvbnRyb2xsZXIoKSApO1xuU3RvcmUuc2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246IFtdLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAndGVhcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBSb2NrKCB7IHg6IDQ1MCwgeTogMTIwLCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiAxMTYsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDExNiwgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBCb21iKCB7IHg6IDgyLCB5OiAzNTYsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAxNDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDE2MCwgeTogMzc1LCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogMTgwLCB5OiAzNzUsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAyMDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDY4MCwgeTogODAsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiA2ODAsIHk6IDY1LCB9ICksXG5dLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBGaXJlKCB7IHg6IDcwMywgeTogNjUsIH0gKSxcbiAgICBuZXcgRmlyZSggeyB4OiA2NTAsIHk6IDY1LCB9ICksXG5dLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdwbGF5ZXInLCBuZXcgSXNhYWMoKSApO1xuU3RvcmUuc2V0KCAncGxheWVySXRlbXMnLCBuZXcgTWFwKCkgKTtcblxuXG5leHBvcnQgY29uc3QgYmFja2dyb3VuZCA9IG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgU3RvcmUuZ2V0KCAncm9vbScgKSxcbiAgICBTdG9yZS5nZXQoICdiYWNrZ3JvdW5kT2JzdGFjbGVzJyApLFxuICAgIFN0b3JlLmdldCggJ0hVRCcgKSxcbl0sIH0gKTtcblxuZXhwb3J0IGNvbnN0IGZvcmVncm91bmQgPSBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSxcbiAgICBTdG9yZS5nZXQoICdtb25zdGVycycgKSxcbiAgICBTdG9yZS5nZXQoICdpdGVtcycgKSxcbiAgICBTdG9yZS5nZXQoICd0ZWFycycgKSxcbiAgICBTdG9yZS5nZXQoICdwbGF5ZXInICksXG5dLCB9ICk7XG5cblxud2luZG93LlN0b3JlID0gU3RvcmU7XG53aW5kb3cuUGxheWVyID0gU3RvcmUuZ2V0KCAncGxheWVyJyApO1xud2luZG93Lml0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4vL1xuLy8gZXhwb3J0IGNvbnN0IG9ic3RhY2xlcyA9IGZvcmVncm91bmRbMF07XG4vLyBleHBvcnQgY29uc3QgbW9uc3RlcnMgPSBmb3JlZ3JvdW5kWzFdO1xuLy8gZXhwb3J0IGNvbnN0IHBsYXllciA9IGZvcmVncm91bmRbMl07XG4iLCJjb25zdCBTdG9yZSA9IG5ldyBNYXAoKTtcbmV4cG9ydCBkZWZhdWx0IFN0b3JlO1xuIiwiaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcblxuZXhwb3J0IGNvbnN0IGdldENvbGxpZGVycyA9ICggdGFyZ2V0LCBvdGhlciApID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAoIHRhcmdldCA9PT0gb3RoZXIgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHggPSB0YXJnZXQueDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldC5jb2xsaWRpbmdXaWR0aCB8fCB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5jb2xsaWRpbmdIZWlnaHQgfHwgdGFyZ2V0LmhlaWdodDtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggb3RoZXIgKSB8fCBvdGhlciBpbnN0YW5jZW9mIENvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXJzID0gW107XG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgbGVuID0gb3RoZXIubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBfY29sbGlkZXJzID0gZ2V0Q29sbGlkZXJzKCB0YXJnZXQsIG90aGVyW2ldICk7XG5cbiAgICAgICAgICAgIGlmICggX2NvbGxpZGVycyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLnB1c2guYXBwbHkoIGNvbGxpZGVycywgX2NvbGxpZGVycyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbGxpZGVycy5sZW5ndGggPyBjb2xsaWRlcnMgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIuY29sbGlkaW5nV2lkdGggfHwgb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5jb2xsaWRpbmdIZWlnaHQgfHwgb3RoZXIuaGVpZ2h0O1xuXG4gICAgY29uc3QgdG9wID0geSArIGhlaWdodCA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCA8PSBfeSArIF9oZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHggKyB3aWR0aCA+PSBfeDtcblxuICAgIGlmICggbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wIClcbiAgICB7XG4gICAgICAgIHJldHVybiBbb3RoZXIsIF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzQ29sbGlkaW5nID0gKCB0YXJnZXQsIG90aGVyICkgPT5cbntcbiAgICAvLyBpZ25vcmUgY29sbGlzaW9uIHdpdGggc2VsZlxuICAgIGlmICggdGFyZ2V0ID09PSBvdGhlciApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBvdGhlciApIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbiApXG4gICAge1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGFyZ2V0LCBvdGhlcltpXSApO1xuICAgICAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbGxpZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKCBsZWZ0ICYmIHJpZ2h0ICYmIGJvdHRvbSAmJiB0b3AgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG4iLCJpbXBvcnQgeyB2b2x1bWVTbGlkZXIsIHZvbHVtZURpc3BsYXkgfSBmcm9tICd2b2x1bWUtZWxlbWVudHMnO1xuXG5jb25zdCB0ZXh0ID0gJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB2b2x1bWVEaXNwbGF5LmlubmVyVGV4dCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvbHVtZUNvbnRyb2xsZXJcbntcbiAgICBjb25zdHJ1Y3Rvciggdm9sdW1lPTUwLCBtdXRlZD1mYWxzZSApXG4gICAge1xuICAgICAgICB0aGlzLnZvbHVtZSA9IHZvbHVtZTtcbiAgICAgICAgdGhpcy5tdXRlZCA9IG11dGVkO1xuXG4gICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSggdm9sdW1lRGlzcGxheSApO1xuICAgICAgICB0aGlzLm9ic2VydmUoIHZvbHVtZVNsaWRlciApO1xuICAgIH1cblxuICAgIG9ic2VydmUoIGlucHV0IClcbiAgICB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoICdjaGFuZ2UnLCAoIHsgdGFyZ2V0IH0gKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnZvbHVtZSA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRGlzcGxheSggdm9sdW1lRGlzcGxheSApO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzcGxheSggc3BhbiApXG4gICAge1xuICAgICAgICBzcGFuW3RleHRdID0gYCR7dGhpcy5fdm9sdW1lfSAlYDtcbiAgICB9XG5cbiAgICBnZXQgdm9sdW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl92b2x1bWU7XG4gICAgfVxuXG4gICAgc2V0IHZvbHVtZSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDw9IHZhbHVlICYmIDEwMCA+PSB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3ZvbHVtZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG11dGVkKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdXRlZDtcbiAgICB9XG5cbiAgICBzZXQgbXV0ZWQoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX211dGVkID0gISF2YWx1ZTtcbiAgICB9XG59XG4iLCJleHBvcnQgY29uc3Qgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdqcy12b2x1bWUnICk7XG5leHBvcnQgY29uc3Qgdm9sdW1lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnanMtdm9sdW1lLS1kaXNwbGF5JyApO1xuIl19
