'use cliet'
import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
const validationSchema = z.object({
    oldPassword: z.string(),
    newPassword: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
interface ChangePasswordData {
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
}
const ChangePassword = () => {
    const [changePassword, isLoading] = useChangePasswordMutation()
    const [error, setError] = useState('')
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ChangePasswordData>({
        resolver: zodResolver(validationSchema),
    });
    const handleChangePassword = async (values: FieldValues) => {
        try {
            const res = await changePassword(values)

            if (res?.data?.data?.message === 'Password changed successfully!') {
                toast.success(res?.data?.data?.message)
                router.push('/sign-in')
            } else {
                //@ts-ignore
                setError(res?.error?.data)
            }
        } catch {

        }
    };

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Change Password
                </Typography>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper sx={{ padding: 3, boxShadow: 3 }}>
                    <Grid container spacing={3} component="form" onSubmit={handleSubmit(handleChangePassword)}>
                        {/* Current Password */}
                        <Grid item xs={12}>
                            <TextField
                                label="Current Password"
                                type="password"
                                fullWidth
                                {...register('oldPassword')}
                                error={!!errors.oldPassword}
                                helperText={errors.oldPassword?.message}
                            />
                        </Grid>

                        {/* New Password */}
                        <Grid item xs={12}>
                            <TextField
                                label="New Password"
                                type="password"
                                fullWidth
                                {...register('newPassword')}
                                error={!!errors.newPassword}
                                helperText={errors.newPassword?.message}
                            />
                        </Grid>

                        {/* Confirm Password */}
                        <Grid item xs={12}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                {...register('confirmPassword')}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                        {error ? (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    marginLeft:60,
                                    marginTop:2 // Or the specific height of the container
                                }}
                            >
                                <Typography
                                    align="center"
                                    sx={{
                                        fontWeight: '600',
                                        color: 'red',
                                    }}
                                >
                                    {error}
                                </Typography>
                            </Box>
                        ) : null}

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                                    padding: '10px 0',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    borderRadius: '5px',
                                }}
                                fullWidth
                                type='submit'

                            >
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default ChangePassword;
