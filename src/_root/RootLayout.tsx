import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

function RootLayout() {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div><Outlet /></div>
  )
}
export default RootLayout