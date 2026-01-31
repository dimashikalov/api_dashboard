import { useEffect } from 'react';
import './App.css';
import { rickAndMortyApi } from './shared/api/rickAndMorty.api';

function App() {
  useEffect(() => {
    const controller = new AbortController();

    rickAndMortyApi
      .getCharacters({ name: 'Rick' })
      .then(console.log)
      .catch(console.error);

    // отмена запроса
    return controller.abort();
  }, []);

  return <>Hello</>;
}

export default App;
