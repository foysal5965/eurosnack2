'use client';

import { useGetSingleProductQuery } from '@/redux/api/productApi';
import { Box, Grid, Typography, Button, Rating, Paper, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loading from '@/components/shared/loading/loading';
import { useAddToCartMutation } from '@/redux/api/cartApi';
import { useAuth } from '@/lib/Providers/AuthProvider';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CircularProgress } from "@mui/material"; // Import CircularProgress from MUI
const staticDeliveryConditions = [
    'Free shipping on orders over 1000tk',
    'Delivered within 3-5 business days',
    'Cash on delivery available',
];

const ProductDetailsPage = ({ params }: any) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(1);
    const [addToCart, { isLoading: addTocartLoading }] = useAddToCartMutation()
    const { user }: any = useAuth()


    // Handle Increase Quantity
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    // Handle Decrease Quantity
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
        const addTocartData = {
            productId: params?.id,
            quantity
        }
        try {
            const res = await addToCart(addTocartData)
            if (res?.data?.data === undefined) {
                toast.success('Your product added to the cart')
            }
        } catch {

        }
    };
    // Handle Buy Now
    const buyNow = async () => {
        const addTocartData = {
            productId: params?.id,
            quantity
        }
        try {
            const res = await addToCart(addTocartData)

            //@ts-ignore
            if (res?.data?.data === undefined) {
                toast.success('Your product added to the cart')
                router.push('/checkout')
            }
        } catch {

        }
    };
    const { data, isLoading, error } = useGetSingleProductQuery(params.id);

    // Handle loading and error states
    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <Typography variant="h6" align="center" color="error">Failed to load product</Typography>;
    }

    if (!data) {
        return <Typography variant="h6" align="center" color="error">Product not found</Typography>;
    }

    const product = data.data; // Use the fetched data as the product object

    return (
        <Grid container spacing={4} sx={{ mt: 4, px: 2, mb: 4 }}>
            {/* Left Section: Product Image */}
            <Grid item xs={12} md={4} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Box
                    sx={{
                        textAlign: 'center',
                        border: '2px solid #ccc',
                        borderRadius: 2,
                        overflow: 'hidden',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            transition: 'transform 0.3s ease-in-out',
                        },
                    }}
                >
                    <Image
                        src={product.image || '/placeholder-image.jpg'}
                        alt={product.ProductName}
                        width={600}  // You can keep the width fixed or adjust as needed
                        height={600} // Increase the height here to make the image taller
                        style={{
                            transition: 'transform 0.3s ease-in-out',
                            objectFit: 'cover', // Keeps the aspect ratio and covers the area
                        }}
                    />
                </Box>

            </Grid>


            {/* Middle Section: Product Details */}
            <Grid item xs={12} md={4} component={motion.div} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                <Box sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '30px', mb: 2, color: '#253D4E', fontFamily: '"Quicksand", sans-serif', }}>
                        {product.productName}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2
                    }}>
                        <Typography
                            sx={{
                                color: '#3BB77E',
                                fontWeight: '900',
                                fontSize: '40px',
                                mb: 2,
                                fontFamily: '"Quicksand", sans-serif', // Adding the font family here
                            }}
                        >
                            TK {product.prizeAfterDiscount}
                        </Typography>
                        <Typography
                            sx={{
                                color: 'gray',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                textDecoration: 'line-through', // Adds the line in the middle
                            }}
                        >
                            TK {product.regularSalePrize}
                        </Typography>
                    </Box>
                    <Typography sx={{ color: '#7E7E7E' }}>
                        {product.details}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Typography variant="body2" sx={{ color: product.stockStatus === 'INSTOCK' ? 'green' : 'red', fontWeight: 'bold', mb: 2 }}>
                        {product.stockStatus}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={product.rating || 0} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            ({product.rating})
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: { xs: "column", sm: "row" }, // Column layout for small devices, row for larger
                            gap: 2,
                            justifyContent: { xs: "center", sm: "space-between" }, // Center on small devices, space-between on larger
                            width: "100%",
                        }}
                    >
                        {/* Quantity Control Box */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1px solid #ccc",
                                borderRadius: 2,
                                padding: "8px",
                                justifyContent: "space-between", // Space between buttons and quantity text
                                width: { xs: "100%", sm: "120px" }, // Full width on small devices, fixed width on larger
                                "&:hover": {
                                    border: "1px solid #3BB77E",
                                },
                            }}
                        >
                            {/* Decrease Quantity Button */}
                            <IconButton
                                onClick={decreaseQuantity}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
                            </IconButton>

                            {/* Quantity */}
                            <Typography
                                sx={{
                                    mx: 2,
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                {quantity}
                            </Typography>

                            {/* Increase Quantity Button */}
                            <IconButton
                                onClick={increaseQuantity}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                        </Box>

                        {/* Buttons Container */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" }, // Column on small devices, row on larger
                                gap: 2,
                                width: "100%",
                            }}
                        >
                            {/* Add to Cart Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                    padding: "8px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: "5px",
                                    width: "100%",
                                }}
                                onClick={() => {
                                    if (user?.email) {
                                        handleAddToCart();
                                    } else {
                                        window.location.href = "/sign-in";
                                    }
                                }}
                            >
                                <ShoppingCartIcon sx={{ mr: 1 }} />
                                {addTocartLoading ? (
                                    <CircularProgress size={24} sx={{ position: "absolute" }} />
                                ) : (
                                    "Add To Cart"
                                )}
                            </Button>

                            {/* Buy Now Button */}
                            <Button
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(45deg, #4CAF50, #81C784)",
                                    padding: "8px",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    borderRadius: "5px",
                                    width: "100%",
                                    position: "relative",
                                }}
                                onClick={() => {
                                    if (user?.email) {
                                        buyNow();
                                    } else {
                                        window.location.href = "/sign-in";
                                    }
                                }}
                                disabled={addTocartLoading}
                            >
                                {addTocartLoading ? (
                                    <CircularProgress size={24} sx={{ position: "absolute" }} />
                                ) : (
                                    "Buy Now"
                                )}
                            </Button>
                        </Box>
                    </Box>



                </Box>
            </Grid>

            {/* Right Section: Delivery Conditions */}
            <Grid item xs={12} md={4} component={motion.div} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>

                <Paper
                    sx={{
                        p: 2,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 2,
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    {/* Delivery Information Section */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            color: '#3BB77E', // Green color for heading
                        }}
                    >
                        Delivery Information
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="body2"
                            sx={{ color: '#555', mb: 1 }}
                        >
                            <strong>Free Shipping:</strong> On orders over 1000tk
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: '#555', mb: 1 }}
                        >
                            <strong>Delivery Time:</strong> Delivered within 3-5 business days
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: '#555', mb: 1 }}
                        >
                            <strong>Payment Options:</strong> Cash on delivery and Online payment available
                        </Typography>
                    </Box>

                    {/* Rating Section */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                        }}
                    >
                        Product Rating
                    </Typography>
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Rating
                            value={1}  // Dynamic rating value
                            readOnly
                            precision={0.5}  // Set precision to show half stars
                            size="small"  // Adjust size of the stars
                            sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" sx={{ color: '#555' }}>
                            {1} / 5
                        </Typography>
                    </Box>

                    {/* Footer Information */}
                    <Typography
                        variant="body2"
                        sx={{ color: '#888' }}
                    >
                        For more information on delivery and payment policies, please refer to our terms and conditions.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsPage;
