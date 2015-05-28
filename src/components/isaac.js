import { ctx } from '../canvas';
import Character from './character';
import Collection from './collection';
import Tear from './tear';
import repeat from '../utils/string/repeat';
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
import images from '../images';

const isaacImg = images.characters.isaac;
const sprite = new Image();
sprite.src = isaacImg.sprite;


export default class Isaac extends Character
{
    constructor()
    {
        super( 28, 35, null, 200, 'Isaac', 3 );

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new Collection();
        this._attackSpeed = 500; // 1 shoot / second
        this._direction = {x: 0, y: 1};
        this.updateImage( this._direction );
        document.addEventListener( 'keydown', ( e ) => this._keysDown.add( e.keyCode ) );
        document.addEventListener( 'keyup', ( e ) => this._keysDown.delete( e.keyCode ) );
    }

    get x()
    {
        return this._x;
    }

    set x( value )
    {
        if ( value !== this._x && LIMIT_LEFT_ISAAC < value && value < LIMIT_RIGHT_ISAAC )
        {
            this._x = value;
        }
    }

    get y()
    {
        return this._y;
    }

    set y( value )
    {
        if ( value !== this._x && LIMIT_TOP_ISAAC < value && value < LIMIT_BOTTOM_ISAAC )
        {
            this._y = value;
        }
    }

    update( time, now )
    {
        const deplacement = this.speed * time;
        const keysDown = this._keysDown;

        this.updateImage( false, now );

        if ( deplacement === 0 )
        {
            return false;
        }

        if ( keysDown.size === 0 )
        {
            return false;
        }

        if ( keysDown.has( KEY_W ) &&
            !( keysDown.has( KEY_A ) || keysDown.has( KEY_D ) ) ) // vertical
        {
            this.y -= deplacement;
        }
        else if ( keysDown.has( KEY_W ) ) // diagonal
        {
            this.y -= Math.sqrt( deplacement );
        }
        else if ( keysDown.has( KEY_S ) &&
            !( keysDown.has( KEY_A ) || keysDown.has( KEY_D ) ) ) //vertical
        {
            this.y += deplacement;
        }
        else if ( keysDown.has( KEY_S ) ) // diagonal
        {
            this.y += Math.sqrt( deplacement );
        }

        if ( keysDown.has( KEY_A ) &&
            !( keysDown.has( KEY_W ) || keysDown.has( KEY_S ) ) )
        {
            this.x -= deplacement;
        }
        else if ( keysDown.has( KEY_A ) )
        {
            this.x -= Math.sqrt( deplacement );
        }
        else if ( keysDown.has( KEY_D ) &&
            !( keysDown.has( KEY_W ) || keysDown.has( KEY_S ) ) )
        {
            this.x += deplacement;
        }
        else if ( keysDown.has( KEY_D ) )
        {
            this.x += Math.sqrt( deplacement );
        }

        this.updateDirection( now );

        return true;
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
            this.updateImage( true, now );
            this.shoot();
        }
    }

    updateImage( isShooting, now )
    {
        let head;

        if ( isShooting || ( !isShooting && now - this._lastShoot <= this._attackSpeed / 2 ) )
        {
            head = isaacImg.head.shootingDirections;
        }
        else
        {
            head = isaacImg.head.directions;
        }

        const direction = this._direction;
        let x;
        let y;

        switch ( direction.x )
        {
            case -1:
                // console.log( 'left' );
                x = head.left[0];
                y = head.left[1];
                break;
            case 1:
                // console.log( 'right' );
                x = head.right[0];
                y = head.right[1];
                break;
        }

        switch ( direction.y )
        {
            case -1:
                // console.log( 'up' );
                x = head.up[0];
                y = head.up[1];
                break;
            case 1:
                // console.log( 'down' );
                x = head.down[0];
                y = head.down[1];
                break;
        }

        // leags
        ctx.drawImage( sprite, 0, 25, 18, 14, this._x + 5, this._y + 20, 18, 14 );
        // head
        ctx.drawImage( sprite, x, y,
            isaacImg.head.width,
            isaacImg.head.height,
            this._x, this._y,
            isaacImg.head.width,
            isaacImg.head.height );
    }

    respawn( room )
    {
        this.x = room.sizeX / 2;
        this.y = room.sizeY / 2;
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

        this._tears.add( new Tear( x, y, this._direction ) );
    }

    render()
    {
        const now = Date.now();
        const delta = now - this._then;
        this._then = now;

        this.update( delta / 1000, now );
        super.render();

        this._tears.update();
        this._tears.render();

        ctx.fillStyle = 'rgb(250, 50, 50)';
        ctx.font = '20px Helvetica';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText( repeat( '❤ ', this.hp ), 35, 13 );

    }
}
