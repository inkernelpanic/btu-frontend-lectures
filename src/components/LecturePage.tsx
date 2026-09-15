import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { lectures } from "../data/lectures";
import NotFound from "./NotFound";

const lectureModules = import.meta.glob("../lectures/lecture-*/index.tsx");

const lazyLectures: Record<
  string,
  React.LazyExoticComponent<React.ComponentType>
> = {};
for (const [path, loader] of Object.entries(lectureModules)) {
  const match = path.match(/lecture-(\d+)/);
  if (match) {
    lazyLectures[match[1]] = lazy(
      loader as () => Promise<{ default: React.ComponentType }>,
    );
  }
}

const LecturePage = () => {
  const { id } = useParams<{ id: string }>();

  const lecture = id ? lectures.find((l) => l.id === id) : null;
  const LectureComponent = id ? lazyLectures[id] : null;

  if (!lecture || !LectureComponent) {
    return <NotFound />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading lecture...</div>
        </div>
      }
    >
      <LectureComponent key={id} />
    </Suspense>
  );
};

export default LecturePage;
