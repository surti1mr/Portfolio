"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TRACK_SRC = "/audio/mayank-surti-suno.mp3";
const TRACK_TITLE = "Mayank Surti Rap Song status";
const TRACK_SUBTITLE = "the portfolio, as a rap verse";
const SKIP_SECONDS = 10;

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Icon({ path }: { path: string }) {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const PLAY = "M8 5v14l11-7z";
const PAUSE = "M6 5h4v14H6zM14 5h4v14h-4z";
const STOP = "M6 6h12v12H6z";
const BACK = "M11 12l8.5 6V6zM4 6h2.5v12H4z";
const FWD = "M13 12L4.5 6v12zM17.5 6H20v12h-2.5z";

export default function SoundtrackPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const reducedMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  // True once we have a real, finite duration to scrub against
  const seekable = Number.isFinite(duration) && duration > 0;

  // Wire up audio element events. Runs after the <audio> below is mounted.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => {
      const d = audio.duration;
      if (Number.isFinite(d) && d > 0) {
        setDuration(d);
        return;
      }
      // Some VBR MP3s report Infinity/NaN until the browser is forced to
      // scan to the end. Nudge currentTime way past the end once, then reset.
      const fix = () => {
        audio.removeEventListener("timeupdate", fix);
        if (Number.isFinite(audio.duration)) setDuration(audio.duration);
        audio.currentTime = 0;
        setCurrent(0);
      };
      audio.addEventListener("timeupdate", fix);
      audio.currentTime = 1e101;
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };

    if (audio.readyState >= 1) onMeta(); // metadata already loaded before listener attached

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("durationchange", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0.6;
      audio.play().catch(() => {
        /* browser blocked playback — user can tap again */
      });
    } else {
      audio.pause();
    }
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setCurrent(0);
  }, []);

  const skip = useCallback((delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const max = Number.isFinite(audio.duration)
      ? audio.duration
      : Number.MAX_SAFE_INTEGER;
    audio.currentTime = Math.min(Math.max(audio.currentTime + delta, 0), max);
    setCurrent(audio.currentTime);
  }, []);

  const scrub = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }, []);

  // Open the panel on first launch so controls are discoverable
  const launch = useCallback(() => {
    setOpen((v) => {
      const next = !v;
      if (next && !playing) togglePlay();
      return next;
    });
  }, [playing, togglePlay]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <audio ref={audioRef} src={TRACK_SRC} preload="metadata" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="glass-card rounded-xl p-4 mb-3 w-72"
          >
            <p className="font-mono text-[10px] uppercase tracking-wider text-[#00D4FF] mb-1">
              {"// soundtrack"}
            </p>
            <p className="text-sm font-semibold text-[#E8F4FD] leading-tight">
              {TRACK_TITLE}
            </p>
            <p className="text-[11px] text-[#8899AA] leading-tight mb-3">
              {TRACK_SUBTITLE}
            </p>

            {/* Scrubber */}
            <input
              type="range"
              min={0}
              max={seekable ? duration : 100}
              step={0.1}
              value={seekable ? Math.min(current, duration) : 0}
              onChange={(e) => scrub(Number(e.target.value))}
              disabled={!seekable}
              aria-label="Seek within the track"
              className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-[#1E2D42] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ accentColor: "#00D4FF" }}
            />
            <div className="mt-1 flex justify-between font-mono text-[10px] text-[#8899AA]">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>

            {/* Transport controls */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                onClick={() => skip(-SKIP_SECONDS)}
                aria-label={`Rewind ${SKIP_SECONDS} seconds`}
                className="rounded-lg border border-[#1E2D42] p-2 text-[#8899AA] transition-colors hover:text-[#E8F4FD] hover:border-[#00D4FF]"
              >
                <Icon path={BACK} />
              </button>
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="rounded-lg p-2.5 text-[#0A0E1A] transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg, #00D4FF, #7C3AED)" }}
              >
                <Icon path={playing ? PAUSE : PLAY} />
              </button>
              <button
                onClick={stop}
                aria-label="Stop"
                className="rounded-lg border border-[#1E2D42] p-2 text-[#8899AA] transition-colors hover:text-[#E8F4FD] hover:border-[#00D4FF]"
              >
                <Icon path={STOP} />
              </button>
              <button
                onClick={() => skip(SKIP_SECONDS)}
                aria-label={`Forward ${SKIP_SECONDS} seconds`}
                className="rounded-lg border border-[#1E2D42] p-2 text-[#8899AA] transition-colors hover:text-[#E8F4FD] hover:border-[#00D4FF]"
              >
                <Icon path={FWD} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={launch}
        aria-label={open ? "Hide soundtrack player" : "Play my soundtrack"}
        aria-expanded={open}
        className="glass-card rounded-full w-12 h-12 flex items-center justify-center relative transition-transform hover:scale-105"
        style={{ border: "1px solid #1E2D42" }}
      >
        <motion.span
          className="text-xl"
          animate={
            playing && !reducedMotion ? { rotate: 360 } : { rotate: 0 }
          }
          transition={
            playing && !reducedMotion
              ? { repeat: Infinity, ease: "linear", duration: 3 }
              : { duration: 0 }
          }
        >
          💿
        </motion.span>
        {playing && (
          <span
            className="absolute -top-1 -right-1 flex h-3 w-3"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFB3] opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#00FFB3]" />
          </span>
        )}
      </button>
    </div>
  );
}
