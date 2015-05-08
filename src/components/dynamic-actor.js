import Actor from './actor';

export default class DynamicActor extends Actor
{
    constructor( sizeX, sizeY, image=null, speed=256 )
    {
        super( sizeX, sizeY, image );

        this._speed = speed;
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
