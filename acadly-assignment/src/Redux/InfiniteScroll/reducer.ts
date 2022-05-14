import { ALL_STUDENTS ,allStudent } from "./action"

const initState = {
    studentlist:[]
}

export const allStudentReducer = (store=initState, {type,payload}:{type:string,payload:any}) => {
    switch(type){
        case ALL_STUDENTS:
            return {...store,studentlist:[...store.studentlist,...payload]}
        
            default:
                return store
    }
}

export default allStudentReducer