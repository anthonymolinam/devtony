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
      const res = await fetch("/api/spotify");
      const data = await res.json();

      // Si la canción no ha cambiado, no actualizamos el estado
      if (JSON.stringify(song) !== JSON.stringify(data)) {
        setSong(data);
      }

      setIsLoading(false);
    }

    fetchSong(); // Ejecutar inmediatamente al montar

    const interval = setInterval(fetchSong, 15000); // Revisar cada 15 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [song]); // Dependencia para que detecte cambios en `song`

  return { song, isLoading };
}
