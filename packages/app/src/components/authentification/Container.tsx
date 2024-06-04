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
          'url(https://aadcdn.msauthimages.net/81d6b03a-qoi1sj0b-jedyqhmr1ee2lkugok698aiatxhqseod0a/logintenantbranding/0/illustration?ts=637291661041084892)',
        '&:after': {
          content: '""',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.55)',
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
