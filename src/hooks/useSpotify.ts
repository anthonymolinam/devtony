import { useState, useEffect } from "react";

interface Song {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export function useSpotify() {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSong() {
      setIsLoading(true);
      const res = await fetch("/api/spotify");
      const data = await res.json();
      setSong(data);
      setIsLoading(false);
    }

    fetchSong();
  }, []);

  return { song, isLoading };
}
