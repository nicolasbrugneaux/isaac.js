import Isaac from './components/isaac';
import Room from './components/room';

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

    requestAnimationFrame( main );
};

isaac.respawn( room );
main();
