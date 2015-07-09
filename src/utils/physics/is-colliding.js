import Collection from 'components/collection';

const isColliding = ( target, other ) =>
{
    // ignore collision with self
    if ( target === other )
    {
        return false;
    }

    const x = target.x;
    const width = target.collidingWidth || target.width;
    const y = target.y;
    const height = target.collidingHeight || target.height;

    if ( Array.isArray( other ) || other instanceof Collection )
    {
        for ( let i = 0, len = other.length; i < len; i++ )
        {
            const collider = isColliding( target, other[i] );
            if ( collider )
            {
                return collider;
            }
        }

        return false;
    }

    const _x = other.x;
    const _width = other.collidingWidth || other.width;
    const _y = other.y;
    const _height = other.collidingHeight || other.height;

    const top = y + height >= _y;
    const right = x <= _x + _width;
    const bottom = y + height <= _y + _height;
    const left = x + width >= _x;

    if ( left && right && bottom && top )
    {
        return other;
    }

    return false;
};

export default isColliding;
