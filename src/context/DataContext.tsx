import { createContext, useEffect, useState } from "react";
// import { useAuth } from "../hooks/useAuth";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

import { dataContextType, newsListType, newsObjType } from "../types";
import {
  INITIAL_CONTEXT,
  INITIAL_NEWS_LIST,
  INITIAL_NEWS_OBJECT,
} from "../constants";

export const DataContext = createContext<dataContextType>(INITIAL_CONTEXT);

function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [newsList, setNewsList] = useState<newsListType>(INITIAL_NEWS_LIST);
  const [lastNews, setLastNews] = useState<newsObjType>(INITIAL_NEWS_OBJECT);
  const [selectedNews, setSelectedNews] =
    useState<newsObjType>(INITIAL_NEWS_OBJECT);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastFetchedNews, setLastFetchedNews] =
    useState<newsObjType>(INITIAL_NEWS_OBJECT);
  // const endOfListRef = useRef();
  // const { currentUser } = useAuth();

  // -----------------------------------
  // useEffect(() => {
  //   const documentRef = collection(
  //     db,
  //     "users",
  //   );
  //   const unsubscribe = onSnapshot(documentRef, (QuerySnapshot) => {
  //     const newsArr = QuerySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //     }));
  //     console.log(newsArr);
  //   });

  //   return unsubscribe;
  // }, [currentUser]);

  // ---------------------------------------

  // useEffect(() => {
  //   const collectionRef = collection(db, "news");
  //   const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
  //     const newsArr = QuerySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       newsId: doc.id,
  //     }));
  //     console.log(newsArr);
  //     setNewsList(newsArr);
  //     setLastNews(newsArr[0])
  //   });

  //   return unsubscribe;
  // }, [currentUser]);

  // ----------------------------------------------------

  useEffect(() => {
    console.log(newsList);
    
    if(newsList.length > 0){
      setLastNews(newsList[0]);
    }
  }, [newsList]);

  useEffect(() => {
    if (newsList.length === 1) {
      setNewsList([]);
      fetchData();
    }

    const handleScroll = () => {
      // if (containerRef.current) {
      //   const triggerHeight =
      //     containerRef.current?.scrollTop + containerRef.current?.offsetHeight;
      //   if (triggerHeight >= containerRef.current?.scrollHeight && !loading) {
      //     console.log("BOTTOM");
      //     fetchData();
      //   }
      // }
    };

    window.addEventListener("scroll", handleScroll);

    fetchData();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const collectionRef = collection(db, "news");
    const q = lastNews
      ? query(
          collectionRef,
          orderBy("publishedTime", "desc"),
          startAfter(lastFetchedNews.publishedTime),
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
      setLastFetchedNews(newNewsArr[newNewsArr.length - 1]);
    }

    setLoading(false);
  };

  const value = {
    newsList,
    lastNews,
    selectedNews,
    setSelectedNews,
    loading,
    fetchData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
