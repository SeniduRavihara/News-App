export const INITIAL_NEWS_OBJECT = {
  commentCount: 0,
  likesCount: 0,
  news: "",
  publishedTime: "",
  title: "",
  imageUrl: "",
  newsId: "",
};

export const INITIAL_NEWS_LIST = [INITIAL_NEWS_OBJECT];

export const INITIAL_CONTEXT = {
  newsList: [
    INITIAL_NEWS_OBJECT
  ],
  lastNews: INITIAL_NEWS_OBJECT,
  selectedNews: INITIAL_NEWS_OBJECT,
  setSelectedNews: ()=>{},
  loading: false,
  fetchData:()=>{},
};

// ---------------------------------

export const INITIAL_CURRENT_USER = {
  uid: "",
  email: "",
  name: "string",
  photoURL: "",
};


export const INITIAL_AUTH_CONTEXT = {
  currentUser: INITIAL_CURRENT_USER,
  setCurrentUser: () => {},
  googleSignIn: () => {},
  logout: () => {},
};
