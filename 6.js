// 1. Normal function syntax
function isEven(number) {
    return number % 2 === 0;
}

// 2. Arrow function
const isEvenArrow = (number) => {
    return number % 2 === 0;
};

// 3. Get full name
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

// 4. Calculate price
function calculatePrice(price, quantity) {
    return price * quantity;
}

// 5. Calculate discount
function calculateDiscount(price, percent) {
    return price - (price * percent / 100);
}

// 6. Get maximum
function getMax(a, b) {
    return a > b ? a : b;
}
console.log("Is 10 even?", isEven(10));
console.log("Is 7 even?", isEven(7));

console.log("Full name:", getFullName("Alice", "Smith"));

console.log("Total price:", calculatePrice(100, 3));

console.log("Price after discount:", calculateDiscount(1000, 20));

console.log("Maximum:", getMax(15, 25));

console.log("Arrow isEven:", isEvenArrow(8));


// Create:
//     isEven(number)
// getFullName(firstName, lastName)
// calculatePrice(price, quantity)
// calculateDiscount(price, percent)
// getMax(a, b)
// Write at least one using normal function syntax, then rewrite it as an arrow function.