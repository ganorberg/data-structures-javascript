const expect = require('chai').expect;

let WeightedDigraph;
let graph;

try {
  WeightedDigraph = require('../../structures/graph.edge-weighted.directed');
  graph = new WeightedDigraph();
} catch (e) {
  throw new Error('WeightedDigraph could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// TODO: test other data types

// AAA (Arrange -> Act -> Assert) test pattern
describe('WeightedDigraph', () => {
  beforeEach(() => {
    graph = new WeightedDigraph();
  });

  it('should be extensible', () => {
    expect(graph).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(graph).to.have.all.keys('adjacencyList', 'totalEdges', 'totalVertices');
  });

  it('should initially have an adjacency list that is an empty object', () => {
    expect(graph.adjacencyList).to.deep.equal({});
  });

  it('should initially have 0 total vertices', () => {
    expect(graph.totalVertices).to.equal(0);
  });

  it('should initially have 0 total edges', () => {
    expect(graph.totalEdges).to.equal(0);
  });

  describe('#addEdge', () => {
    it('should add edges for new vertices', () => {
      graph.addEdge([0, 5, 0.1]);

      expect(graph.adjacencyList[0]).to.deep.equal([{ v1: '0', v2: '5', weight: 0.1 }]);
    });

    it('should allow parallel edges', () => {
      graph.addEdge([0, 5, 0.1]);
      graph.addEdge([0, 5, 0.1]);

      expect(graph.adjacencyList[0]).to.deep.equal([
        { v1: '0', v2: '5', weight: 0.1 },
        { v1: '0', v2: '5', weight: 0.1 },
      ]);
    });

    it('should allow self-loops', () => {
      graph.addEdge([5, 5, 0.1]);

      expect(graph.adjacencyList[5]).to.deep.equal([
        { v1: '5', v2: '5', weight: 0.1 }
      ]);
    });
    
    it('should increment the total number of edges in the graph by 1', () => {
      graph.addEdge([0, 5, 0.1]);

      expect(graph.totalEdges).to.equal(1);
    });

    it('should return true for successful insertion', () => {
      expect(graph.addEdge([10, 12, 0.1])).to.equal(true);
    });
  });

  describe('#addVertex', () => {
    it('should store the vertex as a key in the adjacency list with an empty array value', () => {
      graph.addVertex(0);

      expect(graph.adjacencyList[0]).to.deep.equal([]);
    });
   
    it('should increment the total number of vertices in the graph by 1', () => {
      graph.addVertex(0);

      expect(graph.totalVertices).to.equal(1);
    });
  
    it('should return true for successful insertion', () => {
      expect(graph.addVertex(0)).to.equal(true);
    });
  
    it('should throw an error if the vertex already exists in the graph', () => {
      graph.addVertex(0);

      expect(() => graph.addVertex(0)).to.throw(Error);
    });
  });

  describe('#adjacentVertices', () => {
    it('should return an array of vertices adjacent to the input vertex', () => {
      graph.addEdge([0, 5, 0.1]);
      graph.addEdge([0, 1, 0.2]);
      graph.addEdge([6, 0, 0.3]);

      expect(graph.adjacentVertices(0)).to.deep.equal([
        { v1: '0', v2: '5', weight: 0.1 },
        { v1: '0', v2: '1', weight: 0.2 },
      ]);
    });

    it('should throw an error if the vertex does not exist in the graph', () => {
      expect(() => graph.adjacentVertices(0)).to.throw(Error);
    });
  });
});