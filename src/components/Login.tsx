"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Login({ setCredentialsNotFilled }: any) {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/users/login`, user);
      console.log("OTP sent success", response.data);
      toast.success("OTP sent successfully.");
      setCredentialsNotFilled(false);
    } catch (error) {
      console.error("OTP sending failed", error);
      toast.error("OTP sending failed, please try again.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-3">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {loading ? "Processing..." : "Log In"}
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
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
                placeholder="you@email.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              <Link
                href="/forgot-password"
                className="relative right-0 top-2 transform -translate-y-1/2 text-sm text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot Password?
              </Link>
            </div>

            {btnDisabled ? (
              <button
                className="w-full cursor-not-allowed text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled
              >
                Cannot Log In
              </button>
            ) : (
              <button
                type="submit"
                className={`w-full px-4 py-2 text-white font-medium rounded-lg focus:outline-none ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Log In"}
              </button>
            )}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don{"'"}t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
