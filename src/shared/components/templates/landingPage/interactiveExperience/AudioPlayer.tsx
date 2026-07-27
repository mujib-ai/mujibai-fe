'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Pause, Play } from 'lucide-react';

const BAR_COUNT = 56;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function fallbackBars(): number[] {
  return Array.from({ length: BAR_COUNT }, (_, i) => {
    const wave = Math.sin(i * 0.5) * 0.3 + Math.sin(i * 0.15) * 0.4;
    return Math.min(1, Math.max(0.15, 0.55 + wave));
  });
}

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bars, setBars] = useState<number[]>(fallbackBars);

  useEffect(() => {
    let cancelled = false;

    async function buildWaveform() {
      try {
        const AudioContextCtor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioContextCtor();
        const buffer = await fetch(src).then(r => r.arrayBuffer());
        const audioBuffer = await ctx.decodeAudioData(buffer);
        const channel = audioBuffer.getChannelData(0);
        const blockSize = Math.floor(channel.length / BAR_COUNT) || 1;

        const peaks = Array.from({ length: BAR_COUNT }, (_, i) => {
          const start = i * blockSize;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(channel[start + j] ?? 0);
          }
          return sum / blockSize;
        });

        const max = Math.max(...peaks, 0.0001);
        const normalized = peaks.map(p => Math.min(1, Math.max(0.1, p / max)));

        if (!cancelled) setBars(normalized);
        ctx.close();
      } catch {
        if (!cancelled) setBars(fallbackBars());
      }
    }

    buildWaveform();
    return () => {
      cancelled = true;
    };
  }, [src]);

  const progressRatio = duration > 0 ? currentTime / duration : 0;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const seekTo = (clientX: number, track: HTMLDivElement) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const barWidths = useMemo(() => bars, [bars]);

  return (
    <div className="border-border bg-background/60 flex w-full items-center gap-4 rounded-2xl border p-4">
      <audio
        ref={audioRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
        className="hidden"
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105"
      >
        {isPlaying ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="ms-0.5 size-5" fill="currentColor" />
        )}
      </button>

      <div
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={duration}
        aria-valuenow={currentTime}
        tabIndex={0}
        onClick={e => seekTo(e.clientX, e.currentTarget)}
        className="flex h-10 flex-1 cursor-pointer items-center gap-[3px]"
      >
        {barWidths.map((amp, i) => {
          const isFilled = i / barWidths.length <= progressRatio;
          return (
            <span
              key={i}
              style={{ height: `${Math.round(amp * 100)}%` }}
              className={cn(
                'min-h-[3px] w-[3px] rounded-full transition-colors',
                isFilled ? 'bg-primary' : 'bg-primary/25'
              )}
            />
          );
        })}
      </div>

      <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}

export default AudioPlayer;
