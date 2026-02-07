import type { ApiComment } from '@/shared/api/jsonPlaceholder.api';
import { createSlice } from '@reduxjs/toolkit';
import { createComment, fetchComments } from './commentsThunks';

interface CommentsState {
  comments: ApiComment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка загрузки';
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.error = action.payload ?? 'Ошибка создания';
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
