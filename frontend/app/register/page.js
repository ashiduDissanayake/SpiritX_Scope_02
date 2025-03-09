"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { register, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      router.push("/players");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Redirect to login page after successful registration and 2 seconds
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        router.push("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, router]);

  const validateField = (name, value) => {
    let error = null;

    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      return error;
    }

    switch (name) {
      case "username":
        if (value.length < 8) {
          error = "Username must be at least 8 characters long";
        }
        break;
      case "password":
        if (!/[a-z]/.test(value)) {
          error = "Password must contain at least one lowercase letter";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter";
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
          error = "Password must contain at least one special character";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;

    let strength = 0;

    // Length
    if (password.length >= 8) strength += 20;

    // Lowercase letters
    if (/[a-z]/.test(password)) strength += 20;

    // Uppercase letters
    if (/[A-Z]/.test(password)) strength += 20;

    // Numbers
    if (/[0-9]/.test(password)) strength += 20;

    // Special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 20;

    return strength;
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 20) return "Very Weak";
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 60) return "Moderate";
    if (passwordStrength < 80) return "Strong";
    return "Very Strong";
  };

  const getPasswordStrengthColorClass = () => {
    if (passwordStrength < 20) return "bg-boundary";
    if (passwordStrength < 40) return "bg-boundary/90";
    if (passwordStrength < 60) return "bg-accent";
    if (passwordStrength < 80) return "bg-secondary";
    return "bg-secondary";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Update password strength
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Real-time validation
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const fieldErrors = {
      username: validateField("username", formData.username),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };

    setErrors(fieldErrors);

    // Check if there are any errors
    if (Object.values(fieldErrors).some((error) => error !== null)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(formData.username, formData.password);

      if (result.success) {
        setRegistrationSuccess(true);
      } else {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark to-dark-lighter py-12 px-4">
      {/* Cricket stumps decoration - left */}
      <div className="absolute left-4 top-1/3 hidden lg:flex flex-col items-center opacity-20">
        <div className="h-32 w-1.5 bg-light rounded-md"></div>
        <div className="h-32 w-1.5 bg-light rounded-md mx-3"></div>
        <div className="h-32 w-1.5 bg-light rounded-md"></div>
        <div className="h-1.5 w-16 bg-light rounded-md mt-0.5"></div>
      </div>
      
      {/* Cricket ball decoration - right */}
      <div className="absolute right-12 bottom-1/4 hidden lg:block">
        <div className="w-16 h-16 rounded-full bg-boundary/20 animate-pulse"></div>
        <div className="absolute inset-0 w-16 h-16 border-2 border-boundary/30 rounded-full border-dashed animate-spin-slow"></div>
      </div>
      
      <div className="w-full max-w-md p-8 bg-dark-lighter rounded-xl shadow-2xl border border-dark-lightest relative overflow-hidden">
        {/* Decorative curved lines for cricket stitching effect */}
        <div className="absolute -left-16 -top-16 w-32 h-32 border-b-4 border-dark-lightest opacity-10 rounded-full"></div>
        <div className="absolute -right-16 -bottom-16 w-32 h-32 border-t-4 border-dark-lightest opacity-10 rounded-full"></div>
        
        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-4">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Spirit11
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-center text-light">
            Create an Account
          </h1>

          {registrationSuccess ? (
            <div className="p-4 bg-secondary/10 border border-secondary rounded-lg text-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-secondary font-medium">Registration successful!</p>
              <p className="text-light-darkest mt-1">Redirecting to login page...</p>
              <div className="mt-3 w-full h-1 bg-dark-lightest rounded-full overflow-hidden">
                <div className="h-full bg-secondary animate-progress-bar"></div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-3 bg-boundary/10 border border-boundary text-boundary rounded-lg flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-light-darker font-medium mb-2 text-sm">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-lightest border border-dark-lightest text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  placeholder="Enter username (min 8 characters)"
                />
                {errors.username && (
                  <div className="mt-1.5 text-sm text-boundary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.username}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-light-darker font-medium mb-2 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-lightest border border-dark-lightest text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <div className="mt-1.5 text-sm text-boundary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.password}
                  </div>
                )}

                <div className="mt-2 space-y-1">
                  <div className="w-full h-1.5 bg-dark-lightest rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColorClass()}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className={`
                      ${passwordStrength < 20 ? 'text-boundary' : 
                        passwordStrength < 40 ? 'text-boundary/90' : 
                        passwordStrength < 60 ? 'text-accent' : 
                        'text-secondary'}
                      font-medium
                    `}>
                      {getPasswordStrengthLabel()}
                    </span>
                    <span className="text-light-darkest">
                      {formData.password ? `${passwordStrength}% secure` : ''}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-light-darker font-medium mb-2 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-lightest border border-dark-lightest text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="mt-1.5 text-sm text-boundary flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-primary-dark text-light py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : "Register"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-dark-lightest"></div>
            <span className="relative bg-dark-lighter px-2 text-light-darkest text-sm">
              or
            </span>
          </div>

          <div className="mt-6 text-center text-light-darkest">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary-light transition-colors font-medium"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
      
      {/* Cricket pitch element */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="h-1.5 w-48 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-40"></div>
      </div>
    </div>
  );
}