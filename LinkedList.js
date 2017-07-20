class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /** Add nodes with given value.

  Strategy: Since we have access to tail, append newly created Node to tail and move tail pointer to new node.
  
  Edge case: empty list

  @param {*} value - value to be inserted into new node
  @return {bool|string} - informs user that push was successful | edge case message

  Time complexity: O(1)
  Space complexity: O(1)
  */
  push(value) {
    if (value === null || value === undefined) {
      return 'Please don\'t push silly values :)';
    }

    const node = new Node(value);
    this.size++;

    // Edge case: empty list
    if (this.head === null) {
      this.head = this.tail = node;
      return true;
    }
    
    this.tail.next = node;
    this.tail = node;
    return true;
  }

  /** Check if node with given value exists in instance of LinkedList.

  Strategy: Loop through LL checking if value of node equals input value. End loop when we reach the last node based on node's next value.

  @param {*} value - checked if exists in list
  @return {bool} - whether or not value exists in list

  Time complexity: O(N)
  Space complexity: O(1)
  */  
  contains(value) {
    let curr = this.head;
    while (curr !== null) {
      if (curr.value === value) { return true; }
      curr = curr.next;
    }

    return false;
  }

  /** Remove nodes with given value from instance of LinkedList.

  Strategy: Loop through LL tracking previous and current nodes so you can remove reference to target node by pointing prev's next at current's next. Only removes first match.
  
  Edge cases: empty list, remove head or tail, remove final node.

  @param {*} value - value to be removed from list
  @return {object|string} - node removed | edge case message
  
  Time complexity: O(N)
  Space complexity: O(1)
  */
  remove(value) {
    // Edge case: empty list
    if (this.size === 0) { return 'list already empty'; }

    // Edge case: if head matches, need to update head
    if (this.head.value === value) {
      const node = this.head;
      this.head = this.head.next;

      // Edge case: if removing final node in list
      if (this.size === 1) { this.tail = null; }

      this.size--;
      return node;
    }

    let prev = this.head;
    let curr = this.head.next;

    while (curr !== null) {
      if (curr.value === value) {

        // Edge case: if tail matches, need to update tail
        if (curr === this.tail) { this.tail = prev; }

        const node = curr;
        prev.next = curr.next;
        this.size--;
        return node;
      }

      prev = curr;
      curr = curr.next;
    }

    return 'Value does not exist in list';
  }
}


const list = new LinkedList();
list.push(1);
list.push(2);
console.log(list.contains(2));
list.push(3);
list.remove(3);
console.log(list.contains(2));
console.log(list);

const list2 = new LinkedList();
list2.push('I am alone');
list2.remove('I am alone');
console.log(list2);

const list3 = new LinkedList();
list3.push(1);
list3.push('I will survive');
list3.remove(1);
console.log(list3);

const list4 = new LinkedList();
list4.push('I will survive');
list4.push(2);
list4.remove(2);
console.log(list4);

const notRemoved = new LinkedList();
notRemoved.push(1);
console.log(notRemoved.remove('Does not exist'));
console.log(notRemoved);