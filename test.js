// Tyson Limato
// Graph-Search-Tlimato
// Cosci 3020
// Spring 2024
// April 8th, 2024
// test.js

const fs = require('fs');
const jsc = require('jsverify');

// Import the Directed_Graph class and depthFirstSearch function from code.js
const { Directed_Graph, depthFirstSearch } = require('./code');

// Define a function to generate a random directed graph
function generateRandomGraph(numVertices, numEdges) {
  const graph = new Directed_Graph();

  // Add vertices. In this case, the representation of various nodes contains random non-repeating numbers.
  //This is because graphs do not allow multiple copies of nodes which is checked in the graph structure through
  // the usage of a set() and must be accounted for in the test
  for (let i = 1; i <= numVertices; i++) {

    // call vertex function passed through Directed_Graph() module export
    graph.addVertex(i);
  }

  // Add edges
  for (let i = 0; i < numEdges; i++) {
    // randomize between the 1st node and any other node as a starting node in an edge
    const source = Math.floor(Math.random() * numVertices) + 1;
    // randomize between the 1st node and any other node as a destination node in an edge
    const destination = Math.floor(Math.random() * numVertices) + 1;

    // call edge function passed through Directed_Graph() module export
    graph.addEdge(source, destination);
  }
  
  return graph;
}

// This was very much debugged and assisted using numerous stack overflow posts and Perplexity.ai
// Define the property-based test to check the correctness of depthFirstSearch function
const test = jsc.forall(jsc.integer(1, 10), jsc.integer(1, 20), function (numVertices, numEdges) {
  // Create a random directed graph
  const graph = generateRandomGraph(numVertices, numEdges);

  // Randomly select a start and end vertex to test numerous cases not explored in the initial test function in code.js
  const start = Math.floor(Math.random() * numVertices) + 1;
  const end = Math.floor(Math.random() * numVertices) + 1;

  // Log the graph structure for debugging and sanity checks
  console.log("Graph Structure:");
  console.log(graph.adjList);

  // Test depthFirstSearch
  const result = depthFirstSearch(graph, start, end);

  // Log the test value and the returned value. This WILL BE VERY LONG NEARLY 200 CASES!
  console.log("Test Value: ", start, end);
  console.log("Returned Value: ", result);

  // Check the result: This block required a lot of research and explanations from stack overflow and YouTube videos.
  // Sources:
  // https://medium.com/front-end-weekly/an-introduction-to-property-based-testing-with-js-verfiy-c194d60222f8
  //
  if (result.length > 0) {
    // Ensure the start and end vertices are in the result
    return result[0] === start && result[result.length - 1] === end;
  } else {
    // If the result is empty, ensure there is no path between the start and end vertices
    return !graph.adjList.get(start).includes(end);
  }
});

// Run the test directly in vs code terminal.
jsc.assert(test);
