const DirectedCycle = require('./Cycle');

/**
 * @description Private method that sorts vertices topologically using
 * depth-first search. It is first called in the public initialize method.
 *
 * Strategy: Use Tarjan's algorithm where each vertex is sorted after they
 * complete their depth-first search calls. Track visits with a set.
 *
 * Time complexity: O(visited this pass)
 * Space complexity: O(visited this pass)
 *
 * @param {Graph} graph - graph being processed
 * @param {String | Number} vertex - current vertex being traversed
 * @param {Set} visited - vertices already visited
 * @param {Array} sorted - vertices in topological sort order
 */
function depthFirstSearch(
  graph,
  vertex,
  visited,
  sorted
) {
  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) { return; }
    visited.add(adjacentVertex);
    depthFirstSearch(graph, adjacentVertex, visited, sorted);
  });

  // Here is the magic! At the end of DFS the vertex becomes sorted.
  sorted.push(vertex);
}

/** Class representing topological sort processor for directed graphs */
class TopologicalSort {
  /**
   * Run initialize method once to populate constructor values. Then access
   * the sorted property to see the vertices topologically sorted.
   *
   * @constructor
   * @param {Graph} graph - graph being processed
   */
  constructor(graph) {
    this.graph = graph;
    this.sorted = [];
    this.initialized = false;
  }

  /**
   * @description Initialize constructor values. After running, the sorted
   * property will contain an array of the vertices in topological sort order.
   *
   * Strategy: If the graph does not contain any cycles, then loop through every
   * vertex in the graph. If the vertex has not already been visited, then call
   * the private depth-first search method that will build up the sorted list.
   * 
   * Time complexity: O(V + E), where V is total vertices and E is total edges
   * Space complexity: O(V)
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    // Use another processor to check if there is a cycle
    const cycleProcessor = new DirectedCycle(this.graph);
    cycleProcessor.initialize();
    if (cycleProcessor.hasCycle) {
      throw new Error('Cycle found. Topological sort requires no cycles in the graph.') 
    };

    this.initialized = true;

    const visited = new Set();
    for (const vertex in this.graph.adjacencyList) {
      // Ignore prototype chain
      if (!this.graph.adjacencyList.hasOwnProperty(vertex)) { continue; }

      if (visited.has(vertex)) { continue; }
      visited.add(vertex);

      depthFirstSearch(
        this.graph,
        vertex,
        visited,
        this.sorted,
      );
    }
  }
}

module.exports = TopologicalSort;
