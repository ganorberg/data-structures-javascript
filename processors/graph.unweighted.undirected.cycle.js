/**
 * @description Private method that detects cycles using depth-first search. It
 * is called in the public initialize method.
 *
 * Strategy: Loop through adjacent vertices. If we see the same vertex twice
 * (not including parent of vertex in each DFS call), then there is a cycle.
 * Track visits using a set.
 *
 * Time complexity: O(visited this pass)
 * Space complexity: O(visited this pass)
 *
 * @param {Graph} graph - graph being processed
 * @param {String | Number} vertex - current vertex being traversed
 * @param {String} parent - parent of the vertex whose adjacency list is looped
 * @param {Set} visited - vertices already visited
 * @param {Object} cycleProcessor - UndirectedCycle class instance
 */
function depthFirstSearch(
  graph,
  vertex,
  parent,
  visited,
  cycleProcessor,
) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error('The input vertex is not in the graph, my friend!');
  }

  for (const adjacentVertex of graph.adjacencyList[vertex]) {
    if (visited.has(adjacentVertex)) {
      // Ignore backedges. Without this, a single edge is considered a cycle.
      if (adjacentVertex === parent) { continue; }

      // If already visited and NOT the parent, the graph has a cycle!
      cycleProcessor.hasCycle = true;
      return;
    }

    visited.add(adjacentVertex);
    depthFirstSearch(
      graph,
      adjacentVertex,
      vertex,
      visited,
      cycleProcessor,
    );
  }
}

/**
 * @description Private method that detects parallel edges.
 *
 * Strategy: Loop through adjacency lists looking for duplicates.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(longest adjacent list)
 *
 * @param {Graph} graph - graph being processed
 *
 * @returns {Boolean} - true if parallel edges found, otherwise false
 */
function hasParallelEdges(graph) {
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
    
    const adjacentVertices = graph.adjacencyList[vertex];
    const visited = new Set();

    for (const adjacentVertex of adjacentVertices) {
      if (visited.has(adjacentVertex)) { return true; }
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
 */
function hasSelfLoop(graph) {
  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
    const adjacentVertices = graph.adjacencyList[vertex];
    for (const adjacentVertex of adjacentVertices) {
      if (vertex == adjacentVertex) { return true; }
    }
  }

  return false;
}

/** Class representing cycle processor for undirected graphs */
class UndirectedCycle {
  constructor(graph) {
    this.graph = graph;
    this.hasCycle = null;
    this.initialized = false;
  }
  /**
   * @description Initialize constructor values. After running, hasCycle will
   * contain a boolean value indicating whether a cycle was detected or not.
   *
   * Strategy: Check for self loops and parallel edges first, since those are
   * considered cycles. If none, loop through every vertex in the graph. Track
   * visits with a set. Call depth-first search on vertices that have not
   * already been visited. If DFS ever returns true, return true immediately.
   *
   * Time complexity: O(V + E), where V is total vertices and E is total edges
   * Space complexity: O(V)
   *
   * @returns {Boolean} - true if cycle found, otherwise false
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    this.initialized = true;

    if (hasSelfLoop(this.graph) || hasParallelEdges(this.graph)) {
      return this.hasCycle = true;
    }

    const visited = new Set();
    for (const vertex in this.graph.adjacencyList) {
      // Ignore prototype chain
      if (!this.graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
      if (visited.has(vertex)) { continue; }
      visited.add(vertex);
      
      // Side effect: mutates this.hasCycle to true if cycle is found
      depthFirstSearch(
        this.graph,
        vertex,
        null,
        visited,
        this,
      );
      
      if (this.hasCycle) { return true; }
    }

    return this.hasCycle = false;
  }
}

module.exports = UndirectedCycle;
