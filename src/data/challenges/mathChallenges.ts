import { CodingChallenge } from "@/types/coding";

export const mathChallenges: CodingChallenge[] = [
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    description: `Check if an integer is a palindrome without converting to string.

**Example 1:**
\`\`\`
Input: x = 121
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: x = -121
Output: false
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Your code here
  
}

// Test your solution
console.log(isPalindrome(121)); // Expected: true`,
      python: `def is_palindrome(x):
    # Your code here
    pass

# Test your solution
print(is_palindrome(121))  # Expected: True`,
      typescript: `function isPalindrome(x: number): boolean {
  // Your code here
  
}

// Test your solution
console.log(isPalindrome(121)); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "x = 121", expectedOutput: "true", isHidden: false, description: "Palindrome" },
      { id: "tc2", input: "x = -121", expectedOutput: "false", isHidden: false, description: "Negative" },
    ],
    hints: ["Reverse half the number", "Compare first half with reversed second half"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "reverse-integer",
    title: "Reverse Integer",
    description: `Reverse digits of a 32-bit signed integer.

**Example 1:**
\`\`\`
Input: x = 123
Output: 321
\`\`\`

**Example 2:**
\`\`\`
Input: x = -123
Output: -321
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function reverse(x) {
  // Your code here
  
}

// Test your solution
console.log(reverse(123)); // Expected: 321`,
      python: `def reverse(x):
    # Your code here
    pass

# Test your solution
print(reverse(123))  # Expected: 321`,
      typescript: `function reverse(x: number): number {
  // Your code here
  
}

// Test your solution
console.log(reverse(123)); // Expected: 321`,
    },
    testCases: [
      { id: "tc1", input: "x = 123", expectedOutput: "321", isHidden: false, description: "Positive" },
      { id: "tc2", input: "x = -123", expectedOutput: "-321", isHidden: false, description: "Negative" },
      { id: "tc3", input: "x = 1534236469", expectedOutput: "0", isHidden: true, description: "Overflow" },
    ],
    hints: ["Extract digits using modulo", "Check for 32-bit overflow"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "sqrt-x",
    title: "Sqrt(x)",
    description: `Compute the square root of x rounded down.

**Example:**
\`\`\`
Input: x = 8
Output: 2
Explanation: sqrt(8) = 2.828..., rounded down is 2.
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function mySqrt(x) {
  // Your code here
  
}

// Test your solution
console.log(mySqrt(8)); // Expected: 2`,
      python: `def my_sqrt(x):
    # Your code here
    pass

# Test your solution
print(my_sqrt(8))  # Expected: 2`,
      typescript: `function mySqrt(x: number): number {
  // Your code here
  
}

// Test your solution
console.log(mySqrt(8)); // Expected: 2`,
    },
    testCases: [
      { id: "tc1", input: "x = 8", expectedOutput: "2", isHidden: false, description: "Not perfect square" },
      { id: "tc2", input: "x = 4", expectedOutput: "2", isHidden: false, description: "Perfect square" },
    ],
    hints: ["Binary search between 0 and x", "Or Newton's method"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "count-primes",
    title: "Count Primes",
    description: `Count primes less than n.

**Example:**
\`\`\`
Input: n = 10
Output: 4
Explanation: Primes less than 10: 2, 3, 5, 7
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function countPrimes(n) {
  // Your code here
  
}

// Test your solution
console.log(countPrimes(10)); // Expected: 4`,
      python: `def count_primes(n):
    # Your code here
    pass

# Test your solution
print(count_primes(10))  # Expected: 4`,
      typescript: `function countPrimes(n: number): number {
  // Your code here
  
}

// Test your solution
console.log(countPrimes(10)); // Expected: 4`,
    },
    testCases: [
      { id: "tc1", input: "n = 10", expectedOutput: "4", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 0", expectedOutput: "0", isHidden: false, description: "Zero" },
    ],
    hints: ["Sieve of Eratosthenes", "Mark multiples of each prime as composite"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "power-of-three",
    title: "Power of Three",
    description: `Check if n is a power of three.

**Example:**
\`\`\`
Input: n = 27
Output: true
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function isPowerOfThree(n) {
  // Your code here
  
}

// Test your solution
console.log(isPowerOfThree(27)); // Expected: true`,
      python: `def is_power_of_three(n):
    # Your code here
    pass

# Test your solution
print(is_power_of_three(27))  # Expected: True`,
      typescript: `function isPowerOfThree(n: number): boolean {
  // Your code here
  
}

// Test your solution
console.log(isPowerOfThree(n: 27)); // Expected: true`,
    },
    testCases: [
      { id: "tc1", input: "n = 27", expectedOutput: "true", isHidden: false, description: "Power of 3" },
      { id: "tc2", input: "n = 0", expectedOutput: "false", isHidden: false, description: "Zero" },
    ],
    hints: ["Iteratively divide by 3", "Or use logarithm"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "gcd-lcm",
    title: "GCD and LCM",
    description: `Calculate the Greatest Common Divisor and Least Common Multiple.

**Example:**
\`\`\`
Input: a = 12, b = 18
Output: GCD = 6, LCM = 36
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function gcdLcm(a, b) {
  // Return [gcd, lcm]
  
}

// Test your solution
console.log(gcdLcm(12, 18)); // Expected: [6, 36]`,
      python: `def gcd_lcm(a, b):
    # Return (gcd, lcm)
    pass

# Test your solution
print(gcd_lcm(12, 18))  # Expected: (6, 36)`,
      typescript: `function gcdLcm(a: number, b: number): [number, number] {
  // Return [gcd, lcm]
  
}

// Test your solution
console.log(gcdLcm(12, 18)); // Expected: [6, 36]`,
    },
    testCases: [
      { id: "tc1", input: "a = 12, b = 18", expectedOutput: "[6,36]", isHidden: false, description: "Basic" },
      { id: "tc2", input: "a = 5, b = 7", expectedOutput: "[1,35]", isHidden: false, description: "Coprime" },
    ],
    hints: ["Euclidean algorithm for GCD", "LCM = (a * b) / GCD"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "add-binary",
    title: "Add Binary",
    description: `Add two binary strings.

**Example:**
\`\`\`
Input: a = "11", b = "1"
Output: "100"
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function addBinary(a, b) {
  // Your code here
  
}

// Test your solution
console.log(addBinary("11", "1")); // Expected: "100"`,
      python: `def add_binary(a, b):
    # Your code here
    pass

# Test your solution
print(add_binary("11", "1"))  # Expected: "100"`,
      typescript: `function addBinary(a: string, b: string): string {
  // Your code here
  
}

// Test your solution
console.log(addBinary("11", "1")); // Expected: "100"`,
    },
    testCases: [
      { id: "tc1", input: 'a = "11", b = "1"', expectedOutput: '"100"', isHidden: false, description: "Basic" },
      { id: "tc2", input: 'a = "1010", b = "1011"', expectedOutput: '"10101"', isHidden: false, description: "Longer" },
    ],
    hints: ["Process from right to left", "Track carry bit"],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "fraction-recurring",
    title: "Fraction to Recurring Decimal",
    description: `Convert fraction to string, with recurring part in parentheses.

**Example:**
\`\`\`
Input: numerator = 1, denominator = 6
Output: "0.1(6)"
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function fractionToDecimal(numerator, denominator) {
  // Your code here
  
}

// Test your solution
console.log(fractionToDecimal(1, 6)); // Expected: "0.1(6)"`,
      python: `def fraction_to_decimal(numerator, denominator):
    # Your code here
    pass

# Test your solution
print(fraction_to_decimal(1, 6))  # Expected: "0.1(6)"`,
      typescript: `function fractionToDecimal(numerator: number, denominator: number): string {
  // Your code here
  
}

// Test your solution
console.log(fractionToDecimal(1, 6)); // Expected: "0.1(6)"`,
    },
    testCases: [
      { id: "tc1", input: "numerator = 1, denominator = 6", expectedOutput: '"0.1(6)"', isHidden: false, description: "Recurring" },
      { id: "tc2", input: "numerator = 2, denominator = 1", expectedOutput: '"2"', isHidden: false, description: "Integer" },
    ],
    hints: ["Long division simulation", "Track remainders to detect cycle"],
    expectedTimeMinutes: 25,
    points: 175,
  },
  {
    id: "excel-column-number",
    title: "Excel Sheet Column Number",
    description: `Convert Excel column title to column number.

**Example:**
\`\`\`
Input: columnTitle = "AB"
Output: 28
\`\`\``,
    difficulty: "easy",
    category: "math",
    starterCode: {
      javascript: `function titleToNumber(columnTitle) {
  // Your code here
  
}

// Test your solution
console.log(titleToNumber("AB")); // Expected: 28`,
      python: `def title_to_number(column_title):
    # Your code here
    pass

# Test your solution
print(title_to_number("AB"))  # Expected: 28`,
      typescript: `function titleToNumber(columnTitle: string): number {
  // Your code here
  
}

// Test your solution
console.log(titleToNumber("AB")); // Expected: 28`,
    },
    testCases: [
      { id: "tc1", input: 'columnTitle = "AB"', expectedOutput: "28", isHidden: false, description: "Two chars" },
      { id: "tc2", input: 'columnTitle = "ZY"', expectedOutput: "701", isHidden: false, description: "Larger" },
    ],
    hints: ["Base-26 conversion", "A=1, B=2, ..., Z=26"],
    expectedTimeMinutes: 10,
    points: 75,
  },
  {
    id: "factorial-zeros",
    title: "Factorial Trailing Zeroes",
    description: `Count trailing zeroes in n!.

**Example:**
\`\`\`
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function trailingZeroes(n) {
  // Your code here
  
}

// Test your solution
console.log(trailingZeroes(5)); // Expected: 1`,
      python: `def trailing_zeroes(n):
    # Your code here
    pass

# Test your solution
print(trailing_zeroes(5))  # Expected: 1`,
      typescript: `function trailingZeroes(n: number): number {
  // Your code here
  
}

// Test your solution
console.log(trailingZeroes(5)); // Expected: 1`,
    },
    testCases: [
      { id: "tc1", input: "n = 5", expectedOutput: "1", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 10", expectedOutput: "2", isHidden: false, description: "Larger" },
    ],
    hints: ["Count factors of 5 (2s are plentiful)", "Count n/5 + n/25 + n/125 + ..."],
    expectedTimeMinutes: 15,
    points: 100,
  },
  {
    id: "ugly-number-ii",
    title: "Ugly Number II",
    description: `Find the nth ugly number (only prime factors 2, 3, 5).

**Example:**
\`\`\`
Input: n = 10
Output: 12
Explanation: [1,2,3,4,5,6,8,9,10,12] are first 10 ugly numbers.
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function nthUglyNumber(n) {
  // Your code here
  
}

// Test your solution
console.log(nthUglyNumber(10)); // Expected: 12`,
      python: `def nth_ugly_number(n):
    # Your code here
    pass

# Test your solution
print(nth_ugly_number(10))  # Expected: 12`,
      typescript: `function nthUglyNumber(n: number): number {
  // Your code here
  
}

// Test your solution
console.log(nthUglyNumber(10)); // Expected: 12`,
    },
    testCases: [
      { id: "tc1", input: "n = 10", expectedOutput: "12", isHidden: false, description: "Basic" },
      { id: "tc2", input: "n = 1", expectedOutput: "1", isHidden: false, description: "First" },
    ],
    hints: ["Three pointers for multiples of 2, 3, 5", "Take minimum and advance pointer(s)"],
    expectedTimeMinutes: 20,
    points: 150,
  },
  {
    id: "multiply-strings",
    title: "Multiply Strings",
    description: `Multiply two non-negative integers represented as strings.

**Example:**
\`\`\`
Input: num1 = "123", num2 = "456"
Output: "56088"
\`\`\``,
    difficulty: "medium",
    category: "math",
    starterCode: {
      javascript: `function multiply(num1, num2) {
  // Your code here
  
}

// Test your solution
console.log(multiply("123", "456")); // Expected: "56088"`,
      python: `def multiply(num1, num2):
    # Your code here
    pass

# Test your solution
print(multiply("123", "456"))  # Expected: "56088"`,
      typescript: `function multiply(num1: string, num2: string): string {
  // Your code here
  
}

// Test your solution
console.log(multiply("123", "456")); // Expected: "56088"`,
    },
    testCases: [
      { id: "tc1", input: 'num1 = "123", num2 = "456"', expectedOutput: '"56088"', isHidden: false, description: "Basic" },
      { id: "tc2", input: 'num1 = "2", num2 = "3"', expectedOutput: '"6"', isHidden: false, description: "Simple" },
    ],
    hints: ["result[i+j] += num1[i] * num2[j]", "Handle carries afterward"],
    expectedTimeMinutes: 25,
    points: 175,
  },
];
