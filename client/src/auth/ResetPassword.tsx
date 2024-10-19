import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate an API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      toast.success("Password reset link sent successfully");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Enter your email below and we'll send you a link to reset your password.
          </p>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green focus:border-green sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-green hover:bg-hoverGreen focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="mt-8 text-sm text-center text-green">
            We've sent a password reset link to your email: {email}. Please check your inbox.
          </div>
        )}

        <div className="mt-6 text-center">
          Return to{" "}
          <Link to="/login" className="font-medium text-green hover:text-hoverGreen">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
