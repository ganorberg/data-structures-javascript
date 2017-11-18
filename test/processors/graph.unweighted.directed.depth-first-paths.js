const expect = require('chai').expect;

let DirectedGraph;
let graph;
let DepthFirstPaths;
let paths;
const SOURCE_VERTEX = 0;

try {
  DirectedGraph = require('../../structures/graph.unweighted.directed');
  graph = new DirectedGraph();
  graph.addVertex(SOURCE_VERTEX);

  DepthFirstPaths = require('../../processors/graph.unweighted.depth-first-paths');
  paths = new DepthFirstPaths(graph, SOURCE_VERTEX);
} catch (e) {
  throw new Error('Directed DepthFirstPaths could not be tested due to ' +
  'faulty import, likely from an incorrect file path or exporting a ' + 
  'non-constructor from the processor or graph files.');
}

describe('Directed DepthFirstPaths', () => {
  beforeEach(() => {
    graph = new DirectedGraph();

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

    paths = new DepthFirstPaths(graph, SOURCE_VERTEX);
  });

  it('should be extensible', () => {
    expect(paths).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(paths).to.have.all.keys(
      'graph',
      'parent',
      'sourceVertex',
      'visited',
    );
  });

  it('should set a string data type for source vertex', () => {
    expect(paths.sourceVertex).to.equal(String(SOURCE_VERTEX));
  });

  it('should process only vertices connected to the source vertex', () => {
    expect(paths.visited.has('0')).to.be.true;
    expect(paths.visited.has('5')).to.be.true;
    expect(paths.visited.has('4')).to.be.true;
    expect(paths.visited.has('3')).to.be.true;
    expect(paths.visited.has('6')).to.be.true;
    expect(paths.visited.has('1')).to.be.true;
    expect(paths.visited.has('2')).to.be.true;
    expect(paths.visited.has('7')).to.be.false;
    expect(paths.visited.has('8')).to.be.false;
    expect(paths.visited.has('9')).to.be.false;
    expect(paths.visited.has('11')).to.be.false;
    expect(paths.visited.has('12')).to.be.false;
    expect(paths.visited.has('14')).to.be.false;
  });

  it('should throw an error if the source vertex is not in the graph', () => {
    graph = new DirectedGraph();
    
    expect(() => new DepthFirstPaths(graph, SOURCE_VERTEX)).to.throw(Error);
  });

  it('should work for number and string data types', () => {
    graph = new DirectedGraph();
    
    const edges = [
      ['dog', 'woof'],
      ['dog', 'bark'],
      [0, 'meow'],
      ['meow', 'cat'],
      [14, 'dog'],
    ];
    
    edges.forEach(edge => graph.addEdge(edge));
    paths = new DepthFirstPaths(graph, SOURCE_VERTEX);
  
    expect(paths.visited.has('0')).to.be.true;
    expect(paths.visited.has('meow')).to.be.true;
    expect(paths.visited.has('cat')).to.be.true;
    expect(paths.visited.has('14')).to.be.false;
    expect(paths.visited.has('dog')).to.be.false;
    expect(paths.visited.has('woof')).to.be.false;
    expect(paths.visited.has('bark')).to.be.false;
  });

  describe('#hasPathTo', () => {
    it('should return true if the input vertex is connected to the source vertex', () => {
      expect(paths.hasPathTo('6')).to.be.true;
    });
 
    it('should return false if the input vertex is not connected to the source vertex', () => {
      expect(paths.hasPathTo('11')).to.be.false;
    });
 
    it('should throw an error if the input vertex is not in the graph', () => {
      expect(() => paths.hasPathTo('not in graph')).to.throw(Error);
    });
  });

  describe('#pathTo', () => {
    it('should return null if a path to the source vertex does not exist', () => {
      expect(paths.pathTo(11)).to.equal(null);
    });
 
    it('should return the path to the source vertex if it exists', () => {
      expect(paths.pathTo(6)).to.deep.equal(['6', '0']);
    });
  });
});