/**
 * @description Private method that finds paths from source vertex to other
 * connected vertices using depth-first search.
 *
 * Strategy: Loop through adjacent vertices. Only visit unvisited vertices.
 * Upon visit, add to visited Set, store parent information, and continue DFS.
 *
 * Time complexity: O(V + E), where V is total vertices
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {Object} parent - stores path information
 * @param {String} vertex - current vertex being traversed
 * @param {Set} visited - track which vertices have already been visited
 *
 * @private
 */
function depthFirstSearch(graph, parent, vertex, visited) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error("The input vertex is not in the graph");
  }

  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) {
      return;
    }
    visited.add(adjacentVertex);

    // Store path information for public methods to use later
    parent[adjacentVertex] = vertex;

    depthFirstSearch(graph, parent, adjacentVertex, visited);
  });
}

/**
 * @description Find paths from source vertex to all other vertices. Note this
 * function mutates objects passed from the constructor and will only touch
 * vertices connected to the source vertex.
 *
 * Strategy: Mark the source as visited then begin depth-first search.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {Object} parent - stores path information
 * @param {String} sourceVertex - starting point for DFS
 * @param {Set} visited - track which vertices have already been visited
 *
 * @private
 */
function findPaths(graph, parent, sourceVertex, visited) {
  if (!graph) {
    throw new Error("The graph is not loaded");
  }
  if (!graph.adjacencyList.hasOwnProperty(sourceVertex)) {
    throw new Error("The source vertex is not in the graph");
  }

  visited.add(sourceVertex);

  depthFirstSearch(graph, parent, sourceVertex, visited);
}

/** Class representing depth-first path processor for unweighted graphs */
class DepthFirstPaths {
  /**
   * Works for both directed and undirected graphs.
   *
   * @constructor
   *
   * @param {Graph} graph - graph being processed
   * @param {String|Number} sourceVertex - gotta start somewhere!
   *
   * @property {Graph} graph - graph being processed
   * @property {Object} parent - stores path information
   * @property {String|Number} sourceVertex - starting point for DFS
   * @property {Set} visited - track which vertices have already been visited
   */
  constructor(graph, sourceVertex) {
    this.graph = graph;
    this.parent = {};
    this.sourceVertex = String(sourceVertex);
    this.visited = new Set();

    findPaths(this.graph, this.parent, this.sourceVertex, this.visited);
  }

  /**
   * @description Check if input vertex is connected to the source vertex.
   *
   * Strategy: Check if vertex is in the visited Set.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String|Number} vertex - vertex that may be connected to source vertex
   *
   * @returns {Boolean} - true if vertex is connected to source vertex
   */
  hasPathTo(vertex) {
    if (!this.graph.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error("The input vertex is not in the graph");
    }

    // Stringify to allow the user to call this method with numbers
    return this.visited.has(String(vertex));
  }

  /**
   * @description Get the path from the source vertex to the input vertex.
   *
   * Strategy: Traverse parent object until source vertex is reached.
   *
   * Time complexity: O(P), where P is path length
   * Space complexity: O(P), where P is path length
   *
   * @param {String|Number} destinationVertex - vertex whose path is sought from source vertex
   *
   * @returns {Array} - path from destination to source
   */
  pathTo(destinationVertex) {
    if (!this.hasPathTo(destinationVertex)) {
      return null;
    }

    const path = [];
    for (
      // Stringify to allow the user to call this method with numbers
      let vertex = String(destinationVertex);
      vertex !== this.sourceVertex;
      vertex = this.parent[vertex]
    ) {
      path.push(vertex);
    }

    path.push(this.sourceVertex);
    return path;
  }
}

module.exports = DepthFirstPaths;
