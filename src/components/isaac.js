import { ctx } from '../canvas';
import Character from './character';
import repeat from '../utils/string/repeat';
import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT,
    KEY_UP,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT
} from '../constants';
import images from '../images';

export default class Isaac extends Character
{
    constructor()
    {
        super( 28, 35, images.characters.isaac, 256, 'Isaac', 3 );

        this._then = Date.now();
        this._keysDown = new Set();
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

    move( time )
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

        if ( this._keysDown.has( KEY_UP ) ) // UP
        {
            this.y -= deplacement;
        }
        else if ( this._keysDown.has( KEY_DOWN ) ) // DOWN
        {
            this.y += deplacement;
        }

        if  ( this._keysDown.has( KEY_LEFT ) ) // LEFT
        {
            this.x -= deplacement;
        }
        else if ( this._keysDown.has( KEY_RIGHT ) ) // RIGHT
        {
            this.x += deplacement;
        }

        return true;
    }

    respawn( room )
    {
        this.x = room.sizeX / 2;
        this.y = room.sizeY / 2;
    }

    render()
    {
        const now = Date.now();
        const delta = now - this._then;
        this._then = now;
        this.move( delta / 1000 );

        // if ( this.move( delta / 1000 ) )
        // {
            super.render();

            ctx.fillStyle = 'rgb(250, 50, 50)';
            ctx.font = '20px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText( repeat( '❤ ', this.hp ), 35, 13 );
        // }

    }
}
