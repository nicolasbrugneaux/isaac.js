import Actor from './actor';

export default class DynamicActor extends Actor
{
    constructor( { width, height, image, speed } )
    {
        super( { width, height, image } );

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
