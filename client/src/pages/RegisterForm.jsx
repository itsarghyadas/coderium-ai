import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function registerUser(resData) {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:1337/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resData.username,
          name: resData.name,
          email: resData.email,
          password: resData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const data = await response.json();
      console.log(data);

      if (data.emailExists) {
        await toast.promise(
          () => new Promise((resolve, reject) => setTimeout(reject, 2000)),
          {
            pending: "Submitting...",
            error: "Email already exists.",
          }
        );
      } else if (data.user) {
        await toast.promise(
          () => new Promise((resolve, reject) => setTimeout(resolve, 2000)),
          {
            pending: "Submitting...",
            success: "Registration Successful.",
          }
        );
        localStorage.setItem("token", data.user);
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
        throw new Error("Registration failed!");
      }
    } catch (error) {
      console.error(error);
      setError(error?.message || "Some Error Occured, Try Again!");
      await toast.promise(
        () => new Promise((resolve, reject) => setTimeout(reject, 2000)),
        {
          pending: "Submitting...",
          error: error.message || "Registration failed!",
        }
      );
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = handleSubmit(registerUser);

  return (
    <div className="main-body flex h-screen items-center justify-center tracking-wider">
      <section className="m-4 w-[900px] rounded-lg md:m-8 lg:m-20  ">
        <div className="form-container relative flex items-center">
          <div className="form-part m-auto w-full rounded-xl bg-slate-900 p-10 text-white sm:w-[60%] lg:m-0 lg:w-[50%] lg:rounded-none lg:rounded-tl-lg lg:rounded-bl-lg lg:p-14">
            <div className="form-part-header">
              <p className="text-[12px] font-semibold text-slate-200/40">
                BEGIN YOUR JOURNEY
              </p>
              <h1 className="text-3xl font-bold text-white">
                Create Your Account
              </h1>
            </div>
            <div className="form-part-body mt-5">
              <form onSubmit={onSubmit}>
                <div className="form-group flex flex-col gap-2">
                  <div className="user-name flex flex-col gap-1">
                    <label className="text-[12px] text-white/80">
                      USERNAME
                    </label>
                    <input
                      className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-bold placeholder:text-slate-300/10 focus:outline-none ${
                        errors.username
                          ? "border-red-500"
                          : "border-slate-100/40 "
                      }`}
                      {...register("username", { required: true })}
                      type="text"
                      name="username"
                      id="username"
                      spellCheck="false"
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <span className="error-message">
                        Please choose your @ username.
                      </span>
                    )}
                  </div>
                  <div className="user-real-name flex flex-col gap-1">
                    <label className="text-[12px] text-white/80">
                      YOUR NAME
                    </label>
                    <input
                      className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-bold placeholder:text-slate-300/10 focus:outline-none ${
                        errors.name ? "border-red-500" : "border-slate-100/40 "
                      }`}
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      id="name"
                      spellCheck="false"
                      placeholder="Enter your name"
                    />
                    {errors.name && (
                      <span className="error-message">
                        Please enter your Name.
                      </span>
                    )}
                  </div>
                  <div className="user-email flex flex-col gap-1">
                    <label
                      className="text-[12px] text-white/60"
                      htmlFor="email"
                    >
                      EMAIL ADDRESS
                    </label>
                    <input
                      className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-medium placeholder:text-slate-300/10 focus:outline-none ${
                        errors.email ? "border-red-500" : "border-slate-100/40"
                      }`}
                      {...register("email", {
                        required: true,
                        pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      })}
                      type="email"
                      name="email"
                      id="registerEmail"
                      spellCheck="false"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <span className="error-message">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>
                  {/* //? Password */}
                  <div className="user-password flex flex-col gap-1">
                    <label
                      className="text-[12px] text-white/60"
                      htmlFor="password"
                    >
                      PASSWORD
                    </label>
                    <input
                      className={`focus:shadow-outline w-full appearance-none rounded border bg-transparent py-2.5 px-2 font-semibold leading-tight text-amber-400 shadow placeholder:text-sm placeholder:font-bold placeholder:text-slate-300/10 focus:outline-none ${
                        errors.password
                          ? "border-red-500"
                          : "border-slate-100/40 "
                      }`}
                      {...register("password", { required: true })}
                      type="password"
                      name="password"
                      id="registerPassword"
                      spellCheck="false"
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <span className="error-message">
                        Please enter your password.
                      </span>
                    )}
                  </div>
                  <div className="tack-box mt-1 flex items-center justify-start space-x-2">
                    <input
                      className="accent-amber-400"
                      id="checkbox"
                      type="checkbox"
                      defaultChecked={true}
                    />
                    <label
                      className="text-sm font-semibold text-amber-400/95"
                      htmlFor="checkbox"
                    >
                      {" "}
                      I agree the Terms & Conditions.
                    </label>
                  </div>
                  {/* //? btn */}
                  <div className="btn flex flex-col gap-2">
                    <button
                      className="mt-2 rounded bg-amber-400 p-2 font-bold text-black"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <a
                      className=" rounded bg-slate-200/10 p-2 text-center font-medium text-gray-300"
                      type="submit"
                      href="http://localhost:5173/login"
                    >
                      Already Have an Account?
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="right-part absolute top-0 right-0 hidden h-full lg:flex lg:w-[50%] ">
            <div className="main-right absolute top-5 right-5">
              <ul className="flex items-center justify-center space-x-10">
                <li className="docs rounded-full bg-black/70 py-1 px-5 font-bold text-slate-200 ring-2 ring-amber-400">
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
