import { CodingChallenge } from "@/types/coding";

export const hashTablesChallenges: CodingChallenge[] = [
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    description: `Given two strings s and t, return true if t is an anagram of s.

**Example 1:**
\`\`\`
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "rat", t = "car"
Output: false
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
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
    id: "group-anagrams",
    title: "Group Anagrams",
    description: `Given an array of strings, group anagrams together.

**Example:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\``,
    difficulty: "medium",
    category: "hash-tables",
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
      { id: "tc2", input: 'strs = [""]', expectedOutput: '[[""]]', isHidden: false, description: "Empty" },
    ],
    hints: ["Use sorted string as key", "Or use character count as key"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "two-sum-hash",
    title: "Two Sum (Hash Table)",
    description: `Given an array and target, return indices of two numbers that add up to target.

**Example:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
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
      { id: "tc1", input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]", isHidden: false, description: "Middle" },
    ],
    hints: ["Store complement in hash map", "Check if complement exists before adding"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "longest-consecutive",
    title: "Longest Consecutive Sequence",
    description: `Find the length of the longest consecutive elements sequence. O(n) time.

**Example:**
\`\`\`
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: [1,2,3,4] is the longest consecutive sequence.
\`\`\``,
    difficulty: "medium",
    category: "hash-tables",
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
      { id: "tc2", input: "nums = [0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9", isHidden: false, description: "Longer" },
    ],
    hints: ["Put all in a Set", "Only start counting from sequence beginning (num-1 not in set)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "subarray-sum-k",
    title: "Subarray Sum Equals K",
    description: `Find the total number of subarrays whose sum equals k.

**Example:**
\`\`\`
Input: nums = [1,1,1], k = 2
Output: 2
\`\`\``,
    difficulty: "medium",
    category: "hash-tables",
    starterCode: {
      javascript: `function subarraySum(nums, k) {
  // Your code here
  
}

// Test your solution
console.log(subarraySum([1,1,1], 2)); // Expected: 2`,
      python: `def subarray_sum(nums, k):
    # Your code here
    pass

# Test your solution
print(subarray_sum([1,1,1], 2))  # Expected: 2`,
      typescript: `function subarraySum(nums: number[], k: number): number {
  // Your code here
  
}

// Test your solution
console.log(subarraySum([1,1,1], 2)); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "nums = [1,1,1], k = 2", expectedOutput: "2", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums = [1,2,3], k = 3", expectedOutput: "2", isHidden: false, description: "Multiple ways" },
    ],
    hints: ["Use prefix sum", "Store count of each prefix sum in hash map"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    description: `Design a Least Recently Used (LRU) cache with get and put operations.

**Example:**
\`\`\`
LRUCache cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
\`\`\``,
    difficulty: "medium",
    category: "hash-tables",
    starterCode: {
      javascript: `class LRUCache {
  constructor(capacity) {
    // Your code here
  }
  
  get(key) {
    // Your code here
  }
  
  put(key, value) {
    // Your code here
  }
}

// Test your solution
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1`,
      python: `class LRUCache:
    def __init__(self, capacity):
        # Your code here
        pass
    
    def get(self, key):
        # Your code here
        pass
    
    def put(self, key, value):
        # Your code here
        pass

# Test your solution
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))  # 1
cache.put(3, 3)
print(cache.get(2))  # -1`,
      typescript: `class LRUCache {
  constructor(capacity: number) {
    // Your code here
  }
  
  get(key: number): number {
    // Your code here
    return -1;
  }
  
  put(key: number, value: number): void {
    // Your code here
  }
}

// Test your solution
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1`,
    },
    testCases: [
      { id: "tc1", input: "Operations as shown", expectedOutput: "get(1)=1, get(2)=-1", isHidden: false, description: "Basic" },
    ],
    hints: ["Use Map for O(1) operations (maintains insertion order)", "Or combine HashMap with doubly linked list"],
    expectedTimeMinutes: 30,
    points: 200,
  },
  {
    id: "first-unique-char",
    title: "First Unique Character",
    description: `Find the first non-repeating character in a string.

**Example:**
\`\`\`
Input: s = "leetcode"
Output: 0 (first unique is 'l')
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
    starterCode: {
      javascript: `function firstUniqChar(s) {
  // Your code here
  
}

// Test your solution
console.log(firstUniqChar("leetcode")); // Expected: 0`,
      python: `def first_uniq_char(s):
    # Your code here
    pass

# Test your solution
print(first_uniq_char("leetcode"))  # Expected: 0`,
      typescript: `function firstUniqChar(s: string): number {
  // Your code here
  
}

// Test your solution
console.log(firstUniqChar("leetcode")); // Expected: 0`,
    },
    testCases: [
      { id: "tc1", input: 's = "leetcode"', expectedOutput: "0", isHidden: false, description: "First char unique" },
      { id: "tc2", input: 's = "loveleetcode"', expectedOutput: "2", isHidden: false, description: "Middle unique" },
    ],
    hints: ["Count character frequencies first", "Then find first with count 1"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "word-pattern",
    title: "Word Pattern",
    description: `Check if pattern matches string. Each letter maps to a word.

**Example 1:**
\`\`\`
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
    starterCode: {
      javascript: `function wordPattern(pattern, s) {
  // Your code here
  
}

// Test your solution
console.log(wordPattern("abba", "dog cat cat dog")); // Expected: true`,
      python: `def word_pattern(pattern, s):
    # Your code here
    pass

# Test your solution
print(word_pattern("abba", "dog cat cat dog"))  # Expected: True`,
      typescript: `function wordPattern(pattern: string, s: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(wordPattern("abba", "dog cat cat dog")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 'pattern = "abba", s = "dog cat cat dog"', expectedOutput: "true", isHidden: false, description: "Match" },
      { id: "tc2", input: 'pattern = "abba", s = "dog cat cat fish"', expectedOutput: "false", isHidden: false, description: "No match" },
    ],
    hints: ["Two-way mapping: pattern → word and word → pattern", "Both must be consistent"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "isomorphic-strings",
    title: "Isomorphic Strings",
    description: `Check if two strings are isomorphic (characters can be replaced to get the other).

**Example 1:**
\`\`\`
Input: s = "egg", t = "add"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "foo", t = "bar"
Output: false
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
    starterCode: {
      javascript: `function isIsomorphic(s, t) {
  // Your code here
  
}

// Test your solution
console.log(isIsomorphic("egg", "add")); // Expected: true`,
      python: `def is_isomorphic(s, t):
    # Your code here
    pass

# Test your solution
print(is_isomorphic("egg", "add"))  # Expected: True`,
      typescript: `function isIsomorphic(s: string, t: string): boolean {
  // Your code here
  
}

// Test your solution
console.log(isIsomorphic("egg", "add")); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: 's = "egg", t = "add"', expectedOutput: "true", isHidden: false, description: "Isomorphic" },
      { id: "tc2", input: 's = "foo", t = "bar"', expectedOutput: "false", isHidden: false, description: "Not isomorphic" },
    ],
    hints: ["Map each character to corresponding character", "Check for one-to-one mapping"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "intersection-arrays",
    title: "Intersection of Two Arrays",
    description: `Find the intersection of two integer arrays. Each element appears only once.

**Example:**
\`\`\`
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
    starterCode: {
      javascript: `function intersection(nums1, nums2) {
  // Your code here
  
}

// Test your solution
console.log(intersection([1,2,2,1], [2,2])); // Expected: [2]`,
      python: `def intersection(nums1, nums2):
    # Your code here
    pass

# Test your solution
print(intersection([1,2,2,1], [2,2]))  # Expected: [2]`,
      typescript: `function intersection(nums1: number[], nums2: number[]): number[] {
  // Your code here
  
}

// Test your solution
console.log(intersection([1,2,2,1], [2,2])); // Expected: [2]`,
    },
    testCases: [
      { id: "tc1", input: "nums1 = [1,2,2,1], nums2 = [2,2]", expectedOutput: "[2]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", expectedOutput: "[9,4]", isHidden: false, description: "Multiple" },
    ],
    hints: ["Convert to Sets", "Find common elements"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "copy-random-list",
    title: "Copy List with Random Pointer",
    description: `Deep copy a linked list where each node has a random pointer.

**Example:**
\`\`\`
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
\`\`\``,
    difficulty: "medium",
    category: "hash-tables",
    starterCode: {
      javascript: `function Node(val, next, random) {
  this.val = val;
  this.next = next;
  this.random = random;
}

function copyRandomList(head) {
  // Your code here
  
}

// Test
console.log("Implement copyRandomList");`,
      python: `class Node:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random

def copy_random_list(head):
    # Your code here
    pass

# Test
print("Implement copy_random_list")`,
      typescript: `class Node {
  val: number;
  next: Node | null;
  random: Node | null;
  constructor(val?: number, next?: Node | null, random?: Node | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

function copyRandomList(head: Node | null): Node | null {
  // Your code here
  return null;
}

console.log("Implement copyRandomList");`,
    },
    testCases: [
      { id: "tc1", input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", expectedOutput: "Deep copy of list", isHidden: false, description: "Basic" },
    ],
    hints: ["Use hash map: old node → new node", "Two passes: create nodes, then set pointers"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "happy-number",
    title: "Happy Number",
    description: `A number is happy if the sum of squares of digits eventually equals 1.

**Example:**
\`\`\`
Input: n = 19
Output: true
19 → 82 → 68 → 100 → 1
\`\`\``,
    difficulty: "easy",
    category: "hash-tables",
    starterCode: {
      javascript: `function isHappy(n) {
  // Your code here
  
}

// Test your solution
console.log(isHappy(19)); // Expected: true`,
      python: `def is_happy(n):
    # Your code here
    pass

# Test your solution
print(is_happy(19))  # Expected: True`,
      typescript: `function isHappy(n: number): boolean {
  // Your code here
  
}

// Test your solution
console.log(isHappy(19)); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "n = 19", expectedOutput: "true", isHidden: false, description: "Happy" },
      { id: "tc2", input: "n = 2", expectedOutput: "false", isHidden: false, description: "Not happy" },
    ],
    hints: ["Use Set to detect cycles", "Or use Floyd's cycle detection"],
    expectedTimeMinutes: 15,
    points: 100,
  },
];
