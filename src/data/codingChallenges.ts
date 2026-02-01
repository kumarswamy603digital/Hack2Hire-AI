import { CodingChallenge } from "@/types/coding";

export const CHALLENGE_CATEGORIES = [
  { id: "arrays", name: "Arrays", icon: "📊", description: "Array manipulation and traversal" },
  { id: "strings", name: "Strings", icon: "📝", description: "String processing and pattern matching" },
  { id: "linked-lists", name: "Linked Lists", icon: "🔗", description: "Singly and doubly linked list operations" },
  { id: "stacks-queues", name: "Stacks & Queues", icon: "📚", description: "LIFO and FIFO data structures" },
  { id: "trees", name: "Trees", icon: "🌳", description: "Binary trees, BST, and tree traversals" },
  { id: "graphs", name: "Graphs", icon: "🕸️", description: "Graph algorithms and traversals" },
  { id: "hash-tables", name: "Hash Tables", icon: "🗃️", description: "Hashing and map operations" },
  { id: "sorting", name: "Sorting", icon: "📈", description: "Sorting algorithms and techniques" },
  { id: "searching", name: "Searching", icon: "🔍", description: "Binary search and search algorithms" },
  { id: "dynamic-programming", name: "Dynamic Programming", icon: "🧮", description: "Memoization and tabulation" },
  { id: "recursion", name: "Recursion", icon: "🔄", description: "Recursive problem solving" },
  { id: "math", name: "Math & Logic", icon: "🔢", description: "Mathematical algorithms" },
] as const;

export type CategoryId = typeof CHALLENGE_CATEGORIES[number]["id"];

// Arrays Category - 15 questions
const arraysChallenges: CodingChallenge[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\``,
    difficulty: "easy",
    category: "arrays",
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]`,
      python: `def two_sum(nums, target):
    # Your code here
    pass

# Test your solution
print(two_sum([2,7,11,15], 9))  # Expected: [0,1]`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  
}

// Test your solution
console.log(twoSum([2,7,11,15], 9)); // Expected: [0,1]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isHidden: false, description: "Basic case" },
      { id: "tc2", input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isHidden: false, description: "Middle elements" },
      { id: "tc3", input: "nums = [3,3], target = 6", expectedOutput: "[0,1]", isHidden: true, description: "Duplicates" },
    ],
    hints: ["Use a hash map to store values you've seen", "For each number, check if (target - current) exists in the map"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

**Example 1:**
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1]
Output: 1
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Your code here
  
}

// Test your solution
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6`,
      python: `def max_sub_array(nums):
    # Your code here
    pass

# Test your solution
print(max_sub_array([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6`,
      typescript: `function maxSubArray(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6`,
    },
    testCases: [
      { id: "tc1", input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false, description: "Mixed numbers" },
      { id: "tc2", input: "nums = [1]", expectedOutput: "1", isHidden: false, description: "Single element" },
      { id: "tc3", input: "nums = [5,4,-1,7,8]", expectedOutput: "23", isHidden: true, description: "All positive" },
    ],
    hints: ["Consider Kadane's algorithm", "Track current sum and max sum"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,1]
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,3,4]
Output: false
\`\`\``,
    difficulty: "easy",
    category: "arrays",
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  // Your code here
  
}

// Test your solution
console.log(containsDuplicate([1,2,3,1])); // Expected: true`,
      python: `def contains_duplicate(nums):
    # Your code here
    pass

# Test your solution
print(contains_duplicate([1,2,3,1]))  # Expected: True`,
      typescript: `function containsDuplicate(nums: number[]): boolean {
  // Your code here
  
}

// Test your solution
console.log(containsDuplicate([1,2,3,1])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3,1]", expectedOutput: "true", isHidden: false, description: "Has duplicate" },
      { id: "tc2", input: "nums = [1,2,3,4]", expectedOutput: "false", isHidden: false, description: "No duplicates" },
      { id: "tc3", input: "nums = [1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true", isHidden: true, description: "Multiple duplicates" },
    ],
    hints: ["Use a Set to track seen elements", "Compare Set size with array length"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

You must solve it without using division and in O(n) time.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Your code here
  
}

// Test your solution
console.log(productExceptSelf([1,2,3,4])); // Expected: [24,12,8,6]`,
      python: `def product_except_self(nums):
    # Your code here
    pass

# Test your solution
print(product_except_self([1,2,3,4]))  # Expected: [24,12,8,6]`,
      typescript: `function productExceptSelf(nums: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(productExceptSelf([1,2,3,4])); // Expected: [24,12,8,6]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]", isHidden: false, description: "Basic case" },
      { id: "tc2", input: "nums = [-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]", isHidden: false, description: "With zero" },
    ],
    hints: ["Calculate prefix products from left", "Calculate suffix products from right"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "max-product-subarray",
    title: "Maximum Product Subarray",
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.

**Example 1:**
\`\`\`
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-2,0,-1]
Output: 0
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function maxProduct(nums) {
  // Your code here
  
}

// Test your solution
console.log(maxProduct([2,3,-2,4])); // Expected: 6`,
      python: `def max_product(nums):
    # Your code here
    pass

# Test your solution
print(max_product([2,3,-2,4]))  # Expected: 6`,
      typescript: `function maxProduct(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(maxProduct([2,3,-2,4])); // Expected: 6`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,3,-2,4]", expectedOutput: "6", isHidden: false, description: "Basic case" },
      { id: "tc2", input: "nums = [-2,0,-1]", expectedOutput: "0", isHidden: false, description: "With zero" },
      { id: "tc3", input: "nums = [-2,3,-4]", expectedOutput: "24", isHidden: true, description: "Negatives" },
    ],
    hints: ["Track both max and min products (negatives can flip)", "Reset on zeros"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "find-min-rotated",
    title: "Find Minimum in Rotated Sorted Array",
    description: `Given the sorted rotated array \`nums\` of unique elements, return the minimum element.

**Example 1:**
\`\`\`
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [4,5,6,7,0,1,2]
Output: 0
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function findMin(nums) {
  // Your code here
  
}

// Test your solution
console.log(findMin([3,4,5,1,2])); // Expected: 1`,
      python: `def find_min(nums):
    # Your code here
    pass

# Test your solution
print(find_min([3,4,5,1,2]))  # Expected: 1`,
      typescript: `function findMin(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(findMin([3,4,5,1,2])); // Expected: 1`,
    },
    testCases: [
      { id: "tc1", input: "nums = [3,4,5,1,2]", expectedOutput: "1", isHidden: false, description: "Rotated" },
      { id: "tc2", input: "nums = [4,5,6,7,0,1,2]", expectedOutput: "0", isHidden: false, description: "More elements" },
      { id: "tc3", input: "nums = [11,13,15,17]", expectedOutput: "11", isHidden: true, description: "Not rotated" },
    ],
    hints: ["Use binary search", "Compare mid element with right boundary"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "search-rotated",
    title: "Search in Rotated Sorted Array",
    description: `Given a rotated sorted array \`nums\` and a \`target\`, return the index of \`target\` or -1 if not found.

**Example 1:**
\`\`\`
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4`,
      python: `def search(nums, target):
    # Your code here
    pass

# Test your solution
print(search([4,5,6,7,0,1,2], 0))  # Expected: 4`,
      typescript: `function search(nums: number[], target: number): number {
  // Your code here
  
}

// Test your solution
console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "nums = [4,5,6,7,0,1,2], target = 0", expectedOutput: "4", isHidden: false, description: "Found" },
      { id: "tc2", input: "nums = [4,5,6,7,0,1,2], target = 3", expectedOutput: "-1", isHidden: false, description: "Not found" },
    ],
    hints: ["Modified binary search", "Determine which half is sorted"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "three-sum",
    title: "3Sum",
    description: `Given an array \`nums\`, return all unique triplets that sum to zero.

**Example:**
\`\`\`
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function threeSum(nums) {
  // Your code here
  
}

// Test your solution
console.log(threeSum([-1,0,1,2,-1,-4])); // Expected: [[-1,-1,2],[-1,0,1]]`,
      python: `def three_sum(nums):
    # Your code here
    pass

# Test your solution
print(three_sum([-1,0,1,2,-1,-4]))`,
      typescript: `function threeSum(nums: number[]): number[][] {
  // Your code here
  
}

// Test your solution
console.log(threeSum([-1,0,1,2,-1,-4]));`,
    },
    testCases: [
      { id: "tc1", input: "nums = [-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0,0,0]", expectedOutput: "[[0,0,0]]", isHidden: true, description: "Zeros" },
    ],
    hints: ["Sort the array first", "Fix one element and use two pointers for the rest"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "container-water",
    title: "Container With Most Water",
    description: `Given \`n\` non-negative integers representing heights, find two lines that form a container that holds the most water.

**Example:**
\`\`\`
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function maxArea(height) {
  // Your code here
  
}

// Test your solution
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49`,
      python: `def max_area(height):
    # Your code here
    pass

# Test your solution
print(max_area([1,8,6,2,5,4,8,3,7]))  # Expected: 49`,
      typescript: `function maxArea(height: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49`,
    },
    testCases: [
      { id: "tc1", input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49", isHidden: false, description: "Basic" },
      { id: "tc2", input: "height = [1,1]", expectedOutput: "1", isHidden: false, description: "Two elements" },
    ],
    hints: ["Use two pointers from both ends", "Move the pointer with smaller height"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "rotate-array",
    title: "Rotate Array",
    description: `Given an integer array \`nums\`, rotate the array to the right by \`k\` steps.

**Example:**
\`\`\`
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function rotate(nums, k) {
  // Modify nums in-place
  
}

// Test your solution
const arr = [1,2,3,4,5,6,7];
rotate(arr, 3);
console.log(arr); // Expected: [5,6,7,1,2,3,4]`,
      python: `def rotate(nums, k):
    # Modify nums in-place
    pass

# Test your solution
arr = [1,2,3,4,5,6,7]
rotate(arr, 3)
print(arr)  # Expected: [5,6,7,1,2,3,4]`,
      typescript: `function rotate(nums: number[], k: number): void {
  // Modify nums in-place
  
}

// Test your solution
const arr = [1,2,3,4,5,6,7];
rotate(arr, 3);
console.log(arr); // Expected: [5,6,7,1,2,3,4]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3,4,5,6,7], k = 3", expectedOutput: "[5,6,7,1,2,3,4]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [-1,-100,3,99], k = 2", expectedOutput: "[3,99,-1,-100]", isHidden: false, description: "Negatives" },
    ],
    hints: ["Reverse the entire array, then reverse first k and last n-k elements"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    description: `Given an array \`nums\`, move all 0's to the end while maintaining relative order of non-zero elements. Do this in-place.

**Example:**
\`\`\`
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
\`\`\``,
    difficulty: "easy",
    category: "arrays",
    starterCode: {
      javascript: `function moveZeroes(nums) {
  // Modify nums in-place
  
}

// Test your solution
const arr = [0,1,0,3,12];
moveZeroes(arr);
console.log(arr); // Expected: [1,3,12,0,0]`,
      python: `def move_zeroes(nums):
    # Modify nums in-place
    pass

# Test your solution
arr = [0,1,0,3,12]
move_zeroes(arr)
print(arr)  # Expected: [1,3,12,0,0]`,
      typescript: `function moveZeroes(nums: number[]): void {
  // Modify nums in-place
  
}

// Test your solution
const arr = [0,1,0,3,12];
moveZeroes(arr);
console.log(arr); // Expected: [1,3,12,0,0]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [0,1,0,3,12]", expectedOutput: "[1,3,12,0,0]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0]", expectedOutput: "[0]", isHidden: false, description: "Single zero" },
    ],
    hints: ["Use two pointers - one for iterating, one for placement position"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    description: `Given an array of intervals, merge all overlapping intervals.

**Example:**
\`\`\`
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function merge(intervals) {
  // Your code here
  
}

// Test your solution
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));`,
      python: `def merge(intervals):
    # Your code here
    pass

# Test your solution
print(merge([[1,3],[2,6],[8,10],[15,18]]))`,
      typescript: `function merge(intervals: number[][]): number[][] {
  // Your code here
  
}

// Test your solution
console.log(merge([[1,3],[2,6],[8,10],[15,18]]));`,
    },
    testCases: [
      { id: "tc1", input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "intervals = [[1,4],[4,5]]", expectedOutput: "[[1,5]]", isHidden: false, description: "Touching" },
    ],
    hints: ["Sort intervals by start time first", "Compare current end with next start"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    description: `Given an m x n matrix, return all elements in spiral order.

**Example:**
\`\`\`
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Your code here
  
}

// Test your solution
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));`,
      python: `def spiral_order(matrix):
    # Your code here
    pass

# Test your solution
print(spiral_order([[1,2,3],[4,5,6],[7,8,9]]))`,
      typescript: `function spiralOrder(matrix: number[][]): number[] {
  // Your code here
  
}

// Test your solution
console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));`,
    },
    testCases: [
      { id: "tc1", input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", expectedOutput: "[1,2,3,6,9,8,7,4,5]", isHidden: false, description: "3x3" },
      { id: "tc2", input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", expectedOutput: "[1,2,3,4,8,12,11,10,9,5,6,7]", isHidden: true, description: "3x4" },
    ],
    hints: ["Track boundaries: top, bottom, left, right", "Shrink boundaries after each direction"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    description: `Given an m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

**Example:**
\`\`\`
Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function setZeroes(matrix) {
  // Modify matrix in-place
  
}

// Test your solution
const matrix = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(matrix);
console.log(matrix);`,
      python: `def set_zeroes(matrix):
    # Modify matrix in-place
    pass

# Test your solution
matrix = [[1,1,1],[1,0,1],[1,1,1]]
set_zeroes(matrix)
print(matrix)`,
      typescript: `function setZeroes(matrix: number[][]): void {
  // Modify matrix in-place
  
}

// Test your solution
const matrix = [[1,1,1],[1,0,1],[1,1,1]];
setZeroes(matrix);
console.log(matrix);`,
    },
    testCases: [
      { id: "tc1", input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", expectedOutput: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]", isHidden: true, description: "Multiple zeros" },
    ],
    hints: ["Use first row/column as markers", "Handle first row/column separately"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "longest-consecutive",
    title: "Longest Consecutive Sequence",
    description: `Given an unsorted array of integers, find the length of the longest consecutive elements sequence. Must run in O(n) time.

**Example:**
\`\`\`
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive sequence is [1,2,3,4]. Length is 4.
\`\`\``,
    difficulty: "medium",
    category: "arrays",
    starterCode: {
      javascript: `function longestConsecutive(nums) {
  // Your code here
  
}

// Test your solution
console.log(longestConsecutive([100,4,200,1,3,2])); // Expected: 4`,
      python: `def longest_consecutive(nums):
    # Your code here
    pass

# Test your solution
print(longest_consecutive([100,4,200,1,3,2]))  # Expected: 4`,
      typescript: `function longestConsecutive(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(longestConsecutive([100,4,200,1,3,2])); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "nums = [100,4,200,1,3,2]", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9", isHidden: true, description: "Long sequence" },
    ],
    hints: ["Use a Set for O(1) lookups", "Only start counting from sequence beginnings (no num-1 in set)"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];

// Strings Category - 15 questions
const stringsChallenges: CodingChallenge[] = [
  {
    id: "reverse-string",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input is given as an array of characters.

**Example:**
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\``,
    difficulty: "easy",
    category: "strings",
    starterCode: {
      javascript: `function reverseString(s) {
  // Modify s in-place
  
}

// Test your solution
const s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);`,
      python: `def reverse_string(s):
    # Modify s in-place
    pass

# Test your solution
s = ["h","e","l","l","o"]
reverse_string(s)
print(s)`,
      typescript: `function reverseString(s: string[]): void {
  // Modify s in-place
  
}

// Test your solution
const s = ["h","e","l","l","o"];
reverseString(s);
console.log(s);`,
    },
    testCases: [
      { id: "tc1", input: 's = ["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = ["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]', isHidden: false, description: "Palindrome" },
    ],
    hints: ["Use two pointers - start and end", "Swap characters until pointers meet"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    description: `Given two strings s and t, return true if t is an anagram of s, and false otherwise.

**Example:**
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\``,
    difficulty: "easy",
    category: "strings",
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Your code here
  
}

// Test your solution
console.log(isAnagram("anagram", "nagaram")); // Expected: true`,
      python: `def is_anagram(s, t):
    # Your code here
    pass

# Test your solution
print(is_anagram("anagram", "nagaram"))  # Expected: True`,
      typescript: `function isAnagram(s: string, t: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(isAnagram("anagram", "nagaram")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "anagram", t = "nagaram"', expectedOutput: "true", isHidden: false, description: "Valid anagram" },
      { id: "tc2", input: 's = "rat", t = "car"', expectedOutput: "false", isHidden: false, description: "Not anagram" },
    ],
    hints: ["Count character frequencies", "Compare frequency maps"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    description: `A phrase is a palindrome if it reads the same forward and backward after converting to lowercase and removing non-alphanumeric characters.

**Example:**
\`\`\`
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\``,
    difficulty: "easy",
    category: "strings",
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Your code here
  
}

// Test your solution
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true`,
      python: `def is_palindrome(s):
    # Your code here
    pass

# Test your solution
print(is_palindrome("A man, a plan, a canal: Panama"))  # Expected: True`,
      typescript: `function isPalindrome(s: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "A man, a plan, a canal: Panama"', expectedOutput: "true", isHidden: false, description: "Valid" },
      { id: "tc2", input: 's = "race a car"', expectedOutput: "false", isHidden: false, description: "Invalid" },
    ],
    hints: ["Filter alphanumeric characters and lowercase", "Two pointer comparison"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "longest-substring-no-repeat",
    title: "Longest Substring Without Repeating Characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.

**Example:**
\`\`\`
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3.
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Your code here
  
}

// Test your solution
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3`,
      python: `def length_of_longest_substring(s):
    # Your code here
    pass

# Test your solution
print(length_of_longest_substring("abcabcbb"))  # Expected: 3`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: 's = "abcabcbb"', expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "bbbbb"', expectedOutput: "1", isHidden: false, description: "All same" },
      { id: "tc3", input: 's = "pwwkew"', expectedOutput: "3", isHidden: true, description: "Middle" },
    ],
    hints: ["Use sliding window technique", "Set/Map to track characters in window"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    description: `Given a string s, return the longest palindromic substring in s.

**Example:**
\`\`\`
Input: s = "babad"
Output: "bab" (or "aba")
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function longestPalindrome(s) {
  // Your code here
  
}

// Test your solution
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"`,
      python: `def longest_palindrome(s):
    # Your code here
    pass

# Test your solution
print(longest_palindrome("babad"))  # Expected: "bab" or "aba"`,
      typescript: `function longestPalindrome(s: string): string {
  // Your code here
  
}

// Test your solution
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"`,
    },
    testCases: [
      { id: "tc1", input: 's = "babad"', expectedOutput: "bab", isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "cbbd"', expectedOutput: "bb", isHidden: false, description: "Even length" },
    ],
    hints: ["Expand around center technique", "Consider both odd and even length palindromes"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    description: `Given an array of strings, group the anagrams together.

**Example:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Your code here
  
}

// Test your solution
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
      python: `def group_anagrams(strs):
    # Your code here
    pass

# Test your solution
print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))`,
      typescript: `function groupAnagrams(strs: string[]): string[][] {
  // Your code here
  
}

// Test your solution
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
    },
    testCases: [
      { id: "tc1", input: 'strs = ["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]', isHidden: false, description: "Basic" },
      { id: "tc2", input: 'strs = [""]', expectedOutput: '[[""]]', isHidden: false, description: "Empty string" },
    ],
    hints: ["Use sorted string as key", "Map of sorted key -> list of anagrams"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: `Given a string containing just '(', ')', '{', '}', '[' and ']', determine if the input is valid.

**Example:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\``,
    difficulty: "easy",
    category: "strings",
    starterCode: {
      javascript: `function isValid(s) {
  // Your code here
  
}

// Test your solution
console.log(isValid("()[]{}")); // Expected: true`,
      python: `def is_valid(s):
    # Your code here
    pass

# Test your solution
print(is_valid("()[]{}"))  # Expected: True`,
      typescript: `function isValid(s: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(isValid("()[]{}")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "()"', expectedOutput: "true", isHidden: false, description: "Simple" },
      { id: "tc2", input: 's = "()[]{}"', expectedOutput: "true", isHidden: false, description: "Multiple types" },
      { id: "tc3", input: 's = "(]"', expectedOutput: "false", isHidden: false, description: "Mismatched" },
    ],
    hints: ["Use a stack", "Push opening brackets, pop and match closing brackets"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    description: `Given a string s, return the number of palindromic substrings in it.

**Example:**
\`\`\`
Input: s = "abc"
Output: 3
Explanation: "a", "b", "c" are palindromic.
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function countSubstrings(s) {
  // Your code here
  
}

// Test your solution
console.log(countSubstrings("aaa")); // Expected: 6`,
      python: `def count_substrings(s):
    # Your code here
    pass

# Test your solution
print(count_substrings("aaa"))  # Expected: 6`,
      typescript: `function countSubstrings(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(countSubstrings("aaa")); // Expected: 6`,
    },
    testCases: [
      { id: "tc1", input: 's = "abc"', expectedOutput: "3", isHidden: false, description: "No overlaps" },
      { id: "tc2", input: 's = "aaa"', expectedOutput: "6", isHidden: false, description: "All palindromes" },
    ],
    hints: ["Expand around center for each position", "Count both odd and even length palindromes"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "encode-decode-strings",
    title: "Encode and Decode Strings",
    description: `Design an algorithm to encode a list of strings to a single string, and decode it back.

**Example:**
\`\`\`
Input: ["hello","world"]
Encoded: "5#hello5#world"
Decoded: ["hello","world"]
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function encode(strs) {
  // Your code here
  
}

function decode(str) {
  // Your code here
  
}

// Test your solution
const encoded = encode(["hello","world"]);
console.log(encoded);
console.log(decode(encoded));`,
      python: `def encode(strs):
    # Your code here
    pass

def decode(s):
    # Your code here
    pass

# Test your solution
encoded = encode(["hello","world"])
print(encoded)
print(decode(encoded))`,
      typescript: `function encode(strs: string[]): string {
  // Your code here
  
}

function decode(str: string): string[] {
  // Your code here
  
}

// Test your solution
const encoded = encode(["hello","world"]);
console.log(encoded);
console.log(decode(encoded));`,
    },
    testCases: [
      { id: "tc1", input: 'strs = ["hello","world"]', expectedOutput: '["hello","world"]', isHidden: false, description: "Basic" },
      { id: "tc2", input: 'strs = [""]', expectedOutput: '[""]', isHidden: true, description: "Empty string" },
    ],
    hints: ["Use length prefix with delimiter", "Format: length#string"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "string-compression",
    title: "String Compression",
    description: `Given an array of characters, compress it in-place using counts.

**Example:**
\`\`\`
Input: chars = ["a","a","b","b","c","c","c"]
Output: ["a","2","b","2","c","3"]
Return: 6 (length)
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function compress(chars) {
  // Modify chars in-place and return new length
  
}

// Test your solution
const chars = ["a","a","b","b","c","c","c"];
const len = compress(chars);
console.log(chars.slice(0, len));`,
      python: `def compress(chars):
    # Modify chars in-place and return new length
    pass

# Test your solution
chars = ["a","a","b","b","c","c","c"]
length = compress(chars)
print(chars[:length])`,
      typescript: `function compress(chars: string[]): number {
  // Modify chars in-place and return new length
  
}

// Test your solution
const chars = ["a","a","b","b","c","c","c"];
const len = compress(chars);
console.log(chars.slice(0, len));`,
    },
    testCases: [
      { id: "tc1", input: 'chars = ["a","a","b","b","c","c","c"]', expectedOutput: '6', isHidden: false, description: "Basic" },
      { id: "tc2", input: 'chars = ["a"]', expectedOutput: '1', isHidden: false, description: "Single char" },
    ],
    hints: ["Two pointers: read and write", "Only write count if > 1"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

**Example:**
\`\`\`
Input: strs = ["flower","flow","flight"]
Output: "fl"
\`\`\``,
    difficulty: "easy",
    category: "strings",
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  // Your code here
  
}

// Test your solution
console.log(longestCommonPrefix(["flower","flow","flight"])); // Expected: "fl"`,
      python: `def longest_common_prefix(strs):
    # Your code here
    pass

# Test your solution
print(longest_common_prefix(["flower","flow","flight"]))  # Expected: "fl"`,
      typescript: `function longestCommonPrefix(strs: string[]): string {
  // Your code here
  
}

// Test your solution
console.log(longestCommonPrefix(["flower","flow","flight"])); // Expected: "fl"`,
    },
    testCases: [
      { id: "tc1", input: 'strs = ["flower","flow","flight"]', expectedOutput: '"fl"', isHidden: false, description: "Common prefix" },
      { id: "tc2", input: 'strs = ["dog","racecar","car"]', expectedOutput: '""', isHidden: false, description: "No common prefix" },
    ],
    hints: ["Take first string as reference", "Compare character by character with all strings"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    description: `Given strings s and t, return the minimum window in s containing all characters of t.

**Example:**
\`\`\`
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
\`\`\``,
    difficulty: "hard",
    category: "strings",
    starterCode: {
      javascript: `function minWindow(s, t) {
  // Your code here
  
}

// Test your solution
console.log(minWindow("ADOBECODEBANC", "ABC")); // Expected: "BANC"`,
      python: `def min_window(s, t):
    # Your code here
    pass

# Test your solution
print(min_window("ADOBECODEBANC", "ABC"))  # Expected: "BANC"`,
      typescript: `function minWindow(s: string, t: string): string {
  // Your code here
  
}

// Test your solution
console.log(minWindow("ADOBECODEBANC", "ABC")); // Expected: "BANC"`,
    },
    testCases: [
      { id: "tc1", input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: '"BANC"', isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "a", t = "a"', expectedOutput: '"a"', isHidden: false, description: "Single char" },
    ],
    hints: ["Sliding window with two pointers", "Track character counts with hash maps"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "word-break",
    title: "Word Break",
    description: `Given a string s and a dictionary of words, return true if s can be segmented into dictionary words.

**Example:**
\`\`\`
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {
  // Your code here
  
}

// Test your solution
console.log(wordBreak("leetcode", ["leet","code"])); // Expected: true`,
      python: `def word_break(s, word_dict):
    # Your code here
    pass

# Test your solution
print(word_break("leetcode", ["leet","code"]))  # Expected: True`,
      typescript: `function wordBreak(s: string, wordDict: string[]): boolean {
  // Your code here
  
}

// Test your solution
console.log(wordBreak("leetcode", ["leet","code"])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "leetcode", wordDict = ["leet","code"]', expectedOutput: "true", isHidden: false, description: "Exact match" },
      { id: "tc2", input: 's = "applepenapple", wordDict = ["apple","pen"]', expectedOutput: "true", isHidden: false, description: "Reuse words" },
    ],
    hints: ["Dynamic programming approach", "dp[i] = can s[0:i] be segmented?"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "string-to-integer",
    title: "String to Integer (atoi)",
    description: `Implement atoi which converts a string to an integer, handling whitespace, signs, and overflow.

**Example:**
\`\`\`
Input: s = "   -42"
Output: -42
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function myAtoi(s) {
  // Your code here
  
}

// Test your solution
console.log(myAtoi("   -42")); // Expected: -42`,
      python: `def my_atoi(s):
    # Your code here
    pass

# Test your solution
print(my_atoi("   -42"))  # Expected: -42`,
      typescript: `function myAtoi(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(myAtoi("   -42")); // Expected: -42`,
    },
    testCases: [
      { id: "tc1", input: 's = "42"', expectedOutput: "42", isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "   -42"', expectedOutput: "-42", isHidden: false, description: "Negative with spaces" },
      { id: "tc3", input: 's = "4193 with words"', expectedOutput: "4193", isHidden: true, description: "With trailing text" },
    ],
    hints: ["Skip leading whitespace", "Handle sign, then parse digits", "Clamp to 32-bit integer range"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "zigzag-conversion",
    title: "Zigzag Conversion",
    description: `Convert a string written in a zigzag pattern with given number of rows, then read line by line.

**Example:**
\`\`\`
Input: s = "PAYPALISHIRING", numRows = 3
Pattern:
P   A   H   N
A P L S I I G
Y   I   R
Output: "PAHNAPLSIIGYIR"
\`\`\``,
    difficulty: "medium",
    category: "strings",
    starterCode: {
      javascript: `function convert(s, numRows) {
  // Your code here
  
}

// Test your solution
console.log(convert("PAYPALISHIRING", 3)); // Expected: "PAHNAPLSIIGYIR"`,
      python: `def convert(s, num_rows):
    # Your code here
    pass

# Test your solution
print(convert("PAYPALISHIRING", 3))  # Expected: "PAHNAPLSIIGYIR"`,
      typescript: `function convert(s: string, numRows: number): string {
  // Your code here
  
}

// Test your solution
console.log(convert("PAYPALISHIRING", 3)); // Expected: "PAHNAPLSIIGYIR"`,
    },
    testCases: [
      { id: "tc1", input: 's = "PAYPALISHIRING", numRows = 3', expectedOutput: '"PAHNAPLSIIGYIR"', isHidden: false, description: "3 rows" },
      { id: "tc2", input: 's = "PAYPALISHIRING", numRows = 4', expectedOutput: '"PINALSIGYAHRPI"', isHidden: false, description: "4 rows" },
    ],
    hints: ["Use array of strings for each row", "Track direction to toggle up/down"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];

// Linked Lists Category - 10 questions
const linkedListChallenges: CodingChallenge[] = [
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\``,
    difficulty: "easy",
    category: "linked-lists",
    starterCode: {
      javascript: `// Definition for singly-linked list node
// function ListNode(val, next) {
//     this.val = val;
//     this.next = next || null;
// }

function reverseList(head) {
  // Your code here
  
}

// Test with array representation
console.log("Reverse: [1,2,3,4,5] -> [5,4,3,2,1]");`,
      python: `# Definition for singly-linked list node
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverse_list(head):
    # Your code here
    pass

# Test with array representation
print("Reverse: [1,2,3,4,5] -> [5,4,3,2,1]")`,
      typescript: `// Definition for singly-linked list node
// class ListNode {
//     val: number
//     next: ListNode | null
//     constructor(val?: number, next?: ListNode | null) {
//         this.val = val ?? 0
//         this.next = next ?? null
//     }
// }

function reverseList(head: ListNode | null): ListNode | null {
  // Your code here
  
}

// Test with array representation
console.log("Reverse: [1,2,3,4,5] -> [5,4,3,2,1]");`,
    },
    testCases: [
      { id: "tc1", input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "head = [1,2]", expectedOutput: "[2,1]", isHidden: false, description: "Two nodes" },
      { id: "tc3", input: "head = []", expectedOutput: "[]", isHidden: true, description: "Empty" },
    ],
    hints: ["Use three pointers: prev, curr, next", "Iterate and reverse pointers"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    description: `Merge two sorted linked lists into one sorted list.

**Example:**
\`\`\`
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
\`\`\``,
    difficulty: "easy",
    category: "linked-lists",
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  // Your code here
  
}

// Test
console.log("Merge [1,2,4] and [1,3,4] -> [1,1,2,3,4,4]");`,
      python: `def merge_two_lists(list1, list2):
    # Your code here
    pass

# Test
print("Merge [1,2,4] and [1,3,4] -> [1,1,2,3,4,4]")`,
      typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // Your code here
  
}

// Test
console.log("Merge [1,2,4] and [1,3,4] -> [1,1,2,3,4,4]");`,
    },
    testCases: [
      { id: "tc1", input: "list1 = [1,2,4], list2 = [1,3,4]", expectedOutput: "[1,1,2,3,4,4]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "list1 = [], list2 = [0]", expectedOutput: "[0]", isHidden: false, description: "One empty" },
    ],
    hints: ["Use a dummy head node", "Compare and advance pointers"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    description: `Given head, return true if linked list has a cycle.

**Example:**
\`\`\`
Input: head = [3,2,0,-4], pos = 1 (tail connects to index 1)
Output: true
\`\`\``,
    difficulty: "easy",
    category: "linked-lists",
    starterCode: {
      javascript: `function hasCycle(head) {
  // Your code here
  
}

// Test
console.log("Has cycle: true for [3,2,0,-4] with cycle at pos 1");`,
      python: `def has_cycle(head):
    # Your code here
    pass

# Test
print("Has cycle: true for [3,2,0,-4] with cycle at pos 1")`,
      typescript: `function hasCycle(head: ListNode | null): boolean {
  // Your code here
  
}

// Test
console.log("Has cycle: true for [3,2,0,-4] with cycle at pos 1");`,
    },
    testCases: [
      { id: "tc1", input: "head = [3,2,0,-4], pos = 1", expectedOutput: "true", isHidden: false, description: "Has cycle" },
      { id: "tc2", input: "head = [1,2], pos = -1", expectedOutput: "false", isHidden: false, description: "No cycle" },
    ],
    hints: ["Floyd's Tortoise and Hare algorithm", "Slow and fast pointers"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    description: `Reorder list: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ...

**Example:**
\`\`\`
Input: head = [1,2,3,4]
Output: [1,4,2,3]
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `function reorderList(head) {
  // Modify in-place
  
}

// Test
console.log("Reorder [1,2,3,4] -> [1,4,2,3]");`,
      python: `def reorder_list(head):
    # Modify in-place
    pass

# Test
print("Reorder [1,2,3,4] -> [1,4,2,3]")`,
      typescript: `function reorderList(head: ListNode | null): void {
  // Modify in-place
  
}

// Test
console.log("Reorder [1,2,3,4] -> [1,4,2,3]");`,
    },
    testCases: [
      { id: "tc1", input: "head = [1,2,3,4]", expectedOutput: "[1,4,2,3]", isHidden: false, description: "Even" },
      { id: "tc2", input: "head = [1,2,3,4,5]", expectedOutput: "[1,5,2,4,3]", isHidden: false, description: "Odd" },
    ],
    hints: ["Find middle, reverse second half, merge alternating"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "remove-nth-from-end",
    title: "Remove Nth Node From End",
    description: `Remove the nth node from the end of the list.

**Example:**
\`\`\`
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `function removeNthFromEnd(head, n) {
  // Your code here
  
}

// Test
console.log("Remove 2nd from end of [1,2,3,4,5] -> [1,2,3,5]");`,
      python: `def remove_nth_from_end(head, n):
    # Your code here
    pass

# Test
print("Remove 2nd from end of [1,2,3,4,5] -> [1,2,3,5]")`,
      typescript: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  // Your code here
  
}

// Test
console.log("Remove 2nd from end of [1,2,3,4,5] -> [1,2,3,5]");`,
    },
    testCases: [
      { id: "tc1", input: "head = [1,2,3,4,5], n = 2", expectedOutput: "[1,2,3,5]", isHidden: false, description: "Middle" },
      { id: "tc2", input: "head = [1], n = 1", expectedOutput: "[]", isHidden: false, description: "Single node" },
    ],
    hints: ["Two pointers with n gap", "Use dummy head for edge cases"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "copy-random-pointer",
    title: "Copy List with Random Pointer",
    description: `Deep copy a linked list with next and random pointers.

**Example:**
\`\`\`
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `function copyRandomList(head) {
  // Your code here
  
}

// Test
console.log("Deep copy with random pointers");`,
      python: `def copy_random_list(head):
    # Your code here
    pass

# Test
print("Deep copy with random pointers")`,
      typescript: `function copyRandomList(head: Node | null): Node | null {
  // Your code here
  
}

// Test
console.log("Deep copy with random pointers");`,
    },
    testCases: [
      { id: "tc1", input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", expectedOutput: "[[7,null],[13,0],[11,4],[10,2],[1,0]]", isHidden: false, description: "Basic" },
    ],
    hints: ["Use hash map: original -> copy", "Or interleave copies then separate"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    description: `Add two numbers represented as reversed linked lists.

**Example:**
\`\`\`
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `function addTwoNumbers(l1, l2) {
  // Your code here
  
}

// Test
console.log("342 + 465 = 807 -> [7,0,8]");`,
      python: `def add_two_numbers(l1, l2):
    # Your code here
    pass

# Test
print("342 + 465 = 807 -> [7,0,8]")`,
      typescript: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // Your code here
  
}

// Test
console.log("342 + 465 = 807 -> [7,0,8]");`,
    },
    testCases: [
      { id: "tc1", input: "l1 = [2,4,3], l2 = [5,6,4]", expectedOutput: "[7,0,8]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "l1 = [9,9,9,9], l2 = [9,9,9]", expectedOutput: "[8,9,9,0,1]", isHidden: true, description: "Carry" },
    ],
    hints: ["Handle carry", "Don't forget final carry"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "find-duplicate",
    title: "Find the Duplicate Number",
    description: `Given an array containing n + 1 integers where each integer is in [1, n], find the duplicate.

**Example:**
\`\`\`
Input: nums = [1,3,4,2,2]
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `function findDuplicate(nums) {
  // Your code here
  
}

// Test your solution
console.log(findDuplicate([1,3,4,2,2])); // Expected: 2`,
      python: `def find_duplicate(nums):
    # Your code here
    pass

# Test your solution
print(find_duplicate([1,3,4,2,2]))  # Expected: 2`,
      typescript: `function findDuplicate(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(findDuplicate([1,3,4,2,2])); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,3,4,2,2]", expectedOutput: "2", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [3,1,3,4,2]", expectedOutput: "3", isHidden: false, description: "Different position" },
    ],
    hints: ["Floyd's cycle detection", "Treat array as linked list with index -> value mapping"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    description: `Design a data structure that follows LRU (Least Recently Used) cache constraints.

**Example:**
\`\`\`
LRUCache cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1
\`\`\``,
    difficulty: "medium",
    category: "linked-lists",
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    // Initialize
    
  }
  
  get(key) {
    // Your code here
    
  }
  
  put(key, value) {
    // Your code here
    
  }
}

// Test
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        # Initialize
        pass
    
    def get(self, key: int) -> int:
        # Your code here
        pass
    
    def put(self, key: int, value: int) -> None:
        # Your code here
        pass

# Test
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))  # 1`,
      typescript: `class LRUCache {
  constructor(capacity: number) {
    // Initialize
    
  }
  
  get(key: number): number {
    // Your code here
    
  }
  
  put(key: number, value: number): void {
    // Your code here
    
  }
}

// Test
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1`,
    },
    testCases: [
      { id: "tc1", input: "operations", expectedOutput: "correct sequence", isHidden: false, description: "Basic operations" },
    ],
    hints: ["Use doubly linked list + hash map", "O(1) for both get and put"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    description: `Merge k sorted linked lists into one sorted list.

**Example:**
\`\`\`
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
\`\`\``,
    difficulty: "hard",
    category: "linked-lists",
    starterCode: {
      javascript: `function mergeKLists(lists) {
  // Your code here
  
}

// Test
console.log("Merge [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]");`,
      python: `def merge_k_lists(lists):
    # Your code here
    pass

# Test
print("Merge [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]")`,
      typescript: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // Your code here
  
}

// Test
console.log("Merge [[1,4,5],[1,3,4],[2,6]] -> [1,1,2,3,4,4,5,6]");`,
    },
    testCases: [
      { id: "tc1", input: "lists = [[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,4,5,6]", isHidden: false, description: "Basic" },
    ],
    hints: ["Use min-heap/priority queue", "Or divide and conquer merge"],
    expectedTimeMinutes: 30,
    points: 250,
  },
];

// Stacks & Queues Category - 10 questions
const stacksQueuesChallenges: CodingChallenge[] = [
  {
    id: "min-stack",
    title: "Min Stack",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.

**Example:**
\`\`\`
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
\`\`\``,
    difficulty: "medium",
    category: "stacks-queues",
    starterCode: {
      javascript: `class MinStack {
  constructor() {
    // Initialize
    
  }
  
  push(val) {
    // Your code here
    
  }
  
  pop() {
    // Your code here
    
  }
  
  top() {
    // Your code here
    
  }
  
  getMin() {
    // Your code here
    
  }
}

// Test
const stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log(stack.getMin()); // -3`,
      python: `class MinStack:
    def __init__(self):
        # Initialize
        pass
    
    def push(self, val: int) -> None:
        # Your code here
        pass
    
    def pop(self) -> None:
        # Your code here
        pass
    
    def top(self) -> int:
        # Your code here
        pass
    
    def getMin(self) -> int:
        # Your code here
        pass

# Test
stack = MinStack()
stack.push(-2)
stack.push(0)
stack.push(-3)
print(stack.getMin())  # -3`,
      typescript: `class MinStack {
  constructor() {
    // Initialize
    
  }
  
  push(val: number): void {
    // Your code here
    
  }
  
  pop(): void {
    // Your code here
    
  }
  
  top(): number {
    // Your code here
    
  }
  
  getMin(): number {
    // Your code here
    
  }
}

// Test
const stack = new MinStack();
stack.push(-2);
stack.push(0);
stack.push(-3);
console.log(stack.getMin()); // -3`,
    },
    testCases: [
      { id: "tc1", input: "operations", expectedOutput: "correct sequence", isHidden: false, description: "Basic" },
    ],
    hints: ["Use auxiliary stack to track minimums", "Or store tuples (value, min_at_this_point)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "evaluate-rpn",
    title: "Evaluate Reverse Polish Notation",
    description: `Evaluate the value of an arithmetic expression in Reverse Polish Notation.

**Example:**
\`\`\`
Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
\`\`\``,
    difficulty: "medium",
    category: "stacks-queues",
    starterCode: {
      javascript: `function evalRPN(tokens) {
  // Your code here
  
}

// Test your solution
console.log(evalRPN(["2","1","+","3","*"])); // Expected: 9`,
      python: `def eval_rpn(tokens):
    # Your code here
    pass

# Test your solution
print(eval_rpn(["2","1","+","3","*"]))  # Expected: 9`,
      typescript: `function evalRPN(tokens: string[]): number {
  // Your code here
  
}

// Test your solution
console.log(evalRPN(["2","1","+","3","*"])); // Expected: 9`,
    },
    testCases: [
      { id: "tc1", input: 'tokens = ["2","1","+","3","*"]', expectedOutput: "9", isHidden: false, description: "Basic" },
      { id: "tc2", input: 'tokens = ["4","13","5","/","+"]', expectedOutput: "6", isHidden: false, description: "Division" },
    ],
    hints: ["Use stack for operands", "Pop two, apply operator, push result"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    description: `Given n pairs of parentheses, generate all combinations of well-formed parentheses.

**Example:**
\`\`\`
Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
\`\`\``,
    difficulty: "medium",
    category: "stacks-queues",
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
      { id: "tc1", input: "n = 3", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: false, description: "n=3" },
      { id: "tc2", input: "n = 1", expectedOutput: '["()"]', isHidden: false, description: "n=1" },
    ],
    hints: ["Backtracking approach", "Track open and close counts"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    description: `Given temperatures, return array where answer[i] is the number of days until a warmer temperature.

**Example:**
\`\`\`
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
\`\`\``,
    difficulty: "medium",
    category: "stacks-queues",
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {
  // Your code here
  
}

// Test your solution
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));`,
      python: `def daily_temperatures(temperatures):
    # Your code here
    pass

# Test your solution
print(daily_temperatures([73,74,75,71,69,72,76,73]))`,
      typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));`,
    },
    testCases: [
      { id: "tc1", input: "temperatures = [73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "temperatures = [30,40,50,60]", expectedOutput: "[1,1,1,0]", isHidden: false, description: "Increasing" },
    ],
    hints: ["Monotonic decreasing stack", "Store indices in stack"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "car-fleet",
    title: "Car Fleet",
    description: `n cars heading to a target. Calculate how many car fleets arrive.

**Example:**
\`\`\`
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
\`\`\``,
    difficulty: "medium",
    category: "stacks-queues",
    starterCode: {
      javascript: `function carFleet(target, position, speed) {
  // Your code here
  
}

// Test your solution
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // Expected: 3`,
      python: `def car_fleet(target, position, speed):
    # Your code here
    pass

# Test your solution
print(car_fleet(12, [10,8,0,5,3], [2,4,1,1,3]))  # Expected: 3`,
      typescript: `function carFleet(target: number, position: number[], speed: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(carFleet(12, [10,8,0,5,3], [2,4,1,1,3])); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", expectedOutput: "3", isHidden: false, description: "Basic" },
    ],
    hints: ["Sort by position descending", "Calculate time to reach target", "Stack to track fleets"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    description: `Given heights representing histogram bars (width 1), find the largest rectangle.

**Example:**
\`\`\`
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: Rectangle of height 5, width 2.
\`\`\``,
    difficulty: "hard",
    category: "stacks-queues",
    starterCode: {
      javascript: `function largestRectangleArea(heights) {
  // Your code here
  
}

// Test your solution
console.log(largestRectangleArea([2,1,5,6,2,3])); // Expected: 10`,
      python: `def largest_rectangle_area(heights):
    # Your code here
    pass

# Test your solution
print(largest_rectangle_area([2,1,5,6,2,3]))  # Expected: 10`,
      typescript: `function largestRectangleArea(heights: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(largestRectangleArea([2,1,5,6,2,3])); // Expected: 10`,
    },
    testCases: [
      { id: "tc1", input: "heights = [2,1,5,6,2,3]", expectedOutput: "10", isHidden: false, description: "Basic" },
      { id: "tc2", input: "heights = [2,4]", expectedOutput: "4", isHidden: false, description: "Two bars" },
    ],
    hints: ["Monotonic increasing stack", "For each bar, find how far it can extend left and right"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    description: `Implement a first in first out (FIFO) queue using only two stacks.

**Example:**
\`\`\`
MyQueue queue = new MyQueue();
queue.push(1);
queue.push(2);
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false
\`\`\``,
    difficulty: "easy",
    category: "stacks-queues",
    starterCode: {
      javascript: `class MyQueue {
  constructor() {
    // Initialize
    
  }
  
  push(x) {
    // Your code here
    
  }
  
  pop() {
    // Your code here
    
  }
  
  peek() {
    // Your code here
    
  }
  
  empty() {
    // Your code here
    
  }
}

// Test
const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek()); // 1`,
      python: `class MyQueue:
    def __init__(self):
        # Initialize
        pass
    
    def push(self, x: int) -> None:
        # Your code here
        pass
    
    def pop(self) -> int:
        # Your code here
        pass
    
    def peek(self) -> int:
        # Your code here
        pass
    
    def empty(self) -> bool:
        # Your code here
        pass

# Test
queue = MyQueue()
queue.push(1)
queue.push(2)
print(queue.peek())  # 1`,
      typescript: `class MyQueue {
  constructor() {
    // Initialize
    
  }
  
  push(x: number): void {
    // Your code here
    
  }
  
  pop(): number {
    // Your code here
    
  }
  
  peek(): number {
    // Your code here
    
  }
  
  empty(): boolean {
    // Your code here
    
  }
}

// Test
const queue = new MyQueue();
queue.push(1);
queue.push(2);
console.log(queue.peek()); // 1`,
    },
    testCases: [
      { id: "tc1", input: "operations", expectedOutput: "correct sequence", isHidden: false, description: "Basic" },
    ],
    hints: ["Use two stacks: input and output", "Transfer from input to output when output is empty"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    description: `Given array nums and window size k, return max of each window.

**Example:**
\`\`\`
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
\`\`\``,
    difficulty: "hard",
    category: "stacks-queues",
    starterCode: {
      javascript: `function maxSlidingWindow(nums, k) {
  // Your code here
  
}

// Test your solution
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));`,
      python: `def max_sliding_window(nums, k):
    # Your code here
    pass

# Test your solution
print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))`,
      typescript: `function maxSlidingWindow(nums: number[], k: number): number[] {
  // Your code here
  
}

// Test your solution
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", expectedOutput: "[3,3,5,5,6,7]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1], k = 1", expectedOutput: "[1]", isHidden: false, description: "Single element" },
    ],
    hints: ["Use monotonic decreasing deque", "Store indices, remove out-of-window elements"],
    expectedTimeMinutes: 30,
    points: 250,
  },
  {
    id: "next-greater-element",
    title: "Next Greater Element I",
    description: `Find the next greater element for each element of nums1 in nums2.

**Example:**
\`\`\`
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
\`\`\``,
    difficulty: "easy",
    category: "stacks-queues",
    starterCode: {
      javascript: `function nextGreaterElement(nums1, nums2) {
  // Your code here
  
}

// Test your solution
console.log(nextGreaterElement([4,1,2], [1,3,4,2])); // Expected: [-1,3,-1]`,
      python: `def next_greater_element(nums1, nums2):
    # Your code here
    pass

# Test your solution
print(next_greater_element([4,1,2], [1,3,4,2]))  # Expected: [-1,3,-1]`,
      typescript: `function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(nextGreaterElement([4,1,2], [1,3,4,2])); // Expected: [-1,3,-1]`,
    },
    testCases: [
      { id: "tc1", input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", expectedOutput: "[-1,3,-1]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums1 = [2,4], nums2 = [1,2,3,4]", expectedOutput: "[3,-1]", isHidden: false, description: "End elements" },
    ],
    hints: ["Build next greater map from nums2 using stack", "Query for each element in nums1"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "basic-calculator",
    title: "Basic Calculator",
    description: `Implement a basic calculator to evaluate a string expression with +, -, (, ).

**Example:**
\`\`\`
Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23
\`\`\``,
    difficulty: "hard",
    category: "stacks-queues",
    starterCode: {
      javascript: `function calculate(s) {
  // Your code here
  
}

// Test your solution
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // Expected: 23`,
      python: `def calculate(s):
    # Your code here
    pass

# Test your solution
print(calculate("(1+(4+5+2)-3)+(6+8)"))  # Expected: 23`,
      typescript: `function calculate(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(calculate("(1+(4+5+2)-3)+(6+8)")); // Expected: 23`,
    },
    testCases: [
      { id: "tc1", input: 's = "1 + 1"', expectedOutput: "2", isHidden: false, description: "Simple" },
      { id: "tc2", input: 's = "(1+(4+5+2)-3)+(6+8)"', expectedOutput: "23", isHidden: false, description: "Nested parentheses" },
    ],
    hints: ["Use stack for parentheses", "Track sign and result"],
    expectedTimeMinutes: 35,
    points: 250,
  },
];

// Trees Category - 15 questions
const treesChallenges: CodingChallenge[] = [
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    description: `Given the root of a binary tree, invert the tree, and return its root.

**Example:**
\`\`\`
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function invertTree(root) {
  // Your code here
  
}

// Test
console.log("Invert [4,2,7,1,3,6,9] -> [4,7,2,9,6,3,1]");`,
      python: `def invert_tree(root):
    # Your code here
    pass

# Test
print("Invert [4,2,7,1,3,6,9] -> [4,7,2,9,6,3,1]")`,
      typescript: `function invertTree(root: TreeNode | null): TreeNode | null {
  // Your code here
  
}

// Test
console.log("Invert [4,2,7,1,3,6,9] -> [4,7,2,9,6,3,1]");`,
    },
    testCases: [
      { id: "tc1", input: "root = [4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [2,1,3]", expectedOutput: "[2,3,1]", isHidden: false, description: "Small tree" },
    ],
    hints: ["Recursively swap left and right children", "Or use BFS/DFS iteratively"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    description: `Given a binary tree, find its maximum depth.

**Example:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: 3
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function maxDepth(root) {
  // Your code here
  
}

// Test
console.log("Max depth of [3,9,20,null,null,15,7] = 3");`,
      python: `def max_depth(root):
    # Your code here
    pass

# Test
print("Max depth of [3,9,20,null,null,15,7] = 3")`,
      typescript: `function maxDepth(root: TreeNode | null): number {
  // Your code here
  
}

// Test
console.log("Max depth of [3,9,20,null,null,15,7] = 3");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,9,20,null,null,15,7]", expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [1,null,2]", expectedOutput: "2", isHidden: false, description: "Linear" },
    ],
    hints: ["Recursive: 1 + max(left depth, right depth)", "Or BFS counting levels"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "same-tree",
    title: "Same Tree",
    description: `Check if two binary trees are identical.

**Example:**
\`\`\`
Input: p = [1,2,3], q = [1,2,3]
Output: true
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function isSameTree(p, q) {
  // Your code here
  
}

// Test
console.log("Same tree [1,2,3] and [1,2,3] = true");`,
      python: `def is_same_tree(p, q):
    # Your code here
    pass

# Test
print("Same tree [1,2,3] and [1,2,3] = True")`,
      typescript: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Your code here
  
}

// Test
console.log("Same tree [1,2,3] and [1,2,3] = true");`,
    },
    testCases: [
      { id: "tc1", input: "p = [1,2,3], q = [1,2,3]", expectedOutput: "true", isHidden: false, description: "Same" },
      { id: "tc2", input: "p = [1,2], q = [1,null,2]", expectedOutput: "false", isHidden: false, description: "Different" },
    ],
    hints: ["Recursively compare values and structure", "Both null = true, one null = false"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    description: `Check if tree s is a subtree of tree t.

**Example:**
\`\`\`
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function isSubtree(root, subRoot) {
  // Your code here
  
}

// Test
console.log("Is [4,1,2] subtree of [3,4,5,1,2] = true");`,
      python: `def is_subtree(root, sub_root):
    # Your code here
    pass

# Test
print("Is [4,1,2] subtree of [3,4,5,1,2] = True")`,
      typescript: `function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Your code here
  
}

// Test
console.log("Is [4,1,2] subtree of [3,4,5,1,2] = true");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,4,5,1,2], subRoot = [4,1,2]", expectedOutput: "true", isHidden: false, description: "Is subtree" },
      { id: "tc2", input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", expectedOutput: "false", isHidden: true, description: "Not subtree" },
    ],
    hints: ["Use isSameTree helper", "Check at each node of main tree"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "lowest-common-ancestor-bst",
    title: "Lowest Common Ancestor of a BST",
    description: `Find the lowest common ancestor (LCA) of two nodes in a BST.

**Example:**
\`\`\`
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function lowestCommonAncestor(root, p, q) {
  // Your code here
  
}

// Test
console.log("LCA of 2 and 8 in BST = 6");`,
      python: `def lowest_common_ancestor(root, p, q):
    # Your code here
    pass

# Test
print("LCA of 2 and 8 in BST = 6")`,
      typescript: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  // Your code here
  
}

// Test
console.log("LCA of 2 and 8 in BST = 6");`,
    },
    testCases: [
      { id: "tc1", input: "root = [6,2,8,0,4,7,9], p = 2, q = 8", expectedOutput: "6", isHidden: false, description: "Split point" },
      { id: "tc2", input: "root = [6,2,8,0,4,7,9], p = 2, q = 4", expectedOutput: "2", isHidden: false, description: "Ancestor is one node" },
    ],
    hints: ["Use BST property", "If both less than root, go left; both greater, go right; else root is LCA"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    description: `Return the level order traversal of a binary tree's nodes' values.

**Example:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function levelOrder(root) {
  // Your code here
  
}

// Test
console.log("Level order: [[3],[9,20],[15,7]]");`,
      python: `def level_order(root):
    # Your code here
    pass

# Test
print("Level order: [[3],[9,20],[15,7]]")`,
      typescript: `function levelOrder(root: TreeNode | null): number[][] {
  // Your code here
  
}

// Test
console.log("Level order: [[3],[9,20],[15,7]]");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [1]", expectedOutput: "[[1]]", isHidden: false, description: "Single node" },
    ],
    hints: ["Use BFS with queue", "Process level by level"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "validate-bst",
    title: "Validate Binary Search Tree",
    description: `Determine if a binary tree is a valid BST.

**Example:**
\`\`\`
Input: root = [2,1,3]
Output: true
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function isValidBST(root) {
  // Your code here
  
}

// Test
console.log("Is [2,1,3] valid BST = true");`,
      python: `def is_valid_bst(root):
    # Your code here
    pass

# Test
print("Is [2,1,3] valid BST = True")`,
      typescript: `function isValidBST(root: TreeNode | null): boolean {
  // Your code here
  
}

// Test
console.log("Is [2,1,3] valid BST = true");`,
    },
    testCases: [
      { id: "tc1", input: "root = [2,1,3]", expectedOutput: "true", isHidden: false, description: "Valid" },
      { id: "tc2", input: "root = [5,1,4,null,null,3,6]", expectedOutput: "false", isHidden: false, description: "Invalid" },
    ],
    hints: ["Pass min/max bounds recursively", "Or use inorder traversal (should be sorted)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    description: `Find the kth smallest element in a BST.

**Example:**
\`\`\`
Input: root = [3,1,4,null,2], k = 1
Output: 1
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function kthSmallest(root, k) {
  // Your code here
  
}

// Test
console.log("1st smallest in [3,1,4,null,2] = 1");`,
      python: `def kth_smallest(root, k):
    # Your code here
    pass

# Test
print("1st smallest in [3,1,4,null,2] = 1")`,
      typescript: `function kthSmallest(root: TreeNode | null, k: number): number {
  // Your code here
  
}

// Test
console.log("1st smallest in [3,1,4,null,2] = 1");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,1,4,null,2], k = 1", expectedOutput: "1", isHidden: false, description: "k=1" },
      { id: "tc2", input: "root = [5,3,6,2,4,null,null,1], k = 3", expectedOutput: "3", isHidden: false, description: "k=3" },
    ],
    hints: ["Inorder traversal gives sorted order", "Stop at kth element"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "construct-tree-preorder-inorder",
    title: "Construct Binary Tree from Preorder and Inorder",
    description: `Build a binary tree from preorder and inorder traversals.

**Example:**
\`\`\`
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function buildTree(preorder, inorder) {
  // Your code here
  
}

// Test
console.log("Build tree from traversals");`,
      python: `def build_tree(preorder, inorder):
    # Your code here
    pass

# Test
print("Build tree from traversals")`,
      typescript: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // Your code here
  
}

// Test
console.log("Build tree from traversals");`,
    },
    testCases: [
      { id: "tc1", input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", expectedOutput: "[3,9,20,null,null,15,7]", isHidden: false, description: "Basic" },
    ],
    hints: ["Preorder first element is root", "Find root in inorder to split left/right subtrees"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "binary-tree-max-path-sum",
    title: "Binary Tree Maximum Path Sum",
    description: `Find the maximum path sum in a binary tree. Path can start and end at any node.

**Example:**
\`\`\`
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: 15 + 20 + 7 = 42
\`\`\``,
    difficulty: "hard",
    category: "trees",
    starterCode: {
      javascript: `function maxPathSum(root) {
  // Your code here
  
}

// Test
console.log("Max path sum in [-10,9,20,null,null,15,7] = 42");`,
      python: `def max_path_sum(root):
    # Your code here
    pass

# Test
print("Max path sum in [-10,9,20,null,null,15,7] = 42")`,
      typescript: `function maxPathSum(root: TreeNode | null): number {
  // Your code here
  
}

// Test
console.log("Max path sum in [-10,9,20,null,null,15,7] = 42");`,
    },
    testCases: [
      { id: "tc1", input: "root = [-10,9,20,null,null,15,7]", expectedOutput: "42", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [1,2,3]", expectedOutput: "6", isHidden: false, description: "Full path" },
    ],
    hints: ["For each node, compute max path through it", "Return max single path (can only go one direction) to parent"],
    expectedTimeMinutes: 30,
    points: 250,
  },
  {
    id: "serialize-deserialize-tree",
    title: "Serialize and Deserialize Binary Tree",
    description: `Design an algorithm to serialize and deserialize a binary tree.

**Example:**
\`\`\`
Input: root = [1,2,3,null,null,4,5]
Serialized: "1,2,3,null,null,4,5"
Deserialized: [1,2,3,null,null,4,5]
\`\`\``,
    difficulty: "hard",
    category: "trees",
    starterCode: {
      javascript: `function serialize(root) {
  // Your code here
  
}

function deserialize(data) {
  // Your code here
  
}

// Test
const tree = deserialize(serialize([1,2,3,null,null,4,5]));
console.log(serialize(tree));`,
      python: `def serialize(root):
    # Your code here
    pass

def deserialize(data):
    # Your code here
    pass

# Test
print("Serialize and deserialize tree")`,
      typescript: `function serialize(root: TreeNode | null): string {
  // Your code here
  
}

function deserialize(data: string): TreeNode | null {
  // Your code here
  
}

// Test
console.log("Serialize and deserialize tree");`,
    },
    testCases: [
      { id: "tc1", input: "root = [1,2,3,null,null,4,5]", expectedOutput: "[1,2,3,null,null,4,5]", isHidden: false, description: "Basic" },
    ],
    hints: ["Use preorder traversal with null markers", "Queue for deserialization"],
    expectedTimeMinutes: 30,
    points: 250,
  },
  {
    id: "diameter-binary-tree",
    title: "Diameter of Binary Tree",
    description: `Find the diameter of a binary tree (longest path between any two nodes).

**Example:**
\`\`\`
Input: root = [1,2,3,4,5]
Output: 3
Explanation: Path is [4,2,1,3] or [5,2,1,3]
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function diameterOfBinaryTree(root) {
  // Your code here
  
}

// Test
console.log("Diameter of [1,2,3,4,5] = 3");`,
      python: `def diameter_of_binary_tree(root):
    # Your code here
    pass

# Test
print("Diameter of [1,2,3,4,5] = 3")`,
      typescript: `function diameterOfBinaryTree(root: TreeNode | null): number {
  // Your code here
  
}

// Test
console.log("Diameter of [1,2,3,4,5] = 3");`,
    },
    testCases: [
      { id: "tc1", input: "root = [1,2,3,4,5]", expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [1,2]", expectedOutput: "1", isHidden: false, description: "Two nodes" },
    ],
    hints: ["Diameter at node = left height + right height", "Track max diameter globally"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    description: `Determine if a binary tree is height-balanced (heights of subtrees differ by at most 1).

**Example:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: true
\`\`\``,
    difficulty: "easy",
    category: "trees",
    starterCode: {
      javascript: `function isBalanced(root) {
  // Your code here
  
}

// Test
console.log("Is [3,9,20,null,null,15,7] balanced = true");`,
      python: `def is_balanced(root):
    # Your code here
    pass

# Test
print("Is [3,9,20,null,null,15,7] balanced = True")`,
      typescript: `function isBalanced(root: TreeNode | null): boolean {
  // Your code here
  
}

// Test
console.log("Is [3,9,20,null,null,15,7] balanced = true");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,9,20,null,null,15,7]", expectedOutput: "true", isHidden: false, description: "Balanced" },
      { id: "tc2", input: "root = [1,2,2,3,3,null,null,4,4]", expectedOutput: "false", isHidden: false, description: "Unbalanced" },
    ],
    hints: ["Compute height while checking balance", "Return -1 for unbalanced subtree"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    description: `Return values visible from the right side of the tree.

**Example:**
\`\`\`
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function rightSideView(root) {
  // Your code here
  
}

// Test
console.log("Right side view of [1,2,3,null,5,null,4] = [1,3,4]");`,
      python: `def right_side_view(root):
    # Your code here
    pass

# Test
print("Right side view of [1,2,3,null,5,null,4] = [1,3,4]")`,
      typescript: `function rightSideView(root: TreeNode | null): number[] {
  // Your code here
  
}

// Test
console.log("Right side view of [1,2,3,null,5,null,4] = [1,3,4]");`,
    },
    testCases: [
      { id: "tc1", input: "root = [1,2,3,null,5,null,4]", expectedOutput: "[1,3,4]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [1,null,3]", expectedOutput: "[1,3]", isHidden: false, description: "Right-only" },
    ],
    hints: ["BFS level order, take last element of each level", "Or DFS visiting right child first"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "count-good-nodes",
    title: "Count Good Nodes in Binary Tree",
    description: `A node X is good if no node from root to X has a greater value than X.

**Example:**
\`\`\`
Input: root = [3,1,4,3,null,1,5]
Output: 4
Explanation: Nodes 3, 4, 5, and 3 are good.
\`\`\``,
    difficulty: "medium",
    category: "trees",
    starterCode: {
      javascript: `function goodNodes(root) {
  // Your code here
  
}

// Test
console.log("Good nodes in [3,1,4,3,null,1,5] = 4");`,
      python: `def good_nodes(root):
    # Your code here
    pass

# Test
print("Good nodes in [3,1,4,3,null,1,5] = 4")`,
      typescript: `function goodNodes(root: TreeNode | null): number {
  // Your code here
  
}

// Test
console.log("Good nodes in [3,1,4,3,null,1,5] = 4");`,
    },
    testCases: [
      { id: "tc1", input: "root = [3,1,4,3,null,1,5]", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "root = [3,3,null,4,2]", expectedOutput: "3", isHidden: false, description: "Left subtree" },
    ],
    hints: ["Track max value seen on path from root", "Node is good if val >= maxSoFar"],
    expectedTimeMinutes: 15,
    points: 100,
  },
];

// Dynamic Programming Category - 15 questions
const dpChallenges: CodingChallenge[] = [
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    description: `You can climb 1 or 2 steps at a time. How many distinct ways to reach the top of n stairs?

**Example:**
\`\`\`
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, 2+1
\`\`\``,
    difficulty: "easy",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function climbStairs(n) {
  // Your code here
  
}

// Test your solution
console.log(climbStairs(3)); // Expected: 3`,
      python: `def climb_stairs(n):
    # Your code here
    pass

# Test your solution
print(climb_stairs(3))  # Expected: 3`,
      typescript: `function climbStairs(n: number): number {
  // Your code here
  
}

// Test your solution
console.log(climbStairs(3)); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "n = 2", expectedOutput: "2", isHidden: false, description: "n=2" },
      { id: "tc2", input: "n = 3", expectedOutput: "3", isHidden: false, description: "n=3" },
      { id: "tc3", input: "n = 5", expectedOutput: "8", isHidden: true, description: "n=5" },
    ],
    hints: ["This is the Fibonacci sequence", "dp[i] = dp[i-1] + dp[i-2]"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "coin-change",
    title: "Coin Change",
    description: `Find the fewest number of coins needed to make up the amount.

**Example:**
\`\`\`
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  // Your code here
  
}

// Test your solution
console.log(coinChange([1,2,5], 11)); // Expected: 3`,
      python: `def coin_change(coins, amount):
    # Your code here
    pass

# Test your solution
print(coin_change([1,2,5], 11))  # Expected: 3`,
      typescript: `function coinChange(coins: number[], amount: number): number {
  // Your code here
  
}

// Test your solution
console.log(coinChange([1,2,5], 11)); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "coins = [1,2,5], amount = 11", expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: "coins = [2], amount = 3", expectedOutput: "-1", isHidden: false, description: "Impossible" },
    ],
    hints: ["dp[i] = min coins needed for amount i", "dp[i] = min(dp[i], dp[i-coin] + 1) for each coin"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    description: `Find the length of the longest strictly increasing subsequence.

**Example:**
\`\`\`
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: [2,3,7,101]
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  // Your code here
  
}

// Test your solution
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Expected: 4`,
      python: `def length_of_lis(nums):
    # Your code here
    pass

# Test your solution
print(length_of_lis([10,9,2,5,3,7,101,18]))  # Expected: 4`,
      typescript: `function lengthOfLIS(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "nums = [10,9,2,5,3,7,101,18]", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [0,1,0,3,2,3]", expectedOutput: "4", isHidden: false, description: "Multiple options" },
    ],
    hints: ["O(n²): dp[i] = max(dp[j] + 1) for j < i where nums[j] < nums[i]", "O(n log n): Binary search with patience sorting"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "house-robber",
    title: "House Robber",
    description: `Max money from robbing houses without robbing adjacent ones.

**Example:**
\`\`\`
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 and 3 (1 + 3 = 4)
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function rob(nums) {
  // Your code here
  
}

// Test your solution
console.log(rob([1,2,3,1])); // Expected: 4`,
      python: `def rob(nums):
    # Your code here
    pass

# Test your solution
print(rob([1,2,3,1]))  # Expected: 4`,
      typescript: `function rob(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(rob([1,2,3,1])); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3,1]", expectedOutput: "4", isHidden: false, description: "Skip adjacent" },
      { id: "tc2", input: "nums = [2,7,9,3,1]", expectedOutput: "12", isHidden: false, description: "Optimal choice" },
    ],
    hints: ["dp[i] = max(dp[i-1], dp[i-2] + nums[i])", "Either skip current house or rob it"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "house-robber-2",
    title: "House Robber II",
    description: `Same as House Robber but houses are in a circle (first and last are adjacent).

**Example:**
\`\`\`
Input: nums = [2,3,2]
Output: 3
Explanation: Rob house 2 (can't rob both 1 and 3)
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function rob(nums) {
  // Your code here
  
}

// Test your solution
console.log(rob([2,3,2])); // Expected: 3`,
      python: `def rob(nums):
    # Your code here
    pass

# Test your solution
print(rob([2,3,2]))  # Expected: 3`,
      typescript: `function rob(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(rob([2,3,2])); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,3,2]", expectedOutput: "3", isHidden: false, description: "Circle constraint" },
      { id: "tc2", input: "nums = [1,2,3,1]", expectedOutput: "4", isHidden: false, description: "Longer circle" },
    ],
    hints: ["Run House Robber on [0..n-2] and [1..n-1]", "Take max of both results"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "longest-palindromic-substring-dp",
    title: "Longest Palindromic Substring (DP)",
    description: `Find the longest palindromic substring using dynamic programming.

**Example:**
\`\`\`
Input: s = "babad"
Output: "bab" (or "aba")
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function longestPalindrome(s) {
  // Your code here
  
}

// Test your solution
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"`,
      python: `def longest_palindrome(s):
    # Your code here
    pass

# Test your solution
print(longest_palindrome("babad"))  # Expected: "bab" or "aba"`,
      typescript: `function longestPalindrome(s: string): string {
  // Your code here
  
}

// Test your solution
console.log(longestPalindrome("babad")); // Expected: "bab" or "aba"`,
    },
    testCases: [
      { id: "tc1", input: 's = "babad"', expectedOutput: '"bab"', isHidden: false, description: "Basic" },
      { id: "tc2", input: 's = "cbbd"', expectedOutput: '"bb"', isHidden: false, description: "Even length" },
    ],
    hints: ["dp[i][j] = is s[i..j] a palindrome?", "dp[i][j] = s[i]==s[j] && dp[i+1][j-1]"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "decode-ways",
    title: "Decode Ways",
    description: `Given a string of digits, count ways to decode it as letters (A=1, B=2, ..., Z=26).

**Example:**
\`\`\`
Input: s = "226"
Output: 3
Explanation: "BZ" (2,26), "VF" (22,6), "BBF" (2,2,6)
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function numDecodings(s) {
  // Your code here
  
}

// Test your solution
console.log(numDecodings("226")); // Expected: 3`,
      python: `def num_decodings(s):
    # Your code here
    pass

# Test your solution
print(num_decodings("226"))  # Expected: 3`,
      typescript: `function numDecodings(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(numDecodings("226")); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: 's = "12"', expectedOutput: "2", isHidden: false, description: "Two ways" },
      { id: "tc2", input: 's = "226"', expectedOutput: "3", isHidden: false, description: "Three ways" },
      { id: "tc3", input: 's = "06"', expectedOutput: "0", isHidden: true, description: "Leading zero" },
    ],
    hints: ["dp[i] = ways to decode s[0..i-1]", "Consider single digit (1-9) and two digits (10-26)"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "unique-paths",
    title: "Unique Paths",
    description: `Count unique paths from top-left to bottom-right of m x n grid (only move right or down).

**Example:**
\`\`\`
Input: m = 3, n = 7
Output: 28
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function uniquePaths(m, n) {
  // Your code here
  
}

// Test your solution
console.log(uniquePaths(3, 7)); // Expected: 28`,
      python: `def unique_paths(m, n):
    # Your code here
    pass

# Test your solution
print(unique_paths(3, 7))  # Expected: 28`,
      typescript: `function uniquePaths(m: number, n: number): number {
  // Your code here
  
}

// Test your solution
console.log(uniquePaths(3, 7)); // Expected: 28`,
    },
    testCases: [
      { id: "tc1", input: "m = 3, n = 7", expectedOutput: "28", isHidden: false, description: "3x7 grid" },
      { id: "tc2", input: "m = 3, n = 2", expectedOutput: "3", isHidden: false, description: "3x2 grid" },
    ],
    hints: ["dp[i][j] = paths to reach (i,j)", "dp[i][j] = dp[i-1][j] + dp[i][j-1]"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "jump-game",
    title: "Jump Game",
    description: `Given an array where nums[i] is max jump length, can you reach the last index?

**Example:**
\`\`\`
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from 0 to 1, then 3 steps to last.
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function canJump(nums) {
  // Your code here
  
}

// Test your solution
console.log(canJump([2,3,1,1,4])); // Expected: true`,
      python: `def can_jump(nums):
    # Your code here
    pass

# Test your solution
print(can_jump([2,3,1,1,4]))  # Expected: True`,
      typescript: `function canJump(nums: number[]): boolean {
  // Your code here
  
}

// Test your solution
console.log(canJump([2,3,1,1,4])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,3,1,1,4]", expectedOutput: "true", isHidden: false, description: "Reachable" },
      { id: "tc2", input: "nums = [3,2,1,0,4]", expectedOutput: "false", isHidden: false, description: "Stuck at 0" },
    ],
    hints: ["Greedy: track furthest reachable index", "If current index > furthest, return false"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    description: `Can you partition the array into two subsets with equal sum?

**Example:**
\`\`\`
Input: nums = [1,5,11,5]
Output: true
Explanation: [1,5,5] and [11]
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function canPartition(nums) {
  // Your code here
  
}

// Test your solution
console.log(canPartition([1,5,11,5])); // Expected: true`,
      python: `def can_partition(nums):
    # Your code here
    pass

# Test your solution
print(can_partition([1,5,11,5]))  # Expected: True`,
      typescript: `function canPartition(nums: number[]): boolean {
  // Your code here
  
}

// Test your solution
console.log(canPartition([1,5,11,5])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,5,11,5]", expectedOutput: "true", isHidden: false, description: "Partitionable" },
      { id: "tc2", input: "nums = [1,2,3,5]", expectedOutput: "false", isHidden: false, description: "Not partitionable" },
    ],
    hints: ["If total sum is odd, return false", "Find if subset with sum = total/2 exists (0/1 knapsack)"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "word-break-dp",
    title: "Word Break",
    description: `Given a string and dictionary, can the string be segmented into dictionary words?

**Example:**
\`\`\`
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {
  // Your code here
  
}

// Test your solution
console.log(wordBreak("leetcode", ["leet","code"])); // Expected: true`,
      python: `def word_break(s, word_dict):
    # Your code here
    pass

# Test your solution
print(word_break("leetcode", ["leet","code"]))  # Expected: True`,
      typescript: `function wordBreak(s: string, wordDict: string[]): boolean {
  // Your code here
  
}

// Test your solution
console.log(wordBreak("leetcode", ["leet","code"])); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "leetcode", wordDict = ["leet","code"]', expectedOutput: "true", isHidden: false, description: "Exact match" },
      { id: "tc2", input: 's = "applepenapple", wordDict = ["apple","pen"]', expectedOutput: "true", isHidden: false, description: "Reuse words" },
    ],
    hints: ["dp[i] = can s[0..i] be segmented?", "dp[i] = true if dp[j] && s[j..i] in dict for some j < i"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "edit-distance",
    title: "Edit Distance",
    description: `Find minimum operations (insert, delete, replace) to convert word1 to word2.

**Example:**
\`\`\`
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse -> rorse -> rose -> ros
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function minDistance(word1, word2) {
  // Your code here
  
}

// Test your solution
console.log(minDistance("horse", "ros")); // Expected: 3`,
      python: `def min_distance(word1, word2):
    # Your code here
    pass

# Test your solution
print(min_distance("horse", "ros"))  # Expected: 3`,
      typescript: `function minDistance(word1: string, word2: string): number {
  // Your code here
  
}

// Test your solution
console.log(minDistance("horse", "ros")); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: 'word1 = "horse", word2 = "ros"', expectedOutput: "3", isHidden: false, description: "Delete+replace" },
      { id: "tc2", input: 'word1 = "intention", word2 = "execution"', expectedOutput: "5", isHidden: true, description: "Complex" },
    ],
    hints: ["dp[i][j] = min ops to convert word1[0..i] to word2[0..j]", "If chars match, no op needed. Else min of insert, delete, replace."],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "distinct-subsequences",
    title: "Distinct Subsequences",
    description: `Count distinct subsequences of s that equal t.

**Example:**
\`\`\`
Input: s = "rabbbit", t = "rabbit"
Output: 3
\`\`\``,
    difficulty: "hard",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function numDistinct(s, t) {
  // Your code here
  
}

// Test your solution
console.log(numDistinct("rabbbit", "rabbit")); // Expected: 3`,
      python: `def num_distinct(s, t):
    # Your code here
    pass

# Test your solution
print(num_distinct("rabbbit", "rabbit"))  # Expected: 3`,
      typescript: `function numDistinct(s: string, t: string): number {
  // Your code here
  
}

// Test your solution
console.log(numDistinct("rabbbit", "rabbit")); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: 's = "rabbbit", t = "rabbit"', expectedOutput: "3", isHidden: false, description: "Multiple matches for 'b'" },
      { id: "tc2", input: 's = "babgbag", t = "bag"', expectedOutput: "5", isHidden: false, description: "Multiple subsequences" },
    ],
    hints: ["dp[i][j] = ways to form t[0..j] from s[0..i]", "If s[i] == t[j]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]"],
    expectedTimeMinutes: 30,
    points: 250,
  },
  {
    id: "interleaving-string",
    title: "Interleaving String",
    description: `Given s1, s2, s3, find if s3 is formed by interleaving s1 and s2.

**Example:**
\`\`\`
Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true
\`\`\``,
    difficulty: "medium",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function isInterleave(s1, s2, s3) {
  // Your code here
  
}

// Test your solution
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // Expected: true`,
      python: `def is_interleave(s1, s2, s3):
    # Your code here
    pass

# Test your solution
print(is_interleave("aabcc", "dbbca", "aadbbcbcac"))  # Expected: True`,
      typescript: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', expectedOutput: "true", isHidden: false, description: "Valid interleave" },
      { id: "tc2", input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', expectedOutput: "false", isHidden: false, description: "Invalid" },
    ],
    hints: ["dp[i][j] = can s1[0..i] and s2[0..j] form s3[0..i+j]?", "Check if char from s1 or s2 matches s3"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "burst-balloons",
    title: "Burst Balloons",
    description: `Burst all balloons to get maximum coins. When you burst balloon i, you get nums[i-1] * nums[i] * nums[i+1] coins.

**Example:**
\`\`\`
Input: nums = [3,1,5,8]
Output: 167
Explanation: 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167
\`\`\``,
    difficulty: "hard",
    category: "dynamic-programming",
    starterCode: {
      javascript: `function maxCoins(nums) {
  // Your code here
  
}

// Test your solution
console.log(maxCoins([3,1,5,8])); // Expected: 167`,
      python: `def max_coins(nums):
    # Your code here
    pass

# Test your solution
print(max_coins([3,1,5,8]))  # Expected: 167`,
      typescript: `function maxCoins(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(maxCoins([3,1,5,8])); // Expected: 167`,
    },
    testCases: [
      { id: "tc1", input: "nums = [3,1,5,8]", expectedOutput: "167", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1,5]", expectedOutput: "10", isHidden: false, description: "Two elements" },
    ],
    hints: ["Think of last balloon to burst instead of first", "dp[i][j] = max coins for balloons i..j"],
    expectedTimeMinutes: 35,
    points: 250,
  },
];

// Combine all challenges
export const ALL_CHALLENGES: CodingChallenge[] = [
  ...arraysChallenges,
  ...stringsChallenges,
  ...linkedListChallenges,
  ...stacksQueuesChallenges,
  ...treesChallenges,
  ...dpChallenges,
];

// Helper function to get challenges by category
export function getChallengesByCategory(categoryId: CategoryId): CodingChallenge[] {
  return ALL_CHALLENGES.filter(c => c.category === categoryId);
}

// Get challenge statistics
export function getCategoryStats(categoryId: CategoryId) {
  const challenges = getChallengesByCategory(categoryId);
  return {
    total: challenges.length,
    easy: challenges.filter(c => c.difficulty === "easy").length,
    medium: challenges.filter(c => c.difficulty === "medium").length,
    hard: challenges.filter(c => c.difficulty === "hard").length,
    totalPoints: challenges.reduce((sum, c) => sum + c.points, 0),
  };
}
