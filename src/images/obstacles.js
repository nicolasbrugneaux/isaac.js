export const rocks =
{
    sprite: 'build/img/rocks_sprite.png',
    width: 170,
    height: 172,
    default:
    {
        width: 170,
        height: 172,
        position: [ 0, 0, ],
    },
    special:
    {
        width: 170,
        height: 172,
        position: [ 170, 0, ],
    },
};

export const fire =
{
    sprite: 'build/img/fire_sprite.png',
    width: 31,
    height: 34,
    states: 6,
};


export const fireBase =
{
    sprite: 'build/img/deadfire_sprite.png',
    width: 32,
    height: 32,
    position: [ 0, 34, ],
    deadPosition: [ 32, 34, ],
};

export default
{
    rocks,
    fire,
    fireBase,
};
