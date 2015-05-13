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

// var radgrad4 = ctx.createRadialGradient(2,10,50,5,12,5);
// radgrad4.addColorStop( 0, '#00C9FF' );
// radgrad4.addColorStop( 0.8, '#00B5E2' );
// radgrad4.addColorStop( 1, 'rgba(228,199,0,0)' );
//
// // draw shapes
// ctx.fillStyle = radgrad4;
// ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );
    var gradient = ctx.createRadialGradient( this.center.x, this.center.y, 0, this.center.x, this.center.y, this.sizeX / 2 );
    gradient.addColorStop( 0,'#0099FF' );
    gradient.addColorStop( 1,'#00ABEB' );
    // ctx.fillStyle = gradient;
    // ctx.fillRect(this._x,this._y,200,200);

        ctx.beginPath();
        ctx.ellipse( this.center.x, this.center.y, this.sizeX / 2, this.sizeX / 2, 0, 0, Math.PI * 2 );
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.fill();
    }
}
