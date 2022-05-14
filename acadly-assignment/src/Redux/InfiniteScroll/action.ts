export const ALL_STUDENTS = "ALL_STUDENTS"
export const INDIVIDUAL_STUDENTS = "INDIVIDUAL_STUDENTS"
// export const INDIVIDUAL_STUDENTS_SEARCH = "INDIVIDUAL_STUDENTS_SEARCH"

interface Iabc{
    id:number
    name:string
    avatarURL:string
    lecturesAttended:number
    totalLectures:number
    marks:{
        mth101:{
            subjectTitle:string
            totalMarks:number
            markesObtained:number
        }

    }
}

interface Istudent  {
    students: Array<Iabc>
}

interface IindivaidualStudent{
    id:number
    name:string
    avatarURL:string
    lecturesAttended:number
    totalLectures:number
    marks:{
        mth101:{
            subjectTitle:string
            totalMarks:number
            markesObtained:number
        }

    }
}

export const allStudent = (data:Istudent) => ({
    type:ALL_STUDENTS,
    payload:data
})

export const individualStudent = (data:IindivaidualStudent) => ({
    type: INDIVIDUAL_STUDENTS,
    payload:data
})
// export const individualStudentSearch = (data:IindivaidualStudent) => ({
//     type: INDIVIDUAL_STUDENTS,
//     payload:data
// })
