function Student(name, id, grade) {
    this.name = name
    this.id = id
    this.grade = grade
}

const student1 = new Student("Anna", 1, 85)
const student2 = new Student("John", 2, 62)
const student3 = new Student("Sara", 3, 91)
const student4 = new Student("Mike", 4, 55)

const Students = []
Students.push(student1)
Students.push(student2)
Students.push(student3)
Students.push(student4)

// 1. Students with grade >= 70
const gradeMoreThan70 = Students.filter(
    (student) => student.grade >= 70
)
console.log("Students with grade >= 70:", gradeMoreThan70)

// 2. Array of student names
const names = Array.from(Students, (student) => student.name)
console.log("Student names:", names)

// 3. Student with id = 3
const id3Student = Students.find(
    (student) => student.id === 3
)
console.log("Student with id 3:", id3Student)

// 4. Student with the highest grade
const highestGradeStudent = Students.reduce(
    (highest, student) =>
        student.grade > highest.grade ? student : highest
)
console.log("Highest grade:", highestGradeStudent)

// 5. Average grade
const avgGrade =
    Students.reduce((total, student) => total + student.grade, 0)
    / Students.length

console.log("Average grade:", avgGrade)

// 6. New array with passed: true/false
// Original objects are NOT modified
const StudentPassList = Students.map((student) => ({
    ...student,
    passed: student.grade >= 60
}))

console.log("Students with pass status:", StudentPassList)