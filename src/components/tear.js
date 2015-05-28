import DynamicActor from './dynamic-actor';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT
} from '../constants';
import images from '../images';

export default class Tear extends DynamicActor
{
    constructor( x, y, direction, speed=3 )
    {
        super( 13, 13, images.tears.default );

        this._x = x;
        this._y = y;
        this.active = true;

        this.xVelocity = direction.x * speed;
        this.yVelocity = direction.y * speed;

    }

    get inBounds()
    {
        return LIMIT_LEFT - this.sizeX <= this._x && this._x <= LIMIT_RIGHT + this.sizeX &&
            LIMIT_TOP - this.sizeY <= this._y && this._y <= LIMIT_BOTTOM + this.sizeY;
    }

    update()
    {
        this._x += this.xVelocity;
        this._y += this.yVelocity;

        this.active = this.active && this.inBounds;
    }

    render()
    {

        if ( LIMIT_LEFT - this.sizeX === this._x || this._x === LIMIT_RIGHT + this.sizeX ||
            LIMIT_TOP - this.sizeY === this._y && this._y === LIMIT_BOTTOM + this.sizeY )
        {
            // explode
        }
        else
        {
            super.render();
        }
    }
}
