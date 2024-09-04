"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, KeyboardEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function OTP({ setCredentialsNotFilled }: any) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    const otpValue = otp.join("");

    try {
      const response = await axios.post(`/api/users/verify-otp`, {
        otp: otpValue,
      });
      console.log("Login success", response.data);
      toast.success("Loged in successfully.");
      router.push("/profile");
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Login failed, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {loading ? "Processing..." : "Enter OTP"}
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleOtpSubmit}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 sm:w-14 h-12 sm:h-14 text-center text-xl sm:text-2xl font-extrabold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="max-w-xs mx-auto mt-4">
              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
              Didn{"'"}t receive code?{" "}
              <button
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                onClick={() => setCredentialsNotFilled(true)}
              >
                Go back
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
