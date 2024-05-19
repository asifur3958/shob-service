import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(redirectTimer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/Signin");
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
        <h1 className="text-5xl font-extrabold mb-4" style={{ fontFamily: 'Caveat, cursive', color: '#3B82F6' }}>
          Congratulations!
        </h1>
        <p className="mb-4">
          You are successfully signed up and being redirected to the Sign in
          page in {countdown} seconds.
        </p>
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-blue-500 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Success;
