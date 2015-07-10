import { ctx } from '../canvas';

export default class Actor
{
    constructor( { x=null, y=null, width, height, image } )
    {
        this.width = width;
        this.height = height;
        this.image = image || null;
        this._x = x;
        this._y = y;

        if ( this.image )
        {
            this.ready = false;
            this._image = new Image();
            this._image.onload = () => this.ready = true;
            this._image.src = this.image.src;
        }
        else
        {
            this.ready = true;
        }
    }

    setImage( image, type='image' )
    {
        if ( 'canvas' === type )
        {
            this.image = true;
            this._image = image;
        }
        else if ( image !== this.image )
        {
            this.image = image;
            this.ready = false;
            this._image = new Image();
            this._image.onload = () => this.ready = true;
            this._image.src = this.image;
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
        return this._y;
    }

    set y( value )
    {
        this._y = value;
    }


    get center()
    {
        return {
            x: this._x + this.width / 2,
            y: this._y + this.height / 2,
        };
    }

    render()
    {
        const x = Math.round( this._x );
        const y = Math.round( this._y );
        ctx.fillStyle = 'red';
        ctx.fillRect( this._x, this._y, this.width, this.height );

        if ( this.image && this.ready )
        {
            if ( 'image' === this.image.type )
            {
                ctx.drawImage( this._image, x, y );
            }
            else if ( 'sprite' === this.image.type && this.renderSprite )
            {
                this.renderSprite();
            }
        }
    }
}
