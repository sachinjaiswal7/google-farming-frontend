import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWorkflowDropDown = createAsyncThunk("fetchWorkflowDropDown",
    async (payload, thunkAPI) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}getWorkflows`);
        console.log(response);
        return response.data;
    })



export const fetchAllActivities = createAsyncThunk("fetchAllActivies", 
    async(payload, thunkAPI) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}getActivities`)
        console.log(response.data);
        return response.data;
    }
)

const slice = createSlice({
    name: 'GFInfo',
    initialState: {
        workflowDropDown: [],
        activityData : []
    },
    reducers : {
        //updating the activity array.
        updateActivityData : (state,action) => {
            const array = state.activityData.map((item) => {
                if(item.id === action.payload.id){
                    return action.payload;
                } 
                else{
                    return item;
                }
            })
        },

        //adding a new entry to the activity array.
        addActivity : (state, action) => {
            state.activityData.unshift(action.payload);
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchWorkflowDropDown.fulfilled, (state, action) => {
            state.workflowDropDown = action.payload.data;
        });
        builder.addCase(fetchAllActivities.fulfilled,(state,action) => {
            state.activityData = action.payload.data;
        })
    }


})

export const {updateActivityData,addActivity}  = slice.actions;
export default slice.reducer;