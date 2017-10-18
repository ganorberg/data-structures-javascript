/** Class representing breadth-first path processor */
class BreadthFirstPaths {
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
    this.distanceFromSource = {};
    this.graph = graph;
    this.initialized = false;
    this.parent = {};
    this.sourceVertex = String(sourceVertex);
    this.visited = new Set();
  }

  /**
   * @description Get the distance from the source vertex to the input vertex.
   *
   * Strategy: Access value in distanceFromSource object with vertex as key.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String | Number} vertex - vertex whose distance from source vertex is sought
   * @return {Number} - distance from source vertex to input vertex
   */
  distanceTo(vertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }
    if (!this.hasPathTo(vertex)) { return null; }
    return this.distanceFromSource[vertex];
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
   * @description Breadth-first search to initialize constructor values. Must be
   * called before other methods can be used.
   *
   * Strategy: Create a queue to store vertices at each distance from the source
   * vertex. At distance 0, the queue will only contain the source. At distance
   * 1, the queue will contain all adjacent vertices to the source. At distance
   * 2, the queue will contain the adjacent adjacent vertices, and so on. Only
   * unvisited vertices will be added to the queue while traversing. End when
   * queue is empty, which means all connected vertices have been visited.
   *
   * Edge case: if user inserts a source vertex that does not exist in the graph
   *
   * Time complexity: O(visited)
   * Space complexity: O(visited)
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph.adjacencyList.hasOwnProperty(this.sourceVertex)) {
      throw new Error("Please input a source vertex into the constructor that " +
        "exists in the graph.");
    }

    this.initialized = true;

    // Begin search with source vertex at distance 0
    let queue = [this.sourceVertex];
    this.visited.add(this.sourceVertex);
    let distanceFromSource = 0;
    this.distanceFromSource[this.sourceVertex] = distanceFromSource;

    while (true) {
      // Use additional queue to simplify distance tracking and avoid shifts
      let nextQueue = [];
      distanceFromSource++;

      // Key idea is to use vertices in queue to set up next queue
      queue.forEach(vertex => {
        this.graph.adjacencyList[vertex].forEach(adjacentVertex => {
          if (this.visited.has(adjacentVertex)) { return; }
          nextQueue.push(adjacentVertex);
          this.visited.add(adjacentVertex);

          // Track path and distance data for later analysis in other methods
          this.parent[adjacentVertex] = vertex;
          this.distanceFromSource[adjacentVertex] = distanceFromSource;
        });
      });

      if (nextQueue.length === 0) { return; }

      // Loop resumes with a new queue of vertices whose adjacent lists will be searched
      queue = nextQueue;
    }
  }
  
  /**
   * @description Get the shortest path from the source vertex to the input
   * vertex.
   *
   * Strategy: Traverse parent object until source vertex is reached.
   *
   * Time complexity: O(path length)
   * Space complexity: O(path length)
   *
   * @param {*} destinationVertex - vertex whose path is sought from source vertex
   * @return {Array} - shortest path from destination to source
   */
  shortestPathTo(destinationVertex) {
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

module.exports = BreadthFirstPaths;
