'use client';

import { useProductsQuery } from "@/redux/api/productApi";
import { Box, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Loading from "../shared/loading/loading";

const ProductPage = () => {
  const query = {}; // Adjust the query based on filters if necessary
  const { data, isLoading, error } = useProductsQuery({ ...query });

  return (
    <Grid container spacing={4} sx={{ mt: 4, px: 2, mb: 4 }}>
      <Typography align="center"  sx={{ width: "100%", fontSize: { xs: "24px", sm: "28px", md: "32px", fontWeight:'bold' } }}>
        Our Products
      </Typography>

      <Grid item  xs={12} md={9} >
        {isLoading ? (
          <Loading />
        ) : error ? (
          <Typography variant="h6" align="center" color="error">
            Failed to load products
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {data?.data?.map((product: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={product.id}
                component={motion.div}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/product-details/${product.id}`}>
                  <Box
                    sx={{
                      width: "100%",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                      backgroundColor: "#fff",
                      p: 2,
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      height: 450, // Set a fixed height for uniformity
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Discount Tag */}
                    {product.discount > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          backgroundColor: "red",
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "0 0 8px 0",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Save {product.discount}%
                      </Box>
                    )}


                    {/* Product Image */}
                    <Box
                      sx={{

                        width: "100%", // Make the box take full width
                        height: 200, // Set a fixed height for uniformity
                        overflow: "hidden", // Hide overflow to prevent any distortion
                        borderRadius: 2, // Optional: Add rounded corners for a polished look
                      }}
                    >
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.productName}
                        width={350}
                        height={350}
                        style={{
                          objectFit: "contain", // Ensure the image fits nicely within the box
                          maxWidth: "100%", // Ensure the image doesn't exceed the container width
                          maxHeight: "100%", // Ensure the image doesn't exceed the container height
                        }}
                      />
                    </Box>


                    {/* Product Details */}
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 1,
                          color: product.stockStatus === "INSTOCK" ? "#7E7E7E" : "red",

                        }}
                      >
                        {product.stockStatus}
                      </Typography>

                      <Typography sx={{ fontWeight: "bold", mb: 1, fontSize: '14px', color: '#253D4E' }}>
                        {product.productName}
                      </Typography>

                      <Box sx={{
                        display:'flex',
                        flexDirection:'row',
                        gap:2
                      }}>

                      <Typography
                        sx={{
                          mb: 1,
                          color: '#3BB77E',
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      >
                        TK{product.prizeAfterDiscount}
                      </Typography>
                      <Typography
                        sx={{
                          mb: 1,
                          color: 'gray',
                          fontSize: '14px',
                          fontWeight:'bold',
                          textDecoration: 'line-through', // Adds the line in the middle
                        }}
                      >
                        TK{product.regularSalePrize}
                      </Typography>
                      </Box>

                    </Box>

                    {/* Choose Button */}
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Link href={`/product-details/${product.id}`} passHref>
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{
                            background: "linear-gradient(45deg, #4CAF50, #81C784)",
                            padding: "10px 10px",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "5px",
                            fontSize: { xs: "14px", sm: "16px" },
                            "&:hover": {
                              background: "linear-gradient(45deg, #81C784, #4CAF50)",
                            },
                          }}
                        >
                          Choose options
                        </Button>
                      </Link>
                    </motion.div>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductPage;
