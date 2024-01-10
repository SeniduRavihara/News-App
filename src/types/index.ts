import { FieldValue } from "firebase/firestore";

export type newsObjType = {
  commentCount: number;
  likesCount: number;
  news: string;
  publishedTime: FieldValue | null;
  title: string;
  imageUrl: string;
  newsId: string;
};

export type newsListType = Array<newsObjType>;

export type dataContextType = {
  newsList: newsListType;
  lastNews: newsObjType;
  selectedNews: newsObjType;
  setSelectedNews: React.Dispatch<React.SetStateAction<newsObjType>>;
  fetchData: () => void;
  firstLoading: boolean;
  loading: boolean;
};

// ---------------------------------

export type authContextType = {
  currentUser: currentUserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType | null>>;
  googleSignIn: () => void;
  logout: () => void;
};

export type currentUserType = null | {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
};
