QUnit.module( 'Binary Tree' );

function getTree()
    {
    var root;

    root = BinaryTree.insert( root, 2 );
    root = BinaryTree.insert( root, 3 );
    root = BinaryTree.insert( root, 1 );
    root = BinaryTree.insert( root, 4 );

    return root;
    }


QUnit.test( 'Node class', function( assert )
    {
    var node = { value: 1 };

    assert.deepEqual( node.value, 1 );
    });
QUnit.test( 'insert()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( root.value, 2 );
    assert.deepEqual( root.left!.value, 1 );
    assert.deepEqual( root.right!.value, 3 );
    assert.deepEqual( root.right!.right!.value, 4 );
    });
QUnit.test( 'find()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.find( root, 1 )!.value, 1 );
    assert.deepEqual( BinaryTree.find( root, 2 )!.value, 2 );
    assert.deepEqual( BinaryTree.find( root, 3 )!.value, 3 );
    assert.deepEqual( BinaryTree.find( root, 4 )!.value, 4 );
    assert.deepEqual( BinaryTree.find( root, 5 ), undefined );
    });
QUnit.test( 'findMin()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.findMin( root )!.value, 1 );
    });
QUnit.test( 'findMax()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.findMax( root )!.value, 4 );
    });
QUnit.test( 'getValues()', function( assert )
    {
    var root = getTree();
    var values = BinaryTree.getValues( root );
    var valuesString = values.join( ' ' );

    assert.deepEqual( valuesString, '1 2 3 4' );
    });
QUnit.test( 'getNumberOfNodes()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.getNumberOfNodes( root ), 4 );
    });
QUnit.test( 'maxDepth()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.maxDepth( root ), 3 );
    });
QUnit.test( 'mirror()', function( assert )
    {
    var root = getTree();

    BinaryTree.mirror( root );

    assert.deepEqual( root.left!.value, 3 );
    assert.deepEqual( root.right!.value, 1 );
    });
QUnit.test( 'isEquivalentTree()', function( assert )
    {
    var root1 = getTree();
    var root2 = getTree();

    assert.deepEqual( BinaryTree.isEquivalentTree( root1, root2 ), true );

    root2 = BinaryTree.insert( root2, -1 );

    assert.deepEqual( BinaryTree.isEquivalentTree( root1, root2 ), false );
    });
QUnit.test( 'isBinarySearchTree()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.isBinarySearchTree( root ), true );

    root.value = 100;

    assert.deepEqual( BinaryTree.isBinarySearchTree( root ), false );
    });
QUnit.test( 'forEach()', function( assert )
    {
    var root = getTree();
    var values = [ 1, 2, 3, 4 ];
    var a = 0;

    BinaryTree.forEach( root, function( node )
        {
        assert.deepEqual( node.value, values[ a ] );

        a++;
        });
    });
QUnit.test( 'remove()', function( assert )
    {
    var root = getTree();

    assert.deepEqual( BinaryTree.getNumberOfNodes( root ), 4 );

    BinaryTree.remove( root, root.right! );

    assert.deepEqual( BinaryTree.getNumberOfNodes( root ), 3 );
    assert.deepEqual( root.right!.value, 4 );
    });