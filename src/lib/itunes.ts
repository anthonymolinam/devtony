export interface ITunesTrack {
  id: number;
  title: string;
  artist: string;
  artworkUrl: string;
  previewUrl: string | null;
}

interface LookupResult {
  wrapperType?: string;
  trackId?: number;
  trackName?: string;
  artistName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
}

const LOOKUP_URL = "https://itunes.apple.com/lookup";
const TIMEOUT_MS = 8_000;

/**
 * Looks tracks up in the iTunes Search API at build time. Never throws: on any failure it
 * returns whatever it could resolve (possibly nothing) so the build keeps going with local covers.
 */
export async function lookupTracks(ids: readonly number[]): Promise<Map<number, ITunesTrack>> {
  const tracks = new Map<number, ITunesTrack>();
  if (ids.length === 0) return tracks;

  try {
    const url = `${LOOKUP_URL}?id=${ids.join(",")}&entity=song&country=us`;
    const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const body = (await response.json()) as { results?: LookupResult[] };
    for (const result of body.results ?? []) {
      if (result.wrapperType !== "track" || !result.trackId || !result.trackName || !result.artworkUrl100) continue;
      tracks.set(result.trackId, {
        id: result.trackId,
        title: result.trackName,
        artist: result.artistName ?? "",
        // The API only lists the 100 px artwork; the same URL serves larger sizes.
        artworkUrl: result.artworkUrl100.replace(/\/\d+x\d+bb\./, "/600x600bb."),
        previewUrl: result.previewUrl ?? null,
      });
    }
  } catch (error) {
    console.warn(`[playlist] iTunes lookup failed, using local covers: ${String(error)}`);
  }

  return tracks;
}
