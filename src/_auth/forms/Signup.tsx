// import { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// function Signup() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const formRef = useRef<HTMLFormElement>(null);
//   const { signup, currentUser } = useAuth();

//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formRef.current) return;

//     const formData = new FormData(formRef.current);
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
//     const username = formData.get("username") as string;

//     setLoading(true);
//     try {
//       await signup(email, password, username);

//       navigate("/");
//     } catch (error: any) {
//       console.error("Signup failed:", error.message);
//       setError("Signup failed:" + error.message);
//     }finally{
//       formRef.current.reset()
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="w-screen h-screen p-10 bg-[#040D12] text-[#ced3d1] flex flex-col items-center">
//       <form
//         onSubmit={handleSubmit}
//         ref={formRef}
//         className="flex flex-col gap-10 items-center justify-center"
//       >
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="bg-[#183D3D] font-input placeholder:text-[#93b1a6c4] text-xl px-[50px] py-[10px] rounded-2xl"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="bg-[#183D3D] font-input placeholder:text-[#93b1a6c4] text-xl px-[50px] py-[10px] rounded-2xl"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           className="bg-[#183D3D] font-input placeholder:text-[#93b1a6c4] text-xl px-[50px] py-[10px] rounded-2xl"
//         />

//         <button
//           type="submit"
//           className="bg-blue-900 px-5 py-2 rounded-2xl text-white font-semibold text-lg"
//         >
//           Signup
//         </button>
//       </form>

//       <div>
//         Allready have an account? <Link to="/login">login</Link>
//       </div>
//     </div>
//   );
// }
// export default Signup;
