import LockIcon from '@mui/icons-material/Lock';
import { Avatar, Box, Card, Theme } from '@mui/material';
import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        '.RaLogin-card': {
          position: 'relative',
          zIndex: 1,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        background:
          'url(https://img.freepik.com/free-vector/digital-technology-background-vector-with-hexagon-pattern-white-tone_53876-110878.jpg?t=st=1720584368~exp=1720587968~hmac=dff5463e7e4d0d9b9c6f8495d73c6beaa530de46440fb475cadae7e2a3049063&w=1480)',
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Card
        sx={{
          position: 'relative',
          zIndex: 1,
          minWidth: 300,
          marginTop: '6em',
        }}
      >
        <Box
          sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Avatar
            sx={(theme: Theme) => ({
              backgroundColor: theme.palette.grey['500'],
            })}
          >
            <LockIcon />
          </Avatar>
        </Box>
        <Box
          paddingX={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
          position="relative"
        >
          {children}
        </Box>
      </Card>
    </Box>
  );
};

export default Container;
