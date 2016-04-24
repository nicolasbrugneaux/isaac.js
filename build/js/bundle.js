(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _canvas = require('canvas');

var _layers = require('layers');

const main = () => {
    _layers.background.render();
    _layers.foreground.render();

    _canvas.displayCtx.drawImage(_canvas.canvas, 0, 0); // draw something visible only once per frame.

    requestAnimationFrame(main);
};

main();

},{"canvas":2,"layers":27}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const displayCanvas = exports.displayCanvas = document.getElementById('app');
const displayCtx = exports.displayCtx = displayCanvas.getContext('2d');

const canvas = exports.canvas = document.createElement('canvas');
canvas.width = displayCanvas.width;
canvas.height = displayCanvas.height;
const ctx = exports.ctx = canvas.getContext('2d');

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _canvas = require('canvas');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _HUD = require('images/HUD');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HUD {
    constructor() {
        this.images = [];
        this._images = [];

        const elements = {
            hearts: _HUD.hearts,
            bombs: _HUD.bombs,
            keys: _HUD.keys,
            coins: _HUD.coins,
            hardMode: _HUD.hardMode,
            noAchievement: _HUD.noAchievement
        };

        Object.keys(elements).forEach(prop => {
            const sprite = elements[prop].sprite;

            this.images[prop] = sprite;

            const image = {
                image: new Image(),
                ready: false
            };
            this._images[prop] = image;

            image.image.onload = () => {
                image.ready = true;
            };
            image.image.src = sprite;
        });
    }

    render() {

        if (this._images.hearts.ready) {
            const width = _HUD.hearts.width * 1.5;
            const height = _HUD.hearts.height * 1.5;
            const initialX = 10;
            const initialY = 10;
            const originalHp = _store2.default.get('player').hp;

            const hp = originalHp;
            let x = initialX;
            let y = initialY;

            let _hp = 0;

            while (_hp < hp) {
                var _hearts$default$posit = _slicedToArray(_HUD.hearts.default.position, 2);

                let spriteX = _hearts$default$posit[0];
                let spriteY = _hearts$default$posit[1];


                if (_hp + 0.5 === hp) {
                    var _hearts$halfdefault$p = _slicedToArray(_HUD.hearts.halfdefault.position, 2);

                    spriteX = _hearts$halfdefault$p[0];
                    spriteY = _hearts$halfdefault$p[1];

                    _canvas.ctx.drawImage(this._images.hearts.image, spriteX, spriteY, _HUD.hearts.width, _HUD.hearts.height, x, y, width, height);
                } else {
                    _canvas.ctx.drawImage(this._images.hearts.image, spriteX, spriteY, _HUD.hearts.width, _HUD.hearts.height, x, y, width, height);
                }

                x += width;
                _hp += 1;

                if (7 < _hp && 8 >= _hp) {
                    y += height;
                    x = initialX;
                }
            }
        }

        let initialY = 40;

        if (this._images.coins.ready) {
            initialY += 20;

            const width = _HUD.coins.width;
            const height = _HUD.coins.height;
            const initialX = 8;
            const playerCoins = _store2.default.get('playerItems').get('coin');
            const count = playerCoins ? playerCoins.quantity : 0;

            var _coins$default$positi = _slicedToArray(_HUD.coins.default.position, 2);

            const spriteX = _coins$default$positi[0];
            const spriteY = _coins$default$positi[1];

            _canvas.ctx.drawImage(this._images.coins.image, spriteX, spriteY, _HUD.coins.width, _HUD.coins.height, initialX, initialY, width, height);

            _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            _canvas.ctx.font = '14px monospace';
            _canvas.ctx.textAlign = 'left';
            _canvas.ctx.textBaseline = 'top';
            _canvas.ctx.fillText(`${ count }`, initialX + width + 3, initialY);
        }

        if (this._images.bombs.ready) {

            initialY += 20;

            const width = _HUD.bombs.width;
            const height = _HUD.bombs.height;
            const initialX = 8;
            const playerBombs = _store2.default.get('playerItems').get('bomb');
            const count = playerBombs ? playerBombs.quantity : 0;

            var _bombs$default$positi = _slicedToArray(_HUD.bombs.default.position, 2);

            const spriteX = _bombs$default$positi[0];
            const spriteY = _bombs$default$positi[1];

            _canvas.ctx.drawImage(this._images.bombs.image, spriteX, spriteY, _HUD.bombs.width, _HUD.bombs.height, initialX, initialY, width, height);

            _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            _canvas.ctx.font = '14px monospace';
            _canvas.ctx.textAlign = 'left';
            _canvas.ctx.textBaseline = 'top';
            _canvas.ctx.fillText(`${ count }`, initialX + width + 3, initialY);
        }

        if (this._images.keys.ready) {

            initialY += 20;

            const width = _HUD.keys.width;
            const height = _HUD.keys.height;
            const initialX = 8;
            const playerKeys = _store2.default.get('playerItems').get('key');
            const count = playerKeys ? playerKeys.quantity : 0;

            var _keys$default$positio = _slicedToArray(_HUD.keys.default.position, 2);

            const spriteX = _keys$default$positio[0];
            const spriteY = _keys$default$positio[1];

            _canvas.ctx.drawImage(this._images.keys.image, spriteX, spriteY, _HUD.keys.width, _HUD.keys.height, initialX, initialY, width, height);

            _canvas.ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            _canvas.ctx.font = '14px monospace';
            _canvas.ctx.textAlign = 'left';
            _canvas.ctx.textBaseline = 'top';
            _canvas.ctx.fillText(`${ count }`, initialX + width + 3, initialY);
        }

        if (_store2.default.get('hardMode') && this._images.hardMode.ready) {
            initialY += 20;

            const width = _HUD.hardMode.width;
            const height = _HUD.hardMode.height;
            const initialX = 8;

            var _hardMode$default$pos = _slicedToArray(_HUD.hardMode.default.position, 2);

            const spriteX = _hardMode$default$pos[0];
            const spriteY = _hardMode$default$pos[1];

            _canvas.ctx.drawImage(this._images.hardMode.image, spriteX, spriteY, _HUD.hardMode.width, _HUD.hardMode.height, initialX, initialY, width, height);
        }

        if (_store2.default.get('noAchievement') && this._images.noAchievement.ready) {
            initialY += 20;

            const width = _HUD.noAchievement.width;
            const height = _HUD.noAchievement.height;
            const initialX = 8;

            var _noAchievement$defaul = _slicedToArray(_HUD.noAchievement.default.position, 2);

            const spriteX = _noAchievement$defaul[0];
            const spriteY = _noAchievement$defaul[1];

            _canvas.ctx.drawImage(this._images.noAchievement.image, spriteX, spriteY, _HUD.noAchievement.width, _HUD.noAchievement.height, initialX, initialY, width, height);
        }
    }
}
exports.default = HUD;

},{"canvas":2,"images/HUD":20,"store":28}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _canvas = require('../canvas');

class Actor {
    constructor(_ref) {
        var _ref$x = _ref.x;
        let x = _ref$x === undefined ? null : _ref$x;
        var _ref$y = _ref.y;
        let y = _ref$y === undefined ? null : _ref$y;
        let width = _ref.width;
        let height = _ref.height;
        let image = _ref.image;

        this.width = width;
        this.height = height;
        this.image = image || null;
        this._x = x;
        this._y = y;

        if (this.image) {
            this.ready = false;
            this._image = new Image();
            this._image.onload = () => {
                this.ready = true;
            };
            this._image.src = this.image.src;
        } else {
            this.ready = true;
        }
    }

    setImage(image) {
        let type = arguments.length <= 1 || arguments[1] === undefined ? 'image' : arguments[1];

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
            this._image.onload = () => {
                this.ready = true;
            };
            this._image.src = this.image.src;
        }
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get center() {
        return {
            x: this._x + this.width / 2,
            y: this._y + this.height / 2
        };
    }

    render() {
        const x = Math.round(this._x);
        const y = Math.round(this._y);

        if (this.image && this.ready) {
            if ('image' === this.image.type) {
                _canvas.ctx.drawImage(this._image, x, y);
            } else if ('sprite' === this.image.type && this.renderSprite) {
                this.renderSprite();
            }
        }
    }
}
exports.default = Actor;

},{"../canvas":2}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _collectible = require('components/collectible');

var _collectible2 = _interopRequireDefault(_collectible);

var _dynamicActor = require('components/dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var _canvas = require('canvas');

var _items = require('images/items');

var _collisions = require('utils/physics/collisions');

var _collisions2 = _interopRequireDefault(_collisions);

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BombActor extends _dynamicActor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;

        super({ x: x, y: y, width: _items.bombs.width, height: _items.bombs.height, image: {
                type: 'sprite',
                src: _items.bombs.sprite
            } });

        this.damages = 1.0;
        this.active = false;
        this.isExploding = false;
        this._interval = 60; // time between frames of explosion
        this._then = Date.now();
        this._state = 0;
    }

    drop() {
        this.active = true;
        setTimeout(this.renderExplosion.bind(this), 4000); // 4 seconds after

        _store2.default.get('tears').push(this);
    }

    renderExplosion() {
        this.width = _items.bombs.explosion.width;
        this.height = _items.bombs.explosion.height;
        this.setImage(_items.bombs.explosion.sprite, 'sprite');
        this.isExploding = true;

        // DESTROY ALL THE THINGS NOW
    }

    renderSprite() {
        let x;
        let y;
        let _x;
        let _y;
        const now = Date.now();

        if (this.isExploding) {
            x = this._state * this.width;
            y = 0;
            _x = this._x - _items.bombs.width;
            _y = this._y - _items.bombs.height * 2;


            if (now - this._then > this._interval) {
                this._state += 1;
                this._then = now;

                if (this._state === _items.bombs.explosion.states) {
                    this.active = false;
                }
            }
        } else if (!this.isExploding) {
            var _bombs$default$positi = _slicedToArray(_items.bombs.default.position, 2);

            x = _bombs$default$positi[0];
            y = _bombs$default$positi[1];
            _x = this._x;
            _y = this._y;
        }

        _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, _x, _y, this.width, this.height);
    }
}

class Bomb extends _collectible2.default {
    constructor(_ref2) {
        let x = _ref2.x;
        let y = _ref2.y;

        super({ x: x, y: y, width: _items.bombs.width, height: _items.bombs.height, image: {
                type: 'sprite',
                src: _items.bombs.sprite
            } });

        this.quantity = 0.2 > Math.random() ? 2 : 1;
    }

    renderSprite() {
        const bombName = 1 === this.quantity ? 'default' : 'double';

        var _ref3 = _items.bombs[bombName].position || [0, 0];

        var _ref4 = _slicedToArray(_ref3, 2);

        const x = _ref4[0];
        const y = _ref4[1];


        _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
    }

    toItem() {
        return {
            type: 'bomb',
            quantity: this.quantity,
            isDroppable: true
        };
    }

    toDroppable() {
        return BombActor; // return the class so the wearer can do new on it.
    }
}
exports.default = Bomb;

},{"canvas":2,"components/collectible":8,"components/dynamic-actor":11,"images/items":22,"store":28,"utils/physics/collisions":29}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dynamicActor = require('components/dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Character extends _dynamicActor2.default {
    constructor(_ref) {
        let width = _ref.width;
        let height = _ref.height;
        let image = _ref.image;
        let speed = _ref.speed;
        let name = _ref.name;
        let hp = _ref.hp;
        let x = _ref.x;
        let y = _ref.y;

        super({ width: width, height: height, image: image, x: x, y: y });

        this._speed = speed;
        this._hp = hp;
        this._originalHp = hp;
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        throw new Error('Can\'t change name, name setter:' + value);
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
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
}
exports.default = Character;

},{"components/dynamic-actor":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _collectible = require('components/collectible');

var _collectible2 = _interopRequireDefault(_collectible);

var _canvas = require('canvas');

var _items = require('images/items');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Coin extends _collectible2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;

        super({ x: x, y: y, width: _items.coins.width, height: _items.coins.height, image: {
                type: 'sprite',
                src: _items.coins.sprite
            } });

        const rand = Math.random();
        this._state = Math.round(Math.random() * _items.coins.states);
        this._states = _items.coins.states;
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

    renderSprite() {
        // const [ x, y ] = coins[this._name].position || [0, 0, ];
        // ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );

        const now = Date.now();
        if (now - this._then > this._interval) {
            this._state = (this._state + 1) % this._states;
            this._then = now;
        }

        const x = this.width * this._state;
        const y = 0;

        _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
    }

    toItem() {
        return {
            type: 'coin',
            quantity: this.quantity
        };
    }
}
exports.default = Coin;

},{"canvas":2,"components/collectible":8,"images/items":22}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _staticActor = require('components/static-actor');

var _staticActor2 = _interopRequireDefault(_staticActor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Collectible extends _staticActor2.default {
    toItem() {
        throw new Error('toItem() must be implemented');
    }
}
exports.default = Collectible;

},{"components/static-actor":17}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

class Collection extends Array {
    constructor(_ref) {
        var _ref$collection = _ref.collection;
        let collection = _ref$collection === undefined ? [] : _ref$collection;
        var _ref$shouldUpdateBefo = _ref.shouldUpdateBeforeRender;
        let shouldUpdateBeforeRender = _ref$shouldUpdateBefo === undefined ? false : _ref$shouldUpdateBefo;
        var _ref$shouldUpdateAfte = _ref.shouldUpdateAfterRender;
        let shouldUpdateAfterRender = _ref$shouldUpdateAfte === undefined ? false : _ref$shouldUpdateAfte;

        super();
        this.push.apply(this, _toConsumableArray(collection));

        this._shouldUpdateBeforeRender = shouldUpdateBeforeRender;
        this._shouldUpdateAfterRender = shouldUpdateAfterRender;
    }

    get isEmpty() {
        return 0 === this.length;
    }

    remove(item) {
        const index = this.indexOf(item);

        if (-1 < index) {
            this.splice(index, 1);
        }
    }

    update() {
        const len = this.length;
        const newThis = [];

        for (let i = 0; i < len; i++) {
            const item = this[i];

            if (item.update) {
                item.update();
            }

            if (false === item.active) {
                if (item.renderDestroy) {
                    item.renderDestroy();
                }

                const layer = item.inactiveLayer;
                if (layer) {
                    _store2.default.get(layer).push(item);
                }
            } else {
                newThis.push(item);
            }
        }

        const newLength = newThis.length;

        if (newLength !== len) {
            this.length = newLength;

            for (let i = 0; i < newLength; i++) {
                this[i] = newThis[i];
            }
        }
    }

    render() {
        if (this._shouldUpdateBeforeRender && !this.isEmpty) {
            this.update();
        }

        this.forEach(item => item.render());

        if (this._shouldUpdateAfterRender && !this.isEmpty) {
            this.update();
        }
    }
}
exports.default = Collection;

},{"store":28}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _staticActor = require('components/static-actor');

var _staticActor2 = _interopRequireDefault(_staticActor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DestructibleStaticActor extends _staticActor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        let width = _ref.width;
        let height = _ref.height;
        let image = _ref.image;
        let hp = _ref.hp;

        super({ x: x, y: y, width: width, height: height, image: image });

        this._hp = hp;
        this.active = true;
        this._dmgInterval = 500;
        this._lastDmg = Date.now();
    }

    get hp() {
        return this._hp;
    }

    set hp(value) {
        if (0 < value) {
            this._hp = value;
        } else {
            this.active = false;
        }
    }
}
exports.default = DestructibleStaticActor;

},{"components/static-actor":17}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('components/actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DynamicActor extends _actor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        let width = _ref.width;
        let height = _ref.height;
        let image = _ref.image;
        let speed = _ref.speed;

        super({ x: x, y: y, width: width, height: height, image: image });

        this._speed = speed || 256;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        this._speed = value;
    }
}
exports.default = DynamicActor;

},{"components/actor":4}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _destructibleStaticActor = require('components/destructible-static-actor');

var _destructibleStaticActor2 = _interopRequireDefault(_destructibleStaticActor);

var _canvas = require('canvas');

var _obstacles = require('images/obstacles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Fire extends _destructibleStaticActor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;

        super({ x: x, y: y, width: _obstacles.fire.width, height: _obstacles.fire.height, hp: 3, image: {
                type: 'sprite',
                src: _obstacles.fire.sprite
            } });

        this._state = Math.round(Math.random() * _obstacles.fire.states);
        this._states = _obstacles.fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
        this.damages = 0.5;
    }

    get inactiveLayer() {
        return 'backgroundObstacles';
    }

    renderSprite() {
        var _ref2 = this.active ? _obstacles.fireBase.position : _obstacles.fireBase.deadPosition;

        var _ref3 = _slicedToArray(_ref2, 2);

        const woodX = _ref3[0];
        const woodY = _ref3[1];

        _canvas.ctx.drawImage(this._image, woodX, woodY, this.width, this.height, this._x, this._y + 17, this.width, this.height);

        if (!this.active) {
            this.damages = 0;
            return;
        }

        const now = Date.now();
        if (now - this._then > this._interval) {
            this._state = (this._state + 1) % this._states;
            this._then = now;
        }

        const x = this.width * this._state;
        const y = 0;

        _canvas.ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
    }
}
exports.default = Fire;

},{"canvas":2,"components/destructible-static-actor":10,"images/obstacles":24}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _character = require('components/character');

var _character2 = _interopRequireDefault(_character);

var _canvas = require('canvas');

var _monsters = require('images/monsters');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _layers = require('layers');

var _collisions = require('utils/physics/collisions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Fly extends _character2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        var _ref$name = _ref.name;
        let name = _ref$name === undefined ? 'stationary' : _ref$name;

        super({ x: x, y: y, width: _monsters.flies.width, height: _monsters.flies.height, hp: 2, speed: 1.5, image: {
                type: 'sprite',
                src: _monsters.flies.sprite
            } });

        this._name = name;
        this._state = Math.round(Math.random() * _monsters.flies[this._name].states);
        this._states = _monsters.flies[this._name].states;
        this._interval = 50; // ms
        this._then = Date.now();
        this._dmgInterval = 500;
        this.damages = 0.5;
        this.type = 'fly';
    }

    updatePosition() {
        var _Store$get = _store2.default.get('player');

        const x = _Store$get.x;
        const y = _Store$get.y;


        switch (this._name) {
            default:
            case 'circling':
            case 'poopOrbital':
            case 'stationary':
                return;

            case 'homing':
                {
                    const dx = x - this.x;
                    const dy = y - this.y;
                    const deplacement = Math.sqrt(dx * dx + dy * dy);

                    const speedX = this.speed * (dx / deplacement);
                    const speedY = this.speed * (dy / deplacement);

                    this.x += speedX;
                    this.y += speedY;

                    const noFlies = _layers.foreground.map(item => {
                        if (item === _store2.default.get('monsters')) {
                            return item.filter(i => !(i instanceof Fly));
                        }
                        return item;
                    }).filter(item => item !== _store2.default.get('obstacles'));

                    const collider = (0, _collisions.isColliding)(this, noFlies);
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
    }

    die() {
        this._name = 'dying';
        this._state = 0;
        this.damages = 0;
        this._states = _monsters.flies[this._name].states;
        this.width = _monsters.flies[this._name].width;
        this.height = _monsters.flies[this._name].height;
        this._interval = 75;

        _store2.default.set('monsters', _store2.default.get('monsters').filter(monster => this !== monster));
    }

    renderSprite() {
        const isDying = 'dying' === this._name;

        if (!isDying) {
            this.updatePosition();
        } else if (this._state === this._states - 1) {
            this.active = false;
            return;
        }

        const coords = _monsters.flies[this._name].position || [0, 0];
        let x = coords[0];
        const y = coords[1];

        const now = Date.now();
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
}
exports.default = Fly;

},{"canvas":2,"components/character":6,"images/monsters":23,"layers":27,"store":28,"utils/physics/collisions":29}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _canvas = require('canvas');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _character = require('components/character');

var _character2 = _interopRequireDefault(_character);

var _tear = require('components/tear');

var _tear2 = _interopRequireDefault(_tear);

var _collisions = require('utils/physics/collisions');

var _constants = require('../constants');

var _characters = require('images/characters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

class Isaac extends _character2.default {
    constructor() {
        super({ width: 28, height: 35, speed: 200, name: 'Isaac', hp: 3, image: {
                type: 'sprite',
                src: _characters.isaac.sprite
            } });

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = _store2.default.get('tears');
        this._attackSpeed = 500; // 1 shoot / second
        this.damages = 1;
        this._direction = { x: 0, y: 1 };
        this.collidingWidth = this.width - 2;
        this.collidingHeight = this.height - 10;
        this.maxHp = 16;
        document.addEventListener('keydown', e => this._keysDown.add(e.keyCode));
        document.addEventListener('keyup', e => this._keysDown.delete(e.keyCode));

        this._dmgInterval = 500;
        this._lastDmg = Date.now();

        this.respawn();
    }

    canTakeDamage(_ref) {
        let update = _ref.update;

        const now = Date.now();
        const canTakeDamage = now - this._lastDmg > this._dmgInterval;

        if (update && canTakeDamage) {
            this._lastDmg = now;
        }

        return canTakeDamage;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (value !== this._x && _constants.LIMIT_LEFT_ISAAC < value && value < _constants.LIMIT_RIGHT_ISAAC) {
            const oldX = this._x;
            this._x = value;
            const enemy = (0, _collisions.isColliding)(this, _store2.default.get('monsters'));

            if (!enemy && !(0, _collisions.isColliding)(this, _store2.default.get('obstacles'))) {
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

    get y() {
        return this._y;
    }

    set y(value) {
        if (value !== this._y && _constants.LIMIT_TOP_ISAAC < value && value < _constants.LIMIT_BOTTOM_ISAAC) {
            const oldY = this._y;
            this._y = value;

            const enemy = (0, _collisions.isColliding)(this, _store2.default.get('monsters'));

            if (!enemy && !(0, _collisions.isColliding)(this, _store2.default.get('obstacles'))) {
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

    pickupItems() {
        const items = _store2.default.get('items');
        const playerItems = _store2.default.get('playerItems');
        const collectible = (0, _collisions.isColliding)(this, items);

        if (!collectible) {
            return;
        }

        items.remove(collectible);
        const item = collectible.toItem();

        for (let i = 0; i < item.quantity; i++) {
            const existingItem = playerItems.get(item.type) || { quantity: 0, items: [] };

            existingItem.quantity += 1;

            if (item.isDroppable) {
                existingItem.items.push(collectible.toDroppable());
            }

            playerItems.set(item.type, existingItem);
        }
    }

    update(time, now) {
        const deplacement = this.speed * time;
        const keysDown = this._keysDown;
        const direction = { x: 0, y: 1 };

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

        return this.updateShootingDirection(now);
    }

    updateShootingDirection(now) {
        const keysDown = this._keysDown;
        const direction = {};

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

    respawn() {
        this._x = _canvas.canvas.width / 2;
        this._y = _canvas.canvas.height / 2;
    }

    dropBomb() {
        const playerItems = _store2.default.get('playerItems');
        const existingItem = playerItems.get('bomb');

        if (existingItem && existingItem.quantity) {
            const x = this.x;
            const y = this.y;

            var _existingItem$items = _toArray(existingItem.items);

            const Bomb = _existingItem$items[0];

            const bombs = _existingItem$items.slice(1);

            existingItem.items = bombs;
            existingItem.quantity -= 1;

            const bomb = new Bomb({ x: x, y: y });
            bomb.drop();

            playerItems.set('bomb', existingItem);
        }
    }

    shoot() {
        let x;
        let y;

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

                    default:
                }

                break;
            case 1:
                x = this._x + 15;
                y = this._y + 2;
                break;

            default:
        }

        this._tears.push(new _tear2.default({
            x: x,
            y: y,
            direction: this._direction,
            creator: this,
            damages: this.damages
        }));
    }

    renderSprite() {
        const isShooting = this._isShooting;
        const now = Date.now();
        const direction = this._direction;
        let head;
        let x;
        let y;

        if (isShooting || !isShooting && now - this._lastShoot <= this._attackSpeed / 2) {
            head = _characters.isaac.head.shootingDirections;
        } else {
            head = _characters.isaac.head.directions;
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

            default:
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

                default:
            }
        }

        // leags
        _canvas.ctx.drawImage(this._image, 0, 25, 18, 14, this._x + 5, this._y + 20, 18, 14);

        // head
        _canvas.ctx.drawImage(this._image, x, y, _characters.isaac.head.width, _characters.isaac.head.height, this._x, this._y, _characters.isaac.head.width, _characters.isaac.head.height);
    }

    render() {
        const now = Date.now();
        const delta = now - this._then;
        this._then = now;

        this.update(delta / 1000, now);
        super.render();
    }
}
exports.default = Isaac;

},{"../constants":19,"canvas":2,"components/character":6,"components/tear":18,"images/characters":21,"store":28,"utils/physics/collisions":29}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _staticActor = require('components/static-actor');

var _staticActor2 = _interopRequireDefault(_staticActor);

var _canvas = require('canvas');

var _obstacles = require('images/obstacles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Rock extends _staticActor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;

        super({ x: x, y: y, width: 50, height: 51, image: {
                type: 'sprite',
                src: _obstacles.rocks.sprite
            } });

        this._isSpecial = 0.05 > Math.random();
    }

    renderSprite() {
        var _ref2 = this._isSpecial ? _obstacles.rocks.special.position : _obstacles.rocks.default.position;

        var _ref3 = _slicedToArray(_ref2, 2);

        const x = _ref3[0];
        const y = _ref3[1];


        _canvas.ctx.drawImage(this._image, x, y, _obstacles.rocks.width, _obstacles.rocks.height, this._x, this._y, this.width, this.height);
    }
}
exports.default = Rock;

},{"canvas":2,"components/static-actor":17,"images/obstacles":24}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('components/actor');

var _actor2 = _interopRequireDefault(_actor);

var _rooms = require('images/rooms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Room extends _actor2.default {
    constructor() {
        var _ref = arguments.length <= 0 || arguments[0] === undefined ? { image: { type: 'image', src: _rooms.defaultRoom } } : arguments[0];

        let image = _ref.image;

        super({ width: 800, height: 480, image: image });
        this._x = 0;
        this._y = 0;
    }
}
exports.default = Room;

},{"components/actor":4,"images/rooms":25}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actor = require('components/actor');

var _actor2 = _interopRequireDefault(_actor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StaticActor extends _actor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        let width = _ref.width;
        let height = _ref.height;
        let image = _ref.image;

        super({ width: width, height: height, image: image });

        this._x = x;
        this._y = y;
    }
}
exports.default = StaticActor;

},{"components/actor":4}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dynamicActor = require('components/dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var _constants = require('../constants');

var _tears = require('images/tears');

var _layers = require('layers');

var _collisions = require('utils/physics/collisions');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tear extends _dynamicActor2.default {
    constructor(_ref) {
        let x = _ref.x;
        let y = _ref.y;
        let direction = _ref.direction;
        let speed = _ref.speed;
        let creator = _ref.creator;
        let damages = _ref.damages;

        super({ width: 13, height: 13, image: { type: 'image', src: _tears.defaultTear } });

        this._x = x;
        this._y = y;
        this.active = true;
        this._speed = speed || 4;
        this._creator = creator;
        this.damages = damages;

        this.xVelocity = direction.x * this._speed;
        this.yVelocity = direction.y * this._speed;
    }

    get inBounds() {
        if (_constants.LIMIT_LEFT - this.width > this._x || this._x > _constants.LIMIT_RIGHT + this.width || _constants.LIMIT_TOP - this.height > this._y || this._y > _constants.LIMIT_BOTTOM + this.height) {
            return false;
        }

        const items = _store2.default.get('items');
        const collider = (0, _collisions.isColliding)(this, _layers.foreground.filter(item => item !== this._creator && item !== items));

        if (collider) {
            if ('number' === typeof collider.hp) {

                collider.hp -= this.damages;
            }

            return false;
        }

        return true;
    }

    update() {
        this._x += this.xVelocity;
        this._y += this.yVelocity;

        this.active = this.active && this.inBounds;
    }
}
exports.default = Tear;

},{"../constants":19,"components/dynamic-actor":11,"images/tears":26,"layers":27,"store":28,"utils/physics/collisions":29}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KEY_D = exports.KEY_S = exports.KEY_A = exports.KEY_W = exports.KEY_SPACE = exports.KEY_RIGHT = exports.KEY_LEFT = exports.KEY_DOWN = exports.KEY_UP = exports.LIMIT_RIGHT = exports.LIMIT_LEFT = exports.LIMIT_BOTTOM = exports.LIMIT_TOP = exports.LIMIT_RIGHT_ISAAC = exports.LIMIT_LEFT_ISAAC = exports.LIMIT_BOTTOM_ISAAC = exports.LIMIT_TOP_ISAAC = undefined;

var _canvas = require('canvas');

const LIMIT_TOP_ISAAC = exports.LIMIT_TOP_ISAAC = 40;
const LIMIT_BOTTOM_ISAAC = exports.LIMIT_BOTTOM_ISAAC = _canvas.canvas.height - 95;
const LIMIT_LEFT_ISAAC = exports.LIMIT_LEFT_ISAAC = 55;
const LIMIT_RIGHT_ISAAC = exports.LIMIT_RIGHT_ISAAC = _canvas.canvas.width - 85;

const LIMIT_TOP = exports.LIMIT_TOP = 55;
const LIMIT_BOTTOM = exports.LIMIT_BOTTOM = _canvas.canvas.height - 65;
const LIMIT_LEFT = exports.LIMIT_LEFT = 60;
const LIMIT_RIGHT = exports.LIMIT_RIGHT = _canvas.canvas.width - 75;

const KEY_UP = exports.KEY_UP = 38;
const KEY_DOWN = exports.KEY_DOWN = 40;
const KEY_LEFT = exports.KEY_LEFT = 37;
const KEY_RIGHT = exports.KEY_RIGHT = 39;
const KEY_SPACE = exports.KEY_SPACE = 32;
const KEY_W = exports.KEY_W = 87;
const KEY_A = exports.KEY_A = 65;
const KEY_S = exports.KEY_S = 83;
const KEY_D = exports.KEY_D = 68;

},{"canvas":2}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const hearts = exports.hearts = {
    sprite: 'build/img/hearts_sprite.png',
    width: 16,
    height: 16,
    empty: {
        position: [32, 0]
    },
    default: {
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

const bombs = exports.bombs = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default: {
        position: [0, 16]
    }
};

const keys = exports.keys = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default: {
        position: [16, 0]
    },
    golden: {
        position: [16, 16]
    }
};

const coins = exports.coins = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default: {
        position: [0, 0]
    }
};

const hardMode = exports.hardMode = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default: {
        position: [32, 0]
    }
};

const noAchievement = exports.noAchievement = {
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default: {
        position: [32, 16]
    }
};

exports.default = {
    hearts: hearts,
    bombs: bombs,
    keys: keys,
    coins: coins,
    hardMode: hardMode,
    noAchievement: noAchievement
};

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const isaac = exports.isaac = {
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

exports.default = {
    isaac: isaac
};

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const bombs = exports.bombs = {
    sprite: 'build/img/bombs_sprite.png',
    width: 32,
    height: 32,
    default: {
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

const coins = exports.coins = {
    sprite: 'build/img/coins_sprite.png',
    width: 20,
    height: 15,
    states: 6
};

exports.default = {
    bombs: bombs
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const flies = exports.flies = {
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

exports.default = {
    flies: flies
};

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const rocks = exports.rocks = {
    sprite: 'build/img/rocks_sprite.png',
    width: 170,
    height: 172,
    default: {
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

const fire = exports.fire = {
    sprite: 'build/img/fire_sprite.png',
    width: 31,
    height: 34,
    states: 6
};

const fireBase = exports.fireBase = {
    sprite: 'build/img/deadfire_sprite.png',
    width: 32,
    height: 32,
    position: [0, 34],
    deadPosition: [32, 34]
};

exports.default = {
    rocks: rocks,
    fire: fire,
    fireBase: fireBase
};

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const defaultRoom = exports.defaultRoom = 'build/img/room.png';

exports.default = {
    default: defaultRoom
};

},{}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const defaultTear = exports.defaultTear = 'build/img/tear.png';

exports.default = {
    default: defaultTear
};

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.foreground = exports.background = undefined;

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _collection = require('components/collection');

var _collection2 = _interopRequireDefault(_collection);

var _room = require('components/room');

var _room2 = _interopRequireDefault(_room);

var _HUD = require('components/HUD');

var _HUD2 = _interopRequireDefault(_HUD);

var _rock = require('components/rock');

var _rock2 = _interopRequireDefault(_rock);

var _fire = require('components/fire');

var _fire2 = _interopRequireDefault(_fire);

var _fly = require('components/fly');

var _fly2 = _interopRequireDefault(_fly);

var _bomb = require('components/bomb');

var _bomb2 = _interopRequireDefault(_bomb);

var _coin = require('components/coin');

var _coin2 = _interopRequireDefault(_coin);

var _isaac = require('components/isaac');

var _isaac2 = _interopRequireDefault(_isaac);

var _volumeController = require('volume-controller');

var _volumeController2 = _interopRequireDefault(_volumeController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_store2.default.set('room', new _room2.default());
_store2.default.set('HUD', new _HUD2.default());
_store2.default.set('noAchievement', true);
_store2.default.set('hardMode', false);
_store2.default.set('sounds', new _volumeController2.default());
_store2.default.set('backgroundObstacles', new _collection2.default({ collection: [] }));

_store2.default.set('tears', new _collection2.default({ shouldUpdateBeforeRender: true }));

_store2.default.set('obstacles', new _collection2.default({ collection: [new _rock2.default({ x: 450, y: 120 }), new _rock2.default({ x: 65, y: 65 }), new _rock2.default({ x: 115, y: 65 }), new _rock2.default({ x: 165, y: 65 }), new _rock2.default({ x: 65, y: 116 }), new _rock2.default({ x: 115, y: 116 }), new _rock2.default({ x: 165, y: 116 })], shouldUpdateBeforeRender: true }));

_store2.default.set('items', new _collection2.default({ collection: [new _bomb2.default({ x: 82, y: 356 }), new _coin2.default({ x: 140, y: 375 }), new _coin2.default({ x: 160, y: 375 }), new _coin2.default({ x: 180, y: 375 }), new _coin2.default({ x: 200, y: 375 }), new _coin2.default({ x: 680, y: 80 }), new _coin2.default({ x: 680, y: 65 })] }));

_store2.default.set('monsters', new _collection2.default({ collection: [new _fire2.default({ x: 703, y: 65 }), new _fire2.default({ x: 650, y: 65 }), new _fly2.default({ x: 250, y: 65 })],
    // new Fly({ x: 300, y: 65, name: 'homing', }),
    // new Fly({ x: 330, y: 65, name: 'homing', }),
    // new Fly({ x: 350, y: 65, name: 'homing', }),
    // new Fly({ x: 360, y: 65, name: 'homing', }),
    shouldUpdateBeforeRender: true }));

_store2.default.set('player', new _isaac2.default());
_store2.default.set('playerItems', new Map());

const background = exports.background = new _collection2.default({ collection: [_store2.default.get('room'), _store2.default.get('backgroundObstacles'), _store2.default.get('HUD')] });

const foreground = exports.foreground = new _collection2.default({ collection: [_store2.default.get('obstacles'), _store2.default.get('monsters'), _store2.default.get('items'), _store2.default.get('tears'), _store2.default.get('player')] });

window.Store = _store2.default;
window.Player = _store2.default.get('player');
window.items = _store2.default.get('items');

// export const obstacles = foreground[0];
// export const monsters = foreground[1];
// export const player = foreground[2];

},{"components/HUD":3,"components/bomb":5,"components/coin":7,"components/collection":9,"components/fire":12,"components/fly":13,"components/isaac":14,"components/rock":15,"components/room":16,"store":28,"volume-controller":30}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Store = new Map();
exports.default = Store;

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isColliding = exports.getColliders = undefined;

var _collection = require('components/collection');

var _collection2 = _interopRequireDefault(_collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getColliders = exports.getColliders = (target, other) => {
    // ignore collision with self
    if (target === other) {
        return false;
    }

    const x = target.x;
    const width = target.collidingWidth || target.width;
    const y = target.y;
    const height = target.collidingHeight || target.height;

    if (Array.isArray(other) || other instanceof _collection2.default) {
        const colliders = [];
        for (let i = 0, len = other.length; i < len; i++) {
            const _colliders = getColliders(target, other[i]);

            if (_colliders) {
                colliders.push.apply(colliders, _colliders); // eslint-disable-line prefer-spread
            }
        }

        return colliders.length ? colliders : false;
    }

    const _x = other.x;
    const _width = other.collidingWidth || other.width;
    const _y = other.y;
    const _height = other.collidingHeight || other.height;

    const top = y + height >= _y;
    const right = x <= _x + _width;
    const bottom = y + height <= _y + _height;
    const left = x + width >= _x;

    if (left && right && bottom && top) {
        return [other];
    }

    return false;
};

const isColliding = exports.isColliding = (target, other) => {
    // ignore collision with self
    if (target === other) {
        return false;
    }

    const x = target.x;
    const width = target.collidingWidth || target.width;
    const y = target.y;
    const height = target.collidingHeight || target.height;

    if (Array.isArray(other) || other instanceof _collection2.default) {
        for (let i = 0, len = other.length; i < len; i++) {
            const collider = isColliding(target, other[i]);
            if (collider) {
                return collider;
            }
        }

        return false;
    }

    const _x = other.x;
    const _width = other.collidingWidth || other.width;
    const _y = other.y;
    const _height = other.collidingHeight || other.height;

    const top = y + height >= _y;
    const right = x <= _x + _width;
    const bottom = y + height <= _y + _height;
    const left = x + width >= _x;

    if (left && right && bottom && top) {
        return other;
    }

    return false;
};

},{"components/collection":9}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _volumeElements = require('volume-elements');

const text = 'undefined' === typeof _volumeElements.volumeDisplay.innerText ? 'textContent' : 'innerText';
class VolumeController {
    constructor() {
        let volume = arguments.length <= 0 || arguments[0] === undefined ? 50 : arguments[0];
        let muted = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        this.volume = volume;
        this.muted = muted;

        this.updateDisplay(_volumeElements.volumeDisplay);
        this.observe(_volumeElements.volumeSlider);
    }

    observe(input) {
        input.addEventListener('change', _ref => {
            let target = _ref.target;

            this.volume = target.value;
            this.updateDisplay(_volumeElements.volumeDisplay);
        });
    }

    updateDisplay(span) {
        span[text] = `${ this._volume } %`;
    }

    get volume() {
        return this._volume;
    }

    set volume(value) {
        if (0 <= value && 100 >= value) {
            this._volume = value;
        }
    }

    get muted() {
        return this._muted;
    }

    set muted(value) {
        this._muted = !!value;
    }
}
exports.default = VolumeController;

},{"volume-elements":31}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const volumeSlider = exports.volumeSlider = document.getElementById('js-volume');
const volumeDisplay = exports.volumeDisplay = document.getElementById('js-volume--display');

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhbnZhcy5qcyIsInNyYy9jb21wb25lbnRzL0hVRC5qcyIsInNyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsInNyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsInNyYy9jb21wb25lbnRzL2NvaW4uanMiLCJzcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsInNyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCJzcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsInNyYy9jb21wb25lbnRzL2ZpcmUuanMiLCJzcmMvY29tcG9uZW50cy9mbHkuanMiLCJzcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsInNyYy9jb21wb25lbnRzL3JvY2suanMiLCJzcmMvY29tcG9uZW50cy9yb29tLmpzIiwic3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvdGVhci5qcyIsInNyYy9jb25zdGFudHMuanMiLCJzcmMvaW1hZ2VzL0hVRC5qcyIsInNyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsInNyYy9pbWFnZXMvaXRlbXMuanMiLCJzcmMvaW1hZ2VzL21vbnN0ZXJzLmpzIiwic3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCJzcmMvaW1hZ2VzL3Jvb21zLmpzIiwic3JjL2ltYWdlcy90ZWFycy5qcyIsInNyYy9sYXllcnMuanMiLCJzcmMvc3RvcmUuanMiLCJzcmMvdXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zLmpzIiwic3JjL3ZvbHVtZS1jb250cm9sbGVyLmpzIiwic3JjL3ZvbHVtZS1lbGVtZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBRUEsTUFB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S0FBWCxFQUNBO0FBQ0ksWUFBSSxLQUFLLEtBQUwsSUFBYyxPQUFPLEtBQXpCLEVBQ0E7QUFDSSxpQkFBSyxPQUFMLEdBQWUsS0FBZjtBQUNIO0FBQ0o7O0FBRUQsUUFBSSxLQUFKLEdBQ0E7QUFDSSxlQUFPLEtBQUssTUFBWjtBQUNIOztBQUVELFFBQUksS0FBSixDQUFVLEtBQVYsRUFDQTtBQUNJLGFBQUssTUFBTCxHQUFjLENBQUMsQ0FBQyxLQUFoQjtBQUNIO0FBN0NMO2tCQURxQixnQjs7Ozs7Ozs7QUNIZCxNQUFNLHNDQUFlLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFyQjtBQUNBLE1BQU0sd0NBQWdCLFNBQVMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBdEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgZGlzcGxheUN0eCwgY2FudmFzIH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZvcmVncm91bmQsIGJhY2tncm91bmQgfSBmcm9tICdsYXllcnMnO1xuXG5jb25zdCBtYWluID0gKCkgPT5cbntcbiAgICBiYWNrZ3JvdW5kLnJlbmRlcigpO1xuICAgIGZvcmVncm91bmQucmVuZGVyKCk7XG5cbiAgICBkaXNwbGF5Q3R4LmRyYXdJbWFnZShjYW52YXMsIDAsIDApOyAvLyBkcmF3IHNvbWV0aGluZyB2aXNpYmxlIG9ubHkgb25jZSBwZXIgZnJhbWUuXG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XG59O1xuXG5tYWluKCk7XG4iLCJleHBvcnQgY29uc3QgZGlzcGxheUNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbmV4cG9ydCBjb25zdCBkaXNwbGF5Q3R4ID0gZGlzcGxheUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5leHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5jYW52YXMud2lkdGggPSBkaXNwbGF5Q2FudmFzLndpZHRoO1xuY2FudmFzLmhlaWdodCA9IGRpc3BsYXlDYW52YXMuaGVpZ2h0O1xuZXhwb3J0IGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBoZWFydHMsIGJvbWJzLCBrZXlzLCBjb2lucywgaGFyZE1vZGUsIG5vQWNoaWV2ZW1lbnQgfSBmcm9tICdpbWFnZXMvSFVEJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSFVEXG57XG4gICAgY29uc3RydWN0b3IoKVxuICAgIHtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW107XG5cbiAgICAgICAgY29uc3QgZWxlbWVudHMgPVxuICAgICAgICB7XG4gICAgICAgICAgICBoZWFydHMsXG4gICAgICAgICAgICBib21icyxcbiAgICAgICAgICAgIGtleXMsXG4gICAgICAgICAgICBjb2lucyxcbiAgICAgICAgICAgIGhhcmRNb2RlLFxuICAgICAgICAgICAgbm9BY2hpZXZlbWVudCxcbiAgICAgICAgfTtcblxuICAgICAgICBPYmplY3Qua2V5cyhlbGVtZW50cykuZm9yRWFjaChwcm9wID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IHsgc3ByaXRlIH0gPSBlbGVtZW50c1twcm9wXTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzW3Byb3BdID0gc3ByaXRlO1xuXG4gICAgICAgICAgICBjb25zdCBpbWFnZSA9XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IG5ldyBJbWFnZSgpLFxuICAgICAgICAgICAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZXNbcHJvcF0gPSBpbWFnZTtcblxuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uub25sb2FkID0gKCkgPT4geyBpbWFnZS5yZWFkeSA9IHRydWU7IH07XG4gICAgICAgICAgICBpbWFnZS5pbWFnZS5zcmMgPSBzcHJpdGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4gICAgICAgIGlmICh0aGlzLl9pbWFnZXMuaGVhcnRzLnJlYWR5KVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhlYXJ0cy53aWR0aCAqIDEuNTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGhlYXJ0cy5oZWlnaHQgKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDEwO1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFkgPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IG9yaWdpbmFsSHAgPSBTdG9yZS5nZXQoJ3BsYXllcicpLmhwO1xuXG4gICAgICAgICAgICBjb25zdCBocCA9IG9yaWdpbmFsSHA7XG4gICAgICAgICAgICBsZXQgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgbGV0IHkgPSBpbml0aWFsWTtcblxuICAgICAgICAgICAgbGV0IF9ocCA9IDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChfaHAgPCBocClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuZGVmYXVsdC5wb3NpdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmIChfaHAgKyAwLjUgPT09IGhwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBoZWFydHMuaGFsZmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZXMuaGVhcnRzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoZWFydHMud2lkdGgsIGhlYXJ0cy5oZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHggKz0gd2lkdGg7XG4gICAgICAgICAgICAgICAgX2hwICs9IDE7XG5cbiAgICAgICAgICAgICAgICBpZiAoNyA8IF9ocCAmJiA4ID49IF9ocClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB4ID0gaW5pdGlhbFg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGluaXRpYWxZID0gNDA7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlcy5jb2lucy5yZWFkeSlcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gY29pbnMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBjb2lucy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJDb2lucyA9IFN0b3JlLmdldCgncGxheWVySXRlbXMnKS5nZXQoJ2NvaW4nKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQ29pbnMgPyBwbGF5ZXJDb2lucy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gY29pbnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmNvaW5zLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBjb2lucy53aWR0aCwgY29pbnMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlcy5ib21icy5yZWFkeSlcbiAgICAgICAge1xuXG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBib21icy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGJvbWJzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllckJvbWJzID0gU3RvcmUuZ2V0KCdwbGF5ZXJJdGVtcycpLmdldCgnYm9tYicpO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJCb21icyA/IHBsYXllckJvbWJzLnF1YW50aXR5IDogMDtcblxuICAgICAgICAgICAgY29uc3QgWyBzcHJpdGVYLCBzcHJpdGVZIF0gPSBib21icy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZXMuYm9tYnMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGJvbWJzLndpZHRoLCBib21icy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGAke2NvdW50fWAsIGluaXRpYWxYICsgd2lkdGggKyAzLCBpbml0aWFsWSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5faW1hZ2VzLmtleXMucmVhZHkpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0ga2V5cy53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IGtleXMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyS2V5cyA9IFN0b3JlLmdldCgncGxheWVySXRlbXMnKS5nZXQoJ2tleScpO1xuICAgICAgICAgICAgY29uc3QgY291bnQgPSBwbGF5ZXJLZXlzID8gcGxheWVyS2V5cy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0ga2V5cy5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZXMua2V5cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwga2V5cy53aWR0aCwga2V5cy5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAwID09PSBjb3VudCA/ICdyZ2IoMTc1LCAxNzUsIDE3NSknIDogJ3JnYigyMjUsIDIyNSwgMjI1KSc7XG4gICAgICAgICAgICBjdHguZm9udCA9ICcxNHB4IG1vbm9zcGFjZSc7XG4gICAgICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICd0b3AnO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGAke2NvdW50fWAsIGluaXRpYWxYICsgd2lkdGggKyAzLCBpbml0aWFsWSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoU3RvcmUuZ2V0KCdoYXJkTW9kZScpICYmIHRoaXMuX2ltYWdlcy5oYXJkTW9kZS5yZWFkeSlcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gaGFyZE1vZGUud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoYXJkTW9kZS5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG5cbiAgICAgICAgICAgIGNvbnN0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGFyZE1vZGUuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmhhcmRNb2RlLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBoYXJkTW9kZS53aWR0aCwgaGFyZE1vZGUuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFN0b3JlLmdldCgnbm9BY2hpZXZlbWVudCcpICYmIHRoaXMuX2ltYWdlcy5ub0FjaGlldmVtZW50LnJlYWR5KVxuICAgICAgICB7XG4gICAgICAgICAgICBpbml0aWFsWSArPSAyMDtcblxuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBub0FjaGlldmVtZW50LndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gbm9BY2hpZXZlbWVudC5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG5cbiAgICAgICAgICAgIGNvbnN0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gbm9BY2hpZXZlbWVudC5kZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZXMubm9BY2hpZXZlbWVudC5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgbm9BY2hpZXZlbWVudC53aWR0aCwgbm9BY2hpZXZlbWVudC5oZWlnaHQsIGluaXRpYWxYLCBpbml0aWFsWSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgeD1udWxsLCB5PW51bGwsIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0pXG4gICAge1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2UgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuXG4gICAgICAgIGlmICh0aGlzLmltYWdlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4geyB0aGlzLnJlYWR5ID0gdHJ1ZTsgfTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRJbWFnZShpbWFnZSwgdHlwZT0naW1hZ2UnKVxuICAgIHtcbiAgICAgICAgaWYgKCdjYW52YXMnID09PSB0eXBlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlID0gaW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW1hZ2UgIT09IHRoaXMuaW1hZ2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgc3JjOiBpbWFnZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uub25sb2FkID0gKCkgPT4geyB0aGlzLnJlYWR5ID0gdHJ1ZTsgfTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLnNyYyA9IHRoaXMuaW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgodmFsdWUpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHkoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3k7XG4gICAgfVxuXG4gICAgc2V0IHkodmFsdWUpXG4gICAge1xuICAgICAgICB0aGlzLl95ID0gdmFsdWU7XG4gICAgfVxuXG5cbiAgICBnZXQgY2VudGVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiB0aGlzLl94ICsgdGhpcy53aWR0aCAvIDIsXG4gICAgICAgICAgICB5OiB0aGlzLl95ICsgdGhpcy5oZWlnaHQgLyAyLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBjb25zdCB4ID0gTWF0aC5yb3VuZCh0aGlzLl94KTtcbiAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQodGhpcy5feSk7XG5cbiAgICAgICAgaWYgKHRoaXMuaW1hZ2UgJiYgdGhpcy5yZWFkeSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCdpbWFnZScgPT09IHRoaXMuaW1hZ2UudHlwZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdzcHJpdGUnID09PSB0aGlzLmltYWdlLnR5cGUgJiYgdGhpcy5yZW5kZXJTcHJpdGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJTcHJpdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBib21icyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5pbXBvcnQgZ2V0Q29sbGlkZXJzIGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuXG5jbGFzcyBCb21iQWN0b3IgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHkgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDEuMDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDYwOyAvLyB0aW1lIGJldHdlZW4gZnJhbWVzIG9mIGV4cGxvc2lvblxuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSAwO1xuICAgIH1cblxuICAgIGRyb3AoKVxuICAgIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KDo6dGhpcy5yZW5kZXJFeHBsb3Npb24sIDQwMDApOyAvLyA0IHNlY29uZHMgYWZ0ZXJcblxuICAgICAgICBTdG9yZS5nZXQoJ3RlYXJzJykucHVzaCh0aGlzKTtcbiAgICB9XG5cbiAgICByZW5kZXJFeHBsb3Npb24oKVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IGJvbWJzLmV4cGxvc2lvbi53aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBib21icy5leHBsb3Npb24uaGVpZ2h0O1xuICAgICAgICB0aGlzLnNldEltYWdlKGJvbWJzLmV4cGxvc2lvbi5zcHJpdGUsICdzcHJpdGUnKTtcbiAgICAgICAgdGhpcy5pc0V4cGxvZGluZyA9IHRydWU7XG5cbiAgICAgICAgLy8gREVTVFJPWSBBTEwgVEhFIFRISU5HUyBOT1dcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuICAgICAgICBsZXQgX3g7XG4gICAgICAgIGxldCBfeTtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAodGhpcy5pc0V4cGxvZGluZylcbiAgICAgICAge1xuICAgICAgICAgICAgWyB4LCB5IF0gPSBbIHRoaXMuX3N0YXRlICogdGhpcy53aWR0aCwgMCwgXTtcbiAgICAgICAgICAgIFsgX3gsIF95IF0gPSBbIHRoaXMuX3ggLSBib21icy53aWR0aCwgdGhpcy5feSAtIGJvbWJzLmhlaWdodCAqIDIsIF07XG5cbiAgICAgICAgICAgIGlmIChub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgKz0gMTtcbiAgICAgICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBib21icy5leHBsb3Npb24uc3RhdGVzKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIXRoaXMuaXNFeHBsb2RpbmcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFsgeCwgeSBdID0gYm9tYnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIFsgX3gsIF95IF0gPSBbIHRoaXMuX3gsIHRoaXMuX3ksIF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCBfeCwgX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbWIgZXh0ZW5kcyBDb2xsZWN0aWJsZVxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB4LCB5LCB3aWR0aDogYm9tYnMud2lkdGgsIGhlaWdodDogYm9tYnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGJvbWJzLnNwcml0ZSxcbiAgICAgICAgfSwgfSk7XG5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDAuMiA+IE1hdGgucmFuZG9tKCkgPyAyIDogMTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgYm9tYk5hbWUgPSAxID09PSB0aGlzLnF1YW50aXR5ID8gJ2RlZmF1bHQnIDogJ2RvdWJsZSc7XG4gICAgICAgIGNvbnN0IFsgeCwgeSBdID0gYm9tYnNbYm9tYk5hbWVdLnBvc2l0aW9uIHx8IFsgMCwgMCwgXTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cblxuICAgIHRvSXRlbSgpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2JvbWInLFxuICAgICAgICAgICAgcXVhbnRpdHk6IHRoaXMucXVhbnRpdHksXG4gICAgICAgICAgICBpc0Ryb3BwYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB0b0Ryb3BwYWJsZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gQm9tYkFjdG9yOyAvLyByZXR1cm4gdGhlIGNsYXNzIHNvIHRoZSB3ZWFyZXIgY2FuIGRvIG5ldyBvbiBpdC5cbiAgICB9XG59XG4iLCJpbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkLCBuYW1lLCBocCwgeCwgeSB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgeCwgeSwgfSk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fb3JpZ2luYWxIcCA9IGhwO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBzZXQgbmFtZSh2YWx1ZSlcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FuXFwndCBjaGFuZ2UgbmFtZSwgbmFtZSBzZXR0ZXI6JyArIHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICgwIDwgdmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWUgPD0gKHRoaXMubWF4SHAgfHwgMTYpID8gdmFsdWUgOiB0aGlzLm1heEhwIHx8IDE2O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKDAgPj0gdmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGllKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuZGllKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3Bhd24pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5faHAgPSB0aGlzLl9vcmlnaW5hbEhwO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcGF3bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbGxlY3RpYmxlIGZyb20gJ2NvbXBvbmVudHMvY29sbGVjdGlibGUnO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGNvaW5zIH0gZnJvbSAnaW1hZ2VzL2l0ZW1zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29pbiBleHRlbmRzIENvbGxlY3RpYmxlXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5IH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiBjb2lucy53aWR0aCwgaGVpZ2h0OiBjb2lucy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogY29pbnMuc3ByaXRlLFxuICAgICAgICB9LCB9KTtcblxuICAgICAgICBjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKChNYXRoLnJhbmRvbSgpICogY29pbnMuc3RhdGVzKSk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGNvaW5zLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGlmICgwLjEgPCByYW5kKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnZGVmYXVsdCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoMC4wNSA8IHJhbmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSA1O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICduaWNrZWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKDAuMDIgPCByYW5kKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTA7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ2RpbWUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKDAuMDA1IDwgcmFuZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDI1O1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICdxdWFydGVyJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vIHNwcml0ZSBmb3IgdGhlIGJpZyBtb25leXogeWV0LlxuICAgICAgICB0aGlzLnF1YW50aXR5ID0gMTtcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgLy8gY29uc3QgWyB4LCB5IF0gPSBjb2luc1t0aGlzLl9uYW1lXS5wb3NpdGlvbiB8fCBbMCwgMCwgXTtcbiAgICAgICAgLy8gY3R4LmRyYXdJbWFnZSggdGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCApO1xuXG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmIChub3cgLSB0aGlzLl90aGVuID4gdGhpcy5faW50ZXJ2YWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gKHRoaXMuX3N0YXRlICsgMSkgJSB0aGlzLl9zdGF0ZXM7XG4gICAgICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeCA9IHRoaXMud2lkdGggKiB0aGlzLl9zdGF0ZTtcbiAgICAgICAgY29uc3QgeSA9IDA7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdjb2luJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICB9O1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RpYmxlIGV4dGVuZHMgU3RhdGljQWN0b3JcbntcbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b0l0ZW0oKSBtdXN0IGJlIGltcGxlbWVudGVkJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIEFycmF5XG57XG4gICAgY29uc3RydWN0b3IoeyBjb2xsZWN0aW9uPVtdLCBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI9ZmFsc2UsIHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyPWZhbHNlIH0pXG4gICAge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnB1c2goLi4uY29sbGVjdGlvbik7XG5cbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyID0gc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyO1xuICAgICAgICB0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciA9IHNob3VsZFVwZGF0ZUFmdGVyUmVuZGVyO1xuICAgIH1cblxuICAgIGdldCBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gMCA9PT0gdGhpcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmVtb3ZlKGl0ZW0pXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5kZXhPZihpdGVtKTtcblxuICAgICAgICBpZiAoLTEgPCBpbmRleClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoO1xuICAgICAgICBjb25zdCBuZXdUaGlzID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IHRoaXNbaV07XG5cbiAgICAgICAgICAgIGlmIChpdGVtLnVwZGF0ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpdGVtLnVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmFsc2UgPT09IGl0ZW0uYWN0aXZlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlbmRlckRlc3Ryb3kpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnJlbmRlckRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBsYXllciA9IGl0ZW0uaW5hY3RpdmVMYXllcjtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTdG9yZS5nZXQobGF5ZXIpLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5ld1RoaXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld0xlbmd0aCA9IG5ld1RoaXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChuZXdMZW5ndGggIT09IGxlbilcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBuZXdMZW5ndGg7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IG5ld1RoaXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciAmJiAhdGhpcy5pc0VtcHR5KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5yZW5kZXIoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZFVwZGF0ZUFmdGVyUmVuZGVyICYmICF0aGlzLmlzRW1wdHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXN0cnVjdGlibGVTdGF0aWNBY3RvciBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgaHAgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0pO1xuXG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZG1nSW50ZXJ2YWwgPSA1MDA7XG4gICAgICAgIHRoaXMuX2xhc3REbWcgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKHZhbHVlKVxuICAgIHtcbiAgICAgICAgaWYgKDAgPCB2YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSwgc3BlZWQgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIH0pO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQgfHwgMjU2O1xuICAgIH1cblxuICAgIGdldCBzcGVlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuXG4gICAgc2V0IHNwZWVkKHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmaXJlLCBmaXJlQmFzZSB9IGZyb20gJ2ltYWdlcy9vYnN0YWNsZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaXJlIGV4dGVuZHMgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHkgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgeCwgeSwgd2lkdGg6IGZpcmUud2lkdGgsIGhlaWdodDogZmlyZS5oZWlnaHQsIGhwOiAzLCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZpcmUuc3ByaXRlLFxuICAgICAgICB9LCB9KTtcblxuICAgICAgICB0aGlzLl9zdGF0ZSA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiBmaXJlLnN0YXRlcykpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmaXJlLnN0YXRlcztcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSAxMDA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSAwLjU7XG4gICAgfVxuXG4gICAgZ2V0IGluYWN0aXZlTGF5ZXIoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuICdiYWNrZ3JvdW5kT2JzdGFjbGVzJztcbiAgICB9XG5cbiAgICByZW5kZXJTcHJpdGUoKVxuICAgIHtcbiAgICAgICAgY29uc3QgWyB3b29kWCwgd29vZFkgXSA9IHRoaXMuYWN0aXZlID8gZmlyZUJhc2UucG9zaXRpb24gOiBmaXJlQmFzZS5kZWFkUG9zaXRpb247XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHdvb2RYLCB3b29kWSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3kgKyAxNywgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZGFtYWdlcyA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAobm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICh0aGlzLl9zdGF0ZSArIDEpICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENoYXJhY3RlciBmcm9tICdjb21wb25lbnRzL2NoYXJhY3Rlcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZmxpZXMgfSBmcm9tICdpbWFnZXMvbW9uc3RlcnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHkgZXh0ZW5kcyBDaGFyYWN0ZXJcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHksIG5hbWU9J3N0YXRpb25hcnknIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiBmbGllcy53aWR0aCwgaGVpZ2h0OiBmbGllcy5oZWlnaHQsIGhwOiAyLCBzcGVlZDogMS41LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGZsaWVzLnNwcml0ZSxcbiAgICAgICAgfSwgfSk7XG5cbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTWF0aC5yb3VuZCgoTWF0aC5yYW5kb20oKSAqIGZsaWVzW3RoaXMuX25hbWVdLnN0YXRlcykpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gNTA7IC8vIG1zXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgICAgICB0aGlzLnR5cGUgPSAnZmx5JztcbiAgICB9XG5cbiAgICB1cGRhdGVQb3NpdGlvbigpXG4gICAge1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IFN0b3JlLmdldCgncGxheWVyJyk7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLl9uYW1lKVxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FzZSAnY2lyY2xpbmcnOlxuICAgICAgICAgICAgY2FzZSAncG9vcE9yYml0YWwnOlxuICAgICAgICAgICAgY2FzZSAnc3RhdGlvbmFyeSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBjYXNlICdob21pbmcnOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSB4IC0gdGhpcy54O1xuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0geSAtIHRoaXMueTtcbiAgICAgICAgICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IE1hdGguc3FydCgoZHggKiBkeCkgKyAoZHkgKiBkeSkpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlZWRYID0gdGhpcy5zcGVlZCAqIChkeCAvIGRlcGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZFkgPSB0aGlzLnNwZWVkICogKGR5IC8gZGVwbGFjZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IHNwZWVkWDtcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gc3BlZWRZO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9GbGllcyA9IGZvcmVncm91bmRcbiAgICAgICAgICAgICAgICAgICAgLm1hcChpdGVtID0+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtID09PSBTdG9yZS5nZXQoJ21vbnN0ZXJzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZmlsdGVyKGkgPT4gIShpIGluc3RhbmNlb2YgRmx5KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IFN0b3JlLmdldCgnb2JzdGFjbGVzJykpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyh0aGlzLCBub0ZsaWVzKTtcbiAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnggLT0gc3BlZWRYO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgLT0gc3BlZWRZO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xsaWRlci5jYW5UYWtlRGFtYWdlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5jYW5UYWtlRGFtYWdlKHsgdXBkYXRlOiB0cnVlLCB9KSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIuaHAgLT0gdGhpcy5kYW1hZ2VzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkaWUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbmFtZSA9ICdkeWluZyc7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMDtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gZmxpZXNbdGhpcy5fbmFtZV0uc3RhdGVzO1xuICAgICAgICB0aGlzLndpZHRoID0gZmxpZXNbdGhpcy5fbmFtZV0ud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gZmxpZXNbdGhpcy5fbmFtZV0uaGVpZ2h0O1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDc1O1xuXG4gICAgICAgIFN0b3JlLnNldCgnbW9uc3RlcnMnLCBTdG9yZS5nZXQoJ21vbnN0ZXJzJylcbiAgICAgICAgICAgIC5maWx0ZXIobW9uc3RlciA9PiB0aGlzICE9PSBtb25zdGVyKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGlzRHlpbmcgPSAnZHlpbmcnID09PSB0aGlzLl9uYW1lO1xuXG4gICAgICAgIGlmICghaXNEeWluZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLl9zdGF0ZXMgLSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29vcmRzID0gZmxpZXNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWyAwLCAwLCBdO1xuICAgICAgICBsZXQgeCA9IGNvb3Jkc1swXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAobm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNEeWluZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICh0aGlzLl9zdGF0ZSArIDEpICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIHggKz0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgd2lkdGg6IDI4LCBoZWlnaHQ6IDM1LCBzcGVlZDogMjAwLCBuYW1lOiAnSXNhYWMnLCBocDogMywgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBpc2FhYy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gU3RvcmUuZ2V0KCd0ZWFycycpO1xuICAgICAgICB0aGlzLl9hdHRhY2tTcGVlZCA9IDUwMDsgLy8gMSBzaG9vdCAvIHNlY29uZFxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB7IHg6IDAsIHk6IDEsIH07XG4gICAgICAgIHRoaXMuY29sbGlkaW5nV2lkdGggPSB0aGlzLndpZHRoIC0gMjtcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdIZWlnaHQgPSB0aGlzLmhlaWdodCAtIDEwO1xuICAgICAgICB0aGlzLm1heEhwID0gMTY7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHRoaXMuX2tleXNEb3duLmFkZChlLmtleUNvZGUpKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZShlLmtleUNvZGUpKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgY2FuVGFrZURhbWFnZSh7IHVwZGF0ZSB9KVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgY2FuVGFrZURhbWFnZSA9IG5vdyAtIHRoaXMuX2xhc3REbWcgPiB0aGlzLl9kbWdJbnRlcnZhbDtcblxuICAgICAgICBpZiAodXBkYXRlICYmIGNhblRha2VEYW1hZ2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FuVGFrZURhbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5feCAmJlxuICAgICAgICAgICAgTElNSVRfTEVGVF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFRfSVNBQUMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFggPSB0aGlzLl94O1xuICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBpc0NvbGxpZGluZyh0aGlzLCBTdG9yZS5nZXQoJ21vbnN0ZXJzJykpO1xuXG4gICAgICAgICAgICBpZiAoIWVuZW15ICYmICFpc0NvbGxpZGluZyh0aGlzLCBTdG9yZS5nZXQoJ29ic3RhY2xlcycpKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgaWYgKGVuZW15ICYmIHRoaXMuY2FuVGFrZURhbWFnZSh7IHVwZGF0ZTogdHJ1ZSwgfSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCAtPSBlbmVteS5kYW1hZ2VzIHx8IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5feSAmJlxuICAgICAgICAgICAgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFkgPSB0aGlzLl95O1xuICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKHRoaXMsIFN0b3JlLmdldCgnbW9uc3RlcnMnKSk7XG5cbiAgICAgICAgICAgIGlmICghZW5lbXkgJiYgIWlzQ29sbGlkaW5nKHRoaXMsIFN0b3JlLmdldCgnb2JzdGFjbGVzJykpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3kgPSBvbGRZO1xuXG4gICAgICAgICAgICBpZiAoZW5lbXkgJiYgdGhpcy5jYW5UYWtlRGFtYWdlKHsgdXBkYXRlOiB0cnVlLCB9KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcGlja3VwSXRlbXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBTdG9yZS5nZXQoJ2l0ZW1zJyk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCdwbGF5ZXJJdGVtcycpO1xuICAgICAgICBjb25zdCBjb2xsZWN0aWJsZSA9IGlzQ29sbGlkaW5nKHRoaXMsIGl0ZW1zKTtcblxuICAgICAgICBpZiAoIWNvbGxlY3RpYmxlKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoY29sbGVjdGlibGUpO1xuICAgICAgICBjb25zdCBpdGVtID0gY29sbGVjdGlibGUudG9JdGVtKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldChpdGVtLnR5cGUpIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmlzRHJvcHBhYmxlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5pdGVtcy5wdXNoKGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoaXRlbS50eXBlLCBleGlzdGluZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKHRpbWUsIG5vdylcbiAgICB7XG4gICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gdGhpcy5zcGVlZCAqIHRpbWU7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHsgeDogMCwgeTogMSwgfTtcblxuICAgICAgICBpZiAoMCA9PT0gZGVwbGFjZW1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwID09PSBrZXlzRG93bi5zaXplKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfVykgJiZcbiAgICAgICAgICAgICEoa2V5c0Rvd24uaGFzKEtFWV9BKSB8fCBrZXlzRG93bi5oYXMoS0VZX0QpKSkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzRG93bi5oYXMoS0VZX1cpKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gTWF0aC5zcXJ0KE1hdGgucG93KGRlcGxhY2VtZW50LCAyKSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNEb3duLmhhcyhLRVlfUykgJiZcbiAgICAgICAgICAgICEoa2V5c0Rvd24uaGFzKEtFWV9BKSB8fCBrZXlzRG93bi5oYXMoS0VZX0QpKSkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNEb3duLmhhcyhLRVlfUykpIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnNxcnQoTWF0aC5wb3coZGVwbGFjZW1lbnQsIDIpIC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5c0Rvd24uaGFzKEtFWV9BKSAmJlxuICAgICAgICAgICAgIShrZXlzRG93bi5oYXMoS0VZX1cpIHx8IGtleXNEb3duLmhhcyhLRVlfUykpKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9BKSkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IE1hdGguc3FydChNYXRoLnBvdyhkZXBsYWNlbWVudCwgMikgLyAyKTtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9EKSAmJlxuICAgICAgICAgICAgIShrZXlzRG93bi5oYXMoS0VZX1cpIHx8IGtleXNEb3duLmhhcyhLRVlfUykpKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzRG93bi5oYXMoS0VZX0QpKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5zcXJ0KE1hdGgucG93KGRlcGxhY2VtZW50LCAyKSAvIDIpO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVNob290aW5nRGlyZWN0aW9uKG5vdyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbihub3cpXG4gICAge1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7fTtcblxuICAgICAgICBpZiAoa2V5c0Rvd24uaGFzKEtFWV9VUCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9ET1dOKSlcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfTEVGVCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9SSUdIVCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwICE9PSBkaXJlY3Rpb24ueCB8fCAwICE9PSBkaXJlY3Rpb24ueSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoKGtleXNEb3duLmhhcyhLRVlfVVApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX0RPV04pIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX0xFRlQpIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX1JJR0hUKSkgJiYgKCF0aGlzLl9sYXN0U2hvb3QgfHxcbiAgICAgICAgICAgIChub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQpKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfU1BBQ0UpICYmXG4gICAgICAgICAgICAoIXRoaXMuX2xhc3RCb21iIHx8IDUwMCA8PSBub3cgLSB0aGlzLl9sYXN0Qm9tYikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCdwbGF5ZXJJdGVtcycpO1xuICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoJ2JvbWInKTtcblxuICAgICAgICBpZiAoZXhpc3RpbmdJdGVtICYmIGV4aXN0aW5nSXRlbS5xdWFudGl0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbIEJvbWIsIC4uLmJvbWJzIF0gPSBleGlzdGluZ0l0ZW0uaXRlbXM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0uaXRlbXMgPSBib21icztcbiAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5xdWFudGl0eSAtPSAxO1xuXG4gICAgICAgICAgICBjb25zdCBib21iID0gbmV3IEJvbWIoeyB4LCB5LCB9KTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoJ2JvbWInLCBleGlzdGluZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3QoKVxuICAgIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyZWN0aW9uLngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgODtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fZGlyZWN0aW9uLnkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3ggKyAxNTtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90ZWFycy5wdXNoKG5ldyBUZWFyKFxuICAgICAgICB7XG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyZWN0aW9uLFxuICAgICAgICAgICAgY3JlYXRvcjogdGhpcyxcbiAgICAgICAgICAgIGRhbWFnZXM6IHRoaXMuZGFtYWdlcyxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBpc1Nob290aW5nID0gdGhpcy5faXNTaG9vdGluZztcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICBsZXQgaGVhZDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIGlmIChpc1Nob290aW5nIHx8ICghaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuc2hvb3RpbmdEaXJlY3Rpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuZGlyZWN0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uLngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzU2hvb3RpbmcgfHwgKCFpc1Nob290aW5nICYmICF4KSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24ueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICBbIHgsIHkgXSA9IGhlYWQudXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmRvd247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCk7XG5cbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5feCwgdGhpcy5feSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fdGhlbjtcbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICB0aGlzLnVwZGF0ZShkZWx0YSAvIDEwMDAsIG5vdyk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgcm9ja3MgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5IH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiA1MCwgaGVpZ2h0OiA1MSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiByb2Nrcy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX2lzU3BlY2lhbCA9IDAuMDUgPiBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IHRoaXMuX2lzU3BlY2lhbCA/IHJvY2tzLnNwZWNpYWwucG9zaXRpb24gOiByb2Nrcy5kZWZhdWx0LnBvc2l0aW9uO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5pbXBvcnQgeyBkZWZhdWx0Um9vbSB9IGZyb20gJ2ltYWdlcy9yb29tcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20gZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgaW1hZ2UsIH0gPSB7IGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFJvb20sIH0sIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHdpZHRoOiA4MDAsIGhlaWdodDogNDgwLCBpbWFnZSwgfSk7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9KTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB3aWR0aDogMTMsIGhlaWdodDogMTMsIGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFRlYXIsIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICBpZiAoTElNSVRfTEVGVCAtIHRoaXMud2lkdGggPiB0aGlzLl94IHx8IHRoaXMuX3ggPiBMSU1JVF9SSUdIVCArIHRoaXMud2lkdGggfHxcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuaGVpZ2h0ID4gdGhpcy5feSB8fCB0aGlzLl95ID4gTElNSVRfQk9UVE9NICsgdGhpcy5oZWlnaHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCdpdGVtcycpO1xuICAgICAgICBjb25zdCBjb2xsaWRlciA9IGlzQ29sbGlkaW5nKHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKGl0ZW0gPT5cbiAgICAgICAgICAgIGl0ZW0gIT09IHRoaXMuX2NyZWF0b3IgJiYgaXRlbSAhPT0gaXRlbXNcbiAgICAgICAgKSk7XG5cbiAgICAgICAgaWYgKGNvbGxpZGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocClcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLmhwIC09IHRoaXMuZGFtYWdlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1BfSVNBQUMgPSA0MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT01fSVNBQUMgPSBjYW52YXMuaGVpZ2h0IC0gOTU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVF9JU0FBQyA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUX0lTQUFDID0gY2FudmFzLndpZHRoIC0gODU7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1AgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT00gPSBjYW52YXMuaGVpZ2h0IC0gNjU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDYwO1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gNzU7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG5leHBvcnQgY29uc3QgS0VZX1NQQUNFID0gMzI7XG5leHBvcnQgY29uc3QgS0VZX1cgPSA4NztcbmV4cG9ydCBjb25zdCBLRVlfQSA9IDY1O1xuZXhwb3J0IGNvbnN0IEtFWV9TID0gODM7XG5leHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbiIsImV4cG9ydCBjb25zdCBoZWFydHMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9oZWFydHNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZW1wdHk6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAwLCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZmRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAxNiwgMCwgXSxcbiAgICB9LFxuICAgIHNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZnNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDE2LCAxNiwgXSxcbiAgICB9LFxuICAgIGV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMTYsIF0sXG4gICAgfSxcbiAgICBoYWxmZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDQ4LCAxNiwgXSxcbiAgICB9LFxuICAgIHJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyA0OCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZyZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgNjQsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAwLCAxNiwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGtleXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMTYsIDAsIF0sXG4gICAgfSxcbiAgICBnb2xkZW46XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAxNiwgMTYsIF0sXG4gICAgfSxcbn07XG5cblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBoYXJkTW9kZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG5vQWNoaWV2ZW1lbnQgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMzIsIDE2LCBdLFxuICAgIH0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaGVhcnRzLFxuICAgIGJvbWJzLFxuICAgIGtleXMsXG4gICAgY29pbnMsXG4gICAgaGFyZE1vZGUsXG4gICAgbm9BY2hpZXZlbWVudCxcbn07XG4iLCJleHBvcnQgY29uc3QgaXNhYWMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9pc2FhY19zcHJpdGVfY3VzdG9tLnBuZycsXG4gICAgaGVhZDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAyOCxcbiAgICAgICAgaGVpZ2h0OiAyNSxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAwLCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsgMjggKiA0LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWyAyOCAqIDYsIDAsIF0sXG4gICAgICAgICAgICByaWdodDogWyAyOCAqIDIsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAyOCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbIDI4ICogNSwgMCwgXSxcbiAgICAgICAgICAgIGxlZnQ6IFsgMjggKiA3LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsgMjggKiAzLCAwLCBdLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAwLCAyNSwgXSxcbiAgICAgICAgICAgIHVwOiBbIDE4ICogNSwgMjUsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbIDAsIDI1LCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsgMCwgMjUsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaXNhYWMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvYm9tYnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbiAgICBkb3VibGU6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxuICAgIGV4cGxvc2lvbjpcbiAgICB7XG4gICAgICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9leHBsb3Npb25fc3ByaXRlLnBuZycsXG4gICAgICAgIHdpZHRoOiA5NixcbiAgICAgICAgaGVpZ2h0OiA5NixcbiAgICAgICAgc3RhdGVzOiAxMixcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvY29pbnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDIwLFxuICAgIGhlaWdodDogMTUsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3QgZmxpZXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9mbGllc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBzdGF0aW9uYXJ5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgcG9vcE9yYml0YWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyA2NCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgaG9taW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMCwgMzIsIF0sXG4gICAgICAgIHN0YXRlczogNCxcbiAgICB9LFxuICAgIGNpcmNsaW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMTI4LCAzMiwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG5cbiAgICBkeWluZzpcbiAgICB7XG4gICAgICAgIHdpZHRoOiA2NCxcbiAgICAgICAgaGVpZ2h0OiA2NCxcbiAgICAgICAgcG9zaXRpb246IFsgMCwgNjQsIF0sXG4gICAgICAgIHN0YXRlczogMTIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZmxpZXMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE3MCxcbiAgICBoZWlnaHQ6IDE3MixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbiAgICBzcGVjaWFsOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbIDE3MCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZpcmUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9maXJlX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMSxcbiAgICBoZWlnaHQ6IDM0LFxuICAgIHN0YXRlczogNixcbn07XG5cblxuZXhwb3J0IGNvbnN0IGZpcmVCYXNlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZGVhZGZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgcG9zaXRpb246IFsgMCwgMzQsIF0sXG4gICAgZGVhZFBvc2l0aW9uOiBbIDMyLCAzNCwgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgcm9ja3MsXG4gICAgZmlyZSxcbiAgICBmaXJlQmFzZSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFRlYXIgPSAnYnVpbGQvaW1nL3RlYXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0VGVhcixcbn07XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcbmltcG9ydCBSb29tIGZyb20gJ2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgSFVEIGZyb20gJ2NvbXBvbmVudHMvSFVEJztcbmltcG9ydCBSb2NrIGZyb20gJ2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICdjb21wb25lbnRzL2ZpcmUnO1xuaW1wb3J0IEZseSBmcm9tICdjb21wb25lbnRzL2ZseSc7XG5pbXBvcnQgQm9tYiBmcm9tICdjb21wb25lbnRzL2JvbWInO1xuaW1wb3J0IENvaW4gZnJvbSAnY29tcG9uZW50cy9jb2luJztcbmltcG9ydCBJc2FhYyBmcm9tICdjb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBWb2x1bWVDb250cm9sbGVyIGZyb20gJ3ZvbHVtZS1jb250cm9sbGVyJztcblxuU3RvcmUuc2V0KCdyb29tJywgbmV3IFJvb20oKSk7XG5TdG9yZS5zZXQoJ0hVRCcsIG5ldyBIVUQoKSk7XG5TdG9yZS5zZXQoJ25vQWNoaWV2ZW1lbnQnLCB0cnVlKTtcblN0b3JlLnNldCgnaGFyZE1vZGUnLCBmYWxzZSk7XG5TdG9yZS5zZXQoJ3NvdW5kcycsIG5ldyBWb2x1bWVDb250cm9sbGVyKCkpO1xuU3RvcmUuc2V0KCdiYWNrZ3JvdW5kT2JzdGFjbGVzJywgbmV3IENvbGxlY3Rpb24oeyBjb2xsZWN0aW9uOiBbXSwgfSkpO1xuXG5TdG9yZS5zZXQoJ3RlYXJzJywgbmV3IENvbGxlY3Rpb24oeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0pKTtcblxuU3RvcmUuc2V0KCdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IFJvY2soeyB4OiA0NTAsIHk6IDEyMCwgfSksXG4gICAgbmV3IFJvY2soeyB4OiA2NSwgeTogNjUsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTE1LCB5OiA2NSwgfSksXG4gICAgbmV3IFJvY2soeyB4OiAxNjUsIHk6IDY1LCB9KSxcbiAgICBuZXcgUm9jayh7IHg6IDY1LCB5OiAxMTYsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTE1LCB5OiAxMTYsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTY1LCB5OiAxMTYsIH0pLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9KSk7XG5cblN0b3JlLnNldCgnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEJvbWIoeyB4OiA4MiwgeTogMzU2LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE0MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE2MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE4MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDIwMCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDY4MCwgeTogODAsIH0pLFxuICAgIG5ldyBDb2luKHsgeDogNjgwLCB5OiA2NSwgfSksXG5dLCB9KSk7XG5cblN0b3JlLnNldCgnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEZpcmUoeyB4OiA3MDMsIHk6IDY1LCB9KSxcbiAgICBuZXcgRmlyZSh7IHg6IDY1MCwgeTogNjUsIH0pLFxuICAgIG5ldyBGbHkoeyB4OiAyNTAsIHk6IDY1LCB9KSxcbiAgICAvLyBuZXcgRmx5KHsgeDogMzAwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0pLFxuICAgIC8vIG5ldyBGbHkoeyB4OiAzMzAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSksXG4gICAgLy8gbmV3IEZseSh7IHg6IDM1MCwgeTogNjUsIG5hbWU6ICdob21pbmcnLCB9KSxcbiAgICAvLyBuZXcgRmx5KHsgeDogMzYwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0pLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9KSk7XG5cblN0b3JlLnNldCgncGxheWVyJywgbmV3IElzYWFjKCkpO1xuU3RvcmUuc2V0KCdwbGF5ZXJJdGVtcycsIG5ldyBNYXAoKSk7XG5cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgU3RvcmUuZ2V0KCdyb29tJyksXG4gICAgU3RvcmUuZ2V0KCdiYWNrZ3JvdW5kT2JzdGFjbGVzJyksXG4gICAgU3RvcmUuZ2V0KCdIVUQnKSxcbl0sIH0pO1xuXG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZCA9IG5ldyBDb2xsZWN0aW9uKHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoJ29ic3RhY2xlcycpLFxuICAgIFN0b3JlLmdldCgnbW9uc3RlcnMnKSxcbiAgICBTdG9yZS5nZXQoJ2l0ZW1zJyksXG4gICAgU3RvcmUuZ2V0KCd0ZWFycycpLFxuICAgIFN0b3JlLmdldCgncGxheWVyJyksXG5dLCB9KTtcblxuXG53aW5kb3cuU3RvcmUgPSBTdG9yZTtcbndpbmRvdy5QbGF5ZXIgPSBTdG9yZS5nZXQoJ3BsYXllcicpO1xud2luZG93Lml0ZW1zID0gU3RvcmUuZ2V0KCdpdGVtcycpO1xuXG4vLyBleHBvcnQgY29uc3Qgb2JzdGFjbGVzID0gZm9yZWdyb3VuZFswXTtcbi8vIGV4cG9ydCBjb25zdCBtb25zdGVycyA9IGZvcmVncm91bmRbMV07XG4vLyBleHBvcnQgY29uc3QgcGxheWVyID0gZm9yZWdyb3VuZFsyXTtcbiIsImNvbnN0IFN0b3JlID0gbmV3IE1hcCgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29sbGlkZXJzID0gKHRhcmdldCwgb3RoZXIpID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAodGFyZ2V0ID09PSBvdGhlcilcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvdGhlcikgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKVxuICAgIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgX2NvbGxpZGVycyA9IGdldENvbGxpZGVycyh0YXJnZXQsIG90aGVyW2ldKTtcblxuICAgICAgICAgICAgaWYgKF9jb2xsaWRlcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLnB1c2guYXBwbHkoY29sbGlkZXJzLCBfY29sbGlkZXJzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItc3ByZWFkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlkZXJzLmxlbmd0aCA/IGNvbGxpZGVycyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcClcbiAgICB7XG4gICAgICAgIHJldHVybiBbIG90aGVyLCBdO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NvbGxpZGluZyA9ICh0YXJnZXQsIG90aGVyKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKHRhcmdldCA9PT0gb3RoZXIpXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbilcbiAgICB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyh0YXJnZXQsIG90aGVyW2ldKTtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGlkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAobGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG4iLCJpbXBvcnQgeyB2b2x1bWVTbGlkZXIsIHZvbHVtZURpc3BsYXkgfSBmcm9tICd2b2x1bWUtZWxlbWVudHMnO1xuXG5jb25zdCB0ZXh0ID0gJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB2b2x1bWVEaXNwbGF5LmlubmVyVGV4dCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvbHVtZUNvbnRyb2xsZXJcbntcbiAgICBjb25zdHJ1Y3Rvcih2b2x1bWU9NTAsIG11dGVkPWZhbHNlKVxuICAgIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkodm9sdW1lRGlzcGxheSk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSh2b2x1bWVTbGlkZXIpO1xuICAgIH1cblxuICAgIG9ic2VydmUoaW5wdXQpXG4gICAge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoeyB0YXJnZXQgfSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkodm9sdW1lRGlzcGxheSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoc3BhbilcbiAgICB7XG4gICAgICAgIHNwYW5bdGV4dF0gPSBgJHt0aGlzLl92b2x1bWV9ICVgO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgICB9XG5cbiAgICBzZXQgdm9sdW1lKHZhbHVlKVxuICAgIHtcbiAgICAgICAgaWYgKDAgPD0gdmFsdWUgJiYgMTAwID49IHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl92b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtdXRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXV0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IG11dGVkKHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbXV0ZWQgPSAhIXZhbHVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2b2x1bWVTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdm9sdW1lJyk7XG5leHBvcnQgY29uc3Qgdm9sdW1lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy12b2x1bWUtLWRpc3BsYXknKTtcbiJdfQ==
