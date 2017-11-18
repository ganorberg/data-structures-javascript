/**
 * Class representing a weighted edge
 * @private
 */
class Edge {
  /**
   * Helper class to create weighted edges for Graph methods.
   *
   * Stringify vertices to avoid equality comparison issues against stringified
   * keys in adjacency list.
   *
   * @constructor
   *
   * @param {String|Number} v1 - vertex sharing an edge with v2
   * @param {String|Number} v2 - vertex sharing an edge with v1
   * @param {Number} weight - weight of edge between v1 and v2
   *
   * @property {String} v1 - vertex sharing an edge with v2
   * @property {String} v2 - vertex sharing an edge with v1
   * @property {Number} weight - weight of edge between v1 and v2
   */
  constructor([v1, v2, weight]) {
    this.v1 = String(v1);
    this.v2 = String(v2);
    this.weight = weight;
  }

  /**
   * @description Return the first vertex.
   *
   * @returns {String} - first vertex
   */
  either() {
    return this.v1;
  }

  /**
   * @description Return the vertex that is not input.
   *
   * @param {Number|String} vertex - looking for its partner in crime
   *
   * @returns {String} - other vertex
   */
  other(vertex) {
    // Use loose equality to allow users to input numbers
    if (this.v1 != vertex && this.v2 != vertex) {
      throw new Error('Must insert one of the vertices in this edge, my friend!');
    }

    return vertex == this.v1 ? this.v2 : this.v1;
  }
}

/**
 * @description Private method called in buildGraph function to add new edges to
 * the graph. Note this method mutates the graph.
 *
 * Strategy: Add edge to each vertex's adjacency list.
 *
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param {Object} adjacencyList - the graph object representation
 * @param {Object} edge - instance of Edge class with v1, v2 and weight
 *
 * @private
 */
function addEdge(adjacencyList, edge) {
  adjacencyList[edge.v1].push(edge);
  adjacencyList[edge.v2].push(edge);
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

    const edgeInstance = new Edge(edge);
    addEdge(adjacencyList, edgeInstance);
    totalEdges++;
  });

  return { adjacencyList, totalEdges, totalVertices };
}

/** Class representing a weighted graph with undirected edges */
class EdgeWeightedUndirectedGraph {
  /**
   * The graph is represented as an object-oriented adjacency list. Keys are
   * vertices and values are arrays of Edge objects. Each edge contains both
   * vertices and the weight of the connection. Vertex inputs are stringified in
   * all methods, so numbers (or any primitive data type) can be used as
   * vertices and will be represented as strings.
   *
   * Self-loops and parallel edges are allowed.
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
   * @description Add a new edge to the graph. Dynamically add vertices if they
   * did not exist prior.
   *
   * Strategy: Add vertices if they don't exist in the graph's adjacency list.
   * Then push edges to the adjacency lists of both input vertices. Increment
   * total edges.
   *
   * Edge case: if vertices are the same (i.e. self-loop), add both to same
   * adjacency list. This maintains mathematical consistency whereby each edge
   * represents two values in adjacency list, providing convenient calculations
   * for methods like averageDegree. 
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {Array<String|Number>} v1, v2, weight - edge vertices and weight
   */
  addEdge([v1, v2, weight]) {
    if (!this.adjacencyList.hasOwnProperty(v1)) { this.addVertex(v1); }
    if (!this.adjacencyList.hasOwnProperty(v2)) { this.addVertex(v2); }

    const edge = new Edge([v1, v2, weight]);

    this.adjacencyList[v1].push(edge);
    this.adjacencyList[v2].push(edge);
    this.totalEdges++;
  }

  /**
   * @description Add a new vertex to the graph.
   *
   * Strategy: If vertex is not already in adjacency list, then store with
   * key as vertex and value as empty array. Increment total vertices.
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
      throw new Error('That node already exists in the graph, my friend!');
    }

    this.adjacencyList[vertex] = [];
    this.totalVertices++;
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
   * @param {String|Number} vertex - vertex with potential adjacent vertices
   *
   * @returns {Array} - list of vertices adjacent to input vertex
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
   * @returns {Number} - average degree of graph
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
   * @param {String|Number} vertex - vertex whose degree is sought
   *
   * @returns {Number} - degree of vertex
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
   * Time complexity: O(V), where V is total vertices
   * Space complexity: O(1)
   *
   * @returns {Number} - largest degree in graph
   */
  maxDegree() {
    let max = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

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
   * Time complexity: O(V + E) where V is total vertices and E is total edges
   * Space complexity: O(1)
   *
   * @returns {Number} - number of self loops, as you might have guessed!
   */
  numberOfSelfLoops() {
    let count = 0;
    for (const vertex in this.adjacencyList) {
      // Ignore prototype chain
      if (!this.adjacencyList.hasOwnProperty(vertex)) { continue; }

      this.adjacencyList[vertex].forEach(edge => {
        if (edge.v1 === edge.v2) { count++; }
      });
    }

    return count / 2;
  }
}

module.exports = EdgeWeightedUndirectedGraph;
