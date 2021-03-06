const expect = require('chai').expect;

let UndirectedGraph;
let graph;

let MinimumSpanningTree;
let mst;

const TEST_EDGES = [
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

try {
  UndirectedGraph = require('../../structures/graph.edge-weighted.undirected');
  graph = new UndirectedGraph(TEST_EDGES);

  MinimumSpanningTree = require('../../processors/graph.edge-weighted.undirected.minimum-spanning-tree-prim');
  mst = new MinimumSpanningTree(graph);
} catch (e) {
  throw new Error('MinimumSpanningTree could not be tested due to faulty import, ' +
    'likely from an incorrect file path or exporting a non-constructor from ' +
    'the processor or graph files.');
}

describe('MinimumSpanningTree', () => {
  beforeEach(() => {
    graph = new UndirectedGraph(TEST_EDGES);
    mst = new MinimumSpanningTree(graph);
  });

  it('should be extensible', () => {
    expect(mst).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(mst).to.have.all.keys(
      'graph',
      'minimumSpanningTree',
    );
  });

  describe('#getMinimumSpanningTree()', () => {
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

      expect(mst.getMinimumSpanningTree()).to.deep.equal(correctSet);
    });
  });
});


