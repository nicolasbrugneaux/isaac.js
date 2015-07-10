import { ctx } from 'canvas';
import Store from 'store';
import { hearts, bombs } from 'images/HUD';

export default class HUD
{
    constructor()
    {
        this.images = [];
        this._images = [];

        const elements =
        {
            hearts,
            bombs,
        };
        Object.keys( elements ).forEach( prop =>
        {
            const element = elements[prop];
            this.images[prop] = element.sprite;

            const image =
            {
                image: new Image(),
                ready: false,
            };
            this._images[prop] = image;

            image.image.onload = () => image.ready = true;
            image.image.src = element.sprite;
        } );
    }

    render()
    {

        if ( this._images.hearts.ready )
        {
            const width = hearts.width * 1.5;
            const height = hearts.height * 1.5;
            const initialX = 10;
            const initialY = 10;
            const originalHp = Store.get( 'player' ).hp;

            let hp = originalHp;
            let x = initialX;
            let y = initialY;

            let _hp = 0;

            while ( _hp < hp )
            {
                let [ spriteX, spriteY ] = hearts.default.position;

                if ( _hp + 0.5 === hp )
                {
                    [ spriteX, spriteY ] = hearts.halfdefault.position;
                    ctx.drawImage( this._images.hearts.image, spriteX, spriteY, hearts.width, hearts.height, x, y, width, height );
                }
                else
                {
                    ctx.drawImage( this._images.hearts.image, spriteX, spriteY, hearts.width, hearts.height, x, y, width, height );
                }

                x += width;
                _hp += 1;

                if ( 7 < _hp && 8 >= _hp )
                {
                    y += height;
                    x = initialX;
                }
            }
        }

        if ( this._images.bombs.ready )
        {
            const width = bombs.width;
            const height = bombs.height;
            const initialX = 5;
            const initialY = 55;
            const playerBombs = Store.get( 'playerItems' ).get( 'bomb' );
            const count = playerBombs ? playerBombs.quantity : 0;

            let [ spriteX, spriteY ] = bombs.default.position;
            ctx.drawImage( this._images.bombs.image, spriteX, spriteY, bombs.width, bombs.height, initialX, initialY, width, height );

            ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            ctx.font = '15px Helvetica';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText( `x ${count}`, initialX + width, initialY + 6 );
        }
    }
}
