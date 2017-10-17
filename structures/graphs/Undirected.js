/** Class representing a graph with undirected edges */
class UndirectedGraph {
  /**
   * Edges are represented in an object-oriented adjacency list where keys are
   * the vertices and values are arrays of adjacent vertices.
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
   * @description Add a new edge to the graph. Also add vertices if they did not
   * exist prior.
   *
   * Strategy: Add vertices if they don't exist. Then push vertices to each
   * other's adjacency lists. Stringify second input vertex to avoid equality
   * comparison issues against stringified keys in other methods.
   *
   * Edge case: if vertices are the same (i.e. self-loop), add both to same
   * adjacency list. This maintains mathematical consistency whereby each edge
   * represents two values in adjacency list, providing convenient calculations
   * for methods like averageDegree. 
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {Array<String | Number>} v1, v2 - vertices sharing new edge
   * @return {Boolean} true - represents successful insertion
   */
  addEdge([v1, v2]) {
    if (!this.adjacencyList.hasOwnProperty(v1)) { this.addVertex(v1); }
    if (!this.adjacencyList.hasOwnProperty(v2)) { this.addVertex(v2); }
    this.adjacencyList[v1].push(String(v2));
    this.adjacencyList[v2].push(String(v1));
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
   * Strategy: Use adjacent list for instant lookup.
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
   * Strategy: Since each edge adds 2 degrees in adjacency list (including
   * self-loops), doubling the number of edges represents total number of
   * degrees in the adjacency list. Divide this by the number of vertices to get
   * the average degree.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @return {Number} - average degree of graph
   */
  averageDegree() {
    // Cannot divide by 0
    return this.totalVertices === 0
      ? 0
      : 2 * this.totalEdges / this.totalVertices;
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
   * @param {String | Number} vertex - vertex whose degree is sought
   * @return {Number} - degree of vertex
   */
  degree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('That vertex does not exist in the graph, my friend!');
    }

    return this.adjacencyList[vertex].length;
  }

  /**
   * @description Get the highest degree in the graph.
   *
   * Strategy: Loop through each vertex with a for in loop. Calculate each
   * vertex's degree, then update max if it's the highest degree so far.
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
   * Time complexity: O(total vertices)
   * Space complexity: O(1)
   *
   * @return {Number} - largest degree in graph
   */
  maxDegree() {
    let max = 0;
    for (let vertex in this.adjacencyList) {
      const degree = this.degree(vertex);
      if (degree > max) { max = degree; }
    }

    return max;
  }

  /**
   * @description Get the number of self loops in the graph.
   *
   * Strategy: Loop through each vertex's adjacent vertices and increment a
   * counter for all duplicates. Then divide that counter by 2 because the
   * addEdge implementation pushes 2 copies of the vertex to its own adjacency
   * list.
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
   * Time complexity: O(V + E) where V is total vertices and E is total edges
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

    return count / 2;
  }
}

module.exports = UndirectedGraph;
