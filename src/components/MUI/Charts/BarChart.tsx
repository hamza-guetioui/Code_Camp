"use client";
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Your dataset representing monthly rainfall in Seoul
const dataset = [
  { month: 'January', seoul: 100 },
  { month: 'February', seoul: 80 },
  { month: 'March', seoul: 120 },
  { month: 'April', seoul: 140 },
  { month: 'May', seoul: 160 },
  { month: 'June', seoul: 180 },
];

export default function BasicBars() {
  return (

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: '#F8FAFC',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom   sx={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#475569' }}>
          Monthly Rainfall in Seoul
        </Typography>
        <Typography variant="body1" gutterBottom  sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
          This bar chart displays the monthly rainfall in Seoul for the first half of the year.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            series={[{ dataKey: 'seoul', label: 'Rainfall (mm)' }]}
            width={500}
            height={300}
            borderRadius={10}
          />
        </Box>
      </Paper>

  );
}