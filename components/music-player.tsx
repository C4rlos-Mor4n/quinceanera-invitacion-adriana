"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  autoPlay?: boolean;
  className?: string;
}

export function MusicPlayer({
  autoPlay = false,
  className = "",
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songUrl = "/music/celebration.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;

      if (autoPlay) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log(
                "Reproducción automática bloqueada por el navegador:",
                error
              );
              setIsPlaying(false);
            });
        }
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className={`${className} bg-black/20 rounded-lg border border-gold/20 hover:bg-black/30 transition-colors`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Music className="h-5 w-5 text-gold" />
            </div>
            <h4 className="font-script text-xl gold-text">Música 🎵</h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gold hover:text-gold/80 hover:bg-gold/10"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={togglePlay}
              className="text-xs border-gold/20 hover:bg-gold/10 hover:text-gold"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 mr-1" /> Pausar
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" /> Reproducir
                </>
              )}
            </Button>
          </div>
        </div>
        <audio ref={audioRef} src={songUrl} loop />
      </div>
    </div>
  );
}
