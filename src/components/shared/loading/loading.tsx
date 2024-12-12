'use client'
import { CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                }}
            >
                <CircularProgress
                    size={60}
                    sx={{
                        color: '#3BB77E', // You can customize the color
                    }}
                />
            </motion.div>
        </Box>
    );
};

export default Loading;
