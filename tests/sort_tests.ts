QUnit.module( 'Sort' );


function testSort( sort_f: (list: number[]) => void, assert: Assert )
{
var values = [
        { test: [ 4, 1, 0, 7, 3 ], expect: [ 0, 1, 3, 4, 7 ] },
        { test: [ -20, 3, -21, -5, 10, 0 ], expect: [ -21, -20, -5, 0, 3, 10 ] }
    ];

for (var a = 0 ; a < values.length ; a++)
    {
    var value = values[ a ];

    var result = sort_f( value.test );

    assert.deepEqual( result, value.expect );
    }
}


QUnit.test( 'bubbleSort()', function( assert )
    {
    testSort( Sort.bubbleSort, assert );
    });
QUnit.test( 'quickSort()', function( assert )
    {
    testSort( Sort.quickSort, assert );
    });
QUnit.test( 'insertionSort()', function( assert )
    {
    testSort( Sort.insertionSort, assert );
    });