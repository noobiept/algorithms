var BinaryTree;
(function (BinaryTree) {
    /**
     * Tree nodes.
     */
    var Node = (function () {
        function Node(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
        return Node;
    })();
    BinaryTree.Node = Node;
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
    function insert(node, value) {
        if (!node) {
            return new Node(value);
        }
        if (value < node.value) {
            node.left = insert(node.left, value);
        }
        else {
            node.right = insert(node.right, value);
        }
        return node;
    }
    BinaryTree.insert = insert;
    /**
     * Find a node which has the same value.
     */
    function find(node, value) {
        if (!node) {
            return null;
        }
        if (value === node.value) {
            return node;
        }
        else if (value < node.value) {
            return find(node.left, value);
        }
        else {
            return find(node.right, value);
        }
    }
    BinaryTree.find = find;
    /**
     * Return the left-most node in the tree (that has the lowest value).
     */
    function findMin(node) {
        if (!node) {
            return null;
        }
        while (node.left) {
            node = node.left;
        }
        return node;
    }
    BinaryTree.findMin = findMin;
    /**
     * Return the right-most node in the tree (that has the highest value).
     */
    function findMax(node) {
        if (!node) {
            return null;
        }
        while (node.right) {
            node = node.right;
        }
        return node;
    }
    BinaryTree.findMax = findMax;
    /**
     * Returns an array with all the values of the tree.
     */
    function getValues(node, list) {
        if (!node) {
            return;
        }
        if (typeof list === 'undefined') {
            list = [];
        }
        if (node.left) {
            getValues(node.left, list);
        }
        list.push(node.value);
        if (node.right) {
            getValues(node.right, list);
        }
        return list;
    }
    BinaryTree.getValues = getValues;
    /**
     * Return the total number of nodes in the tree.
     */
    function getNumberOfNodes(node) {
        if (!node) {
            return 0;
        }
        return 1 + getNumberOfNodes(node.left) + getNumberOfNodes(node.right);
    }
    BinaryTree.getNumberOfNodes = getNumberOfNodes;
    /**
     * Number of nodes in the longest path from the root node.
     */
    function maxDepth(node) {
        if (!node) {
            return 0;
        }
        var left = 1 + maxDepth(node.left);
        var right = 1 + maxDepth(node.right);
        if (right > left) {
            return right;
        }
        else {
            return left;
        }
    }
    BinaryTree.maxDepth = maxDepth;
    /**
     * Switch the left nodes with the right nodes.
     */
    function mirror(node) {
        if (!node) {
            return null;
        }
        var temp = node.left;
        node.left = node.right;
        node.right = temp;
        mirror(node.left);
        mirror(node.right);
    }
    BinaryTree.mirror = mirror;
    /**
     * Check if both trees have the same nodes/values.
     */
    function isEquivalentTree(node1, node2) {
        if (!node1) {
            if (!node2) {
                return true;
            }
            else {
                return false;
            }
        }
        if (node1.value !== node2.value) {
            return false;
        }
        var left = isEquivalentTree(node1.left, node2.left);
        var right = isEquivalentTree(node1.right, node2.right);
        if (!left || !right) {
            return false;
        }
        return true;
    }
    BinaryTree.isEquivalentTree = isEquivalentTree;
    /**
     * Its a binary search tree if the values are sorted.
     */
    function isBinarySearchTree(node) {
        var left = true;
        var right = true;
        if (node.left) {
            if (node.left.value > node.value) {
                return false;
            }
            left = isBinarySearchTree(node.left);
        }
        if (node.right) {
            if (node.right.value < node.value) {
                return false;
            }
            right = isBinarySearchTree(node.right);
        }
        if (left && right) {
            return true;
        }
        return false;
    }
    BinaryTree.isBinarySearchTree = isBinarySearchTree;
    /**
     * Traverse the tree. Call the given function on every node that is part of the tree.
     */
    function forEach(node, callback) {
        if (!node) {
            return;
        }
        forEach(node.left, callback);
        callback(node);
        forEach(node.right, callback);
    }
    BinaryTree.forEach = forEach;
    /**
     * Remove a node from the tree.
     */
    function remove(root, node) {
        if (root.left === node) {
            root.left = node.left;
            var max = findMax(node.left);
            max.right = node.right;
            return;
        }
        if (root.right === node) {
            root.right = node.right;
            var min = findMin(node.right);
            min.left = node.left;
            return;
        }
        remove(root.left, node);
        remove(root.right, node);
    }
    BinaryTree.remove = remove;
})(BinaryTree || (BinaryTree = {}));
