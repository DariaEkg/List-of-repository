import { useState, useEffect } from 'react';
import { Repository } from '../types';

export default function useRepositories(username: string) {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}/repos`);
                if (!response.ok) throw new Error('Failed to fetch repositories');
                const data = await response.json();
                setRepositories(data);
                setFilteredRepositories(data);  // Инициализируем отфильтрованные репозитории с полным списком
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories();
    }, [username]);

    useEffect(() => {
        // Фильтрация репозиториев по имени, если searchQuery не пустое
        if (searchQuery) {
            setFilteredRepositories(
                repositories.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        } else {
            setFilteredRepositories(repositories);  // Если поиск пустой, показываем все репозитории
        }
    }, [searchQuery, repositories]);

    return { repositories: filteredRepositories, loading, error, searchQuery, setSearchQuery };
}

    /*useEffect(() => {
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
} */
