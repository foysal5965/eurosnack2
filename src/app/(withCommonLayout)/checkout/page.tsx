'use client'
import { useCartsQuery } from "@/redux/api/cartApi";
import { Box, Button, Divider, Radio, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [coupon, setCoupon] = useState("")
  const shippingCharge = 50; // Example shipping charge
  
const {data:carts, isLoading}= useCartsQuery({})
const total = carts?.data?.totalPrice + shippingCharge;
  const handleCouponApply = () => {
    console.log("Coupon Applied:", coupon);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: 3,
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#f7f7f7",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        component={motion.div}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Already have an account?
        </Typography>
        <Button
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          onClick={() => alert("Redirect to login page")}
        >
          Click here to Login
        </Button>
        <Typography variant="body1" textAlign="center">
          Or
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          onClick={() => alert("Redirect to sign-up page")}
        >
          Create a New Account
        </Button>
      </Box>

      {/* Right Section */}
      <Box
        sx={{
          flex: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        component={motion.div}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Order Details */}
        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal:</Typography>
            <Typography>TK{carts?.data?.totalPrice}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Shipping Charge:</Typography>
            <Typography>TK{shippingCharge}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontWeight="bold">Total:</Typography>
            <Typography fontWeight="bold">TK{total}</Typography>
          </Box>
        </Box>

        {/* Coupon Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Apply Coupon
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <Button variant="contained" onClick={handleCouponApply}>
            Apply
          </Button>
        </Box>

        {/* Payment Section */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Payment Method
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Radio
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              value="online"
            />
            <Typography>Online Payment</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Radio
              checked={paymentMethod === "cash"}
              onChange={() => setPaymentMethod("cash")}
              value="cash"
            />
            <Typography>Cash on Delivery</Typography>
          </Box>
        </Box>

        {/* Proceed to Checkout */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            background: "linear-gradient(45deg, #4CAF50, #81C784)",
            fontWeight: "bold",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(45deg, #81C784, #4CAF50)",
            },
          }}
          onClick={() => alert("Proceeding to checkout")}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
