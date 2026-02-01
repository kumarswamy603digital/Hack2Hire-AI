export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  starterCode: {
    javascript: string;
    python: string;
    typescript: string;
  };
  testCases: TestCase[];
  hints: string[];
  expectedTimeMinutes: number;
  points: number;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description: string;
}

export interface CodeSubmission {
  code: string;
  language: "javascript" | "python" | "typescript";
  challengeId: string;
  timeSpentSeconds: number;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  executionTimeMs: number;
  error?: string;
}

export interface CodingEvaluation {
  score: number;
  testResults: TestResult[];
  passedCount: number;
  totalCount: number;
  codeQuality: {
    readability: number;
    efficiency: number;
    correctness: number;
  };
  feedback: string;
  suggestions: string[];
}

export type SupportedLanguage = "javascript" | "python" | "typescript";

export const SAMPLE_CHALLENGES: CodingChallenge[] = [
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
    category: "Arrays",
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Your code here
  
}`,
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  
}`,
    },
    testCases: [
      {
        id: "tc1",
        input: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
        isHidden: false,
        description: "Basic case with first two elements",
      },
      {
        id: "tc2",
        input: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
        isHidden: false,
        description: "Elements in middle of array",
      },
      {
        id: "tc3",
        input: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]",
        isHidden: true,
        description: "Duplicate elements",
      },
    ],
    hints: [
      "Think about using a hash map to store values you've seen",
      "For each number, check if (target - current) exists in the map",
    ],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array in-place.

**Example 1:**
\`\`\`
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
\`\`\`

**Example 2:**
\`\`\`
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
\`\`\``,
    difficulty: "easy",
    category: "Strings",
    starterCode: {
      javascript: `function reverseString(s) {
  // Your code here - modify s in-place
  
}`,
      python: `def reverse_string(s):
    # Your code here - modify s in-place
    pass`,
      typescript: `function reverseString(s: string[]): void {
  // Your code here - modify s in-place
  
}`,
    },
    testCases: [
      {
        id: "tc1",
        input: 's = ["h","e","l","l","o"]',
        expectedOutput: '["o","l","l","e","h"]',
        isHidden: false,
        description: "Basic string reversal",
      },
      {
        id: "tc2",
        input: 's = ["H","a","n","n","a","h"]',
        expectedOutput: '["h","a","n","n","a","H"]',
        isHidden: false,
        description: "Palindrome-like string",
      },
    ],
    hints: [
      "Use two pointers - one at the start and one at the end",
      "Swap characters and move pointers towards the center",
    ],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\``,
    difficulty: "medium",
    category: "Stack",
    starterCode: {
      javascript: `function isValid(s) {
  // Your code here
  
}`,
      python: `def is_valid(s):
    # Your code here
    pass`,
      typescript: `function isValid(s: string): boolean {
  // Your code here
  
}`,
    },
    testCases: [
      {
        id: "tc1",
        input: 's = "()"',
        expectedOutput: "true",
        isHidden: false,
        description: "Simple valid parentheses",
      },
      {
        id: "tc2",
        input: 's = "()[]{}"',
        expectedOutput: "true",
        isHidden: false,
        description: "Multiple bracket types",
      },
      {
        id: "tc3",
        input: 's = "(]"',
        expectedOutput: "false",
        isHidden: false,
        description: "Mismatched brackets",
      },
      {
        id: "tc4",
        input: 's = "([)]"',
        expectedOutput: "false",
        isHidden: true,
        description: "Incorrectly nested",
      },
    ],
    hints: [
      "Use a stack data structure",
      "Push opening brackets onto the stack",
      "For closing brackets, check if the top of stack matches",
    ],
    expectedTimeMinutes: 20,
    points: 150,
  },
];
