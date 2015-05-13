import { ctx } from '../canvas';
import Character from './character';
import Collection from './collection';
import Tear from './tear';
import repeat from '../utils/string/repeat';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT,
    KEY_UP,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT,
    KEY_SPACE,
    KEY_W,
    KEY_S,
    KEY_A,
    KEY_D
} from '../constants';
import images from '../images';

export default class Isaac extends Character
{
    constructor()
    {
        super( 28, 35, images.characters.isaac, 256, 'Isaac', 3 );

        this._then = Date.now();
        this._lastShoot = false;
        this._keysDown = new Set();
        this._tears = new Collection();
        this._attackSpeed = 1000; // 1 shoot / second
        this._direction = {x: 0, y: 1};
        document.addEventListener( 'keydown', ( e ) => this._keysDown.add( e.keyCode ) );
        document.addEventListener( 'keyup', ( e ) => this._keysDown.delete( e.keyCode ) );
    }

    get x()
    {
        return this._x;
    }

    set x( value )
    {
        if ( value !== this._x && LIMIT_LEFT < value && value < LIMIT_RIGHT )
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
        if ( value !== this._x && LIMIT_TOP < value && value < LIMIT_BOTTOM )
        {
            this._y = value;
        }
    }

    updateDirection()
    {
        if ( this._keysDown.size === 0 )
        {
            return;
        }

        let direction = {};
        if ( this._keysDown.has( KEY_UP ) )
        {
            direction.y = -1;
        }
        else if ( this._keysDown.has( KEY_DOWN ) )
        {
            direction.y = 1;
        }
        else
        {
            direction.y = 0;
        }

        if  ( this._keysDown.has( KEY_LEFT ) )
        {
            direction.x = -1;
        }
        else if ( this._keysDown.has( KEY_RIGHT ) )
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

    }

    update( time, now )
    {
        const deplacement = this.speed * time;

        if ( deplacement === 0 )
        {
            return false;
        }

        if ( this._keysDown.size === 0 )
        {
            return false;
        }

        if ( this._keysDown.has( KEY_W ) )
        {
            this.y -= deplacement;
        }
        else if ( this._keysDown.has( KEY_S ) )
        {
            this.y += deplacement;
        }

        if  ( this._keysDown.has( KEY_A ) )
        {
            this.x -= deplacement;
        }
        else if ( this._keysDown.has( KEY_D ) )
        {
            this.x += deplacement;
        }

        this.updateDirection();

        if ( ( this._keysDown.has( KEY_UP ) ||
            this._keysDown.has( KEY_DOWN ) ||
            this._keysDown.has( KEY_LEFT ) ||
            this._keysDown.has( KEY_RIGHT ) ) && ( !this._lastShoot ||
            ( now - this._lastShoot >= this._attackSpeed ) ) )
        {
            this._lastShoot = now;
            this.shoot();
        }

        return true;
    }

    respawn( room )
    {
        this.x = room.sizeX / 2;
        this.y = room.sizeY / 2;
    }

    shoot()
    {
        this._tears.add( new Tear( this._x, this._y, this._direction ) );
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
