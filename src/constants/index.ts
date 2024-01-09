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
    {
      commentCount: 0,
      likesCount: 0,
      news: "",
      publishedTime: "",
      title: "",
      imageUrl: "",
      newsId: "",
    },
  ],
  lastNews: {
    commentCount: 0,
    likesCount: 0,
    news: "",
    publishedTime: "",
    title: "",
    imageUrl: "",
    newsId: "",
  },
};

// ---------------------------------

export const INITIAL_AUTH_CONTEXT = {
  currentUser: {
    uid: "",
    email: "",
  },
  setCurrentUser: ()=>{},
  signup: () => {},
  login: () => {},
  logout: () => {},
};
