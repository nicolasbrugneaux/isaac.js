import { displayCtx, canvas } from './canvas';
import { foreground, background } from './layers';

const main = () =>
{
    background.render();

    for ( let i=0, len=foreground.length; i < len; i++ )
    {
        let actor = foreground[i];

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
