"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false);

    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/users/verify-email", { token });
        setVerified(true);
        toast.success("Email verified successfully.");
        setError(false);
      } catch (error: any) {
        setError(true);
        console.error("Email could not be verified", error.response.data);
      }
    };

    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Verify Email
      </h1>

      <h2 className="text-lg p-3 mb-4 rounded bg-orange-500 text-black dark:bg-orange-700 dark:text-white">
        {token ? `${token}` : "No Token"}
      </h2>

      {verified && (
        <div className="flex flex-col items-center justify-center p-4 bg-blue-950 border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white">
            Email Verified Successfully
          </h2>
          <Link href="/profile">
            <p className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
              Go to Profile
            </p>
          </Link>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-800 border border-red-500 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-white">Error</h2>
        </div>
      )}
    </div>
  );
}
