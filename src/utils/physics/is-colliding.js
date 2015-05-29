const isColliding = ( target, other ) =>
{
    // ignore collision with self
    if ( target === other )
    {
        return false;
    }

    const x = target.x;
    const width = target.width;
    const y = target.y;
    const height = target.height;

    if ( Array.isArray( other ) )
    {
        return other.some( _other => isColliding( target, _other ) );
    }

    const _x = other.x;
    const _width = other.width;
    const _y = other.y;
    const _height = other.height;

    const top = y + height + 2 >= _y;
    const right = x <= _x + _width;
    const bottom = y + height - 10 <= _y + _height;
    const left = x + width >= _x;

    return left && right && bottom && top;
};

export default isColliding;
