import { useSpotify } from "@/hooks/useSpotify";
import Image from "next/image";
import SpotifyIcon from "@/app/assets/spotify.svg";
import SpotifySkeleton from "@/app/components/Skeletons/SpotifySkeleton";

export default function Spotify() {
  const { song, isLoading } = useSpotify();
  const isPlaying = song?.isPlaying;

  if (isLoading) return <SpotifySkeleton />;

  return (
    <div className="relative col-start-1 row-start-6 col-span-2 md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-1 rounded-xl p-10 flex flex-col items-center justify-center text-center overflow-hidden">
      {song && song.albumImageUrl && (
        <Image
          src={song.albumImageUrl}
          alt={song.album || "Album image"}
          layout="fill"
          objectFit="cover"
          className="absolute top-0 left-0 w-full h-full opacity-40"
        />
      )}
      <div className="absolute top-6 left-5 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-full">
        <SpotifyIcon className="w-6 h-6" />
        <span className="text-xs text-white font-semibold">
          {isPlaying ? "Currently Listening" : "Recently Listened"}
        </span>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center">
        {song ? (
          <>
            <p className="text-lg font-bold">{song.title}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
