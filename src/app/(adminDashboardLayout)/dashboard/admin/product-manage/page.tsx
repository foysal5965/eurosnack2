'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  IconButton,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Delete } from '@mui/icons-material';
import AnimatedTable from '@/components/tables/AnimatedTable';
import Link from 'next/link';
import { useDebounced } from '@/redux/hooks';
import { useProductsQuery } from '@/redux/api/productApi';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  purchasePrice: string;
  regularPrice: string;
  discount: string;
  stockQuantity: string;
  stockStatus: string;
  category: string;
  brand: string;
  createdAt: string;
}



const columns = [
  { id: 'productName', label: 'Product Name' },
  { id: 'regularSalePrize', label: 'Price ($)' },
  { id: 'stockStatus', label: 'Stock Status' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'actions', label: 'Actions' },
];

const ProductManagementPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
const {data:products,isLoading}= useProductsQuery({...query})
const totalPages = Math.ceil((products?.data?.meta?.total || 0) / limit);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

 

 

  

 

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                    label="Search by Brand Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flex: 1 }}
                />
                <Link href='/dashboard/admin/product-manage/add-product'>
                <Button
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                        padding: '13px',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        alignSelf: { xs: 'stretch', sm: 'center' },
                    }}
                    
                >
                    Add New Product
                </Button>
                </Link>
            </Box>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Paper sx={{ padding: 2 }}>
          <AnimatedTable
            columns={columns}
            data={products?.data?.map((product:Product) => ({
              ...product,
              actions: (
                <>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => console.log('Delete', product.id)}>
                    <Delete />
                  </IconButton>
                </>
              ),
            }))}
          />
        </Paper>
      </motion.div>

      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Pagination
          count={1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>

      
    </Box>
  );
};

export default ProductManagementPage;
