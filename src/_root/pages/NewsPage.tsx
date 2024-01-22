import { Navigate, useNavigate } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import CommentSection from "../../components/CommentSection";
import { useAuth } from "../../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { FacebookSelector, ReactionCounter } from "@charkour/react-reactions";

function NewsPage() {
  const [reaction, setReaction] = useState<string | null>(null);

  // const [loadingComments, setLoadingComments] = useState(false);

  const { selectedNews } = useData();
  const { currentUser, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleClickArrow = () => {
    navigate("/");
  };

  const addReaction = async (key: string) => {
    if (currentUser) {
      const documentRef = doc(
        db,
        "news",
        selectedNews.newsId,
        "reactions",
        key
      );

      try {
        const reactionObj = getReactionObjFromArray(key);

        if (reactionObj) {
          if (!reactionObj.persons.includes(currentUser.uid)) {
            await updateDoc(documentRef, {
              count: reactionObj.count + 1,
              persons: [...reactionObj.persons, currentUser.uid],
            });
            console.log("Reaction added");
          }
        } else {
          console.error("Reaction object not found for key:", key);
          // Handle the case where the reaction object is undefined
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      googleSignIn();
    }
  };

  const removeReation = async (key: string) => {
    if (currentUser) {
      const documentRef = doc(
        db,
        "news",
        selectedNews.newsId,
        "reactions",
        key
      );

      try {
        const reactionObj = getReactionObjFromArray(key);

        if (reactionObj) {
          if (!reactionObj.persons.includes(currentUser.uid)) {
            await updateDoc(documentRef, {
              count: reactionObj.count,
              persons: [...reactionObj.persons],
            });
            console.log("Reaction Removed");
          }
        } else {
          console.error("Reaction object not found for key:", key);
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    } else {
      googleSignIn();
    }
  };

  const getReactionObjFromArray = (key: string) => {
    return selectedNews.reactionArray?.filter((obj) => obj.key === key)[0];
  };

  const handleReactionClick = (label: string) => {
    // console.log(label);

    addReaction(label);

    if (reaction) {
      if (reaction === label) {
        setReaction(null);
        removeReation(label);
        return;
      } else {
        removeReation(reaction);
        addReaction(label);
      }
    }

    setReaction(label);

    // if (reaction) {
    //   removeReation(reaction);
    //   setReaction(key);
    // } else {
    //   setReaction(key);
    // }
  };

  if (!selectedNews.newsId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col py-2 px-7 items-center gap-2">
      <div className="w-full p-2" onClick={handleClickArrow}>
        <FaArrowLeft className="w-8 h-8 cursor-pointer" />
      </div>
      <img
        src={selectedNews.imageUrl ?? "/defaultNews.jpg"}
        alt=""
        className="w-[350px] rounded-3xl h-[200px] top-2"
      />
      <div className="text-md text-black font-extrabold flex w-[330px]">
        {selectedNews.title}
      </div>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <p className="text-[14px]">{selectedNews.news}</p>

      <hr className="border border-t-[1px] border-gray-300 w-full" />

      <div className="flex w-full justify-between">
        <FacebookSelector iconSize={20} onSelect={handleReactionClick} />
        <ReactionCounter
          reactions={selectedNews.reactionArray
            ?.filter((reactionObj) => reactionObj.count > 0)
            .map((reactionObj) => ({
              label: reactionObj.key,
              node: <div>{reactionObj.emoji}</div>,
              by: reactionObj.persons,
            }))}
          iconSize={20}
        />
      </div>

      <div className="w-screen">
        <CommentSection />
        RRR
      </div>
    </div>
  );
}
export default NewsPage;
