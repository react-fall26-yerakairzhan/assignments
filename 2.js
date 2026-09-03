const arr = [3, 7, 2, 10, 5]

const multipliedBy2 = arr.map(number => number * 2)

const greaterThan5 = arr.filter(number => number > 5)

const firstGreaterThan5 = arr.find(number => number > 5)

const sum = greaterThan5.reduce((total, number) => total + number, 0)

const ten = arr.includes(10)

console.log("Original:", arr)
console.log("Multiplied by 2:", multipliedBy2)
console.log("Greater than 5:", greaterThan5)
console.log("First greater than 5:", firstGreaterThan5)
console.log("Sum:", sum)
console.log("Contains 10:", ten)