'use client';

import React from 'react';
import { Box, Typography, Grid, Paper, Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const DashboardPage = () => {
    const theme = useTheme();

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: '1200px', margin: '0 auto' }}>
            {/* Dashboard Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: { xs: 2, md: 4 },
                    padding: { xs: 2, md: 3 },
                    backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    color: theme.palette.primary.contrastText,
                    borderRadius: '10px',
                }}
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Typography variant="h4">Welcome to Your Dashboard</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                        borderRadius: '15px', // Rounded button
                        padding: '10px 20px',
                        color: '#fff', // Text color
                        fontSize: '15px',
                        fontWeight: 'bold', // Initial shadow
                        
                      }}
                >
                    Action Button
                </Button>
            </Box>

            {/* Dashboard Grid Content */}
            <Grid container spacing={3}>
                {Array.from(Array(6).keys()).map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item}>
                        {/* Animated Card */}
                        <Paper
                            component={motion.div}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            sx={{
                                padding: { xs: 2, md: 3 },
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: '10px',
                                boxShadow: theme.shadows[3],
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Card Title {item + 1}
                            </Typography>
                            <Typography variant="body1">
                                This is a dashboard card. You can display information here or have charts and other
                                widgets.
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default DashboardPage;
