import Isaac from './components/isaac';
import Room from './components/room';
import { displayCtx, canvas } from './canvas';

let actors =
[
    new Room(),
    new Isaac()
];

const room = actors[0]; // shortcut
const isaac = actors[1]; // shortcut

const main = () =>
{
    for ( let i=0, len=actors.length; i < len; i++ )
    {
        if ( !actors[i].ready )
        {
            continue;
        }

        actors[i].render();
    }

    displayCtx.drawImage( canvas, 0, 0 ); // draw something visible only once per frame.

    requestAnimationFrame( main );
};

isaac.respawn( room );
main();
