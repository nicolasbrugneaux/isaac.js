import {
    LIMIT_TOP,
    LIMIT_BOTTOM,
    LIMIT_LEFT,
    LIMIT_RIGHT
} from './constants';

class Isaac
{
    constructor( speed=256, hp=3 )
    {
        this._x = 0;
        this._y = 0;
        this._speed = speed;
        this._hp = hp;
    }

    get speed()
    {
        return this._speed;
    }

    get hp()
    {
        return this._hp;
    }

    set hp( value )
    {
        this._hp = value;
    }

    get x()
    {
        return this._x;
    }

    get y()
    {
        return this._y;
    }

    set x( value )
    {
        if ( value !== this._x && LIMIT_LEFT < value && value < LIMIT_RIGHT )
        {
            this._x = value;
        }
    }

    set y( value )
    {
        if ( value !== this._x && LIMIT_TOP < value && value < LIMIT_BOTTOM )
        {
            this._y = value;
        }
    }
}


export default new Isaac();
