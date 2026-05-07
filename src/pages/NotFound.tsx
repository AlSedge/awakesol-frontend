import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-slate-600 mb-8 max-w-md">
        Oops! We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link 
        to="/" 
        className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;