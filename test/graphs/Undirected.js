const expect = require('chai').expect;

let UndirectedGraph;
let graph;

try {
  UndirectedGraph = require('../../structures/graphs/Undirected');
  graph = new UndirectedGraph();
} catch (e) {
  throw new Error('UndirectedGraph could not be tested due to faulty import, likely ' +
  'from an incorrect file path or exporting a non-constructor from the file.');
}

// AAA (Arrange -> Act -> Assert) test pattern
describe('UndirectedGraph', () => {
  beforeEach(() => {
    graph = new UndirectedGraph();
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
      graph.addEdge([0, 5]);

      expect(graph.adjacencyList[0]).to.deep.equal([5]);
      expect(graph.adjacencyList[5]).to.deep.equal([0]);
    });

    it('should allow parallel edges', () => {
      graph.addEdge([0, 5]);
      graph.addEdge([0, 5]);

      expect(graph.adjacencyList[0]).to.deep.equal([5, 5]);
      expect(graph.adjacencyList[5]).to.deep.equal([0, 0]);
    });

    it('should allow self-loops and store value in adjacency list twice', () => {
      graph.addEdge([5, 5]);

      expect(graph.adjacencyList[5]).to.deep.equal([5, 5]);
    });
    
    it('should increment the total number of edges in the graph by 1', () => {
      graph.addEdge([0, 5]);

      expect(graph.totalEdges).to.equal(1);
    });

    it('should return true for successful insertion', () => {
      expect(graph.addEdge([10, 12])).to.equal(true);
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
      graph.addEdge([0, 5]);
      graph.addEdge([0, 1]);
      graph.addEdge([6, 0]);

      expect(graph.adjacentVertices(0)).to.deep.equal([5, 1, 6]);
    });

    it('should throw an error if the vertex does not exist in the graph', () => {
      expect(() => graph.adjacentVertices(0)).to.throw(Error);
    });
  });

  describe('#averageDegree', () => {
    it('should calculate the average degree for all vertices in graph', () => {
      // Arrange
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

      // Raw calculations compare against method's mathematical solution
      let totalDegrees = 0;
      Object.keys(graph.adjacencyList).forEach(vertex => {
        graph.adjacencyList[vertex].forEach(v2 => {
          totalDegrees++;
        });
      });

      const averageDegree = totalDegrees / Object.keys(graph.adjacencyList).length;

      // Act, Assert
      expect(graph.averageDegree()).to.equal(averageDegree);
    });

    it('should return 0 if the graph is empty', () => {
      expect(graph.averageDegree()).to.equal(0);
    });
  });

  describe('#degree', () => {
    it('should return the degree of the vertex', () => {
      graph.addEdge([0, 5]);
      graph.addEdge([0, 1]);

      expect(graph.degree(0)).to.equal(2);
    });

    it('should throw an error if the vertex is not in the graph', () => {
      expect(() => graph.degree(0)).to.throw(Error);
    });
  });

  describe('#maxDegree', () => {
    it('should return the maximum degree in the graph', () => {
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

      expect(graph.maxDegree()).to.equal(5);
    });

    it('should return 0 if the graph is empty', () => {
      expect(graph.maxDegree()).to.equal(0);
    });
  });

  describe('#numberOfSelfLoops', () => {
    it('should return the number of self loops in the graph', () => {
      graph.addEdge([0, 0]);
      graph.addEdge([1, 1]);
      graph.addEdge([2, 1]);

      expect(graph.numberOfSelfLoops()).to.equal(2);
    });

    it('should return 0 if the graph is empty', () => {
      expect(graph.numberOfSelfLoops()).to.equal(0);
    });
  });
});