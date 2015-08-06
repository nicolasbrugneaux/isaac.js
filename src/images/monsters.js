export const flies =
{
    sprite: 'build/img/flies_sprite.png',
    width: 32,
    height: 32,
    stationary:
    {
        position: [0, 0, ],
        states: 2,
    },
    poopOrbital:
    {
        position: [64, 0, ],
        states: 2,
    },
    homing:
    {
        position: [0, 32, ],
        states: 4,
    },
    circling:
    {
        position: [128, 32, ],
        states: 2,
    },

    dying:
    {
        width: 64,
        height: 64,
        position: [0, 64, ],
        states: 12,
    },
};

export default
{
    flies,
};
