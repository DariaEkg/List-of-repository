import React from 'react';
import useRepositories from '../hooks/useRepositories';

export default function RepositorySearch({ username }: { username: string }) {
  const { repositories, loading, error, searchQuery, setSearchQuery } = useRepositories(username);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search repositories"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
