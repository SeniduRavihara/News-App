import { MdAccountCircle } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdSearch } from "react-icons/io";
import { useAuth } from "../hooks/useAuth";

function Headerbar() {
  const { logout, googleSignIn, currentUser } = useAuth();


  const handleAccountClick = async () => {
    try {
      if (currentUser) {
        await logout();
      } else {
        await googleSignIn();
      }

      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full px-10 py-2">
        <h1 className="text-3xl font-extrabold text-red-600">News</h1>

        <div className="flex items-center gap-5">
          <IoMdSearch className="w-6 h-6 cursor-pointer" />
          <IoMdNotificationsOutline className="w-6 h-6 cursor-pointer" />
          <div onClick={handleAccountClick}>
            {currentUser ? (
              <img src={currentUser.photoURL ?? ""} className="w-10 h-10 rounded-full" />
            ) : (
              <MdAccountCircle className="w-10 h-10 text-gray-400 cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      <hr className="border border-t-[1px] border-gray-300 w-full" />
    </div>
  );
}
export default Headerbar;
