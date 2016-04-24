import { ctx } from 'canvas';
import Store from 'store';
import { hearts, bombs, keys, coins, hardMode, noAchievement } from 'images/HUD';

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
            keys,
            coins,
            hardMode,
            noAchievement,
        };

        Object.keys(elements).forEach(prop =>
        {
            const { sprite } = elements[prop];
            this.images[prop] = sprite;

            const image =
            {
                image: new Image(),
                ready: false,
            };
            this._images[prop] = image;

            image.image.onload = () => { image.ready = true; };
            image.image.src = sprite;
        });
    }

    render()
    {

        if (this._images.hearts.ready)
        {
            const width = hearts.width * 1.5;
            const height = hearts.height * 1.5;
            const initialX = 10;
            const initialY = 10;
            const originalHp = Store.get('player').hp;

            const hp = originalHp;
            let x = initialX;
            let y = initialY;

            let _hp = 0;

            while (_hp < hp)
            {
                let [ spriteX, spriteY ] = hearts.default.position;

                if (_hp + 0.5 === hp)
                {
                    [ spriteX, spriteY ] = hearts.halfdefault.position;
                    ctx.drawImage(this._images.hearts.image, spriteX, spriteY, hearts.width, hearts.height, x, y, width, height);
                }
                else
                {
                    ctx.drawImage(this._images.hearts.image, spriteX, spriteY, hearts.width, hearts.height, x, y, width, height);
                }

                x += width;
                _hp += 1;

                if (7 < _hp && 8 >= _hp)
                {
                    y += height;
                    x = initialX;
                }
            }
        }

        let initialY = 40;

        if (this._images.coins.ready)
        {
            initialY += 20;

            const width = coins.width;
            const height = coins.height;
            const initialX = 8;
            const playerCoins = Store.get('playerItems').get('coin');
            const count = playerCoins ? playerCoins.quantity : 0;

            const [ spriteX, spriteY ] = coins.default.position;
            ctx.drawImage(this._images.coins.image, spriteX, spriteY, coins.width, coins.height, initialX, initialY, width, height);

            ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            ctx.font = '14px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`${count}`, initialX + width + 3, initialY);
        }

        if (this._images.bombs.ready)
        {

            initialY += 20;

            const width = bombs.width;
            const height = bombs.height;
            const initialX = 8;
            const playerBombs = Store.get('playerItems').get('bomb');
            const count = playerBombs ? playerBombs.quantity : 0;

            const [ spriteX, spriteY ] = bombs.default.position;
            ctx.drawImage(this._images.bombs.image, spriteX, spriteY, bombs.width, bombs.height, initialX, initialY, width, height);

            ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            ctx.font = '14px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`${count}`, initialX + width + 3, initialY);
        }

        if (this._images.keys.ready)
        {

            initialY += 20;

            const width = keys.width;
            const height = keys.height;
            const initialX = 8;
            const playerKeys = Store.get('playerItems').get('key');
            const count = playerKeys ? playerKeys.quantity : 0;

            const [ spriteX, spriteY ] = keys.default.position;
            ctx.drawImage(this._images.keys.image, spriteX, spriteY, keys.width, keys.height, initialX, initialY, width, height);

            ctx.fillStyle = 0 === count ? 'rgb(175, 175, 175)' : 'rgb(225, 225, 225)';
            ctx.font = '14px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(`${count}`, initialX + width + 3, initialY);
        }

        if (Store.get('hardMode') && this._images.hardMode.ready)
        {
            initialY += 20;

            const width = hardMode.width;
            const height = hardMode.height;
            const initialX = 8;

            const [ spriteX, spriteY ] = hardMode.default.position;
            ctx.drawImage(this._images.hardMode.image, spriteX, spriteY, hardMode.width, hardMode.height, initialX, initialY, width, height);
        }

        if (Store.get('noAchievement') && this._images.noAchievement.ready)
        {
            initialY += 20;

            const width = noAchievement.width;
            const height = noAchievement.height;
            const initialX = 8;

            const [ spriteX, spriteY ] = noAchievement.default.position;
            ctx.drawImage(this._images.noAchievement.image, spriteX, spriteY, noAchievement.width, noAchievement.height, initialX, initialY, width, height);
        }
    }
}
