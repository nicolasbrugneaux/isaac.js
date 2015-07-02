import Store from 'store';
import Collection from 'components/collection';
import Room from 'components/room';
import Rock from 'components/rock';
import Fire from 'components/fire';
import Isaac from 'components/isaac';

Store.set( 'room', new Room() );

Store.set( 'tears', new Collection( { shouldUpdateBeforeRender: true } ) );

Store.set( 'obstacles', new Collection( { collection:
[
    new Rock( { x: 450, y: 120 } ),
    new Rock( { x: 65, y: 65 } ),
    new Rock( { x: 115, y: 65 } ),
    new Rock( { x: 165, y: 65 } ),
    new Rock( { x: 65, y: 116 } ),
    new Rock( { x: 115, y: 116 } ),
    new Rock( { x: 165, y: 116 } )
], shouldUpdateBeforeRender: true } ) );

Store.set( 'monsters', new Collection( { collection:
[
    new Fire( { x: 703, y: 65 } )
], shouldUpdateBeforeRender: true } ) );

Store.set( 'player', new Isaac() );


export const background = new Collection( { collection:
[
    Store.get( 'room' )
] } );

export const foreground = new Collection( { collection:
[
    Store.get( 'obstacles' ),
    Store.get( 'monsters' ),
    Store.get( 'tears' ),
    Store.get( 'player' )

] } );

// export const obstacles = foreground[0];
// export const monsters = foreground[1];
// export const player = foreground[2];
