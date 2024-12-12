'use client';
import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userForgotPassword } from '@/services/actions/forgotPassword';
import { toast } from 'react-toastify';

const validationSchema = z.object({
  email: z.string().email('Please enter a valid email address!'),
});

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false); // State for disabling resend button
  const [error, setErorr]= useState('')
  const router = useRouter();

  const defaultValues = {
    email: '',
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -50, transition: { ease: 'easeInOut' } },
  };

  const handleForgotPassword = async (values: FieldValues) => {
    try {
      const res = await userForgotPassword(values);
      
      if (res.success === true) {
        toast.success('Check Your Email for Reset Link');
        setEmail(values.email)
        setSubmitted(true);
        setResendDisabled(false); // Enable resend button
      } else {
        setErorr(res.message)
      }
    } catch (err) {
      
    }
  };

  const handleResendEmail = async(values: FieldValues) => {
    // // Resend email logic
    // toast.success('Resend link sent to your email!');
    // setResendDisabled(true); // Disable resend button for some time
    // setTimeout(() => setResendDisabled(false), 60000); // Re-enable after 60 seconds
    // try {
    //     const res = await userForgotPassword(email as FieldValues);
        
    //     if (res.success === true) {
    //       toast.success('Check Your Email for Reset Link');
    //       setEmail(values.email)
    //       setSubmitted(true);
    //       setResendDisabled(false); // Enable resend button
    //     } else {
    //       setErorr(res.message)
    //     }
    //   } catch (err) {
        
    //   }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '1400px',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {!submitted ? (
          <Box
            component="form"
            onSubmit={handleSubmit(handleForgotPassword)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 6,
              border: '2px solid',
              borderColor: 'grey.300',
              borderRadius: 4,
              boxShadow: 6,
            }}
          >
            <Typography
              variant="h3"
              component={motion.h3}
              sx={{ mb: 4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Forgot Password
            </Typography>
            <TextField
              variant="outlined"
              label="Email Address"
              type="email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                mb: 4,
                input: { fontSize: '1.5rem' },
                label: { fontSize: '1.2rem' },
              }}
              required
              inputProps={{
                'aria-label': 'email',
              }}
            />
            {
                error? <Typography sx={{fontSize:'16px', color:'red', fontWeight:'600', mt:2}}>{error}</Typography>:''
            }
            <Button
              component={motion.button}
              type="submit"
              variant="contained"
              fullWidth
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                padding: '10px 0',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
              }}
            >
              Reset Password
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 6,
              border: '2px solid',
              borderColor: 'grey.300',
              borderRadius: 4,
              boxShadow: 6,
            }}
          >
            <Typography
              variant="h4"
              component={motion.h4}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ mb: 4 }}
            >
              Check your email for the reset link
            </Typography>
            <Button
              sx={{
                background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                padding: '10px 0',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '5px',
              }}
              fullWidth
              variant="contained"
              onClick={handleResendEmail}
              disabled={resendDisabled} // Disable button based on state
              component={motion.button}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Resend Email
            </Button>
          </Box>
        )}
      </motion.div>
    </Container>
  );
};

export default ForgetPasswordPage;
