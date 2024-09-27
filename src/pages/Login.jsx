import React from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


const schema = yup.object().shape({
  username: yup.string().required('Kullanıcı adı zorunludur'),
  password: yup.string().required('Şifre zorunludur').min(6, 'Şifre en az 6 karakter olmalı'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [cookies, setCookie] = useCookies(['user']);

  
  const onSubmit = data => {
    
    const fakeResponse = {
      username: data.username,
      token: `${data.username}-token-12345`, 
    };

    
    setCookie('user', JSON.stringify(fakeResponse), { path: '/' });

    
    alert('Giriş başarılı!');
  };

  return (
    <div className="login-container max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input 
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
          {...register('username')} 
        />
        <p className="text-red-600 text-sm">{errors.username?.message}</p>
      </div>
  
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type="password"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          {...register('password')} 
        />
        <p className="text-red-600 text-sm">{errors.password?.message}</p>
      </div>
  
      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white p-2 rounded-md"
      >
        Submit
      </button>
    </form>
  </div>
  
  );
};

export default Login;
