import { createSlice } from '@reduxjs/toolkit';
import { fetchRepo, fetchIssues } from './repoOperations';


const initialState = {
    id: '',
    url: '',
    stars: 0,
    fullName: null,
    issues: [],
    isLoading: false
}

export const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRepo.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchRepo.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.id = payload.id;
                state.stars = payload.watchers;
                state.fullName = payload.full_name;
                state.url = payload.html_url
            })
            .addCase(fetchRepo.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })

            .addCase(fetchIssues.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchIssues.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.issues = payload
            })
            .addCase(fetchIssues.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })

    },
});