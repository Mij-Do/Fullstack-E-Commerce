import { createSlice, type PayloadAction } from '@reduxjs/toolkit';



interface initialState {
    isOnline: boolean;
}

const initialState: initialState = {
    isOnline: false
}

const networkSlice = createSlice({
    name: 'network',
    initialState,
    reducers: {
        networkMode: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        }
    },
});

export const {  } = networkSlice.actions;

export default networkSlice;