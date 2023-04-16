import { createSlice } from '@reduxjs/toolkit';
import { fetchRepo, fetchIssues } from './reposOperations';


const initialState = {
    items: [],
    toDo: [],
    inProgress: [],
    done: [],
    isLoading: false,
    error: null,
};

export const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRepo.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchRepo.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload;
            })
            .addCase(fetchRepo.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // .addCase(fetchIssues.pending, state => {
            //     state.isLoading = true;
            // })
            // .addCase(fetchIssues.fulfilled, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.items = payload;
            // })
            // .addCase(fetchIssues.rejected, (state, { payload }) => {
            //     state.isLoading = false;
            //     state.error = payload;
            // })

    },
});