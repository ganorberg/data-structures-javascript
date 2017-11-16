/**
 * @description Private method that initializes ConnectedComponents constructor
 * values by using depth-first search. It is called in the initialize method on
 * all unvisited vertices, which means eventually all vertices in the graph will
 * be visited.
 *
 * Strategy: Upon reaching a vertex, record their component id and mark them so
 * that they won't be visited again. Then loop through their adjacent vertices
 * and recurse only unvisited vertices.
 *
 * Edge case(s): Input vertex does not exist in graph
 *
 * Time complexity: O(visited)
 * Space complexity: O(visited)
 *
 * @param {Graph} graph - graph being processed
 * @param {String | Number} vertex - current vertex being traversed
 * @param {Set} visited - track which vertices have already been visited
 * @param {Number} id - connected components share the same id
 * @param {Number} componentCount - track how many components have been created
 */
function depthFirstSearch(
  graph,
  vertex,
  visited,
  id,
  componentCount,
) {
  if (!graph.adjacencyList.hasOwnProperty(vertex)) {
    throw new Error('The input vertex is not in the graph, my friend!');
  }

  id[vertex] = componentCount;
  visited.add(vertex);

  graph.adjacencyList[vertex].forEach(adjacentVertex => {
    if (visited.has(adjacentVertex)) { return; }
    depthFirstSearch(
      graph,
      adjacentVertex,
      visited,
      id,
      componentCount,
    );
  });
}

/** Class representing connection processor */
class ConnectedComponents {
  /**
   * Run initialize method once to populate constructor values. Then access
   * other methods to analyze processed data.
   *
   * @constructor
   *
   * @param {Graph} graph - graph being processed
   */
  constructor(graph) {
    this.componentCount = 0;
    this.graph = graph;
    this.id = {};
    this.initialized = false;
  }

  /**
   * @description Get id of component that vertex belongs to.
   *
   * Strategy: Use id object.
   *
   * Time complexity: O(1)
   * Space complexity: O(1)
   *
   * @param {*} vertex - vertex whose component id is sought
   *
   * @return {Number} - id of component that vertex belongs to
   */
  componentId(vertex) {
    if (!this.initialized) { throw new Error('Please initialize, my friend!'); }
    if (!this.graph.adjacencyList.hasOwnProperty(vertex)) {
      throw new Error('The input vertex is not in the graph, my friend!');
    }

    return this.id[vertex];
  }
  
  /**
   * @description Initialize constructor values. Must be called before other
   * methods can be used.
   *
   * Strategy: Loop through every vertex in the graph calling depth-first search
   * if the vertex has not been visited. After every search, increment the
   * total number of components.
   *
   * Edge case(s): User forgets to load a graph when calling the constructor
   *
   * Time complexity: O(number of vertices)
   * Space complexity: O(number of vertices)
   */
  initialize() {
    if (this.initialized) { throw new Error('Already initialized, my friend!'); }
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    this.initialized = true;

    const visited = new Set();
    for (const vertex in this.graph.adjacencyList) {
      // Ignore prototype chain
      if (!this.graph.adjacencyList.hasOwnProperty(vertex)) { continue; }
      if (visited.has(vertex)) { continue; }
      depthFirstSearch(
        this.graph,
        vertex,
        visited,
        this.id,
        this.componentCount,
      );

      this.componentCount++;
    }
  }
}

module.exports = ConnectedComponents;
