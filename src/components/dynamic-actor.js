import Actor from 'components/actor';

export default class DynamicActor extends Actor
{
    constructor( { x, y, width, height, image, speed } )
    {
        super( { x, y, width, height, image, } );

        this._speed = speed || 256;
    }

    get speed()
    {
        return this._speed;
    }

    set speed( value )
    {
        this._speed = value;
    }
}
