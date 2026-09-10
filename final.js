// 1. Students

const students = [
    {
        id: 1,
        name: "Anna",
        age: 20,
        grades: [85, 90, 78, 92]
    },
    {
        id: 2,
        name: "John",
        age: 21,
        grades: [65, 70, 58, 72]
    },
    {
        id: 3,
        name: "Sara",
        age: 19,
        grades: [95, 88, 92, 97]
    },
    {
        id: 4,
        name: "Mike",
        age: 22,
        grades: [55, 60, 48, 62]
    },
    {
        id: 5,
        name: "Emma",
        age: 20,
        grades: [75, 82, 80, 77]
    }
];


// 2. Get average of grades

function getAverage(grades) {
    return grades.reduce((total, grade) => total + grade, 0)
        / grades.length;
}


// 3. Get student's average

function getStudentAverage(student) {
    return getAverage(student.grades);
}


// 4. Get students who passed

function getPassedStudents(students) {
    return students.filter(
        student => getStudentAverage(student) >= 60
    );
}


// 5. Get student names

function getStudentNames(students) {
    return students.map(student => student.name);
}


// 6. Find student by ID

function findStudent(students, id) {
    return students.find(student => student.id === id);
}


// 7. Get student with highest average

function getTopStudent(students) {
    return students.reduce((topStudent, student) => {
        return getStudentAverage(student) > getStudentAverage(topStudent)
            ? student
            : topStudent;
    });
}


// 8. Test the functions

console.log("Anna average:", getStudentAverage(students[0]));

console.log(
    "Passed students:",
    getPassedStudents(students)
);

console.log(
    "Student names:",
    getStudentNames(students)
);

console.log(
    "Student with ID 3:",
    findStudent(students, 3)
);

console.log(
    "Top student:",
    getTopStudent(students)
);


// 9. Create a new array with:
// { id, name, average, passed }

const studentResults = students.map(student => ({
    id: student.id,
    name: student.name,
    average: getStudentAverage(student),
    passed: getStudentAverage(student) >= 60
}));

console.log("Student results:", studentResults);