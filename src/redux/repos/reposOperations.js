import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
// import { repoOwner, repoName } from ""
const repoOwner = null
const repoName = null


axios.defaults.baseURL = `https://api.github.com`

export const fetchRepo = createAsyncThunk("repos/fetchAll",
    async ([repoOwner, repoName], {rejectWithValue}) => {
        try {
            const response = await axios.get(`/repos/${repoOwner}/${repoName}`);
            console.log('response: ', response);
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });


    export const fetchIssues = createAsyncThunk("repos/fetchAll",
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get("/repos/repos/${repoOwner}/${repoName}/issues");
            console.log('response: ', response);
            return response.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });