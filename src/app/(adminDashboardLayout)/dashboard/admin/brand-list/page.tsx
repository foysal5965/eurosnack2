'use client';
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Pagination, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Input } from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Delete } from '@mui/icons-material'; // Reusable table component
import AnimatedTable from '@/components/tables/AnimatedTable';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { modifyPayload } from '@/utils/modifyPayload';
import { useBrandsQuery, useCreateBrandMutation } from '@/redux/api/brandApi';
import { toast } from 'react-toastify';
import { useDebounced } from '@/redux/hooks';
import Loading from '@/components/shared/loading/loading';

interface Brand {
    id: string;
    icon: string;
    title: string;  // New field for the image URL
    createdAt: string;
}

const columns = [
    { id: 'title', label: 'Brand Name' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'actions', label: 'Actions' }, // Column for the action buttons
];

const BrandManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [brandsPerPage] = useState<number>(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [currentBrand, setCurrentBrand] = useState<Brand | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [brandName, setBrandName] = useState('');
    const [icon, setIcon] = useState(null);
    const [createBrand, isLoading] = useCreateBrandMutation();
    const query: Record<string, any> = {};
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });
  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }
    const { data, isLoading:brandLoading } = useBrandsQuery({...query});
    const meta = data?.meta; 
     // Data fetched from the API

     useEffect(() => {
        if (meta?.page) {
            setPage(meta.page);
        }
    }, [meta]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(1); // Reset to first page on search
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Handle opening the dialog for adding/updating a brand
    const handleOpenDialog = (brand?: Brand) => {
        setCurrentBrand(brand || null);
        setImagePreview(brand?.icon || null);  // Set existing image for editing
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentBrand(null);
        setImagePreview(null); // Clear image preview on close
    };

    const handleDeleteBrand = (id: string) => {
        const index = data?.brands.findIndex((b:any) => b.id === id); // Use data from API
        if (index !== -1) {
            // Optionally, you can dispatch an action to delete the brand
        }
    };

    // Handle image upload and preview
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setIcon(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Filter brands based on search query
    const filteredBrands = data?.data?.filter((brand: Brand) =>
        brand.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Get brands for current page
    const currentBrands = filteredBrands.slice(
        (page - 1) * brandsPerPage,
        page * brandsPerPage
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (brandName && icon) {
            const values = {
                title: brandName, // include the categoryName
                file: icon,       // include the image file
            };

            const formData = modifyPayload(values);
            try {
                // Call Redux mutation to add the brand
                const res = await createBrand(formData);
                console.log(res);
                if (res?.data?.data?.id) {
                    toast.success('Brand inserted Successfully');
                    // Reset form after success
                    setBrandName('');
                    setIcon(null);
                    setImagePreview(null);
                    handleCloseDialog();
                } else if (res.error) {
                    // Handle errors (e.g., show a toast or set error state)
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
if (brandLoading){
    return <Loading/>
}
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Brand Management
            </Typography>

            <Box sx={{ marginBottom: 2, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <TextField
                    label="Search by Brand Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flex: 1 }}
                />
                <Button
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                        padding: '10px 12px',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                        alignSelf: { xs: 'stretch', sm: 'center' },
                    }}
                    onClick={() => handleOpenDialog()}
                >
                    Add New Brand
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
                        data={currentBrands.map((brand:Brand) => ({
                            ...brand,
                            actions: (
                                <>
                                    <IconButton onClick={() => handleOpenDialog(brand)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteBrand(brand.id)}>
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
                    count={Math.ceil(filteredBrands.length / brandsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Grid>

            {/* Dialog for adding/editing brand */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth sx={{ '& .MuiDialogContent-root': { padding: 3 } }}>
                <DialogTitle>{currentBrand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Brand Name"
                            variant="outlined"
                            fullWidth
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            required
                            sx={{ marginBottom: 2 }}
                        />
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            border="1px dashed #ccc"
                            padding={2}
                            borderRadius={2}
                        >
                            {imagePreview ? (
                                <Image
                                    width={32}
                                    height={32}
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: '32px', height: '32px', marginBottom: 16 }}
                                />
                            ) : (
                                <CloudUploadIcon style={{ fontSize: 48, color: "#ccc" }} />
                            )}
                            <Button
                                sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                                    borderRadius: '15px',
                                    padding: '10px 20px',
                                    color: '#fff',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                }}
                                variant="contained"
                                component="label"
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancel
                        </Button>
                        <Button
                            sx={{
                                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                                padding: '10px 12px',
                                color: '#fff',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                alignSelf: { xs: 'stretch', sm: 'center' },
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default BrandManagementPage;
