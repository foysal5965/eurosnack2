'use client';

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
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Delete } from '@mui/icons-material';
import AnimatedTable from '@/components/tables/AnimatedTable';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  expiryDate: string;
  createdAt: string;
}

const allCoupons: Coupon[] = [
  { id: '1', code: 'SAVE10', discount: '10%', expiryDate: '2024-12-31', createdAt: '2024-01-01' },
  { id: '2', code: 'FREESHIP', discount: 'Free Shipping', expiryDate: '2023-11-30', createdAt: '2023-06-15' },
  { id: '3', code: 'WELCOME20', discount: '20%', expiryDate: '2024-06-30', createdAt: '2024-01-05' },
];

const columns = [
  { id: 'code', label: 'Coupon Code' },
  { id: 'discount', label: 'Discount' },
  { id: 'expiryDate', label: 'Expiry Date' },
  { id: 'createdAt', label: 'Created At' },
  { id: 'actions', label: 'Actions' }, // Column for action buttons
];

const CouponManagementPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [couponsPerPage] = useState<number>(5);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenDialog = (coupon?: Coupon) => {
    setCurrentCoupon(coupon || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentCoupon(null);
  };

  const handleSaveCoupon = (coupon: Coupon) => {
    if (currentCoupon) {
      // Update existing coupon
      const index = allCoupons.findIndex(c => c.id === currentCoupon.id);
      if (index !== -1) {
        allCoupons[index] = coupon;
      }
    } else {
      // Add new coupon
      allCoupons.push({ ...coupon, id: (allCoupons.length + 1).toString() });
    }
    handleCloseDialog();
  };

  const handleDeleteCoupon = (id: string) => {
    const index = allCoupons.findIndex(c => c.id === id);
    if (index !== -1) {
      allCoupons.splice(index, 1);
    }
  };

  // Filter coupons based on search query
  const filteredCoupons = allCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered coupons
  const currentCoupons = filteredCoupons.slice(
    (page - 1) * couponsPerPage,
    page * couponsPerPage
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Coupon Management
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <TextField
          label="Search by Coupon Code"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          sx={{ maxWidth: '400px' }}
        />
        <Button variant="contained" sx={{
                   
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    padding: '10px 12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                }} onClick={() => handleOpenDialog()}>
          Add New Coupon
        </Button>
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ padding: 2 }}>
          <AnimatedTable
            columns={columns}
            data={currentCoupons.map(coupon => ({
              ...coupon,
              actions: (
                <>
                  <IconButton onClick={() => handleOpenDialog(coupon)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCoupon(coupon.id)}>
                    <Delete />
                  </IconButton>
                </>
              ),
            }))}
          />
        </Paper>
      </motion.div>

      {/* Pagination */}
      <Grid container justifyContent="flex-end" sx={{ marginTop: 2 }}>
        <Pagination
          count={Math.ceil(filteredCoupons.length / couponsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Grid>

      {/* Dialog for adding/updating coupon */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentCoupon ? 'Update Coupon' : 'Add New Coupon'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Coupon Code"
            variant="outlined"
            fullWidth
            defaultValue={currentCoupon?.code || ''}
            sx={{ marginBottom: 2 }}
            onChange={(e) =>
              setCurrentCoupon((prev) =>
                prev ? { ...prev, code: e.target.value } : { id: '', code: e.target.value, discount: '', expiryDate: '', createdAt: '' }
              )
            }
          />
          <TextField
            label="Discount"
            variant="outlined"
            fullWidth
            defaultValue={currentCoupon?.discount || ''}
            sx={{ marginBottom: 2 }}
            onChange={(e) =>
              setCurrentCoupon((prev) =>
                prev ? { ...prev, discount: e.target.value } : { id: '', code: '', discount: e.target.value, expiryDate: '', createdAt: '' }
              )
            }
          />
          <TextField
            label="Expiry Date"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            defaultValue={currentCoupon?.expiryDate || ''}
            sx={{ marginBottom: 2 }}
            onChange={(e) =>
              setCurrentCoupon((prev) =>
                prev ? { ...prev, expiryDate: e.target.value } : { id: '', code: '', discount: '', expiryDate: e.target.value, createdAt: '' }
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (currentCoupon) {
                handleSaveCoupon(currentCoupon);
              }
            }}
            color="primary"
          >
            {currentCoupon ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CouponManagementPage;
