import {configureStore} from "@reduxjs/toolkit";
import GFInfoReducer from "./reducers/GFInfo.reducer.js";
export const store = configureStore({
    reducer : {
        GFInfo : GFInfoReducer
    }
})