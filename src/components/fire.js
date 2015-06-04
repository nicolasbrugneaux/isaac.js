import StaticActor from './static-actor';
import { ctx } from '../canvas';
import { fire } from '../images/obstacles';

export default class Fire extends StaticActor
{
    constructor( { x, y } )
    {
        super( { x, y, width: fire.width, height: fire.height, image:
        {
            type: 'sprite',
            src: fire.sprite
        } } );

        this._state = 0;
        this._states = fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
    }

    renderSprite()
    {
        const now = Date.now();
        if ( now - this._then > this._interval )
        {
            this._state = ( this._state + 1 ) % this._states;
            this._then = now;
        }

        const x = this.width * this._state;
        const y = 0;

        ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );
    }
}
