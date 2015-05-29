import Isaac from './components/isaac';
import Room from './components/room';
import Rock from './components/rock';

export const background = new Room();

export const foreground =
[
    [
        new Rock( { x: 450, y: 120 } ),
        new Rock( { x: 65, y: 65 } ),
        new Rock( { x: 115, y: 65 } ),
        new Rock( { x: 165, y: 65 } ),
        new Rock( { x: 65, y: 116 } ),
        new Rock( { x: 115, y: 116 } ),
        new Rock( { x: 165, y: 116 } )
    ],
    new Isaac()
];

window.isaac = foreground[1];
window.lowerRock = foreground[0];
