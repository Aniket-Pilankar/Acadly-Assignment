export const ALL_STUDENTS = "ALL_STUDENTS"

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

export const allStudent = (data:Istudent) => ({
    type:ALL_STUDENTS,
    payload:data
})
