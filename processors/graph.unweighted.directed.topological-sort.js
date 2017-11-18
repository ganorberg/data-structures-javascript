const DirectedCycle = require('./graph.unweighted.directed.cycle');

/**
 * @description Private method that sorts vertices topologically using
 * depth-first search.
 *
 * Strategy: Use Tarjan's algorithm where each vertex is sorted after they
 * complete their depth-first search calls. Track visits with a set.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {Array} sorted - vertices in topological sort order
 * @param {String|Number} vertex - current vertex being traversed
 * @param {Set} visited - vertices already visited
 *
 * @private
 */
function depthFirstSearch(
  graph,
  sorted,
  vertex,
  visited,
) {
  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) { return; }
    visited.add(adjacentVertex);

    depthFirstSearch(
      graph,
      sorted,
      adjacentVertex,
      visited,
    );
  });

  // Here is the magic! At the end of DFS the vertex becomes sorted.
  sorted.push(vertex);
}

/**
 * @description Get the topological sort for the input graph.
 *
 * Strategy: If the graph does not contain any cycles, then loop through every
 * vertex in the graph. If the vertex has not already been visited, then call
 * the private depth-first search method that will build up the sorted list.
 * 
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Object} graph - graph being processed
 * @param {Array} sorted - list that will contain vertices sorted topologically
 *
 * @private
 */
function initializeSort(graph, sorted) {
  if (!graph) { throw new Error('The graph is not loaded, my friend!'); }

  // Use another processor to check if there is a cycle
  const hasCycle = new DirectedCycle(graph).hasCycle();
  if (hasCycle) {
    throw new Error('Cycle found. Topological sort requires no cycles in the graph.') 
  };

  const visited = new Set();
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) { continue; }

    if (visited.has(vertex)) { continue; }
    visited.add(vertex);

    depthFirstSearch(
      graph,
      sorted,
      vertex,
      visited,
    );
  }
}

/** Class representing topological sort processor for unweighted directed acyclic graphs */
class TopologicalSort {
  /**
   * Tarjan's algorithm for DAGs.
   *
   * @constructor
   *
   * @param {Graph} graph - graph being processed
   *
   * @property {Graph} graph - graph being processed
   * @property {Array} sorted - list that will contain vertices sorted topologically
   */
  constructor(graph) {
    this.graph = graph;
    this.sorted = [];

    initializeSort(this.graph, this.sorted);
  }

  /**
   * @description Get vertices sorted in topological order.
   *
   * Strategy: Read sorted property.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Array} - list of vertices topologically sorted
   */
  getTopologicalOrder() {
    return this.sorted;
  }
}

module.exports = TopologicalSort;
