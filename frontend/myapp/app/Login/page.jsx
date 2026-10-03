"use client";

import { toast } from "sonner";
import api from "../../src/axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
function Login() {
    const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error,setError]=useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const payload = {
    email: form.email,
    password: form.password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({})
    let newError={}
if(!form.email){
  newError.email=("plese provide email")
}else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  newError.email = "Please enter a valid email";
}
  if (!form.password) {
    newError.password = "Please provide password";
  }

if(Object.keys(newError).length>0){
  setError(newError)
  return
}

    try {

      const res = await api.post("/user/login", payload);
      console.log(res);

      toast.success("login sucessfully");
      router.push("/dashboard")
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-blue-100">
            Login to your account
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                placeholder="Enter your email"
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
             
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              {error.email && (
                <p className="text-[red]">{error.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                placeholder="Enter your password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                // required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              {error.password && (
                <p className="text-[red]">{error.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
            >
              Login
            </button>
            <Link href="/Register"> don't have any account <span className="text-[blue]">Register first</span></Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;