import { Route, Routes } from "react-router-dom";
import Home from "./_root/pages/Home";
import NotFound from "./pages/NotFound";
import NewsPage from "./_root/pages/NewsPage";

function App() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/news-page" element={<NewsPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
