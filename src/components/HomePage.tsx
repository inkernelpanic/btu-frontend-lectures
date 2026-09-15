import { useEffect } from "react";
import { Link } from "react-router-dom";
import { lectures, type LectureInfo } from "../data/lectures";
import { gitTopics } from "../data/git";
import { shortcutPages } from "../data/shortcuts";

const sections: {
  label: string;
  key: LectureInfo["section"];
  accent: string;
}[] = [
  { label: "HTML & CSS", key: "HTML & CSS", accent: "text-orange-600" },
  { label: "CSS Layout", key: "CSS Layout", accent: "text-blue-600" },
  { label: "Tools", key: "Tools", accent: "text-slate-600" },
  { label: "Exam", key: "Exam", accent: "text-amber-600" },
  { label: "JavaScript", key: "JavaScript", accent: "text-yellow-600" },
];

const HomePage = () => {
  useEffect(() => {
    document.title = "BTU Frontend Development — Lecture Materials";
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="mb-10">
        <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
          BIT-11.2022 · Bachelor's
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mt-2">
          Web Programming (Front End Development)
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">
          Sixteen weeks from "what is HTML?" to building interactive,
          responsive, data-driven pages. Every lecture below is a complete,
          self-contained reading with runnable examples, exercises and homework.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to="/lectures/01"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Start with Lecture 01 &rarr;
          </Link>
          <Link
            to="/git/git-bash"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            Git Basics
          </Link>
        </div>
      </header>

      {sections.map((section) => {
        const items = lectures.filter((l) => l.section === section.key);
        if (items.length === 0) return null;

        return (
          <section key={section.key} className="mb-10">
            <h2
              className={`text-xs font-bold uppercase tracking-wider ${section.accent} mb-3`}
            >
              {section.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map((lecture) => (
                <Link
                  key={lecture.id}
                  to={`/lectures/${lecture.id}`}
                  className="block border border-gray-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-sm transition-all"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-mono text-gray-400">
                      {lecture.id}
                    </span>
                    <h3 className="font-semibold text-gray-900">
                      {lecture.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                    {lecture.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mb-10">
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3">
          Git Basics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {gitTopics.map((topic) => (
            <Link
              key={topic.id}
              to={`/git/${topic.id}`}
              className="block border border-gray-200 rounded-lg p-4 hover:border-indigo-400 hover:shadow-sm transition-all"
            >
              <h3 className="font-semibold text-gray-900">{topic.title}</h3>
              <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                {topic.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3">
          Reference
        </h2>
        <div className="flex flex-wrap gap-2">
          {shortcutPages.map((page) => (
            <Link
              key={page.id}
              to={`/shortcuts/${page.id}`}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
