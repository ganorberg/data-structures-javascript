const expect = require('chai').expect;

let DirectedGraph;
let graph;
let TopologicalSort;
let topologicalProcessor;

try {
  DirectedGraph = require('../../../../structures/graphs/Directed');
  graph = new DirectedGraph();
  TopologicalSort = require('../../../../structures/graphs/processors/directed/TopologicalSort');
  topologicalProcessor = new TopologicalSort();
} catch (e) {
  throw new Error('TopologicalSort could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('TopologicalSort', () => {
  beforeEach(() => {
    graph = new DirectedGraph();
    const edges = [
      [0, 7],
      [0, 1],
      [1, 2],
      [2, 4],
      [1, 3],
      [3, 5],
    ];

    /*
      0 -> 7
        -> 1 -> 2 -> 4
             -> 3 -> 5
    */
    
    edges.forEach(edge => graph.addEdge(edge));

    topologicalProcessor = new TopologicalSort(graph);
  });

  it('should be extensible', () => {
    expect(topologicalProcessor).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(topologicalProcessor).to.have.all.keys(
      'graph',
      'initialized',
      'sorted',
    );
  });
  
  it('should not be initialized before its initialize method is called', () => {
    expect(topologicalProcessor.initialized).to.be.false;
  });

  it('should initially have an empty array for its sorted property', () => {
    expect(topologicalProcessor.sorted).to.deep.equal([]);
  });

  it('should have a graph of type object', () => {
    expect(topologicalProcessor.graph).to.be.an('object');
  });

  describe('#initialize', () => {
    it('should topologically sort the graph', () => {
      topologicalProcessor.initialize();

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
      
      topologicalProcessor = new TopologicalSort(graph);
      
      expect(() => topologicalProcessor.initialize()).to.throw(Error);
    });
    
    it('should set the initialized property to true', () => {
      topologicalProcessor.initialize();

      expect(topologicalProcessor.initialized).to.be.true;
    });

    it('should throw an error if called twice', () => {
      topologicalProcessor.initialize();

      expect(() => topologicalProcessor.initialize()).to.throw(Error);
    });
  });
});
