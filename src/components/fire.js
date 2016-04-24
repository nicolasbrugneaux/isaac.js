import DestructibleStaticActor from 'components/destructible-static-actor';
import { ctx } from 'canvas';
import { fire, fireBase } from 'images/obstacles';

export default class Fire extends DestructibleStaticActor
{
    constructor({ x, y })
    {
        super({ x, y, width: fire.width, height: fire.height, hp: 3, image:
        {
            type: 'sprite',
            src: fire.sprite,
        }, });

        this._state = Math.round((Math.random() * fire.states));
        this._states = fire.states;
        this._interval = 100; // ms
        this._then = Date.now();
        this.damages = 0.5;
    }

    get inactiveLayer()
    {
        return 'backgroundObstacles';
    }

    renderSprite()
    {
        const [ woodX, woodY ] = this.active ? fireBase.position : fireBase.deadPosition;
        ctx.drawImage(this._image, woodX, woodY, this.width, this.height, this._x, this._y + 17, this.width, this.height);

        if (!this.active)
        {
            this.damages = 0;
            return;
        }

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
}
