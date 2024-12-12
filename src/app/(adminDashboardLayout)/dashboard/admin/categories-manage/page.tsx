'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid, IconButton, Pagination, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Delete } from '@mui/icons-material';
import AnimatedTable from '@/components/tables/AnimatedTable';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDebounced } from '@/redux/hooks';
import { useCategoriesQuery, useCreateCategoryMutation } from '@/redux/api/categoryApi';
import { modifyPayload } from '@/utils/modifyPayload';
import { toast } from 'react-toastify';

interface Category {
    id: string;
    title: string;
    icon: string;
    createdAt: string;
}



const columns = [
    { id: 'title', label: 'Category Name' },
    { id: 'createdAt', label: 'Created At' },
    { id: 'actions', label: 'Actions' }, 
];

const CategoriesManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [categoriesPerPage] = useState<number>(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
   const[categoryName, setCategoryName]= useState('')
    const [icon, setIcon] = useState(null);
    const [error, setError]= useState('')
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({
      searchQuery: searchTerm,
      delay: 600,
    });
    if (!!debouncedTerm) {
      query["searchTerm"] = searchTerm;
    }
      const { data, isLoading:brandLoading } = useCategoriesQuery({...query});
      const [createCategory, {isLoading:createLoading}] = useCreateCategoryMutation()
      const meta = data?.meta; 
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

    const handleOpenDialog = (category?: Category) => {
        setCurrentCategory(category || null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setCurrentCategory(null);
    };

   

    const handleDeleteCategory = (id: string) => {
        // const index = data?.data?.findIndex(c => c.id === id);
        // if (index !== -1) {
        //     allCategories.splice(index, 1);
        // }
    };

    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setIcon(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
   
    // Filter brands based on search query
    const filteredCategories = data?.data?.filter((category:Category) =>
        category.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    // Paginate the filtered categories
    const currentCategories = filteredCategories.slice(
        (page - 1) * categoriesPerPage,
        page * categoriesPerPage
    );
    const handleSubmit = async (e: any) => {
        e.preventDefault();
       
        if (categoryName && icon) {
            const values = {
                title: categoryName, // include the categoryName
                file: icon,       // include the image file
            };

            const formData = modifyPayload(values);
            try {
                // Call Redux mutation to add the brand
                const res = await createCategory(formData);
              
                if (res?.data?.data?.id) {
                    toast.success('Brand inserted Successfully');
                    // Reset form after success
                    setCategoryName('');
                    setIcon(null);
                    setImagePreview(null);
                    handleCloseDialog();
                } else if (res.error) {
                    // Handle errors (e.g., show a toast or set error state)
                    //@ts-ignore
                    setError(res.error.data)
                }
            } catch (error) {
                
            }
        }
    };
    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Categories Management
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 , marginBottom: 2 }}>
                <TextField
                    label="Search by Category Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ flex: 1 }}
                />
                <Button variant="contained" sx={{
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    padding: '10px 12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                }} onClick={() => handleOpenDialog()}>
                    Add New Category
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
                        data={currentCategories.map((category:Category) => ({
                            ...category,
                            actions: (
                                <>
                                    <IconButton onClick={() => handleOpenDialog(category)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteCategory(category.id)}>
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
                    count={Math.ceil(filteredCategories.length / categoriesPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Grid>

            {/* Dialog for adding/updating category */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth
                sx={{
                    '& .MuiDialogContent-root': {
                        padding: 3, // Optional: adds more padding inside the dialog content
                    },
                }}>
                <DialogTitle>{currentCategory ? 'Update Category' : 'Add New Category'}</DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        label="Category Name"
                        variant="outlined"
                        fullWidth
                        value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
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
                        <Button sx={{
                            mt: 2,
                            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                            padding: '10px 12px',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                        }} variant="contained" component="label">
                            Upload Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Box>
                    <Typography align='center' sx={{color:'red', fontWeight:'700'}}>{error? error :''}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        sx={{
                            background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                            padding: '10px 12px',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                        }}
                        disabled={createLoading}
                    >
                        {currentCategory ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default CategoriesManagementPage;
