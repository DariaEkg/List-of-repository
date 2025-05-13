'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Typography,
  Input,
  Box,
  FormLabel,
  FormControl,
  Sheet,
} from '@mui/joy';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';

const RepositoryPage = () => {
  const { query } = useRouter();
  const { id } = query;

  const [searchTerm, setSearchTerm] = useState('');

  const repository = {
    id,
    name: `Repo ${id}`,
    description: `Detailed description of repo ${id}`,
    stars: 100,
    forks: 50,
  };

  return (
    <Sheet sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography level="h2" fontWeight="lg" mb={1}>
        {repository.name}
      </Typography>

      <Typography level="body-md" mb={2} color="neutral">
        {repository.description}
      </Typography>

      <FormControl size="lg" sx={{ my: 3 }}>
        <FormLabel>Search Repositories</FormLabel>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          startDecorator={<SearchIcon />}
          sx={{ borderRadius: 'lg' }}
        />
      </FormControl>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
        <StarIcon fontSize="small" />
        <Typography level="body-sm" color="neutral">
          {repository.stars} Stars
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
        <CallSplitIcon fontSize="small" />
        <Typography level="body-sm" color="neutral">
          {repository.forks} Forks
        </Typography>
      </Box>
    </Sheet>
  );
};

export default RepositoryPage;
