import { useState, useEffect } from 'react';
import { Repository } from '../types';

export default function useRepositories(username: string) {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!response.ok) throw new Error('Failed to fetch repositories');
                const data = await response.json();
                setRepositories(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [username]);

    return { repositories, loading, error };
}
