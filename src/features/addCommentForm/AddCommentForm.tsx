import { useState } from 'react';
import './styles.css';
import type { CreateCommentDto } from '@/shared/api/jsonPlaceholder.api';

interface Props {
  onSubmit: (data: CreateCommentDto) => void;
  isLoading: boolean;
}

export const AddCommentForm = ({ onSubmit, isLoading }: Props) => {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !body.trim()) return;

    onSubmit({
      postId: 1,
      name,
      body,
    });

    setName('');
    setBody('');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Имя</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-field">
        <label htmlFor="comment">Комментарий</label>
        <textarea
          id="comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        Отправить
      </button>
    </form>
  );
};
