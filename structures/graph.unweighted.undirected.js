/**
 * @description Private method called in buildGraph function to add new edges to
 * the graph. Note this method mutates the graph.
 *
 * Strategy: Add each vertex to the other's adjacency list as a string.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} adjacencyList - the graph object representation
 * @param {Array<String|Number>} v1, v2 - vertices sharing new edge
 *
 * @private
 */
function addEdge(adjacencyList, [v1, v2]) {
  adjacencyList[v1].push(String(v2));
  adjacencyList[v2].push(String(v1));
}

/**
 * @description Private method called in buildGraph function to add new vertices
 * to the graph. Note this method mutates the graph.
 *
 * Strategy: In graph object, keys are vertices and values are arrays.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} adjacencyList - the graph object representation
 * @param {String|Number} vertex - vertex to be added
 *
 * @private
 */
function addVertex(adjacencyList, vertex) {
  adjacencyList[vertex] = [];
}

/**
 * @description Private method called in constructor to deliver initial values
 * for graph.
 *
 * Strategy: Loop through edges array. At each iteration, add the edge to the
 * graph and any new vertices encountered. Update metrics when adding.
 *
 * Time complexity: O(N)
 * Space complexity: O(N)
 *
 * @param {Array=} edges - array of subarrays containing pairs of vertices [v1, v2]
 *
 * @returns {Object} - initial values for Graph instance
 *
 * @private
 */
function buildGraph(edges = []) {
  const adjacencyList = {};
  let totalEdges = 0;
  let totalVertices = 0;

  edges.forEach(edge => {
    const [v1, v2] = edge;

    if (!adjacencyList.hasOwnProperty(v1)) {
      addVertex(adjacencyList, v1);
      totalVertices++;
    }
    if (!adjacencyList.hasOwnProperty(v2)) {
      addVertex(adjacencyList, v2);
      totalVertices++;
    }

    addEdge(adjacencyList, edge);
    totalEdges++;
  });

  return { adjacencyList, totalEdges, totalVertices };
}

/** Class representing a graph with undirected edges */
class UndirectedGraph {
  /**
   * Edges are represented in an object-oriented adjacency list where keys are
   * the vertices and values are arrays of adjacent vertices. Vertex inputs are
   * stringified in all methods, so numbers (or any primitive data type) can be
   * used as vertices and will be represented as strings.
   *
   * This graph allows self-loops and parallel edges.
   *
   * To build the graph, instantiate with an array of edges or call addEdge
   * manually with all edge pairs. The addEdge method will dynamically add
   * vertices to the adjacency list if they did not exist prior.
   *
   * @constructor
   *
   * @param {Array=} edges - array of subarrays containing pairs of vertices [v1, v2]
   *
   * @property {Object} adjacencyList - the graph itself
   * @property {Number} totalVertices - incremented when a vertex is added
   * @property {Number} totalEdges - incremented when an edge is added
   */
  constructor(edges = []) {
    const { adjacencyList, totalEdges, totalVertices } = buildGraph(edges);
    this.adjacencyList = adjacencyList;
    this.totalEdges = totalEdges;
    this.totalVertices = totalVertices;
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
   * @param {Array<String|Number>} v1, v2 - vertices sharing new edge
   */
  addEdge([v1, v2]) {
    if (!this.adjacencyList.hasOwnProperty(v1)) {
      this.addVertex(v1);
    }
    if (!this.adjacencyList.hasOwnProperty(v2)) {
      this.addVertex(v2);
    }
    this.adjacencyList[v1].push(String(v2));
    this.adjacencyList[v2].push(String(v1));
    this.totalEdges++;
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
   * @param {String|Number} vertex - vertex added to graph
   */
  addVertex(vertex) {
    if (this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error("That node already exists in the graph");
    }

    this.adjacencyList[vertex] = [];
    this.totalVertices++;
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
   * @param {String|Number} vertex - vertex with potential adjacent vertices
   * @returns {Array} - list of vertices adjacent to input vertex
   */
  adjacentVertices(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error("That vertex does not exist in the graph");
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
   * @returns {Number} - average degree of graph
   */
  averageDegree() {
    // Cannot divide by 0
    return this.totalVertices === 0
      ? 0
      : (2 * this.totalEdges) / this.totalVertices;
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
   * @param {String|Number} vertex - vertex whose degree is sought
   * @returns {Number} - degree of vertex
   */
  degree(vertex) {
    if (!this.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error("That vertex does not exist in the graph");
    }

    return this.adjacencyList[vertex].length;
  }

  /**
   * @description Get the highest degree in the graph.
   *
   * Strategy: Loop through each vertex with a for in loop. Calculate each
   * vertex's degree, then update max if it's the highest degree so far.
   *
   * Time complexity: O(V), where V is total vertices
   * Space complexity: O(1)
   *
   * @returns {Number} - largest degree in graph
   */
  maxDegree() {
    let max = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) {
        continue;
      }

      const degree = this.degree(vertex);
      if (degree > max) {
        max = degree;
      }
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
   * Time complexity: O(V + E) where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * @returns {Number} - number of self loops, as you might have guessed!
   */
  numberOfSelfLoops() {
    let count = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) {
        continue;
      }

      this.adjacencyList[vertex].forEach(adjacentVertex => {
        if (vertex === adjacentVertex) {
          count++;
        }
      });
    }

    return count / 2;
  }
}

module.exports = UndirectedGraph;
