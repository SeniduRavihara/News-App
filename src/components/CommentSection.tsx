import { useEffect, useRef, useState } from "react";
import {
  commentDocType,
  commentListType,
  commentType,
  replyDocType,
} from "../types";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useData } from "../hooks/useData";
import { useAuth } from "../hooks/useAuth";
import { MdAccountCircle } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import Comment from "./Comment";
import Reply from "./Reply";
import { INITIAL_COMMENT_LIST } from "../constants";
// import JumpAndSlide from "../animations/jump-and-slide/JumpAndSlide";

function CommentSection() {
  const [commentList, setCommentList] =
    useState<commentListType>(INITIAL_COMMENT_LIST);
  const [replying, setReplying] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<commentType | null>(
    null
  );
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { selectedNews } = useData();
  const { currentUser, googleSignIn } = useAuth();

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNews.newsId]);

  useEffect(() => {
    console.log(commentList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentList]);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear the previous timer
      clearTimeout(scrollTimer);

      // Set a new timer to reset isScrolling to false after 500 milliseconds of no scrolling
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer); // Clear the timer when the component is unmounted
    };
  }, []);

  // ----------------------FETCH COMMENTS---------------------------

  const fetchComments = async () => {
    setLoading(true);
    try {
      const commentsCollectionRef = collection(
        db,
        "news",
        selectedNews.newsId,
        "comments"
      );
      const commentsQuery = query(
        commentsCollectionRef,
        orderBy("timestamp", "desc")
      );

      const queryCommentsSnapshot = await getDocs(commentsQuery);

      const commentsWithReply = await Promise.all(
        queryCommentsSnapshot.docs.map(async (commentDoc) => {
          const replyCollectionRef = collection(
            db,
            "news",
            selectedNews.newsId,
            "comments",
            commentDoc.id,
            "reply"
          );
          const replyQuery = query(
            replyCollectionRef,
            orderBy("timestamp", "asc")
          );
          const queryReplySnapshot = await getDocs(replyQuery);

          const replyArray = queryReplySnapshot.docs.map((replyDoc) => {
            const replyData = replyDoc.data() as replyDocType;
            const timestamp = replyData.timestamp?.toDate();
            return {
              ...replyData,
              timestamp,
              replyId: replyDoc.id,
            };
          });

          const commentData = commentDoc.data() as commentDocType;
          const commentTimestamp = commentData.timestamp?.toDate();

          return {
            replyArray,
            ...commentData,
            timestamp: commentTimestamp,
            commentId: commentDoc.id,
          };
        })
      );

      // console.log(commentsWithReply);
      setCommentList(commentsWithReply);
    } catch (error) {
      console.error("Error getting documents: ", error);
    } finally {
      setLoading(false);
      setFirstLoad(true);
    }
  };

  // --------------------------------------------

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

        fetchComments();
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      await googleSignIn();
      console.log(comment);
    }
  };

  const postReply = async (comment: string) => {
    if (currentUser && selectedComment) {
      const collectionRef = collection(
        db,
        "news",
        selectedNews.newsId,
        "comments",
        selectedComment?.commentId,
        "reply"
      );

      try {
        await addDoc(collectionRef, {
          likes: 0,
          person: currentUser.name,
          replyTo: selectedComment.uid,
          timestamp: Timestamp.now(),
          comment,
          uid: currentUser.uid,
          photoURL: currentUser.photoURL,
        });
        console.log("New Reply added..");

        fetchComments();
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      await googleSignIn();
      console.log(comment);
    }
  };

  // ----------------------------------------

  const handlePostComment = async () => {
    if (comment) postComment(comment);
    setComment("");
  };

  const handleReplyComment = async () => {
    if (comment) postReply(comment);
    setReplying(false);
    setComment("");
  };

  const handleClickReply = async (commetObj: commentType) => {
    inputRef.current?.focus();
    setReplying(true);
    setSelectedComment(commetObj);
  };

  const handleCancelReply = async () => {
    setReplying(false);
    setSelectedComment(null);
  };

  if (loading && !firstLoad) {
    return (
      <div className="w-full text-2xl font-extrabold text-yellow-700 flex items-center justify-center mt-5">
        {/* <JumpAndSlide /> */}
        Comment Loading
      </div>
    );
  }

  return (
    <div className="w-full pb-10">
      <div className="px-7">
        {commentList?.map((commObj, index) => (
          <div key={index}>
            <Comment
              obj={commObj}
              handleClickReply={handleClickReply}
              replying={replying}
              selectedComment={selectedComment}
            />
            <div className="flex flex-col ml-12">
              {commObj.replyArray?.map((repObj, index) => (
                <Reply key={index} obj={repObj} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`fixed duration-500 w-full bg-blue-600 px-3 py-1 flex flex-col items-center justify-between ${
          isScrolling ? "-bottom-20" : "bottom-0"
        } `}
      >
        {replying && (
          <div className="flex gap-5">
            <p className="text-white">
              Replying to{" "}
              <span className="text-gray-800">{selectedComment?.person}</span>
            </p>
            <button onClick={handleCancelReply}>cancel</button>
          </div>
        )}
        <div className="flex items-center justify-between w-full">
          <div>
            {currentUser ? (
              <img
                src={currentUser.photoURL ?? ""}
                className="w-8 h-8 rounded-full cursor-pointer"
              />
            ) : (
              <MdAccountCircle className="w-8 h-8 text-white cursor-pointer" />
            )}
          </div>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={inputRef}
            type="text"
            placeholder="comment"
            className="border-gray-600 border px-5 py-1 rounded-3xl w-[calc(100%-80px)]"
          />
          <BiSend
            className="text-4xl text-white cursor-pointer"
            onClick={() =>
              replying ? handleReplyComment() : handlePostComment()
            }
          />
        </div>
      </div>
    </div>
  );
}
export default CommentSection;
