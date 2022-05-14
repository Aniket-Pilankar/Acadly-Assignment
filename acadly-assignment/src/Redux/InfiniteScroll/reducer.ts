import { ALL_STUDENTS ,allStudent,INDIVIDUAL_STUDENTS,individualStudent } from "./action"

const initState = {
    studentlist:[],
    individual_Student:{}
}

export const allStudentReducer = (store=initState, {type,payload}:{type:string,payload:any}) => {
    switch(type){
        case ALL_STUDENTS:
            return {...store,studentlist:[...store.studentlist,...payload]}
        
        case INDIVIDUAL_STUDENTS:
            return {...store,individual_Student:payload}

        // case INDIVIDUAL_STUDENTS_SEARCH:
        //     return {...store,studentlist:[...store.studentlist,...payload]}
            default:
                return store
    }
}

export default allStudentReducer