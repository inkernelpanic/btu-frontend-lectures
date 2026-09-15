import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Page not found — BTU Frontend";
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-6xl font-bold text-gray-200">404</p>
      <h1 className="text-2xl font-bold text-gray-900 mt-4">
        That page does not exist
      </h1>
      <p className="text-gray-600 mt-3">
        Nothing is published at <code>{pathname}</code>. It may have been
        renamed, or the link may have a typo.
      </p>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Course home
        </Link>
        <Link
          to="/lectures/01"
          className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
        >
          Lecture 01
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
