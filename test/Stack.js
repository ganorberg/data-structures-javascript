const expect = require('chai').expect;

let Stack;
let stack;

try {
  Stack = require('../structures/Stack');
  stack = new Stack();
} catch (e) {
  throw new Error('Stack could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// Follows AAA (Arrange -> Act -> Assert) unit testing pattern
describe('Stack', () => {
  beforeEach(() => {
    stack = new Stack();
  });

  it('should be extensible', () => {
    expect(stack).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(stack).to.have.all.keys('storage', 'capacity');
  });

  describe('#isEmpty()', () => {
    it('should return true if stack is empty', () => {
      expect(stack.isEmpty()).to.equal(true);
    });

    it('should return false if stack contains values', () => {
      stack.push(0)

      expect(stack.isEmpty()).to.equal(false);
    });
  });

  describe('#isFull()', () => {
    it('should return false if stack has not reached capacity', () => {
      const cappedStack = new Stack(1);

      expect(cappedStack.isFull()).to.equal(false);
    });

    it('should return true if stack has reached capacity', () => {
      const cappedStack = new Stack(1);

      cappedStack.push(0);

      expect(cappedStack.isFull()).to.equal(true);
    });
  });

  describe('#peek()', () => {
    it('should return value at top of stack', () => {
      stack.push(0);

      expect(stack.peek()).to.equal(0);
    });

    it('should return undefined for empty stack', () => {
      expect(stack.peek()).to.equal(undefined);
    });
  });

  describe('#push()', () => {
    it('should increase size of stack by 1', () => {
      stack.push(0);

      expect(stack.storage.length).to.equal(1);
    });

    it('should append input to top of stack', () => {
      stack.push(0);
      stack.push(1);

      expect(stack.storage[stack.storage.length - 1]).to.equal(1);
    });

    it('should return new stack length', () => {
      expect(stack.push(0)).to.equal(1);
    });

    it('should not insert item if stack is at capacity', () => {
      const cappedStack = new Stack(0);

      stack.push('never pushed');

      expect(cappedStack.storage.length).to.equal(0);
    });
  });

  describe('#pop()', () => {
    it('should decrease size of stack by 1', () => {
      stack.push(0);
      stack.push(1);

      stack.pop();

      expect(stack.storage.length).to.equal(1);
    });

    it('should remove last item pushed to stack', () => {
      stack.push(0);
      stack.push(1);

      stack.pop();

      expect(stack.storage[stack.storage.length - 1]).to.equal(0);
    });

    it('should return removed value', () => {
      stack.push(0);

      expect(stack.pop()).to.equal(0);
    });
  });

  describe('#size()', () => {
    it('should return 0 if stack is empty', () => {
      expect(stack.size()).to.equal(0);
    });

    it('should return 1 if stack contains one item', () => {
      stack.push(0);

      expect(stack.size()).to.equal(1);
    });
  });
});