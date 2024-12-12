'use client';

import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    Grid,
    Paper,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BrandFieled from '@/components/Forms/BrandField';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryField from '@/components/Forms/CategoryField';
import { z } from 'zod';
import StatusField from '@/components/Forms/StatusField';
import { modifyPayload } from '@/utils/modifyPayload';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '@/redux/api/productApi';
const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Nike'];
const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Furniture'];
const stockStatuses = [
    { value: 'INSTOCK', level: 'in Stock' },
    { value: 'OUTOFFSTOCK', level: 'out of Stock' }
];


const StockStatusEnum = z.enum(['INSTOCK', 'OUTOFSTOCK']);

const ProductSchema = z.object({
    productName: z.string().min(1, 'Product name is required'), // Validates non-empty string
    purchasePrize: z.number().positive('Purchase price must be a positive number'), // Positive float
    regularSalePrize: z.number().positive('Regular sale price must be a positive number'), // Positive float
    discount: z.number().min(0, 'Discount must be a non-negative number').optional(), // Optional non-negative float
    stockStatus: StockStatusEnum.default('INSTOCK'), // Default value `INSTOCK` with enum validation
    stockQuantity: z.number().int().min(0, 'Stock quantity must be a non-negative integer'), // Non-negative integer
    details: z.string().min(1, 'Product details are required'), // Validates non-empty string
    categoryId: z.string().nonempty('Category ID is required'), // Ensures `categoryId` is a valid UUID
    brandId: z.string().nonempty('Category ID is required'),
});
const AddProductPage: React.FC = () => {

    const [image, setImage] = useState<File | null>(null); // For image upload
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [error, setError] = useState('');

    const [createProduct, isLoading] = useCreateProductMutation()

    const {
        register,
        handleSubmit,
        setValue, control,
        formState: { errors },
        reset
    } = useForm({
        // resolver: zodResolver(ProductSchema),
    });

    // Handle image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBrandChange = (brandId: any) => {
        setValue('brandId', brandId); // Update the form with selected 
    };
    const handleCategoryChange = (categoryId: any) => {
        setValue('categoryId', categoryId); // Update the form with selected 
    };
    const handleStatusChange = (status: any) => {
        setValue('stockStatus', status); // Update the form with selected 
    };

    const handleAddProduct = async (data: FieldValues) => {
        const values = { ...data, file: image }

        const formData = modifyPayload(values)
        try {
            const res = await createProduct(formData)
            console.log(res)
            if (res?.data?.data?.id) {
                toast.success('Course Created Successfuly')
                reset()
                setImage(null)
                setImagePreview(null)
            } else {

            }
        } catch (error) {
        }
    };

    return (
        <Box
            sx={{
                padding: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #f0f4f8, #e8ebee)',
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: 600 }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography
                        variant="h4"
                        textAlign="center"
                        sx={{
                            marginBottom: 3,
                            fontWeight: 'bold',
                            color: 'primary.main',
                        }}
                    >
                        Add New Product
                    </Typography>

                    <form onSubmit={handleSubmit(handleAddProduct)}>
                        <Grid container spacing={2}>
                            {/* Brand Select */}
                            <Grid item xs={12}>
                                <BrandFieled
                                    label="Select Brand"
                                    name="brandId"
                                    onChange={handleBrandChange}

                                />
                            </Grid>

                            {/* Category Select */}
                            <Grid item xs={12}>
                                <CategoryField
                                    label="Select Category"
                                    name="categoryId"
                                    onChange={handleCategoryChange}
                                />
                            </Grid>

                            {/* Product Name */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Product Name"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.productName}
                                    helperText={errors.productName ? String(errors.productName.message) : ''}
                                    {...register('productName')}
                                />
                            </Grid>

                            {/* Description */}
                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    error={!!errors.details}
                                    helperText={errors.details ? String(errors.details.message) : ''}
                                    {...register('details')}
                                />
                            </Grid>

                            {/* Purchase Price */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Purchase Price"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.purchasePrize}
                                    helperText={errors.purchasePrize ? String(errors.purchasePrize.message) : ''}
                                    {...register('purchasePrize', { valueAsNumber: true })}
                                    type='number'
                                />
                            </Grid>

                            {/* Regular Price */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Regular Price"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.regularSalePrize}
                                    helperText={errors.regularSalePrize ? String(errors.regularSalePrize.message) : ''}
                                    {...register('regularSalePrize', { valueAsNumber: true })}
                                    type='number'
                                />
                            </Grid>

                            {/* Discount */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Discount (%)"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.discount}
                                    helperText={errors.discount ? String(errors.discount.message) : ''}
                                    {...register('discount', { valueAsNumber: true })}
                                    type='number'
                                />
                            </Grid>

                            {/* Stock Quantity */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Stock Quantity"
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.stockQuantity}
                                    helperText={errors.stockQuantity ? String(errors.stockQuantity.message) : ''}
                                    {...register('stockQuantity', { valueAsNumber: true })}
                                />
                            </Grid>

                            {/* Stock Status */}
                            <Grid item xs={12}>
                                <StatusField
                                    label="Stock Status"
                                    name="stockStaus"
                                    onChange={handleStatusChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                                            width={250} height={250}
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{ width: '100%', height: 'auto', marginBottom: 16 }}
                                        />
                                    ) : (
                                        <CloudUploadIcon style={{ fontSize: 48, color: '#ccc' }} />
                                    )}
                                    <Button sx={{
                                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                        borderRadius: '15px', // Rounded button
                                        padding: '10px 20px',
                                        color: '#fff', // Text color
                                        fontSize: {xs:'10px', sm:'16px'},
                                        fontWeight: 'bold', // Initial shadow

                                    }} variant="contained" component="label">
                                        Upload Product Image
                                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                                    </Button>
                                </Box>
                            </Grid>
                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        type='submit'
                                        sx={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            background: 'linear-gradient(45deg, #4caf50, #81c784)',
                                        }}
                                    >
                                        Add Product
                                    </Button>
                                </motion.div>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </motion.div>
        </Box>
    );
};

export default AddProductPage;
