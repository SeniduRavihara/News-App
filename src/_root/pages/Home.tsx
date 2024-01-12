import { useData } from "../../hooks/useData";
import Headerbar from "../../components/Headerbar";
import { useNavigate } from "react-router-dom";
import { newsListType, newsObjType } from "../../types";
import FirstLoading from "../../animations/firstLoading/FirstLoading";
import { Toaster } from "react-hot-toast";

function Home() {
  const { newsList, lastNews, setSelectedNews, fetchData, firstLoading } =
    useData();
  const navigate = useNavigate();

  const getNews = (newsId: string, newsList: newsListType): newsObjType => {
    return newsList.filter((news) => news.newsId === newsId)[0];
  };

  const handleNewsClick = (newsId: string) => {
    const selectedNews = getNews(newsId, newsList);
    setSelectedNews(selectedNews);
    navigate("/news-page");
  };

  if (firstLoading) {
    return <FirstLoading />;
  }

  return (
    <div className="flex flex-col items-center px-2 h-screen gap-2">
      <Headerbar />

      <div className="flex flex-col w-full items-center relative">
        <img
          src={lastNews.imageUrl}
          alt=""
          className="w-[350px] rounded-3xl h-[200px] top-2"
        />

        <h2 className="text-md text-white font-extrabold absolute flex w-[330px] bg-black/20 p-2 pb-4 -bottom-2">
          {lastNews.title}
        </h2>
      </div>

      <div className="font-bold flex flex-col px-3 divide-y mt-4 ">
        {newsList.map((newsObj, index) => (
          <div
            key={index}
            className="flex gap-3 py-2 items-center cursor-pointer"
            onClick={() => handleNewsClick(newsObj.newsId)}
          >
            <img
              src={newsObj.imageUrl}
              alt={newsObj.title}
              className="w-[120px] h-[68px] rounded-xl"
            />
            <div className="text-[13px]">{newsObj.title}</div>
          </div>
        ))}
      </div>

      <button
        onClick={fetchData}
        className="bg-blue-900 px-5 py-2 rounded-2xl text-white font-semibold text-lg"
      >
        Load More
      </button>
      <Toaster />
    </div>
  );
}
export default Home;
