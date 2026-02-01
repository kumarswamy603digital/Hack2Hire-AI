import { CodingChallenge } from "@/types/coding";

export const sortingChallenges: CodingChallenge[] = [
  {
    id: "merge-sorted-array",
    title: "Merge Sorted Array",
    description: `Merge nums2 into nums1 as one sorted array. nums1 has enough space.

**Example:**
\`\`\`
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
\`\`\``,
    difficulty: "easy",
    category: "sorting",
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Modify nums1 in-place
  
}

// Test your solution
const nums1 = [1,2,3,0,0,0];
merge(nums1, 3, [2,5,6], 3);
console.log(nums1); // Expected: [1,2,2,3,5,6]`,
      python: `def merge(nums1, m, nums2, n):
    # Modify nums1 in-place
    pass

# Test your solution
nums1 = [1,2,3,0,0,0]
merge(nums1, 3, [2,5,6], 3)
print(nums1)  # Expected: [1,2,2,3,5,6]`,
      typescript: `function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  // Modify nums1 in-place
  
}

// Test your solution
const nums1 = [1,2,3,0,0,0];
merge(nums1, 3, [2,5,6], 3);
console.log(nums1); // Expected: [1,2,2,3,5,6]`,
    },
    testCases: [
      { id: "tc1", input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3", expectedOutput: "[1,2,2,3,5,6]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums1 = [1], m = 1, nums2 = [], n = 0", expectedOutput: "[1]", isHidden: false, description: "Empty nums2" },
    ],
    hints: ["Start from the end to avoid overwriting", "Use three pointers"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "sort-colors",
    title: "Sort Colors (Dutch National Flag)",
    description: `Sort an array with values 0, 1, 2 (red, white, blue) in-place.

**Example:**
\`\`\`
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function sortColors(nums) {
  // Sort in-place
  
}

// Test your solution
const nums = [2,0,2,1,1,0];
sortColors(nums);
console.log(nums); // Expected: [0,0,1,1,2,2]`,
      python: `def sort_colors(nums):
    # Sort in-place
    pass

# Test your solution
nums = [2,0,2,1,1,0]
sort_colors(nums)
print(nums)  # Expected: [0,0,1,1,2,2]`,
      typescript: `function sortColors(nums: number[]): void {
  // Sort in-place
  
}

// Test your solution
const nums = [2,0,2,1,1,0];
sortColors(nums);
console.log(nums); // Expected: [0,0,1,1,2,2]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [2,0,2,1,1,0]", expectedOutput: "[0,0,1,1,2,2]", isHidden: false, description: "Mixed" },
      { id: "tc2", input: "nums = [2,0,1]", expectedOutput: "[0,1,2]", isHidden: false, description: "One each" },
    ],
    hints: ["Three-way partitioning with low, mid, high pointers", "0s go left, 2s go right"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "merge-sort",
    title: "Implement Merge Sort",
    description: `Implement the merge sort algorithm.

**Example:**
\`\`\`
Input: nums = [5,2,3,1]
Output: [1,2,3,5]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function mergeSort(nums) {
  // Your code here
  
}

// Test your solution
console.log(mergeSort([5,2,3,1])); // Expected: [1,2,3,5]`,
      python: `def merge_sort(nums):
    # Your code here
    pass

# Test your solution
print(merge_sort([5,2,3,1]))  # Expected: [1,2,3,5]`,
      typescript: `function mergeSort(nums: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(mergeSort([5,2,3,1])); // Expected: [1,2,3,5]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [5,2,3,1]", expectedOutput: "[1,2,3,5]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [5,1,1,2,0,0]", expectedOutput: "[0,0,1,1,2,5]", isHidden: false, description: "Duplicates" },
    ],
    hints: ["Divide array in half recursively", "Merge two sorted halves"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "quick-sort",
    title: "Implement Quick Sort",
    description: `Implement the quick sort algorithm.

**Example:**
\`\`\`
Input: nums = [3,6,8,10,1,2,1]
Output: [1,1,2,3,6,8,10]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function quickSort(nums) {
  // Your code here
  
}

// Test your solution
console.log(quickSort([3,6,8,10,1,2,1])); // Expected: [1,1,2,3,6,8,10]`,
      python: `def quick_sort(nums):
    # Your code here
    pass

# Test your solution
print(quick_sort([3,6,8,10,1,2,1]))  # Expected: [1,1,2,3,6,8,10]`,
      typescript: `function quickSort(nums: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(quickSort([3,6,8,10,1,2,1])); // Expected: [1,1,2,3,6,8,10]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [3,6,8,10,1,2,1]", expectedOutput: "[1,1,2,3,6,8,10]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1]", expectedOutput: "[1]", isHidden: false, description: "Single" },
    ],
    hints: ["Choose a pivot and partition around it", "Recursively sort left and right partitions"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "kth-largest",
    title: "Kth Largest Element in Array",
    description: `Find the kth largest element in an unsorted array.

**Example 1:**
\`\`\`
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function findKthLargest(nums, k) {
  // Your code here
  
}

// Test your solution
console.log(findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5`,
      python: `def find_kth_largest(nums, k):
    # Your code here
    pass

# Test your solution
print(find_kth_largest([3,2,1,5,6,4], 2))  # Expected: 5`,
      typescript: `function findKthLargest(nums: number[], k: number): number {
  // Your code here
  
}

// Test your solution
console.log(findKthLargest([3,2,1,5,6,4], 2)); // Expected: 5`,
    },
    testCases: [
      { id: "tc1", input: "nums = [3,2,1,5,6,4], k = 2", expectedOutput: "5", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", expectedOutput: "4", isHidden: false, description: "Duplicates" },
    ],
    hints: ["QuickSelect algorithm: O(n) average", "Or use a min-heap of size k"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    description: `Given an integer array, return the k most frequent elements.

**Example:**
\`\`\`
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  // Your code here
  
}

// Test your solution
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Expected: [1,2]`,
      python: `def top_k_frequent(nums, k):
    # Your code here
    pass

# Test your solution
print(top_k_frequent([1,1,1,2,2,3], 2))  # Expected: [1,2]`,
      typescript: `function topKFrequent(nums: number[], k: number): number[] {
  // Your code here
  
}

// Test your solution
console.log(topKFrequent([1,1,1,2,2,3], 2)); // Expected: [1,2]`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,1,1,2,2,3], k = 2", expectedOutput: "[1,2]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1], k = 1", expectedOutput: "[1]", isHidden: false, description: "Single" },
    ],
    hints: ["Count frequencies with a Map", "Bucket sort by frequency"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "sort-list",
    title: "Sort Linked List",
    description: `Sort a linked list in O(n log n) time and O(1) space.

**Example:**
\`\`\`
Input: head = [4,2,1,3]
Output: [1,2,3,4]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function sortList(head) {
  // Your code here
  
}

// Helper to create list
function createList(arr) {
  let dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

function printList(head) {
  const result = [];
  while (head) { result.push(head.val); head = head.next; }
  return result;
}

console.log(printList(sortList(createList([4,2,1,3])))); // Expected: [1,2,3,4]`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def sort_list(head):
    # Your code here
    pass

# Helper
def create_list(arr):
    dummy = ListNode(0)
    curr = dummy
    for v in arr:
        curr.next = ListNode(v)
        curr = curr.next
    return dummy.next

def print_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

print(print_list(sort_list(create_list([4,2,1,3]))))  # Expected: [1,2,3,4]`,
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function sortList(head: ListNode | null): ListNode | null {
  // Your code here
  
}

// Test code
console.log("Implement and test sortList");`,
    },
    testCases: [
      { id: "tc1", input: "head = [4,2,1,3]", expectedOutput: "[1,2,3,4]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "head = [-1,5,3,4,0]", expectedOutput: "[-1,0,3,4,5]", isHidden: false, description: "Negatives" },
    ],
    hints: ["Use merge sort for linked lists", "Find middle with slow/fast pointers"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "insertion-sort-list",
    title: "Insertion Sort List",
    description: `Sort a linked list using insertion sort.

**Example:**
\`\`\`
Input: head = [4,2,1,3]
Output: [1,2,3,4]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function insertionSortList(head) {
  // Your code here
  
}

// Test
console.log("Implement insertionSortList");`,
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def insertion_sort_list(head):
    # Your code here
    pass

# Test
print("Implement insertion_sort_list")`,
      typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function insertionSortList(head: ListNode | null): ListNode | null {
  // Your code here
  
}

console.log("Implement insertionSortList");`,
    },
    testCases: [
      { id: "tc1", input: "head = [4,2,1,3]", expectedOutput: "[1,2,3,4]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "head = [-1,5,3,4,0]", expectedOutput: "[-1,0,3,4,5]", isHidden: false, description: "Negatives" },
    ],
    hints: ["Use a dummy head for the sorted portion", "Find correct position for each node"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "wiggle-sort-ii",
    title: "Wiggle Sort II",
    description: `Reorder array such that nums[0] < nums[1] > nums[2] < nums[3]...

**Example:**
\`\`\`
Input: nums = [1,5,1,1,6,4]
Output: [1,6,1,5,1,4]
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function wiggleSort(nums) {
  // Modify in-place
  
}

// Test your solution
const nums = [1,5,1,1,6,4];
wiggleSort(nums);
console.log(nums); // One valid output: [1,6,1,5,1,4]`,
      python: `def wiggle_sort(nums):
    # Modify in-place
    pass

# Test
nums = [1,5,1,1,6,4]
wiggle_sort(nums)
print(nums)  # One valid output: [1,6,1,5,1,4]`,
      typescript: `function wiggleSort(nums: number[]): void {
  // Modify in-place
  
}

// Test
const nums = [1,5,1,1,6,4];
wiggleSort(nums);
console.log(nums);`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,5,1,1,6,4]", expectedOutput: "Valid wiggle pattern", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1,3,2,2,3,1]", expectedOutput: "Valid wiggle pattern", isHidden: false, description: "Another" },
    ],
    hints: ["Sort and interleave from middle", "Place larger elements at odd indices"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "largest-number",
    title: "Largest Number",
    description: `Arrange numbers to form the largest number.

**Example 1:**
\`\`\`
Input: nums = [10,2]
Output: "210"
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,30,34,5,9]
Output: "9534330"
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function largestNumber(nums) {
  // Your code here
  
}

// Test your solution
console.log(largestNumber([3,30,34,5,9])); // Expected: "9534330"`,
      python: `def largest_number(nums):
    # Your code here
    pass

# Test your solution
print(largest_number([3,30,34,5,9]))  # Expected: "9534330"`,
      typescript: `function largestNumber(nums: number[]): string {
  // Your code here
  
}

// Test your solution
console.log(largestNumber([3,30,34,5,9])); // Expected: "9534330"`,
    },
    testCases: [
      { id: "tc1", input: "nums = [10,2]", expectedOutput: '"210"', isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [3,30,34,5,9]", expectedOutput: '"9534330"', isHidden: false, description: "Multiple" },
    ],
    hints: ["Custom comparator: compare a+b vs b+a as strings", "Handle all zeros edge case"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "h-index",
    title: "H-Index",
    description: `Given citations array, compute the researcher's h-index.

**Example:**
\`\`\`
Input: citations = [3,0,6,1,5]
Output: 3
Explanation: 3 papers have at least 3 citations each.
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function hIndex(citations) {
  // Your code here
  
}

// Test your solution
console.log(hIndex([3,0,6,1,5])); // Expected: 3`,
      python: `def h_index(citations):
    # Your code here
    pass

# Test your solution
print(h_index([3,0,6,1,5]))  # Expected: 3`,
      typescript: `function hIndex(citations: number[]): number {
  // Your code here
  
}

// Test your solution
console.log(hIndex([3,0,6,1,5])); // Expected: 3`,
    },
    testCases: [
      { id: "tc1", input: "citations = [3,0,6,1,5]", expectedOutput: "3", isHidden: false, description: "Basic" },
      { id: "tc2", input: "citations = [1,3,1]", expectedOutput: "1", isHidden: false, description: "Another" },
    ],
    hints: ["Sort descending and find where citations[i] >= i+1", "Or use counting sort for O(n)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    description: `Given meeting intervals, find the minimum number of conference rooms required.

**Example:**
\`\`\`
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "sorting",
    starterCode: {
      javascript: `function minMeetingRooms(intervals) {
  // Your code here
  
}

// Test your solution
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // Expected: 2`,
      python: `def min_meeting_rooms(intervals):
    # Your code here
    pass

# Test your solution
print(min_meeting_rooms([[0,30],[5,10],[15,20]]))  # Expected: 2`,
      typescript: `function minMeetingRooms(intervals: number[][]): number {
  // Your code here
  
}

// Test your solution
console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "intervals = [[0,30],[5,10],[15,20]]", expectedOutput: "2", isHidden: false, description: "Overlapping" },
      { id: "tc2", input: "intervals = [[7,10],[2,4]]", expectedOutput: "1", isHidden: false, description: "No overlap" },
    ],
    hints: ["Sort start and end times separately", "Track active meetings with two pointers"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];
