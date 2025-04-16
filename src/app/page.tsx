"use client"

import RepositoryList from '@/components/RepositoryList';
import useRepositories from '@/hooks/useRepositories';

const HomePage = () => {
  const { repositories, loading, error } = useRepositories('DariaEkg');

  if (loading) {
      return <p>Loading repositories...</p>;
  }

  if (error) {
      return <p style={{ color: 'red' }}>Error: {error.message}</p>;
  }

  return (
      <main style={{ padding: '1rem' }}>
          <h1>My GitHub Repositories</h1>
          <RepositoryList repositories={repositories} />
      </main>
  );
};

export default HomePage;