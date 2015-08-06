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
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default:
    {
        position: [0, 16, ],
    },
};

export const keys =
{
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default:
    {
        position: [16, 0, ],
    },
    golden:
    {
        position: [16, 16, ],
    },
};


export const coins =
{
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default:
    {
        position: [0, 0, ],
    },
};

export const hardMode =
{
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default:
    {
        position: [32, 0, ],
    },
};

export const noAchievement =
{
    sprite: 'build/img/hud.png',
    width: 16,
    height: 16,
    default:
    {
        position: [32, 16, ],
    },
};


export default
{
    hearts,
    bombs,
    keys,
    coins,
    hardMode,
    noAchievement,
};
