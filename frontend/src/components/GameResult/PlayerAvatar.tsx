import { PLAYER_AVATAR_URL } from "../../api";

interface PlayerAvatarProps {
  name: string;
  place: number;
}

const PlayerAvatar = ({ name, place }: PlayerAvatarProps) => {
  return (
    <div className="">
      <img
        src={`${PLAYER_AVATAR_URL}&seed=${name}`}
        alt="avatar"
        className="w-24 mx-auto"
      />
      <div
        className={`rounded-lg text-center py-[3px] px-[3px] text-dark-layer-1 font-semibold truncate max-w-[120px] ${
          place === 1
            ? "bg-amber-200"
            : place === 2
            ? "bg-slate-200"
            : " bg-orange-200"
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default PlayerAvatar;
