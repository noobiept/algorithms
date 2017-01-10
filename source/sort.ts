module Sort
{
/**
 * Sorts a list by comparing adjacent positions, and swapping them if they're not in order. Does this until no more positions are swapped, which means the list is sorted.
 */
export function bubbleSort( list: number[] )
    {
    var length = list.length;
    var value1, value2;
    var madeChange = false;

    while( true )
        {
        for (var a = 0 ; a < length - 1 ; a++)
            {
            value1 = list[ a ];
            value2 = list[ a + 1 ];

            if ( value1 > value2 )
                {
                list[ a ] = value2;
                list[ a + 1 ] = value1;

                madeChange = true;
                }
            }

            // means its sorted
        if ( !madeChange )
            {
            return list;
            }

            // reset the variable for the next loop
        madeChange = false;
        }
    }


/**
 * Keep dividing the list in two, based on a selected value (pivot). The values lesser than the pivot are added to the left, and the values higher go to the right.
 * Keep doing that recursively until its sorted.
 */
export function quickSort( list: number[] ): number[]
    {
    if ( list.length === 0 )
        {
        return list;
        }

    var left = [];
    var right = [];
    var pivot = list[ 0 ];
    var length = list.length;

    for (var a = 1 ; a < length ; a++)
        {
        var value = list[ a ];

        if ( value < pivot )
            {
            left.push( value );
            }

        else
            {
            right.push( value );
            }
        }

    return quickSort( left ).concat( pivot, quickSort( right ) );
    }


/**
 * Separates the list in a sorted and unsorted part.
 * Goes through every unsorted element, and starting at the end of the sorted part, keep shifting the elements until it finds the right position of the element.
 */
export function insertionSort( list: number[] )
    {
    var length = list.length;

        // go through every (unsorted) element
    for (var a = 0 ; a < length ; a++)
        {
        var value = list[ a ];

            // sort the element
            // start at the end of the sorted part
            // start shifting elements until we find the correct position for the value
        for (var b = a - 1 ; b >= 0 && list[ b ] > value ; b--)
            {
            list[ b + 1 ] = list[ b ];
            }

            // add the value in the correct position
        list[ b + 1 ] = value;
        }

    return list;
    }
}