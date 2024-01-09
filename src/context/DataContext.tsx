import { createContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { collection, doc, onSnapshot } from "firebase/firestore";
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
  const [selectedNews, setSelectedNews] = useState<newsObjType>(INITIAL_NEWS_OBJECT)
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();


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

  const value = {
    newsList,
    lastNews,
    selectedNews,
    setSelectedNews,
    loading
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataContextProvider;
