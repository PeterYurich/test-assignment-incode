import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";


axios.defaults.baseURL = `https://api.github.com`

export const fetchRepo = createAsyncThunk("repo/fetchData",
    async ([repoOwner, repoName], { rejectWithValue }) => {
        try {
            console.log('url: ', `/repos/${repoOwner}/${repoName}`);
            const response = await axios.get(`/repos/${repoOwner}/${repoName}`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

export const fetchIssues = createAsyncThunk("issues/fetchData",
    async ([repoOwner, repoName], { rejectWithValue }) => {
        try {
            const response = await axios.get(`/repos/${repoOwner}/${repoName}/issues`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });