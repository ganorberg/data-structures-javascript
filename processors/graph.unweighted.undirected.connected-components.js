/**
 * @description Private method that traverses graph using DFS to give each
 * vertex their component id.
 *
 * Strategy: Upon reaching a vertex, record their component id and mark them so
 * that they won't be visited again. Then loop through their adjacent vertices
 * and recurse only unvisited vertices.
 *
 * Edge case(s): Input vertex does not exist in graph
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Number} componentCount - track how many components have been created
 * @param {Graph} graph - graph being processed
 * @param {Object} id - key is vertex and value is id representing its component
 * @param {String|Number} vertex - current vertex being traversed
 * @param {Set} visited - track which vertices have already been visited
 *
 * @private
 */
function depthFirstSearch(
  componentCount,
  graph,
  id,
  vertex,
  visited,
) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error('The input vertex is not in the graph, my friend!');
  }

  id[vertex] = componentCount;
  visited.add(vertex);

  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) { return; }
    depthFirstSearch(
      componentCount,
      graph,
      id,
      adjacentVertex,
      visited,
    );
  });
}

/**
 * @description Count number of connected components in graph.
 *
 * Strategy: Loop through every vertex in the graph calling depth-first search
 * if the vertex has not been visited. After every search, increment the
 * total number of components to use as id.
 *
 * NOTE: I'm not a fan of this function both getting and setting simultaneously.
 * However, it keeps the ConnectedComponents constructor clean.
 *
 * Time complexity: O(V + E), where V is total vertices and E is total edges
 * Space complexity: O(V), where V is total vertices
 *
 * @param {Graph} graph - graph being processed
 * @param {Object} id - key is vertex and value is id representing its component
 *
 * @returns {Number} - total number of components
 *
 * @private
 */
function countComponents(graph, id) {
  if (!graph) { throw new Error('The graph is not loaded, my friend!'); }

  const visited = new Set();
  let componentCount = 0;

  for (const vertex in graph.adjacencyList) {
    // Ignore prototype chain
    if (!graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
    
    if (visited.has(vertex)) { continue; }

    depthFirstSearch(
      componentCount,
      graph,
      id,
      vertex,
      visited,
    );

    componentCount++;
  }

  return componentCount;
}
  
/** Class representing connection processor for unweighted undirected graphs */
class ConnectedComponents {
  /**
   * A connected component is a set of vertices whose edges connect them. If
   * you can traverse from one vertex to another by traveling along edges,
   * then they are part of the same component.
   *
   * @constructor
   *
   * @param {Graph} graph - graph being processed
   *
   * @property {Graph} graph - graph being processed
   * @property {Object} id - key is vertex and value is id representing its component
   * @property {Number} componentCount - number of components in graph
   */
  constructor(graph) {
    this.graph = graph;
    this.id = {};

    // NOTE: this also mutates the id object
    this.componentCount = countComponents(graph, this.id);
  }

  /**
   * @description Get number of components in graph.
   *
   * Strategy: Use component count property.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @returns {Number} - number of components in graph
   */
  getComponentCount() {
    return this.componentCount;
  }

  /**
   * @description Get id of component that vertex belongs to.
   *
   * Strategy: Use id object.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {String|Number} vertex - vertex whose component id is sought
   *
   * @returns {Number} - id of component that vertex belongs to
   */
  getComponentId(vertex) {
    if (!this.graph.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('The input vertex is not in the graph, my friend!');
    }

    return this.id[vertex];
  }
}

module.exports = ConnectedComponents;
