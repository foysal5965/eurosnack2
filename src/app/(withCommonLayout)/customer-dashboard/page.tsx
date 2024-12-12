'use client';
import React, { useState } from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Home, ShoppingCart, LocationOn, AccountCircle, Lock, ExitToApp } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '@/lib/Providers/AuthProvider';
import ChangePassword from '@/components/customer-dashboard/ChangePassword';
import AccountDetailsPage from '@/components/customer-dashboard/AccountDetailsPage';
import MyAddressPage from '@/components/customer-dashboard/MyAddressPage';
import TrackOrderPage from '@/components/customer-dashboard/TrackOrderPage';
import OrdersPage from '@/components/customer-dashboard/OrdersPage';
import DashboardPage from '@/components/customer-dashboard/DashboardPage';

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#f0f0f0', // Highlight on hover
          },
        },
      },
    },
  },
});

const CustomerDashboard = () => {
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const {logout}= useAuth()
  // Media query to detect screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // For medium and small screens

  // Handle menu item click
  const handleMenuItemClick = (item: string) => {
    if (item === 'logout') {
        logout(); // Trigger logout when "Logout" is clicked
      }
    setSelectedItem(item);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" flexDirection={isSmallScreen ? 'column' : 'row'}> {/* Stack sidebar on top in small screen */}
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            width: isSmallScreen ? '100%' : '250px', // Full width on small screen
            backgroundColor: 'transparent', // Removed the background
            borderRadius: '12px', // Semi-rounded corners
            border: '1px solid #ddd', // Border for sidebar
            marginTop: '20px', // Top margin for spacing
            marginBottom: '20px', // Bottom margin for spacing
            marginLeft:'20px',
            zIndex: isSmallScreen ? 1000 : 'auto', // Ensure sidebar stays on top in small screens
          }}
        >
          <Box sx={{ padding: '20px' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('dashboard')} 
                  sx={{ borderRadius: '8px' }} // Semi-rounded for each menu item
                >
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('orders')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <ShoppingCart />
                  </ListItemIcon>
                  <ListItemText primary="Orders" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('trackOrder')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary="Track Order" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('myAddress')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText primary="My Address" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('accountDetails')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Account Details" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('changePassword')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => handleMenuItemClick('logout')} 
                  sx={{ borderRadius: '8px' }}
                >
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Logout" sx={{ color: '#7E7E7E' }} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </motion.div>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, padding: 3, marginTop: isSmallScreen ? '80px' : '0' }}> {/* Add margin for small screens to avoid overlap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
           
            <Box
              sx={{
                padding: '20px',
                borderRadius: 2,
                backgroundColor: '#fff',
                
              }}
            >
              {selectedItem === 'dashboard' && (
                <DashboardPage/>
              )}

              {selectedItem === 'orders' && (
                <OrdersPage/>
              )}

              {selectedItem === 'trackOrder' && (
                <TrackOrderPage/>
              )}

              {selectedItem === 'myAddress' && (
                <MyAddressPage/>
              )}

              {selectedItem === 'accountDetails' && (
                <AccountDetailsPage/>
              )}

              {selectedItem === 'changePassword' && (
                <ChangePassword/>
              )}

              {selectedItem === 'logout' && (
                <Typography variant="body1">You have been logged out. Please log in again to continue.</Typography>
              )}
            </Box>
          </motion.div>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CustomerDashboard;
