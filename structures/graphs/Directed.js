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
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {Array<String | Number>} v1, v2 - directed edge created where v1 -> v2
   * @return {Boolean} true - represents successful insertion
   */
  addEdge([v1, v2]) {
    if (!this.adjacencyList.hasOwnProperty(v1)) { this.addVertex(v1); }
    if (!this.adjacencyList.hasOwnProperty(v2)) { this.addVertex(v2); }
    this.adjacencyList[v1].push(String(v2));
    this.totalEdges++;

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
   * @param {String | Number} vertex - vertex added to graph
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
   * @param {String | Number} vertex - vertex with potential adjacent vertices
   * @return {Array} - list of vertices adjacent to input vertex
   */
  adjacentVertices(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    return this.adjacencyList[vertex];
  }

  /**
   * @description Get the average degree of the graph.
   *
   * Strategy: Since each edge adds one degree to a vertex, use total edges as a
   * substitute for total degrees. Divide by total vertices to get the average.
   *
   * NOTE: The average is the same for indegree and outdegree because every
   * directed edge increases both by 1. Since total indegree and total outdegree
   * will always be the same, either total can represent total degrees.
   *
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Number} - average degree of graph
   */
  averageDegree() {
    // Cannot divide by 0
    return this.totalVertices === 0 ? 0 : this.totalEdges / this.totalVertices;
  }

  /**
   * @description Get number of vertices directing to input vertex.
   *
   * IF REVERSED GRAPH EXISTS
   * Strategy: Vertices pointing to the input vertex are stored in an array in
   * the reversed graph, so use its length property.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * IF REVERSED GRAPH DOES NOT EXIST
   * Strategy: Loop through all vertices, then loop through all their adjacent
   * vertices. Increment counter when input vertex equals any adjacent vertices.
   *
   * Time complexity: O(V + E), where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * Edge case: vertex does not exist in graph
   *
   * @param {String | Number} vertex - vertex whose degree is sought
   * @return {Number} - degree of vertex
   */
  inDegree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    // If user has called reverse method, they can get indegree in constant time!
    if (this.reversedGraph && this.reversedGraph.hasOwnProperty(vertex)) {
      return this.reversedGraph[vertex].length;
    }

    let degree = 0;
    for (const vertexKeys in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

      this.adjacencyList[vertexKeys].forEach(adjacentVertex => {
        // Loose equality allows user to input numbers
        if (vertex == adjacentVertex) { degree++; }
      });
    }

    return degree;
  }

  /**
   * @description Get the highest indegree in the graph. Be careful calling this
   * if your graph is large or dense without reversing the graph first (see time
   * complexity below).
   *
   * Strategy: Loop through each vertex with a for in loop. Calculate each
   * vertex's indegree, then update max if it's the highest indegree so far.
   *
   * IF REVERSED GRAPH EXISTS
   * Time complexity: O(total vertices)
   * Space complexity: O(1)
   *
   * IF REVERSED GRAPH DOES NOT EXIST
   * Time complexity: O(E + V^2), where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * Edge case: vertex does not exist in graph
   *
   * @param {String | Number} vertex - vertex whose degree is sought
   * @return {Number} - degree of vertex
   */
  maxInDegree(vertex) {
    let max = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }
      
      const degree = this.inDegree(vertex);
      if (degree > max) { max = degree; }
    }

    return max;
  }

  /**
   * @description Get the highest outdegree in the graph.
   *
   * Strategy: Loop through each vertex with a for in loop. Calculate each
   * vertex's outdegree, then update max if it's the highest outdegree so far.
   *
   * Time complexity: O(total vertices)
   * Space complexity: O(1)
   *
   * @return {Number} - largest outdegree in graph
   */
  maxOutDegree() {
    let max = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

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
   * Time complexity: O(V + E) where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * @return {Number} - number of self loops, as you might have guessed!
   */
  numberOfSelfLoops() {
    let count = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

      this.adjacencyList[vertex].forEach(adjacentVertex => {
        if (vertex === adjacentVertex) { count++; }
      });
    }

    return count;
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
   * @param {String | Number} vertex - vertex whose outdegree is sought
   * @return {Number} - outdegree of vertex
   */
  outDegree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    return this.adjacencyList[vertex].length;
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
   * Time complexity: O(V + E), where V is total vertices and E is total edges
   * Space complexity: O(V + E), where V is total vertices and E is total edges
   *
   * @return {Object} - reversed directed graph
   */
  reverse() {
    this.reversedGraph = {};

    // Logic much simpler if two loops are used: first to initialize, second to push
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

      this.reversedGraph[vertex] = [];
    }

    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }
      
      this.adjacencyList[vertex].forEach(adjacentVertex => {
        this.reversedGraph[adjacentVertex].push(vertex);
      });
    }

    return this.reversedGraph;
  }
}

module.exports = DirectedGraph;
