class Student {
    constructor(name, age, status, courses, address) {
        this.name = name
        this.age = age
        this.status = status
        this.courses = courses
        this.address = address
    }

    PrintTypes = function () {
        console.log("Type of Name: " + typeof this.name)
        console.log("Type of Age: " + typeof this.age)
        console.log("Type of Status: " + typeof this.status)
        console.log("Type of Courses: " + typeof this.courses)
        console.log("Type of Address: " + typeof this.address)
    }
}

const student = new Student(
    "Erakair",
    21,
    "active",
    ["Math", "Programming"],
    {
        city: "Almaty"
    }
)

student.PrintTypes()

// Primitives
let studentName = "Erakair"   // string
let studentAge = 21           // number
let isActive = true           // boolean
let emptyValue = null         // null
let notDefined                // undefined

// Template literal
let sentence = `${name} is ${age} years old and is currently ${
    active ? "active" : "inactive"
}.`

console.log(sentence)