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

        this.active = false;

        // Store.set('monsters', Store.get('monsters')
        //     .filter(monster => this !== monster));
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

const isFr = navigator.language === 'fr';

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
const KEY_W = exports.KEY_W = isFr ? 90 : 87;
const KEY_A = exports.KEY_A = isFr ? 81 : 65;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2NhbnZhcy5qcyIsInNyYy9jb21wb25lbnRzL0hVRC5qcyIsInNyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvYm9tYi5qcyIsInNyYy9jb21wb25lbnRzL2NoYXJhY3Rlci5qcyIsInNyYy9jb21wb25lbnRzL2NvaW4uanMiLCJzcmMvY29tcG9uZW50cy9jb2xsZWN0aWJsZS5qcyIsInNyYy9jb21wb25lbnRzL2NvbGxlY3Rpb24uanMiLCJzcmMvY29tcG9uZW50cy9kZXN0cnVjdGlibGUtc3RhdGljLWFjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvci5qcyIsInNyYy9jb21wb25lbnRzL2ZpcmUuanMiLCJzcmMvY29tcG9uZW50cy9mbHkuanMiLCJzcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsInNyYy9jb21wb25lbnRzL3JvY2suanMiLCJzcmMvY29tcG9uZW50cy9yb29tLmpzIiwic3JjL2NvbXBvbmVudHMvc3RhdGljLWFjdG9yLmpzIiwic3JjL2NvbXBvbmVudHMvdGVhci5qcyIsInNyYy9jb25zdGFudHMuanMiLCJzcmMvaW1hZ2VzL0hVRC5qcyIsInNyYy9pbWFnZXMvY2hhcmFjdGVycy5qcyIsInNyYy9pbWFnZXMvaXRlbXMuanMiLCJzcmMvaW1hZ2VzL21vbnN0ZXJzLmpzIiwic3JjL2ltYWdlcy9vYnN0YWNsZXMuanMiLCJzcmMvaW1hZ2VzL3Jvb21zLmpzIiwic3JjL2ltYWdlcy90ZWFycy5qcyIsInNyYy9sYXllcnMuanMiLCJzcmMvc3RvcmUuanMiLCJzcmMvdXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zLmpzIiwic3JjL3ZvbHVtZS1jb250cm9sbGVyLmpzIiwic3JjL3ZvbHVtZS1lbGVtZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBQ0E7O0FBRUEsTUFB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SixDQUFXLEtBQVgsRUFDQTtBQUNJLFlBQUksS0FBSyxLQUFMLElBQWMsT0FBTyxLQUF6QixFQUNBO0FBQ0ksaUJBQUssT0FBTCxHQUFlLEtBQWY7QUFDSDtBQUNKOztBQUVELFFBQUksS0FBSixHQUNBO0FBQ0ksZUFBTyxLQUFLLE1BQVo7QUFDSDs7QUFFRCxRQUFJLEtBQUosQ0FBVSxLQUFWLEVBQ0E7QUFDSSxhQUFLLE1BQUwsR0FBYyxDQUFDLENBQUMsS0FBaEI7QUFDSDtBQTdDTDtrQkFEcUIsZ0I7Ozs7Ozs7O0FDSGQsTUFBTSxzQ0FBZSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBckI7QUFDQSxNQUFNLHdDQUFnQixTQUFTLGNBQVQsQ0FBd0Isb0JBQXhCLENBQXRCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGRpc3BsYXlDdHgsIGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kLCBiYWNrZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcblxuY29uc3QgbWFpbiA9ICgpID0+XG57XG4gICAgYmFja2dyb3VuZC5yZW5kZXIoKTtcbiAgICBmb3JlZ3JvdW5kLnJlbmRlcigpO1xuXG4gICAgZGlzcGxheUN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwKTsgLy8gZHJhdyBzb21ldGhpbmcgdmlzaWJsZSBvbmx5IG9uY2UgcGVyIGZyYW1lLlxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xufTtcblxubWFpbigpO1xuIiwiZXhwb3J0IGNvbnN0IGRpc3BsYXlDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5leHBvcnQgY29uc3QgZGlzcGxheUN0eCA9IGRpc3BsYXlDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuZXhwb3J0IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuY2FudmFzLndpZHRoID0gZGlzcGxheUNhbnZhcy53aWR0aDtcbmNhbnZhcy5oZWlnaHQgPSBkaXNwbGF5Q2FudmFzLmhlaWdodDtcbmV4cG9ydCBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IHsgaGVhcnRzLCBib21icywga2V5cywgY29pbnMsIGhhcmRNb2RlLCBub0FjaGlldmVtZW50IH0gZnJvbSAnaW1hZ2VzL0hVRCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhVRFxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID1cbiAgICAgICAge1xuICAgICAgICAgICAgaGVhcnRzLFxuICAgICAgICAgICAgYm9tYnMsXG4gICAgICAgICAgICBrZXlzLFxuICAgICAgICAgICAgY29pbnMsXG4gICAgICAgICAgICBoYXJkTW9kZSxcbiAgICAgICAgICAgIG5vQWNoaWV2ZW1lbnQsXG4gICAgICAgIH07XG5cbiAgICAgICAgT2JqZWN0LmtleXMoZWxlbWVudHMpLmZvckVhY2gocHJvcCA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zdCB7IHNwcml0ZSB9ID0gZWxlbWVudHNbcHJvcF07XG4gICAgICAgICAgICB0aGlzLmltYWdlc1twcm9wXSA9IHNwcml0ZTtcblxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGltYWdlOiBuZXcgSW1hZ2UoKSxcbiAgICAgICAgICAgICAgICByZWFkeTogZmFsc2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5faW1hZ2VzW3Byb3BdID0gaW1hZ2U7XG5cbiAgICAgICAgICAgIGltYWdlLmltYWdlLm9ubG9hZCA9ICgpID0+IHsgaW1hZ2UucmVhZHkgPSB0cnVlOyB9O1xuICAgICAgICAgICAgaW1hZ2UuaW1hZ2Uuc3JjID0gc3ByaXRlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcblxuICAgICAgICBpZiAodGhpcy5faW1hZ2VzLmhlYXJ0cy5yZWFkeSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBoZWFydHMud2lkdGggKiAxLjU7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBoZWFydHMuaGVpZ2h0ICogMS41O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSAxMDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxZID0gMTA7XG4gICAgICAgICAgICBjb25zdCBvcmlnaW5hbEhwID0gU3RvcmUuZ2V0KCdwbGF5ZXInKS5ocDtcblxuICAgICAgICAgICAgY29uc3QgaHAgPSBvcmlnaW5hbEhwO1xuICAgICAgICAgICAgbGV0IHggPSBpbml0aWFsWDtcbiAgICAgICAgICAgIGxldCB5ID0gaW5pdGlhbFk7XG5cbiAgICAgICAgICAgIGxldCBfaHAgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoX2hwIDwgaHApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbGV0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmRlZmF1bHQucG9zaXRpb247XG5cbiAgICAgICAgICAgICAgICBpZiAoX2hwICsgMC41ID09PSBocClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gaGVhcnRzLmhhbGZkZWZhdWx0LnBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlcy5oZWFydHMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGhlYXJ0cy53aWR0aCwgaGVhcnRzLmhlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmhlYXJ0cy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGVhcnRzLndpZHRoLCBoZWFydHMuaGVpZ2h0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoO1xuICAgICAgICAgICAgICAgIF9ocCArPSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKDcgPCBfaHAgJiYgOCA+PSBfaHApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB5ICs9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgeCA9IGluaXRpYWxYO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbml0aWFsWSA9IDQwO1xuXG4gICAgICAgIGlmICh0aGlzLl9pbWFnZXMuY29pbnMucmVhZHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGNvaW5zLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gY29pbnMuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyQ29pbnMgPSBTdG9yZS5nZXQoJ3BsYXllckl0ZW1zJykuZ2V0KCdjb2luJyk7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IHBsYXllckNvaW5zID8gcGxheWVyQ29pbnMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGNvaW5zLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlcy5jb2lucy5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgY29pbnMud2lkdGgsIGNvaW5zLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IDAgPT09IGNvdW50ID8gJ3JnYigxNzUsIDE3NSwgMTc1KScgOiAncmdiKDIyNSwgMjI1LCAyMjUpJztcbiAgICAgICAgICAgIGN0eC5mb250ID0gJzE0cHggbW9ub3NwYWNlJztcbiAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoYCR7Y291bnR9YCwgaW5pdGlhbFggKyB3aWR0aCArIDMsIGluaXRpYWxZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9pbWFnZXMuYm9tYnMucmVhZHkpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gYm9tYnMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBib21icy5oZWlnaHQ7XG4gICAgICAgICAgICBjb25zdCBpbml0aWFsWCA9IDg7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJCb21icyA9IFN0b3JlLmdldCgncGxheWVySXRlbXMnKS5nZXQoJ2JvbWInKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyQm9tYnMgPyBwbGF5ZXJCb21icy5xdWFudGl0eSA6IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IFsgc3ByaXRlWCwgc3ByaXRlWSBdID0gYm9tYnMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmJvbWJzLmltYWdlLCBzcHJpdGVYLCBzcHJpdGVZLCBib21icy53aWR0aCwgYm9tYnMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2ltYWdlcy5rZXlzLnJlYWR5KVxuICAgICAgICB7XG5cbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGtleXMud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSBrZXlzLmhlaWdodDtcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxYID0gODtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcktleXMgPSBTdG9yZS5nZXQoJ3BsYXllckl0ZW1zJykuZ2V0KCdrZXknKTtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50ID0gcGxheWVyS2V5cyA/IHBsYXllcktleXMucXVhbnRpdHkgOiAwO1xuXG4gICAgICAgICAgICBjb25zdCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGtleXMuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLmtleXMuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIGtleXMud2lkdGgsIGtleXMuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gMCA9PT0gY291bnQgPyAncmdiKDE3NSwgMTc1LCAxNzUpJyA6ICdyZ2IoMjI1LCAyMjUsIDIyNSknO1xuICAgICAgICAgICAgY3R4LmZvbnQgPSAnMTRweCBtb25vc3BhY2UnO1xuICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChgJHtjb3VudH1gLCBpbml0aWFsWCArIHdpZHRoICsgMywgaW5pdGlhbFkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFN0b3JlLmdldCgnaGFyZE1vZGUnKSAmJiB0aGlzLl9pbWFnZXMuaGFyZE1vZGUucmVhZHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGluaXRpYWxZICs9IDIwO1xuXG4gICAgICAgICAgICBjb25zdCB3aWR0aCA9IGhhcmRNb2RlLndpZHRoO1xuICAgICAgICAgICAgY29uc3QgaGVpZ2h0ID0gaGFyZE1vZGUuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuXG4gICAgICAgICAgICBjb25zdCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IGhhcmRNb2RlLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlcy5oYXJkTW9kZS5pbWFnZSwgc3ByaXRlWCwgc3ByaXRlWSwgaGFyZE1vZGUud2lkdGgsIGhhcmRNb2RlLmhlaWdodCwgaW5pdGlhbFgsIGluaXRpYWxZLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChTdG9yZS5nZXQoJ25vQWNoaWV2ZW1lbnQnKSAmJiB0aGlzLl9pbWFnZXMubm9BY2hpZXZlbWVudC5yZWFkeSlcbiAgICAgICAge1xuICAgICAgICAgICAgaW5pdGlhbFkgKz0gMjA7XG5cbiAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gbm9BY2hpZXZlbWVudC53aWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9IG5vQWNoaWV2ZW1lbnQuaGVpZ2h0O1xuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFggPSA4O1xuXG4gICAgICAgICAgICBjb25zdCBbIHNwcml0ZVgsIHNwcml0ZVkgXSA9IG5vQWNoaWV2ZW1lbnQuZGVmYXVsdC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2VzLm5vQWNoaWV2ZW1lbnQuaW1hZ2UsIHNwcml0ZVgsIHNwcml0ZVksIG5vQWNoaWV2ZW1lbnQud2lkdGgsIG5vQWNoaWV2ZW1lbnQuaGVpZ2h0LCBpbml0aWFsWCwgaW5pdGlhbFksIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY3R4IH0gZnJvbSAnLi4vY2FudmFzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHg9bnVsbCwgeT1udWxsLCB3aWR0aCwgaGVpZ2h0LCBpbWFnZSB9KVxuICAgIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlIHx8IG51bGw7XG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcblxuICAgICAgICBpZiAodGhpcy5pbWFnZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHsgdGhpcy5yZWFkeSA9IHRydWU7IH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0SW1hZ2UoaW1hZ2UsIHR5cGU9J2ltYWdlJylcbiAgICB7XG4gICAgICAgIGlmICgnY2FudmFzJyA9PT0gdHlwZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9pbWFnZSA9IGltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGltYWdlICE9PSB0aGlzLmltYWdlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmltYWdlID1cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHNyYzogaW1hZ2UsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHsgdGhpcy5yZWFkeSA9IHRydWU7IH07XG4gICAgICAgICAgICB0aGlzLl9pbWFnZS5zcmMgPSB0aGlzLmltYWdlLnNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCB4KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cblxuICAgIHNldCB4KHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCB5KClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cblxuICAgIHNldCB5KHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGNlbnRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHRoaXMud2lkdGggLyAyLFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHRoaXMuaGVpZ2h0IC8gMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQodGhpcy5feCk7XG4gICAgICAgIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHRoaXMuX3kpO1xuXG4gICAgICAgIGlmICh0aGlzLmltYWdlICYmIHRoaXMucmVhZHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICgnaW1hZ2UnID09PSB0aGlzLmltYWdlLnR5cGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZSwgeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnc3ByaXRlJyA9PT0gdGhpcy5pbWFnZS50eXBlICYmIHRoaXMucmVuZGVyU3ByaXRlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyU3ByaXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29sbGVjdGlibGUgZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aWJsZSc7XG5pbXBvcnQgRHluYW1pY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZHluYW1pYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgYm9tYnMgfSBmcm9tICdpbWFnZXMvaXRlbXMnO1xuaW1wb3J0IGdldENvbGxpZGVycyBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuY2xhc3MgQm9tYkFjdG9yIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5IH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiBib21icy53aWR0aCwgaGVpZ2h0OiBib21icy5oZWlnaHQsIGltYWdlOlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnc3ByaXRlJyxcbiAgICAgICAgICAgIHNyYzogYm9tYnMuc3ByaXRlLFxuICAgICAgICB9LCB9KTtcblxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxLjA7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA2MDsgLy8gdGltZSBiZXR3ZWVuIGZyYW1lcyBvZiBleHBsb3Npb25cbiAgICAgICAgdGhpcy5fdGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gMDtcbiAgICB9XG5cbiAgICBkcm9wKClcbiAgICB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgc2V0VGltZW91dCg6OnRoaXMucmVuZGVyRXhwbG9zaW9uLCA0MDAwKTsgLy8gNCBzZWNvbmRzIGFmdGVyXG5cbiAgICAgICAgU3RvcmUuZ2V0KCd0ZWFycycpLnB1c2godGhpcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyRXhwbG9zaW9uKClcbiAgICB7XG4gICAgICAgIHRoaXMud2lkdGggPSBib21icy5leHBsb3Npb24ud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gYm9tYnMuZXhwbG9zaW9uLmhlaWdodDtcbiAgICAgICAgdGhpcy5zZXRJbWFnZShib21icy5leHBsb3Npb24uc3ByaXRlLCAnc3ByaXRlJyk7XG4gICAgICAgIHRoaXMuaXNFeHBsb2RpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIERFU1RST1kgQUxMIFRIRSBUSElOR1MgTk9XXG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGxldCB4O1xuICAgICAgICBsZXQgeTtcbiAgICAgICAgbGV0IF94O1xuICAgICAgICBsZXQgX3k7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNFeHBsb2RpbmcpXG4gICAgICAgIHtcbiAgICAgICAgICAgIFsgeCwgeSBdID0gWyB0aGlzLl9zdGF0ZSAqIHRoaXMud2lkdGgsIDAsIF07XG4gICAgICAgICAgICBbIF94LCBfeSBdID0gWyB0aGlzLl94IC0gYm9tYnMud2lkdGgsIHRoaXMuX3kgLSBib21icy5oZWlnaHQgKiAyLCBdO1xuXG4gICAgICAgICAgICBpZiAobm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlICs9IDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gYm9tYnMuZXhwbG9zaW9uLnN0YXRlcylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCF0aGlzLmlzRXhwbG9kaW5nKVxuICAgICAgICB7XG4gICAgICAgICAgICBbIHgsIHkgXSA9IGJvbWJzLmRlZmF1bHQucG9zaXRpb247XG4gICAgICAgICAgICBbIF94LCBfeSBdID0gWyB0aGlzLl94LCB0aGlzLl95LCBdO1xuICAgICAgICB9XG5cblxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgX3gsIF95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb21iIGV4dGVuZHMgQ29sbGVjdGlibGVcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHkgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgeCwgeSwgd2lkdGg6IGJvbWJzLndpZHRoLCBoZWlnaHQ6IGJvbWJzLmhlaWdodCwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBib21icy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSAwLjIgPiBNYXRoLnJhbmRvbSgpID8gMiA6IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGJvbWJOYW1lID0gMSA9PT0gdGhpcy5xdWFudGl0eSA/ICdkZWZhdWx0JyA6ICdkb3VibGUnO1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IGJvbWJzW2JvbWJOYW1lXS5wb3NpdGlvbiB8fCBbIDAsIDAsIF07XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9pbWFnZSwgeCwgeSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICB0b0l0ZW0oKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdib21iJyxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLnF1YW50aXR5LFxuICAgICAgICAgICAgaXNEcm9wcGFibGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdG9Ecm9wcGFibGUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIEJvbWJBY3RvcjsgLy8gcmV0dXJuIHRoZSBjbGFzcyBzbyB0aGUgd2VhcmVyIGNhbiBkbyBuZXcgb24gaXQuXG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCBzcGVlZCwgbmFtZSwgaHAsIHgsIHkgfSlcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHgsIHksIH0pO1xuXG4gICAgICAgIHRoaXMuX3NwZWVkID0gc3BlZWQ7XG4gICAgICAgIHRoaXMuX2hwID0gaHA7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsSHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUodmFsdWUpXG4gICAge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IGhwKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9XG5cbiAgICBzZXQgaHAodmFsdWUpXG4gICAge1xuICAgICAgICBpZiAoMCA8IHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IHZhbHVlIDw9ICh0aGlzLm1heEhwIHx8IDE2KSA/IHZhbHVlIDogdGhpcy5tYXhIcCB8fCAxNjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID49IHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9ocCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmRpZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNwYXduKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hwID0gdGhpcy5fb3JpZ2luYWxIcDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3Bhd24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb2xsZWN0aWJsZSBmcm9tICdjb21wb25lbnRzL2NvbGxlY3RpYmxlJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJ2NhbnZhcyc7XG5pbXBvcnQgeyBjb2lucyB9IGZyb20gJ2ltYWdlcy9pdGVtcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvaW4gZXh0ZW5kcyBDb2xsZWN0aWJsZVxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB4LCB5LCB3aWR0aDogY29pbnMud2lkdGgsIGhlaWdodDogY29pbnMuaGVpZ2h0LCBpbWFnZTpcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3Nwcml0ZScsXG4gICAgICAgICAgICBzcmM6IGNvaW5zLnNwcml0ZSxcbiAgICAgICAgfSwgfSk7XG5cbiAgICAgICAgY29uc3QgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlID0gTWF0aC5yb3VuZCgoTWF0aC5yYW5kb20oKSAqIGNvaW5zLnN0YXRlcykpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBjb2lucy5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBpZiAoMC4xIDwgcmFuZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gJ2RlZmF1bHQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKDAuMDUgPCByYW5kKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5ID0gNTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAnbmlja2VsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwLjAyIDwgcmFuZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eSA9IDEwO1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9ICdkaW1lJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwLjAwNSA8IHJhbmQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHkgPSAyNTtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSAncXVhcnRlcic7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBubyBzcHJpdGUgZm9yIHRoZSBiaWcgbW9uZXl6IHlldC5cbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IDE7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIC8vIGNvbnN0IFsgeCwgeSBdID0gY29pbnNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWzAsIDAsIF07XG4gICAgICAgIC8vIGN0eC5kcmF3SW1hZ2UoIHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQgKTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAobm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICh0aGlzLl9zdGF0ZSArIDEpICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHggPSB0aGlzLndpZHRoICogdGhpcy5fc3RhdGU7XG4gICAgICAgIGNvbnN0IHkgPSAwO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHgsIHksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnY29pbicsXG4gICAgICAgICAgICBxdWFudGl0eTogdGhpcy5xdWFudGl0eSxcbiAgICAgICAgfTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3RhdGljQWN0b3IgZnJvbSAnY29tcG9uZW50cy9zdGF0aWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsZWN0aWJsZSBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgdG9JdGVtKClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndG9JdGVtKCkgbXVzdCBiZSBpbXBsZW1lbnRlZCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBBcnJheVxue1xuICAgIGNvbnN0cnVjdG9yKHsgY29sbGVjdGlvbj1bXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyPWZhbHNlLCBzaG91bGRVcGRhdGVBZnRlclJlbmRlcj1mYWxzZSB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wdXNoKC4uLmNvbGxlY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuX3Nob3VsZFVwZGF0ZUJlZm9yZVJlbmRlciA9IHNob3VsZFVwZGF0ZUJlZm9yZVJlbmRlcjtcbiAgICAgICAgdGhpcy5fc2hvdWxkVXBkYXRlQWZ0ZXJSZW5kZXIgPSBzaG91bGRVcGRhdGVBZnRlclJlbmRlcjtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIDAgPT09IHRoaXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHJlbW92ZShpdGVtKVxuICAgIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4T2YoaXRlbSk7XG5cbiAgICAgICAgaWYgKC0xIDwgaW5kZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbmV3VGhpcyA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzW2ldO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS51cGRhdGUpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZhbHNlID09PSBpdGVtLmFjdGl2ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZW5kZXJEZXN0cm95KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW5kZXJEZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbGF5ZXIgPSBpdGVtLmluYWN0aXZlTGF5ZXI7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3RvcmUuZ2V0KGxheWVyKS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuZXdUaGlzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdMZW5ndGggPSBuZXdUaGlzLmxlbmd0aDtcblxuICAgICAgICBpZiAobmV3TGVuZ3RoICE9PSBsZW4pXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gbmV3TGVuZ3RoO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0xlbmd0aDsgaSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXNbaV0gPSBuZXdUaGlzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVCZWZvcmVSZW5kZXIgJiYgIXRoaXMuaXNFbXB0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yRWFjaChpdGVtID0+IGl0ZW0ucmVuZGVyKCkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRVcGRhdGVBZnRlclJlbmRlciAmJiAhdGhpcy5pc0VtcHR5KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvc3RhdGljLWFjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVzdHJ1Y3RpYmxlU3RhdGljQWN0b3IgZXh0ZW5kcyBTdGF0aWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIGhwIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9KTtcblxuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX2RtZ0ludGVydmFsID0gNTAwO1xuICAgICAgICB0aGlzLl9sYXN0RG1nID0gRGF0ZS5ub3coKTtcbiAgICB9XG5cbiAgICBnZXQgaHAoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hwO1xuICAgIH1cblxuICAgIHNldCBocCh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICgwIDwgdmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEFjdG9yIGZyb20gJ2NvbXBvbmVudHMvYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljQWN0b3IgZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UsIHNwZWVkIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9KTtcblxuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDI1NjtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCh2YWx1ZSlcbiAgICB7XG4gICAgICAgIHRoaXMuX3NwZWVkID0gdmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IERlc3RydWN0aWJsZVN0YXRpY0FjdG9yIGZyb20gJ2NvbXBvbmVudHMvZGVzdHJ1Y3RpYmxlLXN0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgZmlyZSwgZmlyZUJhc2UgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlyZSBleHRlbmRzIERlc3RydWN0aWJsZVN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5IH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiBmaXJlLndpZHRoLCBoZWlnaHQ6IGZpcmUuaGVpZ2h0LCBocDogMywgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmaXJlLnNwcml0ZSxcbiAgICAgICAgfSwgfSk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGUgPSBNYXRoLnJvdW5kKChNYXRoLnJhbmRvbSgpICogZmlyZS5zdGF0ZXMpKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gZmlyZS5zdGF0ZXM7XG4gICAgICAgIHRoaXMuX2ludGVydmFsID0gMTAwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5kYW1hZ2VzID0gMC41O1xuICAgIH1cblxuICAgIGdldCBpbmFjdGl2ZUxheWVyKClcbiAgICB7XG4gICAgICAgIHJldHVybiAnYmFja2dyb3VuZE9ic3RhY2xlcyc7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IFsgd29vZFgsIHdvb2RZIF0gPSB0aGlzLmFjdGl2ZSA/IGZpcmVCYXNlLnBvc2l0aW9uIDogZmlyZUJhc2UuZGVhZFBvc2l0aW9uO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB3b29kWCwgd29vZFksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLl94LCB0aGlzLl95ICsgMTcsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgICAgICBpZiAoIXRoaXMuYWN0aXZlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmRhbWFnZXMgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKG5vdyAtIHRoaXMuX3RoZW4gPiB0aGlzLl9pbnRlcnZhbClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAodGhpcy5fc3RhdGUgKyAxKSAlIHRoaXMuX3N0YXRlcztcbiAgICAgICAgICAgIHRoaXMuX3RoZW4gPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB4ID0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjb25zdCB5ID0gMDtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDaGFyYWN0ZXIgZnJvbSAnY29tcG9uZW50cy9jaGFyYWN0ZXInO1xuaW1wb3J0IHsgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCB7IGZsaWVzIH0gZnJvbSAnaW1hZ2VzL21vbnN0ZXJzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgeyBmb3JlZ3JvdW5kIH0gZnJvbSAnbGF5ZXJzJztcbmltcG9ydCB7IGlzQ29sbGlkaW5nIH0gZnJvbSAndXRpbHMvcGh5c2ljcy9jb2xsaXNpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx5IGV4dGVuZHMgQ2hhcmFjdGVyXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5LCBuYW1lPSdzdGF0aW9uYXJ5JyB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB4LCB5LCB3aWR0aDogZmxpZXMud2lkdGgsIGhlaWdodDogZmxpZXMuaGVpZ2h0LCBocDogMiwgc3BlZWQ6IDEuNSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBmbGllcy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiBmbGllc1t0aGlzLl9uYW1lXS5zdGF0ZXMpKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gZmxpZXNbdGhpcy5fbmFtZV0uc3RhdGVzO1xuICAgICAgICB0aGlzLl9pbnRlcnZhbCA9IDUwOyAvLyBtc1xuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fZG1nSW50ZXJ2YWwgPSA1MDA7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDAuNTtcbiAgICAgICAgdGhpcy50eXBlID0gJ2ZseSc7XG4gICAgfVxuXG4gICAgdXBkYXRlUG9zaXRpb24oKVxuICAgIHtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBTdG9yZS5nZXQoJ3BsYXllcicpO1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fbmFtZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhc2UgJ2NpcmNsaW5nJzpcbiAgICAgICAgICAgIGNhc2UgJ3Bvb3BPcmJpdGFsJzpcbiAgICAgICAgICAgIGNhc2UgJ3N0YXRpb25hcnknOlxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgY2FzZSAnaG9taW5nJzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0geCAtIHRoaXMueDtcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IHkgLSB0aGlzLnk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVwbGFjZW1lbnQgPSBNYXRoLnNxcnQoKGR4ICogZHgpICsgKGR5ICogZHkpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWVkWCA9IHRoaXMuc3BlZWQgKiAoZHggLyBkZXBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3BlZWRZID0gdGhpcy5zcGVlZCAqIChkeSAvIGRlcGxhY2VtZW50KTtcblxuICAgICAgICAgICAgICAgIHRoaXMueCArPSBzcGVlZFg7XG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IHNwZWVkWTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5vRmxpZXMgPSBmb3JlZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoaXRlbSA9PlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PT0gU3RvcmUuZ2V0KCdtb25zdGVycycpKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmZpbHRlcihpID0+ICEoaSBpbnN0YW5jZW9mIEZseSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBTdG9yZS5nZXQoJ29ic3RhY2xlcycpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbGxpZGVyID0gaXNDb2xsaWRpbmcodGhpcywgbm9GbGllcyk7XG4gICAgICAgICAgICAgICAgaWYgKGNvbGxpZGVyKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54IC09IHNwZWVkWDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55IC09IHNwZWVkWTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZXIuY2FuVGFrZURhbWFnZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIuY2FuVGFrZURhbWFnZSh7IHVwZGF0ZTogdHJ1ZSwgfSkpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLmhwIC09IHRoaXMuZGFtYWdlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGllKClcbiAgICB7XG4gICAgICAgIHRoaXMuX25hbWUgPSAnZHlpbmcnO1xuICAgICAgICB0aGlzLl9zdGF0ZSA9IDA7XG4gICAgICAgIHRoaXMuZGFtYWdlcyA9IDA7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IGZsaWVzW3RoaXMuX25hbWVdLnN0YXRlcztcbiAgICAgICAgdGhpcy53aWR0aCA9IGZsaWVzW3RoaXMuX25hbWVdLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IGZsaWVzW3RoaXMuX25hbWVdLmhlaWdodDtcbiAgICAgICAgdGhpcy5faW50ZXJ2YWwgPSA3NTtcblxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFN0b3JlLnNldCgnbW9uc3RlcnMnLCBTdG9yZS5nZXQoJ21vbnN0ZXJzJylcbiAgICAgICAgLy8gICAgIC5maWx0ZXIobW9uc3RlciA9PiB0aGlzICE9PSBtb25zdGVyKSk7XG4gICAgfVxuXG4gICAgcmVuZGVyU3ByaXRlKClcbiAgICB7XG4gICAgICAgIGNvbnN0IGlzRHlpbmcgPSAnZHlpbmcnID09PSB0aGlzLl9uYW1lO1xuXG4gICAgICAgIGlmICghaXNEeWluZylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3N0YXRlID09PSB0aGlzLl9zdGF0ZXMgLSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29vcmRzID0gZmxpZXNbdGhpcy5fbmFtZV0ucG9zaXRpb24gfHwgWyAwLCAwLCBdO1xuICAgICAgICBsZXQgeCA9IGNvb3Jkc1swXTtcbiAgICAgICAgY29uc3QgeSA9IGNvb3Jkc1sxXTtcblxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAobm93IC0gdGhpcy5fdGhlbiA+IHRoaXMuX2ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNEeWluZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IHRoaXMuX3N0YXRlICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICh0aGlzLl9zdGF0ZSArIDEpICUgdGhpcy5fc3RhdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcbiAgICAgICAgfVxuXG4gICAgICAgIHggKz0gdGhpcy53aWR0aCAqIHRoaXMuX3N0YXRlO1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgdGhpcy5feCwgdGhpcy5feSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcywgY3R4IH0gZnJvbSAnY2FudmFzJztcbmltcG9ydCBTdG9yZSBmcm9tICdzdG9yZSc7XG5pbXBvcnQgQ2hhcmFjdGVyIGZyb20gJ2NvbXBvbmVudHMvY2hhcmFjdGVyJztcbmltcG9ydCBUZWFyIGZyb20gJ2NvbXBvbmVudHMvdGVhcic7XG5pbXBvcnQgeyBpc0NvbGxpZGluZyB9IGZyb20gJ3V0aWxzL3BoeXNpY3MvY29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUF9JU0FBQyxcbiAgICBMSU1JVF9CT1RUT01fSVNBQUMsXG4gICAgTElNSVRfTEVGVF9JU0FBQyxcbiAgICBMSU1JVF9SSUdIVF9JU0FBQyxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9XLFxuICAgIEtFWV9TLFxuICAgIEtFWV9BLFxuICAgIEtFWV9ELFxuICAgIEtFWV9TUEFDRSxcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzYWFjIH0gZnJvbSAnaW1hZ2VzL2NoYXJhY3RlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKHsgd2lkdGg6IDI4LCBoZWlnaHQ6IDM1LCBzcGVlZDogMjAwLCBuYW1lOiAnSXNhYWMnLCBocDogMywgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiBpc2FhYy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX3RoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLl9sYXN0U2hvb3QgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fa2V5c0Rvd24gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX3RlYXJzID0gU3RvcmUuZ2V0KCd0ZWFycycpO1xuICAgICAgICB0aGlzLl9hdHRhY2tTcGVlZCA9IDUwMDsgLy8gMSBzaG9vdCAvIHNlY29uZFxuICAgICAgICB0aGlzLmRhbWFnZXMgPSAxO1xuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB7IHg6IDAsIHk6IDEsIH07XG4gICAgICAgIHRoaXMuY29sbGlkaW5nV2lkdGggPSB0aGlzLndpZHRoIC0gMjtcbiAgICAgICAgdGhpcy5jb2xsaWRpbmdIZWlnaHQgPSB0aGlzLmhlaWdodCAtIDEwO1xuICAgICAgICB0aGlzLm1heEhwID0gMTY7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHRoaXMuX2tleXNEb3duLmFkZChlLmtleUNvZGUpKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHRoaXMuX2tleXNEb3duLmRlbGV0ZShlLmtleUNvZGUpKTtcblxuICAgICAgICB0aGlzLl9kbWdJbnRlcnZhbCA9IDUwMDtcbiAgICAgICAgdGhpcy5fbGFzdERtZyA9IERhdGUubm93KCk7XG5cbiAgICAgICAgdGhpcy5yZXNwYXduKCk7XG4gICAgfVxuXG4gICAgY2FuVGFrZURhbWFnZSh7IHVwZGF0ZSB9KVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgY2FuVGFrZURhbWFnZSA9IG5vdyAtIHRoaXMuX2xhc3REbWcgPiB0aGlzLl9kbWdJbnRlcnZhbDtcblxuICAgICAgICBpZiAodXBkYXRlICYmIGNhblRha2VEYW1hZ2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3REbWcgPSBub3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2FuVGFrZURhbWFnZTtcbiAgICB9XG5cbiAgICBnZXQgeCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeCh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5feCAmJlxuICAgICAgICAgICAgTElNSVRfTEVGVF9JU0FBQyA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFRfSVNBQUMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFggPSB0aGlzLl94O1xuICAgICAgICAgICAgdGhpcy5feCA9IHZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW5lbXkgPSBpc0NvbGxpZGluZyh0aGlzLCBTdG9yZS5nZXQoJ21vbnN0ZXJzJykpO1xuXG4gICAgICAgICAgICBpZiAoIWVuZW15ICYmICFpc0NvbGxpZGluZyh0aGlzLCBTdG9yZS5nZXQoJ29ic3RhY2xlcycpKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5waWNrdXBJdGVtcygpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl94ID0gb2xkWDtcblxuICAgICAgICAgICAgaWYgKGVuZW15ICYmIHRoaXMuY2FuVGFrZURhbWFnZSh7IHVwZGF0ZTogdHJ1ZSwgfSkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5ocCAtPSBlbmVteS5kYW1hZ2VzIHx8IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSh2YWx1ZSlcbiAgICB7XG4gICAgICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5feSAmJlxuICAgICAgICAgICAgTElNSVRfVE9QX0lTQUFDIDwgdmFsdWUgJiYgdmFsdWUgPCBMSU1JVF9CT1RUT01fSVNBQUMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IG9sZFkgPSB0aGlzLl95O1xuICAgICAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuXG4gICAgICAgICAgICBjb25zdCBlbmVteSA9IGlzQ29sbGlkaW5nKHRoaXMsIFN0b3JlLmdldCgnbW9uc3RlcnMnKSk7XG5cbiAgICAgICAgICAgIGlmICghZW5lbXkgJiYgIWlzQ29sbGlkaW5nKHRoaXMsIFN0b3JlLmdldCgnb2JzdGFjbGVzJykpKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBpY2t1cEl0ZW1zKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3kgPSBvbGRZO1xuXG4gICAgICAgICAgICBpZiAoZW5lbXkgJiYgdGhpcy5jYW5UYWtlRGFtYWdlKHsgdXBkYXRlOiB0cnVlLCB9KSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhwIC09IGVuZW15LmRhbWFnZXMgfHwgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcGlja3VwSXRlbXMoKVxuICAgIHtcbiAgICAgICAgY29uc3QgaXRlbXMgPSBTdG9yZS5nZXQoJ2l0ZW1zJyk7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCdwbGF5ZXJJdGVtcycpO1xuICAgICAgICBjb25zdCBjb2xsZWN0aWJsZSA9IGlzQ29sbGlkaW5nKHRoaXMsIGl0ZW1zKTtcblxuICAgICAgICBpZiAoIWNvbGxlY3RpYmxlKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtcy5yZW1vdmUoY29sbGVjdGlibGUpO1xuICAgICAgICBjb25zdCBpdGVtID0gY29sbGVjdGlibGUudG9JdGVtKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtLnF1YW50aXR5OyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IHBsYXllckl0ZW1zLmdldChpdGVtLnR5cGUpIHx8IHsgcXVhbnRpdHk6IDAsIGl0ZW1zOiBbXSwgfTtcblxuICAgICAgICAgICAgZXhpc3RpbmdJdGVtLnF1YW50aXR5ICs9IDE7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmlzRHJvcHBhYmxlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5pdGVtcy5wdXNoKGNvbGxlY3RpYmxlLnRvRHJvcHBhYmxlKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoaXRlbS50eXBlLCBleGlzdGluZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKHRpbWUsIG5vdylcbiAgICB7XG4gICAgICAgIGNvbnN0IGRlcGxhY2VtZW50ID0gdGhpcy5zcGVlZCAqIHRpbWU7XG4gICAgICAgIGNvbnN0IGtleXNEb3duID0gdGhpcy5fa2V5c0Rvd247XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IHsgeDogMCwgeTogMSwgfTtcblxuICAgICAgICBpZiAoMCA9PT0gZGVwbGFjZW1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwID09PSBrZXlzRG93bi5zaXplKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfVykgJiZcbiAgICAgICAgICAgICEoa2V5c0Rvd24uaGFzKEtFWV9BKSB8fCBrZXlzRG93bi5oYXMoS0VZX0QpKSkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55IC09IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzRG93bi5oYXMoS0VZX1cpKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gTWF0aC5zcXJ0KE1hdGgucG93KGRlcGxhY2VtZW50LCAyKSAvIDIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNEb3duLmhhcyhLRVlfUykgJiZcbiAgICAgICAgICAgICEoa2V5c0Rvd24uaGFzKEtFWV9BKSB8fCBrZXlzRG93bi5oYXMoS0VZX0QpKSkgLy8gdmVydGljYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleXNEb3duLmhhcyhLRVlfUykpIC8vIGRpYWdvbmFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSArPSBNYXRoLnNxcnQoTWF0aC5wb3coZGVwbGFjZW1lbnQsIDIpIC8gMik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2V5c0Rvd24uaGFzKEtFWV9BKSAmJlxuICAgICAgICAgICAgIShrZXlzRG93bi5oYXMoS0VZX1cpIHx8IGtleXNEb3duLmhhcyhLRVlfUykpKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9BKSkgLy8gZGlhZ29uYWxcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IE1hdGguc3FydChNYXRoLnBvdyhkZXBsYWNlbWVudCwgMikgLyAyKTtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9EKSAmJlxuICAgICAgICAgICAgIShrZXlzRG93bi5oYXMoS0VZX1cpIHx8IGtleXNEb3duLmhhcyhLRVlfUykpKSAvLyBob3Jpem9udGFsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZXBsYWNlbWVudDtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXlzRG93bi5oYXMoS0VZX0QpKSAvLyBkaWFnb25hbFxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gTWF0aC5zcXJ0KE1hdGgucG93KGRlcGxhY2VtZW50LCAyKSAvIDIpO1xuICAgICAgICAgICAgZGlyZWN0aW9uLnggPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVNob290aW5nRGlyZWN0aW9uKG5vdyk7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVTaG9vdGluZ0RpcmVjdGlvbihub3cpXG4gICAge1xuICAgICAgICBjb25zdCBrZXlzRG93biA9IHRoaXMuX2tleXNEb3duO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7fTtcblxuICAgICAgICBpZiAoa2V5c0Rvd24uaGFzKEtFWV9VUCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9ET1dOKSlcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZGlyZWN0aW9uLnkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfTEVGVCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5c0Rvd24uaGFzKEtFWV9SSUdIVCkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgwICE9PSBkaXJlY3Rpb24ueCB8fCAwICE9PSBkaXJlY3Rpb24ueSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoKGtleXNEb3duLmhhcyhLRVlfVVApIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX0RPV04pIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX0xFRlQpIHx8XG4gICAgICAgICAgICBrZXlzRG93bi5oYXMoS0VZX1JJR0hUKSkgJiYgKCF0aGlzLl9sYXN0U2hvb3QgfHxcbiAgICAgICAgICAgIChub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQpKSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGtleXNEb3duLmhhcyhLRVlfU1BBQ0UpICYmXG4gICAgICAgICAgICAoIXRoaXMuX2xhc3RCb21iIHx8IDUwMCA8PSBub3cgLSB0aGlzLl9sYXN0Qm9tYikpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RCb21iID0gbm93O1xuICAgICAgICAgICAgdGhpcy5kcm9wQm9tYigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzcGF3bigpXG4gICAge1xuICAgICAgICB0aGlzLl94ID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5feSA9IGNhbnZhcy5oZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIGRyb3BCb21iKClcbiAgICB7XG4gICAgICAgIGNvbnN0IHBsYXllckl0ZW1zID0gU3RvcmUuZ2V0KCdwbGF5ZXJJdGVtcycpO1xuICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBwbGF5ZXJJdGVtcy5nZXQoJ2JvbWInKTtcblxuICAgICAgICBpZiAoZXhpc3RpbmdJdGVtICYmIGV4aXN0aW5nSXRlbS5xdWFudGl0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgeCA9IHRoaXMueDtcbiAgICAgICAgICAgIGNvbnN0IHkgPSB0aGlzLnk7XG4gICAgICAgICAgICBjb25zdCBbIEJvbWIsIC4uLmJvbWJzIF0gPSBleGlzdGluZ0l0ZW0uaXRlbXM7XG4gICAgICAgICAgICBleGlzdGluZ0l0ZW0uaXRlbXMgPSBib21icztcbiAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5xdWFudGl0eSAtPSAxO1xuXG4gICAgICAgICAgICBjb25zdCBib21iID0gbmV3IEJvbWIoeyB4LCB5LCB9KTtcbiAgICAgICAgICAgIGJvbWIuZHJvcCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXJJdGVtcy5zZXQoJ2JvbWInLCBleGlzdGluZ0l0ZW0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvb3QoKVxuICAgIHtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIHN3aXRjaCAodGhpcy5fZGlyZWN0aW9uLngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3g7XG4gICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgKyAyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHggPSB0aGlzLl94ICsgODtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fZGlyZWN0aW9uLnkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHRoaXMuX3kgLSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHkgPSB0aGlzLl95ICsgNjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgeCA9IHRoaXMuX3ggKyAxNTtcbiAgICAgICAgICAgICAgICB5ID0gdGhpcy5feSArIDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl90ZWFycy5wdXNoKG5ldyBUZWFyKFxuICAgICAgICB7XG4gICAgICAgICAgICB4LFxuICAgICAgICAgICAgeSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyZWN0aW9uLFxuICAgICAgICAgICAgY3JlYXRvcjogdGhpcyxcbiAgICAgICAgICAgIGRhbWFnZXM6IHRoaXMuZGFtYWdlcyxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBpc1Nob290aW5nID0gdGhpcy5faXNTaG9vdGluZztcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5fZGlyZWN0aW9uO1xuICAgICAgICBsZXQgaGVhZDtcbiAgICAgICAgbGV0IHg7XG4gICAgICAgIGxldCB5O1xuXG4gICAgICAgIGlmIChpc1Nob290aW5nIHx8ICghaXNTaG9vdGluZyAmJiBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPD0gdGhpcy5fYXR0YWNrU3BlZWQgLyAyKSlcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuc2hvb3RpbmdEaXJlY3Rpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgaGVhZCA9IGlzYWFjLmhlYWQuZGlyZWN0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZGlyZWN0aW9uLngpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNhc2UgLTE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzU2hvb3RpbmcgfHwgKCFpc1Nob290aW5nICYmICF4KSlcbiAgICAgICAge1xuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24ueSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgICAgICBbIHgsIHkgXSA9IGhlYWQudXA7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgWyB4LCB5IF0gPSBoZWFkLmRvd247XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxlYWdzXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIDAsIDI1LCAxOCwgMTQsIHRoaXMuX3ggKyA1LCB0aGlzLl95ICsgMjAsIDE4LCAxNCk7XG5cbiAgICAgICAgLy8gaGVhZFxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2ltYWdlLCB4LCB5LFxuICAgICAgICAgICAgaXNhYWMuaGVhZC53aWR0aCxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQuaGVpZ2h0LFxuICAgICAgICAgICAgdGhpcy5feCwgdGhpcy5feSxcbiAgICAgICAgICAgIGlzYWFjLmhlYWQud2lkdGgsXG4gICAgICAgICAgICBpc2FhYy5oZWFkLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGRlbHRhID0gbm93IC0gdGhpcy5fdGhlbjtcbiAgICAgICAgdGhpcy5fdGhlbiA9IG5vdztcblxuICAgICAgICB0aGlzLnVwZGF0ZShkZWx0YSAvIDEwMDAsIG5vdyk7XG4gICAgICAgIHN1cGVyLnJlbmRlcigpO1xuICAgIH1cbn1cbiIsImltcG9ydCBTdGF0aWNBY3RvciBmcm9tICdjb21wb25lbnRzL3N0YXRpYy1hY3Rvcic7XG5pbXBvcnQgeyBjdHggfSBmcm9tICdjYW52YXMnO1xuaW1wb3J0IHsgcm9ja3MgfSBmcm9tICdpbWFnZXMvb2JzdGFjbGVzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9jayBleHRlbmRzIFN0YXRpY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoeyB4LCB5IH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHgsIHksIHdpZHRoOiA1MCwgaGVpZ2h0OiA1MSwgaW1hZ2U6XG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdzcHJpdGUnLFxuICAgICAgICAgICAgc3JjOiByb2Nrcy5zcHJpdGUsXG4gICAgICAgIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX2lzU3BlY2lhbCA9IDAuMDUgPiBNYXRoLnJhbmRvbSgpO1xuICAgIH1cblxuICAgIHJlbmRlclNwcml0ZSgpXG4gICAge1xuICAgICAgICBjb25zdCBbIHgsIHkgXSA9IHRoaXMuX2lzU3BlY2lhbCA/IHJvY2tzLnNwZWNpYWwucG9zaXRpb24gOiByb2Nrcy5kZWZhdWx0LnBvc2l0aW9uO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5faW1hZ2UsIHgsIHksIHJvY2tzLndpZHRoLCByb2Nrcy5oZWlnaHQsIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5pbXBvcnQgeyBkZWZhdWx0Um9vbSB9IGZyb20gJ2ltYWdlcy9yb29tcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvb20gZXh0ZW5kcyBBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgaW1hZ2UsIH0gPSB7IGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFJvb20sIH0sIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHdpZHRoOiA4MDAsIGhlaWdodDogNDgwLCBpbWFnZSwgfSk7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnY29tcG9uZW50cy9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRpY0FjdG9yIGV4dGVuZHMgQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvcih7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGltYWdlIH0pXG4gICAge1xuICAgICAgICBzdXBlcih7IHdpZHRoLCBoZWlnaHQsIGltYWdlLCB9KTtcblxuICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgdGhpcy5feSA9IHk7XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICdjb21wb25lbnRzL2R5bmFtaWMtYWN0b3InO1xuaW1wb3J0IHtcbiAgICBMSU1JVF9UT1AsXG4gICAgTElNSVRfQk9UVE9NLFxuICAgIExJTUlUX0xFRlQsXG4gICAgTElNSVRfUklHSFRcbn0gZnJvbSAnLi4vY29uc3RhbnRzJztcbmltcG9ydCB7IGRlZmF1bHRUZWFyIH0gZnJvbSAnaW1hZ2VzL3RlYXJzJztcbmltcG9ydCB7IGZvcmVncm91bmQgfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHsgaXNDb2xsaWRpbmcgfSBmcm9tICd1dGlscy9waHlzaWNzL2NvbGxpc2lvbnMnO1xuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhciBleHRlbmRzIER5bmFtaWNBY3Rvclxue1xuICAgIGNvbnN0cnVjdG9yKHsgeCwgeSwgZGlyZWN0aW9uLCBzcGVlZCwgY3JlYXRvciwgZGFtYWdlcyB9KVxuICAgIHtcbiAgICAgICAgc3VwZXIoeyB3aWR0aDogMTMsIGhlaWdodDogMTMsIGltYWdlOiB7IHR5cGU6ICdpbWFnZScsIHNyYzogZGVmYXVsdFRlYXIsIH0sIH0pO1xuXG4gICAgICAgIHRoaXMuX3ggPSB4O1xuICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHNwZWVkIHx8IDQ7XG4gICAgICAgIHRoaXMuX2NyZWF0b3IgPSBjcmVhdG9yO1xuICAgICAgICB0aGlzLmRhbWFnZXMgPSBkYW1hZ2VzO1xuXG4gICAgICAgIHRoaXMueFZlbG9jaXR5ID0gZGlyZWN0aW9uLnggKiB0aGlzLl9zcGVlZDtcbiAgICAgICAgdGhpcy55VmVsb2NpdHkgPSBkaXJlY3Rpb24ueSAqIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIGdldCBpbkJvdW5kcygpXG4gICAge1xuICAgICAgICBpZiAoTElNSVRfTEVGVCAtIHRoaXMud2lkdGggPiB0aGlzLl94IHx8IHRoaXMuX3ggPiBMSU1JVF9SSUdIVCArIHRoaXMud2lkdGggfHxcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuaGVpZ2h0ID4gdGhpcy5feSB8fCB0aGlzLl95ID4gTElNSVRfQk9UVE9NICsgdGhpcy5oZWlnaHQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gU3RvcmUuZ2V0KCdpdGVtcycpO1xuICAgICAgICBjb25zdCBjb2xsaWRlciA9IGlzQ29sbGlkaW5nKHRoaXMsIGZvcmVncm91bmQuZmlsdGVyKGl0ZW0gPT5cbiAgICAgICAgICAgIGl0ZW0gIT09IHRoaXMuX2NyZWF0b3IgJiYgaXRlbSAhPT0gaXRlbXNcbiAgICAgICAgKSk7XG5cbiAgICAgICAgaWYgKGNvbGxpZGVyKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBjb2xsaWRlci5ocClcbiAgICAgICAgICAgIHtcblxuICAgICAgICAgICAgICAgIGNvbGxpZGVyLmhwIC09IHRoaXMuZGFtYWdlcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGNhbnZhcyB9IGZyb20gJ2NhbnZhcyc7XG5cbmNvbnN0IGlzRnIgPSBuYXZpZ2F0b3IubGFuZ3VhZ2UgPT09ICdmcic7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1BfSVNBQUMgPSA0MDtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT01fSVNBQUMgPSBjYW52YXMuaGVpZ2h0IC0gOTU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVF9JU0FBQyA9IDU1O1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUX0lTQUFDID0gY2FudmFzLndpZHRoIC0gODU7XG5cbmV4cG9ydCBjb25zdCBMSU1JVF9UT1AgPSA1NTtcbmV4cG9ydCBjb25zdCBMSU1JVF9CT1RUT00gPSBjYW52YXMuaGVpZ2h0IC0gNjU7XG5leHBvcnQgY29uc3QgTElNSVRfTEVGVCA9IDYwO1xuZXhwb3J0IGNvbnN0IExJTUlUX1JJR0hUID0gY2FudmFzLndpZHRoIC0gNzU7XG5cbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG5leHBvcnQgY29uc3QgS0VZX1NQQUNFID0gMzI7XG5leHBvcnQgY29uc3QgS0VZX1cgPSBpc0ZyID8gOTAgOiA4NztcbmV4cG9ydCBjb25zdCBLRVlfQSA9IGlzRnIgPyA4MSA6IDY1O1xuZXhwb3J0IGNvbnN0IEtFWV9TID0gODM7XG5leHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbiIsImV4cG9ydCBjb25zdCBoZWFydHMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9oZWFydHNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZW1wdHk6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAwLCAwLCBdLFxuICAgIH0sXG4gICAgaGFsZmRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAxNiwgMCwgXSxcbiAgICB9LFxuICAgIHNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDE2LCBdLFxuICAgIH0sXG4gICAgaGFsZnNwaXJpdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDE2LCAxNiwgXSxcbiAgICB9LFxuICAgIGV2aWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMTYsIF0sXG4gICAgfSxcbiAgICBoYWxmZXZpbDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDQ4LCAxNiwgXSxcbiAgICB9LFxuICAgIHJlaW5mb3JjZWQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyA0OCwgMCwgXSxcbiAgICB9LFxuICAgIGhhbGZyZWluZm9yY2VkOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgNjQsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBib21icyA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAwLCAxNiwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGtleXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMTYsIDAsIF0sXG4gICAgfSxcbiAgICBnb2xkZW46XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAxNiwgMTYsIF0sXG4gICAgfSxcbn07XG5cblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvaHVkLnBuZycsXG4gICAgd2lkdGg6IDE2LFxuICAgIGhlaWdodDogMTYsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBoYXJkTW9kZSA9XG57XG4gICAgc3ByaXRlOiAnYnVpbGQvaW1nL2h1ZC5wbmcnLFxuICAgIHdpZHRoOiAxNixcbiAgICBoZWlnaHQ6IDE2LFxuICAgIGRlZmF1bHQ6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IG5vQWNoaWV2ZW1lbnQgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9odWQucG5nJyxcbiAgICB3aWR0aDogMTYsXG4gICAgaGVpZ2h0OiAxNixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMzIsIDE2LCBdLFxuICAgIH0sXG59O1xuXG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaGVhcnRzLFxuICAgIGJvbWJzLFxuICAgIGtleXMsXG4gICAgY29pbnMsXG4gICAgaGFyZE1vZGUsXG4gICAgbm9BY2hpZXZlbWVudCxcbn07XG4iLCJleHBvcnQgY29uc3QgaXNhYWMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9pc2FhY19zcHJpdGVfY3VzdG9tLnBuZycsXG4gICAgaGVhZDpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAyOCxcbiAgICAgICAgaGVpZ2h0OiAyNSxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAwLCAwLCBdLFxuICAgICAgICAgICAgdXA6IFsgMjggKiA0LCAwLCBdLFxuICAgICAgICAgICAgbGVmdDogWyAyOCAqIDYsIDAsIF0sXG4gICAgICAgICAgICByaWdodDogWyAyOCAqIDIsIDAsIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHNob290aW5nRGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAyOCwgMCwgXSxcbiAgICAgICAgICAgIHVwOiBbIDI4ICogNSwgMCwgXSxcbiAgICAgICAgICAgIGxlZnQ6IFsgMjggKiA3LCAwLCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsgMjggKiAzLCAwLCBdLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgbGVnczpcbiAgICB7XG4gICAgICAgIHdpZHRoOiAxOCxcbiAgICAgICAgaGVpZ2h0OiAxNCxcbiAgICAgICAgZGlyZWN0aW9uczpcbiAgICAgICAge1xuICAgICAgICAgICAgZG93bjogWyAwLCAyNSwgXSxcbiAgICAgICAgICAgIHVwOiBbIDE4ICogNSwgMjUsIF0sXG4gICAgICAgICAgICBsZWZ0OiBbIDAsIDI1LCBdLFxuICAgICAgICAgICAgcmlnaHQ6IFsgMCwgMjUsIF0sXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgaXNhYWMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGJvbWJzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvYm9tYnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgZGVmYXVsdDpcbiAgICB7XG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbiAgICBkb3VibGU6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyAzMiwgMCwgXSxcbiAgICB9LFxuICAgIGV4cGxvc2lvbjpcbiAgICB7XG4gICAgICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9leHBsb3Npb25fc3ByaXRlLnBuZycsXG4gICAgICAgIHdpZHRoOiA5NixcbiAgICAgICAgaGVpZ2h0OiA5NixcbiAgICAgICAgc3RhdGVzOiAxMixcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGNvaW5zID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvY29pbnNfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDIwLFxuICAgIGhlaWdodDogMTUsXG4gICAgc3RhdGVzOiA2LFxufTtcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBib21icyxcbn07XG4iLCJleHBvcnQgY29uc3QgZmxpZXMgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9mbGllc19zcHJpdGUucG5nJyxcbiAgICB3aWR0aDogMzIsXG4gICAgaGVpZ2h0OiAzMixcbiAgICBzdGF0aW9uYXJ5OlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgcG9vcE9yYml0YWw6XG4gICAge1xuICAgICAgICBwb3NpdGlvbjogWyA2NCwgMCwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG4gICAgaG9taW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMCwgMzIsIF0sXG4gICAgICAgIHN0YXRlczogNCxcbiAgICB9LFxuICAgIGNpcmNsaW5nOlxuICAgIHtcbiAgICAgICAgcG9zaXRpb246IFsgMTI4LCAzMiwgXSxcbiAgICAgICAgc3RhdGVzOiAyLFxuICAgIH0sXG5cbiAgICBkeWluZzpcbiAgICB7XG4gICAgICAgIHdpZHRoOiA2NCxcbiAgICAgICAgaGVpZ2h0OiA2NCxcbiAgICAgICAgcG9zaXRpb246IFsgMCwgNjQsIF0sXG4gICAgICAgIHN0YXRlczogMTIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgZmxpZXMsXG59O1xuIiwiZXhwb3J0IGNvbnN0IHJvY2tzID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvcm9ja3Nfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDE3MCxcbiAgICBoZWlnaHQ6IDE3MixcbiAgICBkZWZhdWx0OlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbIDAsIDAsIF0sXG4gICAgfSxcbiAgICBzcGVjaWFsOlxuICAgIHtcbiAgICAgICAgd2lkdGg6IDE3MCxcbiAgICAgICAgaGVpZ2h0OiAxNzIsXG4gICAgICAgIHBvc2l0aW9uOiBbIDE3MCwgMCwgXSxcbiAgICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGZpcmUgPVxue1xuICAgIHNwcml0ZTogJ2J1aWxkL2ltZy9maXJlX3Nwcml0ZS5wbmcnLFxuICAgIHdpZHRoOiAzMSxcbiAgICBoZWlnaHQ6IDM0LFxuICAgIHN0YXRlczogNixcbn07XG5cblxuZXhwb3J0IGNvbnN0IGZpcmVCYXNlID1cbntcbiAgICBzcHJpdGU6ICdidWlsZC9pbWcvZGVhZGZpcmVfc3ByaXRlLnBuZycsXG4gICAgd2lkdGg6IDMyLFxuICAgIGhlaWdodDogMzIsXG4gICAgcG9zaXRpb246IFsgMCwgMzQsIF0sXG4gICAgZGVhZFBvc2l0aW9uOiBbIDMyLCAzNCwgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0XG57XG4gICAgcm9ja3MsXG4gICAgZmlyZSxcbiAgICBmaXJlQmFzZSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFJvb20gPSAnYnVpbGQvaW1nL3Jvb20ucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0Um9vbSxcbn07XG4iLCJleHBvcnQgY29uc3QgZGVmYXVsdFRlYXIgPSAnYnVpbGQvaW1nL3RlYXIucG5nJztcblxuZXhwb3J0IGRlZmF1bHRcbntcbiAgICBkZWZhdWx0OiBkZWZhdWx0VGVhcixcbn07XG4iLCJpbXBvcnQgU3RvcmUgZnJvbSAnc3RvcmUnO1xuaW1wb3J0IENvbGxlY3Rpb24gZnJvbSAnY29tcG9uZW50cy9jb2xsZWN0aW9uJztcbmltcG9ydCBSb29tIGZyb20gJ2NvbXBvbmVudHMvcm9vbSc7XG5pbXBvcnQgSFVEIGZyb20gJ2NvbXBvbmVudHMvSFVEJztcbmltcG9ydCBSb2NrIGZyb20gJ2NvbXBvbmVudHMvcm9jayc7XG5pbXBvcnQgRmlyZSBmcm9tICdjb21wb25lbnRzL2ZpcmUnO1xuaW1wb3J0IEZseSBmcm9tICdjb21wb25lbnRzL2ZseSc7XG5pbXBvcnQgQm9tYiBmcm9tICdjb21wb25lbnRzL2JvbWInO1xuaW1wb3J0IENvaW4gZnJvbSAnY29tcG9uZW50cy9jb2luJztcbmltcG9ydCBJc2FhYyBmcm9tICdjb21wb25lbnRzL2lzYWFjJztcbmltcG9ydCBWb2x1bWVDb250cm9sbGVyIGZyb20gJ3ZvbHVtZS1jb250cm9sbGVyJztcblxuU3RvcmUuc2V0KCdyb29tJywgbmV3IFJvb20oKSk7XG5TdG9yZS5zZXQoJ0hVRCcsIG5ldyBIVUQoKSk7XG5TdG9yZS5zZXQoJ25vQWNoaWV2ZW1lbnQnLCB0cnVlKTtcblN0b3JlLnNldCgnaGFyZE1vZGUnLCBmYWxzZSk7XG5TdG9yZS5zZXQoJ3NvdW5kcycsIG5ldyBWb2x1bWVDb250cm9sbGVyKCkpO1xuU3RvcmUuc2V0KCdiYWNrZ3JvdW5kT2JzdGFjbGVzJywgbmV3IENvbGxlY3Rpb24oeyBjb2xsZWN0aW9uOiBbXSwgfSkpO1xuXG5TdG9yZS5zZXQoJ3RlYXJzJywgbmV3IENvbGxlY3Rpb24oeyBzaG91bGRVcGRhdGVCZWZvcmVSZW5kZXI6IHRydWUsIH0pKTtcblxuU3RvcmUuc2V0KCdvYnN0YWNsZXMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IFJvY2soeyB4OiA0NTAsIHk6IDEyMCwgfSksXG4gICAgbmV3IFJvY2soeyB4OiA2NSwgeTogNjUsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTE1LCB5OiA2NSwgfSksXG4gICAgbmV3IFJvY2soeyB4OiAxNjUsIHk6IDY1LCB9KSxcbiAgICBuZXcgUm9jayh7IHg6IDY1LCB5OiAxMTYsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTE1LCB5OiAxMTYsIH0pLFxuICAgIG5ldyBSb2NrKHsgeDogMTY1LCB5OiAxMTYsIH0pLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9KSk7XG5cblN0b3JlLnNldCgnaXRlbXMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEJvbWIoeyB4OiA4MiwgeTogMzU2LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE0MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE2MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDE4MCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDIwMCwgeTogMzc1LCB9KSxcbiAgICBuZXcgQ29pbih7IHg6IDY4MCwgeTogODAsIH0pLFxuICAgIG5ldyBDb2luKHsgeDogNjgwLCB5OiA2NSwgfSksXG5dLCB9KSk7XG5cblN0b3JlLnNldCgnbW9uc3RlcnMnLCBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgbmV3IEZpcmUoeyB4OiA3MDMsIHk6IDY1LCB9KSxcbiAgICBuZXcgRmlyZSh7IHg6IDY1MCwgeTogNjUsIH0pLFxuICAgIG5ldyBGbHkoeyB4OiAyNTAsIHk6IDY1LCB9KSxcbiAgICAvLyBuZXcgRmx5KHsgeDogMzAwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0pLFxuICAgIC8vIG5ldyBGbHkoeyB4OiAzMzAsIHk6IDY1LCBuYW1lOiAnaG9taW5nJywgfSksXG4gICAgLy8gbmV3IEZseSh7IHg6IDM1MCwgeTogNjUsIG5hbWU6ICdob21pbmcnLCB9KSxcbiAgICAvLyBuZXcgRmx5KHsgeDogMzYwLCB5OiA2NSwgbmFtZTogJ2hvbWluZycsIH0pLFxuXSwgc2hvdWxkVXBkYXRlQmVmb3JlUmVuZGVyOiB0cnVlLCB9KSk7XG5cblN0b3JlLnNldCgncGxheWVyJywgbmV3IElzYWFjKCkpO1xuU3RvcmUuc2V0KCdwbGF5ZXJJdGVtcycsIG5ldyBNYXAoKSk7XG5cblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmQgPSBuZXcgQ29sbGVjdGlvbih7IGNvbGxlY3Rpb246XG5bXG4gICAgU3RvcmUuZ2V0KCdyb29tJyksXG4gICAgU3RvcmUuZ2V0KCdiYWNrZ3JvdW5kT2JzdGFjbGVzJyksXG4gICAgU3RvcmUuZ2V0KCdIVUQnKSxcbl0sIH0pO1xuXG5leHBvcnQgY29uc3QgZm9yZWdyb3VuZCA9IG5ldyBDb2xsZWN0aW9uKHsgY29sbGVjdGlvbjpcbltcbiAgICBTdG9yZS5nZXQoJ29ic3RhY2xlcycpLFxuICAgIFN0b3JlLmdldCgnbW9uc3RlcnMnKSxcbiAgICBTdG9yZS5nZXQoJ2l0ZW1zJyksXG4gICAgU3RvcmUuZ2V0KCd0ZWFycycpLFxuICAgIFN0b3JlLmdldCgncGxheWVyJyksXG5dLCB9KTtcblxuXG53aW5kb3cuU3RvcmUgPSBTdG9yZTtcbndpbmRvdy5QbGF5ZXIgPSBTdG9yZS5nZXQoJ3BsYXllcicpO1xud2luZG93Lml0ZW1zID0gU3RvcmUuZ2V0KCdpdGVtcycpO1xuXG4vLyBleHBvcnQgY29uc3Qgb2JzdGFjbGVzID0gZm9yZWdyb3VuZFswXTtcbi8vIGV4cG9ydCBjb25zdCBtb25zdGVycyA9IGZvcmVncm91bmRbMV07XG4vLyBleHBvcnQgY29uc3QgcGxheWVyID0gZm9yZWdyb3VuZFsyXTtcbiIsImNvbnN0IFN0b3JlID0gbmV3IE1hcCgpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4iLCJpbXBvcnQgQ29sbGVjdGlvbiBmcm9tICdjb21wb25lbnRzL2NvbGxlY3Rpb24nO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29sbGlkZXJzID0gKHRhcmdldCwgb3RoZXIpID0+XG57XG4gICAgLy8gaWdub3JlIGNvbGxpc2lvbiB3aXRoIHNlbGZcbiAgICBpZiAodGFyZ2V0ID09PSBvdGhlcilcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4ID0gdGFyZ2V0Lng7XG4gICAgY29uc3Qgd2lkdGggPSB0YXJnZXQuY29sbGlkaW5nV2lkdGggfHwgdGFyZ2V0LndpZHRoO1xuICAgIGNvbnN0IHkgPSB0YXJnZXQueTtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXQuY29sbGlkaW5nSGVpZ2h0IHx8IHRhcmdldC5oZWlnaHQ7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvdGhlcikgfHwgb3RoZXIgaW5zdGFuY2VvZiBDb2xsZWN0aW9uKVxuICAgIHtcbiAgICAgICAgY29uc3QgY29sbGlkZXJzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgX2NvbGxpZGVycyA9IGdldENvbGxpZGVycyh0YXJnZXQsIG90aGVyW2ldKTtcblxuICAgICAgICAgICAgaWYgKF9jb2xsaWRlcnMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sbGlkZXJzLnB1c2guYXBwbHkoY29sbGlkZXJzLCBfY29sbGlkZXJzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItc3ByZWFkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29sbGlkZXJzLmxlbmd0aCA/IGNvbGxpZGVycyA6IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IF94ID0gb3RoZXIueDtcbiAgICBjb25zdCBfd2lkdGggPSBvdGhlci5jb2xsaWRpbmdXaWR0aCB8fCBvdGhlci53aWR0aDtcbiAgICBjb25zdCBfeSA9IG90aGVyLnk7XG4gICAgY29uc3QgX2hlaWdodCA9IG90aGVyLmNvbGxpZGluZ0hlaWdodCB8fCBvdGhlci5oZWlnaHQ7XG5cbiAgICBjb25zdCB0b3AgPSB5ICsgaGVpZ2h0ID49IF95O1xuICAgIGNvbnN0IHJpZ2h0ID0geCA8PSBfeCArIF93aWR0aDtcbiAgICBjb25zdCBib3R0b20gPSB5ICsgaGVpZ2h0IDw9IF95ICsgX2hlaWdodDtcbiAgICBjb25zdCBsZWZ0ID0geCArIHdpZHRoID49IF94O1xuXG4gICAgaWYgKGxlZnQgJiYgcmlnaHQgJiYgYm90dG9tICYmIHRvcClcbiAgICB7XG4gICAgICAgIHJldHVybiBbIG90aGVyLCBdO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0NvbGxpZGluZyA9ICh0YXJnZXQsIG90aGVyKSA9Plxue1xuICAgIC8vIGlnbm9yZSBjb2xsaXNpb24gd2l0aCBzZWxmXG4gICAgaWYgKHRhcmdldCA9PT0gb3RoZXIpXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgeCA9IHRhcmdldC54O1xuICAgIGNvbnN0IHdpZHRoID0gdGFyZ2V0LmNvbGxpZGluZ1dpZHRoIHx8IHRhcmdldC53aWR0aDtcbiAgICBjb25zdCB5ID0gdGFyZ2V0Lnk7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGFyZ2V0LmNvbGxpZGluZ0hlaWdodCB8fCB0YXJnZXQuaGVpZ2h0O1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpIHx8IG90aGVyIGluc3RhbmNlb2YgQ29sbGVjdGlvbilcbiAgICB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBvdGhlci5sZW5ndGg7IGkgPCBsZW47IGkrKylcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc3QgY29sbGlkZXIgPSBpc0NvbGxpZGluZyh0YXJnZXQsIG90aGVyW2ldKTtcbiAgICAgICAgICAgIGlmIChjb2xsaWRlcilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGlkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgX3ggPSBvdGhlci54O1xuICAgIGNvbnN0IF93aWR0aCA9IG90aGVyLmNvbGxpZGluZ1dpZHRoIHx8IG90aGVyLndpZHRoO1xuICAgIGNvbnN0IF95ID0gb3RoZXIueTtcbiAgICBjb25zdCBfaGVpZ2h0ID0gb3RoZXIuY29sbGlkaW5nSGVpZ2h0IHx8IG90aGVyLmhlaWdodDtcblxuICAgIGNvbnN0IHRvcCA9IHkgKyBoZWlnaHQgPj0gX3k7XG4gICAgY29uc3QgcmlnaHQgPSB4IDw9IF94ICsgX3dpZHRoO1xuICAgIGNvbnN0IGJvdHRvbSA9IHkgKyBoZWlnaHQgPD0gX3kgKyBfaGVpZ2h0O1xuICAgIGNvbnN0IGxlZnQgPSB4ICsgd2lkdGggPj0gX3g7XG5cbiAgICBpZiAobGVmdCAmJiByaWdodCAmJiBib3R0b20gJiYgdG9wKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIG90aGVyO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn07XG4iLCJpbXBvcnQgeyB2b2x1bWVTbGlkZXIsIHZvbHVtZURpc3BsYXkgfSBmcm9tICd2b2x1bWUtZWxlbWVudHMnO1xuXG5jb25zdCB0ZXh0ID0gJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiB2b2x1bWVEaXNwbGF5LmlubmVyVGV4dCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZvbHVtZUNvbnRyb2xsZXJcbntcbiAgICBjb25zdHJ1Y3Rvcih2b2x1bWU9NTAsIG11dGVkPWZhbHNlKVxuICAgIHtcbiAgICAgICAgdGhpcy52b2x1bWUgPSB2b2x1bWU7XG4gICAgICAgIHRoaXMubXV0ZWQgPSBtdXRlZDtcblxuICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkodm9sdW1lRGlzcGxheSk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSh2b2x1bWVTbGlkZXIpO1xuICAgIH1cblxuICAgIG9ic2VydmUoaW5wdXQpXG4gICAge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoeyB0YXJnZXQgfSkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy52b2x1bWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURpc3BsYXkodm9sdW1lRGlzcGxheSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVwZGF0ZURpc3BsYXkoc3BhbilcbiAgICB7XG4gICAgICAgIHNwYW5bdGV4dF0gPSBgJHt0aGlzLl92b2x1bWV9ICVgO1xuICAgIH1cblxuICAgIGdldCB2b2x1bWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZvbHVtZTtcbiAgICB9XG5cbiAgICBzZXQgdm9sdW1lKHZhbHVlKVxuICAgIHtcbiAgICAgICAgaWYgKDAgPD0gdmFsdWUgJiYgMTAwID49IHZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl92b2x1bWUgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBtdXRlZCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fbXV0ZWQ7XG4gICAgfVxuXG4gICAgc2V0IG11dGVkKHZhbHVlKVxuICAgIHtcbiAgICAgICAgdGhpcy5fbXV0ZWQgPSAhIXZhbHVlO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjb25zdCB2b2x1bWVTbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtdm9sdW1lJyk7XG5leHBvcnQgY29uc3Qgdm9sdW1lRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy12b2x1bWUtLWRpc3BsYXknKTtcbiJdfQ==
