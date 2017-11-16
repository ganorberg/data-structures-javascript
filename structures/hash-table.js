/**
 * @description Convert string to index between 0 and size (exclusive). Used in
 * all public HashTable methods.
 * 
 * @param {String} string - input that will be hashed
 * @param {Number} size - size of hash table
 *
 * @returns {Number} - index that will be used as the address in the hash table
 *
 * @private
 */
function hashCode(string, size) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = ((hash << 5) - hash) + string.charCodeAt(i);
    
    // Convert to 32-bit integer
    hash &= hash;
  }

  return Math.abs(hash) % size ;
}

/**
 * @description Double or halve size of hash table. Load factor is 75%, which
 * trades minimal wasted space for minimal time dealing with collisions.
 *
 * Strategy: Loop through old storage looking for buckets. Then loop through
 * keys to insert key-value pairs into new storage using public insert method.
 *
 * Where M is depth of bucket and N is size of array...
 * Time complexity: O(M * N)
 * Space complexity: O(M * N)
 * Average case with decent hash distributions is linear time/space.
 *
 * @param {Array} storage - old storage array that is being resized
 * @param {Number} multiplier - 2 to double or 0.5 to cut in half
 * @param {Function} insertMethod - give access to table's insert method
 *
 * @returns {Array} - resized hash table
 *
 * @private
 */
function resize(storage, multiplier, insertMethod) {
  const newSize = storage.length * multiplier;
  const newStorage = new Array(newSize);

  storage.forEach(bucket => {
    if (bucket !== undefined) {
      Object.keys(bucket).forEach(key => {
        insertMethod(key, bucket[key], newSize, newStorage);
      });
    }
  });

  return newStorage;
}

/** Class representing a Hash Table */
class HashTable {
  /**
   * Collisions handled with chaining. Values are added to storage property.
   * Entries property represents number of items currently stored.
   *
   * @constructor
   *
   * @param {Number=} size - number of buckets available in array
   *
   * @property {Number} entries - how many entries have been added to hash table
   * @property {Number} size - current length of storage array
   * @property {Array} storage - the hash table itself
   */
  constructor(size = 16) {
    this.entries = 0;
    this.size = size;
    this.storage = new Array(size);
  }

  /**
   * @description Insert key-value pair into hash table. Resize if insertion
   * crosses 75% entry threshold. If the same key is used multiple times, values
   * are overwritten so that only the latest insertion value will be held.
   *
   * Strategy: Hash key to deliver index where key-value pair will be inserted.
   * If that space is undefined, create object. Set key-value pair in
   * object at that address.
   *
   * Time complexity: O(1) amortized
   * Space complexity: O(1) amortized
   *
   * @param {String} key - key that will be hashed into an index
   * @param {*} value - value to be inserted with its key
   * @param {Number} size - size of storage where key-value pair is inserted
   * @param {Array} storage - storage where key-value pair is inserted
   *
   * @returns {Boolean} - true means insertion was successful
   */
  insert(key, value, size = this.size, storage = this.storage) {
    /* Do not allow resize to reference 'this' keyword, which typically points
       at hash table. In production, may need to change 'this' to window or
       environment. Or could simply copy/paste insertion logic into resize.
    */
    if (this !== undefined) {
      this.entries++;
      const CUT_OFF = 0.75 * size;
      const MULTIPLIER = 2;
      if (this.entries > CUT_OFF) {
        this.storage = resize(storage, MULTIPLIER, this.insert);
        this.size = size * MULTIPLIER;
      }
    }
    
    const address = hashCode(key, size);
    if (storage[address] === undefined) { storage[address] = {}; }
    storage[address][key] = value;
    return true;
  }

  /**
   * @description Retrieve value associated with given key in hash table.
   *
   * Strategy: Hash key to deliver index for bucket with the key. Access the
   * value using object property access.
   *
   * Edge case(s): Check if bucket is undefined to avoid TypeError.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   * 
   * @param {String} key
   *
   * @returns {*} - value found with key, or undefined if key not found
   */
  get(key) {
    const address = hashCode(key, this.size);
    if (this.storage[address] === undefined) { return undefined; }
    return this.storage[address][key];
  }

  /**
   * @description Remove key-value pair from hash table. Resize if removal
   * crosses 25% entry threshold.
   *
   * Strategy: Hash key to deliver index where key-value pair will be removed.
   * Store value to return, then delete the key-value pair from the table.
   *
   * Edge case(s): Key does not exist in hash table
   * 
   * Time complexity: O(1) amortized
   * Space complexity: O(1) amortized
   *
   * @param {String} key - key that will be hashed into an index and removed
   *
   * @returns {*} - value removed, or undefined if key not found
   */
  remove(key) {
    this.entries--;
    const CUT_OFF = 0.25 * this.size;
    const MULTIPLIER = 0.5;
    if (this.entries < CUT_OFF) {
      this.storage = resize(this.storage, MULTIPLIER, this.insert);
      this.size *= MULTIPLIER;
    }

    const address = hashCode(key, this.size);
    if (this.storage[address] === undefined) { return undefined; }
    const removed = this.storage[address][key];
    delete this.storage[address][key];
    return removed;
  }
}

module.exports = HashTable;
