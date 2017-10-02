/** Class representing a graph with directed edges */
class DirectedGraph {
  /**
   * Edges are represented in an object-oriented adjacency list where keys are
   * the vertices and values are arrays of adjacent vertices (outgoing).
   *
   * This graph allows self-loops, parallel edges and any primitive data type
   * for vertices.
   *
   * To build the graph, call addEdge with all edge pairs. The addEdge method
   * will dynamically add vertices to the adjacency list if they did not exist
   * prior.
   *
   * @constructor
   */
  constructor() {
    this.adjacencyList = {};
    this.totalVertices = 0;
    this.totalEdges = 0;
  }

  /**
   * @description Add a new directed edge to the graph. Also add vertices if
   * they did not exist prior.
   *
   * Strategy: Add vertices if they don't exist. Then push second input vertex
   * into first input vertex's adjacency list. Stringify second input vertex to
   * avoid equality comparison issues against stringified keys in other methods.
   * Take this opportunity to increment the edge count and indegree for the
   * second input vertex.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {Array<Integer>} v1, v2 - directed edge created where v1 -> v2
   * @return {Boolean} true - represents successful insertion
   */
  addEdge([v1, v2]) {
    if (!this.adjacencyList.hasOwnProperty(v1)) { this.addVertex(v1); }
    if (!this.adjacencyList.hasOwnProperty(v2)) { this.addVertex(v2); }
    this.adjacencyList[v1].push(String(v2));
    this.totalEdges++;
    this.inDegree.hasOwnProperty(v2)
      ? this.inDegree[v2]++
      : this.inDegree[v2] = 1;

    return true;
  }

  /**
   * @description Add a new vertex to the graph.
   *
   * Strategy: If vertex is not already in adjacency list, then store with
   * key as vertex and value as empty array. Array data type allows multiple
   * self-loops and parallel edges, unlike a Set. This trades functionality
   * for time complexity in methods seeking a specific edge.
   *
   * Edge case: throw error if vertex already exists
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {Number} vertex - vertex added to graph
   * @return {Boolean} true - represents successful insertion
   */
  addVertex(vertex) {
    if (this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That node already exists in the graph, my friend!');
    }

    this.adjacencyList[vertex] = [];
    this.totalVertices++;
    return true;
  }

  /**
   * @description Get all vertices adjacent to input vertex.
   *
   * Strategy: Use adjacency list for instant lookup.
   *
   * Edge case: vertex does not exist in graph
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} vertex - vertex with potential adjacent vertices
   * @return {Array} - list of vertices adjacent to input vertex
   */
  adjacentVertices(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    return this.adjacencyList[vertex];
  }

  /**
   * @description Get the average outdegree of the graph.
   *
   * Strategy: Since each edge adds 2 adjacent vertices in adjacency list per
   * 1 increment to totalEdges (including self-loops), doubling totalEdges
   * represents total number of adjacent vertices in the adjacency list. Divide
   * this by the totalVertices to get the average number of adjacent vertices
   * per vertex, a.k.a. average degree of the graph.
   *
   * Edge case: empty graph
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Number} - average outdegree of graph
   */
  averageOutDegree() {
    return this.totalVertices === 0 ? 0 : this.totalEdges / this.totalVertices;
  }

  /**
   * @description Get number of vertices directing to input vertex.
   *
   * Strategy: Loop through all vertices, then loop through all their adjacent
   * vertices. Increment counter when input vertex equals any adjacent vertices.
   *
   * ALTERNATE STRATEGY: Because the time complexity for this operation is so
   * slow (see below), linear space complexity should be considered for instant
   * lookup. This may not be desirable for large graphs, however, if indegree is
   * not an important metric, so this will be the default implementation.
   *
   * Edge case: vertex does not exist in graph
   *
   * Time complexity: O(VE), where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * @param {*} vertex - vertex whose degree is sought
   * @return {Number} - degree of vertex
   */
  inDegree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    let degree = 0;
    for (let vertexKeys in this.adjacencyList) {
      this.adjacencyList[vertexKeys].forEach(adjacentVertex => {
        // Loose equality allows user to input numbers
        if (vertex == adjacentVertex) { degree++; }
      });
    }

    return degree;
  }

  /**
   * @description Get number of vertices adjacent to input vertex.
   *
   * Strategy: Adjacent vertices are stored in an array, so use length property.
   *
   * Edge case: vertex does not exist in graph
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} vertex - vertex whose outdegree is sought
   * @return {Number} - outdegree of vertex
   */
  outDegree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    return this.adjacencyList[vertex].length;
  }

  /**
   * @description Get the highest outdegree in the graph.
   *
   * Strategy: Loop through each vertex with a for in loop. Calculate each
   * vertex's outdegree, then update max if its the highest outdegree so far.
   *
   * NOTE: Normally I would avoid for in loops as they access the prototype
   * chain. However, I believe this is better than the alternatives:
   * 1) Object.keys converts the adjacency list to an array, which introduces
   * linear space complexity and is unacceptable for large graphs.
   * 2) A normal for loop strictly requires numerical indices and vertices in
   * sequential natural order from 0 to n. This leads to poor user experience as
   * users have to worry about the next vertex sticking to the sequence. By
   * using for in, users can add any vertex value, including non-numbers.
   *
   * Time complexity: O(number of vertices)
   * Space complexity: O(1)
   *
   * @return {Number} - largest outdegree in graph
   */
  maxOutDegree() {
    let max = 0;
    for (let vertex in this.adjacencyList) {
      const degree = this.outDegree(vertex);
      if (degree > max) { max = degree; }
    }

    return max;
  }

  /**
   * @description Get the number of self loops in the graph.
   *
   * Strategy: Loop through each vertex's adjacent vertices and increment a
   * counter for all duplicates.
   *
   * NOTE: Normally I would avoid for in loops as they access the prototype
   * chain. However, I believe this is better than the alternatives:
   * 1) Object.keys converts the adjacency list to an array, which introduces
   * linear space complexity and is unacceptable for large graphs.
   * 2) A normal for loop strictly requires numerical indices and vertices in
   * sequential natural order from 0 to n. This leads to poor user experience as
   * users have to worry about the next vertex sticking to the sequence. By
   * using for in, users can add any vertex value, including non-numbers.
   *
   * Time complexity: O(V * d) where V is totalVertices and d is max degree
   * Space complexity: O(1)
   *
   * @return {Number} - number of self loops, as you might have guessed!
   */
  numberOfSelfLoops() {
    let count = 0;
    for (let vertex in this.adjacencyList) {
      this.adjacencyList[vertex].forEach(adjacentVertex => {
        if (vertex === adjacentVertex) { count++; }
      });
    }

    return count;
  }

  /**
   * @description Reverse direction of all edges in graph. Note that this
   * method mutates the graph object to include the reversedGraph property.
   *
   * Strategy: Create new reversed graph object where all vertices store edges
   * directed at them. Loop through adjacency list, then while traversing through
   * adjacent vertices, store parents in their child's array in the reversed
   * graph.
   *
   * ALTERNATE STRATEGY: This could be done in linear time while graph is
   * being built. The reversed graph structure could be instantiated with the
   * constructor call, then addEdge and addVertex could build it up with every
   * addition. However, this essentially stores the graph twice on constructor
   * call, which most users probably would not expect. Therefore, this method
   * allows users to reverse the graph by their choice later on, although the
   * time taken will be untenable for large, dense graphs.
   *
   * Time complexity: O(V * d), where V is total vertices and d is average degree
   * Space complexity: O(V + E), where V is total vertices and E is total edges
   *
   * @return {Object} - reversed directed graph
   */
  reverse() {
    this.reversedGraph = {};

    // Logic much simpler if two loops are used: first to initialize, second to push
    for (let vertex in this.adjacencyList) {
      this.reversedGraph[vertex] = [];
    }

    for (let vertex in this.adjacencyList) {
      this.adjacencyList[vertex].forEach(adjacentVertex => {
        this.reversedGraph[adjacentVertex].push(vertex);
      });
    }

    return this.reversedGraph;
  }
}

module.exports = DirectedGraph;

const graph = new DirectedGraph();

const edges = [
  [0, 5],
  [4, 3],
  [0, 1],
  [9, 12],
  [6, 4],
  [5, 4],
  [0, 2],
  [11, 12],
  [9, 10],
  [0, 6],
  [7, 8],
  [9, 11],
  [5, 3],
  [5, 5],
  [14, 14],
];

edges.forEach(edge => graph.addEdge(edge));

console.log(graph);
console.log(graph.reverse());