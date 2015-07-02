export const rocks =
{
    sprite: 'build/img/rocks_sprite.png',
    width: 170,
    height: 172,
    default:
    {
        width: 170,
        height: 172,
        position: [0, 0]
    },
    special:
    {
        width: 170,
        height: 172,
        position: [170, 0]
    },
};

export const fire =
{
    sprite: 'build/img/fire_sprite.png',
    dead: 'build/img/fire_dead.png',
    width: 31,
    height: 34,
    states: 6
};

export default
{
    rocks,
    fire
};
