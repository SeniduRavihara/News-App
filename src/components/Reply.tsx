import { useAuth } from "../hooks/useAuth";

function Reply({
  obj,
  replying,
  selectedComment,
}: {
  obj: any;
  replying: boolean;
  selectedComment: any;
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

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return hours !== 0 ? `${hours}h` : minutes !== 0 ? `${minutes}min` : "";
  };

  return (
    <div className="flex gap-2 py-2 w-full">
      <img src={obj.photoURL} alt="" className="w-8 h-8 rounded-full" />
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
        </div>
      </div>
    </div>
  );
}
export default Reply;
