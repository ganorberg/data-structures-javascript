const expect = require('chai').expect;

let BinarySearchTree;
let BST;

try {
  BinarySearchTree = require('../structures/BinarySearchTree');
  BST = new BinarySearchTree();
} catch (e) {
  throw new Error('BinarySearchTree could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('BinarySearchTree', () => {
  beforeEach(() => {
    BST = new BinarySearchTree();
  });

  it('should be extensible', () => {
    expect(BST).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(BST).to.have.all.keys('root');
  });

  describe('#add()', () => {
    it('should set root to new node with given value', () => {
      BST.add(0);

      expect(BST.root).to.be.an('object');
      expect(BST.root.value).to.equal(0);
    });

    it('should insert a node with value, left and right properties', () => {
      BST.add(0)

      expect(BST.root).to.have.all.keys('value', 'left', 'right');
    });

    it('should append node with given value to BST', () => {
      BST.add(5);
      BST.add(1);
      BST.add(8);
      BST.add(10);
      BST.add(7);

      expect(BST.root.value).to.equal(5);
      expect(BST.root.left.value).to.equal(1);
      expect(BST.root.right.value).to.equal(8);
      expect(BST.root.right.left.value).to.equal(7);
      expect(BST.root.right.right.value).to.equal(10);
    });

    it('should throw an error for duplicate values', () => {
      BST.add(5);
      
      expect(() => BST.add(5)).to.throw(Error);
    });
  });

  describe('#contains()', () => {
    it('should return true if value is in the root', () => {
      BST.add(5);

      expect(BST.contains(5)).to.equal(true);
    });

    it('should return true if value is in left leaf', () => {
      BST.add(5);
      BST.add(1);

      expect(BST.contains(1)).to.equal(true);
    });

    it('should return true if value is in right leaf', () => {
      BST.add(5);
      BST.add(9);

      expect(BST.contains(9)).to.equal(true);
    });

    it('should return true if value is in nested left leaf', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);

      expect(BST.contains(1)).to.equal(true);
    });

    it('should return true if value is in nested right leaf', () => {
      BST.add(5);
      BST.add(7);
      BST.add(9);

      expect(BST.contains(9)).to.equal(true);
    });

    it('should return false if value is not in the tree', () => {
      BST.add(0);

      expect(BST.contains(1)).to.equal(false);
    });

    it('should return false if tree is empty', () => {
      expect(BST.contains(1)).to.equal(false);
    });
  });

  describe('#delete()', () => {
    it('should delete a node from the bottom level of the tree', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(4);

      /*
                  10
                /    \
              5      15
            /   \   
          4      7
        /       / \
       1       6   8
      */
      expect(BST.root.value).to.equal(10);
      expect(BST.root.left.value).to.equal(5);
      expect(BST.root.left.left.value).to.equal(3);
      expect(BST.root.left.left.left.value).to.equal(1);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.right.left.value).to.equal(6);
      expect(BST.root.left.right.right.value).to.equal(8);
      expect(BST.root.right.value).to.equal(15);      
    });

    it('should delete a node from the 2nd-to-last level of the tree', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(3);

      /*
                  10
                /    \
              5      15
            /   \   
          4      7
        /       / \
       1       6   8
      */
      expect(BST.root.value).to.equal(10);
      expect(BST.root.left.value).to.equal(5);
      expect(BST.root.left.left.value).to.equal(4);
      expect(BST.root.left.left.left.value).to.equal(1);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.right.left.value).to.equal(6);
      expect(BST.root.left.right.right.value).to.equal(8);
      expect(BST.root.right.value).to.equal(15);
    });
  
    it('should delete a node from the 3rd-to-last level of the tree', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(5);

      /*
                  10
                /    \
              6      15
            /  \   
          3     7
        /  \     \
       1    4     8
      */
      expect(BST.root.value).to.equal(10);
      expect(BST.root.left.value).to.equal(6);
      expect(BST.root.right.value).to.equal(15);
      expect(BST.root.left.left.value).to.equal(3);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.left.left.value).to.equal(1);
      expect(BST.root.left.left.right.value).to.equal(4);
      expect(BST.root.left.right.right.value).to.equal(8);
    });
  
    it('should delete the root of the tree', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(10);

      /*
                  15
                /
              5
            /   \
          3      7
        / \     / \
       1   4   6   8
      */
      expect(BST.root.value).to.equal(15);
      expect(BST.root.left.value).to.equal(5);
      expect(BST.root.right).to.equal(null);
      expect(BST.root.left.left.value).to.equal(3);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.left.left.value).to.equal(1);
      expect(BST.root.left.left.right.value).to.equal(4);
      expect(BST.root.left.right.left.value).to.equal(6);
      expect(BST.root.left.right.right.value).to.equal(8);
    });

    it('should delete the node containing the minimum value', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(1);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
          \     / \
           4   6   8
      */
      expect(BST.root.value).to.equal(10);
      expect(BST.root.left.value).to.equal(5);
      expect(BST.root.right.value).to.equal(15);
      expect(BST.root.left.left.value).to.equal(3);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.left.left).to.equal(null);
      expect(BST.root.left.left.right.value).to.equal(4);
      expect(BST.root.left.right.left.value).to.equal(6);
      expect(BST.root.left.right.right.value).to.equal(8);
    });

    it('should delete the node containing the maximum value', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);

      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      BST.delete(15);

      /*
                  10
                /
              5
            /   \
          3      7
        / \     / \
       1  4   6   8
      */
      expect(BST.root.value).to.equal(10);
      expect(BST.root.left.value).to.equal(5);
      expect(BST.root.right).to.equal(null);
      expect(BST.root.left.left.value).to.equal(3);
      expect(BST.root.left.right.value).to.equal(7);
      expect(BST.root.left.left.left.value).to.equal(1);
      expect(BST.root.left.left.right.value).to.equal(4);
      expect(BST.root.left.right.left.value).to.equal(6);
      expect(BST.root.left.right.right.value).to.equal(8);
    });

    it('should return the deleted node', () => {
      BST.add(10);
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      BST.add(8);
      BST.add(15);
      
      /*
                  10
                /    \
              5      15
            /   \   
          3      7
        / \     / \
       1   4   6   8
      */

      expect(BST.delete(1)).to.deep.equal({ value: 1, left: null, right: null });
    });

    it('should throw an error for values that do not exist in the tree', () => {
      BST.add(10);

      expect(() => BST.delete(5)).to.throw(Error);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.delete(1)).to.throw(Error);
    });

    it('should throw an error for undefined input', () => {
      expect(() => BST.delete()).to.throw(Error);
    });
    
    it('should throw an error for object input', () => {
      expect(() => BST.delete({'objects': 'not allowed'})).to.throw(Error);
    });

    it('should throw an error for null input', () => {
      expect(() => BST.delete(null)).to.throw(Error);
    });

    it('should throw an error for NaN input', () => {
      expect(() => BST.delete(NaN)).to.throw(Error);
    });
  });

  describe('#min', () => {
    it('should return the minimum value from the tree', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);

      expect(BST.min()).to.equal(1);
    });

    it('should return the root value if tree has no children', () => {
      BST.add(5);

      expect(BST.min()).to.equal(5);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.min()).to.throw(Error);
    });
  });

  describe('#max', () => {
    it('should return the maximum value from the tree', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);

      expect(BST.max()).to.equal(7);
    });

    it('should return the root value if tree has no children', () => {
      BST.add(5);

      expect(BST.max()).to.equal(5);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.max()).to.throw(Error);
    });
  });

  describe('#traverseInOrder', () => {
    it('should apply callback to all node values depth-first in-order', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      const called = [];
      /*
             5
          /    \
         3      7
       /  \   /
      1    4 6
      */

      BST.traverseInOrder(value => called.push(value));

      expect(called).to.deep.equal([1, 3, 4, 5, 6, 7]);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.traverseInOrder(console.log)).to.throw(Error);
    });
  });

  describe('#traversePreOrder', () => {
    it('should apply callback to all node values depth-first pre-order', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      const called = [];
      /*
             5
          /    \
         3      7
       /  \   /
      1    4 6
      */

      BST.traversePreOrder(value => called.push(value));

      expect(called).to.deep.equal([5, 3, 1, 4, 7, 6]);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.traversePreOrder(console.log)).to.throw(Error);
    });
  });

  describe('#traversePostOrder', () => {
    it('should apply callback to all node values depth-first post-order', () => {
      BST.add(5);
      BST.add(3);
      BST.add(1);
      BST.add(4);
      BST.add(7);
      BST.add(6);
      const called = [];
      /*
             5
          /    \
         3      7
       /  \   /
      1    4 6
      */

      BST.traversePostOrder(value => called.push(value));

      expect(called).to.deep.equal([1, 4, 3, 6, 7, 5]);
    });

    it('should throw an error for empty trees', () => {
      expect(() => BST.traversePostOrder(console.log)).to.throw(Error);
    });
  });
});