export const isaac =
{
    sprite: 'build/img/isaac_sprite_custom.png',
    head:
    {
        width: 28,
        height: 25,
        directions:
        {
            down: [0, 0, ],
            up: [28 * 4, 0, ],
            left: [28 * 6, 0, ],
            right: [28 * 2, 0, ],
        },
        shootingDirections:
        {
            down: [28, 0, ],
            up: [28 * 5, 0, ],
            left: [28 * 7, 0, ],
            right: [28 * 3, 0, ],
        },
    },
    legs:
    {
        width: 18,
        height: 14,
        directions:
        {
            down: [0, 25, ],
            up: [18 * 5, 25, ],
            left: [0, 25, ],
            right: [0, 25, ],
        },
    },
};

export default
{
    isaac,
};
