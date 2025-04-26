import React from 'react';
import { Repository } from '../types';
import { Box, Typography, Card, CardContent, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import { useTheme } from '@mui/material/styles';

interface Props {
  repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
  const theme = useTheme();

  return (
    <Box display="grid" gap={3}>
      {repositories.map((repo) => (
        <Card
          key={repo.id}
          sx={{
            borderRadius: 2,
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <Link
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ color: theme.palette.text.primary }}
              >
                {repo.name}
              </Link>
            </Typography>

            {repo.description && (
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {repo.description}
              </Typography>
            )}

            <Box display="flex" alignItems="center" gap={2} mt={1}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <StarIcon color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {repo.stargazers_count}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <CallSplitIcon color="action" fontSize="small" />
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
