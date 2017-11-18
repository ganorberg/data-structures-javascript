const expect = require('chai').expect;

let DirectedGraph;
let graph;

let TopologicalSort;
let topologicalProcessor;

const TEST_EDGES = [
  [0, 7],
  [0, 1],
  [1, 2],
  [2, 4],
  [1, 3],
  [3, 5],
];

try {
  DirectedGraph = require('../../structures/graph.unweighted.directed');
  graph = new DirectedGraph(TEST_EDGES);

  TopologicalSort = require('../../processors/graph.unweighted.directed.topological-sort');
  topologicalProcessor = new TopologicalSort(graph);
} catch (e) {
  throw new Error('TopologicalSort could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('TopologicalSort', () => {
  beforeEach(() => {
    graph = new DirectedGraph(TEST_EDGES);

    /*
      0 -> 7
        -> 1 -> 2 -> 4
             -> 3 -> 5
    */

    topologicalProcessor = new TopologicalSort(graph);
  });

  it('should be extensible', () => {
    expect(topologicalProcessor).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(topologicalProcessor).to.have.all.keys(
      'graph',
      'sorted',
    );
  });
  
  it('should have a graph of type object', () => {
    expect(topologicalProcessor.graph).to.be.an('object');
  });

  it('should topologically sort the graph', () => {
    expect(topologicalProcessor.sorted).to.deep.equal(
      ['7', '4', '2', '5', '3', '1', '0']
    );
  });

  it('should throw an error if the graph contains a cycle', () => {
    graph.addEdge([5, 0]);
    
    /*
      Now the graph has a cycle where 5 points to 0
    
      0 -> 7
        -> 1 -> 2 -> 4
              -> 3 -> 5 -> cycle 0
    */
    
    expect(() => new TopologicalSort(graph)).to.throw(Error);
  });

  it('should throw an error if the graph contains a self loop', () => {
    graph.addEdge([5, 5]);
    
    /*
      Now the graph has a cycle where 5 points to 5
    
      0 -> 7
        -> 1 -> 2 -> 4
              -> 3 -> 5 -> cycle 5
    */
    
    expect(() => new TopologicalSort(graph)).to.throw(Error);
  });

  it('should throw an error if the graph contains a back edge', () => {
    graph.addEdge([5, 8]);
    graph.addEdge([8, 5]);
    
    /*
      Now the graph has a cycle where 8 points to 5
    
      0 -> 7
        -> 1 -> 2 -> 4
              -> 3 -> 5 -> 8 -> cycle 5
    */
    
    expect(() => new TopologicalSort(graph)).to.throw(Error);
  });

  describe('#getTopologicalOrder()', () => {
    it('should return an array', () => {
      expect(topologicalProcessor.getTopologicalOrder()).to.be.instanceOf(Array);
    });

    it('should return the vertices in topological order', () => {
      expect(topologicalProcessor.getTopologicalOrder()).to.deep.equal(
        ['7', '4', '2', '5', '3', '1', '0']
      );
    });
  });
});
