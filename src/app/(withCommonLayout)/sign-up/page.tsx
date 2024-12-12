'use client'
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { modifyPayload } from '@/utils/modifyPayload';
import ITForm from '@/components/Forms/ITForm';
import ITInput from '@/components/Forms/ITInput';
import { useRouter } from 'next/navigation';
import { storeUserInfo } from '@/services/authService';
import { useState } from 'react';
import { registerCustomer } from '@/services/actions/registerCustomer';
import { toast } from 'react-toastify';
import { userLogin } from '@/services/actions/user.login';
interface customer {
    name: string;
    email: string;
    contactNumber: string;
    address: string;
}

interface FormData {
    customer: customer;
    password: string;
}
type CourseCategoryErrorResponse = {
    data: string;
    statusCode: number;
    message: string;
};
// 1. Create the Zod validation schema
const validationSchema = z.object({
    customer: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
        address: z.string().min(1, "Address is required"),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Your component

const RegistrationForm = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(validationSchema),
    });

    const handleRegister = async (values: FieldValues) => {
        console.log(values)
        const data = modifyPayload(values);


        try {
            const res = await registerCustomer(data);

            if (res?.data?.id) {
                toast.success(res?.message);

                const result = await userLogin({
                    password: values.password,
                    email: values.customer.email,
                });
                if (result?.data?.accessToken) {
                    storeUserInfo({ accessToken: result?.data?.accessToken });
                    router.push("/");
                }
            }else{
                setError(res.message)
            }
        } catch (err: any) {
            console.error(err.message);
        }
    };

    return (
        <Container
            component={motion.div}
            maxWidth="xs"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}

            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                mt: 6,
                mb: 6,
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                boxShadow: 3, // Add shadow for depth
            }}
        >

            <Typography
                variant="h4"
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center', color: '#333' }}
            >
                Register
            </Typography>
            <Box
                component={motion.form}
                onSubmit={handleSubmit(handleRegister)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                sx={{
                    width: '100%',
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {/* Name Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        size='small'
                        sx={{ marginBottom: 2 }}
                        {...register("customer.name")}
                        error={!!errors.customer?.name}
                        helperText={errors.customer?.name?.message}
                    />
                </motion.div>

                {/* Email Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        size='small'
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        {...register("customer.email")}
                        error={!!errors.customer?.email}
                        helperText={errors.customer?.email?.message}
                    />
                </motion.div>

                {/* Password Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        size='small'
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </motion.div>

                {/* Contact Number Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
                    <TextField
                        label="Contact Number"
                        variant="outlined"
                        size='small'
                        sx={{ marginBottom: 2 }}
                        fullWidth
                        {...register("customer.contactNumber")}
                        error={!!errors.customer?.contactNumber}
                        helperText={errors.customer?.contactNumber?.message}
                    />
                </motion.div>

                {/* Address Input */}
                <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0, duration: 0.5 }}>
                    <TextField
                        label="Address"
                        variant="outlined"
                        fullWidth
                        size='small'
                        sx={{ marginBottom: 2 }}
                        {...register("customer.address")}
                        error={!!errors.customer?.address}
                        helperText={errors.customer?.address?.message}
                    />
                </motion.div>
                <Typography sx={{
                    textAlign: 'center',
                    color: 'red',
                    fontWeight: '400'
                }}>{error ? error : ''}</Typography>
                {/* Register Button */}
                <Button
                    component={motion.button}
                    type="submit"
                    variant="contained"
                    fullWidth
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        mt: 2,
                        background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                        padding: '10px 0',
                        color: '#fff',
                        fontWeight: 'bold',
                        borderRadius: '5px',
                    }}
                >
                    Register
                </Button>
            </Box>


        </Container>

    );
};

export default RegistrationForm;
