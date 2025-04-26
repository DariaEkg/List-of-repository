'use client';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputAdornment, OutlinedInput, FormControl, InputLabel, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useTheme } from '@mui/material/styles';

const RepositoryPage = () => {
    const { query } = useRouter();
    const { id } = query;
    const theme = useTheme();

    const [searchTerm, setSearchTerm] = useState('');

    const repository = {
        id,
        name: `Repo ${id}`,
        description: `Detailed description of repo ${id}`,
        stars: 100,
        forks: 50,
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h3" color="text.primary" fontWeight="bold" gutterBottom>
                {repository.name}
            </Typography>

            <Typography variant="body1" color="text.secondary" gutterBottom>
                {repository.description}
            </Typography>

            <FormControl fullWidth sx={{ my: 3 }}>
                <InputLabel
                    htmlFor="search-repositories"
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        px: 0.5,
                        color: theme.palette.text.primary,
                    }}
                >
                    Search Repositories
                </InputLabel>
                <OutlinedInput
                    id="search-repositories"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                    }
                    label="Search Repositories"
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.divider,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                        },
                        input: {
                            color: theme.palette.text.primary,
                        },
                    }}
                />
            </FormControl>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <StarIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                    {repository.stars} Stars
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <CallSplitIcon color="action" />
                <Typography variant="body2" color="text.secondary">
                    {repository.forks} Forks
                </Typography>
            </Box>
        </Box>
    );
};

export default RepositoryPage;