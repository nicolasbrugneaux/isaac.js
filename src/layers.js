import Isaac from './components/isaac';
import Room from './components/room';
import Rock from './components/rock';
import Fire from './components/fire';

export const background =
[
    new Room(),
];

export const foreground =
[
    // obstacles, they honestly don't need to be grouped in an array
    [
        new Rock( { x: 450, y: 120 } ),
        new Rock( { x: 65, y: 65 } ),
        new Rock( { x: 115, y: 65 } ),
        new Rock( { x: 165, y: 65 } ),
        new Rock( { x: 65, y: 116 } ),
        new Rock( { x: 115, y: 116 } ),
        new Rock( { x: 165, y: 116 } ),
        new Fire( { x: 703, y: 65 } )
    ],
    // monsters
    [
    ],
    // player
    new Isaac(),
];
