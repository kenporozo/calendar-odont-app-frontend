import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, dentistSlice } from "./";


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        calendar: calendarSlice.reducer,
        dentist: dentistSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})