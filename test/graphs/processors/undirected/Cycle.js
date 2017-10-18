const expect = require('chai').expect;

let UndirectedGraph;
let graph;
let UndirectedCycle;
let cycleProcessor;

try {
  UndirectedGraph = require('../../../../structures/graphs/Undirected');
  graph = new UndirectedGraph();
  UndirectedCycle = require('../../../../structures/graphs/processors/undirected/Cycle');
  cycleProcessor = new UndirectedCycle();
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
    it('should detect a self-loop cycle', () => {
      graph = new UndirectedGraph();
      graph.addEdge([5, 5]);
      cycleProcessor = new UndirectedCycle(graph);
    
      cycleProcessor.initialize();
      
      expect(cycleProcessor.hasCycle).to.be.true;
    });
    
    it('should detect a parallel edge cycle', () => {
      graph = new UndirectedGraph();
      graph.addEdge([0, 5]);
      graph.addEdge([0, 5]);
      cycleProcessor = new UndirectedCycle(graph);
    
      cycleProcessor.initialize();
      
      expect(cycleProcessor.hasCycle).to.be.true;
    });
    it('should return false if the graph does not contain a cycle', () => {
      expect(cycleProcessor.initialize()).to.be.false;
    });
    
    it('should set hasCycle to false if the graph does not contain a cycle', () => {
      cycleProcessor.initialize();

      expect(cycleProcessor.hasCycle).to.be.false;
    });
    
    it('should return true if the graph contains a cycle', () => {
      graph = new UndirectedGraph();
      const edges = [
        [0, 7],
        [0, 1],
        [1, 2],
        [2, 4],
        [1, 3],
        [3, 5],
        [5, 0],
      ];
  
      /*
        Cycle at edge shared by 5 and 0
      
        0 <-> 7
          <-> 1 <-> 2 <-> 4
                <-> 3 <-> 5 <-> cycle 0
      */
      
      edges.forEach(edge => graph.addEdge(edge));
  
      cycleProcessor = new UndirectedCycle(graph);
      expect(cycleProcessor.initialize()).to.be.true;
    });
    
    it('should set hasCycle to true if the graph contains a cycle', () => {
      graph = new UndirectedGraph();
      const edges = [
        [0, 7],
        [0, 1],
        [1, 2],
        [2, 4],
        [1, 3],
        [3, 5],
        [5, 0],
      ];
  
      /*
        Cycle at edge shared by 5 and 0
      
        0 <-> 7
          <-> 1 <-> 2 <-> 4
                <-> 3 <-> 5 <-> cycle 0
      */
      
      edges.forEach(edge => graph.addEdge(edge));
      cycleProcessor = new UndirectedCycle(graph);

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
