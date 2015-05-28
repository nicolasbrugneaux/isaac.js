import Isaac from './components/isaac';
import Room from './components/room';
import Rock from './components/rock';
import { displayCtx, canvas } from './canvas';


const layers =
{
    background: new Room(),
    foreground:
    [
        [
            new Rock( { x: 75, y: 65 } ),
            new Rock( { x: 125, y: 65 } ),
            new Rock( { x: 175, y: 65 } )
        ],
        new Isaac()
    ]
};

const main = () =>
{

    layers.background.render();


    for ( let i=0, len=layers.foreground.length; i < len; i++ )
    {
        let actor = layers.foreground[i];

        if ( Array.isArray( actor ) )
        {
            for ( let j=0, lenj=actor.length; j < lenj; j++ )
            {
                actor[j].render();
            }
        }
        else
        {
            actor.render();
        }
    }

    displayCtx.drawImage( canvas, 0, 0 ); // draw something visible only once per frame.

    requestAnimationFrame( main );
};

main();
