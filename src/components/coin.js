import Collectible from 'components/collectible';
import { ctx } from 'canvas';
import { coins } from 'images/items';

export default class Coin extends Collectible
{
    constructor({ x, y })
    {
        super({ x, y, width: coins.width, height: coins.height, image:
        {
            type: 'sprite',
            src: coins.sprite,
        }, });

        const rand = Math.random();
        this._state = Math.round((Math.random() * coins.states));
        this._states = coins.states;
        this._interval = 100; // ms
        this._then = Date.now();

        if (0.1 < rand)
        {
            this.quantity = 1;
            this._name = 'default';
        }
        else if (0.05 < rand)
        {
            this.quantity = 5;
            this._name = 'nickel';
        }
        else if (0.02 < rand)
        {
            this.quantity = 10;
            this._name = 'dime';
        }
        else if (0.005 < rand)
        {
            this.quantity = 25;
            this._name = 'quarter';
        }

        // no sprite for the big moneyz yet.
        this.quantity = 1;
    }

    renderSprite()
    {
        // const [ x, y ] = coins[this._name].position || [0, 0, ];
        // ctx.drawImage( this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height );

        const now = Date.now();
        if (now - this._then > this._interval)
        {
            this._state = (this._state + 1) % this._states;
            this._then = now;
        }

        const x = this.width * this._state;
        const y = 0;

        ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
    }

    toItem()
    {
        return {
            type: 'coin',
            quantity: this.quantity,
        };
    }
}
