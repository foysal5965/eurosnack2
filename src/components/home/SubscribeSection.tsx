'use client';

import React from 'react';
import { Box, Typography, TextField, Button, useMediaQuery, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import subscribeImage from '@/assets/subscribe_section_banner_image1.png';

const SubscribeSection = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.6, duration: 0.6 } },
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        backgroundImage: 'linear-gradient(45deg, #A5D6A7, #C8E6C9)',
        borderRadius: '8px',
        padding: 4,
        overflow: 'hidden',
        margin: 4,
        textAlign: 'center',
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left Section: Text and Email Form */}
        <Grid
          item
          xs={12}
          md={6}
          component={motion.div}
          variants={textVariants}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            justifyContent: 'center',
            maxWidth: '500px',
          }}
        >
          <Typography
            variant={isSmallScreen ? 'h4' : 'h3'}
            sx={{ fontWeight: 'bold', color: '#253D4E', mb: 2 }}
          >
            Stay home & get your daily needs from our shop
          </Typography>

          <Box
            component={motion.form}
            variants={formVariants}
            sx={{
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              gap: 2,
              alignItems: 'center',
            }}
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed successfully!');
            }}
          >
            <TextField
              placeholder="Enter your email"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                backgroundColor: '#fff',
                borderRadius: 1,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                textTransform: 'none',
                padding: '0.6rem 2rem',
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>

        {/* Right Section: Image */}
        <Grid
          item
          xs={12}
          md={6}
          component={motion.div}
          variants={imageVariants}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={subscribeImage}
            alt="Subscribe Section Image"
            width={500}
            height={300}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
            priority
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SubscribeSection;
