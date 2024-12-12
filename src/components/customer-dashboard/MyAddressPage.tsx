'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Delete, Edit } from '@mui/icons-material';

const MyAddressPage = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      address: '123 Main Street',
      city: 'New York',
      postalCode: '10001',
      streetNo: '5B',
    },
    {
      id: 2,
      address: '456 Elm Street',
      city: 'Los Angeles',
      postalCode: '90001',
      streetNo: '12A',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    streetNo: '',
  });

  const handleOpen = (address = null) => {
    setEditingAddress(address);
    setNewAddress(address || { address: '', city: '', postalCode: '', streetNo: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAddress({ address: '', city: '', postalCode: '', streetNo: '' });
  };

  const handleSave = () => {
    if (editingAddress) {
      // setAddresses((prev) =>
      //   prev.map((addr) =>
      //     addr.id === editingAddress.id ? { ...editingAddress, ...newAddress } : addr
      //   )
      // );
    } else {
      setAddresses((prev) => [
        ...prev,
        { id: Date.now(), ...newAddress },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id:any) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const cardVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

  return (
    <Container
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      maxWidth="md"
      sx={{
        py: 4,
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
        gutterBottom
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        My Addresses
      </Typography>

      <Grid container spacing={3}>
        {addresses.map((address) => (
          <Grid item xs={12} sm={6} key={address.id}>
            <Card
              component={motion.div}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              sx={{ p: 2, position: 'relative' }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {address.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  City: {address.city}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Postal Code: {address.postalCode}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Street No: {address.streetNo}
                </Typography>
              </CardContent>
              <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                <IconButton color="primary" >
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(address.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            onClick={() => handleOpen()}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variant="contained"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
              color: '#fff',
            }}
          >
            Add New Address
          </Button>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingAddress ? 'Edit Address' : 'Add New Address'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={newAddress.address}
            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
            variant="outlined"
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="City"
            name="city"
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            variant="outlined"
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={newAddress.postalCode}
            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            variant="outlined"
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Street No"
            name="streetNo"
            value={newAddress.streetNo}
            onChange={(e) => setNewAddress({ ...newAddress, streetNo: e.target.value })}
            variant="outlined"
            margin="dense"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyAddressPage;
