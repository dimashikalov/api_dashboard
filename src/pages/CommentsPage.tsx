import { useEffect } from 'react';
import { AddCommentForm } from '@/features/addCommentForm/AddCommentForm';
import { useAppDispatch, useAppSelector } from '@/shared/lib/reduxHooks';
import {
  createComment,
  fetchComments,
} from '@/entities/comments/commentsThunks';

export default function CommentsPage() {
  const dispatch = useAppDispatch();
  const { error, isLoading, comments } = useAppSelector(
    (state) => state.comments
  );

  console.log('comment page');

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>Комментарии</h1>

      <AddCommentForm
        onSubmit={(data) => dispatch(createComment(data))}
        isLoading={isLoading}
      />

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
