const fs = require('fs');
const jsc = require('jsverify');

// Import the Directed_Graph class and depthFirstSearch function from code.js
const { Directed_Graph, depthFirstSearch } = require('./code');

// Define a function to generate a random directed graph
function generateRandomGraph(numVertices, numEdges) {
  const graph = new Directed_Graph();

  // Add vertices
  for (let i = 1; i <= numVertices; i++) {
    graph.addVertex(i);
  }

  // Add edges
  for (let i = 0; i < numEdges; i++) {
    const source = Math.floor(Math.random() * numVertices) + 1;
    const destination = Math.floor(Math.random() * numVertices) + 1;
    graph.addEdge(source, destination);
  }

  return graph;
}

// Define the property-based test to check the correctness of depthFirstSearch function
const test = jsc.forall(jsc.integer(1, 10), jsc.integer(1, 20), function (numVertices, numEdges) {
  // Create a random directed graph
  const graph = generateRandomGraph(numVertices, numEdges);

  // Randomly select a start and end vertex
  const start = Math.floor(Math.random() * numVertices) + 1;
  const end = Math.floor(Math.random() * numVertices) + 1;

  // Log the graph structure for clarity
  console.log("Graph Structure:");
  console.log(graph.adjList);

  // Test depthFirstSearch
  const result = depthFirstSearch(graph, start, end);

  // Log the test value and the returned value
  console.log("Test Value: ", start, end);
  console.log("Returned Value: ", result);

  // Check the result
  if (result.length > 0) {
    // Ensure the start and end vertices are in the result
    return result[0] === start && result[result.length - 1] === end;
  } else {
    // If the result is empty, ensure there is no path between the start and end vertices
    return !graph.adjList.get(start).includes(end);
  }
});

// Run the test
jsc.assert(test);
