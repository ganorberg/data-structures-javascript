/** 
 * Class representing a node in the tree
 * @private
 */
class Node {
  /**
   * Allows us to quickly create nodes for our binary search tree
   *
   * @constructor
   *
   * @param {Number|String} value - value held by node
   *
   * @property {Number|String} value - value held by node
   * @property {Object|Null} left - left child node
   * @property {Object|Null} right - right child node
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}


/**
 * @description: Helper for deleteNode function. Finds minimum of tree and
 * deletes it.
 *
 * Strategy: Move parent and child pointers left until child is min. Upon match,
 * update parent's left pointer to min's right subtree.
 *
 * Edge case(s): empty tree, incorrect input type. If root is min, then we
 * cannot remove it from the tree, but we can still return the node.
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 *
 * @param {Object} root - tree whose minimum will be removed
 *
 * @returns {Object} - node with minimum value in tree
 *
 * @private
 */
function deleteMin(root) {
  let parent = root;
  if (parent === null || typeof parent !== 'object') {
    throw new Error('Please insert valid tree');
  }

  let child = root.left;
  if (child === null) {
    // no children means parent is min
    return parent.right === null ? parent : parent.right;
  }

  while (child !== null && child.left !== null) {
    parent = parent.left;
    child = child.left;
  }

  // min may have right subtree, so point parent to that subtree (may also be null)
  parent.left = child.right;
  return child;
}

/**
 * @description: Helper for delete method. Decides strategy based on number
 * of children.
 *
 * Strategy: If no children, return null. If one child, return it. If two
 * children, we have some work to do... delete and store minimum in right
 * subtree, assign minimum's left and right pointers to those of the node to
 * be deleted, then return min node.
 *
 * Edge case(s): right subtree contains only one node
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 *
 * @param {Object} node - node to be removed
 *
 * @returns {Object} - null, node's only child, or right subtree minimum
 *
 * @private
 */
function deleteNode(node) {
  let numberOfChildren = 0;
  if (node.left !== null) { numberOfChildren++; }
  if (node.right !== null) { numberOfChildren++; }

  switch (numberOfChildren) {
    case 0:
      return null;
    case 1:
      return node.left === null ? node.right : node.left;
    case 2:
      const rightMin = deleteMin(node.right);
      rightMin.left = node.left;

      // if right subtree min is node's right child, then replace with null
      // to avoid accidental circular reference
      rightMin.right = node.right === rightMin ? null : node.right; 
      return rightMin;
  }
}

/** Class representing our tree */
class BinarySearchTree {
  /**
   * Track root of tree.
   *
   * @constructor
   *
   * @property {Object|Null} root - top level node in tree
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
   * Edge case(s): inappropriate inputs, duplicates
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {Number|String} value - value to be inserted into new node
   * @returns {Boolean} - true means add was successful
   */
  add(value) {
    // Type checking
    if (value === undefined || typeof value === 'object' || isNaN(value)) {
      throw new Error('Please avoid adding silly values like undefined, null, objects or NaN');
    }

    let newNode = new Node(value);
    
    // If tree is empty...
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let node = this.root;

    // Traverse tree
    while (node !== null) {
      if (value === node.value) { throw new Error('Cannot add duplicate values'); }
      
      // Lesser values move us left or create new left tree
      if (value < node.value) {
        if (node.left === null) { 
          node.left = newNode;
          return;
        }

        node = node.left;
      }

      // Greater values move us right or create new right tree
      if (value > node.value) {
        if (node.right === null) { 
          node.right = newNode;
          return;
        }

        node = node.right;
      }
    }
  }

  /**
   * @description Apply a callback to the entire tree in level order.
   *
   * Strategy: Initialize queue with root. Repeatedly use queue to access
   * children and store in new queue. End loop when no children are added.
   *
   * Time complexity: O(N)
   * Space complexity: O(N)
   *
   * @param {Function} callback - calls all values in breadth-first order
   */
  breadthFirstSearch(callback) {
    if (this.root === null) { throw new Error('Empty tree, my friend!'); }
    let queue = [this.root];
    while (true) {
      // use another queue to avoid expensive shifting costs
      let newQueue = [];

      // key idea is to use nodes in queue to set up next queue
      queue.forEach(node => {
        callback(node.value);
        if (node.left !== null) { newQueue.push(node.left); }
        if (node.right !== null) { newQueue.push(node.right); }
      });

      // nothing added to new queue means everything has been searched
      if (newQueue.length === 0) { return; }

      // reassign queue to list of nodes in next level of tree
      queue = newQueue;
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
   * @returns {Boolean} - whether or not value exists in tree
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
   * @description: Hibbard deletion. Removes a node with the given value from
   * the tree. If used extensively, slants tree and makes tree height sqrt(N),
   * which slows typically logarithmic operations.
   *
   * Strategy: Traverse with parent pointer until find child node containing
   * the given value. Call deleteNode on matched child and update parent pointer
   * in the direction previously traversed.
   *
   * Edge case(s): delete root, input does not exist in tree, empty tree
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {Number|String} value - value of node to be removed
   * @returns {Object} - node removed
   */
  delete(value) {
    if (this.root === null) { throw new Error('Tree is empty, my dear friend!'); }
    if (value === undefined || typeof value === 'object' || isNaN(value)) {
      throw new Error('Values like undefined, null, objects and NaN do not exist for deletion');
    }

    let parent = this.root;
    let child;

    // direction remembers whether child is right or left subtree of parent
    let direction;

    // check if root is node to be deleted
    if (value === parent.value) {
      this.root = deleteNode(parent);
      return parent;
    }

    // set initial child to check value against
    if (value < parent.value) {
      child = parent.left;
      direction = 'left';
    } else if (value > parent.value) {
      child = parent.right;
      direction = 'right';
    }

    // traverse tree
    while (child !== null) {
      if (value === child.value) {
        // parent overwrites pointer to matched child
        parent[direction] = deleteNode(child);
        return child;
      } else if (value < child.value) {
        child = child.left;
        parent = parent[direction];
        direction = 'left';
      } else if (value > child.value) {
        child = child.right;
        parent = parent[direction];
        direction = 'right';
      }
    }

    throw new Error('No match found for deletion.');
  }

  /**
   * @description Depth-first in-order traversal that applies callback to
   * all node values in ascending order.
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
   * @param {Object=} node - current node being traversed and called
   */
  depthInOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.depthInOrder(callback, node.left); }
    callback(node.value);
    if (node.right !== null) { this.depthInOrder(callback, node.right); }
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
   * @param {Object=} node - current node being traversed and called
   */
  depthPostOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.depthPostOrder(callback, node.left); }
    if (node.right !== null) { this.depthPostOrder(callback, node.right); }
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
   * @param {Object=} node - current node being traversed and called
   */
  depthPreOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }

    callback(node.value);
    if (node.left !== null) { this.depthPreOrder(callback, node.left); }
    if (node.right !== null) { this.depthPreOrder(callback, node.right); }
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
   * @returns {Number|String} - maximum value in tree
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
   * @returns {Number|String} - minimum value in tree
   */
  min() {
    let node = this.root;
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    while (node.left !== null) { node = node.left; }
    return node.value;
  }
}

module.exports = BinarySearchTree;
