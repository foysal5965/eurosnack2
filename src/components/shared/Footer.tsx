"use client";

import { Box, Container, Grid, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

const footerLinks = [
  { title: "Quick Links", links: ["Home", "Products", "About Us", "Contact"] },
  { title: "Customer Service", links: ["FAQs", "Shipping Policy", "Return Policy", "Support"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Privacy Policy"] },
];

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#4caf50",
        color: "#fff",
        py: 4,
        mt: "auto", // Ensures the footer stays at the bottom
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section */}
        <Grid container spacing={3} sx={{ textAlign: { xs: "center", md: "left" } }}>
          {/* Links Section */}
          {footerLinks.map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Typography
                variant="h6"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                sx={{ mb: 2, fontWeight: "bold" }}
              >
                {section.title}
              </Typography>
              {section.links.map((link, idx) => (
                <Typography
                  key={idx}
                  variant="body2"
                  component={motion.div}
                  whileHover={{ scale: 1.1 }}
                  sx={{ mb: 1, cursor: "pointer" }}
                >
                  {link}
                </Typography>
              ))}
            </Grid>
          ))}

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ mb: 2, fontWeight: "bold" }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Box
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderColor: "transparent",
                  },
                }}
              />
              <Button variant="contained" color="secondary" sx={{ px: 3, bgcolor: "#f44336" }}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
            mt: 4,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" } }}>
            &copy; {new Date().getFullYear()} Grocery Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
