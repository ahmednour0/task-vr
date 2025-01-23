import { useState } from "react";
import logoImg from "../assets/bgimg.png";
import { Icon } from "@iconify/react";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginAction } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginAction({ email, password, isEmployee: true });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row justify-center items-center px-6 md:px-20"
      style={{
        background:
          "linear-gradient(90deg, rgba(200,200,255,1) 0%, rgba(80,56,255,1) 70%)",
      }}
    >
      {/* Left Section */}
      <div className="flex flex-col justify-center w-full md:w-[554px] p-6 md:p-0">
        <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
          <h3 className="text-3xl md:text-5xl capitalize text-center font-semibold">
            Welcome Back
          </h3>
          <p className="text-[#62626B] text-base md:text-lg text-center">
            Step into our shopping metaverse for an unforgettable shopping
            experience.
          </p>

          {error && (
            <div className="text-red-600 text-center bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="border rounded-md flex items-center gap-2 bg-white shadow-sm">
              <Icon icon="mage:email" fontSize={25} className="ml-2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="py-2 px-3 outline-none border-none bg-inherit grow text-gray-700"
                required
              />
            </div>
            <div className="border rounded-md flex items-center gap-2 bg-white shadow-sm">
              <Icon icon="mdi:password" fontSize={25} className="ml-2 text-gray-400" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 px-3 outline-none border-none bg-inherit grow text-gray-700"
                required
              />
            </div>
            <button
  className={`rounded-md p-3 font-bold w-full md:w-auto ${
    isLoading || !email || !password
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#9414FF] hover:bg-[#7a12cc] cursor-pointer"
  } text-white`}
  disabled={!email || !password || isLoading}
  type="submit"
>
  {isLoading ? "Logging in..." : "Login"}
</button>
            <div className="text-center">
              Don’t have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Signup
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex justify-center items-center w-full md:w-auto">
        <div className="h-[300px] md:h-[600px] w-full md:w-[800px]">
          <img
            alt="logo-img"
            className="w-full h-full object-cover object-left  "
            src={logoImg}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
