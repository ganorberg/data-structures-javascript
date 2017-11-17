[![Build Status](https://travis-ci.org/ganorberg/data-structures-javascript.svg?branch=master)](https://travis-ci.org/ganorberg/data-structures-javascript)

# JavaScript Data Structures

Fast, fully tested and documented data structures built with JavaScript.

## Testing

This library is 100% black box tested with 500+ unit tests. This means the test suite covers the public API and ignores implementation details (like private methods), thereby avoiding brittle tests and unnecessary re-work over time.

Unit tests follow AAA testing pattern (Arrange -> Act -> Assert).

If you would like to run the test suite after cloning the repo, run `npm install` then `npm test`.

## Technical decisions:
- prefer command-query separation -- setters do not return values
- prefer single responsibility for all functions
- prefer high cohesion over utility modules
- prefer descriptive, verbose identifiers
- prefer using extra space to improve time complexity
- prefer iterative solutions over simple recursion
- prefer multiple recursion if algorithm naturally branches
- prefer throwing errors over silently failing on incorrect inputs and edge cases
- prefer using conditional statements to avoid code rather than to wrap code
- prefer ES6+ features
- give users access to class properties

## General notes

### Object key iteration: for in loops vs Object.keys

Although I generally avoid for in loops in my code and prefer the Airbnb style guide way of accessing object properties through Object.keys, this is highly inefficient for large data sets. All data structures in this library are built to scale with time efficiency as the primary goal, and the linear time operation of Object.keys is simply too costly to use at scale.

The graphs in this library are dynamic and flexible -- vertices can be added or deleted at whim. This means that naming vertices from 0 to n-1, as array-based adjacency lists do, is out of the question because values in the middle of the array could be deleted -- the program would have to track these holes in addtion to the last index inserted. Objects avoid these issues given that keys can be named anything and still accessed in constant time.

### Library structure: ES6 classes vs OLOO pattern

I chose to use class syntax for its familiarity compared to classic object-oriented approaches to data structures. Users transitioning from object-oriented languages like Java or Python should understand the JavaScript implementations immediately.

If I were to build these structures without "classes", I would use Kyle Simpson's OLOO pattern (objects linked to other objects). The performance would be nearly the same, yet the code would be cleaner and more flexible. Without extraneous constructors and the new keyword, we could directly and explicitly embrace the prototype chain without the middle man.
