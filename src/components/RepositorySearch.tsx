'use client';

import React, { useState, useCallback } from 'react';
import { useRepositorySearch } from '@/hooks/useRepositorySearch';
import {
  Typography,
  CircularProgress,
  Box,
  Container,
  Pagination,
  Paper,
} from '@mui/material';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

export default function RepositorySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { 
    repositories, 
    isLoading, 
    error, 
    totalPages,
    totalCount 
  } = useRepositorySearch(searchQuery, currentPage);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      pt: '80px',
    }}>
      <AppBar onSearch={handleSearch} />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          flex: 1,
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {isLoading && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '200px',
          }}>
            <CircularProgress />
          </Box>
        )}
        
        {error && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 3,
              bgcolor: 'error.light',
              color: 'error.contrastText',
              borderRadius: 2,
            }}
          >
            <Typography>
              {error.message}
            </Typography>
          </Paper>
        )}

        {!isLoading && !error && repositories.length === 0 && searchQuery && (
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 3,
              bgcolor: 'action.hover',
              borderRadius: 2,
            }}
          >
            <Typography color="text.secondary">
              No repositories found
            </Typography>
          </Paper>
        )}

        {!isLoading && !error && repositories.length > 0 && (
          <>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                px: { xs: 1, sm: 2 },
              }}
            >
              Found {totalCount} repositories
            </Typography>
            
            <Box sx={{ 
              display: 'grid',
              gap: 3,
              px: { xs: 1, sm: 2 },
            }}>
              <RepositoryList repositories={repositories} />
              
              {totalPages > 1 && (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: 4,
                  mb: 2,
                }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    size="large"
                    color="primary"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
