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
   * @param {*} sourceVertex - source vertex for processing... gotta start somewhere!
   */
  constructor(graph, sourceVertex) {
    this.parent = {};
    this.graph = graph;
    this.initialized = false;
    this.sourceVertex = sourceVertex;
    this.visited = new Set();
  }

  /**
   * @description Depth-first search to initialize constructor values. Must be 
   * called before other methods can be used.
   *
   * Strategy: Mark visited vertices so they won't be visited again. Then loop
   * through their adjacent vertices and recurse only unvisited vertices. Before
   * recursing, store the parent-link.
   *
   * Edge case(s): Input vertex does not exist in graph
   *
   * Time complexity: O(visited)
   * Space complexity: O(visited)
   *
   * @param {*=} vertex - source vertex
   */
  initialize(vertex = this.sourceVertex) {
    if (!this.graph.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('The input vertex is not in the graph, my dear friend!');
    }

    this.initialized = true;
    this.visited.add(vertex);

    this.graph.adjacencyList[vertex].forEach(adjacentVertex => {
      if (this.visited.has(adjacentVertex)) { return; }
      this.parent[adjacentVertex] = vertex;
      this.initialize(adjacentVertex);
    });
  }

  /**
   * @description Check if input vertex is connected to the source vertex.
   *
   * Strategy: Check if vertex is in the visited Set.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} vertex - vertex that may be connected to source vertex
   * @return {Boolean} - true if vertex is connected to source vertex
   */
  hasPathTo(vertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }

    return this.visited.has(vertex);
  }

  /**
   * @description Get the path from the source vertex to the input vertex.
   *
   * Strategy: Traverse parent object until source vertex is reached.
   *
   * Time complexity: O(path length)
   * Space complexity: O(path length)
   *
   * @param {*} destinationVertex - vertex whose path is sought from source vertex
   * @return {Array} - path from destination to source
   */
  pathTo(destinationVertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }
    if (!this.hasPathTo(destinationVertex)) { return null; }
    
    const path = [];
    for (
      let vertex = destinationVertex;
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
