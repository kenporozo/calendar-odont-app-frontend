import { createSlice } from "@reduxjs/toolkit";

export const dentistSlice = createSlice({
  name: "dentist",
  initialState: {
    isLoadingDentists: true,
    dentists: [],
    activeDentist: null,
  },
  reducers: {
    onSetActiveDentist: (state, { payload }) => {
      state.activeDentist = payload;
    },
    onAddNewDentist: (state, { payload }) => {
      state.dentists.push(payload);
      state.activeDentist = null;
    },
    onUpdateDentist: (state, { payload }) => {
      state.dentists = state.dentists.map((dentist) => {
        if (dentist._id === payload._id) {
          return payload;
        }

        return dentist;
      });
    },
    onDeleteDentist: (state, {payload}) => {
        state.dentists = state.dentists.map((dentist) => {
            if (dentist._id === payload._id) {
              return payload;
            }
    
            return dentist;
          });
    },
    onLoadDentists: (state, { payload = [] }) => {
      state.isLoadingDentists = false;
      payload.forEach((dentist) => {
        const exists = state.dentists.some(
          (dbDentist) => dbDentist._id === dentist._id
        );
        if (!exists) {
          state.dentists.push(dentist);
        }
      });
    },
  },
});

export const {
  onSetActiveDentist,
  onAddNewDentist,
  onUpdateDentist,
  onDeleteDentist,
  onLoadDentists,
} = dentistSlice.actions;
