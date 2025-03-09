"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
        router.push("/admin");
      } else {
        router.push("/players");
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
    setFormData((prev) => ({ ...prev, [name]: value }));

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
    };

    setErrors(fieldErrors);

    // Check if there are any errors
    if (Object.values(fieldErrors).some((error) => error !== null)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(formData.username, formData.password);

      if (!result.success) {
        setSubmitError(result.error);
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark to-dark-lighter p-4">
      {/* Cricket ball decoration */}
      <div className="absolute top-12 right-12 hidden lg:block">
        <div className="w-16 h-16 rounded-full bg-boundary animate-pulse opacity-20"></div>
      </div>
      
      <div className="w-full max-w-md p-8 bg-dark-lighter rounded-xl shadow-2xl border border-dark-lightest relative overflow-hidden">
        {/* Subtle cricket stitch pattern */}
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full border-4 border-dashed border-dark-lightest opacity-10"></div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full border-4 border-dashed border-dark-lightest opacity-10"></div>
        
        <div className="relative z-10">
          {/* Logo/Brand */}
          <div className="flex justify-center mb-6">
            <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Spirit11
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-6 text-center text-light">
            Welcome Back
          </h1>

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
              <label
                htmlFor="username"
                className="block text-light-darker font-medium mb-2 text-sm"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-lightest border border-dark-lightest text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your username"
                />
              </div>
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
              <label
                htmlFor="password"
                className="block text-light-darker font-medium mb-2 text-sm"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-lightest border border-dark-lightest text-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <div className="mt-1.5 text-sm text-boundary flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-light py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center relative">
            <div className="absolute left-0 right-0 top-1/2 h-px bg-dark-lightest"></div>
            <span className="relative bg-dark-lighter px-2 text-light-darkest text-sm">
              or
            </span>
          </div>

          <div className="mt-6 text-center text-light-darkest">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary hover:text-primary-light transition-colors font-medium"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
      
      {/* Cricket pitch element */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="h-1.5 w-40 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-40"></div>
      </div>
    </div>
  );
}