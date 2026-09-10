function User(id, name, age, city, street) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.address = {
        city: city,
        street: street
    };
}

const user = new User(1, "Bro", 18, "Almaty", "Tolebi");

// 1. Read the name and city
console.log("Name:", user.name);
console.log("City:", user.address.city);

// 2. Change the age
user.age++;
console.log("Age:", user.age);

// 3. Add an email
user.email = "bro@example.com";
console.log("Email:", user.email);

// 4. Remove the street
delete user.address.street;
console.log("Address:", user.address);

// 5. Get name and age using destructuring
const { name, age } = user;
console.log("Name:", name, "Age:", age);

// 6. Get city using nested destructuring
const { address: { city } } = user;
console.log("City:", city);

// 7. Rename name to userName during destructuring
const { name: userName } = user;
console.log("User name:", userName);
// 4 — Objects
// Create a user with id, name, age, and an address containing city and street.
//
// Read the name and city.
//     Change the age.
//     Add an email.
//     Remove the street.
//     Get name and age using destructuring.
// Get city using nested destructuring.
//     Rename name to userName during destructuring