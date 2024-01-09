import { useData } from "../../hooks/useData";
import Headerbar from "../../components/Headerbar";
import { useNavigate } from "react-router-dom";
import { newsListType, newsObjType } from "../../types";
// import { useEffect, useRef, useState } from "react";
// import {
//   collection,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
// } from "firebase/firestore";
// import { db } from "../../firebase/firebaseConfig";
// import { INITIAL_NEWS_LIST, INITIAL_NEWS_OBJECT } from "../../constants";

function Home() {
  const { newsList, lastNews, setSelectedNews } = useData();
  const navigate = useNavigate();

  // const [newsList, setNewsList] = useState<newsListType>(INITIAL_NEWS_LIST);
  // const [lastNews, setLastNews] = useState<newsObjType>(INITIAL_NEWS_OBJECT);
  // const [loading, setLoading] = useState(false);
  // const endOfListRef = useRef();

  // useEffect(() => {
  //   const collectionRef = collection(db, "news");

  //   const fetchData = async () => {
  //     setLoading(true);

  //     const querys = query(
  //       collectionRef,
  //       startAfter(lastNews.publishedTime),
  //       orderBy("publishedTime"),
  //     );

  //     const querySnapshot = await getDocs(querys);

  //     const newNewsArr = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       newsId: doc.id,
  //     }));

  //     console.log(newNewsArr);
      

  //     setNewsList((prevNewsList) => [...prevNewsList, ...newNewsArr]);

  //     if (newNewsArr.length > 0) {
  //       setLastNews(newNewsArr[newNewsArr.length - 1]);
  //     }

  //     setLoading(false);
  //   };

  //   const handleScroll = () => {
  //     if (
  //       endOfListRef.current &&
  //       endOfListRef.current.getBoundingClientRect().top <= window.innerHeight
  //     ) {
  //       fetchData();
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   fetchData(); // Initial data fetch

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [lastNews]);

  const getNews = (newsId: string, newsList: newsListType): newsObjType => {
    return newsList.filter((news) => news.newsId === newsId)[0];
  };

  const handleNewsClick = (newsId: string) => {
    const selectedNews = getNews(newsId, newsList);
    setSelectedNews(selectedNews);
    navigate("/news-page");
  };

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
    {/* <div ref={endOfListRef} />
      {loading && <p>Loading...</p>} */}
    </div>
  );
}
export default Home;
