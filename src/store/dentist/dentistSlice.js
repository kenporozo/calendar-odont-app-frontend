import { createSlice } from '@reduxjs/toolkit';

export const dentistSlice = createSlice({
    name: 'dentist',
    initialState: {
        isLoadingDentists: true,
        dentists: [

        ]
    },
    reducers: {
        onAddNewDentist: (state, {payload}) => {
            state.dentists.push(payload);
        },
        onDeleteDentist: (state, {payload}) => {
            state.dentists = state.dentists.filter(dentist => dentist._id !== payload._id);
        },
        onLoadDentists: (state, {payload = []}) =>{
            state.isLoadingDentists = false;
            payload.forEach(dentist => {
                const exists = state.dentists.some(dbDentist => dbDentist._id === dentist._id);
                if(!exists){
                    state.dentists.push(dentist);
                }
            })
        }
    }
});


export const { onAddNewDentist, onDeleteDentist, onLoadDentists } = dentistSlice.actions;