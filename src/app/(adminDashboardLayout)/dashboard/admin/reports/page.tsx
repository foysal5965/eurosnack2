'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  TextField,
  Pagination,
  IconButton,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility } from '@mui/icons-material';
import AnimatedTable from '@/components/tables/AnimatedTable';

interface Report {
  id: string;
  title: string;
  category: string;
  date: string;
  value: string;
}

const allReports: Report[] = [
  { id: '1', title: 'Sales Report', category: 'Sales', date: '2024-01-10', value: '$5,000' },
  { id: '2', title: 'Customer Engagement', category: 'Customers', date: '2024-01-05', value: '85%' },
  { id: '3', title: 'Revenue Breakdown', category: 'Revenue', date: '2024-01-01', value: '$10,000' },
  { id: '4', title: 'Product Performance', category: 'Products', date: '2023-12-25', value: 'Top 5%' },
  // Add more reports...
];

const summaryReports = [
  { title: 'Total Sales', value: '$50,000', color: '#4caf50' },
  { title: 'Active Customers', value: '1,200', color: '#2196f3' },
  { title: 'Products Sold', value: '2,500', color: '#ff9800' },
  { title: 'Revenue Growth', value: '20%', color: '#f44336' },
];

const columns = [
  { id: 'title', label: 'Title' },
  { id: 'category', label: 'Category' },
  { id: 'date', label: 'Date' },
  { id: 'value', label: 'Value' },
  { id: 'actions', label: 'Actions' },
];

const ReportsPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [reportsPerPage] = useState<number>(5);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Filter reports based on search query
  const filteredReports = allReports.filter((report) =>
    report.title.toLowerCase().includes(search.toLowerCase()) ||
    report.category.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered reports
  const currentReports = filteredReports.slice(
    (page - 1) * reportsPerPage,
    page * reportsPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        {summaryReports.map((summary, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ backgroundColor: summary.color, color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{summary.title}</Typography>
                  <Typography variant="h4">{summary.value}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Search and Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search Reports"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ maxWidth: '400px' }}
        />
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ padding: 2 }}>
          <AnimatedTable
            columns={columns}
            data={currentReports.map(report => ({
              ...report,
              actions: (
                <IconButton onClick={() => console.log(`Viewing report: ${report.title}`)}>
                  <Visibility />
                </IconButton>
              ),
            }))}
          />
        </Paper>
      </motion.div>

      {/* Pagination */}
      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredReports.length / reportsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>
    </Box>
  );
};

export default ReportsPage;
