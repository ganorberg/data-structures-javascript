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
 * @param {*} vertex - current vertex being traversed
 * @param {Graph} graph - graph being processed
 * @param {Set} visited - track which vertices have already been visited
 * @param {Number} id - connected components share the same id
 * @param {Number} componentCount - track how many components have been created
 */
function depthFirstSearch(
  vertex,
  graph,
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
      adjacentVertex,
      graph,
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
   * @param {*} vertex - vertex whose component id is being sought
   * @return {Number} - component that vertex belongs to
   */
  componentId(vertex) {
    return this.id[vertex];
  }
  /**
   * @description Depth-first search to initialize constructor values.
   *
   * Strategy: Mark visited vertices so they won't be visited again. Then loop
   * through their adjacent vertices and recurse only unvisited vertices. Before
   * recursing, store the parent-link.
   *
   * Edge case(s): Input vertex does not exist in graph
   *
   * Time complexity: O(visited)
   * Space complexity: O(visited)
   *
   * @param {*=} vertex - source vertex
   */

  
  
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
   * Time complexity: O(N)
   * Space complexity: O(N)
   */
  initialize() {
    if (!this.graph) { throw new Error('The graph is not loaded, my friend!'); }

    this.initialized = true;

    const visited = new Set();
    for (let vertex in this.graph.adjacencyList) {
      vertex = Number(vertex);
      if (visited.has(vertex)) { continue; }
      depthFirstSearch(
        vertex,
        this.graph,
        visited,
        this.id,
        this.componentCount,
      );

      this.componentCount++;
    }
  }
}

module.exports = ConnectedComponents;
