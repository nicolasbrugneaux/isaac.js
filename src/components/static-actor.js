import Actor from './actor';

export default class StaticActor extends Actor
{

    constructor( { x, y, width, height, image } )
    {
        super( { width, height, image } );

        this._x = x;
        this._y = y;
    }
}
