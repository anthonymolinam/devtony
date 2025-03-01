import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  const data = await response.json();
  return data;
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // Consulta la canción en reproducción
    let response = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    let song;
    let isPlaying = false;

    if (response.status === 204 || response.status > 400) {
      // Si no hay nada sonando, consulta lo último escuchado
      response = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=1",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      );
      const history = await response.json();

      if (!history.items || history.items.length === 0) {
        return NextResponse.json({ isPlaying: false });
      }

      song = history.items[0].track; // Última canción reproducida
    } else {
      const nowPlaying = await response.json();
      song = nowPlaying.item;
      isPlaying = nowPlaying.is_playing; // Aquí sí confirmamos si está en reproducción
    }

    return NextResponse.json({
      isPlaying, // Solo es true si la API de currently-playing lo dice
      title: song.name,
      artist: song.artists
        .map((artist: { name: string }) => artist.name)
        .join(", "),
      album: song.album.name,
      albumImageUrl: song.album.images[0].url,
      songUrl: song.external_urls.spotify,
    });
  } catch {
    return NextResponse.json(
      { error: "Error fetching Spotify data" },
      { status: 500 }
    );
  }
}
