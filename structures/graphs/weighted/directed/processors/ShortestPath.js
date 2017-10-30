const MinimumPriorityQueue = require('../../../../priority-queues/MinTable');

/**
 * @description Use Dijkstra's shortest path algorithm to find the shortest path
 * from a source vertex to all other vertices in a graph. This implementation
 * also delivers two vertex maps: the first tracks shortest distance from the
 * source, and the second tracks the final edge that leads to its shortest path.
 *
 * Strategy: Traverse all vertices using breadth-first search. Use a Set to
 * detect vertices already visited. Use a min heap to store vertices and their
 * shortest distance from the source known so far. Until the priority queue is
 * empty, greedily grab the minimum distance vertex. If unvisited, loop through
 * its edges to compare distances from the source. If a smaller distance is
 * found, update the distance, the parent, and add to the priority queue.
 *
 * Time complexity: O(ElogV)
 * Space complexity: O(E)
 *
 * TIME COMPLEXITY EXPLAINED
 * Breadth-first search operates in O(V + E), where V is total vertices and E is
 * total edges. Each search has the potential to trigger a priority queue
 * insertion, which operates in O(logV). Therefore, multiplying these two gives
 * O((V + E)logV), which simplifies to O(ElogV) because E > V.
 *
 * SPACE COMPLEXITY EXPLAINED
 * Without decrease key, the priority queue has the potential to add all edges
 * from the graph. Therefore, the space complexity is O(E), which is greater
 * than O(V) from the visited Set.
 */
function dijkstra(
  source,
  graph,
  visited,
  distanceFromSource,
  parent,
) {
  if (!graph.adjacencyList.hasOwnProperty(source)) {
    throw new Error('This source vertex is not in the graph, my friend!');
  }

  // All vertices begin with infinity for distance comparisons later
  for (const vertex in graph.adjacencyList) {
    if (!graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
    distanceFromSource[vertex] = Infinity;
  }

  // Source begins with 0 distance. Use constant to avoid magic numbers.
  const SOURCE_DISTANCE_FROM_ITSELF = 0;
  distanceFromSource[source] = SOURCE_DISTANCE_FROM_ITSELF;
  
  // Efficient for sparse graphs, as most real-world graphs tend to be
  const minPQ = new MinimumPriorityQueue();
  minPQ.insert(SOURCE_DISTANCE_FROM_ITSELF, source);

  // Could check all vertices visited, but wouldn't work for unconnected graphs
  while (!minPQ.isEmpty()) {
    const minVertex = minPQ.deleteMin().value;

    // Allow dupes on priority queue but only visit one with smallest distance
    if (visited.has(minVertex)) { continue; }
    visited.add(minVertex);

    graph.adjacencyList[minVertex].forEach(edge => {
      const distance = distanceFromSource[minVertex] + edge.weight;
      const adjacentVertex = edge.to();

      // Take action only if we find a shorter distance path
      if (distance >= distanceFromSource[adjacentVertex]) { return; }
      distanceFromSource[adjacentVertex] = distance;
      parent[adjacentVertex] = minVertex;
      minPQ.insert(distance, adjacentVertex);
    });
  }
}

/** Class representing shortest path processor for weighted directed graphs */
class ShortestPath {
  /**
   * Modern Dijkstra's algorithm with source node and priority queue. Effective
   * for graphs with nonnegative weights and cycles. Performed without decrease key
   * to trade space for better time complexity as outlined in this research paper:
   * https://pdfs.semanticscholar.org/5c50/a1593b6cbb16b578dc57ebf38c26d479c317.pdf
   *
   * Run initialize method once to populate constructor values. Then use methods
   * to access information.
   *
   * @constructor
   * @param {Graph} graph - graph being processed
   * @param {String|Number} sourceVertex - source vertex for all paths
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
   * @description Get the shortest distance from the source vertex to the input
   * vertex.
   *
   * Strategy: Access value in distanceFromSource object with vertex as key.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String|Number} vertex - vertex whose distance from source is sought
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
   * @description Initialize constructor values.
   *
   * Strategy: Call dijkstra private method.
   * 
   * Time complexity: O(ElogV), where E is total edges and V is total vertices
   * Space complexity: O(E)
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    this.initialized = true;

    dijkstra(
      this.sourceVertex,
      this.graph,
      this.visited,
      this.distanceFromSource,
      this.parent,
    );
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
   * @param {String|Number} destinationVertex - vertex whose path is sought
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

module.exports = ShortestPath;
