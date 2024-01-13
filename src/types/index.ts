import { FieldValue, Timestamp } from "firebase/firestore";

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
  likedPostsId?: Array<string> | undefined;
  unlikedPostsId?: Array<string> | undefined;
};

// ----------------------------------

export type commentType = {
  comment: string;
  likes: number;
  person: string;
  timestamp: Timestamp | null;
  commentId: string;
  photoURL: string;
  uid: string;
};

export type commentListType = Array<{
  comment: string;
  likes: number;
  person: string;
  timestamp: Date | null | undefined;
  commentId: string;
  photoURL: string;
  uid: string;
  replyArray: null | Array<{
    comment: string;
    likes: number;
    person: string;
    timestamp: Date | null | undefined;
    replyId: string;
    replyTo: string;
    photoURL: string;
    uid: string;
  }>;
}>;
