import { CodingChallenge } from "@/types/coding";

export const graphsChallenges: CodingChallenge[] = [
  {
    id: "number-of-islands",
    title: "Number of Islands",
    description: `Given a 2D grid map of '1's (land) and '0's (water), count the number of islands.

**Example:**
\`\`\`
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function numIslands(grid) {
  // Your code here
  
}

// Test your solution
console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // Expected: 3`,
      python: `def num_islands(grid):
    # Your code here
    pass

# Test your solution
print(num_islands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]))  # Expected: 3`,
      typescript: `function numIslands(grid: string[][]): number {
  // Your code here
  
}

// Test your solution
console.log(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "grid as shown", expectedOutput: "3", isHidden: false, description: "Multiple islands" },
      { id: "tc2", input: 'grid = [["1","1","1"],["0","1","0"],["1","1","1"]]', expectedOutput: "1", isHidden: false, description: "Connected" },
    ],
    hints: ["DFS/BFS from each unvisited land cell", "Mark visited cells to avoid counting twice"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    description: `Deep copy a connected undirected graph.

**Example:**
\`\`\`
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

function cloneGraph(node) {
  // Your code here
  
}

// Test
console.log("Implement cloneGraph");`,
      python: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors else []

def clone_graph(node):
    # Your code here
    pass

# Test
print("Implement clone_graph")`,
      typescript: `class Node {
  val: number;
  neighbors: Node[];
  constructor(val?: number, neighbors?: Node[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node: Node | null): Node | null {
  // Your code here
  return null;
}

console.log("Implement cloneGraph");`,
    },
    testCases: [
      { id: "tc1", input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "Deep copy", isHidden: false, description: "Basic" },
    ],
    hints: ["Use hash map: old node → new node", "BFS or DFS traversal"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    description: `There are n courses. Some have prerequisites. Can you finish all courses?

**Example 1:**
\`\`\`
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0 first, then course 1.
\`\`\`

**Example 2:**
\`\`\`
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: Circular dependency.
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  // Your code here
  
}

// Test your solution
console.log(canFinish(2, [[1,0]])); // Expected: true`,
      python: `def can_finish(num_courses, prerequisites):
    # Your code here
    pass

# Test your solution
print(can_finish(2, [[1,0]]))  # Expected: True`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Your code here
  
}

// Test your solution
console.log(canFinish(2, [[1,0]])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "numCourses = 2, prerequisites = [[1,0]]", expectedOutput: "true", isHidden: false, description: "Possible" },
      { id: "tc2", input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expectedOutput: "false", isHidden: false, description: "Cycle" },
    ],
    hints: ["Detect cycle in directed graph", "Use topological sort or DFS with colors"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "course-schedule-ii",
    title: "Course Schedule II",
    description: `Return the ordering of courses to finish all courses.

**Example:**
\`\`\`
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3] or [0,2,1,3]
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function findOrder(numCourses, prerequisites) {
  // Your code here
  
}

// Test your solution
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // Expected: [0,1,2,3] or [0,2,1,3]`,
      python: `def find_order(num_courses, prerequisites):
    # Your code here
    pass

# Test your solution
print(find_order(4, [[1,0],[2,0],[3,1],[3,2]]))`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  // Your code here
  
}

// Test your solution
console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));`,
    },
    testCases: [
      { id: "tc1", input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", expectedOutput: "[0,1,2,3] or [0,2,1,3]", isHidden: false, description: "Valid order" },
      { id: "tc2", input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expectedOutput: "[]", isHidden: false, description: "Impossible" },
    ],
    hints: ["Topological sort with Kahn's algorithm", "Track in-degrees and process zero-degree nodes"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "word-ladder",
    title: "Word Ladder",
    description: `Find shortest transformation from beginWord to endWord, changing one letter at a time.

**Example:**
\`\`\`
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: "hit" -> "hot" -> "dot" -> "dog" -> "cog"
\`\`\``,
    difficulty: "hard",
    category: "graphs",
    starterCode: {
      javascript: `function ladderLength(beginWord, endWord, wordList) {
  // Your code here
  
}

// Test your solution
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // Expected: 5`,
      python: `def ladder_length(begin_word, end_word, word_list):
    # Your code here
    pass

# Test your solution
print(ladder_length("hit", "cog", ["hot","dot","dog","lot","log","cog"]))  # Expected: 5`,
      typescript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  // Your code here
  
}

// Test your solution
console.log(ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"])); // Expected: 5`,
    },
    testCases: [
      { id: "tc1", input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', expectedOutput: "5", isHidden: false, description: "Path exists" },
      { id: "tc2", input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', expectedOutput: "0", isHidden: false, description: "No path" },
    ],
    hints: ["BFS for shortest path", "Preprocess words into pattern buckets (e.g., h*t -> hot, hat)"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "surrounded-regions",
    title: "Surrounded Regions",
    description: `Flip all 'O's that are surrounded by 'X's to 'X'.

**Example:**
\`\`\`
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function solve(board) {
  // Modify board in-place
  
}

// Test your solution
const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board);
console.log(board);`,
      python: `def solve(board):
    # Modify board in-place
    pass

# Test your solution
board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
solve(board)
print(board)`,
      typescript: `function solve(board: string[][]): void {
  // Modify board in-place
  
}

// Test
const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
solve(board);
console.log(board);`,
    },
    testCases: [
      { id: "tc1", input: "board as shown", expectedOutput: "All O's except border-connected flipped to X", isHidden: false, description: "Basic" },
    ],
    hints: ["Start from border O's and mark them as safe", "Then flip remaining O's to X"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "pacific-atlantic",
    title: "Pacific Atlantic Water Flow",
    description: `Find cells where water can flow to both Pacific and Atlantic oceans.

**Example:**
\`\`\`
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function pacificAtlantic(heights) {
  // Your code here
  
}

// Test your solution
console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]));`,
      python: `def pacific_atlantic(heights):
    # Your code here
    pass

# Test your solution
print(pacific_atlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]))`,
      typescript: `function pacificAtlantic(heights: number[][]): number[][] {
  // Your code here
  
}

// Test
console.log(pacificAtlantic([[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]));`,
    },
    testCases: [
      { id: "tc1", input: "heights as shown", expectedOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", isHidden: false, description: "Basic" },
    ],
    hints: ["BFS/DFS from each ocean inward", "Find intersection of reachable cells"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "graph-valid-tree",
    title: "Graph Valid Tree",
    description: `Check if n nodes and edges form a valid tree.

**Example 1:**
\`\`\`
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function validTree(n, edges) {
  // Your code here
  
}

// Test your solution
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // Expected: true`,
      python: `def valid_tree(n, edges):
    # Your code here
    pass

# Test your solution
print(valid_tree(5, [[0,1],[0,2],[0,3],[1,4]]))  # Expected: True`,
      typescript: `function validTree(n: number, edges: number[][]): boolean {
  // Your code here
  
}

// Test your solution
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", expectedOutput: "true", isHidden: false, description: "Valid tree" },
      { id: "tc2", input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", expectedOutput: "false", isHidden: false, description: "Has cycle" },
    ],
    hints: ["Tree: exactly n-1 edges and all nodes connected", "Use Union-Find or BFS/DFS"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "connected-components",
    title: "Number of Connected Components",
    description: `Count connected components in an undirected graph.

**Example:**
\`\`\`
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function countComponents(n, edges) {
  // Your code here
  
}

// Test your solution
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // Expected: 2`,
      python: `def count_components(n, edges):
    # Your code here
    pass

# Test your solution
print(count_components(5, [[0,1],[1,2],[3,4]]))  # Expected: 2`,
      typescript: `function countComponents(n: number, edges: number[][]): number {
  // Your code here
  
}

// Test your solution
console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "n = 5, edges = [[0,1],[1,2],[3,4]]", expectedOutput: "2", isHidden: false, description: "Two components" },
      { id: "tc2", input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", expectedOutput: "1", isHidden: false, description: "All connected" },
    ],
    hints: ["BFS/DFS from each unvisited node", "Or use Union-Find"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "alien-dictionary",
    title: "Alien Dictionary",
    description: `Given sorted words in alien language, derive the character order.

**Example:**
\`\`\`
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
\`\`\``,
    difficulty: "hard",
    category: "graphs",
    starterCode: {
      javascript: `function alienOrder(words) {
  // Your code here
  
}

// Test your solution
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // Expected: "wertf"`,
      python: `def alien_order(words):
    # Your code here
    pass

# Test your solution
print(alien_order(["wrt","wrf","er","ett","rftt"]))  # Expected: "wertf"`,
      typescript: `function alienOrder(words: string[]): string {
  // Your code here
  
}

// Test your solution
console.log(alienOrder(["wrt","wrf","er","ett","rftt"])); // Expected: "wertf"`,
    },
    testCases: [
      { id: "tc1", input: 'words = ["wrt","wrf","er","ett","rftt"]', expectedOutput: '"wertf"', isHidden: false, description: "Valid order" },
      { id: "tc2", input: 'words = ["z","x"]', expectedOutput: '"zx"', isHidden: false, description: "Simple" },
    ],
    hints: ["Build directed graph from adjacent word comparisons", "Topological sort for the ordering"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "shortest-path-binary-matrix",
    title: "Shortest Path in Binary Matrix",
    description: `Find shortest path from top-left to bottom-right in a binary matrix (0 = clear, 1 = blocked).

**Example:**
\`\`\`
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function shortestPathBinaryMatrix(grid) {
  // Your code here
  
}

// Test your solution
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // Expected: 4`,
      python: `def shortest_path_binary_matrix(grid):
    # Your code here
    pass

# Test your solution
print(shortest_path_binary_matrix([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 4`,
      typescript: `function shortestPathBinaryMatrix(grid: number[][]): number {
  // Your code here
  
}

// Test your solution
console.log(shortestPathBinaryMatrix([[0,0,0],[1,1,0],[1,1,0]])); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "grid = [[0,0,0],[1,1,0],[1,1,0]]", expectedOutput: "4", isHidden: false, description: "Path exists" },
      { id: "tc2", input: "grid = [[1,0,0],[1,1,0],[1,1,0]]", expectedOutput: "-1", isHidden: false, description: "No path" },
    ],
    hints: ["BFS for shortest path", "8-directional movement allowed"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "network-delay",
    title: "Network Delay Time",
    description: `Find time for signal to reach all nodes in a network.

**Example:**
\`\`\`
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "graphs",
    starterCode: {
      javascript: `function networkDelayTime(times, n, k) {
  // Your code here
  
}

// Test your solution
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // Expected: 2`,
      python: `def network_delay_time(times, n, k):
    # Your code here
    pass

# Test your solution
print(network_delay_time([[2,1,1],[2,3,1],[3,4,1]], 4, 2))  # Expected: 2`,
      typescript: `function networkDelayTime(times: number[][], n: number, k: number): number {
  // Your code here
  
}

// Test your solution
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", expectedOutput: "2", isHidden: false, description: "Basic" },
      { id: "tc2", input: "times = [[1,2,1]], n = 2, k = 2", expectedOutput: "-1", isHidden: false, description: "Unreachable" },
    ],
    hints: ["Dijkstra's algorithm for shortest paths", "Return max distance among all nodes"],
    expectedTimeMinutes: 30,
    points: 200,
  },
];
