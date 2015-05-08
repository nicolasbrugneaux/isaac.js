import Actor from './actor';

import images from '../images';

export default class Room extends Actor
{
    constructor( image=images.rooms.default )
    {
        super( 800, 480, image );
        this._x = 0;
        this._y = 0;
    }
}
