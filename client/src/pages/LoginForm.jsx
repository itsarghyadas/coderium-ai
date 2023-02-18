import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const submitLogin = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:1337/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const resData = await response.json();

      if (resData.user) {
        await toast.promise(
          () => new Promise((resolve) => setTimeout(resolve, 2000)),
          {
            pending: "Submitting...",
            success: "Login Successful.",
          }
        );
        localStorage.setItem("token", resData.user);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        await toast.promise(
          () => new Promise((_, reject) => setTimeout(reject, 2000)),
          {
            pending: "Submitting...",
            error: "Check your email and password.",
          }
        );
      }
    } catch (error) {
      console.log("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(submitLogin);

  return (
    <div className="main-body">
      <div className=" flex h-screen items-center justify-center tracking-wider">
        <section className="m-4 w-[840px] rounded-lg md:m-8 lg:m-20 ">
          <div className=" form-container relative flex items-center">
            <div className="form-part m-auto w-full rounded-xl bg-slate-900 p-10 text-white sm:w-[60%] lg:m-0 lg:w-[50%] lg:rounded-none lg:rounded-tl-lg lg:rounded-bl-lg lg:p-14">
              <div className="form-part-header">
                <p className="text-[12px] font-semibold text-slate-200/40">
                  ENJOY YOUR JOURNEY
                </p>
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              </div>
              <div className="form-part-body mt-5">
                <form onSubmit={onSubmit}>
                  <div className="form-group flex flex-col gap-2">
                    <div className="user-email flex flex-col gap-1">
                      <label
                        className="text-[12px] text-white/60"
                        htmlFor="email"
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        spellCheck="false"
                        placeholder="Enter your email address"
                        className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-medium placeholder:text-slate-300/10 focus:outline-none ${
                          errors.email
                            ? "border-red-500"
                            : "border-slate-100/40"
                        }`}
                        {...register("email", {
                          required: true,
                          pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                        })}
                      />
                      {errors.email && (
                        <span className="error-message">
                          Please enter a valid email address.
                        </span>
                      )}
                    </div>
                    <div className="user-password flex flex-col gap-1">
                      <label
                        className="text-[12px] text-white/60"
                        htmlFor="password"
                      >
                        PASSWORD
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        spellCheck="false"
                        placeholder="Enter your password"
                        className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-bold placeholder:text-slate-300/10 focus:outline-none ${
                          errors.password
                            ? "border-red-500"
                            : "border-slate-100/40 "
                        }`}
                        {...register("password", { required: true })}
                      />
                      {errors.password && (
                        <span className="error-message">
                          Please enter your password.
                        </span>
                      )}
                    </div>
                    <div className="btn flex flex-col gap-2">
                      <button
                        className="mt-2 rounded bg-amber-400 p-2 font-bold text-black"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                      <a
                        className=" rounded bg-slate-200/10 p-2 text-center font-medium text-gray-300"
                        type="submit"
                        href="http://localhost:5173/register"
                      >
                        Don't Have an Account?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="right-part absolute top-0 right-0 hidden h-full lg:flex lg:w-[50%]">
              <nav>
                <div className="absolute top-5 right-5">
                  <ul className="flex items-center justify-center space-x-10">
                    <li className="docs rounded-full bg-black/70 py-1 px-5 font-bold text-slate-200 ring-2 ring-amber-400">
                      <a href="#">Support</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginForm;
