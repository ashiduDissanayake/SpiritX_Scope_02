'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      if (user.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/players');
      }
    }
  }, [isAuthenticated, user, router]);
  
  const validateField = (name, value) => {
    let error = null;
    
    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    
    return error;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    // Validate all fields
    const fieldErrors = {
      username: validateField('username', formData.username),
      password: validateField('password', formData.password)
    };
    
    setErrors(fieldErrors);
    
    // Check if there are any errors
    if (Object.values(fieldErrors).some(error => error !== null)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await login(formData.username, formData.password);
      
      if (!result.success) {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h1>Login to Spirit11</h1>
        
        <form onSubmit={handleSubmit}>
          {submitError && (
            <div className={styles.submitError}>{submitError}</div>
          )}
          
          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className={styles.fieldError}>{errors.username}</div>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className={styles.fieldError}>{errors.password}</div>
            )}
          </div>
          
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className={styles.registerLink}>
          Don't have an account? <Link href="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}