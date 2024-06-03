import React from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box p={4} display="flex" alignItems="center" justifyContent="center" minH="100vh">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} w="full" maxW="md">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input {...register('username')} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
