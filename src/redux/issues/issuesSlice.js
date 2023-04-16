import { createSlice } from '@reduxjs/toolkit';
import { fetchIssues } from './issuesOperations';


const initialState = {
    items: [],
    toDo: [],
    inProgress: [],
    done: [],
    isLoading: false,
    error: null,
};

export const issuesSlice = createSlice({
    name: 'issues',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchIssues.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchIssues.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = payload;
            })
            .addCase(fetchIssues.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })

    },
});