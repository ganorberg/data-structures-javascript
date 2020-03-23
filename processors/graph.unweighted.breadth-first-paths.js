/**
 * @description Private method that tracks path and distance information from
 * source vertex to other connected vertices using breadth-first search.
 *
 * Strategy: Create a queue to store vertices at each distance from the source
 * vertex. At distance 0, the queue will only contain the source. At distance 1,
 * the queue will contain all adjacent vertices to the source. At distance 2,
 * the queue will contain the adjacent adjacent vertices, and so on. Only
 * unvisited vertices will be added to the queue while traversing. End when
 * queue is empty, which means all connected vertices have been visited.
 *
 * Edge case: if user inserts a source vertex that does not exist in the graph
 *
 * Time complexity: O(V), where V is total vertices
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Object} distanceFromSource - track how far each vertex is from source
 * @param {Object} graph - graph being processed
 * @param {Object} parent - track how algorithm reaches each vertex
 * @param {String} sourceVertex - vertex where BFS begins
 * @param {Set} visited - track which vertices have already been visited
 *
 * @private
 */
function initializeBFS(
  distanceFromSource,
  graph,
  parent,
  sourceVertex,
  visited
) {
  if (!graph) {
    throw new Error("The graph is not loaded");
  }
  if (!graph.adjacencyList.hasOwnProperty(sourceVertex)) {
    throw new Error(
      "Please input a source vertex into the constructor that " +
        "exists in the graph."
    );
  }

  // Begin search with source vertex at distance 0
  let queue = [sourceVertex];
  visited.add(sourceVertex);
  let distance = 0;
  distanceFromSource[sourceVertex] = distance;

  while (true) {
    // Use additional queue to simplify distance tracking and avoid expensive shifts
    let nextQueue = [];
    distance++;

    // Key idea is to use vertices in queue to set up next queue
    queue.forEach(vertex => {
      graph.adjacencyList[vertex].forEach(adjacentVertex => {
        if (visited.has(adjacentVertex)) {
          return;
        }
        nextQueue.push(adjacentVertex);
        visited.add(adjacentVertex);

        // Track path and distance data for later use by public methods
        parent[adjacentVertex] = vertex;
        distanceFromSource[adjacentVertex] = distance;
      });
    });

    // Exit condition: nothing new to see
    if (nextQueue.length === 0) {
      return;
    }

    // Loop resumes with a new queue of vertices whose adjacent lists will be searched
    queue = nextQueue;
  }
}

/** Class representing breadth-first path processor for unweighted graphs */
class BreadthFirstPaths {
  /**
   * Breadth-first search that tracks distance and path information.
   *
   * @constructor
   *
   * @param {Graph} graph - graph being processed
   * @param {String|Number} sourceVertex - source vertex for processing... gotta start somewhere!
   *
   * @property {Object} distanceFromSource - track how far each vertex is from source
   * @property {Object} graph - graph being processed
   * @property {Object} parent - track how algorithm reaches each vertex
   * @property {String|Number} sourceVertex - vertex where BFS begins
   * @property {Set} visited - track which vertices have already been visited
   */
  constructor(graph, sourceVertex) {
    this.distanceFromSource = {};
    this.graph = graph;
    this.parent = {};
    this.sourceVertex = String(sourceVertex);
    this.visited = new Set();

    initializeBFS(
      this.distanceFromSource,
      this.graph,
      this.parent,
      this.sourceVertex,
      this.visited
    );
  }

  /**
   * @description Get the distance from the source vertex to the input vertex.
   *
   * Strategy: Access value in distanceFromSource object with vertex as key.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String|Number} vertex - vertex whose distance from source vertex is sought
   *
   * @returns {Number} - distance from source vertex to input vertex
   */
  distanceTo(vertex) {
    if (!this.hasPathTo(vertex)) {
      return null;
    }
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
   * @description Get the shortest path from the source vertex to the input
   * vertex.
   *
   * Strategy: Traverse parent object until source vertex is reached.
   *
   * Time complexity: O(P), where P is path length
   * Space complexity: O(P), where P is path length
   *
   * @param {String|Number} destinationVertex - vertex whose path is sought from source vertex
   *
   * @returns {Array} - shortest path from destination to source
   */
  shortestPathTo(destinationVertex) {
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

module.exports = BreadthFirstPaths;
