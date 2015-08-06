import Collectible from 'components/collectible';
import DynamicActor from 'components/dynamic-actor';
import { ctx } from 'canvas';
import { bombs } from 'images/items';
import getColliders from 'utils/physics/collisions';
import Store from 'store';

class BombActor extends DynamicActor
{
    constructor( { x, y } )
    {
        super( { x, y, width: bombs.width, height: bombs.height, image:
        {
            type: 'sprite',
            src: bombs.sprite,
        }, } );

        this.damages = 1.0;
        this.active = false;
        this.isExploding = false;
        this._interval = 60; // time between frames of explosion
        this._then = Date.now();
        this._state = 0;
    }

    drop()
    {
        this.active = true;
        setTimeout( ::this.renderExplosion, 4000 ); // 4 seconds after

        Store.get( 'tears' ).push( this );
    }

    renderExplosion()
    {
        this.width = bombs.explosion.width;
        this.height = bombs.explosion.height;
        this.setImage( bombs.explosion.sprite, 'sprite' );
        this.isExploding = true;

        // DESTROY ALL THE THINGS NOW
    }

    renderSprite()
    {
        let x, y;
        let _x, _y;
        const now = Date.now();

        if ( this.isExploding )
        {
            [x, y] = [this._state * this.width, 0, ];
            [_x, _y] = [this._x - bombs.width, this._y - bombs.height * 2, ];

            if ( now - this._then > this._interval )
            {
                this._state += 1;
                this._then = now;

                if ( this._state === bombs.explosion.states )
                {
                    this.active = false;
                }
            }
        }
        else if ( !this.isExploding )
        {
            [ x, y ] = bombs.default.position;
            [_x, _y] = [this._x, this._y, ];
        }


        ctx.drawImage( this._image, x, y, this.width, this.height, _x, _y, this.width, this.height );
    }
}

export default class Bomb extends Collectible
{
    constructor( { x, y } )
    {
        super( { x, y, width: bombs.width, height: bombs.height, image:
        {
            type: 'sprite',
            src: bombs.sprite,
        }, } );

        this.quantity = 0.2 > Math.random() ? 2 : 1;
    }

    renderSprite()
    {
        const bombName = 1 === this.quantity ? 'default' : 'double';
        const [ x, y ] = bombs[bombName].position || [0, 0, ];

        ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );
    }

    toItem()
    {
        return {
            type: 'bomb',
            quantity: this.quantity,
            isDroppable: true,
        };
    }

    toDroppable()
    {
        return BombActor; // return the class so the wearer can do new on it.
    }
}
