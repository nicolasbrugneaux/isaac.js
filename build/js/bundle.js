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

},{"canvas":2,"layers":27}],2:[function(require,module,exports){
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

},{"canvas":2,"images/HUD":20,"store":28}],4:[function(require,module,exports){
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

},{"canvas":2,"components/collectible":8,"components/dynamic-actor":11,"images/items":22,"store":28,"utils/physics/collisions":29}],6:[function(require,module,exports){
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
        var x = _ref.x;
        var y = _ref.y;

        _classCallCheck(this, Character);

        _get(Object.getPrototypeOf(Character.prototype), 'constructor', this).call(this, { width: width, height: height, image: image, x: x, y: y });

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
                this._hp = 0;

                if (this.die) {
                    this.die();
                }

                if (this.respawn) {
                    this._hp = this._originalHp;
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

},{"canvas":2,"components/collectible":8,"images/items":22}],8:[function(require,module,exports){
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

},{"components/static-actor":17}],9:[function(require,module,exports){
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

},{"store":28}],10:[function(require,module,exports){
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

},{"components/static-actor":17}],11:[function(require,module,exports){
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

},{"canvas":2,"components/destructible-static-actor":10,"images/obstacles":24}],13:[function(require,module,exports){
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

var _componentsCharacter = require('components/character');

var _componentsCharacter2 = _interopRequireDefault(_componentsCharacter);

var _canvas = require('canvas');

var _imagesMonsters = require('images/monsters');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _layers = require('layers');

var _utilsPhysicsCollisions = require('utils/physics/collisions');

var Fly = (function (_Character) {
    _inherits(Fly, _Character);

    function Fly(_ref) {
        var x = _ref.x;
        var y = _ref.y;
        var _ref$name = _ref.name;
        var name = _ref$name === undefined ? 'stationary' : _ref$name;

        _classCallCheck(this, Fly);

        _get(Object.getPrototypeOf(Fly.prototype), 'constructor', this).call(this, { x: x, y: y, width: _imagesMonsters.flies.width, height: _imagesMonsters.flies.height, hp: 2, speed: 1.5, image: {
                type: 'sprite',
                src: _imagesMonsters.flies.sprite
            } });

        this._name = name;
        this._state = Math.round(Math.random() * _imagesMonsters.flies[this._name].states);
        this._states = _imagesMonsters.flies[this._name].states;
        this._interval = 50; // ms
        this._then = Date.now();
        this.lastDmg = Date.now();
        this._dmgInterval = 500;
        this.damages = 0.5;
        this.type = 'fly';
    }

    _createClass(Fly, [{
        key: 'updatePosition',
        value: function updatePosition() {
            var _Store$get = _store2['default'].get('player');

            var x = _Store$get.x;
            var y = _Store$get.y;

            switch (this._name) {
                default:
                case 'circling':
                case 'poopOrbital':
                case 'stationary':
                    return;

                case 'homing':
                    var dx = x - this.x;
                    var dy = y - this.y;
                    var deplacement = Math.sqrt(dx * dx + dy * dy);

                    var speedX = this.speed * (dx / deplacement);
                    var speedY = this.speed * (dy / deplacement);

                    this.x += speedX;
                    this.y += speedY;

                    var noFlies = _layers.foreground.map(function (item) {
                        if (item.length) {
                            return item.filter(function (_item) {
                                return !_item instanceof Fly;
                            });
                        }

                        return item;
                    }).filter(function (item) {
                        return item !== _store2['default'].get('obstacles');
                    });

                    var collider = (0, _utilsPhysicsCollisions.isColliding)(this, noFlies);
                    if (collider) {
                        this.x -= speedX;
                        this.y -= speedY;

                        var now = Date.now();
                        if (now - this.lastDmg > this._dmgInterval && 'number' === typeof collider.hp) {
                            this.lastDmg = now;
                            collider.hp -= this.damages;
                        }
                    }

                    break;
            }
        }
    }, {
        key: 'die',
        value: function die() {
            this._name = 'dying';
            this._state = 0;
            this._states = _imagesMonsters.flies[this._name].states;
            this.width = _imagesMonsters.flies[this._name].width;
            this.height = _imagesMonsters.flies[this._name].height;
            this._interval = 75;
        }
    }, {
        key: 'renderSprite',
        value: function renderSprite() {
            var isDying = 'dying' === this._name;

            if (!isDying) {
                this.updatePosition();
            } else if (this._state === this._states - 1) {
                this.active = false;
                return;
            }

            var _ref2 = _imagesMonsters.flies[this._name].position || [0, 0];

            var _ref22 = _slicedToArray(_ref2, 2);

            var x = _ref22[0];
            var y = _ref22[1];

            var now = Date.now();
            if (now - this._then > this._interval) {
                if (isDying) {
                    this._state = this._state + 1;
                } else {
                    this._state = (this._state + 1) % this._states;
                }
                this._then = now;
            }

            x += this.width * this._state;
            _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
        }
    }]);

    return Fly;
})(_componentsCharacter2['default']);

exports['default'] = Fly;
module.exports = exports['default'];

},{"canvas":2,"components/character":6,"images/monsters":23,"layers":27,"store":28,"utils/physics/collisions":29}],14:[function(require,module,exports){
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
                this._direction = direction;
                return direction;
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

},{"../constants":19,"canvas":2,"components/character":6,"components/tear":18,"images/characters":21,"store":28,"utils/physics/collisions":29}],15:[function(require,module,exports){
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

},{"canvas":2,"components/static-actor":17,"images/obstacles":24}],16:[function(require,module,exports){
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

},{"components/actor":4,"images/rooms":25}],17:[function(require,module,exports){
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

},{"components/actor":4}],18:[function(require,module,exports){
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

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

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

            var items = _store2['default'].get('items');
            var collider = (0, _utilsPhysicsCollisions.isColliding)(this, _layers.foreground.filter(function (item) {
                return item !== _this._creator && item !== items;
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

},{"../constants":19,"components/dynamic-actor":11,"images/tears":26,"layers":27,"store":28,"utils/physics/collisions":29}],19:[function(require,module,exports){
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

},{"canvas":2}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var flies = {
    sprite: 'build/img/flies_sprite.png',
    width: 32,
    height: 32,
    stationary: {
        position: [0, 0],
        states: 2
    },
    poopOrbital: {
        position: [64, 0],
        states: 2
    },
    homing: {
        position: [0, 32],
        states: 4
    },
    circling: {
        position: [128, 32],
        states: 2
    },

    dying: {
        width: 64,
        height: 64,
        position: [0, 64],
        states: 12
    }
};

exports.flies = flies;
exports['default'] = {
    flies: flies
};

},{}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultRoom = 'build/img/room.png';

exports.defaultRoom = defaultRoom;
exports['default'] = {
    'default': defaultRoom
};

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var defaultTear = 'build/img/tear.png';

exports.defaultTear = defaultTear;
exports['default'] = {
    'default': defaultTear
};

},{}],27:[function(require,module,exports){
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

var _componentsFly = require('components/fly');

var _componentsFly2 = _interopRequireDefault(_componentsFly);

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

_store2['default'].set('monsters', new _componentsCollection2['default']({ collection: [new _componentsFire2['default']({ x: 703, y: 65 }), new _componentsFire2['default']({ x: 650, y: 65 }), new _componentsFly2['default']({ x: 250, y: 65 }), new _componentsFly2['default']({ x: 300, y: 65, name: 'homing' }), new _componentsFly2['default']({ x: 330, y: 65, name: 'homing' }), new _componentsFly2['default']({ x: 350, y: 65, name: 'homing' }), new _componentsFly2['default']({ x: 360, y: 65, name: 'homing' })], shouldUpdateBeforeRender: true }));

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

},{"components/HUD":3,"components/bomb":5,"components/coin":7,"components/collection":9,"components/fire":12,"components/fly":13,"components/isaac":14,"components/rock":15,"components/room":16,"store":28,"volume-controller":30}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = new Map();
exports["default"] = Store;
module.exports = exports["default"];

},{}],29:[function(require,module,exports){
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

},{"components/collection":9}],30:[function(require,module,exports){
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

},{"volume-elements":31}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var volumeSlider = document.getElementById('js-volume');
exports.volumeSlider = volumeSlider;
var volumeDisplay = document.getElementById('js-volume--display');
exports.volumeDisplay = volumeDisplay;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvaW4uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2ZpcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9mbHkuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3JvY2suanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb29tLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvdGVhci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvaXRlbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL21vbnN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3Jvb21zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy90ZWFycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9sYXllcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvc3RvcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1jb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1lbGVtZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxRQUFROztzQkFDSixRQUFROztBQUUvQyxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLFlBSmlCLFVBQVUsQ0FJaEIsTUFBTSxFQUFFLENBQUM7QUFDcEIsWUFMSyxVQUFVLENBS0osTUFBTSxFQUFFLENBQUM7O0FBRXBCLFlBUkssVUFBVSxDQVFKLFNBQVMsU0FSSCxNQUFNLEVBUU8sQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDOztBQUVyQyx5QkFBcUIsQ0FBRSxJQUFJLENBQUUsQ0FBQztDQUNqQyxDQUFDOztBQUVGLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ2JBLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUUsS0FBSyxDQUFFLENBQUM7UUFBakQsYUFBYSxHQUFiLGFBQWE7QUFDbkIsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQzs7UUFBOUMsVUFBVSxHQUFWLFVBQVU7QUFFaEIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBRSxRQUFRLENBQUUsQ0FBQztRQUE1QyxNQUFNLEdBQU4sTUFBTTtBQUNuQixNQUFNLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO0FBQzlCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUM7UUFBaEMsR0FBRyxHQUFILEdBQUc7Ozs7Ozs7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cmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBkaXNwbGF5Q3R4LCBjYW52YXMgfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZm9yZWdyb3VuZCwgYmFja2dyb3VuZCB9IGZyb20gJ2xheWVycyc7XG5cbmNvbnN0IG1haW4gPSAoKSA9Plxue1xuICAgIGJhY2tncm91bmQucmVuZGVyKCk7XG4gICAgZm9yZWdyb3VuZC5yZW5kZXIoKTtcblxuICAgIGRpc3BsYXlDdHguZHJhd0ltYWdlKCBjYW52YXMsIDAsIDAgKTsgLy8gZHJhdyBzb21ldGhpbmcgdmlzaWJsZSBvbmx5IG9uY2UgcGVyIGZyYW1lLlxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBtYWluICk7XG59O1xuXG5tYWluKCk7XG4iLCJleHBvcnQgY29uc3QgZGlzcGxheUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnYXBwJyApO1xuZXhwb3J0IGNvbnN0IGRpc3BsYXlDdHggPSBkaXNwbGF5Q2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcblxuZXhwb3J0IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7XG5jYW52YXMud2lkdGggPSBkaXNwbGF5Q2FudmFzLndpZHRoO1xuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlDYW52YXMuaGVpZ2h0O1xuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCB7IGhlYXJ0cywgYm9tYnMsIGtleXMsIGNvaW5zLCBoYXJkTW9kZSwgbm9BY2hpZXZlbWVudCB9IGZyb20gJ2ltYWdlcy9IVUQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVURcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXTtcblxuICAgICAgICBjb25zdCBlbGVtZW50cyA9XG4gICAgICAgIHtcbiAgICAgICAgICAgIGhlYXJ0cyxcbiAgICAgICAgICAgIGJvbWJzLFxuICAgICAgICAgICAga2V5cyxcbiAgICAgICAgICAgIGNvaW5zLFxuICAgICAgICAgICAgaGFyZE1vZGUsXG4gICAgICAgICAgICBub0FjaGlldmVtZW50LFxuICAgICAgICB9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKCBlbGVtZW50cyApLmZvckVhY2goIHByb3AgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeyBzcHJpdGUgfSA9IGVsZW1lbnRzW3Byb3BdO1xuICAgICAgICAgICAgdGhpcy5pbWFnZXNbcHJvcF0gPSBzcHJpdGU7XG5cbiAgICAgICAgICAgIGNvbnN0IGltYWdlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbWFnZTogbmV3IEltYWdlKCksXG4gICAgICAgICAgICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlc1twcm9wXSA9IGltYWdlO1xuXG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5vbmxvYWQgPSAoKSA9PiBpbWFnZS5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5zcmMgPSBzcHJpdGU7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5oZWFydHMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhlYXJ0cy53aWR0aCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGhlYXJ0cy5oZWlnaHQgKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDEwO1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFkgPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsSHAgPSBTdG9yZS5nZXQoICdwbGF5ZXInICkuaHA7XG5cbiAgICAgICAgICAgIGxldCBocCA9IG9yaWdpbmFsSHA7XG4gICAgICAgICAgICBsZXQgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgbGV0IHkgPSBpbml0aWFsWTtcblxuICAgICAgICAgICAgbGV0IF9ocCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlICggX2hwIDwgaHAgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhlYXJ0cy5kZWZhdWx0LnBvc2l0aW9uO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfaHAgKyAwLjUgPT09IGhwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmhhbGZkZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgeCArPSB3aWR0aDtcbiAgICAgICAgICAgICAgICBfaHAgKz0gMTtcblxuICAgICAgICAgICAgICAgIGlmICggNyA8IF9ocCAmJiA4ID49IF9ocCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ICs9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbml0aWFsWSA9IDQwO1xuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmNvaW5zLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gY29pbnMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBjb2lucy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJDb2lucyA9IFN0b3JlLmdldCggJ3BsYXllckl0ZW1zJyApLmdldCggJ2NvaW4nICk7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHBsYXllckNvaW5zID8gcGxheWVyQ29pbnMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBjb2lucy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmNvaW5zLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBjb2lucy53aWR0aCwgY29pbnMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IDAgPT09IGNvdW50ID8gJ3JnYigxNzUsIDE3NSwgMTc1KScgOiAncmdiKDIyNSwgMjI1LCAyMjUpJztcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE0cHggbW9ub3NwYWNlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoIGAke2NvdW50fWAsIGluaXRpYWxYICsgd2lkdGggKyAzLCBpbml0aWFsWSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuYm9tYnMucmVhZHkgKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGJvbWJzLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gYm9tYnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQm9tYnMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKS5nZXQoICdib21iJyApO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJCb21icyA/IHBsYXllckJvbWJzLnF1YW50aXR5IDogMDtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gYm9tYnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5ib21icy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgYm9tYnMud2lkdGgsIGJvbWJzLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCBgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmtleXMucmVhZHkgKVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGtleXMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBrZXlzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcktleXMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKS5nZXQoICdrZXknICk7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHBsYXllcktleXMgPyBwbGF5ZXJLZXlzLnF1YW50aXR5IDogMDtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0ga2V5cy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmtleXMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGtleXMud2lkdGgsIGtleXMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQgKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IDAgPT09IGNvdW50ID8gJ3JnYigxNzUsIDE3NSwgMTc1KScgOiAncmdiKDIyNSwgMjI1LCAyMjUpJztcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE0cHggbW9ub3NwYWNlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoIGAke2NvdW50fWAsIGluaXRpYWxYICsgd2lkdGggKyAzLCBpbml0aWFsWSApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBTdG9yZS5nZXQoICdoYXJkTW9kZScgKSAmJiB0aGlzLl9pbWFnZXMuaGFyZE1vZGUucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBoYXJkTW9kZS53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGhhcmRNb2RlLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGFyZE1vZGUuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oYXJkTW9kZS5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGFyZE1vZGUud2lkdGgsIGhhcmRNb2RlLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIFN0b3JlLmdldCggJ25vQWNoaWV2ZW1lbnQnICkgJiYgdGhpcy5faW1hZ2VzLm5vQWNoaWV2ZW1lbnQucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBub0FjaGlldmVtZW50LndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9BY2hpZXZlbWVudC5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IG5vQWNoaWV2ZW1lbnQuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5ub0FjaGlldmVtZW50LmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBub0FjaGlldmVtZW50LndpZHRoLCBub0FjaGlldmVtZW50LmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHg9bnVsbCwgeT1udWxsLCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9IClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZSB8fCBudWxsO1xuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldEltYWdlKCBpbWFnZSwgdHlwZT0naW1hZ2UnIClcbiAgICB7XG4gICAgICAgIGlmICggJ2NhbnZhcycgPT09IHR5cGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGltYWdlICE9PSB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICBzcmM6IGltYWdlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGNlbnRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQoIHRoaXMuX3ggKTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoIHRoaXMuX3kgKTtcbiAgICAgICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdyZWQnO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlICYmIHRoaXMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICdpbWFnZScgPT09IHRoaXMuaW1hZ2UudHlwZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHkgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCAnc3ByaXRlJyA9PT0gdGhpcy5pbWFnZS50eXBlICYmIHRoaXMucmVuZGVyU3ByaXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclNwcml0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3RpYmxlIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlibGUnO1xuaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGJvbWJzIH0gZnJvbSAnaW1hZ2VzL2l0ZW1zJztcbmltcG9ydCBnZXRDb2xsaWRlcnMgZnJvbSAndXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5cbmNsYXNzIEJvbWJBY3RvciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogYm9tYnMud2lkdGgsIGhlaWdodDogYm9tYnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGJvbWJzLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDEuMDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDYwOyAvLyB0aW1lIGJldHdlZW4gZnJhbWVzIG9mIGV4cGxvc2lvblxuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgIH1cblxuICAgIGRyb3AoKVxuICAgIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCA6OnRoaXMucmVuZGVyRXhwbG9zaW9uLCA0MDAwICk7IC8vIDQgc2Vjb25kcyBhZnRlclxuXG4gICAgICAgIFN0b3JlLmdldCggJ3RlYXJzJyApLnB1c2goIHRoaXMgKTtcbiAgICB9XG5cbiAgICByZW5kZXJFeHBsb3Npb24oKVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGJvbWJzLmV4cGxvc2lvbi53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBib21icy5leHBsb3Npb24uaGVpZ2h0O1xuICAgICAgICB0aGlzLnNldEltYWdlKCBib21icy5leHBsb3Npb24uc3ByaXRlLCAnc3ByaXRlJyApO1xuICAgICAgICB0aGlzLmlzRXhwbG9kaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBERVNUUk9ZIEFMTCBUSEUgVEhJTkdTIE5PV1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBsZXQgeCwgeTtcbiAgICAgICAgbGV0IF94LCBfeTtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoIHRoaXMuaXNFeHBsb2RpbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICBbeCwgeV0gPSBbdGhpcy5fc3RhdGUgKiB0aGlzLndpZHRoLCAwLCBdO1xuICAgICAgICAgICAgW194LCBfeV0gPSBbdGhpcy5feCAtIGJvbWJzLndpZHRoLCB0aGlzLl95IC0gYm9tYnMuaGVpZ2h0ICogMiwgXTtcblxuICAgICAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlICs9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5fc3RhdGUgPT09IGJvbWJzLmV4cGxvc2lvbi5zdGF0ZXMgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoICF0aGlzLmlzRXhwbG9kaW5nIClcbiAgICAgICAge1xuICAgICAgICAgICAgWyB4LCB5IF0gPSBib21icy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgW194LCBfeV0gPSBbdGhpcy5feCwgdGhpcy5feSwgXTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBfeCwgX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb21iIGV4dGVuZHMgQ29sbGVjdGlibGVcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMC4yID4gTWF0aC5yYW5kb20oKSA/IDIgOiAxO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBib21iTmFtZSA9IDEgPT09IHRoaXMucXVhbnRpdHkgPyAnZGVmYXVsdCcgOiAnZG91YmxlJztcbiAgICAgICAgY29uc3QgWyB4LCB5IF0gPSBib21ic1tib21iTmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cblxuICAgIHRvSXRlbSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2JvbWInLFxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHksXG4gICAgICAgICAgICBpc0Ryb3BwYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0b0Ryb3BwYWJsZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gQm9tYkFjdG9yOyAvLyByZXR1cm4gdGhlIGNsYXNzIHNvIHRoZSB3ZWFyZXIgY2FuIGRvIG5ldyBvbiBpdC5cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAsIHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgeCwgeSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsSHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWUgPD0gKCB0aGlzLm1heEhwIHx8IDE2ICkgPyB2YWx1ZSA6IHRoaXMubWF4SHAgfHwgMTY7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIDAgPj0gdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5kaWUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZGllKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdGhpcy5yZXNwYXduIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX29yaWdpbmFsSHA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlibGUgZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aWJsZSc7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgY29pbnMgfSBmcm9tICdpbWFnZXMvaXRlbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2luIGV4dGVuZHMgQ29sbGVjdGlibGVcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGNvaW5zLndpZHRoLCBoZWlnaHQ6IGNvaW5zLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBjb2lucy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICBjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKCAoIE1hdGgucmFuZG9tKCkgKiBjb2lucy5zdGF0ZXMgKSApO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBjb2lucy5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoIDAuMSA8IHJhbmQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIDAuMDUgPCByYW5kIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDU7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ25pY2tlbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIDAuMDIgPCByYW5kIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDEwO1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICdkaW1lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggMC4wMDUgPCByYW5kIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDI1O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICdxdWFydGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIHNwcml0ZSBmb3IgdGhlIGJpZyBtb25leXogeWV0LlxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgLy8gY29uc3QgWyB4LCB5IF0gPSBjb2luc1t0aGlzLl9uYW1lXS5wb3NpdGlvbiB8fCBbMCwgMCwgXTtcbiAgICAgICAgLy8gY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAoIHRoaXMuX3N0YXRlICsgMSApICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb2luJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RpYmxlIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCAndG9JdGVtKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCcgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgQXJyYXlcbntcbiAgICBjb25zdHJ1Y3RvciggeyBjb2xsZWN0aW9uPVtdLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI9ZmFsc2UsIHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyPWZhbHNlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wdXNoKCAuLi5jb2xsZWN0aW9uICk7XG5cbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyID0gc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyO1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciA9IHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KClcbiAgICB7XG4gICAgICAgIHJldHVybiAwID09PSB0aGlzLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZW1vdmUoIGl0ZW0gKVxuICAgIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4T2YoIGl0ZW0gKTtcblxuICAgICAgICBpZiAoIC0xIDwgaW5kZXggKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV3VGhpcyA9IFtdO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmICggaXRlbS51cGRhdGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggZmFsc2UgPT09IGl0ZW0uYWN0aXZlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ucmVuZGVyRGVzdHJveSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0uaW5hY3RpdmVMYXllcjtcbiAgICAgICAgICAgICAgICBpZiAoIGxheWVyIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN0b3JlLmdldCggbGF5ZXIgKS5wdXNoKCBpdGVtICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5ld1RoaXMucHVzaCggaXRlbSApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBuZXdUaGlzLmxlbmd0aCAhPT0gbGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGxlbiAtIDEgKTtcblxuICAgICAgICAgICAgZm9yICggbGV0IGogPSAwLCBsZW5qID0gbmV3VGhpcy5sZW5ndGg7IGogPCBsZW5qOyBqKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNbal0gPSBuZXdUaGlzW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSB0aGlzLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpc1tpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIGhwIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDwgdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgMjU2O1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgIH1cbn1cbiIsImltcG9ydCBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL2Rlc3RydWN0aWJsZS1zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZpcmUsIGZpcmVCYXNlIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpcmUgZXh0ZW5kcyBEZXN0cnVjdGlibGVTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogZmlyZS53aWR0aCwgaGVpZ2h0OiBmaXJlLmhlaWdodCwgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogZmlyZS5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9zdGF0ZSA9IE1hdGgucm91bmQoICggTWF0aC5yYW5kb20oKSAqIGZpcmUuc3RhdGVzICkgKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gZmlyZS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgIH1cblxuICAgIGdldCBpbmFjdGl2ZUxheWVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiAnYmFja2dyb3VuZE9ic3RhY2xlcyc7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGxldCBbIHdvb2RYLCB3b29kWSBdID0gdGhpcy5hY3RpdmUgPyBmaXJlQmFzZS5wb3NpdGlvbiA6IGZpcmVCYXNlLmRlYWRQb3NpdGlvbjtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHdvb2RYLCB3b29kWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3kgKyAxNywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBpZiAoICF0aGlzLmFjdGl2ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlcyA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENoYXJhY3RlciBmcm9tICdjb21wb25lbnRzL2NoYXJhY3Rlcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZmxpZXMgfSBmcm9tICdpbWFnZXMvbW9uc3RlcnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHkgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5LCBuYW1lPSdzdGF0aW9uYXJ5JyB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBmbGllcy53aWR0aCwgaGVpZ2h0OiBmbGllcy5oZWlnaHQsIGhwOiAyLCBzcGVlZDogMS41LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZsaWVzLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IE1hdGgucm91bmQoICggTWF0aC5yYW5kb20oKSAqIGZsaWVzW3RoaXMuX25hbWVdLnN0YXRlcyApICk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZsaWVzW3RoaXMuX25hbWVdLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA1MDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMubGFzdERtZyA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSAwLjU7XG4gICAgICAgIHRoaXMudHlwZSA9ICdmbHknO1xuICAgIH1cblxuICAgIHVwZGF0ZVBvc2l0aW9uKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gU3RvcmUuZ2V0KCAncGxheWVyJyApO1xuXG4gICAgICAgIHN3aXRjaCAoIHRoaXMuX25hbWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAnY2lyY2xpbmcnOlxuICAgICAgICAgICAgY2FzZSAncG9vcE9yYml0YWwnOlxuICAgICAgICAgICAgY2FzZSAnc3RhdGlvbmFyeSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBjYXNlICdob21pbmcnOlxuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0geCAtIHRoaXMueDtcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IHkgLSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSBNYXRoLnNxcnQoICggZHggKiBkeCApICsgKCBkeSAqIGR5ICkgKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWVkWCA9IHRoaXMuc3BlZWQgKiAoIGR4IC8gZGVwbGFjZW1lbnQgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZFkgPSB0aGlzLnNwZWVkICogKCBkeSAvIGRlcGxhY2VtZW50ICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gc3BlZWRYO1xuICAgICAgICAgICAgICAgIHRoaXMueSArPSBzcGVlZFk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBub0ZsaWVzID0gZm9yZWdyb3VuZFxuICAgICAgICAgICAgICAgICAgICAubWFwKCBpdGVtID0+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggaXRlbS5sZW5ndGggKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpbHRlciggX2l0ZW0gPT4gIV9pdGVtIGluc3RhbmNlb2YgRmx5ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgICAgICAgICB9IClcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlciggaXRlbSA9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbSAhPT0gU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApO1xuICAgICAgICAgICAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBjb2xsaWRlciA9IGlzQ29sbGlkaW5nKCB0aGlzLCBub0ZsaWVzICk7XG4gICAgICAgICAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gc3BlZWRYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gc3BlZWRZO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggbm93IC0gdGhpcy5sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgJiYgJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocCApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdERtZyA9IG5vdztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLmhwIC09IHRoaXMuZGFtYWdlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGllKClcbiAgICB7XG4gICAgICAgIHRoaXMuX25hbWUgPSAnZHlpbmcnO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZsaWVzW3RoaXMuX25hbWVdLnN0YXRlcztcbiAgICAgICAgdGhpcy53aWR0aCA9IGZsaWVzW3RoaXMuX25hbWVdLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGZsaWVzW3RoaXMuX25hbWVdLmhlaWdodDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA3NTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNEeWluZyA9ICdkeWluZycgPT09IHRoaXMuX25hbWU7XG5cbiAgICAgICAgaWYgKCAhaXNEeWluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGhpcy5fc3RhdGUgPT09IHRoaXMuX3N0YXRlcyAtIDEgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFsgeCwgeSBdID0gZmxpZXNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIGlzRHlpbmcgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5fc3RhdGUgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICB4ICs9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBTdG9yZS5nZXQoICd0ZWFycycgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuICAgICAgICB0aGlzLmNvbGxpZGluZ1dpZHRoID0gdGhpcy53aWR0aCAtIDI7XG4gICAgICAgIHRoaXMuY29sbGlkaW5nSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSAxMDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IDE2O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IHRoaXMuX2tleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uZGVsZXRlKCBlLmtleUNvZGUgKSApO1xuXG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcblxuICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJlxuICAgICAgICAgICAgTElNSVRfTEVGVF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFRfSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRYID0gdGhpcy5feDtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSBvbGRYO1xuXG4gICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feSAmJlxuICAgICAgICAgICAgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRZID0gdGhpcy5feTtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcblxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICkgKTtcblxuICAgICAgICAgICAgaWYgKCAhZW5lbXkgJiYgIWlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICkgKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja3VwSXRlbXMoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuX3kgPSBvbGRZO1xuXG4gICAgICAgICAgICBpZiAoIGVuZW15ICYmIG5vdyAtIHRoaXMuX2xhc3REbWcgPiB0aGlzLl9kbWdJbnRlcnZhbCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCAtPSBlbmVteS5kYW1hZ2VzIHx8IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdERtZyA9IG5vdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcGlja3VwSXRlbXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBTdG9yZS5nZXQoICdpdGVtcycgKTtcbiAgICAgICAgY29uc3QgcGxheWVySXRlbXMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlibGUgPSBpc0NvbGxpZGluZyggdGhpcywgaXRlbXMgKTtcblxuICAgICAgICBpZiAoICFjb2xsZWN0aWJsZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zLnJlbW92ZSggY29sbGVjdGlibGUgKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGNvbGxlY3RpYmxlLnRvSXRlbSgpO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGl0ZW0ucXVhbnRpdHk7IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggaXRlbS50eXBlICkgfHwgeyBxdWFudGl0eTogMCwgaXRlbXM6IFtdLCB9O1xuXG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgKz0gMTtcblxuICAgICAgICAgICAgaWYgKCBpdGVtLmlzRHJvcHBhYmxlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0l0ZW0uaXRlbXMucHVzaCggY29sbGVjdGlibGUudG9Ecm9wcGFibGUoKSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoIGl0ZW0udHlwZSwgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7IHg6IDAsIHk6IDEsIH07XG5cbiAgICAgICAgaWYgKCAwID09PSBkZXBsYWNlbWVudCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCA9PT0ga2V5c0Rvd24uc2l6ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0gJiYgZXhpc3RpbmdJdGVtLnF1YW50aXR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbQm9tYiwgLi4uYm9tYnNdID0gZXhpc3RpbmdJdGVtLml0ZW1zO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zID0gYm9tYnM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IG5ldyBCb21iKCB7IHgsIHksIH0gKTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoICdib21iJywgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMucHVzaCggbmV3IFRlYXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICBjcmVhdG9yOiB0aGlzLFxuICAgICAgICAgICAgZGFtYWdlczogdGhpcy5kYW1hZ2VzLFxuICAgICAgICB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmICF4ICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnVwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5kb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCAwLCAyNSwgMTgsIDE0LCB0aGlzLl94ICsgNSwgdGhpcy5feSArIDIwLCAxOCwgMTQgKTtcbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IHJvY2tzIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogNTAsIGhlaWdodDogNTEsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogcm9ja3Muc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gMC4wNSA+IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gdGhpcy5faXNTcGVjaWFsID8gcm9ja3Muc3BlY2lhbC5wb3NpdGlvbiA6IHJvY2tzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJvb20gfSBmcm9tICdpbWFnZXMvcm9vbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyBpbWFnZSwgfSA9IHsgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0Um9vbSwgfSwgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UsIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIGRpcmVjdGlvbiwgc3BlZWQsIGNyZWF0b3IsIGRhbWFnZXMgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMTMsIGhlaWdodDogMTMsIGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFRlYXIsIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCA0O1xuICAgICAgICB0aGlzLl9jcmVhdG9yID0gY3JlYXRvcjtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gZGFtYWdlcztcblxuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IGRpcmVjdGlvbi54ICogdGhpcy5fc3BlZWQ7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gZGlyZWN0aW9uLnkgKiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgaWYgKCBMSU1JVF9MRUZUIC0gdGhpcy53aWR0aCA+IHRoaXMuX3ggfHwgdGhpcy5feCA+IExJTUlUX1JJR0hUICsgdGhpcy53aWR0aCB8fFxuICAgICAgICAgICAgTElNSVRfVE9QIC0gdGhpcy5oZWlnaHQgPiB0aGlzLl95IHx8IHRoaXMuX3kgPiBMSU1JVF9CT1RUT00gKyB0aGlzLmhlaWdodCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKCBpdGVtID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtICE9PSB0aGlzLl9jcmVhdG9yICYmIGl0ZW0gIT09IGl0ZW1zO1xuICAgICAgICB9ICkgKTtcbiAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocCApXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaWRlci5ocCAtPSB0aGlzLmRhbWFnZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMueFZlbG9jaXR5O1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5hY3RpdmUgJiYgdGhpcy5pbkJvdW5kcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMgfSBmcm9tICdjYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QX0lTQUFDID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NX0lTQUFDID0gY2FudmFzLmhlaWdodCAtIDk1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlRfSVNBQUMgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVF9JU0FBQyA9IGNhbnZhcy53aWR0aCAtIDg1O1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDY1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlQgPSA2MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVCA9IGNhbnZhcy53aWR0aCAtIDc1O1xuXG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCJleHBvcnQgY29uc3QgaGVhcnRzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaGVhcnRzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGVtcHR5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBoYWxmZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDAsIF0sXG4gICAgfSxcbiAgICBzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZnNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDE2LCBdLFxuICAgIH0sXG4gICAgZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZmV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAxNiwgXSxcbiAgICB9LFxuICAgIHJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZnJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzY0LCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAxNiwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGtleXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsxNiwgMCwgXSxcbiAgICB9LFxuICAgIGdvbGRlbjpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDE2LCBdLFxuICAgIH0sXG59O1xuXG5cbmV4cG9ydCBjb25zdCBjb2lucyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBoYXJkTW9kZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgbm9BY2hpZXZlbWVudCA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAxNiwgXSxcbiAgICB9LFxufTtcblxuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGhlYXJ0cyxcbiAgICBib21icyxcbiAgICBrZXlzLFxuICAgIGNvaW5zLFxuICAgIGhhcmRNb2RlLFxuICAgIG5vQWNoaWV2ZW1lbnQsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGlzYWFjID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaXNhYWNfc3ByaXRlX2N1c3RvbS5wbmcnLFxuICAgIGhlYWQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMjgsXG4gICAgICAgIGhlaWdodDogMjUsXG4gICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFswLCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDQsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA2LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDIsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzI4LCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDUsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA3LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDMsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBsZWdzOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE4LFxuICAgICAgICBoZWlnaHQ6IDE0LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMjUsIF0sXG4gICAgICAgICAgICB1cDogWzE4ICogNSwgMjUsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMCwgMjUsIF0sXG4gICAgICAgICAgICByaWdodDogWzAsIDI1LCBdLFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGlzYWFjLFxufTtcbiIsImV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2JvbWJzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBkb3VibGU6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG4gICAgZXhwbG9zaW9uOlxuICAgIHtcbiAgICAgICAgc3ByaXRlOiAnYnVpbGQvaW1nL2V4cGxvc2lvbl9zcHJpdGUucG5nJyxcbiAgICAgICAgd2lkdGg6IDk2LFxuICAgICAgICBoZWlnaHQ6IDk2LFxuICAgICAgICBzdGF0ZXM6IDEyLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgY29pbnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9jb2luc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMjAsXG4gICAgaGVpZ2h0OiAxNSxcbiAgICBzdGF0ZXM6IDYsXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGJvbWJzLFxufTtcbiIsImV4cG9ydCBjb25zdCBmbGllcyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2ZsaWVzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIHN0YXRpb25hcnk6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgICAgIHN0YXRlczogMixcbiAgICB9LFxuICAgIHBvb3BPcmJpdGFsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs2NCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgaG9taW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAzMiwgXSxcbiAgICAgICAgc3RhdGVzOiA0LFxuICAgIH0sXG4gICAgY2lyY2xpbmc6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzEyOCwgMzIsIF0sXG4gICAgICAgIHN0YXRlczogMixcbiAgICB9LFxuXG4gICAgZHlpbmc6XG4gICAge1xuICAgICAgICB3aWR0aDogNjQsXG4gICAgICAgIGhlaWdodDogNjQsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgNjQsIF0sXG4gICAgICAgIHN0YXRlczogMTIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZmxpZXMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE3MCxcbiAgICBoZWlnaHQ6IDE3MixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxuICAgIHNwZWNpYWw6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFsxNzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBmaXJlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZmlyZV9zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzEsXG4gICAgaGVpZ2h0OiAzNCxcbiAgICBzdGF0ZXM6IDYsXG59O1xuXG5cbmV4cG9ydCBjb25zdCBmaXJlQmFzZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2RlYWRmaXJlX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIHBvc2l0aW9uOiBbMCwgMzQsIF0sXG4gICAgZGVhZFBvc2l0aW9uOiBbMzIsIDM0LCBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICByb2NrcyxcbiAgICBmaXJlLFxuICAgIGZpcmVCYXNlLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0Um9vbSA9ICdidWlsZC9pbWcvcm9vbS5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRSb29tLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0VGVhciA9ICdidWlsZC9pbWcvdGVhci5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUZWFyLFxufTtcbiIsImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IFJvb20gZnJvbSAnY29tcG9uZW50cy9yb29tJztcbmltcG9ydCBIVUQgZnJvbSAnY29tcG9uZW50cy9IVUQnO1xuaW1wb3J0IFJvY2sgZnJvbSAnY29tcG9uZW50cy9yb2NrJztcbmltcG9ydCBGaXJlIGZyb20gJ2NvbXBvbmVudHMvZmlyZSc7XG5pbXBvcnQgRmx5IGZyb20gJ2NvbXBvbmVudHMvZmx5JztcbmltcG9ydCBCb21iIGZyb20gJ2NvbXBvbmVudHMvYm9tYic7XG5pbXBvcnQgQ29pbiBmcm9tICdjb21wb25lbnRzL2NvaW4nO1xuaW1wb3J0IElzYWFjIGZyb20gJ2NvbXBvbmVudHMvaXNhYWMnO1xuaW1wb3J0IFZvbHVtZUNvbnRyb2xsZXIgZnJvbSAndm9sdW1lLWNvbnRyb2xsZXInO1xuXG5TdG9yZS5zZXQoICdyb29tJywgbmV3IFJvb20oKSApO1xuU3RvcmUuc2V0KCAnSFVEJywgbmV3IEhVRCgpICk7XG5TdG9yZS5zZXQoICdub0FjaGlldmVtZW50JywgdHJ1ZSApO1xuU3RvcmUuc2V0KCAnaGFyZE1vZGUnLCBmYWxzZSApO1xuU3RvcmUuc2V0KCAnc291bmRzJywgbmV3IFZvbHVtZUNvbnRyb2xsZXIoKSApO1xuU3RvcmUuc2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246IFtdLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAndGVhcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBSb2NrKCB7IHg6IDQ1MCwgeTogMTIwLCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiAxMTYsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDExNiwgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBCb21iKCB7IHg6IDgyLCB5OiAzNTYsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAxNDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDE2MCwgeTogMzc1LCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogMTgwLCB5OiAzNzUsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAyMDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDY4MCwgeTogODAsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiA2ODAsIHk6IDY1LCB9ICksXG5dLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBGaXJlKCB7IHg6IDcwMywgeTogNjUsIH0gKSxcbiAgICBuZXcgRmlyZSggeyB4OiA2NTAsIHk6IDY1LCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAyNTAsIHk6IDY1LCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAzMDAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSApLFxuICAgIG5ldyBGbHkoIHsgeDogMzMwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0gKSxcbiAgICBuZXcgRmx5KCB7IHg6IDM1MCwgeTogNjUsIG5hbWU6ICdob21pbmcnLCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAzNjAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAncGxheWVyJywgbmV3IElzYWFjKCkgKTtcblN0b3JlLnNldCggJ3BsYXllckl0ZW1zJywgbmV3IE1hcCgpICk7XG5cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIFN0b3JlLmdldCggJ3Jvb20nICksXG4gICAgU3RvcmUuZ2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycgKSxcbiAgICBTdG9yZS5nZXQoICdIVUQnICksXG5dLCB9ICk7XG5cbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICksXG4gICAgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICksXG4gICAgU3RvcmUuZ2V0KCAnaXRlbXMnICksXG4gICAgU3RvcmUuZ2V0KCAndGVhcnMnICksXG4gICAgU3RvcmUuZ2V0KCAncGxheWVyJyApLFxuXSwgfSApO1xuXG5cbndpbmRvdy5TdG9yZSA9IFN0b3JlO1xud2luZG93LlBsYXllciA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcbndpbmRvdy5pdGVtcyA9IFN0b3JlLmdldCggJ2l0ZW1zJyApO1xuLy9cbi8vIGV4cG9ydCBjb25zdCBvYnN0YWNsZXMgPSBmb3JlZ3JvdW5kWzBdO1xuLy8gZXhwb3J0IGNvbnN0IG1vbnN0ZXJzID0gZm9yZWdyb3VuZFsxXTtcbi8vIGV4cG9ydCBjb25zdCBwbGF5ZXIgPSBmb3JlZ3JvdW5kWzJdO1xuIiwiY29uc3QgU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2xsaWRlcnMgPSAoIHRhcmdldCwgb3RoZXIgKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKCB0YXJnZXQgPT09IG90aGVyIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG90aGVyICkgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IFtdO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgX2NvbGxpZGVycyA9IGdldENvbGxpZGVycyggdGFyZ2V0LCBvdGhlcltpXSApO1xuXG4gICAgICAgICAgICBpZiAoIF9jb2xsaWRlcnMgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbGxpZGVycy5wdXNoLmFwcGx5KCBjb2xsaWRlcnMsIF9jb2xsaWRlcnMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsaWRlcnMubGVuZ3RoID8gY29sbGlkZXJzIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAoIGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcCApXG4gICAge1xuICAgICAgICByZXR1cm4gW290aGVyLCBdO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NvbGxpZGluZyA9ICggdGFyZ2V0LCBvdGhlciApID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAoIHRhcmdldCA9PT0gb3RoZXIgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHggPSB0YXJnZXQueDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldC5jb2xsaWRpbmdXaWR0aCB8fCB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5jb2xsaWRpbmdIZWlnaHQgfHwgdGFyZ2V0LmhlaWdodDtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggb3RoZXIgKSB8fCBvdGhlciBpbnN0YW5jZW9mIENvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRhcmdldCwgb3RoZXJbaV0gKTtcbiAgICAgICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaWRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIuY29sbGlkaW5nV2lkdGggfHwgb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5jb2xsaWRpbmdIZWlnaHQgfHwgb3RoZXIuaGVpZ2h0O1xuXG4gICAgY29uc3QgdG9wID0geSArIGhlaWdodCA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCA8PSBfeSArIF9oZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHggKyB3aWR0aCA+PSBfeDtcblxuICAgIGlmICggbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wIClcbiAgICB7XG4gICAgICAgIHJldHVybiBvdGhlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuIiwiaW1wb3J0IHsgdm9sdW1lU2xpZGVyLCB2b2x1bWVEaXNwbGF5IH0gZnJvbSAndm9sdW1lLWVsZW1lbnRzJztcblxuY29uc3QgdGV4dCA9ICd1bmRlZmluZWQnID09PSB0eXBlb2Ygdm9sdW1lRGlzcGxheS5pbm5lclRleHQgPyAndGV4dENvbnRlbnQnIDogJ2lubmVyVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb2x1bWVDb250cm9sbGVyXG57XG4gICAgY29uc3RydWN0b3IoIHZvbHVtZT01MCwgbXV0ZWQ9ZmFsc2UgKVxuICAgIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoIHZvbHVtZURpc3BsYXkgKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlKCB2b2x1bWVTbGlkZXIgKTtcbiAgICB9XG5cbiAgICBvYnNlcnZlKCBpbnB1dCApXG4gICAge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgKCB7IHRhcmdldCB9ICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoIHZvbHVtZURpc3BsYXkgKTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoIHNwYW4gKVxuICAgIHtcbiAgICAgICAgc3Bhblt0ZXh0XSA9IGAke3RoaXMuX3ZvbHVtZX0gJWA7XG4gICAgfVxuXG4gICAgZ2V0IHZvbHVtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdm9sdW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8PSB2YWx1ZSAmJiAxMDAgPj0gdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl92b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtdXRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXV0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IG11dGVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9tdXRlZCA9ICEhdmFsdWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHZvbHVtZVNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnanMtdm9sdW1lJyApO1xuZXhwb3J0IGNvbnN0IHZvbHVtZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2pzLXZvbHVtZS0tZGlzcGxheScgKTtcbiJdfQ==
