export type newsObjType = {
  commentCount: number;
  likesCount: number;
  news: string;
  publishedTime: string;
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
};

// ---------------------------------

export type authContextType = {
  currentUser: currentUserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType | null>>;
  signup: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export type currentUserType = {
  uid: string;
  email: string | null;
};
