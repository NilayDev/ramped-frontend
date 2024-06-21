"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const formDataObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_DEV_API_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formDataObject.email,
            password: formDataObject.password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Something went wrong!");
      }

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required={true}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={true}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create an account
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
