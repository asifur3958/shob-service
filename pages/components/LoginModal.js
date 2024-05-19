import { useRouter } from 'next/router';

const LoginModal = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/Signin');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-lg font-bold mb-4">You must log in first!</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={handleGoHome}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
