import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/user/signup", data);
      console.log(response.data);
      setLoading(false);
      router.push("http://localhost:3001/dashboard/suc");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative z-10">
            <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
        </div>
      )}

      <div className={`max-w-md w-full bg-white rounded-lg shadow-md p-6 ${loading ? 'filter blur-sm' : ''}`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Sign up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              name="name"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              type="text"
              id="phone"
              name="phone"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              type="email"
              id="email"
              name="email"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="DOB" className="block mb-1">Date of Birth</label>
            <input
              {...register("DOB", { required: "Date of Birth is required" })}
              type="date"
              id="DOB"
              name="DOB"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.DOB ? "border-red-500" : ""
              }`}
            />
            {errors.DOB && <span className="text-red-500">{errors.DOB.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              id="username"
              name="username"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              name="password"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match"
              })}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`border border-gray-400 rounded w-full p-2 focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className={`bg-blue-500 text-white py-2 px-4 rounded w-full ${
              loading ? "opacity-50 cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => router.push('/')}
          className="mt-4 bg-gray-500 text-white py-2 px-4 rounded w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default SignUp;
