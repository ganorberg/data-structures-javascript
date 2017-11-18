const expect = require('chai').expect;

let DirectedGraph;
let graph;
let DirectedCycle;
let cycleProcessor;

try {
  DirectedGraph = require('../../structures/graph.unweighted.directed');
  graph = new DirectedGraph();
  DirectedCycle = require('../../processors/graph.unweighted.directed.cycle');
  cycleProcessor = new DirectedCycle(graph);
} catch (e) {
  throw new Error('DirectedCycle could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

// TODO: test 0->2->0, 0->1->2->0 and 3->3
describe('DirectedCycle', () => {
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
      No cycles initially:
      
      0 -> 7
        -> 1 -> 2 -> 4
             -> 3 -> 5
    */
    
    edges.forEach(edge => graph.addEdge(edge));

    cycleProcessor = new DirectedCycle(graph);
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
  
    it('should return true if the graph contains a cycle', () => {
      graph.addEdge([5, 0]);
      
      /*
        Now the graph has a cycle where 5 points to 0
      
        0 -> 7
          -> 1 -> 2 -> 4
                -> 3 -> 5 -> cycle 0
      */

      cycleProcessor = new DirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
  
    it('should return true if the graph contains a self loop', () => {
      graph.addEdge([5, 5]);
      
      /*
        Now the graph has a cycle where 5 points to 5
      
        0 -> 7
          -> 1 -> 2 -> 4
                -> 3 -> 5 -> cycle 5
      */
      
      cycleProcessor = new DirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
  
    it('should return true if the graph contains a back edge', () => {
      graph.addEdge([5, 8]);
      graph.addEdge([8, 5]);
      
      /*
        Now the graph has a cycle where 8 points to 5
      
        0 -> 7
          -> 1 -> 2 -> 4
                -> 3 -> 5 -> 8 -> cycle 5
      */
      
      cycleProcessor = new DirectedCycle(graph);
      
      expect(cycleProcessor.hasCycle()).to.be.true;
    });
  });
});
