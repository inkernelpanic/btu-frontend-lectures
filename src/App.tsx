import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LecturePage from "./components/LecturePage";
import ShortcutsPage from "./components/ShortcutsPage";
import GitPage from "./components/GitPage";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="lectures/:id" element={<LecturePage />} />
        <Route path="shortcuts/:category" element={<ShortcutsPage />} />
        <Route path="git/:topic" element={<GitPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
