import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authClient } from "../lib/authClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const SingUpPage = () => {

 
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const navigate = useNavigate();


const socialSigninGoogle = async () => {
  try {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      fetchOptions: {
        onSuccess: () => {
          toast.success("Welcome to ContentBuddy");
          navigate("/");
        },
      },
    });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill all fields");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    const { data, error } = await authClient.signUp.email({
      name:name,
      email:email,
      password:password
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully");
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};


return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4 py-4 overflow-hidden">
    <div className="w-full max-w-md">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-slate-200/60">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            C
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2 text-sm">
            Create your ContentBuddy account
          </p>
        </div>

        {/* Google Signup */}
        <button
          type="button"
          onClick={socialSigninGoogle}
          className="w-full h-12 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-3 font-medium text-slate-700 shadow-sm"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="border-t border-slate-200" />

          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-xs text-slate-400 uppercase tracking-wider">
            or continue with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Email Address
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="john@example.com"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-11 px-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-11 px-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-indigo-200"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-5">
          Already have an account?
          <button
            type="button"
            onClick={() => navigate("/singin")}
            className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  </div>
  
);


}

export default SingUpPage