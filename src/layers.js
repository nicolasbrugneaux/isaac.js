import Store from 'store';
import Collection from 'components/collection';
import Room from 'components/room';
import HUD from 'components/HUD';
import Rock from 'components/rock';
import Fire from 'components/fire';
import Bomb from 'components/bomb';
import Isaac from 'components/isaac';

Store.set( 'room', new Room() );
Store.set( 'HUD', new HUD() );

Store.set( 'tears', new Collection( { shouldUpdateBeforeRender: true, } ) );

Store.set( 'obstacles', new Collection( { collection:
[
    new Rock( { x: 450, y: 120, } ),
    new Rock( { x: 65, y: 65, } ),
    new Rock( { x: 115, y: 65, } ),
    new Rock( { x: 165, y: 65, } ),
    new Rock( { x: 65, y: 116, } ),
    new Rock( { x: 115, y: 116, } ),
    new Rock( { x: 165, y: 116, } ),
], shouldUpdateBeforeRender: true, } ) );

Store.set( 'items', new Collection( { collection:
[
    new Bomb( { x: 82, y: 356, } ),
], } ) );

Store.set( 'monsters', new Collection( { collection:
[
    new Fire( { x: 703, y: 65, } ),
], shouldUpdateBeforeRender: true, } ) );

Store.set( 'player', new Isaac() );
Store.set( 'playerItems', new Map() );


export const background = new Collection( { collection:
[
    Store.get( 'room' ),
    Store.get( 'HUD' ),
], } );

export const foreground = new Collection( { collection:
[
    Store.get( 'obstacles' ),
    Store.get( 'monsters' ),
    Store.get( 'items' ),
    Store.get( 'tears' ),
    Store.get( 'player' ),
], } );


window.Store = Store;
window.Player = Store.get( 'player' );
window.items = Store.get( 'items' );
//
// export const obstacles = foreground[0];
// export const monsters = foreground[1];
// export const player = foreground[2];
