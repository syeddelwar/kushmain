import Link from "next/link";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import logo from "img/logo.png";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

export default function signin() {
  const { error, singin, user, setError } = useContext(AuthContext);

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setCookie(null, "token", user.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: true,
      });
      router.push("/dashboard");
      toast.success("Login Successfully!");
      setError(null);
    } else if (error) {
      if (error.message) {
        toast.error(error.message[0].messages[0].message);
      } else {
        toast.error(error.error.message);
      }
    }
  }, [user, error]);

  const handleSignin = async (e) => {
    e.preventDefault();
    singin({ email, password });
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 ">
        <Toaster position="top-center" />
        <div className="container mx-auto relative">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0  ">
            <Link
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <Image
                className=" mr-2"
                width={50}
                height={50}
                src={logo}
                alt="logo"
              />
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700  relative">
              <Link href={`/`}>
                <RxCrossCircled className=" cursor-pointer  text-[1.5rem] absolute right-[.5rem] top-[.5rem]" />
              </Link>

              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSignin}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
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
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end">
                    <a
                      href="#"
                      className="text-sm font-medium text-link hover:underline dark:text-primary-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-softBlack hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <Link
                      href={`/dashboard/signup`}
                      className="font-medium text-link hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </form>

                <div className="border-b  border-gray-300  mt-2 mb-4">
                  <h1 className=" text-center  text-[20px] pb-2 text-gray-600">
                    or
                  </h1>
                </div>

                <div className="social__login flex items-center  justify-center  space-x-5">
                  <button
                    className=" flex  space-x-3  items-center
                   border border-gray-300 rounded-md p-2 font-bold text-[13px]
                  
                  "
                  >
                    <FcGoogle className="text-[1.5rem]" />
                    <span className=" inline-block">Log in with Google</span>
                  </button>
                  <button
                    className=" flex  space-x-3  items-center
                   border border-gray-300 rounded-md p-2 font-bold text-[13px]
                  
                  "
                  >
                    <FaFacebook className="text-[1.4rem]" />
                    <span className=" inline-block">Log in with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
