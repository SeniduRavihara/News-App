import { useNavigate } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { FaArrowLeft } from "react-icons/fa";

function NewsPage() {
  const { selectedNews } = useData();
  const navigate = useNavigate();

  const handleClickArrow = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col py-2 px-7 items-center gap-2">
      <div className="w-full p-2" onClick={handleClickArrow}>
        <FaArrowLeft className="w-8 h-8 cursor-pointer" />
      </div>
      <img
        src={selectedNews.imageUrl}
        alt=""
        className="w-[350px] rounded-3xl h-[200px] top-2"
      />
      <div className="text-md text-black font-extrabold flex w-[330px]">
        {selectedNews.title}
      </div>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <p className="text-[14px]">{selectedNews.news}</p>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <div>COMMENTS</div>
    </div>
  );
}
export default NewsPage;
