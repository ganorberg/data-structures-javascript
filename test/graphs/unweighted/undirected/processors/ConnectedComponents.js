const expect = require('chai').expect;

let UndirectedGraph;
let graph;
let ConnectedComponents;
let connected;

try {
  UndirectedGraph = require('../../../../../structures/graphs/unweighted/undirected/Graph');
  graph = new UndirectedGraph();
  ConnectedComponents = require('../../../../../structures/graphs/unweighted/undirected/processors/ConnectedComponents');
  connected = new ConnectedComponents();
} catch (e) {
  throw new Error('ConnectedComponents could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('ConnectedComponents', () => {
  beforeEach(() => {
    graph = new UndirectedGraph();

    const edges = [
      [0, 5],
      [4, 3],
      [0, 1],
      [9, 12],
      [6, 4],
      [5, 4],
      [0, 2],
      [11, 12],
      [9, 10],
      [0, 6],
      [7, 8],
      [9, 11],
      [5, 3],
      [5, 5],
      [14, 14],
    ];
    
    edges.forEach(edge => graph.addEdge(edge));

    connected = new ConnectedComponents(graph);
  });

  it('should be extensible', () => {
    expect(connected).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(connected).to.have.all.keys(
      'componentCount',
      'graph',
      'id',
      'initialized',
    );
  });
  
  it('should not be initialized before its initialize method is called', () => {
    expect(connected.initialized).to.be.false;
  });

  it('should initially have an empty id object', () => {
    expect(connected.id).to.deep.equal({});
  });

  it('should initially have 0 components ', () => {
    expect(connected.componentCount).to.equal(0);
  });

  describe('#componentId', () => {
    it('should return the component id for the given vertex', () => {
      connected.initialize();
      
      expect(connected.componentId(6)).to.equal(0);
    });

    it('should throw an error if the processor has not been initialized', () => {
      expect(() => connected.componentId(0)).to.throw(Error);
    });

    it('should throw an error if the vertex is not in the graph', () => {
      connected.initialize();

      expect(() => connected.componentId('not in graph')).to.throw(Error);
    });
  });

  describe('#initialize', () => {
    it('should set the initialize property to true', () => {
      connected.initialize();

      expect(connected.initialized).to.be.true;
    });

    it('should process all vertices in the graph', () => {
      connected.initialize();

      const graphVertices = Object.keys(graph.adjacencyList);
      const processedVertices = Object.keys(connected.id);

      expect(graphVertices).to.deep.equal(processedVertices);
    });

    it('should throw an error if called twice', () => {
      connected.initialize();

      expect(() => connected.initialize()).to.throw(Error);
    });

    it('should work for number and string data types', () => {
      // Arrange
      graph = new UndirectedGraph();
      
      const edges = [
        ['dog', 'woof'],
        ['dog', 'bark'],
        ['cat', 'meow'],
        [0, 'meow'],
        [14, 'dog'],
      ];
      
      edges.forEach(edge => graph.addEdge(edge));
      connected = new ConnectedComponents(graph);
    
      // Act
      connected.initialize();
    
      // Assert
      expect(connected.id.hasOwnProperty('0')).to.be.true;
      expect(connected.id.hasOwnProperty('meow')).to.be.true;
      expect(connected.id.hasOwnProperty('cat')).to.be.true;
      expect(connected.id.hasOwnProperty('14')).to.be.true;
      expect(connected.id.hasOwnProperty('dog')).to.be.true;
      expect(connected.id.hasOwnProperty('woof')).to.be.true;
      expect(connected.id.hasOwnProperty('bark')).to.be.true;
    });
  });
});