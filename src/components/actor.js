import { ctx } from '../canvas';

export default class Actor
{
    constructor( { width, height, image } )
    {
        this.width = width;
        this.height = height;
        this.image = image || null;
        this._x = null;
        this._y = null;

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
        if ( type === 'canvas' )
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
        return this._x;
    }

    set y( value )
    {
        this._y = value;
    }


    get center()
    {
        return {
            x: this._x + this.width / 2,
            y: this._y + this.height / 2
        };
    }

    render()
    {
        const x = Math.round( this._x );
        const y = Math.round( this._y );

        if ( this.image && this.ready )
        {
            if ( this.image.type === 'image' )
            {
                ctx.drawImage( this._image, x, y );
            }
            else if ( this.image.type === 'sprite' && this.renderSprite )
            {
                this.renderSprite();
            }
        }
    }
}
