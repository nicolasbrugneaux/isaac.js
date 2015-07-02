import Actor from 'components/actor';
import { defaultRoom } from 'images/rooms';

export default class Room extends Actor
{
    constructor( { image }={ image: { type: 'image', src: defaultRoom } } )
    {
        super( { width: 800, height: 480, image  } );
        this._x = 0;
        this._y = 0;
    }
}
