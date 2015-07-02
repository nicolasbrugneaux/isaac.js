export default class Collection extends Array
{
    constructor( { collection=[], shouldUpdateBeforeRender=false, shouldUpdateAfterRender=false } )
    {
        super();
        this.push( ...collection );

        this._shouldUpdateBeforeRender = shouldUpdateBeforeRender;
        this._shouldUpdateAfterRender = shouldUpdateAfterRender;
    }

    get isEmpty()
    {
        return this.length === 0;
    }

    remove( item )
    {
        const index = this.indexOf( item );

        if ( index > -1 )
        {
            this.splice( index, 1 );
        }
    }

    update()
    {
        const len=this.length;
        const newThis = [];

        for ( let i=0; i < len; i++ )
        {
            const item = this[i];

            if ( item.update )
            {
                item.update();
            }

            if ( item.active === false )
            {
                if ( item.renderDestroy )
                {
                    item.renderDestroy();
                }
            }
            else
            {
                newThis.push( item );
            }
        }

        if ( newThis.length !== len )
        {
            this.splice( len - 1 );

            for ( let i=0, len=newThis.length; i < len; i++ )
            {
                this[i] = newThis[i];
            }
        }
    }

    render()
    {
        if ( this._shouldUpdateBeforeRender && !this.isEmpty )
        {
            this.update();
        }

        for ( let i=0, len=this.length; i < len; i++ )
        {
            this[i].render();
        }

        if ( this._shouldUpdateAfterRender && !this.isEmpty )
        {
            this.update();
        }
    }
}
