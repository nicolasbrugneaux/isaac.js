import images from './images';
import { canvas, ctx } from './canvas';
import {
    KEY_UP,
    KEY_DOWN,
    KEY_LEFT,
    KEY_RIGHT
} from './constants';
import { repeat } from './utils';
import Isaac from './isaac';

let keysDown = new Set();
document.addEventListener( 'keydown', ( e ) => keysDown.add( e.keyCode ) );
document.addEventListener( 'keyup', ( e ) => keysDown.delete( e.keyCode ) );

const reset = () =>
{
    Isaac.x = canvas.width / 2;
    Isaac.y = canvas.height / 2;
}

const update = ( modifier ) =>
{
    const deplacement = Isaac.speed * modifier;

    if ( keysDown.size === 0 )
    {
        return false;
    }

    if ( keysDown.has( KEY_UP ) ) // UP
    {
        Isaac.y -= deplacement;
    }
    else if ( keysDown.has( KEY_DOWN ) ) // DOWN
    {
        Isaac.y += deplacement;
    }

    if  ( keysDown.has( KEY_LEFT ) ) // LEFT
    {
        Isaac.x -= deplacement;
    }
    else if ( keysDown.has( KEY_RIGHT ) ) // RIGHT
    {
        Isaac.x += deplacement;
    }

    return true;
};

// Draw the things!


const render = () =>
{
    if ( images.background.ready )
    {
        ctx.drawImage( images.background.img, 0, 0 );
    }

    if ( images.isaac.ready )
    {
        ctx.drawImage( images.isaac.img, Isaac.x, Isaac.y );
    }

    if ( images.background.ready && images.isaac.ready )
    {
        firstRender = false;
    }

    ctx.fillStyle = "rgb(250, 50, 50)";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText( repeat( '❤ ', Isaac.hp ), 35, 13 );
}

let then = Date.now();
let firstRender = true;
const main = () =>
{
    const now = Date.now();
    const delta = now - then;

    if ( firstRender || update( delta / 1000 ) )
    {
        console.log( firstRender, Isaac );
        render();
    }
    then = now;

    requestAnimationFrame( main );
}

reset();
main();
