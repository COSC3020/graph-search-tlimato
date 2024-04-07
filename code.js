// Tyson Limato
// Graph-Search-Tlimato
// Cosci 3020
// Spring 2024
// April 7th, 2024
// code.js

// Graph Class for the sake of organizationa and clarity when working the Abstract Data Type.
class Directed_Graph {
    constructor() {
        // Vertices should be a Set() given it acts like a list that automatically prevents duplicate values.
        // Similarly a Graph cannot contain duplicate vertices and using a Set enables the convience of a list
        // without the additional burden of value checks in adding vertices
        this.vertices = new Set();
        // Use a Map here given it holds key value pairs AND keeps track of the order of insertion
        this.adjList = new Map();
    }

    addVertex(v) {
        // add the vertex
        this.vertices.add(v);
        // add the vertex in the edge list with no connections by default
        this.adjList.set(v, []);
    }

    addEdge(v_one, v_two) {
        // in case the vertices passed to the function aren't already 
        // in the graph add the respective vertices prior to creating a connection
        if (!(this.adjList.has(v_one))) {
            this.addVertex(v_one);
        }
        if (!(this.adjList.has(v_two))) {
            this.addVertex(v_two);
        }
        // retreive starting vertice in set and associate it with the ending vertice 
        // directionality is defined as follows:
        // starting vertice is the key in the map and the ending vertice is the value
        this.adjList.get(v_one).push(v_two);
    }
}

function depthFirstSearch(graph, startNode, targetNode) {
    // DPS requires a list containing visited nodes
    const visited_v = new Set();
    // Stack stores the current path being explored
    const stack = [[startNode]];
    let path;

    // recursively search and back track until stack is empty
    while (stack.length > 0) {
        path = stack.pop();
        const current_v = path[path.length - 1]; // Get the last node in the current path

        // If the current node is the target node, return the path
        if (current_v === targetNode) {
            return path;
        }

        // add current node to the visited list
        visited_v.add(current_v);

        // Explore all the adjacent nodes of the current node
        for (const adj_v of graph.adjList.get(current_v)) {
            // check to make sure the adjacent node isn't already in the visited set.
            if (!visited_v.has(adj_v)) {
                const n_path = [...path, adj_v]; // make a new path by adding the adjacent node to the exxsiting path
                stack.push(n_path); // push new path to stack
            }
        }
    }
    // exit case for if the node isn't found
    return [];
}
module.exports = {Directed_Graph, depthFirstSearch};

// TEST CASES:
function testDPS(){
// case 1: Very Simple
const tst_graph = new Directed_Graph();
tst_graph.addVertex('A');
tst_graph.addVertex('B');
tst_graph.addVertex('C');
tst_graph.addEdge('A', 'B');
tst_graph.addEdge('A', 'C');

const one_result = depthFirstSearch(tst_graph, 'A', 'C');
console.log(one_result); // Output: ['A', 'C']
delete tst_graph;
delete one_result;

// case 2: Unweighted directional Graph isomorphic with the graph displayed in the Dijkstra's Algorithm lecture
const Dij_Graph = new Directed_Graph();
// Add Vertices
Dij_Graph.addVertex('A');
Dij_Graph.addVertex('B');
Dij_Graph.addVertex('C');
Dij_Graph.addVertex('D');
Dij_Graph.addVertex('E');
Dij_Graph.addVertex('F');
Dij_Graph.addVertex('G');
Dij_Graph.addVertex('H');

// Add Edges
//--------------
// A edges
Dij_Graph.addEdge('A', 'B');
Dij_Graph.addEdge('A', 'D');
Dij_Graph.addEdge('A', 'C');
// B edges
Dij_Graph.addEdge('B', 'C');
Dij_Graph.addEdge('B', 'E');
Dij_Graph.addEdge('B', 'F');
// C edges
Dij_Graph.addEdge('C', 'A');
Dij_Graph.addEdge('C', 'E');
// D edges
Dij_Graph.addEdge('D', 'C');
// E edges
Dij_Graph.addEdge('E', 'G');
Dij_Graph.addEdge('E', 'D');
// F edges
Dij_Graph.addEdge('F', 'H');
// G edges
Dij_Graph.addEdge('G', 'E');
Dij_Graph.addEdge('G', 'F');
// H edges
Dij_Graph.addEdge('H', 'G');

const two_result = depthFirstSearch(Dij_Graph, 'H', 'B');
console.log(two_result); // Output: ['H', 'G', 'E', 'D', 'C', 'A', 'B']
delete Dij_Graph;
delete two_result;

// Case 3: The desired node isn't in the Graph
const base_result = depthFirstSearch(Dij_Graph, 'C', 'I');
console.log(base_result); // Output: []
delete base_result;
}
//-----------------------
// Call Test Function
//-----------------------
// testDPS();


// Test Results
/*
[Running] node "/home/tyson/Documents/Cosc3020/graph-search-tlimato/graph-search-tlimato/code.js"
[ 'A', 'C' ] // Pass
[
  'H', 'G', 'E',
  'D', 'C', 'A',
  'B'
] //Pass
[] // Pass

[Done] exited with code=0 in 0.027 seconds

*/