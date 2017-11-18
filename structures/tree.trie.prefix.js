/**
 * @description Private method used in public delete method. Remembers the last
 * node that should not be deleted, which occurs at a prefix word or fork.
 *
 * Strategy: Check if the current node ends a word or forks to other words.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} currentNode - node visited
 * @param {Boolean} isFinalLetter - true if looping on final letter
 *
 * @returns {Boolean} - true if cutoff found, false otherwise
 *
 * @private
 */
function isCutOffNode(currentNode, isFinalLetter) {
   return (
    // Has prefix that is a stored word
    (currentNode.hasOwnProperty('value') && !isFinalLetter)
    ||
    // Forks to another word 
    (!currentNode.hasOwnProperty('value') && Object.keys(currentNode).length > 1)
  )
}

/** Class representing a prefix trie */
class PrefixTrie {
  /**
   * Track root of trie.
   *
   * Trie can store any non-empty string. Is case sensitive.
   *
   * @constructor
   *
   * @property {Object} root - top level node in trie
   */
  constructor() {
    this.root = {};
  }

  /**
   * @description Find all words with a given prefix.
   *
   * Strategy: Traverse to last letter in word, then call orderWords method and
   * prepend the prefix to all words found.
   *
   * Time complexity: O(s * N), where s is suffix length and N is number of matched words
   * Space complexity: O(N)
   *
   * @param {String} prefix - prefix to be matched
   *
   * @returns {Array} - all keys matching input prefix
   */
  autoComplete(prefix) {
    if (typeof prefix !== 'string') {
      throw new Error('This trie only stores strings, my friend!');
    }

    // Could also cache previous searches and return those here
    if (prefix === '') { return []; }

    let currentNode = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const letter = prefix[i];
      if (!currentNode.hasOwnProperty(letter)) { return []; }
      currentNode = currentNode[letter];
    }

    return this.orderWords(currentNode).map(word => prefix + word);
  }

  /**
   * @description Delete a word from the trie, if it exists.
   *
   * Strategy: Track two nodes while traversing. One is the current node being
   * traversed, and the second remembers the latest cutoff point from which to
   * delete characters. Cutoff occurs when a word is a prefix of the input word
   * or there is a branch to other words. If no cutoff, simply remove first
   * letter at root, which removes whole word.
   *
   * Time complexity: O(c), where c is number of characters in word
   * Space complexity: O(1)
   *
   * @param {String} word - word to be removed
   */
  delete(word) {
    if (!this.hasWord(word)) {
      throw new Error('That word is not in the trie, my friend!');
    }

    let currentNode = this.root;
    let cutOff;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const isFinalLetter = i === word.length - 1;
      if (isCutOffNode(currentNode, isFinalLetter)) {
        cutOff = { node: currentNode, letter };
      }
      
      // Move to next letter in word
      currentNode = currentNode[letter];
    }

    // Case 1: Input word is a prefix of another word, so leave letters alone
    if (Object.keys(currentNode).length > 1) {
      delete currentNode.value;
      return;
    }

    // Case 2: Prefix is needed (as its own word or a fork to other words), so leave prefix intact
    if (cutOff) {
      delete cutOff.node[cutOff.letter];
      return;
    }

    // Case 3: Remove whole word since no part of it overlaps with other words
    delete this.root[word[0]];
  }

  /**
   * @description Get a value tied to a given key.
   *
   * Strategy: Check each letter for existence down a branch. If letter does
   * not exist in trie, word does not exist. If word completes, return value.
   *
   * Time complexity: O(c), where c is number of characters in key
   * Space complexity: O(1)
   *
   * @param {String} word - key to access value
   *
   * @returns {*} - value if key found, or null otherwise
   */
  get(word) {
    if (typeof word !== 'string') {
      throw new Error('This trie only stores strings, my friend!');
    }

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!currentNode.hasOwnProperty(letter)) { return null; }
      currentNode = currentNode[letter];
    }

    return currentNode.hasOwnProperty('value') ? currentNode.value : null;
  }

  /**
   * @description Check if a prefix exists in the trie.
   *
   * Strategy: Traverse trie. Return false if letter is not found. Return true
   * if traversal ends successfully.
   *
   * Time complexity: O(c), where c is number of characters in prefix
   * Space complexity: O(1)
   *
   * @param {String} prefix - prefix to be searched
   *
   * @returns {Boolean} - true if prefix exists, or false otherwise
   */
  hasPrefix(prefix) {
    if (typeof prefix !== 'string' || prefix.length === 0) {
      throw new Error('This trie only stores non-empty strings, my friend!');
    }

    let currentNode = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const letter = prefix[i];
      if (!currentNode.hasOwnProperty(letter)) { return false; }
      currentNode = currentNode[letter];
    }

    return true;
  }

  /**
   * @description Check if a word exists in the trie.
   *
   * Strategy: Use public get method.
   *
   * Time complexity: O(c), where c is number of characters in word
   * Space complexity: O(1)
   *
   * @param {String} word - key to be searched
   *
   * @returns {Boolean} - true if word exists, or false otherwise
   */
  hasWord(word) {
    if (typeof word !== 'string' || word.length === 0) {
      throw new Error('This trie only stores non-empty strings, my friend!');
    }

    return this.get(word) !== null;
  }

  /**
   * @description Get all words in alphabetical order.
   *
   * Strategy: Recursively traverse trie and send words to an array to be
   * returned. A word is found when a value property is seen. Sort letters to
   * ensure alphabetical order.
   *
   * Time complexity: O(N)
   * Space complexity: O(N)
   *
   * @param {Object=} node - node being traversed
   * @param {Array=} words - alphabetical list of words to be returned
   * @param {String=} word - word built up while traversing
   *
   * @returns {Array} - alphabetical list of all words in trie
   */
  orderWords(node = this.root, words = [], word = '') {
    if (node.hasOwnProperty('value')) { words.push(word); }

    Object.keys(node).sort().forEach(key => {
      if (key === 'value') { return; }
      this.orderWords(node[key], words, word + key);
    });

    return words;
  }

  /**
   * @description Insert or update a key-value pair.
   *
   * Strategy: Check each letter for existence down a branch. If letter does
   * not exist in trie, create it. When word completes, add value to next node.
   *
   * Time complexity: O(c), where c is number of characters
   * Space complexity: O(1)
   *
   * Tradeoffs: A small amount of extra space is used to store value in a
   * separate object from the final character in exchange for instant lookup
   * time on characters. The popular alternative using arrays with length
   * proportional to character set requires far more space for the same time
   * complexity.
   *
   * @param {String} word - key for value
   * @param {*} value - inserted as value property in node after word's final character
   */
  put(word, value) {
    if (typeof word !== 'string' || word.length === 0) {
      throw new Error('This trie requires non-empty string keys, my friend!');
    }

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!currentNode.hasOwnProperty(letter)) { currentNode[letter] = {}; }
      currentNode = currentNode[letter];
    }

    currentNode.value = value;
  }
}

module.exports = PrefixTrie;
