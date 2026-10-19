import type { ImageMetadata } from "astro";
import cover1 from "@/assets/playlist/cover-1.jpg";
import cover2 from "@/assets/playlist/cover-2.jpg";
import cover3 from "@/assets/playlist/cover-3.jpg";

export interface PlaylistTrack {
  /** iTunes / Apple Music track ID (the number after `?i=` in a song link). */
  id: number;
  /** Used when the iTunes lookup fails at build time. */
  fallbackCover: ImageMetadata;
}

export const playlist = {
  name: "Anthony Playlist",
  url: "https://music.apple.com/profile/anthonymolina",
  tracks: [
    // Tame Impala, "The Less I Know the Better"
    { id: 1440838488, fallbackCover: cover1 },
    // Bad Bunny, "KLOuFRENS"
    { id: 1787023297, fallbackCover: cover2 },
    // TODO(content): example ID. Replace with one more song from your playlist.
    { id: 1299241645, fallbackCover: cover3 },
  ] satisfies PlaylistTrack[],
};
