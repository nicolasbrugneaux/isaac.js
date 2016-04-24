import { displayCtx, canvas } from 'canvas';
import { foreground, background } from 'layers';

const main = () =>
{
    background.render();
    foreground.render();

    displayCtx.drawImage(canvas, 0, 0); // draw something visible only once per frame.

    requestAnimationFrame(main);
};

main();
