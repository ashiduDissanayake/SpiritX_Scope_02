"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

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
      console.log(result);
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
    <div className={styles.registerPage}>
      <div className={styles.formContainer}>
        <h1>Create an Account</h1>

        {registrationSuccess ? (
          <div className={styles.successMessage}>
            Registration successful! Redirecting to login page...
          </div>
        ) : (
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

              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthFill}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <div className={styles.strengthLabel}>
                  {getPasswordStrengthLabel()}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <div className={styles.fieldError}>
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.registerButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Register"}
            </button>
          </form>
        )}

        <div className={styles.loginLink}>
          Already have an account? <Link href="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}
