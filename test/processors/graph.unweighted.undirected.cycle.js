const expect = require('chai').expect;

let UndirectedGraph;
let graph;
let UndirectedCycle;
let cycleProcessor;

try {
  UndirectedGraph = require('../../structures/graph.unweighted.undirected');
  graph = new UndirectedGraph();
  UndirectedCycle = require('../../processors/graph.unweighted.undirected.cycle');
  cycleProcessor = new UndirectedCycle(graph);
} catch (e) {
  throw new Error('UndirectedCycle could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('UndirectedCycle', () => {
  beforeEach(() => {
    graph = new UndirectedGraph();
    const edges = [
      [0, 7],
      [0, 1],
      [1, 2],
      [2, 4],
      [1, 3],
      [3, 5],
    ];

    /*
      No cycles initially:
      
      0 <-> 7
        <-> 1 <-> 2 <-> 4
              <-> 3 <-> 5
    */
    
    edges.forEach(edge => graph.addEdge(edge));

    cycleProcessor = new UndirectedCycle(graph);
  });

  it('should be extensible', () => {
    expect(cycleProcessor).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(cycleProcessor).to.have.all.keys(
      'graph',
      'checkCycle',
    );
  });

  it('should have a graph of type object', () => {
    expect(cycleProcessor.graph).to.be.an('object');
  });

  describe('#hasCycle()', () => {
    it('should return false if the graph does not contain a cycle', () => {
      expect(cycleProcessor.hasCycle()).to.be.false;
    });

    it('should detect a self-loop cycle', () => {
      graph = new UndirectedGraph();
      graph.addEdge([5, 5]);
      cycleProcessor = new UndirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
    
    it('should detect a parallel edge cycle', () => {
      graph = new UndirectedGraph();
      graph.addEdge([0, 5]);
      graph.addEdge([0, 5]);
      cycleProcessor = new UndirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
    
    it('should detect a typical cycle', () => {
      graph.addEdge([5, 0]);
      
      /*
        Now the graph has a cycle at the edge shared by 5 and 0
      
        0 <-> 7
          <-> 1 <-> 2 <-> 4
                <-> 3 <-> 5 <-> cycle 0
      */

      cycleProcessor = new UndirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
  });
});
