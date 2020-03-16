// Data structures
const EdgeWeightedDirectedGraph = require("./structures/graph.edge-weighted.directed");
const EdgeWeightedUndirectedGraph = require("./structures/graph.edge-weighted.undirected");
const DirectedGraph = require("./structures/graph.unweighted.directed");
const UndirectedGraph = require("./structures/graph.unweighted.undirected");
const HashTable = require("./structures/hash-table");
const LinkedList = require("./structures/linked-list");
const CircularQueue = require("./structures/queue.circular");
const Queue = require("./structures/queue");
const PriorityQueueMax = require("./structures/queue.priority.max");
const PriorityQueueMin = require("./structures/queue.priority.min");
const Stack = require("./structures/stack");
const BinarySearchTree = require("./structures/tree.binary-search");
const RedBlackTree = require("./structures/tree.red-black");
const PrefixTrie = require("./structures/tree.trie.prefix");
const SuffixTrie = require("./structures/tree.trie.suffix");

// Processors
const ShortestPath = require("./processors/graph.edge-weighted.directed.shortest-path-dijkstra");
const MinimumSpanningTree = require("./processors/graph.edge-weighted.undirected.minimum-spanning-tree-prim");
const BreadthFirstPaths = require("./processors/graph.unweighted.breadth-first-paths");
const DepthFirstPaths = require("./processors/graph.unweighted.depth-first-paths");
const DirectedCycle = require("./processors/graph.unweighted.directed.cycle");
const TopologicalSort = require("./processors/graph.unweighted.directed.topological-sort");
const ConnectedComponents = require("./processors/graph.unweighted.undirected.connected-components");
const UndirectedCycle = require("./processors/graph.unweighted.undirected.cycle");

const dataStructures = {
  EdgeWeightedDirectedGraph,
  EdgeWeightedUndirectedGraph,
  DirectedGraph,
  UndirectedGraph,
  HashTable,
  LinkedList,
  CircularQueue,
  Queue,
  PriorityQueueMax,
  PriorityQueueMin,
  Stack,
  BinarySearchTree,
  RedBlackTree,
  PrefixTrie,
  SuffixTrie
};

const processors = {
  ShortestPath,
  MinimumSpanningTree,
  BreadthFirstPaths,
  DepthFirstPaths,
  DirectedCycle,
  TopologicalSort,
  ConnectedComponents,
  UndirectedCycle
};

module.exports = Object.assign({}, dataStructures, processors);
