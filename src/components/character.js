import DynamicActor from './dynamic-actor';

export default class Character extends DynamicActor
{
    constructor( sizeX, sizeY, image, speed, name, hp )
    {
        super( sizeX, sizeY, image );

        this._speed = speed;
        this._hp = hp;
        this._name = name;
    }

    get name()
    {
        return this._name;
    }

    set name( value )
    {
        throw new Error( 'Can\'t change name, name setter:' + value );
    }

    get hp()
    {
        return this._hp;
    }

    set hp( value )
    {
        if ( 0 >= value && value < 10 )
        {
            this._hp = value;
        }
    }
}
