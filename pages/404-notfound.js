import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link href="/">
        <a className="text-blue-600 hover:underline">Go to Home Page</a>
      </Link>
    </div>
  );
};

export default NotFoundPage;
