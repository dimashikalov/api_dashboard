import { apiClient } from './apiClient';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface ApiComment {
  id: number;
  postId: number;
  name: string;
  body: string;
}

export type CreateCommentDto = Omit<ApiComment, 'id'>;

export const commentsApi = {
  getAll(signal?: AbortSignal) {
    return apiClient<ApiComment[]>(`${BASE_URL}/comments`, {
      signal,
    });
  },

  getByPostId(postId: number) {
    return apiClient<ApiComment[]>(`${BASE_URL}/comments?postId=${postId}`);
  },

  create(comment: CreateCommentDto) {
    return apiClient<ApiComment>(`${BASE_URL}/comments`, {
      method: 'POST',
      body: comment,
    });
  },

  update(id: number, comment: Partial<ApiComment>) {
    return apiClient<ApiComment>(`${BASE_URL}/comments/${id}`, {
      method: 'PATCH',
      body: comment,
    });
  },

  delete(id: number) {
    return apiClient<void>(`${BASE_URL}/comments/${id}`, {
      method: 'DELETE',
    });
  },
};
