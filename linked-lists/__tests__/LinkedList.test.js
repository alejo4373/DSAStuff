let { LinkedList } = require('../LinkedList');
let testLinkedList;

const fillLinkedList = () => {
  testLinkedList = new LinkedList(0);
  for (let i = 1; i < 11; i++) {
    testLinkedList.appendToEnd(i);
  }
}

beforeEach(() => {
  fillLinkedList()
})

test('10 elements were added appending to the end', () => {
  expect(testLinkedList.printHumanReadable()).toBe('0->1->2->3->4->5->6->7->8->9->10->null')
});

test('10 elements were appended first', () => {
  testLinkedList = new LinkedList(0);
  for (let i = 1; i < 11; i++) {
    testLinkedList.appendFirst(i);
  }
  expect(testLinkedList.printHumanReadable()).toBe('10->9->8->7->6->5->4->3->2->1->0->null')
});

test('Creates a new LinkedList and adds number 100 at "index" 5', () => {
  testLinkedList.appendAtIndex(5, 100);
  expect(testLinkedList.atIndex(5)).toBe(100);
})

test('Trying to add number 100 at an out of bounds "index" 20 results adding at the end(tail)', () => {
  testLinkedList.appendAtIndex(20, 100);
  expect(testLinkedList.tail.data).toBe(100);
});

test('.find() node with data 5 in the linked list and nonexistent node ', () => {
  let node = testLinkedList.find((n) => n.data === 5);
  let nonexistentNode = testLinkedList.find((n) => n.data === 500);
  expect(node.data).toBe(5);
  expect(nonexistentNode).toBeUndefined();
});

test('Remove first element(head)', () => {
  let removedNode = testLinkedList.removeFirst();
  expect(removedNode.data).toBe(0); 
  expect(removedNode.next).toBeNull(); // Should it 'truly' remove by removing its reference to the rest of the link list?
  expect(testLinkedList.printHumanReadable()).toBe('1->2->3->4->5->6->7->8->9->10->null');
});

test('Remove last element and reassign tail', () => {
  let removedNode = testLinkedList.removeLast();
  expect(removedNode.data).toBe(10);
  expect(testLinkedList.printHumanReadable()).toBe('0->1->2->3->4->5->6->7->8->9->null');
});

test('Empty list removing first element)', () => {
  while(testLinkedList.head !== null) {
    testLinkedList.removeFirst();
  }
  expect(testLinkedList.head).toBeNull();
  expect(() => testLinkedList.printHumanReadable()).toThrowError('Error empty list. Nothing to print');
});