'use client';

import React from 'react';
import { Repository } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link as MuiLink,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';

interface Props {
  repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
  return (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {repositories.map((repo) => (
        <Card
          key={repo.id}
          variant="outlined"
          sx={{
            borderRadius: 2,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 3,
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <MuiLink
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                underline="hover"
                sx={{ textDecoration: 'none' }}
              >
                {repo.name}
              </MuiLink>
            </Typography>

            {repo.description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {repo.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <StarIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {repo.stargazers_count}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CallSplitIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {repo.forks_count}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default RepositoryList;