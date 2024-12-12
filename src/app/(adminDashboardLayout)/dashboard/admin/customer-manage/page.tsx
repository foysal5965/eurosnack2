'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, Delete } from '@mui/icons-material';
import AnimatedTable from '@/components/tables/AnimatedTable';

interface Customer {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  status: string;
}

const allCustomers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', registeredAt: '2024-01-05', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', registeredAt: '2024-01-03', status: 'Inactive' },
  { id: '3', name: 'Robert Brown', email: 'robert.brown@example.com', registeredAt: '2024-01-01', status: 'Active' },
];

const columns = [
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'registeredAt', label: 'Registered At' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' },
];

const CustomerManagementPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [customersPerPage] = useState<number>(5);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewCustomer = (customer: Customer) => {
    setViewCustomer(customer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewCustomer(null);
  };

  const handleDeleteCustomer = (id: string) => {
    const index = allCustomers.findIndex(c => c.id === id);
    if (index !== -1) {
      allCustomers.splice(index, 1);
    }
  };

  // Filter customers based on search query
  const filteredCustomers = allCustomers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered customers
  const currentCustomers = filteredCustomers.slice(
    (page - 1) * customersPerPage,
    page * customersPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search by Name or Email"
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
            data={currentCustomers.map(customer => ({
              ...customer,
              actions: (
                <>
                  <IconButton onClick={() => handleViewCustomer(customer)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCustomer(customer.id)}>
                    <Delete />
                  </IconButton>
                </>
              ),
            }))}
          />
        </Paper>
      </motion.div>

      {/* Pagination */}
      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredCustomers.length / customersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>

      {/* Dialog for viewing customer details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          {viewCustomer && (
            <Box>
              <Typography variant="body1"><strong>Name:</strong> {viewCustomer.name}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {viewCustomer.email}</Typography>
              <Typography variant="body1"><strong>Registered At:</strong> {viewCustomer.registeredAt}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {viewCustomer.status}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerManagementPage;
