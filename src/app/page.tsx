'use client';

import { useState, useEffect } from "react";
import { Repository } from "@/types";
import {
  Typography,
  CircularProgress,
  Sheet,
  Box,
  Container,
} from '@mui/joy';
import RepositoryList from "@/components/RepositoryList";
import SearchInput from "@/components/SearchInput";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const userResponse = await fetch(`https://api.github.com/users/${query}`);
        if (userResponse.ok) {
          const reposResponse = await fetch(`https://api.github.com/users/${query}/repos`);
          if (!reposResponse.ok) throw new Error("Failed to fetch user repositories");
          const reposData = await reposResponse.json();
          setRepositories(reposData);
        } else {
          const searchResponse = await fetch(
            `https://api.github.com/search/repositories?q=${query}+in:name`
          );
          if (!searchResponse.ok) throw new Error("Failed to search repositories");
          const searchData = await searchResponse.json();
          setRepositories(searchData.items);
        }
      } catch (err) {
        setError((err as Error).message);
        setRepositories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = () => {
    setQuery(inputValue.trim());
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Sheet
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 'md',
          bgcolor: 'background.surface',
        }}
      >
        <Typography level="h3" fontWeight="lg" mb={2}>
          GitHub Repositories Search
        </Typography>

        <SearchInput
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSearch={handleSearch}
        />

        <Box mt={3}>
          {loading && <CircularProgress />}
          {error && (
            <Typography color="danger" level="body-md">
              {error}
            </Typography>
          )}
          {!loading && !error && <RepositoryList repositories={repositories} />}
        </Box>
      </Sheet>
    </Container>
  );
}

