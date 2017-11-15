/**
 * @description Private method that initializes DepthFirstPaths constructor
 * values by using depth-first search. It is called in the initialize method on
 * the source vertex, which means it only searches through connected vertices.
 *
 * Strategy: Loop through adjacent vertices. Only visit unvisited vertices.
 * Upon visit, add to visited Set, store parent information, and continue DFS.
 *
 * Time complexity: O(visited)
 * Space complexity: O(visited)
 *
 * @param {Graph} graph - graph being processed
 * @param {String | Number} vertex - current vertex being traversed
 * @param {Set} visited - track which vertices have already been visited
 * @param {Object} parent - stores path information
 */
function depthFirstSearch(
  graph,
  vertex,
  visited,
  parent
) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error('The input vertex is not in the graph, my friend!');
  }

  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) { return; }
    visited.add(adjacentVertex);
    parent[adjacentVertex] = vertex;
    depthFirstSearch(graph, adjacentVertex, visited, parent);
  });
}

/** Class representing depth-first path processor */
class DepthFirstPaths {
  /**
   * Run initialize method once to populate constructor values. Then access
   * other methods to analyze processed data.
   * 
   * Works for both directed and undirected graphs.
   *
   * @constructor
   * @param {Graph} graph - graph being processed
   * @param {String | Number} sourceVertex - source vertex for processing... gotta start somewhere!
   */
  constructor(graph, sourceVertex) {
    this.graph = graph;
    this.initialized = false;
    this.parent = {};
    this.sourceVertex = String(sourceVertex);
    this.visited = new Set();
  }

  /**
   * @description Depth-first search to initialize constructor values. Must be 
   * called before other methods can be used.
   *
   * Strategy: Mark the source as visited then begin depth-first search.
   *
   * Time complexity: O(V + E) where V is total vertices and E is total edges
   * Space complexity: O(V)
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }    
    if (!this.graph.adjacencyList.hasOwnProperty(this.sourceVertex)) {
      throw new Error('The source vertex is not in the graph, my friend!');
    }

    this.initialized = true;
    this.visited.add(this.sourceVertex);

    depthFirstSearch(
      this.graph,
      this.sourceVertex,
      this.visited,
      this.parent
    );
  }

  /**
   * @description Check if input vertex is connected to the source vertex.
   *
   * Strategy: Check if vertex is in the visited Set.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String | Number} vertex - vertex that may be connected to source vertex
   * @return {Boolean} - true if vertex is connected to source vertex
   */
  hasPathTo(vertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }
    if (!this.graph.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('The input vertex is not in the graph, my friend!');
    }

    // Stringify to allow the user to call this method with numbers
    return this.visited.has(String(vertex));
  }

  /**
   * @description Get the path from the source vertex to the input vertex.
   *
   * Strategy: Traverse parent object until source vertex is reached.
   *
   * Time complexity: O(path length)
   * Space complexity: O(path length)
   *
   * @param {String | Number} destinationVertex - vertex whose path is sought from source vertex
   * @return {Array} - path from destination to source
   */
  pathTo(destinationVertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }
    if (!this.hasPathTo(destinationVertex)) { return null; }
    
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
