'use client';

import React from 'react';
import { Repository } from '../types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import GitHubIcon from '@mui/icons-material/GitHub';

interface Props {
  repositories: Repository[];
}

const RepositoryList: React.FC<Props> = ({ repositories }) => {
  if (repositories.length === 0) {
    return <Typography component="div" variant="body1">No repositories found.</Typography>;
  }

  return (
    <List component="ul" sx={{ width: '100%' }}>
      {repositories.map((repo) => (
        <React.Fragment key={repo.id}>
          <ListItem component="li" alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>
                <GitHubIcon />
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <MuiLink
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  {repo.name}
                </MuiLink>
              }
            />
            <Box sx={{ ml: 2, flex: 1 }}>
              {repo.description && (
                <Typography
                  component="div"
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {repo.description}
                </Typography>
              )}

              <Box component="div" sx={{ display: 'flex', gap: 2 }}>
                <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarIcon fontSize="small" color="action" />
                  <Typography component="span" variant="body2" color="text.secondary">
                    {repo.stargazers_count}
                  </Typography>
                </Box>

                <Box component="div" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CallSplitIcon fontSize="small" color="action" />
                  <Typography component="span" variant="body2" color="text.secondary">
                    {repo.forks_count}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default RepositoryList;


