/** Class representing a node in the tree */
class Node {
  /**
   * Allows us to quickly create nodes for our binary search tree
   *
   * @constructor
   * @param {Number|String} value - value held by node
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/** Class representing our tree */
class BinarySearchTree {
  /**
   * Track root of tree.
   *
   * @constructor
   */
  constructor() {
    this.root = null;
  }

  /**
   * @description: Adds a node with the given value to the tree.
   *
   * Strategy: Start at root node, then check if input value is smaller or greater
   * than root value. Each direction will check to see if a node is already present
   * in that direction. If exists, set current node to that node to traverse.
   * If not, insert new node with input value.
   *
   * Edge case(s): inappropriate inputs
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {Number|String} value - value to be inserted into new node
   * @return {Boolean} - true means add was successful
   */
  add(value) {
    // Type checking
    if (value === undefined || typeof value === 'object' || isNaN(value)) {
      throw new Error('Please avoid adding silly values like undefined, null, NaN or objects');
    }

    // If tree is empty...
    if (this.root === null) {
      this.root = new Node(value);
      return true;
    }

    let node = this.root;
    let newNode = new Node(value);

    // Traverse tree
    while (node !== null) {
      if (value === node.value) { throw new Error('Cannot add duplicate values'); }
      
      // Lesser values move us left or create new left tree
      if (value < node.value) {
        if (node.left === null) { 
          node.left = newNode;
          return true;
        }

        node = node.left;
      }

      // Greater values move us right or create new right tree
      if (value > node.value) {
        if (node.right === null) { 
          node.right = newNode;
          return true;
        }

        node = node.right;
      }
    }
  }

  /**
   * @description Check if node with given value exists in tree.
   *
   * Strategy: Start at root node. Loop to traverse tree until null pointer.
   * Check if input value ever equals a node's value.
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {*} value - searching for this value in the tree
   * @return {Boolean|String} - whether or not value exists in tree
   */
  contains(value) {
    let node = this.root;

    while (node !== null) {
      if (value === node.value) { return true; }
      if (value < node.value) { node = node.left; }
      if (value > node.value) { node = node.right; }
    }

    return false;
  }

  /**
   * @description Find maximum value in tree.
   *
   * Strategy: Maximum is right-most node. Traverse tree by starting at root node
   * and reassigning node to that node's right. When right pointer is null, current
   * node's value will be the maximum value in the tree.
   *
   * Edge case(s): Empty tree
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @return {Number|String} - maximum value in tree
   */
  max() {
    let node = this.root;
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    while (node.right !== null) { node = node.right; }
    return node.value;
  }

  /**
   * @description Find minimum value in tree.
   *
   * Strategy: Minimum is left-most node. Traverse tree by starting at root node
   * and reassigning node to that node's left. When left pointer is null, current
   * node's value will be the minimum value in the tree.
   *
   * Edge case(s): Empty tree
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @return {Number|String} - minimum value in tree
   */
  min() {
    let node = this.root;
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    while (node.left !== null) { node = node.left; }
    return node.value;
  }

  /**
   * @description Remove node with given value from the tree.
   *
   * Strategy: Traverse tree until parent sees that its child has the given value.
   * While maintaining pointer to parent, traverse into child and count how many
   * children it has. If 0, simply assign parent's pointer to null. If 1, assign
   * parent's pointer to grandchild. If 2, 
   *
   * Edge case(s): Empty tree, value does not exist in tree
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {Number|String} value - value of node to be removed from tree
   */
  remove(value) {
    // 3 cases: 0, 1 or 2 children
  }

  /**
   * @description Depth-first in-order traversal that applies callback to
   * all node values in this order: left leaf, root, right leaf.
   *
   * Strategy: Callback is applied between recursive calls to left and right
   * subtrees. End traversal in either direction when pointer in that direction
   * is null.
   *
   * Edge case(s): Empty tree
   *
   * Time complexity: O(N)
   * Space complexity: O(1)
   *
   * @param {Function} callback - invoked on every node's value in-order
   * @param {Object=} node - defaults to root and used to traverse recursively
   */
  traverseInOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.traverseInOrder(callback, node.left); }
    callback(node.value);
    if (node.right !== null) { this.traverseInOrder(callback, node.right); }
  }

  /**
   * @description Depth-first post-order traversal that applies callback to
   * all node values in this order: left leaf, right leaf, root
   *
   * Strategy: Callback is applied after recursive calls to left and right
   * subtrees. End traversal in either direction when pointer in that direction
   * is null.
   *
   * Edge case(s): Empty tree
   *
   * Time complexity: O(N)
   * Space complexity: O(1)
   *
   * @param {Function} callback - invoked on every node's value post-order
   * @param {Object=} node - defaults to root and used to traverse recursively
   */
  traversePostOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.traversePostOrder(callback, node.left); }
    if (node.right !== null) { this.traversePostOrder(callback, node.right); }
    callback(node.value);
  }

  /**
   * @description Depth-first pre-order traversal that applies callback to
   * all node values in this order: root, left leaf, right leaf
   *
   * Strategy: Callback is applied before recursive calls to left and right
   * subtrees. End traversal in either direction when pointer in that direction
   * is null.
   *
   * Edge case(s): Empty tree
   *
   * Time complexity: O(N)
   * Space complexity: O(1)
   *
   * @param {Function} callback - invoked on every node's value pre-order
   * @param {Object=} node - defaults to root and used to traverse recursively
   */
  traversePreOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }

    callback(node.value);
    if (node.left !== null) { this.traversePreOrder(callback, node.left); }
    if (node.right !== null) { this.traversePreOrder(callback, node.right); }
  }
}

module.exports = BinarySearchTree;
