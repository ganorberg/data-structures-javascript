const RED = true;
const BLACK = false;

/** 
 * Class representing a node in the red black tree
 * @private
 */
class Node {
  /**
   * For quick node creation in tree
   *
   * @constructor
   *
   * @param {Number|String} key - key held by node
   * @param {*} value - value held by node
   * @param {Boolean} color - RED is true, BLACK is false
   *
   * @property {Boolean} color - red is true, black is false
   * @property {Number|String} key - key held by node
   * @property {*} value - value held by node
   * @property {Object|Null} left - left child node
   * @property {Object|Null} right - right child node
   */
  constructor(key, value, color) {
    this.color = color;
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * @description Check if a node is red or black.
 *
 * Strategy: Use color property. Null nodes are black.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} node - node whose color is being checked
 *
 * @returns {Boolean} - true for red, false for black
 *
 * @private
 */
function isRed(node) {
  if (node === null) { return BLACK; }
  return node.color === RED;
}

/**
 * @description Transform right red link to left red link.
 *
 * Strategy: Triple swap! Right child becomes new root. Input node receives one
 * child then becomes child of new root. New root inherits color from input
 * node. Input node always ends with red color.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} node - node that rotates left and becomes red
 *
 * @returns {Object} - new root after rotation
 *
 * @private
 */
function rotateLeft(node) {
  const newRoot = node.right;
  
  // Guard against calls without right red links
  if (!isRed(newRoot)) { return; }

  // Original node receives child from new root (or null)
  node.right = newRoot.left;

  // New root receives original node as child
  newRoot.left = node;

  // Inherit color because might be red and require more transformations
  newRoot.color = node.color;

  // Original node is now red left link
  node.color = RED;

  // New root is delivered with inherited color
  return newRoot;
}

/**
 * @description Transform left red link to right red link.
 *
 * Strategy: Triple swap! Left child becomes new root. Input node receives one
 * child then becomes child of new root. New root inherits color from input
 * node. Input node always ends with red color.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} node - node that rotates right and becomes red
 *
 * @returns {Object} - new root after rotation
 *
 * @private
 */
function rotateRight(node) {
  let newRoot = node.left;

  // Guard against calls without left red links
  if (!isRed(newRoot)) { return; }

  // Original node receives child from new root (or null)
  node.left = newRoot.right;

  // New root receives original node as child
  newRoot.right = node;

  // Inherit color because might be red and require more transformations
  newRoot.color = node.color;

  // Original node is now red left link
  node.color = RED;

  // New root is delivered with inherited color
  return newRoot;
}

/**
 * @description Flip two red children to black and current node to red.
 *
 * Strategy: Access children with left and right properties, then reassign
 * colors. Modify own color with own color property.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} node - node whose color and children's colors will be flipped
 *
 * @private
 */
function flipColors(node) {
  if (isRed(node) || !isRed(node.left) || !isRed(node.right)) { return; }
  node.color = RED;
  node.left.color = BLACK;
  node.right.color = BLACK;
}

/**
 * @description Used by public insert method to update value or place node.
 *
 * Strategy: Recursively update tree. Null base case builds new node with red
 * color. As new nodes are returned to the prior call on the call stack, their
 * children and grandchildren will be checked to enforce the red left-leaning
 * nature of the tree. It's quite beautiful that only three sequential checks
 * are required to handle all color possibilities.
 *
 * Time complexity: O(log N)
 * Space complexity: O(1)
 *
 * @param {Object} node - node for traversal, key comparison and color-checking
 * @param {Number|String} key - key that identifies node
 * @param {*} value - updated value, or value of new node
 *
 * @returns {Object=} - newly created node or node currently being traversed
 *
 * @private
 */
function put(node, key, value) {
  if (node === null) { return new Node(key, value, RED); }

  if (key < node.key) { node.left = put(node.left, key, value); }
  else if (key > node.key) { node.right = put(node.right, key, value); }
  else { node.value = value; }

  // Enforce proper color structure through case reduction
  if (isRed(node.right) && !isRed(node.left)) { node = rotateLeft(node); }
  if (isRed(node.left) && isRed(node.left.left)) { node = rotateRight(node); }
  if (isRed(node.left) && isRed(node.right)) { flipColors(node); }

  return node;
}

/** Class representing left-leaning red black tree */
class RedBlackTree {
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
   * @description Apply a callback to the entire tree in level order.
   *
   * Strategy: Initialize queue with root. Repeatedly use queue to access
   * children and store in new queue. End loop when no children are added.
   *
   * Time complexity: O(N)
   * Space complexity: O(N)
   *
   * @param {Function} callback - calls all nodes in breadth-first order
   */
  breadthFirstSearch(callback) {
    if (this.root === null) { throw new Error('Empty tree, my friend!'); }
    let queue = [this.root];
    while (true) {
      // Use additional storage array to avoid expensive shifting costs
      let newQueue = [];

      // Key idea is to use nodes in queue to set up next queue
      queue.forEach(node => {
        callback(node);
        if (node.left !== null) { newQueue.push(node.left); }
        if (node.right !== null) { newQueue.push(node.right); }
      });

      if (newQueue.length === 0) { return; }

      // Reassign queue to list of nodes in next level of tree
      queue = newQueue;
    }
  }

  /**
   * @description Depth-first in-order traversal that applies callback to
   * all nodes in ascending order.
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
   * @param {Function} callback - invoked on every node
   * @param {Object=} node - current node being traversed and called
   */
  depthInOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.depthInOrder(callback, node.left); }
    callback(node);
    if (node.right !== null) { this.depthInOrder(callback, node.right); }
  }

  /**
   * @description Depth-first post-order traversal that applies callback to
   * all nodes in such that the root is last
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
   * @param {Function} callback - invoked on every node in post-order
   * @param {Object=} node - current node being traversed and called
   */
  depthPostOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }
    
    if (node.left !== null) { this.depthPostOrder(callback, node.left); }
    if (node.right !== null) { this.depthPostOrder(callback, node.right); }
    callback(node);
  }

  /**
   * @description Depth-first pre-order traversal that applies callback to
   * all nodes such that root is always first.
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
   * @param {Function} callback - invoked on every node in pre-order
   * @param {Object=} node - current node being traversed and called
   */
  depthPreOrder(callback, node = this.root) {
    if (node === null) { throw new Error('Tree is empty, my dear friend!'); }

    callback(node);
    if (node.left !== null) { this.depthPreOrder(callback, node.left); }
    if (node.right !== null) { this.depthPreOrder(callback, node.right); }
  }

  /**
   * @description Find node with given key and return its value.
   *
   * Strategy: Start at root node. Loop to traverse tree until null pointer.
   * On every iteration, check if node has key.
   *
   * Time complexity: O(log N)
   * Space complexity: O(1)
   *
   * @param {Number|String} key - searching for this key in the tree
   *
   * @returns {String|Number|Null} - null if key is not found
   */
  get(key) {
    let node = this.root;

    while (node !== null) {
      if (key === node.key) { return node.value; }
      if (key < node.key) { node = node.left; }
      if (key > node.key) { node = node.right; }
    }

    return null;
  }

  /**
   * @description Insert new key-value pair into appropriate location in tree.
   * If key already exists in tree, then overwrite the previous value with
   * the new value.
   *
   * Time complexity: O(logN)
   * Space complexity: O(1)
   *
   * @param {Number|String} key - determines location to be inserted in tree
   * @param {*} value - value associated with given key
   *
   * @returns {Boolean} - true represents successful insertion
   */
  insert(key, value) {
    this.root = put(this.root, key, value);

    // Maintain color theory and allow edge case check for red nodes in flipColors
    this.root.color = BLACK;
    return true;
  }
}

module.exports = RedBlackTree;
