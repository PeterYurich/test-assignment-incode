import { createSlice } from '@reduxjs/toolkit';
import { fetchRepo, fetchIssues } from './repoOperations';


const initialState = {
    id: '',
    stars: 0,
    issues: []
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
                const targetData = payload.map(issue => {
                    return {
                        id: issue.id,
                        title: issue.title,
                        number: issue.number,
                        author: issue.user.login,
                        comments: issue.comments,
                        updated_at: issue.updated_at
                    }
                })
                console.log('targetData: ', targetData);
                state.issues = targetData
            })
            .addCase(fetchIssues.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })

    },
});