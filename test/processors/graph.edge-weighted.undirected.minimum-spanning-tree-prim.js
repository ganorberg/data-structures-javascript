const expect = require('chai').expect;

let UndirectedGraph;
let graph;
let MinSpanningTree;
let mst;

try {
  UndirectedGraph = require('../../structures/graph.edge-weighted.undirected');
  graph = new UndirectedGraph();
  MinSpanningTree = require('../../processors/graph.edge-weighted.undirected.minimum-spanning-tree-prim');
  mst = new MinSpanningTree();
} catch (e) {
  throw new Error('MinSpanningTree could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('MinSpanningTree', () => {
  beforeEach(() => {
    graph = new UndirectedGraph();

    const edges = [
      [0, 7, 0.16],
      [2, 3, 0.17],
      [1, 7, 0.19],
      [0, 2, 0.26],
      [5, 7, 0.28],
      [1, 3, 0.29],
      [1, 5, 0.32],
      [2, 7, 0.34],
      [4, 5, 0.35],
      [1, 2, 0.36],
      [4, 7, 0.37],
      [0, 4, 0.38],
      [6, 2, 0.40],
      [3, 6, 0.52],
      [6, 0, 0.58],
      [6, 4, 0.93],
    ];
    
    edges.forEach(edge => graph.addEdge(edge));

    mst = new MinSpanningTree(graph);
  });

  it('should be extensible', () => {
    expect(mst).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(mst).to.have.all.keys(
      'graph',
      'initialized',
      'minimumSpanningTree',
    );
  });
  
  it('should not be initialized before its initialize method is called', () => {
    expect(mst.initialized).to.be.false;
  });

  it('should initially have an empty MST set', () => {
    expect(mst.minimumSpanningTree).to.deep.equal(new Set());
  });

  describe('#initialize', () => {
    it('should set the initialize property to true', () => {
      mst.initialize();

      expect(mst.initialized).to.be.true;
    });

    it('should throw an error if called twice', () => {
      mst.initialize();

      expect(() => mst.initialize()).to.throw(Error);
    });

    it('should build the correct minimum spanning tree', () => {
      const correctEdges = [
        { v1: '0', v2: '7', weight: 0.16 },
        { v1: '1', v2: '7', weight: 0.19 },
        { v1: '0', v2: '2', weight: 0.26 },
        { v1: '2', v2: '3', weight: 0.17 },
        { v1: '5', v2: '7', weight: 0.28 },
        { v1: '4', v2: '5', weight: 0.35 },
        { v1: '6', v2: '2', weight: 0.4 },
      ];

      const correctSet = new Set(correctEdges);

      mst.initialize();

      expect(mst.minimumSpanningTree).to.deep.equal(correctSet);
    });
  });
});


