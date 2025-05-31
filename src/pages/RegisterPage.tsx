import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Registration successful!');
      navigate('/detect');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
          <p className="text-gray-600">
            Join thousands of users fighting against misinformation
          </p>
        </div>
        
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className={`input-field ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('name', { 
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long'
                  }
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error-600">{errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={`input-field ${errors.email ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`input-field pr-10 ${errors.password ? 'border-error-500 focus:ring-error-500' : ''}`}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    }
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={`input-field ${errors.confirmPassword ? 'border-error-500 focus:ring-error-500' : ''}`}
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary py-2.5"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;