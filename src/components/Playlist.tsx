import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { PauseIcon } from "@phosphor-icons/react/dist/csr/Pause";
import { PlayIcon } from "@phosphor-icons/react/dist/csr/Play";

export interface PlaylistCover {
  src: string;
  srcSet: string;
  sizes: string;
}

export interface PlaylistItem {
  id: number;
  title: string | null;
  artist: string | null;
  cover: PlaylistCover;
  previewUrl: string | null;
}

interface Props {
  name: string;
  url: string;
  tracks: PlaylistItem[];
}

const describe = (track: PlaylistItem) =>
  track.title ? `${track.title}${track.artist ? ` by ${track.artist}` : ""}` : "this song";

export default function Playlist({ name, url, tracks }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  // Play controls only appear once hydrated: without JS they could not do anything.
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    return () => audioRef.current?.pause();
  }, []);

  async function toggle(index: number) {
    const track = tracks[index];
    if (!track?.previewUrl) return;

    const audio = (audioRef.current ??= new Audio());
    if (current === index && playing) {
      audio.pause();
      return;
    }
    if (current !== index) {
      audio.src = track.previewUrl;
      audio.onplay = () => setPlaying(true);
      audio.onpause = () => setPlaying(false);
      audio.onended = () => setPlaying(false);
      setCurrent(index);
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  }

  const active = current === null ? null : tracks[current];
  const showControls = hydrated && tracks.some((track) => track.previewUrl);

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid grid-cols-[1.5fr_1fr_1fr] items-end gap-3">
        {tracks.map((track, index) => {
          const isPlaying = current === index && playing;
          const image = (
            <img
              src={track.cover.src}
              srcSet={track.cover.srcSet}
              sizes={track.cover.sizes}
              alt={showControls ? "" : track.title ? `Cover of ${describe(track)}` : ""}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full rounded-media object-cover"
            />
          );

          return (
            <li key={track.id} className="relative">
              {showControls && track.previewUrl ? (
                <button
                  type="button"
                  className="playlist-cover"
                  onClick={() => toggle(index)}
                  aria-pressed={isPlaying}
                  aria-label={`${isPlaying ? "Pause" : "Play"} preview of ${describe(track)}`}
                >
                  {image}
                  <span className="playlist-cover__control" aria-hidden="true">
                    {isPlaying ? <PauseIcon size={16} weight="fill" /> : <PlayIcon size={16} weight="fill" />}
                  </span>
                </button>
              ) : (
                image
              )}
            </li>
          );
        })}
      </ul>

      <div>
        <p className="flex items-center gap-2 text-lead" aria-live="polite">
          {active && playing ? (
            <>
              <span className="equalizer" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="truncate">
                <span className="sr-only">Now playing: </span>
                {active.title}
                {active.artist && <span className="text-ink-muted"> · {active.artist}</span>}
              </span>
            </>
          ) : (
            name
          )}
        </p>
        <a href={url} className="link inline-flex items-center gap-1 text-small" rel="noopener">
          Listen on Apple Music
          <ArrowUpRightIcon size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
