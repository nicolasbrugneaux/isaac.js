import DynamicActor from './dynamic-actor';
import { ctx } from '../canvas';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT
} from '../constants';

export default class Tear extends DynamicActor
{
    constructor( x, y, direction, speed=5 )
    {
        super( 15, 15 );

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
        const x = Math.round( this.center.x );
        const y = Math.round( this.center.y );

        const colour = ctx.createRadialGradient( x, y, 0, x, y, this.sizeX / 2 );
        colour.addColorStop( 0,'#0099FF' );
        colour.addColorStop( 1,'#00ABEB' );

        ctx.beginPath();
        ctx.ellipse( x, y, this.sizeX / 2, this.sizeX / 2, 0, 0, Math.PI * 2 );
        ctx.closePath();

        ctx.fillStyle = colour;
        ctx.fill();
    }
}
