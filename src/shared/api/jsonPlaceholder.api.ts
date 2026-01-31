import { apiClient } from './apiClient';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Comment {
  id?: number;
  postId: number;
  name: string;
  body: string;
}

export const commentsApi = {
  getAll() {
    return apiClient<Comment[]>(`${BASE_URL}/comments`);
  },

  getByPostId(postId: number) {
    return apiClient<Comment[]>(`${BASE_URL}/comments?postId=${postId}`);
  },

  create(comment: Comment) {
    return apiClient<Comment>(`${BASE_URL}/comments`, {
      method: 'POST',
      body: comment,
    });
  },

  update(id: number, comment: Partial<Comment>) {
    return apiClient<Comment>(`${BASE_URL}/comments/${id}`, {
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
