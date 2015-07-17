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

        this.damages = 1.5;
        this.active = false;
    }

    drop()
    {
        this.active = true;
        setTimeout( () => this.renderExplosion(), 4000 ); // 4 seconds after

        Store.get( 'tears' ).push( this );
    }

    renderExplosion()
    {
        setTimeout( () => this.active = false, 1000 ); // 4 seconds after
        this.width = 50;
        this.height = 50;
    }

    renderSprite()
    {
        const [ x, y ] = bombs.default.position;

        ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );
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
