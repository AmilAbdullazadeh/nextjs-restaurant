import {AxiosPromise} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

export function createAsyncThunkRequest<T = void, R = unknown, E = unknown>(
    actionType: string,
    apiCall: (arg: T) => AxiosPromise<R>
) {
    // @ts-ignore
    return createAsyncThunk<R, T, { rejectWithValue: (arg: E) => void }>(
        actionType,
        async (arg, {rejectWithValue}) => {
            try {
                const response = await apiCall(arg);
                return response.data;
            } catch (err: any) {
                return rejectWithValue(err.response.data);
            }
        }
    );
}
