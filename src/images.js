// preload all images for now.

const images =
{
    background:
    {
        src: 'build/img/room.png',
        ready : false,
        img: new Image()
    },
    isaac:
    {
        src: 'build/img/isaac.png',
        ready: false,
        img: new Image()
    }
}

for ( let prop in images )
{
    if ( images.hasOwnProperty( prop ) )
    {
        images[prop].img.onload = ( prop ) =>
        {
            images[prop].ready = true;
        }.bind( null, prop );
        images[prop].img.src = images[prop].src;
    }
}


export default images;
