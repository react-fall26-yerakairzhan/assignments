// 1. Array destructuring

const numbers = [10, 20, 30, 40];

const [first, second] = numbers;

console.log("First:", first);
console.log("Second:", second);


// 2. Object destructuring

const user = {
    id: 1,
    name: "Anna",
    age: 21
};

const { name, age } = user;

console.log("Name:", name);
console.log("Age:", age);


// 3. Add 50 to a NEW copy of the numbers array

const newNumbers = [...numbers, 50];

console.log("Original:", numbers);
console.log("New array:", newNumbers);


// 4. Create a new user with age 22

const newUser = {
    ...user,
    age: 22
};

console.log("Original user:", user);
console.log("New user:", newUser);


// 5. Add an email WITHOUT modifying the original

const userWithEmail = {
    ...user,
    email: "anna@example.com"
};

console.log("Original user:", user);
console.log("User with email:", userWithEmail);


// 6. Combine two arrays using spread

const firstArray = [1, 2, 3];
const secondArray = [4, 5, 6];

const combined = [...firstArray, ...secondArray];

console.log("Combined:", combined);


// 7. Rest parameter

function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
}

console.log("Sum:", sum(1, 2));             // 3
console.log("Sum:", sum(1, 2, 3, 4));       // 10
console.log("Sum:", sum(5, 10, 15, 20, 25)); // 75

// Use:
//     numbers = [10, 20, 30, 40]
// Get the first two values using destructuring.
// Use:
//     user = { id: 1, name: "Anna"
//         , age: 21 }
// Get name and age using destructuring.
// Then:
//     ●
// ●
// ●
// ●
// Add 50 to a new copy of the numbers array.
//     Create a new user with age 22.
// Add an email without modifying the original user.
//     Combine two arrays using spread.
// Create a function:
//     sum(...numbers)
// It should accept any number of arguments.
// sum(1, 2) → 3
// sum(1, 2, 3, 4) → 10
// Explain the difference between spread and rest.