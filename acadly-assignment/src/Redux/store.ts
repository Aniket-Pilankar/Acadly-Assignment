import { combineReducers, createStore } from "redux";
import allStudentReducer from "./InfiniteScroll/reducer";


const rootReducer = combineReducers(
    {
        allstudents:allStudentReducer
    }
)

export const store = createStore(rootReducer)