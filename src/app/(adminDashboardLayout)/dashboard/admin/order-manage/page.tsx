'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
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

interface Order {
  id: string;
  customer: string;
  totalAmount: string;
  orderDate: string;
  status: string;
}

const allOrders: Order[] = [
  { id: '1', customer: 'John Doe', totalAmount: '$120.00', orderDate: '2024-01-05', status: 'Completed' },
  { id: '2', customer: 'Jane Smith', totalAmount: '$85.50', orderDate: '2024-01-02', status: 'Pending' },
  { id: '3', customer: 'Robert Brown', totalAmount: '$240.00', orderDate: '2023-12-25', status: 'Shipped' },
];

const columns = [
  { id: 'customer', label: 'Customer' },
  { id: 'totalAmount', label: 'Total Amount' },
  { id: 'orderDate', label: 'Order Date' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions' }, // Action buttons column
];

const OrderManagementPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(5);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewOrder = (order: Order) => {
    setViewOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setViewOrder(null);
  };

  const handleDeleteOrder = (id: string) => {
    const index = allOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      allOrders.splice(index, 1);
    }
  };

  // Filter orders based on search query
  const filteredOrders = allOrders.filter((order) =>
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered orders
  const currentOrders = filteredOrders.slice(
    (page - 1) * ordersPerPage,
    page * ordersPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search by Customer Name"
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
            data={currentOrders.map(order => ({
              ...order,
              actions: (
                <>
                  <IconButton onClick={() => handleViewOrder(order)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteOrder(order.id)}>
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
          count={Math.ceil(filteredOrders.length / ordersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>

      {/* Dialog for viewing order details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          {viewOrder && (
            <Box>
              <Typography variant="body1"><strong>Customer:</strong> {viewOrder.customer}</Typography>
              <Typography variant="body1"><strong>Total Amount:</strong> {viewOrder.totalAmount}</Typography>
              <Typography variant="body1"><strong>Order Date:</strong> {viewOrder.orderDate}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {viewOrder.status}</Typography>
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

export default OrderManagementPage;
