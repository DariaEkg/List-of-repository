'use client';

import React from 'react';
import { Repository } from '../types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Link,
} from '@mui/joy';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';

interface Props {
  repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
  return (
    <Box display="grid" gap={3}>
      {repositories.map((repo) => (
        <Card
          key={repo.id}
          variant="outlined"
          sx={{
            borderRadius: 'lg',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 'lg',
            },
          }}
        >
          <CardContent>
            <Typography level="h4" gutterBottom>
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                overlay
              >
                {repo.name}
              </Link>
            </Typography>

            {repo.description && (
              <Typography level="body-sm" color="neutral" gutterBottom>
                {repo.description}
              </Typography>
            )}

            <Box display="flex" alignItems="center" gap={2} mt={1}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <StarIcon fontSize="small" />
                <Typography level="body-sm" color="neutral">
                  {repo.stargazers_count}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <CallSplitIcon fontSize="small" />
                <Typography level="body-sm" color="neutral">
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