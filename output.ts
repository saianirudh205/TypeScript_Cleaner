// Function with a syntax error (missing closing parenthesis)
/*

Line: 2, Error: 'add', which lacks return-type annotation, implicitly has an 'any' return type.

 function add(x: number, y: number: number {
    return x + y;
}

// Function with a type error (returning a string instead of a number)
 */
/*

Line: 8, Error: Type 'number' is not assignable to type 'string'.

 function subtract(x: number, y: number): string {
    return x - y;
}

// Function with a type error (parameter y is a string instead of a number)
 */
/*

Line: 13, Error: The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

 function multiply(x: number, y: string): number {
    return x * y;
}

// Function with a syntax error (missing colon after parameter y)
 */
/*

Line: 17, Error: Parameter 'y' implicitly has an 'any' type.

 function divide(x: number, y number): number {
    if (y === 0) {
        throw new Error("Division by zero");
    }
    return x / y;
}

// Function with a type error (returning number instead of string)
 */
/*

Line: 26, Error: Type 'string' is not assignable to type 'number'.

 function stringLength(str: string): number {
    return str;
}

// Function with a syntax error (missing return statement)
 */
/*

Line: 30, Error: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.

 function reverseString(str: string): string {
    str.split("").reverse().join("");
}

// Function with a type error (returning undefined instead of number)
 */
/*

Line: 37, Error: Type 'undefined' is not assignable to type 'number'.

 function factorial(n: number): number {
    if (n === 0 || n === 1) {
        return;
    }
    return n * factorial(n - 1);
}

// Function with a syntax error (missing curly braces)
 */
/*

Line: 43, Error: Function implementation is missing or not immediately following the declaration.

 function isPrime(n: number): boolean
if (n <= 1)
    return false;
for (let i = 2; i <= Math.sqrt(n); i++)
    if (n % i === 0)
        return false;
return true;
}

// Function with a type error (returning a number instead of boolean)
 */
/*

Line: 54, Error: Type 'boolean' is not assignable to type 'number'.

 function fahrenheitToCelsius(f: number): number {
    return true;
}

// Function with a syntax error (missing semicolon)
 */
function celsiusToFahrenheit(c: number): number {
    return (c * 9 / 5) + 32
}

// Function with a type error (returning string instead of number)
/*

Line: 64, Error: Type 'number' is not assignable to type 'string'.

 function max(x: number, y: number): string {
    return x > y ? x : y;
}

// Function with a type error (returning number instead of string)
 */
function min(x: number, y: number): number {
    return x < y ? x : y;
}

// Function with a syntax error (missing closing bracket for if statement)
function isPalindrome(str: string): boolean {
    const reversed = str.split("").reverse().join("");
    return str === reversed;
}

// Function with a type error (returning boolean instead of number)
/*

Line: 80, Error: Type 'number' is not assignable to type 'boolean'.

 function getRandomNumber(min: number, max: number): boolean {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function with a syntax error (missing parameter type)
 */
function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function with a type error (returning undefined instead of string)
/*

Line: 94, Error: Type 'string' is not assignable to type 'undefined'.

 function capitalizeFirstLetter(str: string): undefined {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Function with a syntax error (missing return type)
 */
function isEven(n: number) {
    return n % 2 === 0;
}

// Function with a type error (returning a number instead of boolean)
/*

Line: 104, Error: Type 'boolean' is not assignable to type 'number'.

 function isOdd(n: number): number {
    return !isEven(n);
}

// Function with a syntax error (missing return statement)
 */
/*

Line: 108, Error: A function whose declared type is neither 'undefined', 'void', nor 'any' must return a value.

 function indexOf<T>(array: T[], element: T): number {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            i;
        }
    }
}

// Function with a type error (returning undefined instead of T)
 */
/*

Line: 118, Error: Type 'T | undefined' is not assignable to type 'undefined'.

 function getLastElement<T>(array: T[]): undefined {
    return array.length > 0 ? array[array.length - 1] : undefined;
}
 */
