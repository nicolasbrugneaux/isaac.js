import DynamicActor from 'components/dynamic-actor';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT
} from '../constants';
import { defaultTear } from 'images/tears';
import { foreground } from 'layers';
import { isColliding } from 'utils/physics/collisions';

export default class Tear extends DynamicActor
{
    constructor( { x, y, direction, speed, creator, damages } )
    {
        super( { width: 13, height: 13, image: { type: 'image', src: defaultTear, }, } );

        this._x = x;
        this._y = y;
        this.active = true;
        this._speed = speed || 4;
        this._creator = creator;
        this.damages = damages;

        this.xVelocity = direction.x * this._speed;
        this.yVelocity = direction.y * this._speed;

    }

    get inBounds()
    {
        if ( LIMIT_LEFT - this.width > this._x || this._x > LIMIT_RIGHT + this.width ||
            LIMIT_TOP - this.height > this._y || this._y > LIMIT_BOTTOM + this.height )
        {
            return false;
        }

        const collider = isColliding( this, foreground.filter( item => item !== this._creator ) );
        if ( collider )
        {
            if ( 'number' === typeof collider.hp )
            {

                collider.hp -= this.damages;
            }

            return false;
        }

        return true;
    }

    update()
    {
        this._x += this.xVelocity;
        this._y += this.yVelocity;

        this.active = this.active && this.inBounds;
    }
}
