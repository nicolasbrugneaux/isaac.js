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

},{"../constants":19,"components/dynamic-actor":11,"images/tears":26,"layers":27,"utils/physics/collisions":29}],19:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvaW4uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2ZpcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9mbHkuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3JvY2suanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb29tLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvdGVhci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvaXRlbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL21vbnN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3Jvb21zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy90ZWFycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9sYXllcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvc3RvcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1jb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1lbGVtZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxRQUFROztzQkFDSixRQUFROztBQUUvQyxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLFlBSmlCLFVBQVUsQ0FJaEIsTUFBTSxFQUFFLENBQUM7QUFDcEIsWUFMSyxVQUFVLENBS0osTUFBTSxFQUFFLENBQUM7O0FBRXBCLFlBUkssVUFBVSxDQVFKLFNBQVMsU0FSSCxNQUFNLEVBUU8sQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDOztBQUVyQyx5QkFBcUIsQ0FBRSxJQUFJLENBQUUsQ0FBQztDQUNqQyxDQUFDOztBQUVGLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ2JBLElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUUsS0FBSyxDQUFFLENBQUM7UUFBakQsYUFBYSxHQUFiLGFBQWE7QUFDbkIsSUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUUsQ0FBQzs7UUFBOUMsVUFBVSxHQUFWLFVBQVU7QUFFaEIsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBRSxRQUFRLENBQUUsQ0FBQztRQUE1QyxNQUFNLEdBQU4sTUFBTTtBQUNuQixNQUFNLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7QUFDbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO0FBQzlCLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUM7UUFBaEMsR0FBRyxHQUFILEdBQUc7Ozs7Ozs7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Z0JBQWdCLENBQUUsUUFBUSxFQUFFLFVBQUUsSUFBVSxFQUM5QztvQkFEc0MsTUFBTSxHQUFSLElBQVUsQ0FBUixNQUFNOztBQUV4QyxzQkFBSyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMzQixzQkFBSyxhQUFhLGlCQW5CUCxhQUFhLENBbUJXLENBQUM7YUFDdkMsQ0FBRSxDQUFDO1NBQ1A7OztlQUVZLHVCQUFFLElBQUksRUFDbkI7QUFDSSxnQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFNLElBQUksQ0FBQyxPQUFPLE9BQUksQ0FBQztTQUNwQzs7O2FBRVMsZUFDVjtBQUNJLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDdkI7YUFFUyxhQUFFLEtBQUssRUFDakI7QUFDSSxnQkFBSyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQy9CO0FBQ0ksb0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1NBQ0o7OzthQUVRLGVBQ1Q7QUFDSSxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3RCO2FBRVEsYUFBRSxLQUFLLEVBQ2hCO0FBQ0ksZ0JBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN6Qjs7O1dBOUNnQixnQkFBZ0I7OztxQkFBaEIsZ0JBQWdCOzs7Ozs7Ozs7QUNIOUIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBRSxXQUFXLENBQUUsQ0FBQztRQUF0RCxZQUFZLEdBQVosWUFBWTtBQUNsQixJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFFLG9CQUFvQixDQUFFLENBQUM7UUFBaEUsYUFBYSxHQUFiLGFBQWEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZvcmVncm91bmQsIGJhY2tncm91bmQgfSBmcm9tICdsYXllcnMnO1xuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBiYWNrZ3JvdW5kLnJlbmRlcigpO1xuICAgIGZvcmVncm91bmQucmVuZGVyKCk7XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBoZWFydHMsIGJvbWJzLCBrZXlzLCBjb2lucywgaGFyZE1vZGUsIG5vQWNoaWV2ZW1lbnQgfSBmcm9tICdpbWFnZXMvSFVEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFydHMsXG4gICAgICAgICAgICBib21icyxcbiAgICAgICAgICAgIGtleXMsXG4gICAgICAgICAgICBjb2lucyxcbiAgICAgICAgICAgIGhhcmRNb2RlLFxuICAgICAgICAgICAgbm9BY2hpZXZlbWVudCxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3Qua2V5cyggZWxlbWVudHMgKS5mb3JFYWNoKCBwcm9wID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3ByaXRlIH0gPSBlbGVtZW50c1twcm9wXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW3Byb3BdID0gc3ByaXRlO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXNbcHJvcF0gPSBpbWFnZTtcblxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uub25sb2FkID0gKCkgPT4gaW1hZ2UucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uuc3JjID0gc3ByaXRlO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuaGVhcnRzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBoZWFydHMud2lkdGggKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoZWFydHMuaGVpZ2h0ICogMS41O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxZID0gMTA7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbEhwID0gU3RvcmUuZ2V0KCAncGxheWVyJyApLmhwO1xuXG4gICAgICAgICAgICBsZXQgaHAgPSBvcmlnaW5hbEhwO1xuICAgICAgICAgICAgbGV0IHggPSBpbml0aWFsWDtcbiAgICAgICAgICAgIGxldCB5ID0gaW5pdGlhbFk7XG5cbiAgICAgICAgICAgIGxldCBfaHAgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoIF9ocCA8IGhwIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuZGVmYXVsdC5wb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmICggX2hwICsgMC41ID09PSBocCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhlYXJ0cy5oYWxmZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHggKz0gd2lkdGg7XG4gICAgICAgICAgICAgICAgX2hwICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoIDcgPCBfaHAgJiYgOCA+PSBfaHAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeSArPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHggPSBpbml0aWFsWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5pdGlhbFkgPSA0MDtcblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5jb2lucy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNvaW5zLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29pbnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQ29pbnMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKS5nZXQoICdjb2luJyApO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJDb2lucyA/IHBsYXllckNvaW5zLnF1YW50aXR5IDogMDtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gY29pbnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5jb2lucy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgY29pbnMud2lkdGgsIGNvaW5zLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCBgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmJvbWJzLnJlYWR5IClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBib21icy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGJvbWJzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvbWJzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAnYm9tYicgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQm9tYnMgPyBwbGF5ZXJCb21icy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuYm9tYnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGJvbWJzLndpZHRoLCBib21icy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYCR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCArIDMsIGluaXRpYWxZICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5rZXlzLnJlYWR5IClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBrZXlzLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0ga2V5cy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJLZXlzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAna2V5JyApO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJLZXlzID8gcGxheWVyS2V5cy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGtleXMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5rZXlzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBrZXlzLndpZHRoLCBrZXlzLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCBgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggU3RvcmUuZ2V0KCAnaGFyZE1vZGUnICkgJiYgdGhpcy5faW1hZ2VzLmhhcmRNb2RlLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGFyZE1vZGUud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoYXJkTW9kZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhhcmRNb2RlLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGFyZE1vZGUuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhhcmRNb2RlLndpZHRoLCBoYXJkTW9kZS5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBTdG9yZS5nZXQoICdub0FjaGlldmVtZW50JyApICYmIHRoaXMuX2ltYWdlcy5ub0FjaGlldmVtZW50LnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gbm9BY2hpZXZlbWVudC53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG5vQWNoaWV2ZW1lbnQuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBub0FjaGlldmVtZW50LmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMubm9BY2hpZXZlbWVudC5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgbm9BY2hpZXZlbWVudC53aWR0aCwgbm9BY2hpZXZlbWVudC5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4PW51bGwsIHk9bnVsbCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2UgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbWFnZSggaW1hZ2UsIHR5cGU9J2ltYWdlJyApXG4gICAge1xuICAgICAgICBpZiAoICdjYW52YXMnID09PSB0eXBlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBpbWFnZSAhPT0gdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgc3JjOiBpbWFnZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCB0aGlzLl94ICk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCB0aGlzLl95ICk7XG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSAmJiB0aGlzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCAnaW1hZ2UnID09PSB0aGlzLmltYWdlLnR5cGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICggJ3Nwcml0ZScgPT09IHRoaXMuaW1hZ2UudHlwZSAmJiB0aGlzLnJlbmRlclNwcml0ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTcHJpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBib21icyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5pbXBvcnQgZ2V0Q29sbGlkZXJzIGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5jbGFzcyBCb21iQWN0b3IgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxLjA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA2MDsgLy8gdGltZSBiZXR3ZWVuIGZyYW1lcyBvZiBleHBsb3Npb25cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB9XG5cbiAgICBkcm9wKClcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCggOjp0aGlzLnJlbmRlckV4cGxvc2lvbiwgNDAwMCApOyAvLyA0IHNlY29uZHMgYWZ0ZXJcblxuICAgICAgICBTdG9yZS5nZXQoICd0ZWFycycgKS5wdXNoKCB0aGlzICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRXhwbG9zaW9uKClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSBib21icy5leHBsb3Npb24ud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gYm9tYnMuZXhwbG9zaW9uLmhlaWdodDtcbiAgICAgICAgdGhpcy5zZXRJbWFnZSggYm9tYnMuZXhwbG9zaW9uLnNwcml0ZSwgJ3Nwcml0ZScgKTtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gREVTVFJPWSBBTEwgVEhFIFRISU5HUyBOT1dcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgbGV0IHgsIHk7XG4gICAgICAgIGxldCBfeCwgX3k7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmlzRXhwbG9kaW5nIClcbiAgICAgICAge1xuICAgICAgICAgICAgW3gsIHldID0gW3RoaXMuX3N0YXRlICogdGhpcy53aWR0aCwgMCwgXTtcbiAgICAgICAgICAgIFtfeCwgX3ldID0gW3RoaXMuX3ggLSBib21icy53aWR0aCwgdGhpcy5feSAtIGJvbWJzLmhlaWdodCAqIDIsIF07XG5cbiAgICAgICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSArPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuX3N0YXRlID09PSBib21icy5leHBsb3Npb24uc3RhdGVzIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAhdGhpcy5pc0V4cGxvZGluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIFsgeCwgeSBdID0gYm9tYnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIFtfeCwgX3ldID0gW3RoaXMuX3gsIHRoaXMuX3ksIF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgX3gsIF95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9tYiBleHRlbmRzIENvbGxlY3RpYmxlXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBib21icy53aWR0aCwgaGVpZ2h0OiBib21icy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogYm9tYnMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDAuMiA+IE1hdGgucmFuZG9tKCkgPyAyIDogMTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgYm9tYk5hbWUgPSAxID09PSB0aGlzLnF1YW50aXR5ID8gJ2RlZmF1bHQnIDogJ2RvdWJsZSc7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gYm9tYnNbYm9tYk5hbWVdLnBvc2l0aW9uIHx8IFswLCAwLCBdO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdib21iJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICAgICAgaXNEcm9wcGFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdG9Ecm9wcGFibGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIEJvbWJBY3RvcjsgLy8gcmV0dXJuIHRoZSBjbGFzcyBzbyB0aGUgd2VhcmVyIGNhbiBkbyBuZXcgb24gaXQuXG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIG5hbWUsIGhwLCB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHgsIHksIH0gKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbEhwID0gaHA7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGdldCBuYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdDYW5cXCd0IGNoYW5nZSBuYW1lLCBuYW1lIHNldHRlcjonICsgdmFsdWUgKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDwgdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlIDw9ICggdGhpcy5tYXhIcCB8fCAxNiApID8gdmFsdWUgOiB0aGlzLm1heEhwIHx8IDE2O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwID49IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZGllIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMucmVzcGF3biApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9vcmlnaW5hbEhwO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcGF3bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3RpYmxlIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlibGUnO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGNvaW5zIH0gZnJvbSAnaW1hZ2VzL2l0ZW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29pbiBleHRlbmRzIENvbGxlY3RpYmxlXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBjb2lucy53aWR0aCwgaGVpZ2h0OiBjb2lucy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogY29pbnMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgY29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTWF0aC5yb3VuZCggKCBNYXRoLnJhbmRvbSgpICogY29pbnMuc3RhdGVzICkgKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gY29pbnMuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKCAwLjEgPCByYW5kIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwLjA1IDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSA1O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICduaWNrZWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwLjAyIDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAxMDtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnZGltZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIDAuMDA1IDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAyNTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAncXVhcnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBzcHJpdGUgZm9yIHRoZSBiaWcgbW9uZXl6IHlldC5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIC8vIGNvbnN0IFsgeCwgeSBdID0gY29pbnNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnY29pbicsXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aWJsZSBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ3RvSXRlbSgpIG11c3QgYmUgaW1wbGVtZW50ZWQnICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5XG57XG4gICAgY29uc3RydWN0b3IoIHsgY29sbGVjdGlvbj1bXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyPWZhbHNlLCBzaG91bGRVcGRhdGVBZnRlclJlbmRlcj1mYWxzZSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHVzaCggLi4uY29sbGVjdGlvbiApO1xuXG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciA9IHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgPSBzaG91bGRVcGRhdGVBZnRlclJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gMCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCBpdGVtIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleE9mKCBpdGVtICk7XG5cbiAgICAgICAgaWYgKCAtMSA8IGluZGV4IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG5ld1RoaXMgPSBbXTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIGl0ZW0udXBkYXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGZhbHNlID09PSBpdGVtLmFjdGl2ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLnJlbmRlckRlc3Ryb3kgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5kZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBpdGVtLmluYWN0aXZlTGF5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKCBsYXllciApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTdG9yZS5nZXQoIGxheWVyICkucHVzaCggaXRlbSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuZXdUaGlzLnB1c2goIGl0ZW0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggbmV3VGhpcy5sZW5ndGggIT09IGxlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKCBsZW4gLSAxICk7XG5cbiAgICAgICAgICAgIGZvciAoIGxldCBqID0gMCwgbGVuaiA9IG5ld1RoaXMubGVuZ3RoOyBqIDwgbGVuajsgaisrIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzW2pdID0gbmV3VGhpc1tqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciAmJiAhdGhpcy5pc0VtcHR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgbGVuID0gdGhpcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXNbaV0ucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX3Nob3VsZFVwZGF0ZUFmdGVyUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvc3RhdGljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBocCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDI1NjtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmaXJlLCBmaXJlQmFzZSB9IGZyb20gJ2ltYWdlcy9vYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlIGV4dGVuZHMgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGZpcmUud2lkdGgsIGhlaWdodDogZmlyZS5oZWlnaHQsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZpcmUuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKCAoIE1hdGgucmFuZG9tKCkgKiBmaXJlLnN0YXRlcyApICk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZpcmUuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDAuNTtcbiAgICB9XG5cbiAgICBnZXQgaW5hY3RpdmVMYXllcigpXG4gICAge1xuICAgICAgICByZXR1cm4gJ2JhY2tncm91bmRPYnN0YWNsZXMnO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBsZXQgWyB3b29kWCwgd29vZFkgXSA9IHRoaXMuYWN0aXZlID8gZmlyZUJhc2UucG9zaXRpb24gOiBmaXJlQmFzZS5kZWFkUG9zaXRpb247XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB3b29kWCwgd29vZFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95ICsgMTcsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5hY3RpdmUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZXMgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnY29tcG9uZW50cy9jaGFyYWN0ZXInO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZsaWVzIH0gZnJvbSAnaW1hZ2VzL21vbnN0ZXJzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcbmltcG9ydCB7IGlzQ29sbGlkaW5nIH0gZnJvbSAndXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx5IGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgbmFtZT0nc3RhdGlvbmFyeScgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogZmxpZXMud2lkdGgsIGhlaWdodDogZmxpZXMuaGVpZ2h0LCBocDogMiwgc3BlZWQ6IDEuNSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmbGllcy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKCAoIE1hdGgucmFuZG9tKCkgKiBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXMgKSApO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNTA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmxhc3REbWcgPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgICAgICB0aGlzLnR5cGUgPSAnZmx5JztcbiAgICB9XG5cbiAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9uYW1lIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhc2UgJ2NpcmNsaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ3Bvb3BPcmJpdGFsJzpcbiAgICAgICAgICAgIGNhc2UgJ3N0YXRpb25hcnknOlxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSAnaG9taW5nJzpcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IHggLSB0aGlzLng7XG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSB5IC0gdGhpcy55O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gTWF0aC5zcXJ0KCAoIGR4ICogZHggKSArICggZHkgKiBkeSApICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZFggPSB0aGlzLnNwZWVkICogKCBkeCAvIGRlcGxhY2VtZW50ICk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlZWRZID0gdGhpcy5zcGVlZCAqICggZHkgLyBkZXBsYWNlbWVudCApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHNwZWVkWDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gc3BlZWRZO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9GbGllcyA9IGZvcmVncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLm1hcCggaXRlbSA9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGl0ZW0ubGVuZ3RoIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWx0ZXIoIF9pdGVtID0+ICFfaXRlbSBpbnN0YW5jZW9mIEZseSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoIGl0ZW0gPT5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gIT09IFN0b3JlLmdldCggJ29ic3RhY2xlcycgKTtcbiAgICAgICAgICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGhpcywgbm9GbGllcyApO1xuICAgICAgICAgICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IHNwZWVkWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IHNwZWVkWTtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIG5vdyAtIHRoaXMubGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsICYmICdudW1iZXInID09PSB0eXBlb2YgY29sbGlkZXIuaHAgKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3REbWcgPSBub3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5ocCAtPSB0aGlzLmRhbWFnZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZSgpXG4gICAge1xuICAgICAgICB0aGlzLl9uYW1lID0gJ2R5aW5nJztcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXM7XG4gICAgICAgIHRoaXMud2lkdGggPSBmbGllc1t0aGlzLl9uYW1lXS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBmbGllc1t0aGlzLl9uYW1lXS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNzU7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGlzRHlpbmcgPSAnZHlpbmcnID09PSB0aGlzLl9uYW1lO1xuXG4gICAgICAgIGlmICggIWlzRHlpbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX3N0YXRlID09PSB0aGlzLl9zdGF0ZXMgLSAxIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBbIHgsIHkgXSA9IGZsaWVzW3RoaXMuX25hbWVdLnBvc2l0aW9uIHx8IFswLCAwLCBdO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCBpc0R5aW5nIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgeCArPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMsIGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICdjb21wb25lbnRzL2NoYXJhY3Rlcic7XG5pbXBvcnQgVGVhciBmcm9tICdjb21wb25lbnRzL3RlYXInO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1BfSVNBQUMsXG4gICAgTElNSVRfQk9UVE9NX0lTQUFDLFxuICAgIExJTUlUX0xFRlRfSVNBQUMsXG4gICAgTElNSVRfUklHSFRfSVNBQUMsXG4gICAgS0VZX1VQLFxuICAgIEtFWV9ET1dOLFxuICAgIEtFWV9MRUZULFxuICAgIEtFWV9SSUdIVCxcbiAgICBLRVlfVyxcbiAgICBLRVlfUyxcbiAgICBLRVlfQSxcbiAgICBLRVlfRCxcbiAgICBLRVlfU1BBQ0UsXG59IGZyb20gJy4uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBpc2FhYyB9IGZyb20gJ2ltYWdlcy9jaGFyYWN0ZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXNhYWMgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMjgsIGhlaWdodDogMzUsIHNwZWVkOiAyMDAsIG5hbWU6ICdJc2FhYycsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGlzYWFjLnNwcml0ZSxcbiAgICAgICAgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gU3RvcmUuZ2V0KCAndGVhcnMnICk7XG4gICAgICAgIHRoaXMuX2F0dGFja1NwZWVkID0gNTAwOyAvLyAxIHNob290IC8gc2Vjb25kXG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDE7XG4gICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IHsgeDogMCwgeTogMSwgfTtcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdXaWR0aCA9IHRoaXMud2lkdGggLSAyO1xuICAgICAgICB0aGlzLmNvbGxpZGluZ0hlaWdodCA9IHRoaXMuaGVpZ2h0IC0gMTA7XG4gICAgICAgIHRoaXMubWF4SHAgPSAxNjtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5hZGQoIGUua2V5Q29kZSApICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXl1cCcsICggZSApID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZSggZS5rZXlDb2RlICkgKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiZcbiAgICAgICAgICAgIExJTUlUX0xFRlRfSVNBQUMgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX1JJR0hUX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdtb25zdGVycycgKSApO1xuXG4gICAgICAgICAgICBpZiAoICFlbmVteSAmJiAhaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ29ic3RhY2xlcycgKSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgbm93IC0gdGhpcy5fbGFzdERtZyA+IHRoaXMuX2RtZ0ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0RG1nID0gbm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3kgJiZcbiAgICAgICAgICAgIExJTUlUX1RPUF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfQk9UVE9NX0lTQUFDIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgb2xkWSA9IHRoaXMuX3k7XG4gICAgICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG5cbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLl95ID0gb2xkWTtcblxuICAgICAgICAgICAgaWYgKCBlbmVteSAmJiBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuaHAgLT0gZW5lbXkuZGFtYWdlcyB8fCAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHBpY2t1cEl0ZW1zKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxlY3RpYmxlID0gaXNDb2xsaWRpbmcoIHRoaXMsIGl0ZW1zICk7XG5cbiAgICAgICAgaWYgKCAhY29sbGVjdGlibGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoIGNvbGxlY3RpYmxlICk7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBjb2xsZWN0aWJsZS50b0l0ZW0oKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoIGl0ZW0udHlwZSApIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmICggaXRlbS5pc0Ryb3BwYWJsZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zLnB1c2goIGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxheWVySXRlbXMuc2V0KCBpdGVtLnR5cGUsIGV4aXN0aW5nSXRlbSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKCB0aW1lLCBub3cgKVxuICAgIHtcbiAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSB0aGlzLnNwZWVkICogdGltZTtcbiAgICAgICAgY29uc3Qga2V5c0Rvd24gPSB0aGlzLl9rZXlzRG93bjtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuXG4gICAgICAgIGlmICggMCA9PT0gZGVwbGFjZW1lbnQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIDAgPT09IGtleXNEb3duLnNpemUgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0gJiYgZXhpc3RpbmdJdGVtLnF1YW50aXR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbQm9tYiwgLi4uYm9tYnNdID0gZXhpc3RpbmdJdGVtLml0ZW1zO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zID0gYm9tYnM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IG5ldyBCb21iKCB7IHgsIHksIH0gKTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoICdib21iJywgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMucHVzaCggbmV3IFRlYXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICBjcmVhdG9yOiB0aGlzLFxuICAgICAgICAgICAgZGFtYWdlczogdGhpcy5kYW1hZ2VzLFxuICAgICAgICB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmICF4ICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnVwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5kb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCAwLCAyNSwgMTgsIDE0LCB0aGlzLl94ICsgNSwgdGhpcy5feSArIDIwLCAxOCwgMTQgKTtcbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IHJvY2tzIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogNTAsIGhlaWdodDogNTEsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogcm9ja3Muc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gMC4wNSA+IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gdGhpcy5faXNTcGVjaWFsID8gcm9ja3Muc3BlY2lhbC5wb3NpdGlvbiA6IHJvY2tzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJvb20gfSBmcm9tICdpbWFnZXMvcm9vbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyBpbWFnZSwgfSA9IHsgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0Um9vbSwgfSwgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UsIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAxMywgaGVpZ2h0OiAxMywgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0VGVhciwgfSwgfSApO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICBpZiAoIExJTUlUX0xFRlQgLSB0aGlzLndpZHRoID4gdGhpcy5feCB8fCB0aGlzLl94ID4gTElNSVRfUklHSFQgKyB0aGlzLndpZHRoIHx8XG4gICAgICAgICAgICBMSU1JVF9UT1AgLSB0aGlzLmhlaWdodCA+IHRoaXMuX3kgfHwgdGhpcy5feSA+IExJTUlUX0JPVFRPTSArIHRoaXMuaGVpZ2h0IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGhpcywgZm9yZWdyb3VuZC5maWx0ZXIoIGl0ZW0gPT4gaXRlbSAhPT0gdGhpcy5fY3JlYXRvciApICk7XG4gICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICdudW1iZXInID09PSB0eXBlb2YgY29sbGlkZXIuaHAgKVxuICAgICAgICAgICAge1xuXG4gICAgICAgICAgICAgICAgY29sbGlkZXIuaHAgLT0gdGhpcy5kYW1hZ2VzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCArPSB0aGlzLnhWZWxvY2l0eTtcbiAgICAgICAgdGhpcy5feSArPSB0aGlzLnlWZWxvY2l0eTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuYWN0aXZlICYmIHRoaXMuaW5Cb3VuZHM7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUF9JU0FBQyA9IDQwO1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTV9JU0FBQyA9IGNhbnZhcy5oZWlnaHQgLSA5NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUX0lTQUFDID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFRfSVNBQUMgPSBjYW52YXMud2lkdGggLSA4NTtcblxuZXhwb3J0IGNvbnN0IExJTUlUX1RPUCA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0JPVFRPTSA9IGNhbnZhcy5oZWlnaHQgLSA2NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNjA7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA3NTtcblxuZXhwb3J0IGNvbnN0IEtFWV9VUCA9IDM4O1xuZXhwb3J0IGNvbnN0IEtFWV9ET1dOID0gNDA7XG5leHBvcnQgY29uc3QgS0VZX0xFRlQgPSAzNztcbmV4cG9ydCBjb25zdCBLRVlfUklHSFQgPSAzOTtcbmV4cG9ydCBjb25zdCBLRVlfU1BBQ0UgPSAzMjtcbmV4cG9ydCBjb25zdCBLRVlfVyA9IDg3O1xuZXhwb3J0IGNvbnN0IEtFWV9BID0gNjU7XG5leHBvcnQgY29uc3QgS0VZX1MgPSA4MztcbmV4cG9ydCBjb25zdCBLRVlfRCA9IDY4O1xuIiwiZXhwb3J0IGNvbnN0IGhlYXJ0cyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2hlYXJ0c19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBlbXB0eTpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDAsIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZmRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAwLCBdLFxuICAgIH0sXG4gICAgc3Bpcml0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAxNiwgXSxcbiAgICB9LFxuICAgIGV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAxNiwgXSxcbiAgICB9LFxuICAgIGhhbGZldmlsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMTYsIF0sXG4gICAgfSxcbiAgICByZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs0OCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZyZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs2NCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMTYsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBrZXlzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDAsIF0sXG4gICAgfSxcbiAgICBnb2xkZW46XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzE2LCAxNiwgXSxcbiAgICB9LFxufTtcblxuXG5leHBvcnQgY29uc3QgY29pbnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgaGFyZE1vZGUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG5vQWNoaWV2ZW1lbnQgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMTYsIF0sXG4gICAgfSxcbn07XG5cblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBoZWFydHMsXG4gICAgYm9tYnMsXG4gICAga2V5cyxcbiAgICBjb2lucyxcbiAgICBoYXJkTW9kZSxcbiAgICBub0FjaGlldmVtZW50LFxufTtcbiIsImV4cG9ydCBjb25zdCBpc2FhYyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2lzYWFjX3Nwcml0ZV9jdXN0b20ucG5nJyxcbiAgICBoZWFkOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDI4LFxuICAgICAgICBoZWlnaHQ6IDI1LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA0LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNiwgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAyLCAwLCBdLFxuICAgICAgICB9LFxuICAgICAgICBzaG9vdGluZ0RpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFsyOCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbMjggKiA1LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWzI4ICogNywgMCwgXSxcbiAgICAgICAgICAgIHJpZ2h0OiBbMjggKiAzLCAwLCBdLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzAsIDI1LCBdLFxuICAgICAgICAgICAgdXA6IFsxOCAqIDUsIDI1LCBdLFxuICAgICAgICAgICAgbGVmdDogWzAsIDI1LCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFswLCAyNSwgXSxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBpc2FhYyxcbn07XG4iLCJleHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9ib21ic19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgIH0sXG4gICAgZG91YmxlOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxuICAgIGV4cGxvc2lvbjpcbiAgICB7XG4gICAgICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9leHBsb3Npb25fc3ByaXRlLnBuZycsXG4gICAgICAgIHdpZHRoOiA5NixcbiAgICAgICAgaGVpZ2h0OiA5NixcbiAgICAgICAgc3RhdGVzOiAxMixcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvY29pbnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDIwLFxuICAgIGhlaWdodDogMTUsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3QgZmxpZXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9mbGllc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBzdGF0aW9uYXJ5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAwLCBdLFxuICAgICAgICBzdGF0ZXM6IDIsXG4gICAgfSxcbiAgICBwb29wT3JiaXRhbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbNjQsIDAsIF0sXG4gICAgICAgIHN0YXRlczogMixcbiAgICB9LFxuICAgIGhvbWluZzpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMzIsIF0sXG4gICAgICAgIHN0YXRlczogNCxcbiAgICB9LFxuICAgIGNpcmNsaW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsxMjgsIDMyLCBdLFxuICAgICAgICBzdGF0ZXM6IDIsXG4gICAgfSxcblxuICAgIGR5aW5nOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDY0LFxuICAgICAgICBoZWlnaHQ6IDY0LFxuICAgICAgICBwb3NpdGlvbjogWzAsIDY0LCBdLFxuICAgICAgICBzdGF0ZXM6IDEyLFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGZsaWVzLFxufTtcbiIsImV4cG9ydCBjb25zdCByb2NrcyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL3JvY2tzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAxNzAsXG4gICAgaGVpZ2h0OiAxNzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxNzAsXG4gICAgICAgIGhlaWdodDogMTcyLFxuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBzcGVjaWFsOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMTcwLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZmlyZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2ZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMxLFxuICAgIGhlaWdodDogMzQsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuXG5leHBvcnQgY29uc3QgZmlyZUJhc2UgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9kZWFkZmlyZV9zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBwb3NpdGlvbjogWzAsIDM0LCBdLFxuICAgIGRlYWRQb3NpdGlvbjogWzMyLCAzNCwgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgcm9ja3MsXG4gICAgZmlyZSxcbiAgICBmaXJlQmFzZSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFRlYXIgPSAnYnVpbGQvaW1nL3RlYXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0VGVhcixcbn07XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcbmltcG9ydCBSb29tIGZyb20gJ2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgSFVEIGZyb20gJ2NvbXBvbmVudHMvSFVEJztcbmltcG9ydCBSb2NrIGZyb20gJ2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICdjb21wb25lbnRzL2ZpcmUnO1xuaW1wb3J0IEZseSBmcm9tICdjb21wb25lbnRzL2ZseSc7XG5pbXBvcnQgQm9tYiBmcm9tICdjb21wb25lbnRzL2JvbWInO1xuaW1wb3J0IENvaW4gZnJvbSAnY29tcG9uZW50cy9jb2luJztcbmltcG9ydCBJc2FhYyBmcm9tICdjb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBWb2x1bWVDb250cm9sbGVyIGZyb20gJ3ZvbHVtZS1jb250cm9sbGVyJztcblxuU3RvcmUuc2V0KCAncm9vbScsIG5ldyBSb29tKCkgKTtcblN0b3JlLnNldCggJ0hVRCcsIG5ldyBIVUQoKSApO1xuU3RvcmUuc2V0KCAnbm9BY2hpZXZlbWVudCcsIHRydWUgKTtcblN0b3JlLnNldCggJ2hhcmRNb2RlJywgZmFsc2UgKTtcblN0b3JlLnNldCggJ3NvdW5kcycsIG5ldyBWb2x1bWVDb250cm9sbGVyKCkgKTtcblN0b3JlLnNldCggJ2JhY2tncm91bmRPYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOiBbXSwgfSApICk7XG5cblN0b3JlLnNldCggJ3RlYXJzJywgbmV3IENvbGxlY3Rpb24oIHsgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnb2JzdGFjbGVzJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgUm9jayggeyB4OiA0NTAsIHk6IDEyMCwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDY1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDExNiwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDExNSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTY1LCB5OiAxMTYsIH0gKSxcbl0sIHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjogdHJ1ZSwgfSApICk7XG5cblN0b3JlLnNldCggJ2l0ZW1zJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgQm9tYiggeyB4OiA4MiwgeTogMzU2LCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogMTQwLCB5OiAzNzUsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAxNjAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDE4MCwgeTogMzc1LCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogMjAwLCB5OiAzNzUsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiA2ODAsIHk6IDgwLCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogNjgwLCB5OiA2NSwgfSApLFxuXSwgfSApICk7XG5cblN0b3JlLnNldCggJ21vbnN0ZXJzJywgbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBuZXcgRmlyZSggeyB4OiA3MDMsIHk6IDY1LCB9ICksXG4gICAgbmV3IEZpcmUoIHsgeDogNjUwLCB5OiA2NSwgfSApLFxuICAgIG5ldyBGbHkoIHsgeDogMjUwLCB5OiA2NSwgfSApLFxuICAgIG5ldyBGbHkoIHsgeDogMzAwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0gKSxcbiAgICBuZXcgRmx5KCB7IHg6IDMzMCwgeTogNjUsIG5hbWU6ICdob21pbmcnLCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAzNTAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSApLFxuICAgIG5ldyBGbHkoIHsgeDogMzYwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0gKSxcbl0sIHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjogdHJ1ZSwgfSApICk7XG5cblN0b3JlLnNldCggJ3BsYXllcicsIG5ldyBJc2FhYygpICk7XG5TdG9yZS5zZXQoICdwbGF5ZXJJdGVtcycsIG5ldyBNYXAoKSApO1xuXG5cbmV4cG9ydCBjb25zdCBiYWNrZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdyb29tJyApLFxuICAgIFN0b3JlLmdldCggJ2JhY2tncm91bmRPYnN0YWNsZXMnICksXG4gICAgU3RvcmUuZ2V0KCAnSFVEJyApLFxuXSwgfSApO1xuXG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZCA9IG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246XG5bXG4gICAgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApLFxuICAgIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApLFxuICAgIFN0b3JlLmdldCggJ2l0ZW1zJyApLFxuICAgIFN0b3JlLmdldCggJ3RlYXJzJyApLFxuICAgIFN0b3JlLmdldCggJ3BsYXllcicgKSxcbl0sIH0gKTtcblxuXG53aW5kb3cuU3RvcmUgPSBTdG9yZTtcbndpbmRvdy5QbGF5ZXIgPSBTdG9yZS5nZXQoICdwbGF5ZXInICk7XG53aW5kb3cuaXRlbXMgPSBTdG9yZS5nZXQoICdpdGVtcycgKTtcbi8vXG4vLyBleHBvcnQgY29uc3Qgb2JzdGFjbGVzID0gZm9yZWdyb3VuZFswXTtcbi8vIGV4cG9ydCBjb25zdCBtb25zdGVycyA9IGZvcmVncm91bmRbMV07XG4vLyBleHBvcnQgY29uc3QgcGxheWVyID0gZm9yZWdyb3VuZFsyXTtcbiIsImNvbnN0IFN0b3JlID0gbmV3IE1hcCgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29sbGlkZXJzID0gKCB0YXJnZXQsIG90aGVyICkgPT5cbntcbiAgICAvLyBpZ25vcmUgY29sbGlzaW9uIHdpdGggc2VsZlxuICAgIGlmICggdGFyZ2V0ID09PSBvdGhlciApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKCBBcnJheS5pc0FycmF5KCBvdGhlciApIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbiApXG4gICAge1xuICAgICAgICBjb25zdCBjb2xsaWRlcnMgPSBbXTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IF9jb2xsaWRlcnMgPSBnZXRDb2xsaWRlcnMoIHRhcmdldCwgb3RoZXJbaV0gKTtcblxuICAgICAgICAgICAgaWYgKCBfY29sbGlkZXJzIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xsaWRlcnMucHVzaC5hcHBseSggY29sbGlkZXJzLCBfY29sbGlkZXJzICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlkZXJzLmxlbmd0aCA/IGNvbGxpZGVycyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKCBsZWZ0ICYmIHJpZ2h0ICYmIGJvdHRvbSAmJiB0b3AgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtvdGhlciwgXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgaXNDb2xsaWRpbmcgPSAoIHRhcmdldCwgb3RoZXIgKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKCB0YXJnZXQgPT09IG90aGVyIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG90aGVyICkgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIGZvciAoIGxldCBpID0gMCwgbGVuID0gb3RoZXIubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBjb2xsaWRlciA9IGlzQ29sbGlkaW5nKCB0YXJnZXQsIG90aGVyW2ldICk7XG4gICAgICAgICAgICBpZiAoIGNvbGxpZGVyIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGlkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAoIGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcCApXG4gICAge1xuICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbiIsImltcG9ydCB7IHZvbHVtZVNsaWRlciwgdm9sdW1lRGlzcGxheSB9IGZyb20gJ3ZvbHVtZS1lbGVtZW50cyc7XG5cbmNvbnN0IHRleHQgPSAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHZvbHVtZURpc3BsYXkuaW5uZXJUZXh0ID8gJ3RleHRDb250ZW50JyA6ICdpbm5lclRleHQnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVm9sdW1lQ29udHJvbGxlclxue1xuICAgIGNvbnN0cnVjdG9yKCB2b2x1bWU9NTAsIG11dGVkPWZhbHNlIClcbiAgICB7XG4gICAgICAgIHRoaXMudm9sdW1lID0gdm9sdW1lO1xuICAgICAgICB0aGlzLm11dGVkID0gbXV0ZWQ7XG5cbiAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCB2b2x1bWVEaXNwbGF5ICk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSggdm9sdW1lU2xpZGVyICk7XG4gICAgfVxuXG4gICAgb2JzZXJ2ZSggaW5wdXQgKVxuICAgIHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciggJ2NoYW5nZScsICggeyB0YXJnZXQgfSApID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudm9sdW1lID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCB2b2x1bWVEaXNwbGF5ICk7XG4gICAgICAgIH0gKTtcbiAgICB9XG5cbiAgICB1cGRhdGVEaXNwbGF5KCBzcGFuIClcbiAgICB7XG4gICAgICAgIHNwYW5bdGV4dF0gPSBgJHt0aGlzLl92b2x1bWV9ICVgO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgICB9XG5cbiAgICBzZXQgdm9sdW1lKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPD0gdmFsdWUgJiYgMTAwID49IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fdm9sdW1lID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbXV0ZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX211dGVkO1xuICAgIH1cblxuICAgIHNldCBtdXRlZCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbXV0ZWQgPSAhIXZhbHVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2b2x1bWVTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2pzLXZvbHVtZScgKTtcbmV4cG9ydCBjb25zdCB2b2x1bWVEaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdqcy12b2x1bWUtLWRpc3BsYXknICk7XG4iXX0=
