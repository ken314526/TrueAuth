"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    isVerified: false,
  });

  const [btnLogout, setBtnLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");

  const getUserDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.post("api/users/me");
      console.log(response);
      setUser({
        id: response.data.data._id,
        email: response.data.data.email,
        username: response.data.data.username,
        isVerified: response.data.data.isVerified,
      });

      setVerifyToken(response.data.data.verifyToken);
      toast.success("User fetched successfully.");
      setBtnLogout(true);
    } catch (error) {
      console.error("User could not be fetched ", error);
      toast.error("Failed to fetch user details.");
    }

    setLoading(false);
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      toast.success("Logged out Successfully.");
      setBtnLogout(false);
    } catch (error: any) {
      console.error("Failed to logout", error.message);
      toast.error("Failed to logout", error.message);
    }
  };

  return (
    <div className="bg-gray-50 p-4 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md dark:border dark:border-gray-700">
        <div className="p-6">
          <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            Profile
          </h1>
          <div className="mt-4 p-3 bg-gray-800 border rounded-lg">
            {user.id === "" ? (
              <p className="text-white">User not fetched</p>
            ) : (
              <div>
                <Link href={`/profile/${user.id}`}>
                  <p className="text-base text-white">Id: {user.id}</p>
                  <p className="text-base text-white">
                    Username: {user.username}
                  </p>
                  <p className="text-base text-white">Email: {user.email}</p>
                </Link>
                <p className="text-sm text-white mt-2">
                  Email Verification:
                  {user.isVerified ? (
                    <span className="ml-2 text-green-400 font-medium">
                      Verified
                    </span>
                  ) : (
                    <Link href={`/verify-email?token=${verifyToken}`}>
                      <button className="ml-2 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                        Verify Now
                      </button>
                    </Link>
                  )}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 space-x-4">
            <button
              onClick={getUserDetails}
              className={`text-white font-medium rounded-lg px-4 py-2 focus:outline-none ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Get User Details"}
            </button>

            <Link href={"/reset-password"}>
              <button
                className={`text-white bg-gray-600 hover:bg-gray-500 font-medium rounded-lg px-4 py-2 focus:outline-none`}
              >
                Reset Password
              </button>
            </Link>

            <button
              onClick={logout}
              className={`text-white font-medium rounded-lg px-4 py-2 focus:outline-none ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={loading}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
