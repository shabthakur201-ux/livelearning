"use client";


import Link from "next/link";
import api from "../../src/axios";
import { useState } from "react";
import { toast } from "sonner";
// import { NestedMiddlewareError } from "next/dist/build/utils";

function Register() {
  const [form, setForm] = useState({
    name: "",
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
    name: form.name,
    email: form.email,
    password: form.password,
  };

  const handlSubmit = async (e) => {
    e.preventDefault();


    setError({})

      const newErrors = {};


   
  if (!form.name.trim()) {
  newErrors.name = "Name is required";
} else if (form.name.trim().length < 2) {
  newErrors.name = "Name must be greater than 2 letters";
}



 if (!form.email.trim()) {
  newErrors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
  newErrors.email = "Please enter a valid email";
}

  if (!form.password) {
    newErrors.password = "Password is required";
  }else if (form.password.trim().length < 2) {
  newErrors.password   = "Name must be greater than 2 letters";
}


  if (Object.keys(newErrors).length > 0) {
    setError(newErrors);
    return;
  }
    try {

      const res = await api.post("/user/register", payload);
      setForm({
        email:"",
        name:"",
        password:""
      })

      toast.success("Register successfully");
      console.log(res.data);
    } catch (error) {
      toast.error("Registration error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create Account
          </h1>

          <p className="mt-1 text-sm text-blue-100">
            Enter your details to create a new account
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handlSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                // required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />

             {error.name && (
  <p className="mt-1 text-sm text-red-500">
    {error.name}
  </p>
)}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={form.email}
                onChange={handleChange}
                // required
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
                type="password"
                placeholder="Enter your password"
                name="password"
                value={form.password}
                onChange={handleChange}
                // required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
              {error.password && (
  <p className="mt-1 text-sm text-red-500">
    {error.password}
  </p>
)}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
            >
              Create Account
            </button>


          </form>
          <Link href="/Login"> aleady have account <span className="text-[blue]">login</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Register;