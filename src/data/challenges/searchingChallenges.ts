import { CodingChallenge } from "@/types/coding";

export const searchingChallenges: CodingChallenge[] = [
  {
    id: "binary-search",
    title: "Binary Search",
    description: `Given a sorted array \`nums\` and a \`target\`, return the index of \`target\` or -1 if not found.

**Example 1:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
\`\`\``,
    difficulty: "easy",
    category: "searching",
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4`,
      python: `def search(nums, target):
    # Your code here
    pass

# Test your solution
print(search([-1,0,3,5,9,12], 9))  # Expected: 4`,
      typescript: `function search(nums: number[], target: number): number {
  // Your code here
  
}

// Test your solution
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "nums = [-1,0,3,5,9,12], target = 9", expectedOutput: "4", isHidden: false, description: "Found" },
      { id: "tc2", input: "nums = [-1,0,3,5,9,12], target = 2", expectedOutput: "-1", isHidden: false, description: "Not found" },
      { id: "tc3", input: "nums = [5], target = 5", expectedOutput: "0", isHidden: true, description: "Single element" },
    ],
    hints: ["Use two pointers: left and right", "Calculate mid = (left + right) / 2"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "first-bad-version",
    title: "First Bad Version",
    description: `You have n versions [1, 2, ..., n]. Find the first bad version using isBadVersion(version) API.

**Example:**
\`\`\`
Input: n = 5, bad = 4
Output: 4
Explanation: isBadVersion(3) = false, isBadVersion(4) = true. So 4 is the first bad version.
\`\`\``,
    difficulty: "easy",
    category: "searching",
    starterCode: {
      javascript: `function solution(isBadVersion) {
  return function(n) {
    // Your code here
    
  };
}

// Test framework simulates isBadVersion
const bad = 4;
const isBadVersion = (v) => v >= bad;
console.log(solution(isBadVersion)(5)); // Expected: 4`,
      python: `def first_bad_version(n, bad):
    def is_bad_version(v):
        return v >= bad
    
    # Your code here
    pass

# Test your solution
print(first_bad_version(5, 4))  # Expected: 4`,
      typescript: `function solution(isBadVersion: (version: number) => boolean) {
  return function(n: number): number {
    // Your code here
    
  };
}

// Test
const bad = 4;
const isBadVersion = (v: number) => v >= bad;
console.log(solution(isBadVersion)(5)); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "n = 5, bad = 4", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 1, bad = 1", expectedOutput: "1", isHidden: false, description: "Single" },
    ],
    hints: ["Binary search to minimize API calls", "Find leftmost bad version"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "search-insert-position",
    title: "Search Insert Position",
    description: `Given a sorted array and target, return the index if found. If not, return where it would be inserted.

**Example 1:**
\`\`\`
Input: nums = [1,3,5,6], target = 5
Output: 2
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,3,5,6], target = 2
Output: 1
\`\`\``,
    difficulty: "easy",
    category: "searching",
    starterCode: {
      javascript: `function searchInsert(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(searchInsert([1,3,5,6], 5)); // Expected: 2`,
      python: `def search_insert(nums, target):
    # Your code here
    pass

# Test your solution
print(search_insert([1,3,5,6], 5))  # Expected: 2`,
      typescript: `function searchInsert(nums: number[], target: number): number {
  // Your code here
  
}

// Test your solution
console.log(searchInsert([1,3,5,6], 5)); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,3,5,6], target = 5", expectedOutput: "2", isHidden: false, description: "Found" },
      { id: "tc2", input: "nums = [1,3,5,6], target = 2", expectedOutput: "1", isHidden: false, description: "Insert middle" },
      { id: "tc3", input: "nums = [1,3,5,6], target = 7", expectedOutput: "4", isHidden: true, description: "Insert end" },
    ],
    hints: ["Modified binary search", "When not found, return left pointer"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "find-peak-element",
    title: "Find Peak Element",
    description: `A peak element is greater than its neighbors. Find a peak element's index.

**Example 1:**
\`\`\`
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element at index 2.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1,2,1,3,5,6,4]
Output: 5 (or 1)
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function findPeakElement(nums) {
  // Your code here
  
}

// Test your solution
console.log(findPeakElement([1,2,3,1])); // Expected: 2`,
      python: `def find_peak_element(nums):
    # Your code here
    pass

# Test your solution
print(find_peak_element([1,2,3,1]))  # Expected: 2`,
      typescript: `function findPeakElement(nums: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(findPeakElement([1,2,3,1])); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,2,3,1]", expectedOutput: "2", isHidden: false, description: "Single peak" },
      { id: "tc2", input: "nums = [1,2,1,3,5,6,4]", expectedOutput: "5", isHidden: false, description: "Multiple peaks" },
    ],
    hints: ["Binary search works because we just need ANY peak", "Move toward the larger neighbor"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "search-2d-matrix",
    title: "Search a 2D Matrix",
    description: `Search for a value in an m x n matrix where each row is sorted and first integer of each row is greater than the last integer of the previous row.

**Example:**
\`\`\`
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function searchMatrix(matrix, target) {
  // Your code here
  
}

// Test your solution
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // Expected: true`,
      python: `def search_matrix(matrix, target):
    # Your code here
    pass

# Test your solution
print(search_matrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3))  # Expected: True`,
      typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
  // Your code here
  
}

// Test your solution
console.log(searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", expectedOutput: "true", isHidden: false, description: "Found" },
      { id: "tc2", input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", expectedOutput: "false", isHidden: false, description: "Not found" },
    ],
    hints: ["Treat matrix as a 1D sorted array", "Convert index: row = idx / cols, col = idx % cols"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "find-first-last",
    title: "Find First and Last Position",
    description: `Find the starting and ending position of a target value in sorted array.

**Example 1:**
\`\`\`
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function searchRange(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(searchRange([5,7,7,8,8,10], 8)); // Expected: [3,4]`,
      python: `def search_range(nums, target):
    # Your code here
    pass

# Test your solution
print(search_range([5,7,7,8,8,10], 8))  # Expected: [3,4]`,
      typescript: `function searchRange(nums: number[], target: number): number[] {
  // Your code here
  
}

// Test your solution
console.log(searchRange([5,7,7,8,8,10], 8)); // Expected: [3,4]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [5,7,7,8,8,10], target = 8", expectedOutput: "[3,4]", isHidden: false, description: "Found" },
      { id: "tc2", input: "nums = [5,7,7,8,8,10], target = 6", expectedOutput: "[-1,-1]", isHidden: false, description: "Not found" },
    ],
    hints: ["Two binary searches: leftmost and rightmost", "Use a flag to search for left or right boundary"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "kth-smallest-sorted-matrix",
    title: "Kth Smallest Element in Sorted Matrix",
    description: `Given an n x n matrix where rows and columns are sorted in ascending order, find the kth smallest element.

**Example:**
\`\`\`
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function kthSmallest(matrix, k) {
  // Your code here
  
}

// Test your solution
console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8)); // Expected: 13`,
      python: `def kth_smallest(matrix, k):
    # Your code here
    pass

# Test your solution
print(kth_smallest([[1,5,9],[10,11,13],[12,13,15]], 8))  # Expected: 13`,
      typescript: `function kthSmallest(matrix: number[][], k: number): number {
  // Your code here
  
}

// Test your solution
console.log(kthSmallest([[1,5,9],[10,11,13],[12,13,15]], 8)); // Expected: 13`,
    },
    testCases: [
      { id: "tc1", input: "matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8", expectedOutput: "13", isHidden: false, description: "Basic" },
      { id: "tc2", input: "matrix = [[-5]], k = 1", expectedOutput: "-5", isHidden: false, description: "Single" },
    ],
    hints: ["Binary search on value range, not indices", "Count elements <= mid to narrow down"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "median-two-sorted",
    title: "Median of Two Sorted Arrays",
    description: `Find the median of two sorted arrays in O(log(m+n)) time.

**Example 1:**
\`\`\`
Input: nums1 = [1,3], nums2 = [2]
Output: 2.0
\`\`\`

**Example 2:**
\`\`\`
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.5
\`\`\``,
    difficulty: "hard",
    category: "searching",
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Your code here
  
}

// Test your solution
console.log(findMedianSortedArrays([1,3], [2])); // Expected: 2.0`,
      python: `def find_median_sorted_arrays(nums1, nums2):
    # Your code here
    pass

# Test your solution
print(find_median_sorted_arrays([1,3], [2]))  # Expected: 2.0`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(findMedianSortedArrays([1,3], [2])); // Expected: 2.0`,
    },
    testCases: [
      { id: "tc1", input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0", isHidden: false, description: "Odd total" },
      { id: "tc2", input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5", isHidden: false, description: "Even total" },
    ],
    hints: ["Binary search on the smaller array", "Partition both arrays at the median point"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "search-rotated-ii",
    title: "Search in Rotated Sorted Array II",
    description: `Given a rotated sorted array with duplicates and a target, return true if target exists.

**Example:**
\`\`\`
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function search(nums, target) {
  // Your code here
  
}

// Test your solution
console.log(search([2,5,6,0,0,1,2], 0)); // Expected: true`,
      python: `def search(nums, target):
    # Your code here
    pass

# Test your solution
print(search([2,5,6,0,0,1,2], 0))  # Expected: True`,
      typescript: `function search(nums: number[], target: number): boolean {
  // Your code here
  
}

// Test your solution
console.log(search([2,5,6,0,0,1,2], 0)); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,5,6,0,0,1,2], target = 0", expectedOutput: "true", isHidden: false, description: "Found" },
      { id: "tc2", input: "nums = [2,5,6,0,0,1,2], target = 3", expectedOutput: "false", isHidden: false, description: "Not found" },
    ],
    hints: ["Handle duplicates by shrinking when nums[left] == nums[mid] == nums[right]", "Otherwise same as Search in Rotated Sorted Array"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "split-array-largest-sum",
    title: "Split Array Largest Sum",
    description: `Split array into k subarrays to minimize the largest sum among them.

**Example:**
\`\`\`
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: Split as [7,2,5] and [10,8] with largest sum 18.
\`\`\``,
    difficulty: "hard",
    category: "searching",
    starterCode: {
      javascript: `function splitArray(nums, k) {
  // Your code here
  
}

// Test your solution
console.log(splitArray([7,2,5,10,8], 2)); // Expected: 18`,
      python: `def split_array(nums, k):
    # Your code here
    pass

# Test your solution
print(split_array([7,2,5,10,8], 2))  # Expected: 18`,
      typescript: `function splitArray(nums: number[], k: number): number {
  // Your code here
  
}

// Test your solution
console.log(splitArray([7,2,5,10,8], 2)); // Expected: 18`,
    },
    testCases: [
      { id: "tc1", input: "nums = [7,2,5,10,8], k = 2", expectedOutput: "18", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1,2,3,4,5], k = 2", expectedOutput: "9", isHidden: false, description: "Another" },
    ],
    hints: ["Binary search on the answer (max subarray sum)", "For a given max sum, check if k subarrays are possible"],
    expectedTimeMinutes: 35,
    points: 250,
  },
  {
    id: "koko-bananas",
    title: "Koko Eating Bananas",
    description: `Koko loves bananas. She has piles of bananas and h hours to eat them all. Find the minimum eating speed k.

**Example:**
\`\`\`
Input: piles = [3,6,7,11], h = 8
Output: 4
\`\`\``,
    difficulty: "medium",
    category: "searching",
    starterCode: {
      javascript: `function minEatingSpeed(piles, h) {
  // Your code here
  
}

// Test your solution
console.log(minEatingSpeed([3,6,7,11], 8)); // Expected: 4`,
      python: `def min_eating_speed(piles, h):
    # Your code here
    pass

# Test your solution
print(min_eating_speed([3,6,7,11], 8))  # Expected: 4`,
      typescript: `function minEatingSpeed(piles: number[], h: number): number {
  // Your code here
  
}

// Test your solution
console.log(minEatingSpeed([3,6,7,11], 8)); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "piles = [3,6,7,11], h = 8", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "piles = [30,11,23,4,20], h = 5", expectedOutput: "30", isHidden: false, description: "Tight" },
    ],
    hints: ["Binary search on eating speed from 1 to max(piles)", "Calculate hours needed for a given speed"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "find-duplicate-number",
    title: "Find the Duplicate Number",
    description: `Given an array of n+1 integers where each integer is in [1, n], find the duplicate.

**Example:**
\`\`\`
Input: nums = [1,3,4,2,2]
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "searching",
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
      { id: "tc2", input: "nums = [3,1,3,4,2]", expectedOutput: "3", isHidden: false, description: "Different pos" },
    ],
    hints: ["Floyd's cycle detection (tortoise and hare)", "Or binary search: count elements <= mid"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];
