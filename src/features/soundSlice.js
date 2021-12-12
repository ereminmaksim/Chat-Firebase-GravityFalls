import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    soundOn: true,

};

const soundSlice = createSlice({
    name: "sound",
    initialState,
    reducers: {
        soundOn: (state, action) => {
            state.soundOn = action.payload.soundOn;

        }
    },

});

export const { soundOn } = soundSlice.actions;

export const selectsoundOn = (state) => state.sound.soundOn;

export default soundSlice.reducer;
