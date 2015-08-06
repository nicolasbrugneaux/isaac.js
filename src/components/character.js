import DynamicActor from 'components/dynamic-actor';

export default class Character extends DynamicActor
{
    constructor( { width, height, image, speed, name, hp, x, y } )
    {
        super( { width, height, image, x, y, } );

        this._speed = speed;
        this._hp = hp;
        this._originalHp = hp;
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
        if ( 0 < value )
        {
            this._hp = value <= ( this.maxHp || 16 ) ? value : this.maxHp || 16;
        }
        else if ( 0 >= value )
        {
            this._hp = 0;

            if ( this.die )
            {
                this.die();
            }

            if ( this.respawn )
            {
                this._hp = this._originalHp;
                this.respawn();
            }
        }
    }
}
