const message = "global";

console.log("Global:", message);

function testScope() {
    const message = "function";
    console.log("Function:", message);

    if (true) {
        const message = "block";
        console.log("Block:", message);
    }

    console.log("Back in function:", message);
}

testScope();

console.log("Back in global:", message);

// var, let, const inside a block

if (true) {
    var varVariable = "I am var";
    let letVariable = "I am let";
    const constVariable = "I am const";

    console.log("Inside block:", varVariable);
    console.log("Inside block:", letVariable);
    console.log("Inside block:", constVariable);
}

console.log("Outside block, var:", varVariable);

// Create:
//     const message =
//         "global"
// Create a function with another message =
//     "function"
//         .
//         Inside it, create an if block with another message =
//     "block"
//         .
//         Print message at each level and observe the result.
//     Also create variables using var, let, and const inside a block and try accessing them
// outside.
//     Explain briefly:
//     ●
// ●
// ●
// ●
// Global scope
// Function scope
// Block scope
// Difference between var, let, and const