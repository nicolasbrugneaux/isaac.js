export const repeat = ( str, times ) =>
{
    let _str = '';
    while ( times-- )
    {
        _str += str;
    }
    return _str;
}
