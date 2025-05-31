'use client';

import { Box } from '@mui/material';
import RepositorySearch from '@/components/RepositorySearch';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}>
      <RepositorySearch />
    </Box>
  );
}
