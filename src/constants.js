import { canvas } from 'canvas';

const isFr = navigator.language === 'fr';

export const LIMIT_TOP_ISAAC = 40;
export const LIMIT_BOTTOM_ISAAC = canvas.height - 95;
export const LIMIT_LEFT_ISAAC = 55;
export const LIMIT_RIGHT_ISAAC = canvas.width - 85;

export const LIMIT_TOP = 55;
export const LIMIT_BOTTOM = canvas.height - 65;
export const LIMIT_LEFT = 60;
export const LIMIT_RIGHT = canvas.width - 75;

export const KEY_UP = 38;
export const KEY_DOWN = 40;
export const KEY_LEFT = 37;
export const KEY_RIGHT = 39;
export const KEY_SPACE = 32;
export const KEY_W = isFr ? 90 : 87;
export const KEY_A = isFr ? 81 : 65;
export const KEY_S = 83;
export const KEY_D = 68;
