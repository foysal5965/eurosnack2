'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useGetMYProfileQuery } from '@/redux/api/myProfile';

const AccountDetailsPage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    streetNo: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Details:', formValues);
  };
  const query ={}
const {data}= useGetMYProfileQuery({...query})

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const buttonHover = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
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
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: '#fff',
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
        Account Details
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', mt: 2 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              type="text"
              value={formValues.postalCode}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Street No"
              name="streetNo"
              value={formValues.streetNo}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formValues.dateOfBirth}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
              variant="outlined"
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mobile"
              name="mobile"
              type="tel"
              value={formValues.mobile}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          component={motion.button}
          variants={buttonHover}
          whileHover="hover"
          whileTap="tap"
          variant="contained"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: '1rem',
            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
            color: '#fff',
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default AccountDetailsPage;
