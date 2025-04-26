"use client"

import RepositoryList from '@/components/RepositoryList';
import { Repository } from '@/types';
import { useState } from 'react';
import useSWR from 'swr';
import { Typography, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const HomePage = () => {
    const [username, setUsername] = useState('dariaekg');
    const { data, error, isLoading } = useSWR<Repository[]>(`https://api.github.com/users/${username}/repos`, fetcher);

    return (
        <main style={{ padding: '1rem' }}>
            <Typography variant="h3" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 700, marginBottom: 2 }}>
                My GitHub Repositories
            </Typography>
            <TextField
                label="GitHub Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                sx={{ marginBottom: 3, fontFamily: 'Roboto, sans-serif' }}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  
            />
            <HomePageContent repositories={data ?? []} isLoading={isLoading} error={error} />
        </main>
    );
};

const HomePageContent = ({ repositories, isLoading, error }: HomePageContentProps) => {
    if (isLoading) {
        return <p>Loading repositories...</p>;
    }

    if (error != null) {
        return <p style={{ color: 'red' }}>Error: {error.message}</p>;
    }

    return <RepositoryList repositories={repositories} />;


}

type HomePageContentProps = {
    repositories: Repository[];
    isLoading: boolean;
    error: Error | null;
}

const fetcher = (url: string) => fetch(url).then((res) => {
    if (!res.ok) {
        throw new Error('Failed to fetch repositories')
    }
    return res.json() as Promise<Repository[]>
});

export default HomePage;