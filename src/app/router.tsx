import { createBrowserRouter } from 'react-router-dom';
import CommentsPage from '../pages/CommentsPage';
import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: 'comments',
    Component: CommentsPage,
  },
]);
