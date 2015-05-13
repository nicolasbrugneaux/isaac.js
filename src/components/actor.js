import { ctx } from '../canvas';

export default class Actor
{
    constructor( sizeX, sizeY, image=null )
    {
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.image = image;
        this._x = null;
        this._y = null;

        if ( this.image )
        {
            this.ready = false;
            this._image = new Image();
            this._image.onload = () => this.ready = true;
            this._image.src = this.image;
        }
        else
        {
            this.ready = true;
        }
    }

    get x()
    {
        return this._x;
    }

    set x( value )
    {
        this._x = value;
    }

    get y()
    {
        return this._x;
    }

    set y( value )
    {
        this._y = value;
    }


    get center()
    {
        return {
            x: this._x + this.sizeX / 2,
            y: this._y + this.sizeY / 2
        };
    }

    render()
    {
        // ctx.fillStyle = 'red';
        // ctx.fillRect( this._x, this._y, this.sizeX, this.sizeY );

        if ( this.image && this.ready )
        {
            ctx.drawImage( this._image, this._x, this._y );
        }
    }
}
