import StaticActor from 'components/static-actor';

export default class DestructibleStaticActor extends StaticActor
{
    constructor( { x, y, width, height, image, hp } )
    {
        super( { x, y, width, height, image, } );

        this._hp = hp;
        this.active = true;
        this._dmgInterval = 500;
        this._lastDmg = Date.now();
    }

    get hp()
    {
        return this._hp;
    }

    set hp( value )
    {
        if ( 0 < value )
        {
            this._hp = value;
        }
        else
        {
            this.active = false;
        }
    }
}
