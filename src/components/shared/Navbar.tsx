'use client';
import { AppBar, Toolbar, Typography, IconButton, TextField, Box, Tooltip, Menu, MenuItem } from "@mui/material";
import { Favorite as FavoriteIcon, ShoppingCart as ShoppingCartIcon, AccountCircle as AccountCircleIcon, Compare as CompareIcon } from "@mui/icons-material";
import { useState, MouseEvent } from "react";

const Navbar = () => {
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);

  const handleCartClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleAccountClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElCart(null);
    setAnchorElAccount(null);
  };

  return (
    <AppBar position="static" sx={{ boxShadow: "none", bgcolor: "transparent" }}>
      <Toolbar sx={{ justifyContent: "space-between", display: "flex", alignItems: "center", height:'120px' }}>
        
        {/* Left-side: Company Name */}
        <Typography variant="h6" sx={{ color: "#7E7E7E" }}>
          IT Bangladesh
        </Typography>

        {/* Center: Search Field (only visible on large screens) */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search products..."
            size="small"
            sx={{
              maxWidth: "600px",
              width: "100%",
              bgcolor: "#f5f5f5",
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />
        </Box>

        {/* Right-side Icons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Compare Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Compare">
              <IconButton sx={{ color: "#7E7E7E"}}>
                <CompareIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: "#7E7E7E", display: { xs: "none", lg: "block" } }}
            >
              Compare
            </Typography>
          </Box>

          {/* Wishlist Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Wishlist">
              <IconButton sx={{ color: "#7E7E7E" }}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: "#7E7E7E", display: { xs: "none", lg: "block" } }}
            >
              Wishlist
            </Typography>
          </Box>

          {/* Cart Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="View Cart">
              <IconButton sx={{ color: "#7E7E7E" }} onClick={handleCartClick}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: "#7E7E7E", display: { xs: "none", lg: "block" } }}
            >
              Cart
            </Typography>
            <Menu anchorEl={anchorElCart} open={Boolean(anchorElCart)} onClose={handleCloseMenu}>
              <MenuItem>Cart Item 1</MenuItem>
              <MenuItem>Cart Item 2</MenuItem>
              <MenuItem>Cart Item 3</MenuItem>
            </Menu>
          </Box>

          {/* Account Icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="Account">
              <IconButton sx={{ color: "#7E7E7E" }} onClick={handleAccountClick}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ color: "#7E7E7E", display: { xs: "none", lg: "block" } }}
            >
              Account
            </Typography>
            <Menu anchorEl={anchorElAccount} open={Boolean(anchorElAccount)} onClose={handleCloseMenu}>
              <MenuItem>Sign In</MenuItem>
              <MenuItem>Sign Up</MenuItem>
              <MenuItem>My Account</MenuItem>
              <MenuItem>Order Tracking</MenuItem>
              <MenuItem>My Wishlist</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
