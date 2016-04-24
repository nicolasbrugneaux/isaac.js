import Store from 'store';

export default class Collection extends Array
{
    constructor({ collection=[], shouldUpdateBeforeRender=false, shouldUpdateAfterRender=false })
    {
        super();
        this.push(...collection);

        this._shouldUpdateBeforeRender = shouldUpdateBeforeRender;
        this._shouldUpdateAfterRender = shouldUpdateAfterRender;
    }

    get isEmpty() {
        return 0 === this.length;
    }

    remove(item)
    {
        const index = this.indexOf(item);

        if (-1 < index)
        {
            this.splice(index, 1);
        }
    }

    update()
    {
        const len = this.length;
        const newThis = [];

        for (let i = 0; i < len; i++)
        {
            const item = this[i];

            if (item.update)
            {
                item.update();
            }

            if (false === item.active)
            {
                if (item.renderDestroy)
                {
                    item.renderDestroy();
                }

                const layer = item.inactiveLayer;
                if (layer)
                {
                    Store.get(layer).push(item);
                }
            }
            else
            {
                newThis.push(item);
            }
        }

        const newLength = newThis.length;

        if (newLength !== len)
        {
            this.length = newLength;

            for (let i = 0; i < newLength; i++)
            {
                this[i] = newThis[i];
            }
        }
    }

    render()
    {
        if (this._shouldUpdateBeforeRender && !this.isEmpty)
        {
            this.update();
        }

        this.forEach(item => item.render());

        if (this._shouldUpdateAfterRender && !this.isEmpty)
        {
            this.update();
        }
    }
}
