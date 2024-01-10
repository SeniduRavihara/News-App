// import { useEffect, useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
// import { GoogleButton } from "react-google-button";

// function Login() {
//   const formRef = useRef<HTMLFormElement>(null);
//   const { login, googleSignIn } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (formRef.current) {
//       const formData = new FormData(formRef.current);

//       const email = formData.get("email") as string;
//       const password = formData.get("password") as string;

//       try {
//         await login(email, password);
//         navigate("/");
//       } catch (error: any) {
//         console.log("Login failed:", error.message);
//       }finally {
//         formRef.current.reset()
//       }
//     }
//   };

//   const handleGoogleSignIn = async ()=>{
//     try {
//       await googleSignIn();
//     } catch (error) {
//       console.log(error);
//     }finally{
//       navigate("/")
//     }
//   }

//   return (
//     <div className="w-screen h-screen p-10 bg-[#040D12] text-[#ced3d1] flex flex-col items-center">
//       <form
//         onSubmit={handleSubmit}
//         ref={formRef}
//         className="flex flex-col gap-10 items-center justify-center"
//       >
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
//           Login
//         </button>
//       </form>

//       <GoogleButton onClick={handleGoogleSignIn} />

//       <div>
//         Not a user? <Link to="/signup">signup</Link>
//       </div>
//     </div>
//   );
// }
// export default Login;
