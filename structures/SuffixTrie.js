/**
 * @description Private method that inserts suffixes into suffix trie.
 *
 * Strategy: Traverse trie letter by letter. If letter does not exist, create
 * it. At end, place terminating marker. Convert all letters to lowercase to
 * make trie case insensitive. Ignore whitespace with regex check. Notice that
 * the index is placed in the node after the final letter.
 *
 * @param {String} suffix - suffix inserted into trie
 * @param {Object} trie - suffix trie where suffix is being inserted
 * @return {Object} - root of trie
 */
function insert(suffix, trie, index) {
  let currentNode = trie;

  for (let i = 0; i < suffix.length; i++) {
    const letter = suffix[i].toLowerCase();

    // Ignore whitespace
    if (/\s/.test(letter)) { continue; }

    if (!currentNode.hasOwnProperty(letter)) { currentNode[letter] = {}; }

    // Traverse to next node unless last letter
    currentNode = currentNode[letter];
  }

  // Index also acts as terminating marker to represent a complete suffix
  currentNode.index = index;
}

/**
 * @description Private method that builds entire suffix trie upon class
 * instantiation.
 *
 * Strategy: Create root object. Insert every possible suffix of input string.
 * Build suffix string by prepending one character at a time starting at end of
 * word. For example, BANANA inserts A, NA, ANA, NANA, ANANA, BANANA.
 *
 * @param {String} string - string that suffix trie represents
 * @return {Object} - root of trie
 */
function buildTrie(string) {
  if (string === '' || typeof string !== 'string') {
    throw new Error('Please insert a non-empty string upon instantiation, my friend!');
  }

  const trie = {};
  let suffix = '';

  for (let i = string.length - 1; i >= 0; i--) {
    const letter = string[i];
    suffix = letter + suffix;
    insert(suffix, trie, i);
  }

  return trie;
}

/** Class representing a suffix trie */
class SuffixTrie {
  /**
   * Track root of trie.
   *
   * Trie can store any non-empty string. Case insensitive. Ignores whitespace.
   *
   * @constructor
   */
  constructor(string) {
    this.root = buildTrie(string);
  }

  /**
   * @description Check if a suffix exists in the trie.
   *
   * Strategy: Traverse trie. Return false if letter is not found. Return true
   * if traversal ends successfully and the final node has a terminating marker.
   *
   * Time complexity: O(c), where c is number of characters in suffix
   * Space complexity: O(1)
   *
   * @param {String} suffix - suffix to be searched
   * @return {Boolean} - true if suffix exists, or false otherwise
   */
  hasSuffix(suffix) {
    if (typeof suffix !== 'string') {
      throw new Error('This trie only stores strings, my friend!');
    }

    let currentNode = this.root;

    for (let i = 0; i < suffix.length; i++) {
      const letter = suffix[i];
      if (!currentNode.hasOwnProperty(letter)) { return false; }
      currentNode = currentNode[letter];
    }

    return currentNode.hasOwnProperty('index');
  }

  /**
   * @description Check if a pattern exists in the trie.
   *
   * Strategy: Traverse trie. Return false if letter is not found. Return true
   * if traversal ends successfully.
   *
   * Edge case: empty string returns true
   *
   * Time complexity: O(c), where c is number of characters in suffix
   * Space complexity: O(1)
   *
   * @param {String} pattern - pattern to be searched
   * @return {Boolean} - true if pattern exists, or false otherwise
   */
  matchesPattern(pattern) {
    if (typeof pattern !== 'string') {
      throw new Error('This trie only stores strings, my friend!');
    }

    let currentNode = this.root;

    for (let i = 0; i < pattern.length; i++) {
      const letter = pattern[i];
      if (!currentNode.hasOwnProperty(letter)) { return false; }
      currentNode = currentNode[letter];
    }

    return true;
  }
}

module.exports = SuffixTrie;
