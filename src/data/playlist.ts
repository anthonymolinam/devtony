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
  // TODO(content): example IDs. Replace with three songs from your playlist; the first one is shown larger.
  tracks: [
    { id: 993274903, fallbackCover: cover1 },
    { id: 617154366, fallbackCover: cover2 },
    { id: 1299241645, fallbackCover: cover3 },
  ] satisfies PlaylistTrack[],
};
