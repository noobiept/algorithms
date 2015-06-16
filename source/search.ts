module Search
{
/**
 * Find the position of the given `value` in the `list`. Assumes the list is sorted (lower values in the beginning).
 */
export function binarySearch( list: number[], value: number )
    {
    var position = Math.floor( list.length / 2 );
    var nextPosition;

    while( true )
        {
        var compare = list[ position ];

        if ( value === compare )
            {
            return position;
            }

        else if ( value < compare )
            {
            nextPosition = Math.floor( position / 2 );
            }

        else
            {
            nextPosition = Math.floor( position / 2 ) + position;
            }

            // not found
        if ( nextPosition === position )
            {
            return -1;
            }

        else
            {
            position = nextPosition;
            }
        }
    }
}