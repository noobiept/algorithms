var ListNode = (function () {
    function ListNode(value) {
        this.value = value;
        this.previous = null;
        this.next = null;
    }
    return ListNode;
})();
var LinkedList = (function () {
    function LinkedList() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    /**
     * Add a value at the beginning of the list.
     */
    LinkedList.prototype.addStart = function (value) {
        var node = new ListNode(value);
        if (this.first) {
            node.next = this.first;
            this.first.previous = node;
            this.first = node;
        }
        else {
            this.first = this.last = node;
        }
        this.length++;
        return node;
    };
    /**
     * Add a value at the end of the list.
     */
    LinkedList.prototype.addEnd = function (value) {
        var node = new ListNode(value);
        if (this.last) {
            node.previous = this.last;
            this.last.next = node;
            this.last = node;
        }
        else {
            this.first = this.last = node;
        }
        this.length++;
        return node;
    };
    /**
     * Add a new value in the position after the given node.
     */
    LinkedList.prototype.addAfter = function (referenceNode, value) {
        var node = new ListNode(value);
        var next = referenceNode.next;
        node.previous = referenceNode;
        node.next = next;
        referenceNode.next = node;
        if (next) {
            next.previous = node;
        }
        else {
            this.last = node;
        }
        this.length++;
        return node;
    };
    /**
     * Add a new value in the position before the given node.
     */
    LinkedList.prototype.addBefore = function (referenceNode, value) {
        var node = new ListNode(value);
        var previous = referenceNode.previous;
        node.previous = previous;
        node.next = referenceNode;
        referenceNode.previous = node;
        if (previous) {
            previous.next = node;
        }
        else {
            this.first = node;
        }
        this.length++;
        return node;
    };
    /**
     * Add a new value after the given node position.
     */
    LinkedList.prototype.addAfterPosition = function (referencePosition, value) {
        var node = this.get(referencePosition);
        if (node) {
            return this.addAfter(node, value);
        }
        return null;
    };
    /**
     * Add a new value before the given node position.
     */
    LinkedList.prototype.addBeforePosition = function (referencePosition, value) {
        var node = this.get(referencePosition);
        if (node) {
            return this.addBefore(node, value);
        }
        return null;
    };
    /**
     * Remove the given node from the list.
     */
    LinkedList.prototype.remove = function (node) {
        var previous = node.previous;
        var next = node.next;
        if (previous === null) {
            this.first = next;
        }
        else {
            previous.next = next;
        }
        if (next === null) {
            this.last = previous;
        }
        else {
            next.previous = previous;
        }
        this.length--;
        return node;
    };
    /**
     * Remove the node in the given position.
     */
    LinkedList.prototype.removePosition = function (position) {
        var node = this.get(position);
        if (node) {
            return this.remove(node);
        }
        return null;
    };
    /**
     * Remove the first node on the list.
     */
    LinkedList.prototype.removeFirst = function () {
        var node = this.first;
        if (node) {
            var next = node.next;
            this.first = next;
            this.length--;
            if (next) {
                next.previous = null;
                if (!next.next) {
                    this.last = next;
                }
            }
            else {
                this.last = null;
            }
        }
        return node;
    };
    /**
     * Remove the last node of the list.
     */
    LinkedList.prototype.removeLast = function () {
        var node = this.last;
        if (node) {
            var previous = node.previous;
            this.last = previous;
            this.length--;
            if (previous) {
                previous.next = null;
                if (!previous.previous) {
                    this.first = previous;
                }
            }
            else {
                this.first = null;
            }
        }
        return node;
    };
    /**
     * Remove the first node that has the given value.
     */
    LinkedList.prototype.removeValue = function (value) {
        var node = this.first;
        while (node) {
            if (node.value === value) {
                return this.remove(node);
            }
            node = node.next;
        }
        return null;
    };
    /**
     * Check if there is a node with the same value.
     */
    LinkedList.prototype.hasValue = function (value) {
        var node = this.first;
        while (node) {
            if (node.value === value) {
                return true;
            }
            node = node.next;
        }
        return false;
    };
    /**
     * Check if a given node is present in the list.
     */
    LinkedList.prototype.hasNode = function (node) {
        var tempNode = this.first;
        while (tempNode) {
            if (tempNode === node) {
                return true;
            }
            tempNode = tempNode.next;
        }
        return false;
    };
    /**
     * Replace a value for another. Only in the first node found.
     */
    LinkedList.prototype.replace = function (searchValue, replaceValue) {
        var node = this.first;
        while (node) {
            if (node.value === searchValue) {
                node.value = replaceValue;
                return node;
            }
            node = node.next;
        }
        return null;
    };
    /**
     * Replace a value for another. Searches through all the list nodes.
     */
    LinkedList.prototype.replaceAll = function (searchValue, replaceValue) {
        var node = this.first;
        var replaced = [];
        while (node) {
            if (node.value === searchValue) {
                node.value = replaceValue;
                replaced.push(node);
            }
            node = node.next;
        }
        return replaced;
    };
    /**
     * Get a node on the given position.
     */
    LinkedList.prototype.get = function (position) {
        var node = this.first;
        var a = 0;
        while (node) {
            if (position === a) {
                return node;
            }
            node = node.next;
            a++;
        }
        return null;
    };
    /**
     * Find a node by value. Returns the first one it finds.
     */
    LinkedList.prototype.find = function (value) {
        var node = this.first;
        while (node) {
            if (node.value === value) {
                return node;
            }
            node = node.next;
        }
        return null;
    };
    /**
     * Find all the nodes that have the given value.
     */
    LinkedList.prototype.findAll = function (value) {
        var node = this.first;
        var all = [];
        while (node) {
            if (node.value === value) {
                all.push(node);
            }
            node = node.next;
        }
        return all;
    };
    /**
     * Returns an array with the list's values.
     */
    LinkedList.prototype.toArray = function () {
        var node = this.first;
        var all = [];
        while (node) {
            all.push(node.value);
            node = node.next;
        }
        return all;
    };
    /**
     * Merge list2 at the end of list1.
     * The node objects from list2 are reused, so probably best not to use the list2 after.
     */
    LinkedList.prototype.merge = function (list2) {
        var last1 = this.last;
        var first2 = list2.first;
        // check if list2 has any elements
        if (first2) {
            // check if list1 has any elements as well
            if (last1) {
                last1.next = first2;
                first2.previous = last1;
                this.last = list2.last;
                this.length += list2.length;
            }
            else {
                this.first = list2.first;
                this.last = list2.last;
                this.length = list2.length;
            }
        }
        return this;
    };
    /**
     * Merge list2 at a given position in list1.
     * The node objects from list2 are reused, so probably best not to use the list2 after.
     */
    LinkedList.prototype.mergeAfterPosition = function (list2, position) {
        if (position < 0) {
            position = 0;
        }
        var first2 = list2.first;
        var start1 = this.first;
        // list2 is empty
        if (!first2) {
            return this;
        }
        // list1 is empty
        if (!start1) {
            this.first = list2.first;
            this.last = list2.last;
            this.length = list2.length;
            return this;
        }
        var a = 0;
        while (start1.next) {
            if (a === position) {
                break;
            }
            a++;
            start1 = start1.next;
        }
        var next1 = start1.next;
        start1.next = first2;
        first2.previous = start1;
        // check if start1 isn't the last element in list1
        if (next1) {
            var last2 = list2.last;
            next1.previous = last2;
            last2.next = next1;
        }
        else {
            this.last = list2.last;
        }
        this.length += list2.length;
        return this;
    };
    return LinkedList;
})();
