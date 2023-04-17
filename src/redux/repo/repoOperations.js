import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


axios.defaults.baseURL = `https://api.github.com`

export const fetchRepo = createAsyncThunk("repo/fetchData",
    async ({ repoOwner, repoName }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/repos/${repoOwner}/${repoName}`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

export const fetchIssues = createAsyncThunk("issues/fetchData",
    async ({ repoOwner, repoName }, { rejectWithValue }) => {

        try {
            const response = await axios.get(`/repos/${repoOwner}/${repoName}/issues`);
            const data = response.data
            const payload = data.map(issue => {
                return {
                    id: issue.id,
                    title: issue.title,
                    number: issue.number,
                    author: issue.user.login,
                    comments: issue.comments,
                    openedAt: issue.updated_at
                }
            })
            return payload
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });