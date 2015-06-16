QUnit.module( 'Search' );
QUnit.test( 'binarySearch()', function( assert )
{
var list1 = [ 1, 2, 4, 7, 8 ];
var list2 = [ -40, -15, 0, 100 ];

var testList = function( list )
    {
    for (var a = 0 ; a < list.length ; a++)
        {
        var value = list[ a ];

        assert.deepEqual( Search.binarySearch( list, value ), a );
        }
    };


testList( list1 );
testList( list2 );

    // test for values that are not there
assert.deepEqual( Search.binarySearch( list1, 10 ), -1 );
assert.deepEqual( Search.binarySearch( list2, 10 ), -1 );
});