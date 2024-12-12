'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { ShoppingCart, PendingActions, CheckCircle, AttachMoney } from '@mui/icons-material';

const DashboardPage = () => {
  const stats = [
    { title: 'Total Orders', value: 120, icon: <ShoppingCart fontSize="large" color="primary" />, color: '#3f51b5' },
    { title: 'Pending Orders', value: 15, icon: <PendingActions fontSize="large" color="warning" />, color: '#ffa726' },
    { title: 'Delivered Orders', value: 105, icon: <CheckCircle fontSize="large" color="success" />, color: '#66bb6a' },
    { title: 'Total Spent', value: '$8,450', icon: <AttachMoney fontSize="large" color="secondary" />, color: '#ab47bc' },
  ];

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
      {/* Page Title */}
      <Typography
        variant="h4"
        component={motion.h4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Dashboard
      </Typography>

      {/* Statistics Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              sx={{
                backgroundColor: stat.color,
                color: '#fff',
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>{stat.icon}</Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Recent Activities
      </Typography>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          backgroundColor: '#fff',
          padding: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>
          No recent activities to display.
        </Typography>
      </Box>
    </Container>
  );
};

export default DashboardPage;
