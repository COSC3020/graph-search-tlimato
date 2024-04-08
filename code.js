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
                const n_path = [...path, adj_v]; // make a new path by adding the adjacent node to the existing path
                stack.push(n_path); // push new path to stack
            }
        }
    }
    // exit case for if the node isn't found
    return [];
}
module.exports = {Directed_Graph, depthFirstSearch};
