"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(email);

    try {
      await axios.post("/api/users/forgot-pass", { email });
      toast.success("Password reset link sent to your email.");
      router.push("/login");
    } catch (error) {
      console.error("Failed to send reset email", error);
      toast.error("Failed to send reset email. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email address below and we{"'"}ll send you a link to
            reset your password.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white font-medium rounded-lg focus:outline-none ${
                email.length === 0 && "cursor-not-allowed"
              }  ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Go back to Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
