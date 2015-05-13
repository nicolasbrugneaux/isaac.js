export const displayCanvas = document.getElementById( 'app' );
export const displayCtx = displayCanvas.getContext( '2d' );

export const canvas = document.createElement( 'canvas' );
canvas.width = displayCanvas.width;
canvas.height = displayCanvas.height;
export const ctx = canvas.getContext( '2d' );
