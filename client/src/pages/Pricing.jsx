import React, { useState, useEffect } from "react";

function Pricing() {
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState(0);
  const [userId, setUserId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < 3) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:1337/api/loggeduser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { userName } = await response.json();
        const userEmailResponse = await fetch(
          `http://localhost:1337/api/user/${userName}`
        );
        const { user } = await userEmailResponse.json();
        setUserEmail(user.email);
        const userId = user._id;
        setUserId(userId);
        const availableTokenResponse = await fetch(
          `http://localhost:1337/api/totalTokens?userId=${userId}`
        );
        const { totalToken } = await availableTokenResponse.json();
        setToken(totalToken);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleClick = async (itemId) => {
    localStorage.setItem("itemId", itemId);
    localStorage.setItem("quantity", quantity);
    console.log(itemId);
    console.log(quantity);
    try {
      const response = await fetch("http://localhost:1337/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          items: [{ id: itemId, quantity: quantity }],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="dashboard flex flex-col items-center pb-14 font-bold">
      <div className="container mx-auto mb-32 max-w-4xl px-5 pt-8 pb-16 sm:mb-0 sm:pt-10">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="font-logo mt-4 text-center text-5xl font-bold md:text-6xl">
            Memberships
          </h1>
          <p className="m-auto mt-4 max-w-2xl text-center text-base text-slate-700/70">
            Choose a plan that works for you 🚀
          </p>
          <div className="my-8 space-y-8 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            <div className="option-one w-full rounded-lg p-8 ">
              <div className="flex h-full flex-col p-6">
                <div className="flex items-center space-x-5">
                  <h2 className="text-2xl font-semibold leading-6 underline decoration-dashed decoration-1 underline-offset-8">
                    Starter
                  </h2>
                  <div className="flex items-center justify-center">
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800/30 bg-lime-300 text-gray-700
                      "
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800/30 bg-lime-300 text-gray-700 "
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-5 space-y-1 text-gray-600/80 ">
                  <div className="text-orange-600">
                    🎯 {2 * quantity} lakh Tokens.
                  </div>
                  <div>🎯 No slow generations.</div>
                  <div>🎯 Fast Support</div>
                  <div>🎯 One-Time Payment </div>
                </div>
                <div className="flex items-center space-x-10 pt-7">
                  <div>
                    <span className="white text-4xl font-bold text-slate-700">
                      ₹{80 * quantity}
                    </span>
                    <span className="text-base font-medium">/ Individual</span>
                  </div>
                </div>

                <button
                  className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-t from-indigo-600 via-indigo-600 to-indigo-500 px-8 py-2 text-base text-white shadow drop-shadow transition-all hover:brightness-110 active:scale-95 "
                  onClick={() => handleClick(1)}
                >
                  Get started
                </button>
              </div>
            </div>
            <div className="option-one w-full rounded-lg p-8 ">
              <div className="absolute -top-2.5 -right-2.5 z-10 rounded bg-red-600 py-1.5 px-4 text-sm font-medium text-white shadow drop-shadow">
                Most Popular
              </div>
              <div className="flex h-full flex-col p-6">
                <h2 className="text-2xl font-semibold leading-6 underline decoration-dashed decoration-1 underline-offset-8">
                  Pro
                </h2>
                <div className="mt-5 space-y-1 text-lime-600 ">
                  <div className="text-orange-600">🎯 6 Million Tokens.</div>
                  <div>🎯 Ultimate Fast generations.</div>
                  <div>🎯 Ultra Fast Support</div>
                  <div>🎯 One-Time Payment </div>
                </div>
                <div className="mt-auto pt-7">
                  <span className="white text-4xl font-bold text-slate-700">
                    {" "}
                    ₹800
                  </span>
                  <span className="text-base font-medium">/ Individual</span>
                </div>
                <button
                  className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-t from-indigo-600 via-indigo-600 to-indigo-500 px-8 py-2 text-base text-white shadow drop-shadow transition-all hover:brightness-110 active:scale-95 "
                  onClick={() => handleClick(2)}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl px-6">
        <h2 className="decoration-width-2 py-10 text-left text-4xl underline decoration-dashed decoration-1 underline-offset-8">
          Related Questions
        </h2>

        <div className="grid  grid-cols-2 gap-4 ">
          <div className="faq option-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-zinc-600">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq option-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-zinc-600">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq option-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-zinc-600">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
          <div className="faq option-one w-full rounded-lg p-8">
            <h4 className="mb-2">How does the plan limit work?</h4>
            <div className="text-zinc-600">
              If you go over your limit we'll nicely ask you to upgrade. You can
              create up to 100 images per month for free.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
