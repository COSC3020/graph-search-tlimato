[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/M24O3lId)
# Search in Graphs

Recall the pseudocode for Depth-First Search:

Given a graph, a start node, and a node we're looking for:
- starting at the start node, while unvisited nodes remain
    - if current vertex $v$ is the node we're looking for, return it
    - mark $v$ as visited
    - for each edge $(v,w)$
        - recursively process $w$ unless marked visited

Implement the algorithm. You can choose any of the data structures we covered
(adjacency matrix or adjacency list) for the implementation. Your function
should return the list of nodes on the path from the start to the target (not
the list of nodes that you looked at during the search). If start and target are
the same, it should return a list with only that node. If there is no path from
the start to the target, it should return an empty list. Start with the template
I provided in `code.js` and test your new function.

I have not provided any test code, but you can base yours on test code from
other exercises. Your tests must check the correctness of the result of running
the function and run automatically when you commit through a GitHub action.

## Runtime Analysis

What is the worst-case big $\Theta$ complexity of your implementation? Add your
answer, including your reasoning, to this markdown file.

#### Given Code:
~~~js
function depthFirstSearch(graph, startNode, targetNode) {
    const visited_v = new Set();
    const stack = [[startNode]];
    let path;

    // recursively search and back track until stack is empty worst case runs: O(V) times
    while (stack.length > 0) {
        path = stack.pop(); // Constant operation: O(1)
        const current_v = path[path.length - 1];

        if (current_v === targetNode) {
            return path;
        } // checking if current node is correct: O(1)

        // add current node to checked: O(1)
        visited_v.add(current_v);

        // Iterate through adjacent Nodes: worst case current node is fully connected to all other nodes: O(E) where E is equal to V^2
        for (const adj_v of graph.adjList.get(current_v)) {
            if (!visited_v.has(adj_v)) {
                // create new path which is at most the length of number of vertices V and push onto stack: O(V + 1) = O(V)
                const n_path = [...path, adj_v]; 
                stack.push(n_path);
            }
        }
    }
    return [];
}
~~~
#### Analysis:
First and foremost, the goal of this code implimentation of Depth First Search was to utilize an adjacency list structure as outlined in the lectures. An **Adjacency List** is an array $L$ of $|V|$ lists. $L[u]$ contains $v$ if and only if $(u,v) \in E$. According to the lecture, a successful implementation of this algorithm should result in a Big O complexity of: $O(|V| + |E|)$.

Thefore, let's step through the major components of my implimentation of said algorithm to see if it's appropriate.

~~~js
while (stack.length > 0) {
    ....
}
~~~
Recursively search and back track until stack is empty which at worst case runs: $O(V)$ times
~~~js
if (current_v === targetNode) {
    return path;
} 
~~~
checking if current node is correct: $O(1)$
~~~js

visited_v.add(current_v);
~~~
Add current node to checked: $O(1)$

~~~js
for (const adj_v of graph.adjList.get(current_v)) {
~~~
Iterate through adjacent nodes, where the worst case is that the current node is fully connected to all other nodes: $O(E)$ where $E$ is equal to $V^2$

~~~js
if (!visited_v.has(adj_v)) {
    const n_path = [...path, adj_v]; 
    stack.push(n_path);
}
~~~
Create new path which is at most the length of number of vertices V and push onto stack: $O(V + 1) = O(V)$.
This results in a worst case of $O(V + E)$, wherein the Graph is fully connected meaning worst case is $O(V + E) = O(V + V^2)$.

This result is consistent with the definition presented at the beggining of the analysis, therfore my implimentation is also consistent.

## Bonus
Implement and analyze breadth-first search.
