import React from 'react';
import { Repository } from '../types';

interface Props {
    repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
    return (
        <div style={{ display: 'grid', gap: '1rem' }}>
            {repositories.map((repo) => (
                <div
                    key={repo.id}
                    style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '1rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'transform 0.2s',
                    }}
                >
                    <h2 style={{ marginBottom: '0.5rem' }}>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#0366d6', textDecoration: 'none' }}
                        >
                            {repo.name}
                        </a>
                    </h2>
                    {repo.description && <p>{repo.description}</p>}
                    <p>
                        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RepositoryList;

