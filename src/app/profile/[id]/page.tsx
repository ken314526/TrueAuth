import Link from "next/link";
import React from "react";

export default function IdPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 sm:px-6 md:px-8 bg-gray-100 dark:bg-gray-900">
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center">
        User ID:
        <span className="ml-2 sm:ml-4 px-2 sm:px-3 py-1 rounded bg-slate-700 text-white">
          {params.id}
        </span>
      </p>
      <Link href={`/profile`}>
        <button className="mt-4 px-4 py-2 sm:px-6 sm:py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800">
          Go to Profile
        </button>
      </Link>
    </div>
  );
}
