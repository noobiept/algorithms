QUnit.module( 'Linked List' );


/**
 * Compare the list values/position with a provided array.
 */
function testList<ValueType>( assert: Assert, list: LinkedList<ValueType>, values: number[] )
    {
    var node;
    var a;
    var length = values.length;

        // check the length
    assert.deepEqual( list.length, length );

    if ( length === 0 )
        {
        assert.deepEqual( list.first, undefined );
        assert.deepEqual( list.last, undefined );
        return;
        }


        // move the list forward
    node = list.first!;

    for (a = 0 ; a < length ; a++)
        {
        assert.deepEqual( node.value, values[ a ] );

        node = node.next!;
        }

        // move the list backward
    node = list.last!;

    for (a = length - 1 ; a >= 0 ; a--)
        {
        assert.deepEqual( node.value, values[ a ] );

        node = node.previous!;
        }
    }


QUnit.test( 'constructor', function( assert )
    {
    var emptyList = new LinkedList();

    assert.deepEqual( emptyList.first, undefined );
    assert.deepEqual( emptyList.last, undefined );
    assert.deepEqual( emptyList.length, 0 );

    var list = new LinkedList( 1, 2, 3 );

    assert.deepEqual( list.length, 3 );
    assert.deepEqual( list.first!.value, 1 );
    assert.deepEqual( list.first!.next!.value, 2 );
    assert.deepEqual( list.last!.value, 3 );
    });
QUnit.test( 'addStart()', function( assert )
    {
    var list = new LinkedList( 1 );

    list.addStart( 2 );
    list.addStart( 3 );

    testList( assert, list, [ 3, 2, 1 ] );
    });
QUnit.test( 'addEnd()', function( assert )
    {
    var list = new LinkedList( 1 );

    list.addEnd( 2 );
    list.addEnd( 3 );

    testList( assert, list, [ 1, 2, 3 ] )
    });
QUnit.test( 'addAfter()', function( assert )
    {
    var list = new LinkedList();

    var node = list.addStart( 4 );

        // add at the end
    list.addAfter( node, 2 );
    testList( assert, list, [ 4, 2 ] );

        // add in the middle
    list.addAfter( node, 1 );
    testList( assert, list, [ 4, 1, 2 ] );
    });
QUnit.test( 'addBefore()', function( assert )
    {
    var list = new LinkedList();

    var node = list.addEnd( 1 );

        // add in the beginning
    list.addBefore( node, 2 );
    testList( assert, list, [ 2, 1 ] );

        // add in the middle
    list.addBefore( node, 4 );
    testList( assert, list, [ 2, 4, 1 ] );
    });
QUnit.test( 'addAfterPosition()', function( assert )
    {
    var list = new LinkedList( 1 );

    list.addAfterPosition( 0, 2 );
    list.addAfterPosition( 0, 3 );
    list.addAfterPosition( 2, 6 );
    list.addAfterPosition( 2, 4 );

    testList( assert, list, [ 1, 3, 2, 4, 6 ] );
    });
QUnit.test( 'addBeforePosition()', function( assert )
    {
    var list = new LinkedList( 1 );

    list.addBeforePosition( 0, 2 );
    list.addBeforePosition( 0, 3 );
    list.addBeforePosition( 2, 4 );
    list.addBeforePosition( 2, 5 );

    testList( assert, list, [ 3, 2, 5, 4, 1 ] );
    });
QUnit.test( 'remove()', function( assert )
    {
    var list = new LinkedList();

    var node = list.addStart( 1 );
    list.remove( node );

    testList( assert, list, [] );

    list.addStart( 1 );
    node = list.addStart( 2 );
    list.remove( node );

    testList( assert, list, [ 1 ] );

    list.addEnd( 2 );
    node = list.addEnd( 3 );
    list.remove( node );

    testList( assert, list, [ 1, 2 ] );

    list.addEnd( 3 );
    node = list.first!.next!;
    list.remove( node );

    testList( assert, list, [ 1, 3 ] );
    });
QUnit.test( 'removePosition()', function( assert )
    {
    var list = new LinkedList( 1, 2, 3 );

    list.removePosition( 2 );
    testList( assert, list, [ 1, 2 ] );

    list.removePosition( 0 );
    testList( assert, list, [ 2 ] );

    list.addEnd( 1 );
    list.addEnd( 3 );
    list.removePosition( 1 );
    testList( assert, list, [ 2, 3 ] );
    });
QUnit.test( 'removeFirst()', function( assert )
    {
    var list = new LinkedList( 1, 2, 3 );

    list.removeFirst();
    testList( assert, list, [ 2, 3 ] );

    list.removeFirst();
    testList( assert, list, [ 3 ] );

    list.removeFirst();
    testList( assert, list, [] );
    });
QUnit.test( 'removeLast()', function( assert )
    {
    var list = new LinkedList( 1 );

    list.removeLast();
    testList( assert, list, [] );

    list.addEnd( 1 );
    list.addEnd( 2 );
    list.addEnd( 3 );

    list.removeLast();
    testList( assert, list, [ 1, 2 ] );

    list.removeLast();
    testList( assert, list, [ 1 ] );
    });
QUnit.test( 'removeValue()', function( assert )
    {
    var list = new LinkedList( 1, 2, 3 );

    list.removeValue( 2 );
    testList( assert, list, [ 1, 3 ] );

    assert.deepEqual( list.removeValue( -1 ), undefined );
    });
QUnit.test( 'hasValue()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( 1 );
    list.addEnd( 2 );
    list.addEnd( 3 );

    assert.deepEqual( list.hasValue( 1 ), true );
    assert.deepEqual( list.hasValue( 2 ), true );
    assert.deepEqual( list.hasValue( 3 ), true );
    assert.deepEqual( list.hasValue( 4 ), false );
    });
QUnit.test( 'hasNode()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( 1 );
    list.addEnd( 2 );
    var node = list.addEnd( 3 );

    assert.deepEqual( list.hasNode( node ), true );
    assert.deepEqual( list.hasNode( { value: 10 } ), false );
    });
QUnit.test( 'replace()', function( assert )
    {
    var list = new LinkedList( 1, 2, 3 );

    list.replace( 1, -1 );

    testList( assert, list, [ -1, 2, 3 ] );
    });
QUnit.test( 'replaceAll()', function( assert )
    {
    var list = new LinkedList( 1, 1, 1 );

    list.replaceAll( 1, -1 );

    testList( assert, list, [ -1, -1, -1 ] );
    });
QUnit.test( 'get()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( 1 );
    list.addEnd( 2 );
    list.addEnd( 3 );

    assert.deepEqual( list.get( 0 )!.value, 1 );
    assert.deepEqual( list.get( 1 )!.value, 2 );
    assert.deepEqual( list.get( 2 )!.value, 3 );
    assert.deepEqual( list.get( 3 ), undefined );
    });
QUnit.test( 'find()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( 2 );
    list.addEnd( 4 );
    list.addEnd( 6 );

    assert.deepEqual( list.find( 2 )!.value, 2 );
    assert.deepEqual( list.find( 4 )!.value, 4 );
    assert.deepEqual( list.find( 6 )!.value, 6 );
    assert.deepEqual( list.find( 8 ), undefined );
    });
QUnit.test( 'findAll()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( 1 );
    list.addEnd( 2 );
    list.addEnd( 2 );
    list.addEnd( 3 );

    var result = list.findAll( 2 );

    assert.deepEqual( result.length, 2 );
    });
QUnit.test( 'toArray()', function( assert )
    {
    var list = new LinkedList();

    list.addEnd( -5 );
    list.addEnd( -1 );
    list.addEnd( 1 );
    list.addEnd( 5 );

    assert.deepEqual( list.toArray(), [ -5, -1, 1, 5 ] );
    });
QUnit.test( 'merge()', function( assert )
    {
        // empty lists
    var list1 = new LinkedList();
    var list2 = new LinkedList();

    list1.merge( list2 );
    testList( assert, list1, [] );

        // empty list1
    list1 = new LinkedList();
    list2 = new LinkedList();

    list2.addEnd( 1 );
    list2.addEnd( 2 );

    list1.merge( list2 );
    testList( assert, list1, [ 1, 2 ] );

        // empty list2
    list1 = new LinkedList();
    list2 = new LinkedList();

    list1.addEnd( 3 );
    list1.addEnd( 4 );

    list1.merge( list2 );
    testList( assert, list1, [ 3, 4 ] );

        // merge non-empty lists
    list1 = new LinkedList();
    list2 = new LinkedList();

    list1.addEnd( 1 );
    list2.addEnd( 2 );
    list2.addEnd( 3 );
    list1.merge( list2 );
    testList( assert, list1, [ 1, 2, 3 ] );
    });
QUnit.test( 'mergeAfterPosition()', function( assert )
    {
        // empty lists
    var list1 = new LinkedList();
    var list2 = new LinkedList();

    list1.mergeAfterPosition( list2, 0 );
    testList( assert, list1, [] );

        // empty list1
    list1 = new LinkedList();
    list2 = new LinkedList();

    list2.addEnd( 1 );
    list1.mergeAfterPosition( list2, 10 );
    testList( assert, list1, [ 1 ] );

        // empty list2
    list1 = new LinkedList();
    list2 = new LinkedList();

    list1.addEnd( 1 );
    list1.addEnd( 2 );
    list1.mergeAfterPosition( list2, 1 );
    testList( assert, list1, [ 1, 2 ] );

        // add at the end
    list1 = new LinkedList();
    list2 = new LinkedList();

    list1.addEnd( 1 );
    list1.addEnd( 2 );
    list2.addEnd( 3 );
    list2.addEnd( 4 );
    list1.mergeAfterPosition( list2, 1 );
    testList( assert, list1, [ 1, 2, 3, 4 ] );

        // add in the middle
    list1 = new LinkedList();
    list2 = new LinkedList();

    list1.addEnd( 1 );
    list1.addEnd( 2 );
    list2.addEnd( 3 );
    list2.addEnd( 4 );
    list1.mergeAfterPosition( list2, 0 );
    testList( assert, list1, [ 1, 3, 4, 2 ] );
    });
