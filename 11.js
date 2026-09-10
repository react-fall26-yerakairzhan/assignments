const user1 = {
    name: "Anna",
    address: {
        city: "Almaty"
    }
};

const user2 = {
    name: "John"
};


// 2. Direct access

console.log(user1.address.city); // Almaty;


// 3. Optional chaining

console.log(user1.address?.city); // Almaty
console.log(user2.address?.city); // undefined


// 4. Optional chaining + nullish coalescing

const city1 = user1.address?.city ?? "City not specified";
const city2 = user2.address?.city ?? "City not specified";

console.log("Anna city:", city1);
console.log("John city:", city2);



// Create user objects where some users have an address and some do not.
//     Try:
// user.address.city
// Then solve the problem using optional chaining ?..
//     Use nullish coalescing ?? to display:
//     "City not specified"
// when the city does not exist.
//     Compare || and ?? using:
// 0,
//     ""
//     , false, null, undefined
// Explain what you notice.