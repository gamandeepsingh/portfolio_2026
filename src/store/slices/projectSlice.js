import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectData } from '../../utils/data';

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  // Simulate async data fetching with static data
  return new Promise((resolve) => {
    setTimeout(() => resolve(projectData), 100);
  });
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        console.log('action.payload', action.payload); // Debugging line
        
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default projectSlice.reducer;
