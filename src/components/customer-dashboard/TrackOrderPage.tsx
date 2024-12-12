'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { motion } from 'framer-motion';

const TrackOrderPage = () => {
  const [orderCode, setOrderCode] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleTrackOrder = () => {
    setError('');
    setSuccess('');
    if (!orderCode || !orderEmail) {
      setError('Both fields are required.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (orderCode === '12345' && orderEmail === 'test@example.com') {
        setSuccess('Your order is on the way and will be delivered soon.');
      } else {
        setError('Invalid order code or email. Please try again.');
      }
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <Container
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      maxWidth="sm"
      sx={{
        py: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        Track Your Order
      </Typography>

      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        sx={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          boxShadow: 2,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 2, color: 'text.secondary', textAlign: 'center' }}
        >
          Orders tracking
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 4, color: 'text.secondary', textAlign: 'center' }}
        >
          To track your order please enter your OrderID in the box below and
          press "Track" button. This was given to you on your receipt and in the
          confirmation email you should have received.
        </Typography>

        <TextField
          fullWidth
          label="Order Code"
          variant="outlined"
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Order Email"
          variant="outlined"
          value={orderEmail}
          onChange={(e) => setOrderEmail(e.target.value)}
          margin="normal"
          required
        />
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {success}
          </Alert>
        )}
        <Box mt={3} textAlign="center">
          <Button
            component={motion.button}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleTrackOrder}
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Track Order'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TrackOrderPage;
