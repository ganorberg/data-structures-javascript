const expect = require('chai').expect;

let RedBlackTree;
let RBT;

try {
  RedBlackTree = require('../structures/RedBlackTree');
  RBT = new RedBlackTree();
} catch (e) {
  throw new Error('RedBlackTree could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// AAA (Arrange -> Act -> Assert) test pattern
// In tree drawings, routes with parentheses represent red links
describe('RedBlackTree', () => {
  beforeEach(() => {
    RBT = new RedBlackTree();
  });

  it('should be extensible', () => {
    expect(RBT).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(RBT).to.have.all.keys('root');
  });

  describe('#insert()', () => {
    it('should set root as new node', () => {
      RBT.insert('D', 'woof');

      expect(RBT.root).to.be.an('object');
    });

    it('should insert a node with color, key, value, left and right properties', () => {
      RBT.insert('D', 'woof');

      expect(RBT.root).to.have.all.keys('color', 'key', 'value', 'left', 'right');
    });

    it('should set root with the given key-value pair', () => {
      RBT.insert('D', 'woof');

      expect(RBT.root.key).to.equal('D');
      expect(RBT.root.value).to.equal('woof');
    });

    it('should set root with black color', () => {
      RBT.insert('D', 'woof');

      expect(RBT.root.color).to.equal(false);
    });

    it('should insert nodes with self-balancing logic', () => {
      RBT.insert('S');
      RBT.insert('E');
      RBT.insert('A');
      RBT.insert('R');
      RBT.insert('C');
      RBT.insert('H');
      RBT.insert('X');
      RBT.insert('M');
      RBT.insert('P');
      RBT.insert('L');

      /*
                     M
                  /     \
                E        R
              /   \    /   \
            C      L  P     X
          (/)    (/)      (/)
         A       H        S
      */

      expect(RBT.root.key).to.equal('M');
      expect(RBT.root.left.key).to.equal('E');
      expect(RBT.root.right.key).to.equal('R');
      expect(RBT.root.left.left.key).to.equal('C');
      expect(RBT.root.left.right.key).to.equal('L');
      expect(RBT.root.right.left.key).to.equal('P');
      expect(RBT.root.right.right.key).to.equal('X');
      expect(RBT.root.left.left.left.key).to.equal('A');
      expect(RBT.root.left.right.left.key).to.equal('H');
      expect(RBT.root.right.right.left.key).to.equal('S');
    });

    it('should overwrite value for duplicate key', () => {
      RBT.insert('D', 'woof');
      RBT.insert('D', 'meow');
      
      expect(RBT.root.value).to.equal('meow');
    });
  });

  describe('#breadthFirstSearch()', () => {
    it('should apply callback to all nodes in level order', () => {
      RBT.insert('S');
      RBT.insert('E');
      RBT.insert('A');
      RBT.insert('R');
      RBT.insert('C');
      RBT.insert('H');
      RBT.insert('X');
      RBT.insert('M');
      RBT.insert('P');
      RBT.insert('L');
      const called = [];

      /*
                     M
                  /     \
                E        R
              /   \    /   \
            C      L  P     X
          (/)    (/)      (/)
         A       H        S
      */

      RBT.breadthFirstSearch(node => called.push(node.key));

      expect(called).to.deep.equal(['M', 'E', 'R', 'C', 'L', 'P', 'X', 'A', 'H', 'S']);
    });

    it('should throw an error for empty trees', () => {
      expect(() => RBT.breadthFirstSearch(console.log)).to.throw(Error);
    });
  });

  describe('#get()', () => {
    it('should return value if key is in the root', () => {
      RBT.insert('D', 'woof');
      RBT.insert('C', 'meow');
      RBT.insert('P', 'parrot');
      RBT.insert('S', 'hiss');
      RBT.insert('T', 'growl');

      /*
                S
             (/) \
            D     T
           / \
         C    P
      */
      
      expect(RBT.root.key).to.equal('S');
      expect(RBT.root.value).to.equal('hiss');
      expect(RBT.get('S')).to.equal('hiss');
    });

    it('should return value if key is in left leaf', () => {
      RBT.insert('D', 'woof');
      RBT.insert('C', 'meow');
      RBT.insert('P', 'parrot');
      RBT.insert('S', 'hiss');
      RBT.insert('T', 'growl');

      /*
                S
             (/) \
            D     T
           / \
         C    P
      */

      expect(RBT.root.left.key).to.equal('D');
      expect(RBT.root.left.value).to.equal('woof');
      expect(RBT.get('D')).to.equal('woof');
    });

    it('should return value if key is in right leaf', () => {
      RBT.insert('D', 'woof');
      RBT.insert('C', 'meow');
      RBT.insert('P', 'parrot');
      RBT.insert('S', 'hiss');
      RBT.insert('T', 'growl');

      /*
                S
             (/) \
            D     T
           / \
         C    P
      */
      
      expect(RBT.root.right.key).to.equal('T');
      expect(RBT.root.right.value).to.equal('growl');
      expect(RBT.get('T')).to.equal('growl');
    });

    it('should return value if key is in nested left leaf', () => {
      RBT.insert('D', 'woof');
      RBT.insert('C', 'meow');
      RBT.insert('P', 'parrot');
      RBT.insert('S', 'hiss');
      RBT.insert('T', 'growl');

      /*
                S
             (/) \
            D     T
           / \
         C    P
      */
      
      expect(RBT.root.left.left.key).to.equal('C');
      expect(RBT.root.left.left.value).to.equal('meow');
      expect(RBT.get('C')).to.equal('meow');
    });

    it('should return value if key is in nested right leaf', () => {
      RBT.insert('D', 'woof');
      RBT.insert('C', 'meow');
      RBT.insert('P', 'parrot');
      RBT.insert('S', 'hiss');
      RBT.insert('T', 'growl');

      /*
                S
             (/) \
            D     T
           / \
         C    P
      */
      
      expect(RBT.root.left.right.key).to.equal('P');
      expect(RBT.root.left.right.value).to.equal('parrot');
      expect(RBT.get('P')).to.equal('parrot');
    });

    it('should return null if the key is not found in the tree', () => {
      RBT.insert('C', 'meow');
      
      expect(RBT.get('D')).to.equal(null);
    });

    it('should return null if tree is empty', () => {
      expect(RBT.get('D')).to.equal(null);
    });
  });

  describe('#depthInOrder', () => {
    it('should apply callback to all nodes depth-first in-order', () => {
      RBT.insert('S');
      RBT.insert('E');
      RBT.insert('A');
      RBT.insert('R');
      RBT.insert('C');
      RBT.insert('H');
      RBT.insert('X');
      RBT.insert('M');
      RBT.insert('P');
      RBT.insert('L');
      const called = [];

      /*
                     M
                  /     \
                E        R
              /   \    /   \
            C      L  P     X
          (/)    (/)      (/)
         A       H        S
      */

      RBT.depthInOrder(node => called.push(node.key));

      expect(called).to.deep.equal(['A', 'C', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'X']);
    });

    it('should throw an error for empty trees', () => {
      expect(() => RBT.depthInOrder(console.log)).to.throw(Error);
    });
  });

  describe('#depthPostOrder', () => {
    it('should apply callback to all nodes depth-first post-order', () => {
      RBT.insert('S');
      RBT.insert('E');
      RBT.insert('A');
      RBT.insert('R');
      RBT.insert('C');
      RBT.insert('H');
      RBT.insert('X');
      RBT.insert('M');
      RBT.insert('P');
      RBT.insert('L');
      const called = [];

      /*
                     M
                  /     \
                E        R
              /   \    /   \
            C      L  P     X
          (/)    (/)      (/)
         A       H        S
      */

      RBT.depthPostOrder(node => called.push(node.key));

      expect(called).to.deep.equal(['A', 'C', 'H', 'L', 'E', 'P', 'S', 'X', 'R', 'M']);
    });

    it('should throw an error for empty trees', () => {
      expect(() => RBT.depthPostOrder(console.log)).to.throw(Error);
    });
  });

  describe('#depthPreOrder', () => {
    it('should apply callback to all nodes depth-first pre-order', () => {
      RBT.insert('S');
      RBT.insert('E');
      RBT.insert('A');
      RBT.insert('R');
      RBT.insert('C');
      RBT.insert('H');
      RBT.insert('X');
      RBT.insert('M');
      RBT.insert('P');
      RBT.insert('L');
      const called = [];

      /*
                     M
                  /     \
                E        R
              /   \    /   \
            C      L  P     X
          (/)    (/)      (/)
         A       H        S
      */

      RBT.depthPreOrder(node => called.push(node.key));

      expect(called).to.deep.equal(['M', 'E', 'C', 'A', 'L', 'H', 'R', 'P', 'X', 'S']);
    });

    it('should throw an error for empty trees', () => {
      expect(() => RBT.depthPreOrder(console.log)).to.throw(Error);
    });
  });
});