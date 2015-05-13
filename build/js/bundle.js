(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsIsaac = require('./components/isaac');

var _componentsIsaac2 = _interopRequireDefault(_componentsIsaac);

var _componentsRoom = require('./components/room');

var _componentsRoom2 = _interopRequireDefault(_componentsRoom);

var actors = [new _componentsRoom2['default'](), new _componentsIsaac2['default']()];

var room = actors[0]; // shortcut
var isaac = actors[1]; // shortcut

var main = function main() {
    for (var i = 0, len = actors.length; i < len; i++) {
        if (!actors[i].ready) {
            continue;
        }

        actors[i].render();
    }

    requestAnimationFrame(main);
};

isaac.respawn(room);
main();

},{"./components/isaac":7,"./components/room":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var canvas = document.getElementById('app');
exports.canvas = canvas;
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
    function Actor(sizeX, sizeY) {
        var _this = this;

        var image = arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, Actor);

        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.image = image;
        this._x = null;
        this._y = null;

        if (this.image) {
            this.ready = false;
            this._image = new Image();
            this._image.onload = function () {
                return _this.ready = true;
            };
            this._image.src = this.image;
        } else {
            this.ready = true;
        }
    }

    _createClass(Actor, [{
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
            return this._x;
        },
        set: function (value) {
            this._y = value;
        }
    }, {
        key: 'center',
        get: function () {
            return {
                x: this._x + this.sizeX / 2,
                y: this._y + this.sizeY / 2
            };
        }
    }, {
        key: 'render',
        value: function render() {
            // ctx.fillStyle = 'red';
            // ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );

            if (this.image && this.ready) {
                _canvas.ctx.drawImage(this._image, this._x, this._y);
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dynamicActor = require('./dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var Character = (function (_DynamicActor) {
    function Character(sizeX, sizeY, image, speed, name, hp) {
        _classCallCheck(this, Character);

        _get(Object.getPrototypeOf(Character.prototype), 'constructor', this).call(this, sizeX, sizeY, image);

        this._speed = speed;
        this._hp = hp;
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
            if (0 >= value && value < 10) {
                this._hp = value;
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
                return item.active;
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

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x3,
    property = _x4,
    receiver = _x5; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var DynamicActor = (function (_Actor) {
    function DynamicActor(sizeX, sizeY) {
        var image = arguments[2] === undefined ? null : arguments[2];
        var speed = arguments[3] === undefined ? 256 : arguments[3];

        _classCallCheck(this, DynamicActor);

        _get(Object.getPrototypeOf(DynamicActor.prototype), 'constructor', this).call(this, sizeX, sizeY, image);

        this._speed = speed;
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _canvas = require('../canvas');

var _character = require('./character');

var _character2 = _interopRequireDefault(_character);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _tear = require('./tear');

var _tear2 = _interopRequireDefault(_tear);

var _utilsStringRepeat = require('../utils/string/repeat');

var _utilsStringRepeat2 = _interopRequireDefault(_utilsStringRepeat);

var _constants = require('../constants');

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var Isaac = (function (_Character) {
    function Isaac() {
        var _this2 = this;

        _classCallCheck(this, Isaac);

        _get(Object.getPrototypeOf(Isaac.prototype), 'constructor', this).call(this, 28, 35, _images2['default'].characters.isaac, 256, 'Isaac', 3);

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new _collection2['default']();
        this._attackSpeed = 1000; // 1 shoot / second
        this._direction = { x: 0, y: 1 };
        document.addEventListener('keydown', function (e) {
            return _this2._keysDown.add(e.keyCode);
        });
        document.addEventListener('keyup', function (e) {
            return _this2._keysDown['delete'](e.keyCode);
        });
    }

    _inherits(Isaac, _Character);

    _createClass(Isaac, [{
        key: 'x',
        get: function () {
            return this._x;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_LEFT < value && value < _constants.LIMIT_RIGHT) {
                this._x = value;
            }
        }
    }, {
        key: 'y',
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value !== this._x && _constants.LIMIT_TOP < value && value < _constants.LIMIT_BOTTOM) {
                this._y = value;
            }
        }
    }, {
        key: 'updateDirection',
        value: function updateDirection() {
            if (this._keysDown.size === 0) {
                return;
            }

            var direction = {};
            if (this._keysDown.has(_constants.KEY_UP)) {
                direction.y = -1;
            } else if (this._keysDown.has(_constants.KEY_DOWN)) {
                direction.y = 1;
            } else {
                direction.y = 0;
            }

            if (this._keysDown.has(_constants.KEY_LEFT)) {
                direction.x = -1;
            } else if (this._keysDown.has(_constants.KEY_RIGHT)) {
                direction.x = 1;
            } else {
                direction.x = 0;
            }

            if (direction.x !== 0 || direction.y !== 0) {
                this._direction = direction;
            }
        }
    }, {
        key: 'update',
        value: function update(time, now) {
            var deplacement = this.speed * time;

            if (deplacement === 0) {
                return false;
            }

            if (this._keysDown.size === 0) {
                return false;
            }

            if (this._keysDown.has(_constants.KEY_W)) {
                this.y -= deplacement;
            } else if (this._keysDown.has(_constants.KEY_S)) {
                this.y += deplacement;
            }

            if (this._keysDown.has(_constants.KEY_A)) {
                this.x -= deplacement;
            } else if (this._keysDown.has(_constants.KEY_D)) {
                this.x += deplacement;
            }

            this.updateDirection();

            if ((this._keysDown.has(_constants.KEY_UP) || this._keysDown.has(_constants.KEY_DOWN) || this._keysDown.has(_constants.KEY_LEFT) || this._keysDown.has(_constants.KEY_RIGHT)) && (!this._lastShoot || now - this._lastShoot >= this._attackSpeed)) {
                this._lastShoot = now;
                this.shoot();
            }

            return true;
        }
    }, {
        key: 'respawn',
        value: function respawn(room) {
            this.x = room.sizeX / 2;
            this.y = room.sizeY / 2;
        }
    }, {
        key: 'shoot',
        value: function shoot() {
            this._tears.add(new _tear2['default'](this._x, this._y, this._direction));
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
            _canvas.ctx.fillText(_utilsStringRepeat2['default']('❤ ', this.hp), 35, 13);
        }
    }]);

    return Isaac;
})(_character2['default']);

exports['default'] = Isaac;
module.exports = exports['default'];

},{"../canvas":2,"../constants":10,"../images":11,"../utils/string/repeat":12,"./character":4,"./collection":5,"./tear":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _actor = require('./actor');

var _actor2 = _interopRequireDefault(_actor);

var _images = require('../images');

var _images2 = _interopRequireDefault(_images);

var Room = (function (_Actor) {
    function Room() {
        var image = arguments[0] === undefined ? _images2['default'].rooms['default'] : arguments[0];

        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, 800, 480, image);
        this._x = 0;
        this._y = 0;
    }

    _inherits(Room, _Actor);

    return Room;
})(_actor2['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../images":11,"./actor":3}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x2,
    property = _x3,
    receiver = _x4; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dynamicActor = require('./dynamic-actor');

var _dynamicActor2 = _interopRequireDefault(_dynamicActor);

var _canvas = require('../canvas');

var _constants = require('../constants');

var Tear = (function (_DynamicActor) {
    function Tear(x, y, direction) {
        var speed = arguments[3] === undefined ? 5 : arguments[3];

        _classCallCheck(this, Tear);

        _get(Object.getPrototypeOf(Tear.prototype), 'constructor', this).call(this, 15, 15);

        this._x = x;
        this._y = y;
        this.active = true;

        this.xVelocity = direction.x * speed;
        this.yVelocity = direction.y * speed;
    }

    _inherits(Tear, _DynamicActor);

    _createClass(Tear, [{
        key: 'inBounds',
        get: function () {
            return _constants.LIMIT_LEFT - this.sizeX <= this._x && this._x <= _constants.LIMIT_RIGHT + this.sizeX && _constants.LIMIT_TOP - this.sizeY <= this._y && this._y <= _constants.LIMIT_BOTTOM + this.sizeY;
        }
    }, {
        key: 'update',
        value: function update() {
            this._x += this.xVelocity;
            this._y += this.yVelocity;

            this.active = this.active && this.inBounds;
        }
    }, {
        key: 'render',
        value: function render() {

            // var radgrad4 = ctx.createRadialGradient(2,10,50,5,12,5);
            // radgrad4.addColorStop( 0, '#00C9FF' );
            // radgrad4.addColorStop( 0.8, '#00B5E2' );
            // radgrad4.addColorStop( 1, 'rgba(228,199,0,0)' );
            //
            // // draw shapes
            // ctx.fillStyle = radgrad4;
            // ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );
            var gradient = _canvas.ctx.createRadialGradient(this.center.x, this.center.y, 0, this.center.x, this.center.y, this.sizeX / 2);
            gradient.addColorStop(0, '#0099FF');
            gradient.addColorStop(1, '#00ABEB');
            // ctx.fillStyle = gradient;
            // ctx.fillRect(this._x,this._y,200,200);

            _canvas.ctx.beginPath();
            _canvas.ctx.ellipse(this.center.x, this.center.y, this.sizeX / 2, this.sizeX / 2, 0, 0, Math.PI * 2);
            _canvas.ctx.closePath();

            _canvas.ctx.fillStyle = gradient;
            _canvas.ctx.fill();
        }
    }]);

    return Tear;
})(_dynamicActor2['default']);

exports['default'] = Tear;
module.exports = exports['default'];

},{"../canvas":2,"../constants":10,"./dynamic-actor":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _canvas = require('./canvas');

var LIMIT_TOP = 40;
exports.LIMIT_TOP = LIMIT_TOP;
var LIMIT_BOTTOM = _canvas.canvas.height - 100;
exports.LIMIT_BOTTOM = LIMIT_BOTTOM;
var LIMIT_LEFT = 55;
exports.LIMIT_LEFT = LIMIT_LEFT;
var LIMIT_RIGHT = _canvas.canvas.width - 85;
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

},{"./canvas":2}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
// preload all images for now.

var images = {
    rooms: {
        'default': 'build/img/room.png'
    },
    characters: {
        isaac: 'build/img/isaac.png'
    },
    items: {},
    monsters: {},
    obstacles: {
        poop: '',
        redPoop: 'build/img/red_poop.png'
    }
};

exports['default'] = images;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvYXBwLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NhbnZhcy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2FjdG9yLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY2hhcmFjdGVyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbXBvbmVudHMvY29sbGVjdGlvbi5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL2R5bmFtaWMtYWN0b3IuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy9pc2FhYy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9jb21wb25lbnRzL3Jvb20uanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvY29tcG9uZW50cy90ZWFyLmpzIiwiL1VzZXJzL25pY29sYXNiL3dvcmtzcGFjZS93d3cvaXNhYWMvc3JjL2NvbnN0YW50cy5qcyIsIi9Vc2Vycy9uaWNvbGFzYi93b3Jrc3BhY2Uvd3d3L2lzYWFjL3NyYy9pbWFnZXMuanMiLCIvVXNlcnMvbmljb2xhc2Ivd29ya3NwYWNlL3d3dy9pc2FhYy9zcmMvdXRpbHMvc3RyaW5nL3JlcGVhdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7K0JDQWtCLG9CQUFvQjs7Ozs4QkFDckIsbUJBQW1COzs7O0FBRXBDLElBQUksTUFBTSxHQUNWLENB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QUFDO0tBQ2Y7QUFDRCxXQUFPLElBQUksQ0FBQztDQUNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBJc2FhYyBmcm9tICcuL2NvbXBvbmVudHMvaXNhYWMnO1xuaW1wb3J0IFJvb20gZnJvbSAnLi9jb21wb25lbnRzL3Jvb20nO1xuXG5sZXQgYWN0b3JzID1cbltcbiAgICBuZXcgUm9vbSgpLFxuICAgIG5ldyBJc2FhYygpXG5dO1xuXG5jb25zdCByb29tID0gYWN0b3JzWzBdOyAvLyBzaG9ydGN1dFxuY29uc3QgaXNhYWMgPSBhY3RvcnNbMV07IC8vIHNob3J0Y3V0XG5cbmNvbnN0IG1haW4gPSAoKSA9Plxue1xuICAgIGZvciAoIGxldCBpPTAsIGxlbj1hY3RvcnMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKVxuICAgIHtcbiAgICAgICAgaWYgKCAhYWN0b3JzW2ldLnJlYWR5IClcbiAgICAgICAge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBhY3RvcnNbaV0ucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBtYWluICk7XG59O1xuXG5pc2FhYy5yZXNwYXduKCByb29tICk7XG5tYWluKCk7XG4iLCJleHBvcnQgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdhcHAnICk7XG5leHBvcnQgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoICcyZCcgKTtcbiIsImltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHNpemVYLCBzaXplWSwgaW1hZ2U9bnVsbCApXG4gICAge1xuICAgICAgICB0aGlzLnNpemVYID0gc2l6ZVg7XG4gICAgICAgIHRoaXMuc2l6ZVkgPSBzaXplWTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLl94ID0gbnVsbDtcbiAgICAgICAgdGhpcy5feSA9IG51bGw7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2ltYWdlLm9ubG9hZCA9ICgpID0+IHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5feSA9IHZhbHVlO1xuICAgIH1cblxuXG4gICAgZ2V0IGNlbnRlcigpXG4gICAge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy5feCArIHRoaXMuc2l6ZVggLyAyLFxuICAgICAgICAgICAgeTogdGhpcy5feSArIHRoaXMuc2l6ZVkgLyAyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKClcbiAgICB7XG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSAncmVkJztcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLnNpemVYLCB0aGlzLnNpemVZICk7XG5cbiAgICAgICAgaWYgKCB0aGlzLmltYWdlICYmIHRoaXMucmVhZHkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKCB0aGlzLl9pbWFnZSwgdGhpcy5feCwgdGhpcy5feSApO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IER5bmFtaWNBY3RvciBmcm9tICcuL2R5bmFtaWMtYWN0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBEeW5hbWljQWN0b3JcbntcbiAgICBjb25zdHJ1Y3Rvciggc2l6ZVgsIHNpemVZLCBpbWFnZSwgc3BlZWQsIG5hbWUsIGhwIClcbiAgICB7XG4gICAgICAgIHN1cGVyKCBzaXplWCwgc2l6ZVksIGltYWdlICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICAgICAgdGhpcy5faHAgPSBocDtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvciggJ0NhblxcJ3QgY2hhbmdlIG5hbWUsIG5hbWUgc2V0dGVyOicgKyB2YWx1ZSApO1xuICAgIH1cblxuICAgIGdldCBocCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfVxuXG4gICAgc2V0IGhwKCB2YWx1ZSApXG4gICAge1xuICAgICAgICBpZiAoIDAgPj0gdmFsdWUgJiYgdmFsdWUgPCAxMCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2hwID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyQ29sbGVjdGlvblxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSBbXTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXQgaXNFbXB0eSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sbGVjdGlvbi5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgYWRkKCBpdGVtIClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24ucHVzaCggaXRlbSApO1xuICAgIH1cblxuICAgIHJlbW92ZSggaXRlbSApXG4gICAge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2NvbGxlY3Rpb24uaW5kZXhPZiggaXRlbSApO1xuXG4gICAgICAgIGlmICggaW5kZXggPiAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb24uc3BsaWNlKCBpbmRleCwgMSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX2NvbGxlY3Rpb24gPSB0aGlzLl9jb2xsZWN0aW9uLmZpbHRlciggKCBpdGVtICkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmFjdGl2ZTtcbiAgICAgICAgfSApO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuICAgICAgICBmb3IgKCBsZXQgaT0wLCBsZW49dGhpcy5fY29sbGVjdGlvbi5sZW5ndGg7IGkgPCBsZW47IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbGxlY3Rpb25baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNBY3RvciBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHNpemVYLCBzaXplWSwgaW1hZ2U9bnVsbCwgc3BlZWQ9MjU2IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCBzaXplWCwgc2l6ZVksIGltYWdlICk7XG5cbiAgICAgICAgdGhpcy5fc3BlZWQgPSBzcGVlZDtcbiAgICB9XG5cbiAgICBnZXQgc3BlZWQoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWVkO1xuICAgIH1cblxuICAgIHNldCBzcGVlZCggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgdGhpcy5fc3BlZWQgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBjdHggfSBmcm9tICcuLi9jYW52YXMnO1xuaW1wb3J0IENoYXJhY3RlciBmcm9tICcuL2NoYXJhY3Rlcic7XG5pbXBvcnQgQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IFRlYXIgZnJvbSAnLi90ZWFyJztcbmltcG9ydCByZXBlYXQgZnJvbSAnLi4vdXRpbHMvc3RyaW5nL3JlcGVhdCc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVCxcbiAgICBLRVlfVVAsXG4gICAgS0VZX0RPV04sXG4gICAgS0VZX0xFRlQsXG4gICAgS0VZX1JJR0hULFxuICAgIEtFWV9TUEFDRSxcbiAgICBLRVlfVyxcbiAgICBLRVlfUyxcbiAgICBLRVlfQSxcbiAgICBLRVlfRFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IGltYWdlcyBmcm9tICcuLi9pbWFnZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJc2FhYyBleHRlbmRzIENoYXJhY3Rlclxue1xuICAgIGNvbnN0cnVjdG9yKClcbiAgICB7XG4gICAgICAgIHN1cGVyKCAyOCwgMzUsIGltYWdlcy5jaGFyYWN0ZXJzLmlzYWFjLCAyNTYsICdJc2FhYycsIDMgKTtcblxuICAgICAgICB0aGlzLl90aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5fbGFzdFNob290ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2tleXNEb3duID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl90ZWFycyA9IG5ldyBDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuX2F0dGFja1NwZWVkID0gMTAwMDsgLy8gMSBzaG9vdCAvIHNlY29uZFxuICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSB7eDogMCwgeTogMX07XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgKCBlICkgPT4gdGhpcy5fa2V5c0Rvd24uYWRkKCBlLmtleUNvZGUgKSApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5dXAnLCAoIGUgKSA9PiB0aGlzLl9rZXlzRG93bi5kZWxldGUoIGUua2V5Q29kZSApICk7XG4gICAgfVxuXG4gICAgZ2V0IHgoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3g7XG4gICAgfVxuXG4gICAgc2V0IHgoIHZhbHVlIClcbiAgICB7XG4gICAgICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3ggJiYgTElNSVRfTEVGVCA8IHZhbHVlICYmIHZhbHVlIDwgTElNSVRfUklHSFQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl94ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgeSgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICB9XG5cbiAgICBzZXQgeSggdmFsdWUgKVxuICAgIHtcbiAgICAgICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5feCAmJiBMSU1JVF9UT1AgPCB2YWx1ZSAmJiB2YWx1ZSA8IExJTUlUX0JPVFRPTSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZURpcmVjdGlvbigpXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLnNpemUgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlyZWN0aW9uID0ge307XG4gICAgICAgIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfVVAgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0RPV04gKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi55ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0xFRlQgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbi54ID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1JJR0hUICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkaXJlY3Rpb24ueCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIGRpcmVjdGlvbi54ICE9PSAwIHx8IGRpcmVjdGlvbi55ICE9PSAwIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICB1cGRhdGUoIHRpbWUsIG5vdyApXG4gICAge1xuICAgICAgICBjb25zdCBkZXBsYWNlbWVudCA9IHRoaXMuc3BlZWQgKiB0aW1lO1xuXG4gICAgICAgIGlmICggZGVwbGFjZW1lbnQgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLnNpemUgPT09IDAgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX1cgKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSBkZXBsYWNlbWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfUyApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgICggdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfQSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy54IC09IGRlcGxhY2VtZW50O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9EICkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnggKz0gZGVwbGFjZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZURpcmVjdGlvbigpO1xuXG4gICAgICAgIGlmICggKCB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9VUCApIHx8XG4gICAgICAgICAgICB0aGlzLl9rZXlzRG93bi5oYXMoIEtFWV9ET1dOICkgfHxcbiAgICAgICAgICAgIHRoaXMuX2tleXNEb3duLmhhcyggS0VZX0xFRlQgKSB8fFxuICAgICAgICAgICAgdGhpcy5fa2V5c0Rvd24uaGFzKCBLRVlfUklHSFQgKSApICYmICggIXRoaXMuX2xhc3RTaG9vdCB8fFxuICAgICAgICAgICAgKCBub3cgLSB0aGlzLl9sYXN0U2hvb3QgPj0gdGhpcy5fYXR0YWNrU3BlZWQgKSApIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fbGFzdFNob290ID0gbm93O1xuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmVzcGF3biggcm9vbSApXG4gICAge1xuICAgICAgICB0aGlzLnggPSByb29tLnNpemVYIC8gMjtcbiAgICAgICAgdGhpcy55ID0gcm9vbS5zaXplWSAvIDI7XG4gICAgfVxuXG4gICAgc2hvb3QoKVxuICAgIHtcbiAgICAgICAgdGhpcy5fdGVhcnMuYWRkKCBuZXcgVGVhciggdGhpcy5feCwgdGhpcy5feSwgdGhpcy5fZGlyZWN0aW9uICkgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKVxuICAgIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZGVsdGEgPSBub3cgLSB0aGlzLl90aGVuO1xuICAgICAgICB0aGlzLl90aGVuID0gbm93O1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCBkZWx0YSAvIDEwMDAsIG5vdyApO1xuICAgICAgICBzdXBlci5yZW5kZXIoKTtcblxuICAgICAgICB0aGlzLl90ZWFycy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy5fdGVhcnMucmVuZGVyKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2IoMjUwLCA1MCwgNTApJztcbiAgICAgICAgY3R4LmZvbnQgPSAnMjBweCBIZWx2ZXRpY2EnO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICAgIGN0eC5maWxsVGV4dCggcmVwZWF0KCAn4p2kICcsIHRoaXMuaHAgKSwgMzUsIDEzICk7XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvcic7XG5cbmltcG9ydCBpbWFnZXMgZnJvbSAnLi4vaW1hZ2VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vbSBleHRlbmRzIEFjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIGltYWdlPWltYWdlcy5yb29tcy5kZWZhdWx0IClcbiAgICB7XG4gICAgICAgIHN1cGVyKCA4MDAsIDQ4MCwgaW1hZ2UgKTtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgIH1cbn1cbiIsImltcG9ydCBEeW5hbWljQWN0b3IgZnJvbSAnLi9keW5hbWljLWFjdG9yJztcbmltcG9ydCB7IGN0eCB9IGZyb20gJy4uL2NhbnZhcyc7XG5pbXBvcnQge1xuICAgIExJTUlUX1RPUCxcbiAgICBMSU1JVF9CT1RUT00sXG4gICAgTElNSVRfTEVGVCxcbiAgICBMSU1JVF9SSUdIVFxufSBmcm9tICcuLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZWFyIGV4dGVuZHMgRHluYW1pY0FjdG9yXG57XG4gICAgY29uc3RydWN0b3IoIHgsIHksIGRpcmVjdGlvbiwgc3BlZWQ9NSApXG4gICAge1xuICAgICAgICBzdXBlciggMTUsIDE1ICk7XG5cbiAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy54VmVsb2NpdHkgPSBkaXJlY3Rpb24ueCAqIHNwZWVkO1xuICAgICAgICB0aGlzLnlWZWxvY2l0eSA9IGRpcmVjdGlvbi55ICogc3BlZWQ7XG5cbiAgICB9XG5cbiAgICBnZXQgaW5Cb3VuZHMoKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIExJTUlUX0xFRlQgLSB0aGlzLnNpemVYIDw9IHRoaXMuX3ggJiYgdGhpcy5feCA8PSBMSU1JVF9SSUdIVCArIHRoaXMuc2l6ZVggJiZcbiAgICAgICAgICAgIExJTUlUX1RPUCAtIHRoaXMuc2l6ZVkgPD0gdGhpcy5feSAmJiB0aGlzLl95IDw9IExJTUlUX0JPVFRPTSArIHRoaXMuc2l6ZVk7XG4gICAgfVxuXG4gICAgdXBkYXRlKClcbiAgICB7XG4gICAgICAgIHRoaXMuX3ggKz0gdGhpcy54VmVsb2NpdHk7XG4gICAgICAgIHRoaXMuX3kgKz0gdGhpcy55VmVsb2NpdHk7XG5cbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0aGlzLmFjdGl2ZSAmJiB0aGlzLmluQm91bmRzO1xuICAgIH1cblxuICAgIHJlbmRlcigpXG4gICAge1xuXG4vLyB2YXIgcmFkZ3JhZDQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoMiwxMCw1MCw1LDEyLDUpO1xuLy8gcmFkZ3JhZDQuYWRkQ29sb3JTdG9wKCAwLCAnIzAwQzlGRicgKTtcbi8vIHJhZGdyYWQ0LmFkZENvbG9yU3RvcCggMC44LCAnIzAwQjVFMicgKTtcbi8vIHJhZGdyYWQ0LmFkZENvbG9yU3RvcCggMSwgJ3JnYmEoMjI4LDE5OSwwLDApJyApO1xuLy9cbi8vIC8vIGRyYXcgc2hhcGVzXG4vLyBjdHguZmlsbFN0eWxlID0gcmFkZ3JhZDQ7XG4vLyBjdHguZmlsbFJlY3QoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuc2l6ZVgsIHRoaXMuc2l6ZVkgKTtcbiAgICB2YXIgZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoIHRoaXMuY2VudGVyLngsIHRoaXMuY2VudGVyLnksIDAsIHRoaXMuY2VudGVyLngsIHRoaXMuY2VudGVyLnksIHRoaXMuc2l6ZVggLyAyICk7XG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKCAwLCcjMDA5OUZGJyApO1xuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCggMSwnIzAwQUJFQicgKTtcbiAgICAvLyBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMuX3gsdGhpcy5feSwyMDAsMjAwKTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5lbGxpcHNlKCB0aGlzLmNlbnRlci54LCB0aGlzLmNlbnRlci55LCB0aGlzLnNpemVYIC8gMiwgdGhpcy5zaXplWCAvIDIsIDAsIDAsIE1hdGguUEkgKiAyICk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgY2FudmFzIH0gZnJvbSAnLi9jYW52YXMnO1xuXG5leHBvcnQgY29uc3QgTElNSVRfVE9QID0gNDA7XG5leHBvcnQgY29uc3QgTElNSVRfQk9UVE9NID0gY2FudmFzLmhlaWdodCAtIDEwMDtcbmV4cG9ydCBjb25zdCBMSU1JVF9MRUZUID0gNTU7XG5leHBvcnQgY29uc3QgTElNSVRfUklHSFQgPSBjYW52YXMud2lkdGggLSA4NTtcbmV4cG9ydCBjb25zdCBLRVlfVVAgPSAzODtcbmV4cG9ydCBjb25zdCBLRVlfRE9XTiA9IDQwO1xuZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG5leHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG5leHBvcnQgY29uc3QgS0VZX1NQQUNFID0gMzI7XG5leHBvcnQgY29uc3QgS0VZX1cgPSA4NztcbmV4cG9ydCBjb25zdCBLRVlfQSA9IDY1O1xuZXhwb3J0IGNvbnN0IEtFWV9TID0gODM7XG5leHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbiIsIi8vIHByZWxvYWQgYWxsIGltYWdlcyBmb3Igbm93LlxuXG5jb25zdCBpbWFnZXMgPVxue1xuICAgIHJvb21zOlxuICAgIHtcbiAgICAgICAgZGVmYXVsdDogJ2J1aWxkL2ltZy9yb29tLnBuZydcbiAgICB9LFxuICAgIGNoYXJhY3RlcnM6XG4gICAge1xuICAgICAgICBpc2FhYzogJ2J1aWxkL2ltZy9pc2FhYy5wbmcnXG4gICAgfSxcbiAgICBpdGVtczpcbiAgICB7XG4gICAgfSxcbiAgICBtb25zdGVyczpcbiAgICB7XG4gICAgfSxcbiAgICBvYnN0YWNsZXM6XG4gICAge1xuICAgICAgICBwb29wOiAnJyxcbiAgICAgICAgcmVkUG9vcDogJ2J1aWxkL2ltZy9yZWRfcG9vcC5wbmcnXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaW1hZ2VzO1xuIiwiZXhwb3J0IGRlZmF1bHQgKCBzdHIsIHRpbWVzICkgPT5cbntcbiAgICBsZXQgX3N0ciA9ICcnO1xuICAgIHdoaWxlICggdGltZXMtLSApXG4gICAge1xuICAgICAgICBfc3RyICs9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIF9zdHI7XG59O1xuIl19
