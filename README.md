# JavaScript Data Structures

For anyone looking for efficient, commented, fully tested data structures built with JavaScript.

## Technical decisions:
- prefer descriptive, verbose identifiers
- prefer extra space to improve time complexity
- prefer iterative solutions over simple recursion
- prefer multiple recursion if algorithm naturally branches
- prefer throwing errors over silently failing on incorrect inputs and edge cases
- prefer using conditional statements to avoid code rather than to wrap code
- prefer ES6+ features
- give users access to class properties

## Testing

This library is fully black box tested, covering the public API and ignoring implementation details that would lead to brittle tests over time. 

Tests use AAA testing pattern (Arrange -> Act -> Assert).
