"use client";

import { useEffect, useRef, useState } from "react";

/** Seconds cropped from the start of looping hero videos. */
export const HERO_VIDEO_TRIM_START = 2.75;
export const HERO_VIDEO_TRIM_END = 2.75;

/** ACT clip is ~97s fragmented MP4; the last ~15s is a contact end-card. */
export const ACT_HERO_TRIM_START = 0.35;
export const ACT_HERO_END_AT = 78;

export function heroVideoSrc(path: string, start = HERO_VIDEO_TRIM_START) {
  return `${path}#t=${start}`;
}

type TrimOptions = {
  enabled?: boolean;
  start?: number;
  endPad?: number;
  /** Absolute time to loop before, even if metadata duration is missing/Infinity. */
  endAt?: number;
};

export function useTrimmedLoopVideo({
  enabled = true,
  start = HERO_VIDEO_TRIM_START,
  endPad = HERO_VIDEO_TRIM_END,
  endAt,
}: TrimOptions = {}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let raf = 0;

    const windowFor = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const from = start;
      const paddedEnd = duration > 0 ? duration - endPad : Number.POSITIVE_INFINITY;
      const hardEnd = endAt ?? Number.POSITIVE_INFINITY;
      const to = Math.max(from + 0.5, Math.min(paddedEnd, hardEnd));
      return { from, to };
    };

    const startPlayback = () => {
      if (cancelled) return;
      const { from } = windowFor();
      const play = () => {
        if (cancelled) return;
        void video.play().then(() => {
          if (!cancelled) setReady(true);
        }).catch(() => undefined);
      };

      // Reveal as soon as a frame is available — don't wait on seek/play alone.
      if (video.readyState >= 2) setReady(true);

      if (Math.abs(video.currentTime - from) > 0.2) {
        const onSeeked = () => {
          video.removeEventListener("seeked", onSeeked);
          play();
        };
        video.addEventListener("seeked", onSeeked);
        try {
          video.currentTime = from;
        } catch {
          play();
        }
        return;
      }

      play();
    };

    const keepInWindow = () => {
      if (cancelled) return;
      const { from, to } = windowFor();
      if (video.currentTime >= to - 0.12) {
        video.currentTime = from;
      }
      raf = window.requestAnimationFrame(keepInWindow);
    };

    const onPlaying = () => setReady(true);
    const onCanPlay = () => {
      if (!cancelled) setReady(true);
      startPlayback();
    };
    const onError = () => setReady(false);

    video.addEventListener("loadedmetadata", startPlayback);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    raf = window.requestAnimationFrame(keepInWindow);

    if (video.readyState >= 1) startPlayback();
    if (video.readyState >= 2) setReady(true);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      video.removeEventListener("loadedmetadata", startPlayback);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, [enabled, endAt, endPad, start]);

  return { videoRef, ready };
}
