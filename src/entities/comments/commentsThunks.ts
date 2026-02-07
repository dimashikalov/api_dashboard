import { ApiError } from '@/shared/api/apiError';
import {
  commentsApi,
  type ApiComment,
  type CreateCommentDto,
} from '@/shared/api/jsonPlaceholder.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk<
  ApiComment[],
  void,
  { rejectValue: string }
>('comments/fetchAll', async (_, { rejectWithValue, signal }) => {
  try {
    return await commentsApi.getAll(signal);
  } catch (err) {
    if (err instanceof ApiError) {
      return rejectWithValue(`Ошибка API: ${err.status}`);
    }
    return rejectWithValue('Не удалось загрузить комментарии');
  }
});

export const createComment = createAsyncThunk<
  ApiComment,
  CreateCommentDto,
  { rejectValue: string }
>('comments/create', async (data, { rejectWithValue }) => {
  try {
    return await commentsApi.create(data);
  } catch {
    return rejectWithValue('Не удалось создать комментарий');
  }
});
