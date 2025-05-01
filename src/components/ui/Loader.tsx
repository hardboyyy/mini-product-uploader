import React from 'react'

export default function Loader () {
  return (
    <>
        {/* <div className="flex items-center justify-center">
            <svg
            className="size-5 animate-spin border-gray-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            >
            <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          fill="none"
          strokeWidth="4"
            ></circle>
            <path
          className="opacity-75"
          stroke="currentColor"
          d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
            ></path>
            </svg>
        </div> */}
         <div className="size-4 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
    </>
  )
}
