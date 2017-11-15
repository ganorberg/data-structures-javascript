const expect = require('chai').expect;

let DirectedGraph;
let graph;
let DirectedCycle;
let cycleProcessor;

try {
  DirectedGraph = require('../../structures/graph.unweighted.directed');
  graph = new DirectedGraph();
  DirectedCycle = require('../../processors/graph.unweighted.directed.cycle');
  cycleProcessor = new DirectedCycle();
} catch (e) {
  throw new Error('DirectedCycle could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

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
      'hasCycle',
      'initialized',
    );
  });
  
  it('should not be initialized before its initialize method is called', () => {
    expect(cycleProcessor.initialized).to.be.false;
  });

  it('should initially have hasCycle set to null', () => {
    expect(cycleProcessor.hasCycle).to.equal(null);
  });

  it('should have a graph of type object', () => {
    expect(cycleProcessor.graph).to.be.an('object');
  });

  describe('#initialize', () => {
    it('should return false if the graph does not contain a cycle', () => {
      expect(cycleProcessor.initialize()).to.be.false;
    });
    
    it('should set hasCycle to false if the graph does not contain a cycle', () => {
      cycleProcessor.initialize();

      expect(cycleProcessor.hasCycle).to.be.false;
    });
    
    it('should return true if the graph contains a cycle', () => {
      graph.addEdge([5, 0]);
  
      /*
        Now a cycle where 5 points to 0
      
        0 -> 7
          -> 1 -> 2 -> 4
               -> 3 -> 5 -> cycle 0
      */
      
      cycleProcessor = new DirectedCycle(graph);
      
      expect(cycleProcessor.initialize()).to.be.true;
    });
    
    it('should set hasCycle to true if the graph contains a cycle', () => {
      graph.addEdge([5, 0]);
  
      /*
        Now a cycle where 5 points to 0
      
        0 -> 7
          -> 1 -> 2 -> 4
               -> 3 -> 5 -> cycle 0
      */
      
      cycleProcessor = new DirectedCycle(graph);

      cycleProcessor.initialize()

      expect(cycleProcessor.hasCycle).to.be.true;
    });
    
    it('should set the initialized property to true', () => {
      cycleProcessor.initialize();

      expect(cycleProcessor.initialized).to.be.true;
    });

    it('should throw an error if called twice', () => {
      cycleProcessor.initialize();

      expect(() => cycleProcessor.initialize()).to.throw(Error);
    });
  });
});
