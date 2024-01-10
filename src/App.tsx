import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/pages/Home";
import NotFound from "./pages/NotFound";
import NewsPage from "./_root/pages/NewsPage";

// const router = createBrowserRouter(
//   createRoutesFromChildren(
//     <Route>
//       {/* public routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Route>

//       {/* private routes */}
//       <Route element={<RootLayout />}>
//         <Route index element={<Home />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Route>
//   )
// );

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/news-page" element={<NewsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
