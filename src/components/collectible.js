import StaticActor from 'components/static-actor';

export default class Collectible extends StaticActor
{
    toItem()
    {
        throw new Error( 'toItem() must be implemented' );
    }
}
