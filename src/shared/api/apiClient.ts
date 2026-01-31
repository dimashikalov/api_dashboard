import { ApiError } from './apiError';
import { HTTPStatus } from './httpStatus';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  signal?: AbortSignal;
}

const BASE_HEADERS: HeadersInit = {
  'Content-Type': 'application/json',
};

export async function apiClient<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, headers, signal } = options;

  const response = await fetch(url, {
    method,
    headers: {
      ...BASE_HEADERS,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  let data: unknown = null;

  try {
    data = await response.json();
  } catch {
    console.log('ЧТо-то пошло не так!');
  }

  if (!response.ok) {
    throw new ApiError(
      response.status as HTTPStatus,
      `API Error: ${response.status}`,
      data
    );
  }

  return data as T;
}
