/**
 * @description Private method that detects cycles using depth-first search. It
 * is called in the public initialize method.
 *
 * Strategy: Loop through adjacent vertices. If we see the same vertex twice
 * during the DFS call from the initialize method, then there is a cycle. If a
 * vertex was visited from a prior call from initialize, then no need to DFS
 * through it again. Upon visit, add to visited Set and continue DFS.
 *
 * Time complexity: O(visited this pass)
 * Space complexity: O(visited this pass)
 *
 * @param {Graph} graph - graph being processed
 * @param {String | Number} vertex - current vertex being traversed
 * @param {Set} visited - vertices already visited
 * @param {Object} visitedThisPass - vertices visited from initialize DFS call
 * @param {Object} cycleProcessor - DirectedCycle class instance
 */
function depthFirstSearch(
  graph,
  vertex,
  visited,
  visitedThisPass,
  cycleProcessor,
) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error('The input vertex is not in the graph, my friend!');
  }

  // for of loop used instead of forEach to allow early return that breaks loop
  for (const adjacentVertex of graph.adjacencyList[vertex]) {
    if (visitedThisPass.has(adjacentVertex)) {
      cycleProcessor.hasCycle = true;
      return;
    }

    if (visited.has(adjacentVertex)) { continue; }
    visitedThisPass.add(adjacentVertex);
    depthFirstSearch(
      graph,
      adjacentVertex,
      visited,
      visitedThisPass,
      cycleProcessor,
    );
  }
}

/**
 * @description Private method to combine two sets (i.e. union).
 *
 * Strategy: Instead of creating a brand new set, add values from the second
 * set to the first set. This mutation allows faster time complexity at the
 * expense of function purity.
 *
 * Time complexity: O(size of set b)
 * Space complexity: O(size of set b)
 *
 * @param {Set} a - set receiving items from b
 * @param {Set} b - set adding items to a
 * @return {Set} - union set (memory reference: set a)
 */
function joinSets(a, b) {
  b.forEach(item => a.add(item));
  return a;
}

/** Class representing cycle processor for directed graphs */
class DirectedCycle {
  /**
   * Run initialize method once to populate constructor values. Then access
   * hasCycle property to see if the graph has a cycle.
   *
   * This processor recognizes self-loops and backedges as cycles.
   *
   * @constructor
   * @param {Graph} graph - graph being processed
   */
  constructor(graph) {
    this.graph = graph;
    this.hasCycle = null;
    this.initialized = false;
  }
  
  /**
   * @description Initialize constructor values. After running, hasCycle will
   * contain a boolean value indicating whether a cycle was detected or not.
   *
   * Strategy: Loop through every vertex in the graph. If the vertex has not
   * already been visited, then call depth-first search on it. Track vertices
   * visited on each pass of DFS to detect if there is a cycle in that pass. If
   * a cycle is detected, return immediately. Otherwise, update the visited set
   * with all the values that were just visited on that DFS pass and continue
   * looping.
   * 
   * Time complexity: O(number of vertices)
   * Space complexity: O(number of vertices)
   *
   * @return {Boolean} - true if cycle found, otherwise false
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    this.initialized = true;

    let visited = new Set();
    for (const vertex in this.graph.adjacencyList) {
      // Ignore prototype chain
      if (!this.graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
      if (visited.has(vertex)) { continue; }
      
      const visitedThisPass = new Set();
      visitedThisPass.add(vertex);

      // Side effect: mutates this.hasCycle to true if cycle is found
      depthFirstSearch(
        this.graph,
        vertex,
        visited,
        visitedThisPass,
        this,
      );

      if (this.hasCycle) { return true; }
      visited = joinSets(visited, visitedThisPass);
    }

    return this.hasCycle = false;
  }
}

module.exports = DirectedCycle;
