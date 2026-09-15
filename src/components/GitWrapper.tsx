import { type ReactNode, useEffect } from "react";
import { Link } from "react-router-dom";
import { gitTopics } from "../data/git";

interface GitWrapperProps {
  id: string;
  title: string;
  children: ReactNode;
}

const GitWrapper = ({ id, title, children }: GitWrapperProps) => {
  const currentIndex = gitTopics.findIndex((t) => t.id === id);
  const current = currentIndex >= 0 ? gitTopics[currentIndex] : null;
  const prev = currentIndex > 0 ? gitTopics[currentIndex - 1] : null;
  const next =
    currentIndex < gitTopics.length - 1 ? gitTopics[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — BTU Frontend`;
  }, [id, title]);

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
          Git Basics
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-1">{title}</h1>
        {current && (
          <p className="text-gray-600 mt-2 leading-relaxed">
            {current.description}
          </p>
        )}
      </div>

      <div className="lecture-content">{children}</div>

      <nav className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
        {prev ? (
          <Link
            to={`/git/${prev.id}`}
            className="flex flex-col items-start text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span className="text-sm text-gray-500">Previous</span>
            <span className="font-medium">&larr; {prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/git/${next.id}`}
            className="flex flex-col items-end text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span className="text-sm text-gray-500">Next</span>
            <span className="font-medium">{next.title} &rarr;</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
};

export default GitWrapper;
