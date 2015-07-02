import { canvas, ctx } from 'canvas';
import Store from 'store';
import Character from 'components/character';
import Tear from 'components/tear';
import repeat from 'utils/string/repeat';
import isColliding from 'utils/physics/is-colliding';
import {
    LIMIT_TOP_ISAAC,
    LIMIT_BOTTOM_ISAAC,
    LIMIT_LEFT_ISAAC,
    LIMIT_RIGHT_ISAAC,
    KEY_UP,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_W,
    KEY_S,
    KEY_A,
    KEY_D
} from '../constants';
import { isaac } from 'images/characters';

export default class Isaac extends Character
{
    constructor()
    {
        super( { width: 28, height: 35, speed: 200, name: 'Isaac', hp: 3, image:
        {
            type: 'sprite',
            src: isaac.sprite
        } } );

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = Store.get( 'tears' );
        this._attackSpeed = 500; // 1 shoot / second
        this.damages = 1;
        this._direction = {x: 0, y: 1};
        this.collidingWidth = this.width - 2;
        this.collidingHeight = this.height - 10;
        document.addEventListener( 'keydown', ( e ) => this._keysDown.add( e.keyCode ) );
        document.addEventListener( 'keyup', ( e ) => this._keysDown.delete( e.keyCode ) );

        this._dmgInterval = 500;
        this._lastDmg = Date.now();

        this.respawn();
    }

    get x()
    {
        return this._x;
    }

    set x( value )
    {
        if ( value !== this._x &&
            LIMIT_LEFT_ISAAC < value && value < LIMIT_RIGHT_ISAAC )
        {
            const oldX = this._x;
            this._x = value;
            const collider = isColliding( this, Store.get( 'monsters' ) );

            if ( !collider && !isColliding( this, Store.get( 'obstacles' ) ) )
            {
                this._x = value;
            }
            else
            {
                this._x = oldX;

                const now = Date.now();
                if ( collider && now - this._lastDmg > this._dmgInterval )
                {
                    this.hp -= collider.damages || 1;
                    this._lastDmg = now;
                }
            }
        }
    }

    get y()
    {
        return this._y;
    }

    set y( value )
    {
        if ( value !== this._y &&
            LIMIT_TOP_ISAAC < value && value < LIMIT_BOTTOM_ISAAC )
        {
            const oldY = this._y;
            this._y = value;

            const collider = isColliding( this, Store.get( 'monsters' ) );

            if ( !collider && !isColliding( this, Store.get( 'obstacles' ) ) )
            {
                this._y = value;
            }
            else
            {
                const now = Date.now();
                this._y = oldY;

                if ( collider && now - this._lastDmg > this._dmgInterval )
                {
                    this.hp -= collider.damages || 1;
                    this._lastDmg = now;
                }
            }
        }
    }

    update( time, now )
    {
        const deplacement = this.speed * time;
        const keysDown = this._keysDown;

        if ( deplacement === 0 )
        {
            return false;
        }

        if ( keysDown.size === 0 )
        {
            return false;
        }

         // diagonal distance should be +-Math.sqrt( deplacement / 2 )... but it feels so slow.

        if ( keysDown.has( KEY_W ) &&
            !( keysDown.has( KEY_A ) || keysDown.has( KEY_D ) ) ) // vertical
        {
            this.y -= deplacement;
        }
        else if ( keysDown.has( KEY_W ) ) // diagonal
        {
            this.y -= Math.sqrt( Math.pow( deplacement, 2 ) / 2 );
        }
        else if ( keysDown.has( KEY_S ) &&
            !( keysDown.has( KEY_A ) || keysDown.has( KEY_D ) ) ) //vertical
        {
            this.y += deplacement;
        }
        else if ( keysDown.has( KEY_S ) ) // diagonal
        {
            this.y += Math.sqrt( Math.pow( deplacement, 2 ) / 2 );
        }

        if ( keysDown.has( KEY_A ) &&
            !( keysDown.has( KEY_W ) || keysDown.has( KEY_S ) ) ) // horizontal
        {
            this.x -= deplacement;
        }
        else if ( keysDown.has( KEY_A ) ) // diagonal
        {
            this.x -= Math.sqrt( Math.pow( deplacement, 2 ) / 2 );
        }
        else if ( keysDown.has( KEY_D ) &&
            !( keysDown.has( KEY_W ) || keysDown.has( KEY_S ) ) ) // horizontal
        {
            this.x += deplacement;
        }
        else if ( keysDown.has( KEY_D ) ) // diagonal
        {
            this.x += Math.sqrt( Math.pow( deplacement, 2 ) / 2 );
        }

        this.updateDirection( now );
    }


    updateDirection( now )
    {
        const keysDown = this._keysDown;

        let direction = {};
        if ( keysDown.has( KEY_UP ) )
        {
            direction.y = -1;
        }
        else if ( keysDown.has( KEY_DOWN ) )
        {
            direction.y = 1;
        }
        else
        {
            direction.y = 0;
        }

        if  ( keysDown.has( KEY_LEFT ) )
        {
            direction.x = -1;
        }
        else if ( keysDown.has( KEY_RIGHT ) )
        {
            direction.x = 1;
        }
        else
        {
            direction.x = 0;
        }

        if ( direction.x !== 0 || direction.y !== 0 )
        {
            this._direction = direction;
        }


        if ( ( keysDown.has( KEY_UP ) ||
            keysDown.has( KEY_DOWN ) ||
            keysDown.has( KEY_LEFT ) ||
            keysDown.has( KEY_RIGHT ) ) && ( !this._lastShoot ||
            ( now - this._lastShoot >= this._attackSpeed ) ) )
        {
            this._lastShoot = now;
            this.shoot();
        }
    }

    respawn()
    {
        this._x = canvas.width / 2;
        this._y = canvas.height / 2;
    }

    shoot()
    {
        let x;
        let y;

        switch ( this._direction.x )
        {
            case -1:
                x = this._x;
                y = this._y + 2;
                break;
            case 0:
                x = this._x + 8;

                switch ( this._direction.y )
                {
                    case -1:
                        y = this._y - 2;
                        break;
                    case 1:
                        y = this._y + 6;
                        break;
                }

                break;
            case 1:
                x = this._x + 15;
                y = this._y + 2;
                break;
        }

        this._tears.push( new Tear( { x: x, y: y, direction: this._direction, creator: this, damages: this.damages } ) );
    }

    renderSprite()
    {
        const isShooting = this._isShooting;
        const now = Date.now();
        const direction = this._direction;
        let head;
        let x;
        let y;

        if ( isShooting || ( !isShooting && now - this._lastShoot <= this._attackSpeed / 2 ) )
        {
            head = isaac.head.shootingDirections;
        }
        else
        {
            head = isaac.head.directions;
        }

        switch ( direction.x )
        {
            case -1:
                x = head.left[0];
                y = head.left[1];
                break;
            case 1:
                x = head.right[0];
                y = head.right[1];
                break;
        }

        switch ( direction.y )
        {
            case -1:
                x = head.up[0];
                y = head.up[1];
                break;
            case 1:
                x = head.down[0];
                y = head.down[1];
                break;
        }

        // leags
        ctx.drawImage( this._image, 0, 25, 18, 14, this._x + 5, this._y + 20, 18, 14 );
        // head
        ctx.drawImage( this._image, x, y,
            isaac.head.width,
            isaac.head.height,
            this._x, this._y,
            isaac.head.width,
            isaac.head.height );
    }

    render()
    {
        const now = Date.now();
        const delta = now - this._then;
        this._then = now;

        this.update( delta / 1000, now );
        super.render();

        ctx.fillStyle = 'rgb(250, 50, 50)';
        ctx.font = '20px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText( repeat( '❤ ', this.hp ), 35, 13 );

    }
}
