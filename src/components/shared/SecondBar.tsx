'use client';

import { useState, MouseEvent } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon, HeadsetMic as HeadsetMicIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

const SecondBar = () => {
  const [anchorElDropdown, setAnchorElDropdown] = useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);

  const handleDropdownClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElDropdown(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorElDropdown(null);
  };

  const handleCartClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorElCart(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#f8f9fa", color: "#000", padding: "0 16px" }}>
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", display: "flex" }}>
        {/* Left Section: Menu Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {["Trending Categories", "Home", "Shops", "Brands", "Categories", "Others", "Contact Us"].map((item, index) => (
            <Box key={index} sx={{ position: "relative", display: "flex", alignItems: "center", gap: 0.5 }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Typography
                  onClick={(event) => ["Trending Categories", "Brands", "Categories", "Others"].includes(item) && handleDropdownClick(event)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: 500,
                    "&:hover": { color: "#4caf50" },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {item}
                  {["Trending Categories", "Brands", "Categories", "Others"].includes(item) && (
                    <ExpandMoreIcon sx={{ fontSize: "1rem", marginLeft: "4px" }} />
                  )}
                </Typography>
              </motion.div>
            </Box>
          ))}
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorElDropdown}
          open={Boolean(anchorElDropdown)}
          onClose={handleDropdownClose}
        >
          {["Option 1", "Option 2", "Option 3"].map((option, idx) => (
            <MenuItem key={idx} onClick={handleDropdownClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>

        {/* Right Section: Icons and Contact */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Cart Icon with Tooltip */}
          <Tooltip title="Cart">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <IconButton onClick={handleCartClick}>
                <ShoppingCartIcon sx={{ color: "#4caf50" }} />
              </IconButton>
            </motion.div>
          </Tooltip>
          <Menu
            anchorEl={anchorElCart}
            open={Boolean(anchorElCart)}
            onClose={handleCartClose}
          >
            {["Cart Item 1", "Cart Item 2", "Cart Item 3"].map((item, idx) => (
              <MenuItem key={idx} onClick={handleCartClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>

          {/* Headphone Icon */}
          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 200 }}>
            <IconButton>
              <HeadsetMicIcon sx={{ color: "#4caf50" }} />
            </IconButton>
          </motion.div>

          {/* Mobile Number */}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            +880 1234 567890
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default SecondBar;
