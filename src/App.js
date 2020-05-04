import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    loadRepos();
  }, []);
  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "React JS",
      url: "https://github.com/facebook/react",
      techs: ["JavaScript", "HTML", "CSS", "C++", "TypesCript", "CoffeeScript"],
    });
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRepos = repositories.filter((repo) => repo.id !== id);
    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
