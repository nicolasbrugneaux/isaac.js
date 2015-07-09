export const hearts =
{
    sprite: 'build/img/hearts_sprite.png',
    width: 16,
    height: 16,
    empty:
    {
        position: [32, 0, ],
    },
    default:
    {
        position: [0, 0, ],
    },
    halfdefault:
    {
        position: [16, 0, ],
    },
    spirit:
    {
        position: [0, 16, ],
    },
    halfspirit:
    {
        position: [16, 16, ],
    },
    evil:
    {
        position: [32, 16, ],
    },
    halfevil:
    {
        position: [48, 16, ],
    },
    reinforced:
    {
        position: [48, 0, ],
    },
    halfreinforced:
    {
        position: [64, 0, ],
    },
};

export const bombs =
{
    sprite: 'build/img/bombs_sprite.png',
    width: 32,
    height: 32,
    default:
    {
        position: [0, 0, ],
    },
};

export default
{
    hearts,
    bombs,
};
