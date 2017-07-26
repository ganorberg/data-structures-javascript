const expect = require('chai').expect;

let Stack;
let stack;

try {
  Stack = require('../Stack.js');
  stack = new Stack();
} catch (e) {
  throw 'Stack could not be tested due to faulty import, likely ' +
  'from incorrect file path or non-constructor import';
}

describe('Stack', () => {
  beforeEach(() => {
    stack = new Stack();
  });

  describe('#isEmpty()', () => {
    it('should detect if stack is empty', () => {
      expect(stack.isEmpty()).to.equal(true);
      stack.push(0)
      expect(stack.isEmpty()).to.equal(false);
    });
  });

  describe('#isFull()', () => {
    it('should detect if stack is full', () => {
      const cappedStack = new Stack(1);
      expect(cappedStack.isFull()).to.equal(false);
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
      expect(stack.storage.length).to.equal(0);
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
      expect(stack.storage.length).to.equal(1);
      stack.pop();
      expect(stack.storage.length).to.equal(0);
    });

    it('should remove value from top of stack', () => {
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
    it('should return number of elements in stack', () => {
      expect(stack.size()).to.equal(0);
      stack.push(0);
      expect(stack.size()).to.equal(1);
    });
  });
});