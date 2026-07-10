
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authClient } from "../lib/authClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleGooglesingnIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
          callbackURL: "http://localhost:5173/dashboard",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in succesfully");
            navigate("/dashboard");
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

    const { data, error } = await authClient.signIn.email({
  email: email,
  password: password,
  fetchOptions:{
    onSuccess:() => {
      toast.success("Logged in Succesfully")
      navigate("/dashboard")
    }
  }
});

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account Created Successfully");
    navigate("/dashboard");
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
              Welcome Back
            </h1>

            <p className="text-slate-500 mt-2 text-sm">
              Sign in to continue to ContentBuddy
            </p>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGooglesingnIn}
            type="button"
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
              <div className="flex justify-between mb-2">
                <label className="text-sm text-slate-700">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-indigo-600 hover:text-indigo-500"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full h-11 px-4 pr-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? (
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
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-500 text-sm mt-5">
            Don't have an account?
            <button
              type="button"
              onClick={()=>navigate("/singup")}
              className="ml-1 text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

