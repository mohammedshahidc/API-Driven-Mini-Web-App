import { configureStore } from "@reduxjs/toolkit";
import ReposSlice from "./slice";

export const store=configureStore({
    reducer:{
        repo:ReposSlice
    }
})