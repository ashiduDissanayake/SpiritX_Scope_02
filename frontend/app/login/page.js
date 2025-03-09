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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Login to Spirit11
        </h1>

        <form onSubmit={handleSubmit}>
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {submitError}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <div className="mt-1 text-sm text-red-600">{errors.username}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <div className="mt-1 text-sm text-red-600">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
