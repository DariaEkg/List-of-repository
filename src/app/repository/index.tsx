'use client';

import { useParams } from 'next/navigation';
import {
  Typography,
  Box,
  Paper,
  Container,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';

const RepositoryPage = () => {
  const params = useParams();
  const id = params.id as string;

  const repository = {
    id,
    name: `Repo ${id}`,
    description: `Detailed description of repo ${id}`,
    stars: 100,
    forks: 50,
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {repository.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          {repository.description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
          <StarIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {repository.stars} Stars
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <CallSplitIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {repository.forks} Forks
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RepositoryPage;
