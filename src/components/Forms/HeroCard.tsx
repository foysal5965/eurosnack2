'use client';

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

// HeroCard Component for displaying a course
interface HeroCardProps {
    course: {
        id: number;
        title: string;
        image: string;
        description: string;
    };
    onContinue: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({ course, onContinue }) => {
    const theme = useTheme();

    // Animation variants for Framer Motion
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
        hover: { scale: 1.05, transition: { duration: 0.3 } },
    };

    return (
        <Card
            component={motion.div}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            sx={{
                maxWidth: 500,
                margin: '0 auto',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
            }}
        >
            {/* Course Image */}
            <CardMedia
                component="img"
                height="200"
                image={course.image}
                alt={course.title}
                sx={{ objectFit: 'cover', filter: 'brightness(90%)' }}
            />

            {/* Course Content */}
            <CardContent sx={{ textAlign: 'center', padding: { xs: 2, md: 3 } }}>
                {/* Course Title */}
                <Typography
                    component={motion.div}
                    whileHover={{ scale: 1.1 }}
                    variant="h5"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    {course.title}
                </Typography>

                {/* Continue Button */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onContinue}
                    sx={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        marginTop: '10px',
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        borderRadius: '20px',
                    }}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Continue Course
                </Button>
            </CardContent>
        </Card>
    );
};

export default HeroCard;
