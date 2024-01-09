import { Navigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
export default AuthLayout;
