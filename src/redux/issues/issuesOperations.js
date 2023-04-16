import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
// import { repoOwner, repoName } from ""
const repoOwner = null
const repoName = null


axios.defaults.baseURL = repoOwner ? `https://api.github.com${repoOwner}/${repoName}`
    : 'https://api.github.com/repos/facebook/react';

export const fetchIssues = createAsyncThunk("issues/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/issues");
            console.log('response: ', response);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    });