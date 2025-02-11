"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function BasicArea() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, px: 2 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #F8FAFC 0%, #ffffff 100%)',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#475569' }}
        >
          Monthly Rainfall in Seoul
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}
        >
          This line chart displays the monthly rainfall in Seoul for the first half of the year.
        </Typography>
        <Box sx={{ width: '100%', mt: 4 }}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={800}
            height={300}
          />
        </Box>
      </Paper>
    </Container>
  );
}
