module BinaryTree
{
/**
 * Tree nodes.
 */
export class Node
    {
    left: Node | null;
    right: Node | null;
    value: number;

    constructor( value: number )
        {
        this.value = value;
        this.left = null;
        this.right = null;
        }
    }


/**
 * Insert a value into a tree.
 *
 *     var root;
 *
 *     root = BinaryTree.insert( root, 2 );
 *     root = BinaryTree.insert( root, 3 );
 *     root = BinaryTree.insert( root, 1 );
 *
 * @param node The root node.
 * @param value The value to be added.
 */
export function insert( node: Node | null, value: number ): Node
    {
    if ( !node )
        {
        return new Node( value );
        }


    if ( value < node.value )
        {
        node.left = insert( node.left, value );
        }

    else
        {
        node.right = insert( node.right, value );
        }

    return node;
    }


/**
 * Find a node which has the same value.
 */
export function find( node: Node | null, value: number ): Node | null
    {
    if ( !node )
        {
        return null;
        }

    if ( value === node.value )
        {
        return node;
        }

    else if ( value < node.value )
        {
        return find( node.left, value );
        }

    else
        {
        return find( node.right, value );
        }
    }


/**
 * Return the left-most node in the tree (that has the lowest value).
 */
export function findMin( node: Node | null ): Node | null
    {
    if ( !node )
        {
        return null;
        }

    while( node.left )
        {
        node = node.left;
        }

    return node;
    }


/**
 * Return the right-most node in the tree (that has the highest value).
 */
export function findMax( node: Node | null ): Node | null
    {
    if ( !node )
        {
        return null;
        }

    while( node.right )
        {
        node = node.right;
        }

    return node;
    }


/**
 * Returns an array with all the values of the tree.
 */
export function getValues( node: Node, list?: number[] ): number[]
    {
    if ( !node )
        {
        return [];
        }

    if ( typeof list === 'undefined' )
        {
        list = [];
        }


    if ( node.left )
        {
        getValues( node.left, list );
        }


    list.push( node.value );


    if ( node.right )
        {
        getValues( node.right, list );
        }

    return list;
    }


/**
 * Return the total number of nodes in the tree.
 */
export function getNumberOfNodes( node: Node | null ): number
    {
    if ( !node )
        {
        return 0;
        }

    return 1 + getNumberOfNodes( node.left ) + getNumberOfNodes( node.right );
    }


/**
 * Number of nodes in the longest path from the root node.
 */
export function maxDepth( node: Node | null ): number
    {
    if ( !node )
        {
        return 0;
        }


    var left = 1 + maxDepth( node.left );
    var right = 1 + maxDepth( node.right );

    if ( right > left )
        {
        return right;
        }

    else
        {
        return left;
        }
    }


/**
 * Switch the left nodes with the right nodes.
 */
export function mirror( node: Node | null ): void
    {
    if ( !node )
        {
        return;
        }

    var temp = node.left;

    node.left = node.right;
    node.right = temp;

    mirror( node.left );
    mirror( node.right );
    }


/**
 * Check if both trees have the same nodes/values.
 */
export function isEquivalentTree( node1: Node | null, node2: Node | null ): boolean
    {
    if ( !node1 && !node2 )
        {
        return true;
        }

    else if ( node1 && node2 )
        {
        if ( node1.value !== node2.value )
            {
            return false;
            }

        var left = isEquivalentTree( node1.left, node2.left );
        var right = isEquivalentTree( node1.right, node2.right );

        if ( !left || !right )
            {
            return false;
            }

        return true;
        }

    return false;
    }


/**
 * Its a binary search tree if the values are sorted.
 */
export function isBinarySearchTree( node: Node ): boolean
    {
    var left = true;
    var right = true;

    if ( node.left )
        {
        if ( node.left.value > node.value )
            {
            return false;
            }

        left = isBinarySearchTree( node.left );
        }

    if ( node.right )
        {
        if ( node.right.value < node.value )
            {
            return false;
            }

        right = isBinarySearchTree( node.right );
        }


    if ( left && right )
        {
        return true;
        }

    return false;
    }


/**
 * Traverse the tree. Call the given function on every node that is part of the tree.
 */
export function forEach( node: Node | null, callback: (node: Node) => any ): void
    {
    if ( !node )
        {
        return;
        }

    forEach( node.left, callback );
    callback( node );
    forEach( node.right, callback );
    }


/**
 * Remove a node from the tree.
 */
export function remove( root: Node | null, node: Node ): void
    {
    if ( !root )
        {
        return;
        }

    if ( root.left === node )
        {
        root.left = node.left;

        var max = findMax( node.left );

        if ( max )
            {
            max.right = node.right;
            }

        else
            {
            root.left = node.right;
            }

        return;
        }

    if ( root.right === node )
        {
        root.right = node.right;

        var min = findMin( node.right );

        if ( min )
            {
            min.left = node.left;
            }

        else
            {
            root.left = node.right;
            }

        return;
        }

    remove( root.left, node );
    remove( root.right, node );
    }
}