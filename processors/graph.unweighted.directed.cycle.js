/**
 * @description Private method that detects cycles using depth-first search.
 *
 * Strategy: Loop through adjacent vertices. If we see the same vertex twice
 * since the root DFS call, then there is a cycle. If a vertex was visited from
 * a prior call, then no need to DFS through it again. Upon visit, add to
 * visited Set and continue DFS.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {String|Number} vertex - current vertex being traversed
 * @param {Set} visited - vertices already visited
 * @param {Object} visitedThisPass - vertices visited since root DFS call
 *
 * @private
 */
function depthFirstSearch(graph, vertex, visited, visitedThisPass) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error("The input vertex is not in the graph");
  }

  // for of loop used instead of forEach to allow early return that breaks loop
  for (const adjacentVertex of graph.adjacencyList[vertex]) {
    if (visitedThisPass.has(adjacentVertex)) {
      return true;
    }
    if (visited.has(adjacentVertex)) {
      continue;
    }

    visitedThisPass.add(adjacentVertex);
    visited.add(adjacentVertex);

    const hasCycle = depthFirstSearch(
      graph,
      adjacentVertex,
      visited,
      visitedThisPass
    );

    if (hasCycle) {
      return true;
    }
  }

  return false;
}

/**
 * @description Check whether a cycle exists in the graph.
 *
 * Strategy: Loop through every vertex in the graph. If the vertex has not
 * already been visited, then call depth-first search on it. Track vertices
 * visited on each pass of DFS to detect if there is a cycle in that pass. If
 * a cycle is detected, return immediately. Otherwise, update the visited set
 * with all the values that were just visited on that DFS pass and continue
 * looping.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
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

  const visited = new Set();

  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) {
      continue;
    }

    // No need to repeat visits since DFS would have detected cycle on that pass
    if (visited.has(vertex)) {
      continue;
    }

    // If DFS visits a vertex twice since the initial call, then there is a cycle
    const visitedThisPass = new Set();
    visitedThisPass.add(vertex);

    const hasCycle = depthFirstSearch(graph, vertex, visited, visitedThisPass);

    if (hasCycle) {
      return true;
    }
  }

  return false;
}

/** Class representing cycle processor for unweighted directed graphs */
class DirectedCycle {
  /**
   * This processor recognizes self-loops and back edges as cycles.
   *
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

module.exports = DirectedCycle;
