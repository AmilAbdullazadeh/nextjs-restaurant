import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {createAsyncThunkRequest} from '../../hooks/useApi';
import {login, register, logout} from './authAPI';
import {User} from "@prisma/client";

interface AuthState {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null | undefined;
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        city?: string;
    } | null;
}

const initialState: AuthState = {
    status: 'idle',
    error: null,
    user: null,
};

export const loginUser = createAsyncThunkRequest<{ email: string; password: string }, User>('auth/api/signin', login);
// @ts-ignore
export const registerUser = createAsyncThunkRequest<User, User>('auth/api/signup', register);
export const logoutUser = createAsyncThunkRequest<void, void>('auth/api/logout.ts', logout);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authSlice.reducer;