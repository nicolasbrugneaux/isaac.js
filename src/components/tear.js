import DynamicActor from './dynamic-actor';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT
} from '../constants';
import { defaultTear } from '../images/tears';

export default class Tear extends DynamicActor
{
    constructor( { x, y, direction, speed } )
    {
        super( { width: 13, height: 13, image: { type: 'image', src: defaultTear } } );

        this._x = x;
        this._y = y;
        this.active = true;
        this._speed = speed || 4;

        this.xVelocity = direction.x * this._speed;
        this.yVelocity = direction.y * this._speed;

    }

    get inBounds()
    {
        return LIMIT_LEFT - this.width <= this._x && this._x <= LIMIT_RIGHT + this.width &&
            LIMIT_TOP - this.height <= this._y && this._y <= LIMIT_BOTTOM + this.height;
    }

    update()
    {
        this._x += this.xVelocity;
        this._y += this.yVelocity;

        this.active = this.active && this.inBounds;
    }

    render()
    {

        if ( LIMIT_LEFT - this.width === this._x || this._x === LIMIT_RIGHT + this.width ||
            LIMIT_TOP - this.height === this._y && this._y === LIMIT_BOTTOM + this.height )
        {
            // explode
        }
        else
        {
            super.render();
        }
    }
}
