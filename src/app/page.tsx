"use client";

import { useState, useEffect } from "react";
import { Repository } from "@/types";
import {
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RepositoryList from "@/components/RepositoryList";

export default function HomePage() {
  const [inputValue, setInputValue] = useState("dariaekg");
  const [query, setQuery] = useState("dariaekg");
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
    <main style={{ padding: "1rem" }}>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
        GitHub Repositories Search
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by username or repository name"
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && <RepositoryList repositories={repositories} />}
    </main>
  );
}