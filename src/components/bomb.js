import Collectible from 'components/collectible';
import { ctx } from 'canvas';
import { bombs } from 'images/items';

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
    };

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
        };
    }
}
