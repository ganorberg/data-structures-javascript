const MinimumPriorityQueue = require("../structures/queue.priority.min");

/**
 * @description Private method that visits vertices placed in the minimum
 * spanning tree. Called in initializeMST.
 *
 * Strategy: Add input vertex to the Set of vertices in the MST. Loop through
 * its edges. If the other vertex is not in the MST, add the edge to the
 * priority queue.
 *
 * Time complexity: O(A), where A is adjacent vertices
 * Space complexity: O(1)
 *
 * @param {String|Number} vertex - current vertex visited
 * @param {Graph} graph - graph being processed
 * @param {Set} MSTvertices - vertices in the minimum spanning tree
 * @param {PriorityQueue} priorityQueue - minPQ tracking edge weights
 *
 * @private
 */
function visit(vertex, graph, MSTvertices, priorityQueue) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error("That vertex does not exist in the graph");
  }

  MSTvertices.add(vertex);

  // Insert edges only if both vertices not in MST
  graph.adjacencyList[vertex].forEach(edge => {
    if (MSTvertices.has(edge.other(vertex))) {
      return;
    }
    priorityQueue.insert(edge.weight, edge);
  });
}

/**
 * @description Private method that builds the minimum spanning tree.
 *
 * Strategy: Grab a starting vertex and visit it. Loop until all vertices are
 * included in MST. Greedily remove the min, add to MST, then visit unvisited
 * vertices.
 *
 * Time complexity: O(ElogV), where E is total edges and V is total vertices
 * Space complexity: O(E), where E is total edges
 *
 * @param {Graph} graph - graph being processed
 * @param {Set} MSTedges - edges in the minimum spanning tree
 *
 * @private
 */
function initializeMST(graph, MSTedges) {
  if (!graph) {
    throw new Error("The graph is not loaded");
  }

  // Ugly but efficient way to grab a starting vertex from graph
  let sourceVertex;
  for (const vertex in graph.adjacencyList) {
    if (!graph.adjacencyList.hasOwnProperty(vertex)) {
      continue;
    }
    sourceVertex = vertex;
    break;
  }

  if (sourceVertex === undefined) {
    throw new Error("Your graph is empty");
  }

  const MSTvertices = new Set();
  const priorityQueue = new MinimumPriorityQueue();

  // Populate priority queue with edges from source vertex and mark as visited
  visit(sourceVertex, graph, MSTvertices, priorityQueue);

  while (MSTvertices.size < graph.totalVertices) {
    const edge = priorityQueue.deleteMin().value;
    const { v1, v2 } = edge;
    if (MSTvertices.has(v1) && MSTvertices.has(v2)) {
      continue;
    }

    // Greedily add min edge to MST as long as only one vertex is in MST
    MSTedges.add(edge);

    // Populate priority queue and mark the vertex as visited
    if (!MSTvertices.has(v1)) {
      visit(v1, graph, MSTvertices, priorityQueue);
    } else if (!MSTvertices.has(v2)) {
      visit(v2, graph, MSTvertices, priorityQueue);
    }
  }
}

/**
 * Class representing a minimum spanning tree processor for weighted undirected
 * connected graphs
 */
class MinimumSpanningTree {
  /**
   * Prim's algorithm (lazy).
   *
   * @param {Object} graph - graph being processed
   *
   * @property {Object} graph - graph being processed
   * @property {Set} minimumSpanningTree - edges of MST
   */
  constructor(graph) {
    this.graph = graph;
    this.minimumSpanningTree = new Set();

    initializeMST(this.graph, this.minimumSpanningTree);
  }

  /**
   * @description Get the edges that comprise the minimum spanning tree.
   *
   * Strategy: Access minimumSpanningTree property.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Set} - set of edges comprising MST
   */
  getMinimumSpanningTree() {
    return this.minimumSpanningTree;
  }
}

module.exports = MinimumSpanningTree;
