import Character from 'components/character';
import { ctx } from 'canvas';
import { flies } from 'images/monsters';
import Store from 'store';
import { foreground } from 'layers';
import { isColliding } from 'utils/physics/collisions';

export default class Fly extends Character
{
    constructor({ x, y, name='stationary' })
    {
        super({ x, y, width: flies.width, height: flies.height, hp: 2, speed: 1.5, image:
        {
            type: 'sprite',
            src: flies.sprite,
        }, });

        this._name = name;
        this._state = Math.round((Math.random() * flies[this._name].states));
        this._states = flies[this._name].states;
        this._interval = 50; // ms
        this._then = Date.now();
        this._dmgInterval = 500;
        this.damages = 0.5;
        this.type = 'fly';
    }

    updatePosition()
    {
        const { x, y } = Store.get('player');

        switch (this._name)
        {
            default:
            case 'circling':
            case 'poopOrbital':
            case 'stationary':
                return;

            case 'homing': {
                const dx = x - this.x;
                const dy = y - this.y;
                const deplacement = Math.sqrt((dx * dx) + (dy * dy));

                const speedX = this.speed * (dx / deplacement);
                const speedY = this.speed * (dy / deplacement);

                this.x += speedX;
                this.y += speedY;

                const noFlies = foreground
                    .map(item =>
                    {
                        if (item === Store.get('monsters'))
                        {
                            return item.filter(i => !(i instanceof Fly));
                        }
                        return item;
                    })
                    .filter(item => item !== Store.get('obstacles'));

                const collider = isColliding(this, noFlies);
                if (collider)
                {
                    this.x -= speedX;
                    this.y -= speedY;

                    if (collider.canTakeDamage &&
                        collider.canTakeDamage({ update: true, }))
                    {
                        collider.hp -= this.damages;
                    }
                }

                break;
            }
        }
    }

    die()
    {
        this._name = 'dying';
        this._state = 0;
        this.damages = 0;
        this._states = flies[this._name].states;
        this.width = flies[this._name].width;
        this.height = flies[this._name].height;
        this._interval = 75;

        Store.set('monsters', Store.get('monsters')
            .filter(monster => this !== monster));
    }

    renderSprite()
    {
        const isDying = 'dying' === this._name;

        if (!isDying)
        {
            this.updatePosition();
        }
        else if (this._state === this._states - 1)
        {
            this.active = false;
            return;
        }

        const coords = flies[this._name].position || [ 0, 0, ];
        let x = coords[0];
        const y = coords[1];

        const now = Date.now();
        if (now - this._then > this._interval)
        {
            if (isDying)
            {
                this._state = this._state + 1;
            }
            else
            {
                this._state = (this._state + 1) % this._states;
            }
            this._then = now;
        }

        x += this.width * this._state;
        ctx.drawImage(this._image, x, y, this.width, this.height, this._x, this._y, this.width, this.height);
    }
}
