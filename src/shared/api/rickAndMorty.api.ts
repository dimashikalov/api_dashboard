import { apiClient } from './apiClient';
import type { Character, PaginatedResponse } from './types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
}

export const rickAndMortyApi = {
  getCharacters(params: GetCharactersParams = {}) {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', String(params.page));
    if (params.name) searchParams.append('name', params.name);
    if (params.status) searchParams.append('status', params.status);

    return apiClient<PaginatedResponse<Character>>(
      `${BASE_URL}/character?${searchParams.toString()}`
    );
  },

  getCharacterById(id: number) {
    return apiClient<Character>(`${BASE_URL}/character/${id}`);
  },
};
