import { CodingChallenge } from "@/types/coding";

export const recursionChallenges: CodingChallenge[] = [
  {
    id: "fibonacci",
    title: "Fibonacci Number",
    description: `Calculate the nth Fibonacci number.

**Example:**
\`\`\`
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3
\`\`\``,
    difficulty: "easy",
    category: "recursion",
    starterCode: {
      javascript: `function fib(n) {
  // Your code here
  
}

// Test your solution
console.log(fib(4)); // Expected: 3`,
      python: `def fib(n):
    # Your code here
    pass

# Test your solution
print(fib(4))  # Expected: 3`,
      typescript: `function fib(n: number): number {
  // Your code here
  
}

// Test your solution
console.log(fib(4)); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "n = 4", expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 10", expectedOutput: "55", isHidden: false, description: "Larger" },
    ],
    hints: ["Base cases: F(0)=0, F(1)=1", "Use memoization to avoid repeated calculations"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "power-function",
    title: "Pow(x, n)",
    description: `Calculate x raised to the power n.

**Example 1:**
\`\`\`
Input: x = 2.0, n = 10
Output: 1024.0
\`\`\`

**Example 2:**
\`\`\`
Input: x = 2.0, n = -2
Output: 0.25
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function myPow(x, n) {
  // Your code here
  
}

// Test your solution
console.log(myPow(2.0, 10)); // Expected: 1024.0`,
      python: `def my_pow(x, n):
    # Your code here
    pass

# Test your solution
print(my_pow(2.0, 10))  # Expected: 1024.0`,
      typescript: `function myPow(x: number, n: number): number {
  // Your code here
  
}

// Test your solution
console.log(myPow(2.0, 10)); // Expected: 1024.0`,
    },
    testCases: [
      { id: "tc1", input: "x = 2.0, n = 10", expectedOutput: "1024.0", isHidden: false, description: "Positive power" },
      { id: "tc2", input: "x = 2.0, n = -2", expectedOutput: "0.25", isHidden: false, description: "Negative power" },
    ],
    hints: ["Use binary exponentiation: x^n = (x^(n/2))^2", "Handle negative n by computing 1/x^(-n)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "subsets",
    title: "Subsets",
    description: `Generate all possible subsets of distinct integers.

**Example:**
\`\`\`
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function subsets(nums) {
  // Your code here
  
}

// Test your solution
console.log(subsets([1,2,3]));`,
      python: `def subsets(nums):
    # Your code here
    pass

# Test your solution
print(subsets([1,2,3]))`,
      typescript: `function subsets(nums: number[]): number[][] {
  // Your code here
  
}

// Test your solution
console.log(subsets([1,2,3]));`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3]", expectedOutput: "8 subsets", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0]", expectedOutput: "[[],[0]]", isHidden: false, description: "Single" },
    ],
    hints: ["Backtracking: include or exclude each element", "2^n total subsets"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "permutations",
    title: "Permutations",
    description: `Generate all permutations of distinct integers.

**Example:**
\`\`\`
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function permute(nums) {
  // Your code here
  
}

// Test your solution
console.log(permute([1,2,3]));`,
      python: `def permute(nums):
    # Your code here
    pass

# Test your solution
print(permute([1,2,3]))`,
      typescript: `function permute(nums: number[]): number[][] {
  // Your code here
  
}

// Test your solution
console.log(permute([1,2,3]));`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3]", expectedOutput: "6 permutations", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0,1]", expectedOutput: "[[0,1],[1,0]]", isHidden: false, description: "Two elements" },
    ],
    hints: ["Backtracking with used array", "Or swap elements in place"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    description: `Find combinations that sum to target. Numbers can be used multiple times.

**Example:**
\`\`\`
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function combinationSum(candidates, target) {
  // Your code here
  
}

// Test your solution
console.log(combinationSum([2,3,6,7], 7)); // Expected: [[2,2,3],[7]]`,
      python: `def combination_sum(candidates, target):
    # Your code here
    pass

# Test your solution
print(combination_sum([2,3,6,7], 7))  # Expected: [[2,2,3],[7]]`,
      typescript: `function combinationSum(candidates: number[], target: number): number[][] {
  // Your code here
  
}

// Test your solution
console.log(combinationSum([2,3,6,7], 7)); // Expected: [[2,2,3],[7]]`,
    },
    testCases: [
      { id: "tc1", input: "candidates = [2,3,6,7], target = 7", expectedOutput: "[[2,2,3],[7]]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "candidates = [2,3,5], target = 8", expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]", isHidden: false, description: "Multiple" },
    ],
    hints: ["Backtracking with same index allowed", "Stop when sum exceeds target"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    description: `Generate all valid combinations of n pairs of parentheses.

**Example:**
\`\`\`
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function generateParenthesis(n) {
  // Your code here
  
}

// Test your solution
console.log(generateParenthesis(3));`,
      python: `def generate_parenthesis(n):
    # Your code here
    pass

# Test your solution
print(generate_parenthesis(3))`,
      typescript: `function generateParenthesis(n: number): string[] {
  // Your code here
  
}

// Test your solution
console.log(generateParenthesis(3));`,
    },
    testCases: [
      { id: "tc1", input: "n = 3", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 1", expectedOutput: '["()"]', isHidden: false, description: "Single" },
    ],
    hints: ["Track open and close counts", "Add '(' if open < n, add ')' if close < open"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "letter-combinations",
    title: "Letter Combinations of Phone Number",
    description: `Return all possible letter combinations for phone digits.

**Example:**
\`\`\`
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function letterCombinations(digits) {
  // Your code here
  
}

// Test your solution
console.log(letterCombinations("23"));`,
      python: `def letter_combinations(digits):
    # Your code here
    pass

# Test your solution
print(letter_combinations("23"))`,
      typescript: `function letterCombinations(digits: string): string[] {
  // Your code here
  
}

// Test your solution
console.log(letterCombinations("23"));`,
    },
    testCases: [
      { id: "tc1", input: 'digits = "23"', expectedOutput: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', isHidden: false, description: "Two digits" },
      { id: "tc2", input: 'digits = ""', expectedOutput: "[]", isHidden: false, description: "Empty" },
    ],
    hints: ["Map each digit to letters", "Backtracking to build combinations"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "n-queens",
    title: "N-Queens",
    description: `Place n queens on an n×n chessboard so no two queens attack each other.

**Example:**
\`\`\`
Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
\`\`\``,
    difficulty: "hard",
    category: "recursion",
    starterCode: {
      javascript: `function solveNQueens(n) {
  // Your code here
  
}

// Test your solution
console.log(solveNQueens(4));`,
      python: `def solve_n_queens(n):
    # Your code here
    pass

# Test your solution
print(solve_n_queens(4))`,
      typescript: `function solveNQueens(n: number): string[][] {
  // Your code here
  
}

// Test your solution
console.log(solveNQueens(4));`,
    },
    testCases: [
      { id: "tc1", input: "n = 4", expectedOutput: "2 solutions", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 1", expectedOutput: '[["Q"]]', isHidden: false, description: "Single" },
    ],
    hints: ["Backtracking row by row", "Track columns and diagonals that are attacked"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "word-search",
    title: "Word Search",
    description: `Check if word exists in a grid of characters, moving adjacently.

**Example:**
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function exist(board, word) {
  // Your code here
  
}

// Test your solution
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // Expected: true`,
      python: `def exist(board, word):
    # Your code here
    pass

# Test your solution
print(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"))  # Expected: True`,
      typescript: `function exist(board: string[][], word: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 'board and word = "ABCCED"', expectedOutput: "true", isHidden: false, description: "Found" },
      { id: "tc2", input: 'board and word = "ABCB"', expectedOutput: "false", isHidden: false, description: "Not found" },
    ],
    hints: ["DFS from each cell matching first letter", "Mark cells visited during path"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    description: `Solve a 9x9 Sudoku puzzle by filling empty cells.

**Example:**
\`\`\`
Input: A partially filled 9x9 board
Output: The completed board
\`\`\``,
    difficulty: "hard",
    category: "recursion",
    starterCode: {
      javascript: `function solveSudoku(board) {
  // Modify board in-place
  
}

// Test
console.log("Implement solveSudoku");`,
      python: `def solve_sudoku(board):
    # Modify board in-place
    pass

# Test
print("Implement solve_sudoku")`,
      typescript: `function solveSudoku(board: string[][]): void {
  // Modify board in-place
  
}

// Test
console.log("Implement solveSudoku");`,
    },
    testCases: [
      { id: "tc1", input: "Standard Sudoku puzzle", expectedOutput: "Valid solution", isHidden: false, description: "Basic" },
    ],
    hints: ["Backtracking: try 1-9 for each empty cell", "Track valid numbers for row, column, and 3x3 box"],
    expectedTimeMinutes: 40,
    points: 300,
  },
  {
    id: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    description: `Partition string so every substring is a palindrome.

**Example:**
\`\`\`
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function partition(s) {
  // Your code here
  
}

// Test your solution
console.log(partition("aab")); // Expected: [["a","a","b"],["aa","b"]]`,
      python: `def partition(s):
    # Your code here
    pass

# Test your solution
print(partition("aab"))  # Expected: [["a","a","b"],["aa","b"]]`,
      typescript: `function partition(s: string): string[][] {
  // Your code here
  
}

// Test your solution
console.log(partition("aab")); // Expected: [["a","a","b"],["aa","b"]]`,
    },
    testCases: [
      { id: "tc1", input: 's = "aab"', expectedOutput: '[["a","a","b"],["aa","b"]]', isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "a"', expectedOutput: '[["a"]]', isHidden: false, description: "Single" },
    ],
    hints: ["Backtracking with palindrome check", "Precompute which substrings are palindromes"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "restore-ip",
    title: "Restore IP Addresses",
    description: `Return all possible valid IP addresses by inserting dots.

**Example:**
\`\`\`
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
\`\`\``,
    difficulty: "medium",
    category: "recursion",
    starterCode: {
      javascript: `function restoreIpAddresses(s) {
  // Your code here
  
}

// Test your solution
console.log(restoreIpAddresses("25525511135"));`,
      python: `def restore_ip_addresses(s):
    # Your code here
    pass

# Test your solution
print(restore_ip_addresses("25525511135"))`,
      typescript: `function restoreIpAddresses(s: string): string[] {
  // Your code here
  
}

// Test your solution
console.log(restoreIpAddresses("25525511135"));`,
    },
    testCases: [
      { id: "tc1", input: 's = "25525511135"', expectedOutput: '["255.255.11.135","255.255.111.35"]', isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "0000"', expectedOutput: '["0.0.0.0"]', isHidden: false, description: "Zeros" },
    ],
    hints: ["Each segment: 0-255, no leading zeros", "Backtracking with 4 segments"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];
