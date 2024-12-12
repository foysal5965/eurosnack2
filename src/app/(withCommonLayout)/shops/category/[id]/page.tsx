'use client';

import Loading from "@/components/shared/loading/loading";
import { useProductsQuery } from "@/redux/api/productApi";
import { useDebounced } from "@/redux/hooks";
import { Box, Grid, Typography, TextField, Slider, FormControl, FormControlLabel, Checkbox, Button, Rating } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books"];
const brands = ["Brand A", "Brand B", "Brand C"];

const ShopPage = (params:any) => {
 
 
  const [priceRange, setPriceRange] = useState<number[]>([10, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const query: Record<string, any> = {searchTerm:params.params.id};
   
  const { data, isLoading, error } = useProductsQuery({ ...query });
 

  // Price range handler
  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPriceRange(newValue);
    }
  };

  // Toggle selection in categories or brands
  const toggleSelection = (item: string, setSelection: React.Dispatch<React.SetStateAction<string[]>>, currentSelection: string[]) => {
    setSelection(currentSelection.includes(item) ? currentSelection.filter((i) => i !== item) : [...currentSelection, item]);
  };

  return (
    <Grid container spacing={4} sx={{ mt: 4, px: 2 , mb:4}}>
      {/* Left Section: Filters */}
      <Grid item xs={12} md={3} component={motion.div} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "#f4f4f4" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>

          {/* Category Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Category
            </Typography>
            {categories.map((category, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleSelection(category, setSelectedCategories, selectedCategories)}
                  />
                }
                label={category}
              />
            ))}
          </Box>

          {/* Brand Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Brand
            </Typography>
            {brands.map((brand, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleSelection(brand, setSelectedBrands, selectedBrands)}
                  />
                }
                label={brand}
              />
            ))}
          </Box>

          {/* Price Range Filter */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
              Price Range
            </Typography>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={200}
            />
            <Typography variant="body2">
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
          </Box>

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
            Apply Filters
          </Button>
        </Box>
      </Grid>

      {/* Right Section: Products */}
      <Grid item xs={12} md={9}>
        {isLoading ? (
          <Loading/>
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

                      <Typography  sx={{ fontWeight: "bold", mb: 1, fontSize:'14px', color:'#253D4E' }}>
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

export default ShopPage;
