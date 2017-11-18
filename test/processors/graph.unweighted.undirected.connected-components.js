const expect = require('chai').expect;

let UndirectedGraph;
let graph;

let ConnectedComponents;
let connected;

const TEST_EDGES = [
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

try {
  UndirectedGraph = require('../../structures/graph.unweighted.undirected');
  graph = new UndirectedGraph(TEST_EDGES);

  ConnectedComponents = require('../../processors/graph.unweighted.undirected.connected-components');
  connected = new ConnectedComponents(graph);
} catch (e) {
  throw new Error('ConnectedComponents could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('ConnectedComponents', () => {
  beforeEach(() => {
    graph = new UndirectedGraph(TEST_EDGES);
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
    );
  });

  it('should process all vertices in the graph', () => {
    const graphVertices = Object.keys(graph.adjacencyList);
    const processedVertices = Object.keys(connected.id);

    expect(graphVertices).to.deep.equal(processedVertices);
  });

  it('should work for number and string data types', () => {
    // Arrange
    const edges = [
      ['dog', 'woof'],
      ['dog', 'bark'],
      ['cat', 'meow'],
      [0, 'meow'],
      [14, 'dog'],
    ];

    graph = new UndirectedGraph(edges);

    // Act
    connected = new ConnectedComponents(graph);
  
    // Assert
    expect(connected.id.hasOwnProperty(0)).to.be.true;
    expect(connected.id.hasOwnProperty('meow')).to.be.true;
    expect(connected.id.hasOwnProperty('cat')).to.be.true;
    expect(connected.id.hasOwnProperty(14)).to.be.true;
    expect(connected.id.hasOwnProperty('dog')).to.be.true;
    expect(connected.id.hasOwnProperty('woof')).to.be.true;
    expect(connected.id.hasOwnProperty('bark')).to.be.true;
  });

  describe('#getComponentCount', () => {
    it('should return the number of components in the graph', () => {
      expect(connected.getComponentCount()).to.equal(4);
    });
  });

  describe('#getComponentId', () => {
    it('should return the component id for a vertex in the first component', () => {
      expect(connected.getComponentId(6)).to.equal(0);
    });

    it('should return the component id for a vertex in the last component', () => {
      expect(connected.getComponentId(14)).to.equal(3);
    });

    it('should throw an error if the vertex is not in the graph', () => {
      expect(() => connected.getComponentId('not in graph')).to.throw(Error);
    });
  });
});