import { createSlice } from '@reduxjs/toolkit';



interface initialState {
    isOpenCartDrawer: boolean | undefined;
}

const initialState: initialState = {
    isOpenCartDrawer: false
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        isOpenCartDrawerAction: (state) => {
            state.isOpenCartDrawer = !state.isOpenCartDrawer;
        },
        onOpenCartDrawerAction: (state) => {
            state.isOpenCartDrawer = true;
        },
        onCloseCartDrawerAction: (state) => {
            state.isOpenCartDrawer = false;
        },
    },
});

export const { isOpenCartDrawerAction, onOpenCartDrawerAction, onCloseCartDrawerAction } = globalSlice.actions;

export default globalSlice;