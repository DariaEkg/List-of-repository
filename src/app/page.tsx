'use client';

import { Box } from '@mui/material';
import RepositorySearch from '@/components/RepositorySearch';
import { useEffect, useState } from 'react';

export default function HomePage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default',
    }}>
      <RepositorySearch />
    </Box>
  );
}
