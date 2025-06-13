import React, { useState, useEffect } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  InputBase,
  Box,
  alpha,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDebounce } from '@/hooks/useDebounce';

interface AppBarProps {
  onSearch: (query: string) => void;
}

export default function AppBar({ onSearch }: AppBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const isExpanded = isFocused || searchValue.length > 0;

  return (
    <MuiAppBar 
      position="fixed" 
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        px: 2,
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: '64px', position: 'relative' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: 'text.primary',
              pl: 1,
              flexShrink: 0,
              width: '200px',
            }}>
              <GitHubIcon sx={{ fontSize: 28 }} />
              <Box sx={{ 
                typography: 'h6',
                fontWeight: 600,
                display: { xs: 'none', sm: 'block' },
                ml: 1,
              }}>
                GitHub Search
              </Box>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: isExpanded ? 'calc(100% - 200px)' : '30%',
                transition: 'width 0.3s ease-in-out',
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
                  width: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                <SearchIcon 
                  sx={{ 
                    color: 'text.secondary',
                    mr: 1,
                    fontSize: 20,
                    flexShrink: 0,
                  }} 
                />
                <InputBase
                  placeholder="Search repositories..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  sx={{
                    flex: 1,
                    color: 'text.primary',
                    minWidth: 0,
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
      </Container>
    </MuiAppBar>
  );
} 