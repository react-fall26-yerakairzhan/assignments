// 1. Original object
const original = {
    name: "Alice",
    score: 10
};

// 2. Copy using assignment
const copy = original;

// 3. Change copy.score
copy.score = 20;

console.log("copy score:", copy.score);
console.log("original score:", original.score);

// 4. Why?
// copy and original point to the SAME object.

// 5. Make a copy using spread
const spreadCopy = {
    ...original
};

// 6. Change the copy
spreadCopy.score = 30;

console.log("spread copy score:", spreadCopy.score);
console.log("original score:", original.score);

// The original is not changed because spread creates
// a new object.

const user = {
    name: "Brotan",
    address: {
        city: "Almaty"
    }
};

// 7. Copy using spread
const userCopy = {
    ...user
};

// 8. Change the nested city
userCopy.address.city = "Astana";

console.log("copy city:", userCopy.address.city);
console.log("original city:", user.address.city);

// 9. What happened?
// Both objects still point to the SAME address object.
// Spread only copies the first level.


// 10. Correctly copy the nested address
const correctCopy = {
    ...user,
    address: {
        ...user.address
    }
};

// 11. Change the copied address
correctCopy.address.city = "Shymkent";

console.log("correct copy city:", correctCopy.address.city);
console.log("original city:", user.address.city);



// Start with:
// original = { name: "Alice"
//     , score: 10 }
// copy = original
// Change copy.score.
// ●
// ●
// ●
// ●
// Check what happens to original.
//     Explain why.
//     Make a copy using the spread operator.
//     Change the copy without changing the original.
//     Then try:
// user = { name: "Alice"
//     , address: { city: "Almaty
//         " } }
//         Copy it using spread and change the city.
// ●
// What happens to the original?
// ●
// Why?
// ●
// Find a way to copy the nested address correctly.