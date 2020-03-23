/**
 * @description Private method that detects cycles using depth-first search.
 *
 * Strategy: Loop through adjacent vertices. If we see the same vertex twice
 * (not including parent of vertex in each DFS call), then there is a cycle.
 * Track visits using a set.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {String} parent - parent of the vertex whose adjacency list is looped
 * @param {String|Number} vertex - current vertex being traversed
 * @param {Set} visited - vertices already visited
 *
 * @private
 */
function depthFirstSearch(graph, parent, vertex, visited) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error("The input vertex is not in the graph");
  }

  for (const adjacentVertex of graph.adjacencyList[vertex]) {
    if (visited.has(adjacentVertex)) {
      // Ignore backedges. Without this, a single edge is considered a cycle.
      if (adjacentVertex === parent) {
        continue;
      }

      // If already visited and NOT the parent, the graph has a cycle!
      return true;
    }

    visited.add(adjacentVertex);

    const hasCycle = depthFirstSearch(graph, vertex, adjacentVertex, visited);

    if (hasCycle) {
      return true;
    }
  }

  return false;
}

/**
 * @description Private method that detects parallel edges.
 *
 * Strategy: Loop through adjacency lists looking for duplicates.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(A), where A is longest adjacent list
 *
 * @param {Graph} graph - graph being processed
 *
 * @returns {Boolean} - true if parallel edges found, otherwise false
 *
 * @private
 */
function hasParallelEdges(graph) {
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) {
      continue;
    }

    const adjacentVertices = graph.adjacencyList[vertex];
    const visited = new Set();

    for (const adjacentVertex of adjacentVertices) {
      if (visited.has(adjacentVertex)) {
        return true;
      }
      visited.add(adjacentVertex);
    }
  }

  return false;
}

/**
 * @description Private method that detects self loops.
 *
 * Strategy: Loop through adjacency lists looking for values that match the
 * parent.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(1)
 *
 * @param {Graph} graph - graph being processed
 *
 * @returns {Boolean} - true if self loop found, otherwise false
 *
 * @private
 */
function hasSelfLoop(graph) {
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) {
      continue;
    }
    const adjacentVertices = graph.adjacencyList[vertex];
    for (const adjacentVertex of adjacentVertices) {
      if (vertex === adjacentVertex) {
        return true;
      }
    }
  }

  return false;
}

/**
 * @description Check whether a cycle exists in the graph.
 *
 * Strategy: Check for self loops and parallel edges first, since those are
 * considered cycles. If none, loop through every vertex in the graph. Track
 * visits with a set. Call depth-first search on vertices that have not
 * already been visited. If DFS ever returns true, return true immediately.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V)
 *
 * @param {Object} graph - graph being processed
 *
 * @returns {Boolean} - true if cycle found, otherwise false
 *
 * @private
 */
function hasCycle(graph) {
  if (!graph) {
    throw new Error("The graph is not loaded");
  }
  if (hasSelfLoop(graph) || hasParallelEdges(graph)) {
    return true;
  }

  const visited = new Set();
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) {
      continue;
    }

    if (visited.has(vertex)) {
      continue;
    }
    visited.add(vertex);

    const hasCycle = depthFirstSearch(graph, null, vertex, visited);

    if (hasCycle) {
      return true;
    }
  }

  return false;
}

/** Class representing cycle processor for unweighted undirected graphs */
class UndirectedCycle {
  /**
   * @constructor
   *
   * @param {Object} graph - graph being processed
   *
   * @property {Object} graph - graph being processed
   * @property {Boolean} checkCycle - true if cycle found, otherwise false
   */
  constructor(graph) {
    this.graph = graph;
    this.checkCycle = hasCycle(graph);
  }

  /**
   * @description Check whether graph has a cycle.
   *
   * Strategy: Read checkCycle property.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Boolean} - true if cycle present, otherwise false
   */
  hasCycle() {
    return this.checkCycle;
  }
}

module.exports = UndirectedCycle;
