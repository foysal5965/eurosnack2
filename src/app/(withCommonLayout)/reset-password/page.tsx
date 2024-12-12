'use client';
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import { getFromLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/constants/authKey';
import { userResetPassword } from '@/services/actions/user.resetPassword';
import { deleteCookies } from '@/services/actions/deleteCookies';

const validationSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
   const id = searchParams.get('userId');
   const token = searchParams.get('token');
   const router = useRouter();
   const locatToken = getFromLocalStorage(authKey)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const handleResetPassword = async (values: FieldValues) => {
    setLoading(true);
    const updatedData = { ...values, id, token };

    try {
        const res = await userResetPassword(updatedData)
      
        if (res.success) {
           toast.success('Password reset successfuly', {
              position: 'top-center'
           })
           if (locatToken) {
              localStorage.removeItem(authKey);
              deleteCookies([authKey, 'refreshToken']);
           }
           router.push('/sign-in')
        }
        if (!res.success && res.message === 'jwt expired') {
           toast.info('Link expired. Please try again', {
              position: 'top-center'
           })
           router.push('/forgot-password')
        }
        // if ('data' in res && res.data.status === 200) {
        //    toast.success('Password Reset Successful');
        //    localStorage.removeItem(authKey);
        //    deleteCookies([authKey, 'refreshToken']);
        //    router.push('/login');
        // } else {
        //    throw new Error('Something Went Wrong, Try Again');
        // }
     } catch (error) {
        toast.success('Something Went Wrong, Try Again');
     }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ width: '100%' }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(handleResetPassword)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: { xs: 2, sm: 4 },
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            component={motion.h4}
            sx={{ mb: 2, textAlign: 'center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Reset Password
          </Typography>

          <TextField
            variant="outlined"
            label="New Password"
            type="password"
            fullWidth
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              mb: 2,
              input: { fontSize: '1rem' },
              label: { fontSize: '0.9rem' },
            }}
            required
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            fullWidth
            {...register('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              mb: 2,
              input: { fontSize: '1rem' },
              label: { fontSize: '0.9rem' },
            }}
            required
          />

          <Button
            component={motion.button}
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              background: 'linear-gradient(45deg, #4CAF50, #81C784)',
              padding: '10px 0',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '5px',
              fontSize: '1rem',
            }}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default ResetPasswordPage;
