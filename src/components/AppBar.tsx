import React, { useState, useEffect } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  InputBase,
  Box,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDebounce } from '@/hooks/useDebounce';

interface AppBarProps {
  onSearch: (query: string) => void;
}

export default function AppBar({ onSearch }: AppBarProps) {
  const [mounted, setMounted] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch, mounted]);

  return (
    <MuiAppBar 
      position="sticky" 
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 2,
          flex: 1,
          maxWidth: 'lg',
          mx: 'auto',
          width: '100%',
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 1,
            color: 'text.primary',
          }}>
            <GitHubIcon sx={{ fontSize: 28 }} />
            <Box sx={{ 
              typography: 'h6',
              fontWeight: 600,
              display: { xs: 'none', sm: 'block' },
            }}>
              GitHub Search
            </Box>
          </Box>

          <Box
            sx={{
              position: 'relative',
              flex: 1,
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
                px: 2,
                py: 1,
                transition: 'all 0.2s',
                '&:hover, &:focus-within': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <SearchIcon 
                sx={{ 
                  color: 'text.secondary',
                  mr: 1,
                  fontSize: 20,
                }} 
              />
              <InputBase
                placeholder="Search repositories..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                sx={{
                  flex: 1,
                  color: 'text.primary',
                  '& .MuiInputBase-input': {
                    py: 1,
                    px: 1,
                    width: '100%',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
} 