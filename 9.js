function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}


// 2. First counter
const counter = createCounter();

console.log("Counter:", counter()); // 1
console.log("Counter:", counter()); // 2
console.log("Counter:", counter()); // 3


// 3. Second counter
const counter2 = createCounter();

console.log("Counter 2:", counter2()); // 1
console.log("Counter 2:", counter2()); // 2

console.log("Counter 1:", counter()); // 4


// 4. Create an adder
function createAdder(value) {
    return function (number) {
        return value + number;
    };
}


// 5. Create addFive
const addFive = createAdder(5);

console.log("Add 5:", addFive(10)); // 15
console.log("Add 5:", addFive(20)); // 25


// 6. Create another adder
const addTen = createAdder(10);

console.log("Add 10:", addTen(10)); // 20
console.log("Add 10:", addTen(20)); // 30

// 9 — Closure
// Create:
//     createCounter()
// It should keep its own count variable and return a function that increases it.
//     Expected result:
//     counter() → 1
// counter() → 2
// counter() → 3
// Create another counter and check whether it has its own count.
//     Then create:
//     createAdder(value)
// Example:
//     const addFive = createAdder(5)
// addFive(10) → 15
// addFive(20) → 25
// Explain briefly why the inner function can still access variables from the outer function.