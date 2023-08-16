import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {createAsyncThunkRequest} from '../../hooks/useApi';
import {login} from './authAPI';
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
    },
});

export default authSlice.reducer;