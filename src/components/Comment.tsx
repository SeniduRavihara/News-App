import { useAuth } from "../hooks/useAuth";
import { commentType } from "../types";

function Comment({
  obj,
  handleClickReply,
  replying,
  selectedComment,
}: {
  obj: commentType;
  handleClickReply: (obj: commentType) => void;
  replying: boolean;
  selectedComment: commentType | null;
}) {
  const { currentUser } = useAuth();

  const getTimeDifference = (timestamp: Date | undefined | null): string => {
    if (!timestamp) {
      return "";
    }

    const currentDateTime = new Date();
    const timeDifference = Math.abs(
      currentDateTime.getTime() - timestamp.getTime()
    );

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return ""
    }
  };


  return (
    <div className="flex gap-2 py-2 w-full">
      <img src={obj.photoURL ?? "/account.png"} alt="" className="w-8 h-8 rounded-full" />
      <div className="w-full">
        <div className="bg-gray-500/20 px-3 py-1 rounded-xl w-full">
          <div className="text-[12px] font-semibold">{obj.person}</div>
          <div>{obj.comment}</div>
        </div>
        <div className="flex gap-3 text-[12px] ml-2 font-semibold text-gray-600/70">
          <div className="">{getTimeDifference(obj.timestamp)}</div>
          <button
            className={`${
              currentUser?.uid === obj.uid && "text-red-900 font-extrabold"
            }`}
          >
            Like
          </button>
          <button
            onClick={() => handleClickReply(obj)}
            className={`${
              replying &&
              selectedComment?.commentId === obj.commentId &&
              "text-red-600"
            }`}
          >
            {replying && selectedComment?.commentId === obj.commentId
              ? "Replying"
              : "Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Comment;
