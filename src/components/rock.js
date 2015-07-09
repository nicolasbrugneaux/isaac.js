import StaticActor from 'components/static-actor';
import { ctx } from 'canvas';
import { rocks } from 'images/obstacles';

export default class Rock extends StaticActor
{
    constructor( { x, y } )
    {
        super( { x, y, width: 50, height: 51, image:
        {
            type: 'sprite',
            src: rocks.sprite,
        }, } );

        this._isSpecial = 0.05 > Math.random();
    }

    renderSprite()
    {
        const [ x, y ] = this._isSpecial ? rocks.special.position : rocks.default.position;

        ctx.drawImage( this._image, x, y, rocks.width, rocks.height, this._x, this._y, this.width, this.height );
    }
}
