import { useEffect, useState } from 'react';
import {
  commentsApi,
  type ApiComment,
  type CreateCommentDto,
} from '../shared/api/jsonPlaceholder.api';
import { ApiError } from '../shared/api/apiError';
import { AddCommentForm } from '../features/addCommentForm/AddCommentForm';

export default function CommentsPage() {
  const [comments, setComments] = useState<ApiComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);

  console.log('comment page');

  const loadComments = async (controller: AbortController) => {
    try {
      setIsLoading(true);

      const data = await commentsApi.getAll(controller.signal);
      setComments(data);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }

      if (err instanceof ApiError) {
        setError(`Ошибка API: ${err.status}`);
      } else {
        setError('Неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: CreateCommentDto) => {
    setIsPosting(true);
    setError(null);

    const optimisticComment: ApiComment = {
      id: Date.now(),
      ...data,
    };

    setComments((prev) => [optimisticComment, ...prev]);

    try {
      const created = await commentsApi.create(data);

      setComments((prev) =>
        prev.map((c) => (c.id === optimisticComment.id ? created : c))
      );
    } catch (err) {
      setComments((prev) => prev.filter((c) => c.id !== optimisticComment.id));

      if (err instanceof ApiError) {
        setError(`Ошибка API: ${err.status}`);
      } else {
        setError('Не удалось создать комментарий');
      }
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    loadComments(controller);

    return () => controller.abort();
  }, []);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Комментарии</h1>

      <AddCommentForm onSubmit={handleCreate} isLoading={isPosting} />

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
