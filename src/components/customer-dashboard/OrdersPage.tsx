'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Visibility, Delete } from '@mui/icons-material';

const orders = [
  { id: 1, orderCode: 'ORD12345', date: '2024-12-01', status: 'Delivered', total: '$50.00' },
  { id: 2, orderCode: 'ORD12346', date: '2024-12-02', status: 'Pending', total: '$30.00' },
  { id: 3, orderCode: 'ORD12347', date: '2024-12-03', status: 'Canceled', total: '$20.00' },
];

const statusColors: Record<string, 'success' | 'warning' | 'error'> = {
  Delivered: 'success',
  Pending: 'warning',
  Canceled: 'error',
};

const OrdersPage = () => {
  const [orderList, setOrderList] = useState(orders);

  const handleDeleteOrder = (id: number) => {
    setOrderList(orderList.filter((order) => order.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  return (
    <Container
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      maxWidth="lg"
      sx={{ py: 6 }}
    >
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        My Orders
      </Typography>

      <TableContainer
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        sx={{ backgroundColor: '#fff', boxShadow: 2, borderRadius: 2 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">SL</TableCell>
              <TableCell align="center">Order Code</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderList.map((order, index) => (
              <TableRow
                key={order.id}
                component={motion.tr}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{order.orderCode}</TableCell>
                <TableCell align="center">{order.date}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={order.status}
                    color={statusColors[order.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{order.total}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="error"
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orderList.length === 0 && (
          <Typography
            variant="body1"
            align="center"
            sx={{ py: 3, color: 'text.secondary' }}
          >
            No orders found.
          </Typography>
        )}
      </TableContainer>
    </Container>
  );
};

export default OrdersPage;
