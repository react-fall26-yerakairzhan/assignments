function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b, operation) {
    return operation(a, b);
}

console.log("Add:", calculate(5, 3, add));
console.log("Multiply:", calculate(5, 3, multiply));

// Create:
//     add(a, b)
// multiply(a, b)
// Then create:
//     calculate(a, b, operation)
// It should work like this:
// calculate(5, 3, add) → 8
// calculate(5, 3, multiply) → 15
// Explain briefly:
//     ●
// ●
// ●
// Can functions be stored in variables?
//     Can functions be passed to other functions?
//     What is the difference between add and add()?