import { useEffect, useRef, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { INITIAL_NEWS_LIST, INITIAL_NEWS_OBJECT } from "../constants/index";
import { newsListType, newsObjType } from "../types/index";

function PaginateTest2() {
  const [newsList, setNewsList] = useState<newsListType>(INITIAL_NEWS_LIST);
  const [lastNews, setLastNews] = useState<newsObjType>(INITIAL_NEWS_OBJECT);
  const [loading, setLoading] = useState(false);
  const endOfListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, "news");

    const fetchData = async () => {
      setLoading(true);

      const q = lastNews
        ? query(
            collectionRef,
            orderBy("publishedTime", "desc"),
            startAfter(lastNews.publishedTime),
            limit(5)
          )
        : collectionRef;

      const querySnapshot = await getDocs(q);

      const newNewsArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        newsId: doc.id,
      }));

      setNewsList((prevNewsList) => [...prevNewsList, ...newNewsArr]);

      if (newNewsArr.length > 0) {
        setLastNews(newNewsArr[newNewsArr.length - 1]);
      }

      setLoading(false);
    };

    if (newsList.length === 1) {
      setNewsList([]);
      fetchData();
    }

    const handleScroll = () => {
      if (
        endOfListRef.current &&
        (endOfListRef.current.getBoundingClientRect().top - 10) <=
          window.innerHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    fetchData(); // Initial data fetch

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastNews]);

  return (
    <div
      //   ref={containerRef}
      className="flex flex-col items-center px-2 h-screen gap-2 overflow-auto"
    >
      <div className="font-bold flex flex-col px-3 divide-y mt-4 ">
        {newsList.map((newsObj, index) => (
          <div
            key={index}
            className="flex gap-3 py-2 items-center cursor-pointer"
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
      {/* <button
        onClick={fetchData}
        className="bg-blue-900 px-5 py-2 rounded-2xl text-white font-semibold text-lg"
      >
        Load More
      </button> */}
      <div ref={endOfListRef} />
      {loading && <p className="absolute bottom-0">Loading...</p>}
    </div>
  );
}
export default PaginateTest2;
