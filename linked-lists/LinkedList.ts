/**
 * Creates a node that will hold payload and a reference to next
 * @class 
 */
export class LinkedListNode {
  next: LinkedListNode = null;
  payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

/**
 * Creates a LinkedList that will hold references to the head and tail nodes
 * which allows to have constant time insertion in both ends of the list
 * @class 
 */
export class LinkedList {
  head: LinkedListNode = null;
  tail: LinkedListNode = null;

  appendFirst(payload: any): void {
    let newHead: LinkedListNode = new LinkedListNode(payload);
    newHead.next = this.head;
    //If the LL is empty set tail as well
    if(this.head === null) {
      this.tail = newHead;
    }
    this.head = newHead;
  }

  appendToEnd(payload: any): void {
    let newNode : LinkedListNode = new LinkedListNode(payload);
    //If the LL is empty set head and tail
    if(this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode
    }
  }

  appendAtIndex(index: number, payload: any): void {
    let crrIndex: number = 0; // kind of indexing linked list like arrays
    let newNode: LinkedListNode = new LinkedListNode(payload);
    let node: LinkedListNode = this.head;
    if (index !== 0) {
      while (node.next !== null && crrIndex !== index - 1) {
        node = node.next;
        crrIndex += 1;
      }
        newNode.next = node.next;
        node.next = newNode;
      //Check if were at the tail to update this.tail
      if(newNode.next === null) { 
        this.tail = newNode
      }
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  removeFirst(): LinkedListNode {
    let oldHead: LinkedListNode = this.head
    // Only in case we are removing the last/only node left in the list
    // set head to null
    if(oldHead.next === null) {
      this.head = null;
      this.tail = null;
      return oldHead.payload
    }
    let newHead: LinkedListNode = oldHead.next;
    oldHead.next = null // Should it 'truly' remove by removing its reference to the rest of the link?
    this.head = newHead;
    return oldHead.payload;
  }

  removeLast(): LinkedListNode {
    let node: LinkedListNode = this.head;
    let oldTail: LinkedListNode = this.tail;
    // Removing last node when there is only one
    if(node.next === null) {
      this.tail = null;
      this.head = null;
      return node;
    }
    while(node.next.next !== null) {
      node = node.next;
    }
    node.next = null;
    this.tail = node;
    return oldTail.payload;
  } 
  /**
   * Finds node that satisfies the callback test 
   * @param callback function to execute on each node, taking the current node as argument
   * @returns {LinkedListNode} that satisfies the provided testing function. Otherwise undefined
   */
  find(callback: Function): LinkedListNode {
    let crrNode: LinkedListNode = this.head
    while(crrNode.next !== null) {
      if(callback(crrNode)) {
        return crrNode.payload;
      }
      crrNode = crrNode.next;
    }
    return undefined;
  }

  printHumanReadable(): string {
    if(this.head !== null) {
      let node: LinkedListNode = this.head;
      let result: string = node.payload + '->'
      while (node.next !== null) {
        result += node.next.payload + '->';
        node = node.next;
      }
      return result + null
    }
    throw new Error('Error empty list. Nothing to print')
  }

  atIndex(index: number): any {
    let node: LinkedListNode = this.head;
    let i: number = 0;
    while (i < index) {
      node = node.next;
      i += 1;
    }
    return node.payload
  }

  fromArray(array: Array<number>): LinkedList {
    let ll: LinkedList = new LinkedList();
    for (let element of array) {
      ll.appendToEnd(element);
    }
    return ll;
  }
}