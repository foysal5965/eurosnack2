'use client';

import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // For displaying icons in categories
import { useCategoriesQuery } from '@/redux/api/categoryApi';
import { ICategory } from '@/types';
import Link from 'next/link';

const CategoriesPage = () => {
    const [index, setIndex] = useState(0);
    const [showingFirstBatch, setShowingFirstBatch] = useState(true);
    const categoriesToShow = 10; // Initial number of categories to display
    const { data, isLoading } = useCategoriesQuery({});

    // Auto slide categories after showing the first batch
    const slideCategories = () => {
        if (showingFirstBatch) {
            // After showing first 10, we start sliding the next categories
            setShowingFirstBatch(false);
        } else {
            // Slide by 1 category at a time after the first 10
            setIndex((prevIndex) => (prevIndex + 1) % (data?.data?.length - categoriesToShow));
        }
    };

    // Carousel settings for automatic sliding (every 2 seconds) only if categories > 10
    useEffect(() => {
        if (data?.data?.length > categoriesToShow) {
            const interval = setInterval(slideCategories, 2000);
            return () => clearInterval(interval); // Clean up the interval on unmount
        }
    }, [showingFirstBatch, data?.data?.length]);

    return (
        <Box sx={{ mt: 4,mb:2 }}>
            <Typography align='center'   sx={{ m: 3, fontSize:'32px', fontWeight:'bold' }}>
                Shop by Categories
            </Typography>

            <Box sx={{ overflow: 'hidden' }}>
                <motion.div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent:'center'
                        
                    }}
                    animate={{
                        x: data?.data?.length > categoriesToShow ? `-${(index * 100) / categoriesToShow}%` : 0,
                    }}
                >
                    {/* Render Category Cards */}
                    <Grid
                        container
                        spacing={1} // Adjust the value to add more space between the cards
                        sx={{ display: 'flex' , justifyContent:'center'}}
                    >
                        {data?.data?.slice(0, categoriesToShow + index).map((category:ICategory, i:number) => (
                            <Grid
                                item
                                key={i}
                                xs={6}
                                sm={4}
                                md={2}
                                lg={1.5} // On large screens, show 10 items in a row
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <Link href={`/shops/category/${category.id}`}>
                                    <Card
                                        sx={{
                                            width: 130,
                                            height: 160,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 2,
                                            background:'#F2FCE4',
                                            '&:hover': {
                                                border:'1px solid #BCE3C9',
                                                transform: 'scale(1.05)',
                                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Image
                                                src={category.icon}
                                                alt={category.title}
                                                width={50}
                                                height={50}
                                                style={{ marginBottom: '10px', borderRadius: '50%' }}
                                            />
                                            <Typography variant="body1">{category.title}</Typography>
                                        </CardContent>
                                    </Card>
                                    </Link>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>


                </motion.div>
            </Box>
        </Box>
    );
};

export default CategoriesPage;
