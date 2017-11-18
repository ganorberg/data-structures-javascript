const expect = require('chai').expect;

let DirectedGraph;
let graph;

let ShortestPath;
let path;

const SOURCE_VERTEX = 0;
const TEST_EDGES = [
  [0, 1, 5],
  [0, 4, 9],
  [0, 7, 8],
  [1, 2, 12],
  [1, 3, 15],
  [1, 7, 4],
  [2, 3, 3],
  [2, 6, 11],
  [3, 6, 9],
  [4, 5, 4],
  [4, 6, 20],
  [4, 7, 5],
  [5, 2, 1],
  [5, 6, 13],
  [7, 5, 6],
  [7, 2, 7],
  [11, 12, 13],
];

try {
  DirectedGraph = require('../../structures/graph.edge-weighted.directed');
  graph = new DirectedGraph(TEST_EDGES);
  
  ShortestPath = require('../../processors/graph.edge-weighted.directed.shortest-path-dijkstra');
  path = new ShortestPath(graph, SOURCE_VERTEX);
} catch (e) {
  throw new Error('ShortestPath could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('ShortestPath', () => {
  beforeEach(() => {
    graph = new DirectedGraph(TEST_EDGES);
    path = new ShortestPath(graph, SOURCE_VERTEX);
  });

  it('should be extensible', () => {
    expect(path).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(path).to.have.all.keys(
      'distanceFromSource',
      'graph',
      'parent',
      'sourceVertex',
      'visited',
    );
  });

  it('should set a string data type for source vertex', () => {
    expect(path.sourceVertex).to.equal(String(SOURCE_VERTEX));
  });

  describe('#distanceTo', () => {
    it('should return the weighted distance of a vertex adjacent to source vertex', () => {
      expect(path.distanceTo(4)).to.equal(9);
    });

    it('should return the weighted distance of a vertex two edges away from source vertex', () => {
      expect(path.distanceTo(5)).to.equal(13);
    });

    it('should return null if the input vertex is not connected to the source', () => {
      expect(path.distanceTo(11)).to.equal(null);
    });
  });

  describe('#hasPathTo', () => {
    it('should return true if the input vertex is connected to the source vertex', () => {
      expect(path.hasPathTo(6)).to.be.true;
    });
 
    it('should return false if the input vertex is not connected to the source vertex', () => {
      expect(path.hasPathTo(11)).to.be.false;
    });
 
    it('should throw an error if the input vertex is not in the graph', () => {
      expect(() => path.hasPathTo('not in graph')).to.throw(Error);
    });
  });

  describe('#shortestPathTo', () => {
    it('should return null if a path to the source vertex does not exist', () => {
      expect(path.shortestPathTo(11)).to.equal(null);
    });
 
    it('should return the shortest path to the source vertex if a path exists', () => {
      expect(path.shortestPathTo(6)).to.deep.equal(['6', '2', '5', '4', '0']);
    });
  });
});


