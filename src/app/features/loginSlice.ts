import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios.config';
import type { IUser } from '../../interfaces';
import type { RootState } from '../store';


export const userLogin = createAsyncThunk(
    'login/userLogin',
    async (user: IUser, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;

        try {
            const {data} = await axiosInstance.post('/auth/local', user);
            console.log(data);
            console.log(user)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

interface loginUserState {
    loading: boolean;
    data: IUser | null;
    error: null | undefined | unknown;
}

const initialState: loginUserState = {
    loading: false,
    data: null,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<IUser>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload as string;
        })
    },
})



export const {} = loginSlice.actions;
export const loginSelector = ({login}: RootState) => login;
export default loginSlice;