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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

            var newLength = newThis.length;

            if (newLength !== len) {
                this.length = newLength;

                for (var i = 0; i < newLength; i++) {
                    this[i] = newThis[i];
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (this._shouldUpdateBeforeRender && !this.isEmpty) {
                this.update();
            }

            this.forEach(function (item) {
                return item.render();
            });

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                        if (item === _store2['default'].get('monsters')) {
                            return item.filter(function (i) {
                                return !(i instanceof Fly);
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

                        if (collider.canTakeDamage && collider.canTakeDamage({ update: true })) {
                            collider.hp -= this.damages;
                        }
                    }

                    break;
            }
        }
    }, {
        key: 'die',
        value: function die() {
            var _this = this;

            this._name = 'dying';
            this._state = 0;
            this.damages = 0;
            this._states = _imagesMonsters.flies[this._name].states;
            this.width = _imagesMonsters.flies[this._name].width;
            this.height = _imagesMonsters.flies[this._name].height;
            this._interval = 75;

            _store2['default'].set('monsters', _store2['default'].get('monsters').filter(function (monster) {
                return _this !== monster;
            }));
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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        key: 'canTakeDamage',
        value: function canTakeDamage(_ref) {
            var update = _ref.update;

            var now = Date.now();
            var canTakeDamage = now - this._lastDmg > this._dmgInterval;

            if (update && canTakeDamage) {
                this._lastDmg = now;
            }

            return canTakeDamage;
        }
    }, {
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

                if (enemy && this.canTakeDamage({ update: true })) {
                    this.hp -= enemy.damages || 1;
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

                this._y = oldY;

                if (enemy && this.canTakeDamage({ update: true })) {
                    this.hp -= enemy.damages || 1;
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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvaW4uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2ZpcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9mbHkuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3JvY2suanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9yb29tLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvdGVhci5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb25zdGFudHMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL0hVRC5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMvaXRlbXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL21vbnN0ZXJzLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvaW1hZ2VzL3Jvb21zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2ltYWdlcy90ZWFycy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9sYXllcnMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvc3RvcmUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1jb250cm9sbGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL3ZvbHVtZS1lbGVtZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O3NCQ0FtQyxRQUFROztzQkFDSixRQUFROztBQUUvQyxJQUFNLElBQUksR0FBRyxTQUFQLElBQUksR0FDVjtBQUNJLHVCQUFXLE1BQU0sRUFBRSxDQUFDO0FBQ3BCLHVCQUFXLE1BQU0sRUFBRSxDQUFDOztBQUVwQix1QkFBVyxTQUFTLGlCQUFVLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQzs7QUFFckMseUJBQXFCLENBQUUsSUFBSSxDQUFFLENBQUM7Q0FDakMsQ0FBQzs7QUFFRixJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7QUNiQSxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFFLEtBQUssQ0FBRSxDQUFDOztBQUN2RCxJQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBRSxDQUFDOzs7QUFFcEQsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBRSxRQUFRLENBQUUsQ0FBQzs7QUFDekQsTUFBTSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztBQUM5QixJQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDTnpCLFFBQVE7O3FCQUNWLE9BQU87Ozs7eUJBQzJDLFlBQVk7O0lBRTNELEdBQUc7QUFFVCxhQUZNLEdBQUcsR0FHcEI7Ozs4QkFIaUIsR0FBRzs7QUFJaEIsWUFBSSxDQUFDLE1BQU0s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QkFBSyxDQUFDLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxVQUFFLElBQVUsRUFDOUM7b0JBRHNDLE1BQU0sR0FBUixJQUFVLENBQVIsTUFBTTs7QUFFeEMsc0JBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDM0Isc0JBQUssYUFBYSwrQkFBaUIsQ0FBQzthQUN2QyxDQUFFLENBQUM7U0FDUDs7O2VBRVksdUJBQUUsSUFBSSxFQUNuQjtBQUNJLGdCQUFJLENBQUMsSUFBSSxDQUFDLEdBQU0sSUFBSSxDQUFDLE9BQU8sT0FBSSxDQUFDO1NBQ3BDOzs7YUFFUyxlQUNWO0FBQ0ksbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2QjthQUVTLGFBQUUsS0FBSyxFQUNqQjtBQUNJLGdCQUFLLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFDL0I7QUFDSSxvQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEI7U0FDSjs7O2FBRVEsZUFDVDtBQUNJLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7YUFFUSxhQUFFLEtBQUssRUFDaEI7QUFDSSxnQkFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3pCOzs7V0E5Q2dCLGdCQUFnQjs7O3FCQUFoQixnQkFBZ0I7Ozs7Ozs7OztBQ0g5QixJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFFLFdBQVcsQ0FBRSxDQUFDOztBQUM1RCxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFFLG9CQUFvQixDQUFFLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZvcmVncm91bmQsIGJhY2tncm91bmQgfSBmcm9tICdsYXllcnMnO1xuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBiYWNrZ3JvdW5kLnJlbmRlcigpO1xuICAgIGZvcmVncm91bmQucmVuZGVyKCk7XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZSggY2FudmFzLCAwLCAwICk7IC8vIGRyYXcgc29tZXRoaW5nIHZpc2libGUgb25seSBvbmNlIHBlciBmcmFtZS5cblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggbWFpbiApO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2FwcCcgKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCAnMmQnICk7XG5cbmV4cG9ydCBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnY2FudmFzJyApO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCggJzJkJyApO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBoZWFydHMsIGJvbWJzLCBrZXlzLCBjb2lucywgaGFyZE1vZGUsIG5vQWNoaWV2ZW1lbnQgfSBmcm9tICdpbWFnZXMvSFVEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFydHMsXG4gICAgICAgICAgICBib21icyxcbiAgICAgICAgICAgIGtleXMsXG4gICAgICAgICAgICBjb2lucyxcbiAgICAgICAgICAgIGhhcmRNb2RlLFxuICAgICAgICAgICAgbm9BY2hpZXZlbWVudCxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3Qua2V5cyggZWxlbWVudHMgKS5mb3JFYWNoKCBwcm9wID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3ByaXRlIH0gPSBlbGVtZW50c1twcm9wXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW3Byb3BdID0gc3ByaXRlO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXNbcHJvcF0gPSBpbWFnZTtcblxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uub25sb2FkID0gKCkgPT4gaW1hZ2UucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uuc3JjID0gc3ByaXRlO1xuICAgICAgICB9ICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG5cbiAgICAgICAgaWYgKCB0aGlzLl9pbWFnZXMuaGVhcnRzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBoZWFydHMud2lkdGggKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoZWFydHMuaGVpZ2h0ICogMS41O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxZID0gMTA7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbEhwID0gU3RvcmUuZ2V0KCAncGxheWVyJyApLmhwO1xuXG4gICAgICAgICAgICBsZXQgaHAgPSBvcmlnaW5hbEhwO1xuICAgICAgICAgICAgbGV0IHggPSBpbml0aWFsWDtcbiAgICAgICAgICAgIGxldCB5ID0gaW5pdGlhbFk7XG5cbiAgICAgICAgICAgIGxldCBfaHAgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoIF9ocCA8IGhwIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuZGVmYXVsdC5wb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmICggX2hwICsgMC41ID09PSBocCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhlYXJ0cy5oYWxmZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHggKz0gd2lkdGg7XG4gICAgICAgICAgICAgICAgX2hwICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoIDcgPCBfaHAgJiYgOCA+PSBfaHAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgeSArPSBoZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHggPSBpbml0aWFsWDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaW5pdGlhbFkgPSA0MDtcblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5jb2lucy5yZWFkeSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNvaW5zLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29pbnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQ29pbnMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKS5nZXQoICdjb2luJyApO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJDb2lucyA/IHBsYXllckNvaW5zLnF1YW50aXR5IDogMDtcblxuICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gY29pbnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5jb2lucy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgY29pbnMud2lkdGgsIGNvaW5zLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCBgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdGhpcy5faW1hZ2VzLmJvbWJzLnJlYWR5IClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBib21icy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGJvbWJzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvbWJzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAnYm9tYicgKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQm9tYnMgPyBwbGF5ZXJCb21icy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuYm9tYnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGJvbWJzLndpZHRoLCBib21icy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCggYCR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCArIDMsIGluaXRpYWxZICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2ltYWdlcy5rZXlzLnJlYWR5IClcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBrZXlzLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0ga2V5cy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJLZXlzID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICkuZ2V0KCAna2V5JyApO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJLZXlzID8gcGxheWVyS2V5cy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGtleXMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlcy5rZXlzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBrZXlzLndpZHRoLCBrZXlzLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0ICk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCBgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggU3RvcmUuZ2V0KCAnaGFyZE1vZGUnICkgJiYgdGhpcy5faW1hZ2VzLmhhcmRNb2RlLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGFyZE1vZGUud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoYXJkTW9kZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG5cbiAgICAgICAgICAgIGxldCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhhcmRNb2RlLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMuaGFyZE1vZGUuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhhcmRNb2RlLndpZHRoLCBoYXJkTW9kZS5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBTdG9yZS5nZXQoICdub0FjaGlldmVtZW50JyApICYmIHRoaXMuX2ltYWdlcy5ub0FjaGlldmVtZW50LnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gbm9BY2hpZXZlbWVudC53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG5vQWNoaWV2ZW1lbnQuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuXG4gICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBub0FjaGlldmVtZW50LmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZXMubm9BY2hpZXZlbWVudC5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgbm9BY2hpZXZlbWVudC53aWR0aCwgbm9BY2hpZXZlbWVudC5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4PW51bGwsIHk9bnVsbCwgd2lkdGgsIGhlaWdodCwgaW1hZ2UgfSApXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2UgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5vbmxvYWQgPSAoKSA9PiB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbWFnZSggaW1hZ2UsIHR5cGU9J2ltYWdlJyApXG4gICAge1xuICAgICAgICBpZiAoICdjYW52YXMnID09PSB0eXBlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBpbWFnZSAhPT0gdGhpcy5pbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgc3JjOiBpbWFnZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4gdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICB9XG5cblxuICAgIGdldCBjZW50ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3ggKyB0aGlzLndpZHRoIC8gMixcbiAgICAgICAgICAgIHk6IHRoaXMuX3kgKyB0aGlzLmhlaWdodCAvIDIsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKCB0aGlzLl94ICk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKCB0aGlzLl95ICk7XG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGlmICggdGhpcy5pbWFnZSAmJiB0aGlzLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCAnaW1hZ2UnID09PSB0aGlzLmltYWdlLnR5cGUgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5ICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICggJ3Nwcml0ZScgPT09IHRoaXMuaW1hZ2UudHlwZSAmJiB0aGlzLnJlbmRlclNwcml0ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTcHJpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBib21icyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5pbXBvcnQgZ2V0Q29sbGlkZXJzIGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5jbGFzcyBCb21iQWN0b3IgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxLjA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA2MDsgLy8gdGltZSBiZXR3ZWVuIGZyYW1lcyBvZiBleHBsb3Npb25cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB9XG5cbiAgICBkcm9wKClcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCggOjp0aGlzLnJlbmRlckV4cGxvc2lvbiwgNDAwMCApOyAvLyA0IHNlY29uZHMgYWZ0ZXJcblxuICAgICAgICBTdG9yZS5nZXQoICd0ZWFycycgKS5wdXNoKCB0aGlzICk7XG4gICAgfVxuXG4gICAgcmVuZGVyRXhwbG9zaW9uKClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSBib21icy5leHBsb3Npb24ud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gYm9tYnMuZXhwbG9zaW9uLmhlaWdodDtcbiAgICAgICAgdGhpcy5zZXRJbWFnZSggYm9tYnMuZXhwbG9zaW9uLnNwcml0ZSwgJ3Nwcml0ZScgKTtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gREVTVFJPWSBBTEwgVEhFIFRISU5HUyBOT1dcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgbGV0IHgsIHk7XG4gICAgICAgIGxldCBfeCwgX3k7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmlzRXhwbG9kaW5nIClcbiAgICAgICAge1xuICAgICAgICAgICAgW3gsIHldID0gW3RoaXMuX3N0YXRlICogdGhpcy53aWR0aCwgMCwgXTtcbiAgICAgICAgICAgIFtfeCwgX3ldID0gW3RoaXMuX3ggLSBib21icy53aWR0aCwgdGhpcy5feSAtIGJvbWJzLmhlaWdodCAqIDIsIF07XG5cbiAgICAgICAgICAgIGlmICggbm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSArPSAxO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuX3N0YXRlID09PSBib21icy5leHBsb3Npb24uc3RhdGVzIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAhdGhpcy5pc0V4cGxvZGluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIFsgeCwgeSBdID0gYm9tYnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIFtfeCwgX3ldID0gW3RoaXMuX3gsIHRoaXMuX3ksIF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgX3gsIF95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9tYiBleHRlbmRzIENvbGxlY3RpYmxlXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBib21icy53aWR0aCwgaGVpZ2h0OiBib21icy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogYm9tYnMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDAuMiA+IE1hdGgucmFuZG9tKCkgPyAyIDogMTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgYm9tYk5hbWUgPSAxID09PSB0aGlzLnF1YW50aXR5ID8gJ2RlZmF1bHQnIDogJ2RvdWJsZSc7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gYm9tYnNbYm9tYk5hbWVdLnBvc2l0aW9uIHx8IFswLCAwLCBdO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdib21iJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICAgICAgaXNEcm9wcGFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdG9Ecm9wcGFibGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIEJvbWJBY3RvcjsgLy8gcmV0dXJuIHRoZSBjbGFzcyBzbyB0aGUgd2VhcmVyIGNhbiBkbyBuZXcgb24gaXQuXG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQsIG5hbWUsIGhwLCB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHgsIHksIH0gKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9vcmlnaW5hbEhwID0gaHA7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIH1cblxuICAgIGdldCBuYW1lKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoICdDYW5cXCd0IGNoYW5nZSBuYW1lLCBuYW1lIHNldHRlcjonICsgdmFsdWUgKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCAwIDwgdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlIDw9ICggdGhpcy5tYXhIcCB8fCAxNiApID8gdmFsdWUgOiB0aGlzLm1heEhwIHx8IDE2O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwID49IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSAwO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMuZGllIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHRoaXMucmVzcGF3biApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9vcmlnaW5hbEhwO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcGF3bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3RpYmxlIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlibGUnO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGNvaW5zIH0gZnJvbSAnaW1hZ2VzL2l0ZW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29pbiBleHRlbmRzIENvbGxlY3RpYmxlXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoOiBjb2lucy53aWR0aCwgaGVpZ2h0OiBjb2lucy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogY29pbnMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgY29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTWF0aC5yb3VuZCggKCBNYXRoLnJhbmRvbSgpICogY29pbnMuc3RhdGVzICkgKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gY29pbnMuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKCAwLjEgPCByYW5kIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwLjA1IDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSA1O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICduaWNrZWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCAwLjAyIDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAxMDtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnZGltZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIDAuMDA1IDwgcmFuZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAyNTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAncXVhcnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBzcHJpdGUgZm9yIHRoZSBiaWcgbW9uZXl6IHlldC5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIC8vIGNvbnN0IFsgeCwgeSBdID0gY29pbnNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAoIG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxuXG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnY29pbicsXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aWJsZSBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ3RvSXRlbSgpIG11c3QgYmUgaW1wbGVtZW50ZWQnICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5XG57XG4gICAgY29uc3RydWN0b3IoIHsgY29sbGVjdGlvbj1bXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyPWZhbHNlLCBzaG91bGRVcGRhdGVBZnRlclJlbmRlcj1mYWxzZSB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHVzaCggLi4uY29sbGVjdGlvbiApO1xuXG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciA9IHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgPSBzaG91bGRVcGRhdGVBZnRlclJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gMCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmVtb3ZlKCBpdGVtIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbmRleE9mKCBpdGVtICk7XG5cbiAgICAgICAgaWYgKCAtMSA8IGluZGV4IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoIGluZGV4LCAxICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IG5ld1RoaXMgPSBbXTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoIGl0ZW0udXBkYXRlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGZhbHNlID09PSBpdGVtLmFjdGl2ZSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCBpdGVtLnJlbmRlckRlc3Ryb3kgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5kZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBpdGVtLmluYWN0aXZlTGF5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKCBsYXllciApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTdG9yZS5nZXQoIGxheWVyICkucHVzaCggaXRlbSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuZXdUaGlzLnB1c2goIGl0ZW0gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0xlbmd0aCA9IG5ld1RoaXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICggbmV3TGVuZ3RoICE9PSBsZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IG5ld0xlbmd0aDtcblxuICAgICAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbmV3TGVuZ3RoOyBpKysgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSBuZXdUaGlzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JFYWNoKCBpdGVtID0+IGl0ZW0ucmVuZGVyKCkgKTtcblxuICAgICAgICBpZiAoIHRoaXMuX3Nob3VsZFVwZGF0ZUFmdGVyUmVuZGVyICYmICF0aGlzLmlzRW1wdHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvc3RhdGljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCBocCB9IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9ICk7XG5cbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDI1NjtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmaXJlLCBmaXJlQmFzZSB9IGZyb20gJ2ltYWdlcy9vYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlIGV4dGVuZHMgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyB4LCB5IH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgeCwgeSwgd2lkdGg6IGZpcmUud2lkdGgsIGhlaWdodDogZmlyZS5oZWlnaHQsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZpcmUuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKCAoIE1hdGgucmFuZG9tKCkgKiBmaXJlLnN0YXRlcyApICk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZpcmUuc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDEwMDsgLy8gbXNcbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDAuNTtcbiAgICB9XG5cbiAgICBnZXQgaW5hY3RpdmVMYXllcigpXG4gICAge1xuICAgICAgICByZXR1cm4gJ2JhY2tncm91bmRPYnN0YWNsZXMnO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBsZXQgWyB3b29kWCwgd29vZFkgXSA9IHRoaXMuYWN0aXZlID8gZmlyZUJhc2UucG9zaXRpb24gOiBmaXJlQmFzZS5kZWFkUG9zaXRpb247XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB3b29kWCwgd29vZFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95ICsgMTcsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG5cbiAgICAgICAgaWYgKCAhdGhpcy5hY3RpdmUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZXMgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICggdGhpcy5fc3RhdGUgKyAxICkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnY29tcG9uZW50cy9jaGFyYWN0ZXInO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZsaWVzIH0gZnJvbSAnaW1hZ2VzL21vbnN0ZXJzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcbmltcG9ydCB7IGlzQ29sbGlkaW5nIH0gZnJvbSAndXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx5IGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoIHsgeCwgeSwgbmFtZT0nc3RhdGlvbmFyeScgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogZmxpZXMud2lkdGgsIGhlaWdodDogZmxpZXMuaGVpZ2h0LCBocDogMiwgc3BlZWQ6IDEuNSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmbGllcy5zcHJpdGUsXG4gICAgICAgIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKCAoIE1hdGgucmFuZG9tKCkgKiBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXMgKSApO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNTA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgICAgICB0aGlzLnR5cGUgPSAnZmx5JztcbiAgICB9XG5cbiAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcblxuICAgICAgICBzd2l0Y2ggKCB0aGlzLl9uYW1lIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhc2UgJ2NpcmNsaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ3Bvb3BPcmJpdGFsJzpcbiAgICAgICAgICAgIGNhc2UgJ3N0YXRpb25hcnknOlxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSAnaG9taW5nJzpcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IHggLSB0aGlzLng7XG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSB5IC0gdGhpcy55O1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gTWF0aC5zcXJ0KCAoIGR4ICogZHggKSArICggZHkgKiBkeSApICk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZFggPSB0aGlzLnNwZWVkICogKCBkeCAvIGRlcGxhY2VtZW50ICk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlZWRZID0gdGhpcy5zcGVlZCAqICggZHkgLyBkZXBsYWNlbWVudCApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHNwZWVkWDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gc3BlZWRZO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9GbGllcyA9IGZvcmVncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLm1hcCggaXRlbSA9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGl0ZW0gPT09IFN0b3JlLmdldCggJ21vbnN0ZXJzJyApIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5maWx0ZXIoIGkgPT4gISggaSBpbnN0YW5jZW9mIEZseSApICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSApXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoIGl0ZW0gPT5cbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0gIT09IFN0b3JlLmdldCggJ29ic3RhY2xlcycgKTtcbiAgICAgICAgICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyggdGhpcywgbm9GbGllcyApO1xuICAgICAgICAgICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IHNwZWVkWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IHNwZWVkWTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIGNvbGxpZGVyLmNhblRha2VEYW1hZ2UgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLmNhblRha2VEYW1hZ2UoIHsgdXBkYXRlOiB0cnVlLCB9ICkgKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5ocCAtPSB0aGlzLmRhbWFnZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRpZSgpXG4gICAge1xuICAgICAgICB0aGlzLl9uYW1lID0gJ2R5aW5nJztcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSAwO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXM7XG4gICAgICAgIHRoaXMud2lkdGggPSBmbGllc1t0aGlzLl9uYW1lXS53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBmbGllc1t0aGlzLl9uYW1lXS5oZWlnaHQ7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNzU7XG5cbiAgICAgICAgU3RvcmUuc2V0KCAnbW9uc3RlcnMnLCBTdG9yZS5nZXQoICdtb25zdGVycycgKVxuICAgICAgICAgICAgLmZpbHRlciggbW9uc3RlciA9PiB0aGlzICE9PSBtb25zdGVyICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNEeWluZyA9ICdkeWluZycgPT09IHRoaXMuX25hbWU7XG5cbiAgICAgICAgaWYgKCAhaXNEeWluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGhpcy5fc3RhdGUgPT09IHRoaXMuX3N0YXRlcyAtIDEgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IFsgeCwgeSBdID0gZmxpZXNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKCBub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIGlzRHlpbmcgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gdGhpcy5fc3RhdGUgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKCB0aGlzLl9zdGF0ZSArIDEgKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICB4ICs9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCB7IHdpZHRoOiAyOCwgaGVpZ2h0OiAzNSwgc3BlZWQ6IDIwMCwgbmFtZTogJ0lzYWFjJywgaHA6IDMsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogaXNhYWMuc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX2xhc3RTaG9vdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9rZXlzRG93biA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMgPSBTdG9yZS5nZXQoICd0ZWFycycgKTtcbiAgICAgICAgdGhpcy5fYXR0YWNrU3BlZWQgPSA1MDA7IC8vIDEgc2hvb3QgLyBzZWNvbmRcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMTtcbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0geyB4OiAwLCB5OiAxLCB9O1xuICAgICAgICB0aGlzLmNvbGxpZGluZ1dpZHRoID0gdGhpcy53aWR0aCAtIDI7XG4gICAgICAgIHRoaXMuY29sbGlkaW5nSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSAxMDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IDE2O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsICggZSApID0+IHRoaXMuX2tleXNEb3duLmFkZCggZS5rZXlDb2RlICkgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXVwJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uZGVsZXRlKCBlLmtleUNvZGUgKSApO1xuXG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcblxuICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICB9XG5cbiAgICBjYW5UYWtlRGFtYWdlKCB7IHVwZGF0ZSB9IClcbiAgICB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGNhblRha2VEYW1hZ2UgPSBub3cgLSB0aGlzLl9sYXN0RG1nID4gdGhpcy5fZG1nSW50ZXJ2YWw7XG5cbiAgICAgICAgaWYgKCB1cGRhdGUgJiYgY2FuVGFrZURhbWFnZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FuVGFrZURhbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJlxuICAgICAgICAgICAgTElNSVRfTEVGVF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFRfSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRYID0gdGhpcy5feDtcbiAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVuZW15ID0gaXNDb2xsaWRpbmcoIHRoaXMsIFN0b3JlLmdldCggJ21vbnN0ZXJzJyApICk7XG5cbiAgICAgICAgICAgIGlmICggIWVuZW15ICYmICFpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnb2JzdGFjbGVzJyApICkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSBvbGRYO1xuXG4gICAgICAgICAgICBpZiAoIGVuZW15ICYmIHRoaXMuY2FuVGFrZURhbWFnZSggeyB1cGRhdGU6IHRydWUsIH0gKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCAtPSBlbmVteS5kYW1hZ2VzIHx8IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feSAmJlxuICAgICAgICAgICAgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCBvbGRZID0gdGhpcy5feTtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcblxuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBpc0NvbGxpZGluZyggdGhpcywgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICkgKTtcblxuICAgICAgICAgICAgaWYgKCAhZW5lbXkgJiYgIWlzQ29sbGlkaW5nKCB0aGlzLCBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICkgKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGlja3VwSXRlbXMoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5feSA9IG9sZFk7XG5cbiAgICAgICAgICAgIGlmICggZW5lbXkgJiYgdGhpcy5jYW5UYWtlRGFtYWdlKCB7IHVwZGF0ZTogdHJ1ZSwgfSApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcGlja3VwSXRlbXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBTdG9yZS5nZXQoICdpdGVtcycgKTtcbiAgICAgICAgY29uc3QgcGxheWVySXRlbXMgPSBTdG9yZS5nZXQoICdwbGF5ZXJJdGVtcycgKTtcbiAgICAgICAgY29uc3QgY29sbGVjdGlibGUgPSBpc0NvbGxpZGluZyggdGhpcywgaXRlbXMgKTtcblxuICAgICAgICBpZiAoICFjb2xsZWN0aWJsZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW1zLnJlbW92ZSggY29sbGVjdGlibGUgKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGNvbGxlY3RpYmxlLnRvSXRlbSgpO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGl0ZW0ucXVhbnRpdHk7IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggaXRlbS50eXBlICkgfHwgeyBxdWFudGl0eTogMCwgaXRlbXM6IFtdLCB9O1xuXG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgKz0gMTtcblxuICAgICAgICAgICAgaWYgKCBpdGVtLmlzRHJvcHBhYmxlIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0l0ZW0uaXRlbXMucHVzaCggY29sbGVjdGlibGUudG9Ecm9wcGFibGUoKSApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoIGl0ZW0udHlwZSwgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7IHg6IDAsIHk6IDEsIH07XG5cbiAgICAgICAgaWYgKCAwID09PSBkZXBsYWNlbWVudCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCA9PT0ga2V5c0Rvd24uc2l6ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICAgICAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGtleXNEb3duLmhhcyggS0VZX1cgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVyApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX1MgKSAmJlxuICAgICAgICAgICAgISgga2V5c0Rvd24uaGFzKCBLRVlfQSApIHx8IGtleXNEb3duLmhhcyggS0VZX0QgKSApICkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TICkgKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gTWF0aC5zcXJ0KCBNYXRoLnBvdyggZGVwbGFjZW1lbnQsIDIgKSAvIDIgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfQSApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0EgKSApIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBNYXRoLnNxcnQoIE1hdGgucG93KCBkZXBsYWNlbWVudCwgMiApIC8gMiApO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICYmXG4gICAgICAgICAgICAhKCBrZXlzRG93bi5oYXMoIEtFWV9XICkgfHwga2V5c0Rvd24uaGFzKCBLRVlfUyApICkgKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfRCApICkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54ICs9IE1hdGguc3FydCggTWF0aC5wb3coIGRlcGxhY2VtZW50LCAyICkgLyAyICk7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG5cbiAgICAgICAgdGhpcy51cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93ICk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbiggbm93IClcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHt9O1xuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIGtleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfTEVGVCApIClcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggMCAhPT0gZGlyZWN0aW9uLnggfHwgMCAhPT0gZGlyZWN0aW9uLnkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmICggKCBrZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIGtleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAga2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBrZXlzRG93bi5oYXMoIEtFWV9TUEFDRSApICYmXG4gICAgICAgICAgICAoICF0aGlzLl9sYXN0Qm9tYiB8fCA1MDAgPD0gbm93IC0gdGhpcy5fbGFzdEJvbWIgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCAncGxheWVySXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldCggJ2JvbWInICk7XG5cbiAgICAgICAgaWYgKCBleGlzdGluZ0l0ZW0gJiYgZXhpc3RpbmdJdGVtLnF1YW50aXR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbQm9tYiwgLi4uYm9tYnNdID0gZXhpc3RpbmdJdGVtLml0ZW1zO1xuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLml0ZW1zID0gYm9tYnM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0ucXVhbnRpdHkgLT0gMTtcblxuICAgICAgICAgICAgY29uc3QgYm9tYiA9IG5ldyBCb21iKCB7IHgsIHksIH0gKTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoICdib21iJywgZXhpc3RpbmdJdGVtICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG9vdCgpXG4gICAge1xuICAgICAgICBsZXQgeDtcbiAgICAgICAgbGV0IHk7XG5cbiAgICAgICAgc3dpdGNoICggdGhpcy5fZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94O1xuICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB4ID0gdGhpcy5feCArIDg7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKCB0aGlzLl9kaXJlY3Rpb24ueSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgMTU7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdGVhcnMucHVzaCggbmV3IFRlYXIoXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgsXG4gICAgICAgICAgICB5LFxuICAgICAgICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJlY3Rpb24sXG4gICAgICAgICAgICBjcmVhdG9yOiB0aGlzLFxuICAgICAgICAgICAgZGFtYWdlczogdGhpcy5kYW1hZ2VzLFxuICAgICAgICB9ICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXNTaG9vdGluZyA9IHRoaXMuX2lzU2hvb3Rpbmc7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgbGV0IGhlYWQ7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcblxuICAgICAgICBpZiAoIGlzU2hvb3RpbmcgfHwgKCAhaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5zaG9vdGluZ0RpcmVjdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFkID0gaXNhYWMuaGVhZC5kaXJlY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uLnggKVxuICAgICAgICB7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5yaWdodDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggaXNTaG9vdGluZyB8fCAoICFpc1Nob290aW5nICYmICF4ICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzd2l0Y2ggKCBkaXJlY3Rpb24ueSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnVwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIFsgeCwgeSBdID0gaGVhZC5kb3duO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCAwLCAyNSwgMTgsIDE0LCB0aGlzLl94ICsgNSwgdGhpcy5feSArIDIwLCAxOCwgMTQgKTtcbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgeCwgeSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCxcbiAgICAgICAgICAgIHRoaXMuX3gsIHRoaXMuX3ksXG4gICAgICAgICAgICBpc2FhYy5oZWFkLndpZHRoLFxuICAgICAgICAgICAgaXNhYWMuaGVhZC5oZWlnaHQgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IHJvY2tzIH0gZnJvbSAnaW1hZ2VzL29ic3RhY2xlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHkgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB4LCB5LCB3aWR0aDogNTAsIGhlaWdodDogNTEsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogcm9ja3Muc3ByaXRlLFxuICAgICAgICB9LCB9ICk7XG5cbiAgICAgICAgdGhpcy5faXNTcGVjaWFsID0gMC4wNSA+IE1hdGgucmFuZG9tKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gdGhpcy5faXNTcGVjaWFsID8gcm9ja3Muc3BlY2lhbC5wb3NpdGlvbiA6IHJvY2tzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0ICk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuaW1wb3J0IHsgZGVmYXVsdFJvb20gfSBmcm9tICdpbWFnZXMvcm9vbXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb29tIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3RvciggeyBpbWFnZSwgfSA9IHsgaW1hZ2U6IHsgdHlwZTogJ2ltYWdlJywgc3JjOiBkZWZhdWx0Um9vbSwgfSwgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogODAwLCBoZWlnaHQ6IDQ4MCwgaW1hZ2UsIH0gKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBBY3RvciBmcm9tICdjb21wb25lbnRzL2FjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhdGljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0gKVxuICAgIHtcbiAgICAgICAgc3VwZXIoIHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKCB7IHgsIHksIGRpcmVjdGlvbiwgc3BlZWQsIGNyZWF0b3IsIGRhbWFnZXMgfSApXG4gICAge1xuICAgICAgICBzdXBlciggeyB3aWR0aDogMTMsIGhlaWdodDogMTMsIGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFRlYXIsIH0sIH0gKTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZCB8fCA0O1xuICAgICAgICB0aGlzLl9jcmVhdG9yID0gY3JlYXRvcjtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gZGFtYWdlcztcblxuICAgICAgICB0aGlzLnhWZWxvY2l0eSA9IGRpcmVjdGlvbi54ICogdGhpcy5fc3BlZWQ7XG4gICAgICAgIHRoaXMueVZlbG9jaXR5ID0gZGlyZWN0aW9uLnkgKiB0aGlzLl9zcGVlZDtcbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgaWYgKCBMSU1JVF9MRUZUIC0gdGhpcy53aWR0aCA+IHRoaXMuX3ggfHwgdGhpcy5feCA+IExJTUlUX1JJR0hUICsgdGhpcy53aWR0aCB8fFxuICAgICAgICAgICAgTElNSVRfVE9QIC0gdGhpcy5oZWlnaHQgPiB0aGlzLl95IHx8IHRoaXMuX3kgPiBMSU1JVF9CT1RUT00gKyB0aGlzLmhlaWdodCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCAnaXRlbXMnICk7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKCBpdGVtID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtICE9PSB0aGlzLl9jcmVhdG9yICYmIGl0ZW0gIT09IGl0ZW1zO1xuICAgICAgICB9ICkgKTtcbiAgICAgICAgaWYgKCBjb2xsaWRlciApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocCApXG4gICAgICAgICAgICB7XG5cbiAgICAgICAgICAgICAgICBjb2xsaWRlci5ocCAtPSB0aGlzLmRhbWFnZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICB0aGlzLl94ICs9IHRoaXMueFZlbG9jaXR5O1xuICAgICAgICB0aGlzLl95ICs9IHRoaXMueVZlbG9jaXR5O1xuXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5hY3RpdmUgJiYgdGhpcy5pbkJvdW5kcztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjYW52YXMgfSBmcm9tICdjYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QX0lTQUFDID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NX0lTQUFDID0gY2FudmFzLmhlaWdodCAtIDk1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlRfSVNBQUMgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVF9JU0FBQyA9IGNhbnZhcy53aWR0aCAtIDg1O1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDY1O1xuZXhwb3J0IGNvbnN0IExJTUlUX0xFRlQgPSA2MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9SSUdIVCA9IGNhbnZhcy53aWR0aCAtIDc1O1xuXG5leHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG5leHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbmV4cG9ydCBjb25zdCBLRVlfTEVGVCA9IDM3O1xuZXhwb3J0IGNvbnN0IEtFWV9SSUdIVCA9IDM5O1xuZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuZXhwb3J0IGNvbnN0IEtFWV9XID0gODc7XG5leHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbmV4cG9ydCBjb25zdCBLRVlfUyA9IDgzO1xuZXhwb3J0IGNvbnN0IEtFWV9EID0gNjg7XG4iLCJleHBvcnQgY29uc3QgaGVhcnRzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaGVhcnRzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGVtcHR5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFszMiwgMCwgXSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBoYWxmZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDAsIF0sXG4gICAgfSxcbiAgICBzcGlyaXQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZnNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDE2LCBdLFxuICAgIH0sXG4gICAgZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMzIsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZmV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAxNiwgXSxcbiAgICB9LFxuICAgIHJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzQ4LCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZnJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzY0LCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgYm9tYnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAxNiwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGtleXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsxNiwgMCwgXSxcbiAgICB9LFxuICAgIGdvbGRlbjpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbMTYsIDE2LCBdLFxuICAgIH0sXG59O1xuXG5cbmV4cG9ydCBjb25zdCBjb2lucyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBoYXJkTW9kZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3Qgbm9BY2hpZXZlbWVudCA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAxNiwgXSxcbiAgICB9LFxufTtcblxuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGhlYXJ0cyxcbiAgICBib21icyxcbiAgICBrZXlzLFxuICAgIGNvaW5zLFxuICAgIGhhcmRNb2RlLFxuICAgIG5vQWNoaWV2ZW1lbnQsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGlzYWFjID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaXNhYWNfc3ByaXRlX2N1c3RvbS5wbmcnLFxuICAgIGhlYWQ6XG4gICAge1xuICAgICAgICB3aWR0aDogMjgsXG4gICAgICAgIGhlaWdodDogMjUsXG4gICAgICAgIGRpcmVjdGlvbnM6XG4gICAgICAgIHtcbiAgICAgICAgICAgIGRvd246IFswLCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDQsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA2LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDIsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWzI4LCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsyOCAqIDUsIDAsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMjggKiA3LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsyOCAqIDMsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBsZWdzOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE4LFxuICAgICAgICBoZWlnaHQ6IDE0LFxuICAgICAgICBkaXJlY3Rpb25zOlxuICAgICAgICB7XG4gICAgICAgICAgICBkb3duOiBbMCwgMjUsIF0sXG4gICAgICAgICAgICB1cDogWzE4ICogNSwgMjUsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbMCwgMjUsIF0sXG4gICAgICAgICAgICByaWdodDogWzAsIDI1LCBdLFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGlzYWFjLFxufTtcbiIsImV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2JvbWJzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgfSxcbiAgICBkb3VibGU6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzMyLCAwLCBdLFxuICAgIH0sXG4gICAgZXhwbG9zaW9uOlxuICAgIHtcbiAgICAgICAgc3ByaXRlOiAnYnVpbGQvaW1nL2V4cGxvc2lvbl9zcHJpdGUucG5nJyxcbiAgICAgICAgd2lkdGg6IDk2LFxuICAgICAgICBoZWlnaHQ6IDk2LFxuICAgICAgICBzdGF0ZXM6IDEyLFxuICAgIH0sXG59O1xuXG5leHBvcnQgY29uc3QgY29pbnMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9jb2luc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMjAsXG4gICAgaGVpZ2h0OiAxNSxcbiAgICBzdGF0ZXM6IDYsXG59O1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGJvbWJzLFxufTtcbiIsImV4cG9ydCBjb25zdCBmbGllcyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2ZsaWVzX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIHN0YXRpb25hcnk6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzAsIDAsIF0sXG4gICAgICAgIHN0YXRlczogMixcbiAgICB9LFxuICAgIHBvb3BPcmJpdGFsOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFs2NCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgaG9taW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFswLCAzMiwgXSxcbiAgICAgICAgc3RhdGVzOiA0LFxuICAgIH0sXG4gICAgY2lyY2xpbmc6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWzEyOCwgMzIsIF0sXG4gICAgICAgIHN0YXRlczogMixcbiAgICB9LFxuXG4gICAgZHlpbmc6XG4gICAge1xuICAgICAgICB3aWR0aDogNjQsXG4gICAgICAgIGhlaWdodDogNjQsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgNjQsIF0sXG4gICAgICAgIHN0YXRlczogMTIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZmxpZXMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE3MCxcbiAgICBoZWlnaHQ6IDE3MixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgXSxcbiAgICB9LFxuICAgIHNwZWNpYWw6XG4gICAge1xuICAgICAgICB3aWR0aDogMTcwLFxuICAgICAgICBoZWlnaHQ6IDE3MixcbiAgICAgICAgcG9zaXRpb246IFsxNzAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBmaXJlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZmlyZV9zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzEsXG4gICAgaGVpZ2h0OiAzNCxcbiAgICBzdGF0ZXM6IDYsXG59O1xuXG5cbmV4cG9ydCBjb25zdCBmaXJlQmFzZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2RlYWRmaXJlX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMixcbiAgICBoZWlnaHQ6IDMyLFxuICAgIHBvc2l0aW9uOiBbMCwgMzQsIF0sXG4gICAgZGVhZFBvc2l0aW9uOiBbMzIsIDM0LCBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICByb2NrcyxcbiAgICBmaXJlLFxuICAgIGZpcmVCYXNlLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0Um9vbSA9ICdidWlsZC9pbWcvcm9vbS5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRSb29tLFxufTtcbiIsImV4cG9ydCBjb25zdCBkZWZhdWx0VGVhciA9ICdidWlsZC9pbWcvdGVhci5wbmcnO1xuXG5leHBvcnQgZGVmYXVsdFxue1xuICAgIGRlZmF1bHQ6IGRlZmF1bHRUZWFyLFxufTtcbiIsImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuaW1wb3J0IFJvb20gZnJvbSAnY29tcG9uZW50cy9yb29tJztcbmltcG9ydCBIVUQgZnJvbSAnY29tcG9uZW50cy9IVUQnO1xuaW1wb3J0IFJvY2sgZnJvbSAnY29tcG9uZW50cy9yb2NrJztcbmltcG9ydCBGaXJlIGZyb20gJ2NvbXBvbmVudHMvZmlyZSc7XG5pbXBvcnQgRmx5IGZyb20gJ2NvbXBvbmVudHMvZmx5JztcbmltcG9ydCBCb21iIGZyb20gJ2NvbXBvbmVudHMvYm9tYic7XG5pbXBvcnQgQ29pbiBmcm9tICdjb21wb25lbnRzL2NvaW4nO1xuaW1wb3J0IElzYWFjIGZyb20gJ2NvbXBvbmVudHMvaXNhYWMnO1xuaW1wb3J0IFZvbHVtZUNvbnRyb2xsZXIgZnJvbSAndm9sdW1lLWNvbnRyb2xsZXInO1xuXG5TdG9yZS5zZXQoICdyb29tJywgbmV3IFJvb20oKSApO1xuU3RvcmUuc2V0KCAnSFVEJywgbmV3IEhVRCgpICk7XG5TdG9yZS5zZXQoICdub0FjaGlldmVtZW50JywgdHJ1ZSApO1xuU3RvcmUuc2V0KCAnaGFyZE1vZGUnLCBmYWxzZSApO1xuU3RvcmUuc2V0KCAnc291bmRzJywgbmV3IFZvbHVtZUNvbnRyb2xsZXIoKSApO1xuU3RvcmUuc2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycsIG5ldyBDb2xsZWN0aW9uKCB7IGNvbGxlY3Rpb246IFtdLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAndGVhcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0gKSApO1xuXG5TdG9yZS5zZXQoICdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBSb2NrKCB7IHg6IDQ1MCwgeTogMTIwLCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogNjUsIHk6IDY1LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiA2NSwgfSApLFxuICAgIG5ldyBSb2NrKCB7IHg6IDE2NSwgeTogNjUsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiA2NSwgeTogMTE2LCB9ICksXG4gICAgbmV3IFJvY2soIHsgeDogMTE1LCB5OiAxMTYsIH0gKSxcbiAgICBuZXcgUm9jayggeyB4OiAxNjUsIHk6IDExNiwgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBCb21iKCB7IHg6IDgyLCB5OiAzNTYsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAxNDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDE2MCwgeTogMzc1LCB9ICksXG4gICAgbmV3IENvaW4oIHsgeDogMTgwLCB5OiAzNzUsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiAyMDAsIHk6IDM3NSwgfSApLFxuICAgIG5ldyBDb2luKCB7IHg6IDY4MCwgeTogODAsIH0gKSxcbiAgICBuZXcgQ29pbiggeyB4OiA2ODAsIHk6IDY1LCB9ICksXG5dLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIG5ldyBGaXJlKCB7IHg6IDcwMywgeTogNjUsIH0gKSxcbiAgICBuZXcgRmlyZSggeyB4OiA2NTAsIHk6IDY1LCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAyNTAsIHk6IDY1LCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAzMDAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSApLFxuICAgIG5ldyBGbHkoIHsgeDogMzMwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0gKSxcbiAgICBuZXcgRmx5KCB7IHg6IDM1MCwgeTogNjUsIG5hbWU6ICdob21pbmcnLCB9ICksXG4gICAgbmV3IEZseSggeyB4OiAzNjAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSApLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9ICkgKTtcblxuU3RvcmUuc2V0KCAncGxheWVyJywgbmV3IElzYWFjKCkgKTtcblN0b3JlLnNldCggJ3BsYXllckl0ZW1zJywgbmV3IE1hcCgpICk7XG5cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQ29sbGVjdGlvbiggeyBjb2xsZWN0aW9uOlxuW1xuICAgIFN0b3JlLmdldCggJ3Jvb20nICksXG4gICAgU3RvcmUuZ2V0KCAnYmFja2dyb3VuZE9ic3RhY2xlcycgKSxcbiAgICBTdG9yZS5nZXQoICdIVUQnICksXG5dLCB9ICk7XG5cbmV4cG9ydCBjb25zdCBmb3JlZ3JvdW5kID0gbmV3IENvbGxlY3Rpb24oIHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoICdvYnN0YWNsZXMnICksXG4gICAgU3RvcmUuZ2V0KCAnbW9uc3RlcnMnICksXG4gICAgU3RvcmUuZ2V0KCAnaXRlbXMnICksXG4gICAgU3RvcmUuZ2V0KCAndGVhcnMnICksXG4gICAgU3RvcmUuZ2V0KCAncGxheWVyJyApLFxuXSwgfSApO1xuXG5cbndpbmRvdy5TdG9yZSA9IFN0b3JlO1xud2luZG93LlBsYXllciA9IFN0b3JlLmdldCggJ3BsYXllcicgKTtcbndpbmRvdy5pdGVtcyA9IFN0b3JlLmdldCggJ2l0ZW1zJyApO1xuLy9cbi8vIGV4cG9ydCBjb25zdCBvYnN0YWNsZXMgPSBmb3JlZ3JvdW5kWzBdO1xuLy8gZXhwb3J0IGNvbnN0IG1vbnN0ZXJzID0gZm9yZWdyb3VuZFsxXTtcbi8vIGV4cG9ydCBjb25zdCBwbGF5ZXIgPSBmb3JlZ3JvdW5kWzJdO1xuIiwiY29uc3QgU3RvcmUgPSBuZXcgTWFwKCk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbiIsImltcG9ydCBDb2xsZWN0aW9uIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlvbic7XG5cbmV4cG9ydCBjb25zdCBnZXRDb2xsaWRlcnMgPSAoIHRhcmdldCwgb3RoZXIgKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKCB0YXJnZXQgPT09IG90aGVyIClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoIEFycmF5LmlzQXJyYXkoIG90aGVyICkgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uIClcbiAgICB7XG4gICAgICAgIGNvbnN0IGNvbGxpZGVycyA9IFtdO1xuICAgICAgICBmb3IgKCBsZXQgaSA9IDAsIGxlbiA9IG90aGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgX2NvbGxpZGVycyA9IGdldENvbGxpZGVycyggdGFyZ2V0LCBvdGhlcltpXSApO1xuXG4gICAgICAgICAgICBpZiAoIF9jb2xsaWRlcnMgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbGxpZGVycy5wdXNoLmFwcGx5KCBjb2xsaWRlcnMsIF9jb2xsaWRlcnMgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb2xsaWRlcnMubGVuZ3RoID8gY29sbGlkZXJzIDogZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAoIGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcCApXG4gICAge1xuICAgICAgICByZXR1cm4gW290aGVyLCBdO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NvbGxpZGluZyA9ICggdGFyZ2V0LCBvdGhlciApID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAoIHRhcmdldCA9PT0gb3RoZXIgKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHggPSB0YXJnZXQueDtcbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldC5jb2xsaWRpbmdXaWR0aCB8fCB0YXJnZXQud2lkdGg7XG4gICAgY29uc3QgeSA9IHRhcmdldC55O1xuICAgIGNvbnN0IGhlaWdodCA9IHRhcmdldC5jb2xsaWRpbmdIZWlnaHQgfHwgdGFyZ2V0LmhlaWdodDtcblxuICAgIGlmICggQXJyYXkuaXNBcnJheSggb3RoZXIgKSB8fCBvdGhlciBpbnN0YW5jZW9mIENvbGxlY3Rpb24gKVxuICAgIHtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcoIHRhcmdldCwgb3RoZXJbaV0gKTtcbiAgICAgICAgICAgIGlmICggY29sbGlkZXIgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xsaWRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBfeCA9IG90aGVyLng7XG4gICAgY29uc3QgX3dpZHRoID0gb3RoZXIuY29sbGlkaW5nV2lkdGggfHwgb3RoZXIud2lkdGg7XG4gICAgY29uc3QgX3kgPSBvdGhlci55O1xuICAgIGNvbnN0IF9oZWlnaHQgPSBvdGhlci5jb2xsaWRpbmdIZWlnaHQgfHwgb3RoZXIuaGVpZ2h0O1xuXG4gICAgY29uc3QgdG9wID0geSArIGhlaWdodCA+PSBfeTtcbiAgICBjb25zdCByaWdodCA9IHggPD0gX3ggKyBfd2lkdGg7XG4gICAgY29uc3QgYm90dG9tID0geSArIGhlaWdodCA8PSBfeSArIF9oZWlnaHQ7XG4gICAgY29uc3QgbGVmdCA9IHggKyB3aWR0aCA+PSBfeDtcblxuICAgIGlmICggbGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wIClcbiAgICB7XG4gICAgICAgIHJldHVybiBvdGhlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuIiwiaW1wb3J0IHsgdm9sdW1lU2xpZGVyLCB2b2x1bWVEaXNwbGF5IH0gZnJvbSAndm9sdW1lLWVsZW1lbnRzJztcblxuY29uc3QgdGV4dCA9ICd1bmRlZmluZWQnID09PSB0eXBlb2Ygdm9sdW1lRGlzcGxheS5pbm5lclRleHQgPyAndGV4dENvbnRlbnQnIDogJ2lubmVyVGV4dCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWb2x1bWVDb250cm9sbGVyXG57XG4gICAgY29uc3RydWN0b3IoIHZvbHVtZT01MCwgbXV0ZWQ9ZmFsc2UgKVxuICAgIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoIHZvbHVtZURpc3BsYXkgKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlKCB2b2x1bWVTbGlkZXIgKTtcbiAgICB9XG5cbiAgICBvYnNlcnZlKCBpbnB1dCApXG4gICAge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCAnY2hhbmdlJywgKCB7IHRhcmdldCB9ICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoIHZvbHVtZURpc3BsYXkgKTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoIHNwYW4gKVxuICAgIHtcbiAgICAgICAgc3Bhblt0ZXh0XSA9IGAke3RoaXMuX3ZvbHVtZX0gJWA7XG4gICAgfVxuXG4gICAgZ2V0IHZvbHVtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdm9sdW1lO1xuICAgIH1cblxuICAgIHNldCB2b2x1bWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggMCA8PSB2YWx1ZSAmJiAxMDAgPj0gdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl92b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtdXRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXV0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IG11dGVkKCB2YWx1ZSApXG4gICAge1xuICAgICAgICB0aGlzLl9tdXRlZCA9ICEhdmFsdWU7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IHZvbHVtZVNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnanMtdm9sdW1lJyApO1xuZXhwb3J0IGNvbnN0IHZvbHVtZURpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2pzLXZvbHVtZS0tZGlzcGxheScgKTtcbiJdfQ==
