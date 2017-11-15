const expect = require('chai').expect;

let DirectedGraph;
let graph;
let BreadthFirstPaths;
let paths;

try {
  DirectedGraph = require('../../structures/graph.unweighted.directed');
  graph = new DirectedGraph();
  BreadthFirstPaths = require('../../processors/graph.unweighted.breadth-first-paths');
  paths = new BreadthFirstPaths();
} catch (e) {
  throw new Error('Directed BreadthFirstPaths could not be tested due to ' +
  'faulty import, likely from an incorrect file path or exporting a ' + 
  'non-constructor from the processor or graph files.');
}

const SOURCE_VERTEX = 0;

describe('BreadthFirstPaths', () => {
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

    paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
  });

  it('should be extensible', () => {
    expect(paths).to.be.extensible;
  });

  it('should have properties granted from constructor call', () => {
    expect(paths).to.have.all.keys(
      'distanceFromSource',
      'graph',
      'initialized',
      'parent',
      'sourceVertex',
      'visited',
    );
  });
  
  it('should not be initialized before its initialize method is called', () => {
    expect(paths.initialized).to.be.false;
  });

  it('should initially have an empty distanceFromSource object', () => {
    expect(paths.distanceFromSource).to.deep.equal({});
  });

  it('should initially have an empty parent object', () => {
    expect(paths.parent).to.deep.equal({});
  });

  it('should initially have an empty visited Set', () => {
    expect(paths.visited).to.deep.equal(new Set());
  });

  it('should set a string data type for source vertex', () => {
    expect(paths.sourceVertex).to.equal(String(SOURCE_VERTEX));
  });

  describe('#distanceTo', () => {
    it('should return the distance if one level from the source vertex', () => {
      paths.initialize();
      
      expect(paths.distanceTo(6)).to.equal(1);
    });

    it('should return the distance if two levels from the source vertex', () => {
      paths.initialize();
      
      expect(paths.distanceTo(4)).to.equal(2);
    });

    it('should return null if the input vertex is not connected to the source', () => {
      paths.initialize();
      
      expect(paths.distanceTo(14)).to.equal(null);
    });
 
    it('should throw an error if the processor has not been initialized', () => {
      expect(() => paths.distanceTo(0)).to.throw(Error);
    });
  });

  describe('#hasPathTo', () => {
    it('should return true if the input vertex is connected to the source vertex', () => {
      paths.initialize();
      
      expect(paths.hasPathTo('6')).to.be.true;
    });
 
    it('should return false if the input vertex is not connected to the source vertex', () => {
      paths.initialize();
      
      expect(paths.hasPathTo('11')).to.be.false;
    });
 
    it('should throw an error if the processor has not been initialized', () => {
      expect(() => paths.hasPathTo(0)).to.throw(Error);
    });
 
    it('should throw an error if the input vertex is not in the graph', () => {
      paths.initialize();
      
      expect(() => paths.hasPathTo('not in graph')).to.throw(Error);
    });
  });

  describe('#initialize', () => {
    it('should set the initialized property to true', () => {
      paths.initialize();

      expect(paths.initialized).to.be.true;
    });

    it('should process only vertices connected to the source vertex', () => {
      paths.initialize();

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
      paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
      
      expect(() => paths.initialize()).to.throw(Error);
    });

    it('should throw an error if called twice', () => {
      paths.initialize();

      expect(() => paths.initialize()).to.throw(Error);
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
        paths = new BreadthFirstPaths(graph, SOURCE_VERTEX);
      
        paths.initialize();
      
        expect(paths.visited.has('0')).to.be.true;
        expect(paths.visited.has('meow')).to.be.true;
        expect(paths.visited.has('cat')).to.be.true;
        expect(paths.visited.has('14')).to.be.false;
        expect(paths.visited.has('dog')).to.be.false;
        expect(paths.visited.has('woof')).to.be.false;
        expect(paths.visited.has('bark')).to.be.false;
    });
  });

  describe('#shortestPathTo', () => {
    it('should throw an error if the processor has not been initialized', () => {
      expect(() => paths.shortestPathTo(0)).to.throw(Error);
    });
 
    it('should return null if a path to the source vertex does not exist', () => {
      paths.initialize();

      expect(paths.shortestPathTo(11)).to.equal(null);
    });
 
    it('should return the shortest path to the source vertex if a path exists', () => {
      paths.initialize();
      
      expect(paths.shortestPathTo(6)).to.deep.equal(['6', '0']);
    });
  });
});
