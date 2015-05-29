import StaticActor from './static-actor';
import { ctx } from '../canvas';
import { rocks } from '../images/obstacles';

export default class Rock extends StaticActor
{
    constructor( { x, y } )
    {
        super( { x, y, width: 50, height: 51, image:
        {
            type: 'sprite',
            src: rocks.sprite
        } } );

        this._isSpecial = Math.random() < 0.05;
    }

    renderSprite()
    {
        const x = this._isSpecial ? 170 : 0;
        const y = 0;

        ctx.drawImage( this._image, x, y, 170, 172, this._x, this._y, this.width, this.height );
    }
}
