import { useNavigate } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import CommentSection from "../../components/CommentSection";
import { useAuth } from "../../hooks/useAuth";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function NewsPage() {
  const [comment, setComment] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);
  const [unliked, setUnliked] = useState<boolean>(false);
  const { googleSignIn } = useAuth();

  // const [loadingComments, setLoadingComments] = useState(false);

  const { selectedNews } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (selectedNews.newsId) {
  //     const documentRef = doc(db, "news", selectedNews.newsId);

  //     const unsubscribe = onSnapshot(documentRef, (documentSnapshot) => {
  //       if (documentSnapshot.exists()) {
  //         console.log(documentSnapshot.data());
  //         setSelectedNews(documentSnapshot.data());
  //       } else {
  //         console.log("Document does not exist.");
  //       }
  //     });
  //     return unsubscribe;
  //   } else {
  //     console.log("currentUser is not available.");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const postComment = async (comment: string) => {
    if (currentUser) {
      const collectionRef = collection(
        db,
        "news",
        selectedNews.newsId,
        "comments"
      );

      try {
        await addDoc(collectionRef, {
          likes: 0,
          person: currentUser.name,
          timestamp: Timestamp.now(),
          comment,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        });
        console.log("New Comment added..");
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      await googleSignIn();
      console.log(comment);
    }
  };

  const addLikeToNews = async () =>{

  }

  const likePost = async () => {
    if (currentUser) {
      const documentRef = doc(db, "users", currentUser.uid);

      if (!liked) {
        console.log("add like");
        try {
          const updatedLikedPostsId = [
            ...(currentUser.likedPostsId || []),
            currentUser.likedPostsId?.includes(selectedNews.newsId)
              ? null // or any other placeholder value if you want
              : selectedNews.newsId,
          ].filter((id) => id !== null);

          await updateDoc(documentRef, {
            likedPostsId: updatedLikedPostsId,
          });

          // const newsDocumentRef = doc(db, "news", selectedNews.newsId);
          // await updateDoc(newsDocumentRef, {
          //   likesCount: selectedNews.likesCount + 1,
          // });
        } catch (error) {
          console.log(error);
          throw error;
        }
      } else {
        console.log("remove like");
        try {
          const updatedLikedNewsIdList = currentUser.likedPostsId?.filter(
            (newsId) => newsId !== selectedNews.newsId
          );

          await updateDoc(documentRef, {
            likedPostsId: updatedLikedNewsIdList,
          });

          // const newsDocumentRef = doc(db, "news", selectedNews.newsId);
          // await updateDoc(newsDocumentRef, {
          //   likesCount: selectedNews.likesCount + 1,
          // });
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    } else {
      alert("Please Login for like");
    }
  };

  const unlikePost = async () => {
    if (currentUser) {
      const documentRef = doc(db, "users", currentUser.uid);

      if (!unliked) {
        console.log("unliked");
        try {
          // Assuming likedPostsId is an array field in your Firestore document
          const updatedUnlikedPostsId = [
            ...(currentUser.unlikedPostsId || []),
            selectedNews.newsId,
          ];

          await updateDoc(documentRef, {
            unlikedPostsId: updatedUnlikedPostsId,
          });

          // const newsDocumentRef = doc(db, "news", selectedNews.newsId);
          // await updateDoc(newsDocumentRef, {
          //   likesCount: selectedNews.likesCount + 1,
          // });
        } catch (error) {
          console.log(error);
          throw error;
        }
      } else {
        console.log("remove unlike");
        try {
          const updatedUnlikedNewsIdList = currentUser.likedPostsId?.filter(
            (newsId) => newsId !== selectedNews.newsId
          );

          await updateDoc(documentRef, {
            unlikedPostsId: updatedUnlikedNewsIdList,
          });

          // const newsDocumentRef = doc(db, "news", selectedNews.newsId);
          // await updateDoc(newsDocumentRef, {
          //   likesCount: selectedNews.likesCount + 1,
          // });
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    } else {
      alert("Please Login for unlike");
    }
  };

  const handleClickArrow = () => {
    navigate("/");
  };

  const handlePostComment = async () => {
    postComment(comment);
    setComment("");
  };

  const handleNewsLikeClick = async () => {
    setLiked((pre) => !pre);
    setUnliked(false);
    likePost();
  };
  const handleNewsUnlikeClick = async () => {
    setUnliked((pre) => !pre);
    setLiked(false);
    unlikePost();
  };

  return (
    <div className="flex flex-col py-2 px-7 items-center gap-2">
      <div className="w-full p-2" onClick={handleClickArrow}>
        <FaArrowLeft className="w-8 h-8 cursor-pointer" />
      </div>
      <img
        src={selectedNews.imageUrl}
        alt=""
        className="w-[350px] rounded-3xl h-[200px] top-2"
      />
      <div className="text-md text-black font-extrabold flex w-[330px]">
        {selectedNews.title}
      </div>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <p className="text-[14px]">{selectedNews.news}</p>

      <div className="flex gap-5 justify-between">
        <button onClick={handleNewsLikeClick}>
          <AiFillLike className={`${liked && "text-blue-700"} text-2xl`} />
        </button>
        <button onClick={handleNewsUnlikeClick}>
          <AiFillDislike className={`${unliked && "text-red-700"} text-2xl`} />
        </button>
      </div>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <div>
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="comment"
          className="border-gray-600 border px-5 py-1 rounded-lg"
        />
        <button
          onClick={handlePostComment}
          className="bg-blue-900 px-5 py-1 ml-2 rounded-2xl text-white font-semibold text-lg"
        >
          Add
        </button>
      </div>

      <div className="w-full">
        <CommentSection />
      </div>
    </div>
  );
}
export default NewsPage;
