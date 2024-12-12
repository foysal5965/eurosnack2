'use client';

import { Box, Grid, Typography, Card, CardContent, Button, TextField } from "@mui/material";
import Slider from "react-slick";
import slideImage1 from '@/assets/slider1.png';
import slideImage2 from '@/assets/slider2.png';
import cardImage1 from '@/assets/slider_right_banner1.png'
import cardImage2 from '@/assets/slider_right_banner2.png'
import Image from "next/image";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { ICategory } from "@/types";
import Loading from "../shared/loading/loading";

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books", "Toys", "Groceries"];
const cardContent = [
    { title: "Card 1", description: "Every day fresh and clean with our products" },
    { title: "Card 2", description: "Description of the second card." },
];

const HomePage = () => {
    const query = {};
    const { data: categories, isLoading } = useCategoriesQuery({ ...query });

    // Carousel settings
    const cardImages = [cardImage1, cardImage2];
    const carouselSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000, // Slide every 3 seconds
    };

    return (
        <Grid container spacing={4} sx={{ mt: 4, mb: 4 }}>
            {/* Left Section: Categories */}
            <Grid
                item
                xs={12}
                md={2}
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }} // Hide on xs and sm, show on md and above
            >
                <Box
                    sx={{
                        padding: 2,
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "#ccc",
                    }}
                >
                    {isLoading ? (
                        <Loading />
                    ) : (
                        categories?.data?.map((category: ICategory, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 1,
                                    cursor: "pointer",
                                    "&:hover": { color: "#4caf50" },
                                }}
                            >
                                {/* Icon/Image */}
                                <Image
                                    src={category.icon} // URL of the icon
                                    alt={`${category.title} icon`}
                                    width={24} // Icon width
                                    height={24} // Icon height
                                    style={{ marginRight: "8px", borderRadius: "50%" }} // Optional styling
                                />
                                {/* Category Title */}
                                <Typography variant="body1">{category.title}</Typography>
                            </Box>
                        ))
                    )}
                </Box>
            </Grid>


            {/* Middle Section: Carousel */}
            <Grid item xs={12} md={6}>
                <Box sx={{ backgroundColor: "#fff", borderRadius: 2 }}>
                    <Slider {...carouselSettings}>
                        {[slideImage1, slideImage2].map((image, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                                <Image
                                    src={image}
                                    alt={`carousel ${index + 1}`}
                                    width={600}
                                    height={300}
                                    style={{ borderRadius: '4px', width: '100%', height: 'auto' }} // Make image responsive
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: { xs: '20%', sm: '25%', md: '20%', lg: '25%' }, // Adjust top position for different screen sizes
                                        left: { xs: '0%', sm: '0%', md: '2%', lg: '0%' },
                                        color: '#253D4E',
                                        zIndex: 1,
                                        width: '100%', // Ensure the box takes full width
                                        textAlign: 'center', // Center text for better alignment on mobile
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 'bold',
                                            mb: { xs: '1rem' },
                                            fontSize: { xs: '1rem', sm: '2rem', md: '1rem', lg: '2rem' }, // Adjust font size for small screens
                                        }}
                                    >
                                        Don't miss amazing groceries deals!
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mb: { xs: '1rem' },
                                            fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem' }, // Adjust font size for small screens
                                        }}
                                    >
                                        Subscribe for the daily newsletter of offers!
                                    </Typography>

                                    {/* Email Subscription Field */}
                                    <Box
                                        component="form"
                                        sx={{
                                            position: 'absolute',
                                            top: { xs: '90%', sm: '120%', md: '80%', lg: '95%' }, // Adjust top position for different screen sizes
                                            left: { xs: '22%', sm: '30%', md: '15%', lg: '25%' },
                                            display: 'flex',
                                            flexDirection: { xs: 'column', sm: 'row' }, // Stack input fields on small screens
                                            gap: 1,
                                            alignItems: 'center', // Center input and button in column mode
                                        }}
                                        onSubmit={(e) => {
                                            e.preventDefault(); // Add form handling logic here
                                            alert("Subscribed successfully!");
                                        }}
                                    >
                                        <TextField
                                            variant="outlined"
                                            placeholder="Enter your email"
                                            size="small"
                                            sx={{
                                                backgroundColor: 'white',
                                                borderRadius: 1,
                                                width: { xs: '100%', sm: 'auto' }, // Full width on small screens, auto on larger
                                            }}
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            sx={{
                                                textTransform: 'none',
                                                width: { xs: '100%', sm: 'auto' }, // Full width on small screens, auto on larger
                                            }}
                                        >
                                            Subscribe
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Grid>

            {/* Right Section: Cards */}
            <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {cardContent.map((card, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                            {/* Background Image */}
                            <Image
                                src={cardImages[index % cardImages.length]}
                                alt={`carousel ${index + 1}`}
                                width={600}
                                height={300}
                                style={{
                                    borderRadius: '4px',
                                    width: '100%',
                                    height: 'auto', // Make sure the height is responsive
                                }}
                            />

                            {/* Overlay Content */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: { xs: '10%', sm: '20%' }, // Adjust position for smaller devices
                                    left: { xs: '10%', sm: '6%' }, // Adjust left position for smaller devices
                                    color: '#253D4E',
                                    zIndex: 1,
                                    width: '80%', // Ensure content does not overflow
                                    textAlign: 'center', // Center text for better alignment
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 'bold',
                                        mb: 2,
                                        fontSize: { xs: '1.2rem', sm: '.5rem', md: '1rem', lg: '1.5rem' }, // Font size adjustment
                                    }}
                                >
                                    Don't miss amazing groceries deals!
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{
                                        textTransform: 'none',
                                        width: 'auto',
                                        fontSize: { xs: '0.8rem', sm: '1rem' }, // Adjust button font size on small screens
                                    }}
                                >
                                    Shop Now
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Grid>

        </Grid>
    );
};

export default HomePage;
