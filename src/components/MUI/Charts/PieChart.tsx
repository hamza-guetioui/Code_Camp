"use client"
import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Define a type for pie data items with id as a string.
type PieValue = {
  id?: string;
  label: string;
  value: number;
};

// Example dataset for desktop OS usage with string ids.
const desktopOS: PieValue[] = [
  { id: "1", label: 'Windows', value: 60 },
  { id: "2", label: 'macOS', value: 25 },
  { id: "3", label: 'Linux', value: 10 },
  { id: "4", label: 'Other', value: 5 },
];

// Adjusted valueFormatter function to accept the correct parameter type.
const valueFormatter = (item: { value: number }) => {
  return item ? `${item.value}%` : 'N/A';
};

const size = {
  width: 400,
  height: 200,
};

const data = {
  data: desktopOS,
  valueFormatter,
};

export default function PieArcLabel() {
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
      <Typography variant="h5" component="h1" gutterBottom sx={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#475569' }}>
        Desktop OS Usage
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#94a3b8' }}>
        This pie chart displays the market share of various desktop operating systems.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <PieChart
          series={[
            {
              arcLabel: (item: { value: number }) => `${item.value}%`,
              arcLabelMinAngle: 35,
              arcLabelRadius: '60%',
              ...data,
            },
          ]}
          sx={{
            // Make the arc labels bold.
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: 'bold',
            },
          }}
          {...size}
        />
      </Box>
    </Paper>
  );
}
