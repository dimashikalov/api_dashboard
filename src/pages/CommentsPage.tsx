import { useEffect, useState } from 'react';
import {
  commentsApi,
  type ApiComment,
} from '../shared/api/jsonPlaceholder.api';
import { ApiError } from '../shared/api/apiError';

export default function CommentsPage() {
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    commentsApi
      .getAll(controller.signal)
      .then(setComments)
      .catch((err) => {
        if (err.name === 'AbortError') return;

        if (err instanceof ApiError) {
          setError(`Ошибка API: ${err.status}`);
        } else {
          setError('Неизвестная ошибка');
        }
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, []);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Комментарии</h1>

      <ul>
        {comments.slice(0, 20).map((comment) => (
          <li key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
