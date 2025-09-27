import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '../../config/axios.config';
import type { ApiErrorData, IResponse, IUser } from '../../interfaces';
import type { RootState } from '../store';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';
import CookieServices from '../../services/CookieServices';



export const userLogin = createAsyncThunk(
    'login/userLogin',
    async (user: IUser, thunkAPI) => {
        const {rejectWithValue} = thunkAPI;
        try {
            const {data} = await axiosInstance.post('/auth/local', user);
            console.log(data)
            console.log(user)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

interface loginUserState {
    loading: boolean;
    data: IResponse | null;
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
        builder.addCase(userLogin.fulfilled, (state, action: PayloadAction<IResponse>) => {
            state.loading = false;
            state.data = action.payload;
            const date = new Date();
            const IN_DAYS = 3;
            date.setDate(date.getDate() + IN_DAYS);
            const options = {path: "/", expires: date};
            CookieServices.set("jwt", action.payload.jwt, options);
            toast.success('Successfully created!');
        });
        builder.addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload as string;
            toast.error(`${(action.payload as AxiosError<ApiErrorData>)?.response?.data?.error?.message}`);
        })
    },
})



export const {} = loginSlice.actions;
export const loginSelector = ({login}: RootState) => login;
export default loginSlice;