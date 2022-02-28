import {configureStore} from "@reduxjs/toolkit";
import notifyReducer from "./notifySlice";

export default configureStore({
    reducer: {
        notifyReducer: notifyReducer
    }
})