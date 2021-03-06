import { btsBuilder } from '../bstFromSortedArray'
import { sampleBinaryTree, sampleBinarySearchTree, sampleBinaryNonSearchTree } from '../BinaryTreeNode';
import { binarySearch, validBST, findSmallest, findLargest, checkBSTInOrder, checkBSTMinMax } from '../BinarySearch';

describe('bstFromSortedArray', () => {
  it('Returns a binary search tree out of an array', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let rootNode = btsBuilder(values);
    expect(rootNode.val).toBe(5);
    expect(rootNode.left.val).toBe(2);
    expect(rootNode.right.val).toBe(8);

    let traversedInOrder = rootNode.traverseInOrder();
    expect(traversedInOrder).toEqual(values)

    const valuesB = [1, 5, 8, 10, 12, 15, 20, 22, 25, 28, 30, 36, 38, 40, 45, 48, 50]
    let bts = btsBuilder(valuesB);
   expect(bts.traverseInOrder()).toEqual(valuesB);
  })

  it('Verifies nodes have parent property set properly', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let rootNode = btsBuilder(values);
    expect(binarySearch(rootNode, 1).parent.val).toBe(2);
    expect(binarySearch(rootNode, 9).parent.val).toBe(8);
  })

  it('Verifies if a given tree is a BST or not (my original approach)', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let bts = btsBuilder(values);
    let charactersBts = sampleBinarySearchTree();
    let charactersNonBts = sampleBinaryTree();

    expect(validBST(bts)).toBe(true);
    expect(validBST(charactersBts)).toBe(true);
    expect(validBST(charactersNonBts)).toBe(false);
    expect(validBST(sampleBinaryNonSearchTree())).toBe(false);
  })

  it('finds smallest and largest on a BST', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let bts = btsBuilder(values);
    expect(findSmallest(bts).val).toBe(1);
    expect(findLargest(bts).val).toBe(10);
  });

  it('checkBST leveraging in-order traversal', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let bts = btsBuilder(values);
    expect(checkBSTInOrder(bts)).toBe(true);
    expect(checkBSTInOrder(sampleBinarySearchTree())).toBe(true)
    expect(checkBSTInOrder(sampleBinaryTree())).toBe(false)
    expect(checkBSTInOrder(sampleBinaryNonSearchTree())).toBe(false)
  })

  it('checkBST using min and max approach', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    let bts = btsBuilder(values);
    expect(checkBSTMinMax(bts)).toBe(true);
    expect(checkBSTMinMax(sampleBinarySearchTree())).toBe(true)
    expect(checkBSTMinMax(sampleBinaryTree())).toBe(false)
    expect(checkBSTMinMax(sampleBinaryNonSearchTree())).toBe(false)
  })

})

