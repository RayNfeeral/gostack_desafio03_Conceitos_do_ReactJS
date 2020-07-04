import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: `url ${Date.now()}`,
      techs: [`${Date.now()}`]
    }).then(response => {
      setRepositories([...repositories, response.data])
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {
      const update = repositories.filter(repository => repository.id !== id)
      setRepositories(update)
    }).catch(error => alert(error))
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
          repositories.map(repository => (
            <li key={repository.id} >
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
