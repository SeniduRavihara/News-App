import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Signup from "./_auth/forms/Signup";
import Login from "./_auth/forms/Login";
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
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/news-page" element={<NewsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
