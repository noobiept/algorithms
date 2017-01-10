interface ListNode<ValueType>
    {
    previous?: ListNode<ValueType>;
    next?: ListNode<ValueType>;
    value: ValueType;
    }


class LinkedList<ValueType>
    {
    first?: ListNode<ValueType>;
    last?: ListNode<ValueType>;
    length: number;


    constructor()
        {
        this.length = 0;
        }


    /**
     * Add a value at the beginning of the list.
     */
    addStart( value: ValueType ): ListNode<ValueType>
        {
        var node: ListNode<ValueType> = { value: value };

        if ( this.first )
            {
            node.next = this.first;
            this.first.previous = node;

            this.first = node;
            }

        else
            {
            this.first = this.last = node;
            }

        this.length++;

        return node;
        }


    /**
     * Add a value at the end of the list.
     */
    addEnd( value: ValueType ): ListNode<ValueType>
        {
        var node: ListNode<ValueType> = { value: value };

        if ( this.last )
            {
            node.previous = this.last;
            this.last.next = node;

            this.last = node;
            }

        else
            {
            this.first = this.last = node;
            }

        this.length++;

        return node;
        }


    /**
     * Add a new value in the position after the given node.
     */
    addAfter( referenceNode: ListNode<ValueType>, value: ValueType ): ListNode<ValueType>
        {
        var node: ListNode<ValueType> = { value: value };
        var next = referenceNode.next;

        node.previous = referenceNode;
        node.next = next;
        referenceNode.next = node;

        if ( next )
            {
            next.previous = node;
            }

            // means the reference node is the last node
        else
            {
            this.last = node;
            }

        this.length++;

        return node;
        }


    /**
     * Add a new value in the position before the given node.
     */
    addBefore( referenceNode: ListNode<ValueType>, value: ValueType ): ListNode<ValueType>
        {
        var node: ListNode<ValueType> = { value: value };
        var previous = referenceNode.previous;

        node.previous = previous;
        node.next = referenceNode;
        referenceNode.previous = node;

        if ( previous )
            {
            previous.next = node;
            }

        else
            {
            this.first = node;
            }

        this.length++;

        return node;
        }


    /**
     * Add a new value after the given node position.
     */
    addAfterPosition( referencePosition: number, value: ValueType ): ListNode<ValueType> | undefined
        {
        var node = this.get( referencePosition );

        if ( node )
            {
            return this.addAfter( node, value );
            }

        return undefined;
        }


    /**
     * Add a new value before the given node position.
     */
    addBeforePosition( referencePosition: number, value: ValueType ): ListNode<ValueType> | undefined
        {
        var node = this.get( referencePosition );

        if ( node )
            {
            return this.addBefore( node, value );
            }

        return undefined;
        }


    /**
     * Remove the given node from the list.
     */
    remove( node: ListNode<ValueType> ): ListNode<ValueType>
        {
        var previous = node.previous;
        var next = node.next;

        if ( !previous )
            {
            this.first = next;
            }

        else
            {
            previous.next = next;
            }


        if ( !next )
            {
            this.last = previous;
            }

        else
            {
            next.previous = previous;
            }


        this.length--;

        return node;
        }


    /**
     * Remove the node in the given position.
     */
    removePosition( position: number ): ListNode<ValueType> | undefined
        {
        var node = this.get( position );

        if ( node )
            {
            return this.remove( node );
            }

        return undefined;
        }


    /**
     * Remove the first node on the list.
     */
    removeFirst(): ListNode<ValueType> | undefined
        {
        var node = this.first;

        if ( node )
            {
            var next = node.next;
            this.first = next;
            this.length--;

            if ( next )
                {
                next.previous = undefined;

                if ( !next.next )
                    {
                    this.last = next;
                    }
                }

            else
                {
                this.last = undefined;
                }
            }

        return node;
        }


    /**
     * Remove the last node of the list.
     */
    removeLast(): ListNode<ValueType> | undefined
        {
        var node = this.last;

        if ( node )
            {
            var previous = node.previous;
            this.last = previous;
            this.length--;

            if ( previous )
                {
                previous.next = undefined;

                if ( !previous.previous )
                    {
                    this.first = previous;
                    }
                }

            else
                {
                this.first = undefined;
                }
            }

        return node;
        }


    /**
     * Remove the first node that has the given value.
     */
    removeValue( value: ValueType ): ListNode<ValueType> | undefined
        {
        var node = this.first;

        while( node )
            {
            if ( node.value === value )
                {
                return this.remove( node );
                }

            node = node.next;
            }

        return undefined;
        }


    /**
     * Check if there is a node with the same value.
     */
    hasValue( value: ValueType ): boolean
        {
        var node = this.first;

        while( node )
            {
            if ( node.value === value )
                {
                return true;
                }

            node = node.next;
            }

        return false;
        }


    /**
     * Check if a given node is present in the list.
     */
    hasNode( node: ListNode<ValueType> ): boolean
        {
        var tempNode = this.first;

        while( tempNode )
            {
            if ( tempNode === node )
                {
                return true;
                }

            tempNode = tempNode.next;
            }

        return false;
        }


    /**
     * Replace a value for another. Only in the first node found.
     */
    replace( searchValue: ValueType, replaceValue: ValueType ): ListNode<ValueType> | undefined
        {
        var node = this.first;

        while( node )
            {
            if ( node.value === searchValue )
                {
                node.value = replaceValue;
                return node;
                }

            node = node.next;
            }

        return undefined;
        }


    /**
     * Replace a value for another. Searches through all the list nodes.
     */
    replaceAll( searchValue: ValueType, replaceValue: ValueType ): ListNode<ValueType>[]
        {
        var node = this.first;
        var replaced = [];

        while( node )
            {
            if ( node.value === searchValue )
                {
                node.value = replaceValue;
                replaced.push( node );
                }

            node = node.next;
            }


        return replaced;
        }


    /**
     * Get a node on the given position.
     */
    get( position: number ): ListNode<ValueType> | undefined
        {
        var node = this.first;
        var a = 0;

        while( node )
            {
            if ( position === a )
                {
                return node;
                }

            node = node.next;
            a++;
            }

        return undefined;
        }


    /**
     * Find a node by value. Returns the first one it finds.
     */
    find( value: ValueType ): ListNode<ValueType> | undefined
        {
        var node = this.first;

        while( node )
            {
            if ( node.value === value )
                {
                return node;
                }

            node = node.next;
            }

        return undefined;
        }


    /**
     * Find all the nodes that have the given value.
     */
    findAll( value: ValueType ): ListNode<ValueType>[]
        {
        var node = this.first;
        var all = [];

        while( node )
            {
            if ( node.value === value )
                {
                all.push( node );
                }

            node = node.next;
            }

        return all;
        }


    /**
     * Returns an array with the list's values.
     */
    toArray(): ValueType[]
        {
        var node = this.first;
        var all = [];

        while( node )
            {
            all.push( node.value );

            node = node.next;
            }

        return all;
        }


    /**
     * Merge list2 at the end of list1.
     * The node objects from list2 are reused, so probably best not to use the list2 after.
     */
    merge( list2: LinkedList<ValueType> ): this
        {
        var last1 = this.last;
        var first2 = list2.first;

            // check if list2 has any elements
        if ( first2 )
            {
                // check if list1 has any elements as well
            if ( last1 )
                {
                last1.next = first2;
                first2.previous = last1;

                this.last = list2.last;
                this.length += list2.length;
                }

                // list1 doesn't have any elements
            else
                {
                this.first = list2.first;
                this.last = list2.last;
                this.length = list2.length;
                }
            }

        return this;
        }


    /**
     * Merge list2 at a given position in list1.
     * The node objects from list2 are reused, so probably best not to use the list2 after.
     */
    mergeAfterPosition( list2: LinkedList<ValueType>, position: number ): this
        {
        if ( position < 0 )
            {
            position = 0;
            }

        var first2 = list2.first;
        var start1 = this.first;

            // list2 is empty
        if ( !first2 )
            {
            return this;
            }

            // list1 is empty
        if ( !start1 )
            {
            this.first = list2.first;
            this.last = list2.last;
            this.length = list2.length;
            return this;
            }

        var a = 0;

            // find the node associated with the given position (or if not found, add at the end of list1)
        while( start1.next )
            {
            if ( a === position )
                {
                break;
                }

            a++;
            start1 = start1.next;
            }


        var next1 = start1.next;

        start1.next = first2;
        first2.previous = start1;

            // check if start1 isn't the last element in list1
        if ( next1 )
            {
            var last2 = list2.last;

            next1.previous = last2;

            if ( last2 )
                {
                last2.next = next1;
                }
            }

        else
            {
            this.last = list2.last;
            }


        this.length += list2.length;

        return this;
        }
    }