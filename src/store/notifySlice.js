import {createSlice} from "@reduxjs/toolkit";

const notifySlice = createSlice({
    name: 'notify',

    initialState: {
        testItem: [],
        isInsideIncident: false,
    },

    reducers: {
        handlerSetIsInsideIncident(state, action) {
            state.isInsideIncident = !state.isInsideIncident
        }
    }
})

export const {handlerSetIsInsideIncident} = notifySlice.actions
export default notifySlice.reducer