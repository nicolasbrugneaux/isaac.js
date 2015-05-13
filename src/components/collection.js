export default class TearCollection
{
    constructor()
    {
        this._collection = [];
    }

    get length()
    {
        return this._collection.length;
    }

    get isEmpty()
    {
        return this._collection.length === 0;
    }

    add( item )
    {
        this._collection.push( item );
    }

    remove( item )
    {
        const index = this._collection.indexOf( item );

        if ( index > -1 )
        {
            this._collection.splice( index, 1 );
        }
    }

    update()
    {
        this._collection = this._collection.filter( ( item ) =>
        {
            item.update();
            return item.active;
        } );
    }

    render()
    {
        for ( let i=0, len=this._collection.length; i < len; i++ )
        {
            this._collection[i].render();
        }
    }
}
