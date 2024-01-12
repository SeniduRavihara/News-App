import { useEffect, useState } from "react";
import { commentListType, commentType } from "../types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useData } from "../hooks/useData";
import { INITIAL_COMMENT_LIST } from "../constants";
import { useAuth } from "../hooks/useAuth";

function CommentSection() {
  const [commentList, setCommentList] =
    useState<commentListType>(INITIAL_COMMENT_LIST);
  const { selectedNews, likePost } = useData();

  const { currentUser } = useAuth();

  useEffect(() => {
    const collectionRef = collection(
      db,
      "news",
      selectedNews.newsId,
      "comments"
    );
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const newCommentArr = QuerySnapshot.docs.map((doc) => {
        const data = doc.data() as commentType;
        const timestamp = data.timestamp?.toDate();
        return {
          ...data,
          timestamp: timestamp,
          commentId: doc.id,
        };
      });

      setCommentList(newCommentArr);
    });

    return unsubscribe;
  }, [selectedNews.newsId]);

  const getTimeDifferent = (timestamp: Date | undefined | null) => {
    return Math.abs(new Date().getHours() - (timestamp?.getHours() ?? 0)) !== 0
      ? `${Math.abs(new Date().getHours() - (timestamp?.getHours() ?? 0))}h`
      : "";
  };

  const handleLikeClick = async () => {
    // await likePost();
  };

  return (
    <div className="w-full">
      {commentList.map((commObj, index) => (
        <div key={index} className="flex gap-2 py-2 w-full">
          <img src={commObj.photoURL} alt="" className="w-8 h-8 rounded-full" />
          <div className="w-full">
            <div className="bg-gray-500/20 px-3 py-1 rounded-xl w-full">
              <div className="text-[12px] font-semibold">{commObj.person}</div>
              <div>{commObj.comment}</div>
            </div>
            <div className="flex gap-3 text-[12px] ml-2 font-semibold text-gray-600/70">
              <div className="">{getTimeDifferent(commObj.timestamp)}</div>
              <button
                className={`${
                  currentUser?.uid === commObj.uid &&
                  "text-red-900 font-extrabold"
                }`}
                onClick={handleLikeClick}
              >
                Like
              </button>
              <button>Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CommentSection;
