"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockProjects, Video } from "@/lib/mockData";
import {
  ArrowLeft,
  Video as VideoIcon,
  Type,
  MousePointerClick,
  Subtitles,
  Hash,
  Play,
  X,
} from "lucide-react";


function VideoPreviewModal({
  video,
  onClose,
}: {
  video: Video;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-red-600 transition-colors shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Video in 9:16 aspect ratio */}
        <div className="relative aspect-[9/16] bg-black overflow-hidden">
          <video
            src={video.videoUrl}
            className="w-full h-full object-cover"
            controls
            autoPlay
          />

          {/* Hook overlay — top */}
          <div className="absolute top-4 left-0 right-0 px-4 pointer-events-none z-10">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium mb-0.5">
                Hook
              </p>
              <p className="text-white text-sm font-semibold leading-snug">
                {video.hook}
              </p>
            </div>
          </div>

          {/* CTA overlay — bottom */}
          <div className="absolute bottom-16 left-0 right-0 px-4 pointer-events-none z-10">
            <div className="bg-primary/80 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-white/70 font-medium mb-0.5">
                CTA
              </p>
              <p className="text-white text-sm font-bold">{video.cta}</p>
            </div>
          </div>

          {/* Subtitle overlay — bottom edge */}
          <div className="absolute bottom-4 left-0 right-0 px-4 pointer-events-none z-10">
            <div className="bg-black/50 backdrop-blur-sm rounded-md px-3 py-1.5 text-center">
              <p className="text-white/90 text-xs">
                Subtitle style:{" "}
                <span className="font-semibold">{video.subtitle}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Info bar below video */}
        <div className="bg-card border-t border-border px-4 py-3">
          <p className="text-sm font-medium text-foreground">{video.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {video.resolution} &middot; {video.duration}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = mockProjects.find((p) => p.id === id);
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg">Project not found.</p>
        <button
          onClick={() => router.push("/projects")}
          className="mt-4 text-primary hover:underline text-sm"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const statusColor =
    project.status === "generated"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      : project.status === "generating"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      : "bg-red-500/10 text-red-600 dark:text-red-400";

  return (
    <div className="space-y-6">
      {/* Preview Modal */}
      {previewVideo && (
        <VideoPreviewModal
          video={previewVideo}
          onClose={() => setPreviewVideo(null)}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/projects")}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-muted-foreground font-mono">
              {project.id}
            </span>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}
            >
              {project.status}
            </span>
            <span className="text-xs text-muted-foreground">
              Created {project.createdAt}
            </span>
          </div>
        </div>
      </div>

      {/* Total Combinations */}
      <div className="bg-card border border-border rounded-xl p-5 flex items-center gap-4">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <Hash size={22} className="text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">
            {project.totalCombinations}
          </p>
          <p className="text-sm text-muted-foreground">
            Total Combinations ({project.totalVideos} videos x{" "}
            {project.combinationMultiplier} multiplier)
          </p>
        </div>
      </div>

      {/* Videos */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <VideoIcon size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            All Videos ({project.videos.length})
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {project.videos.map((video) => (
            <div
              key={video.id}
              className="bg-card border border-border rounded-xl overflow-hidden group"
            >
              {/* 9:16 portrait video */}
              <div
                className="relative aspect-[9/16] bg-black overflow-hidden cursor-pointer"
                onClick={() => setPreviewVideo(video)}
              >
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play
                      size={22}
                      className="text-black ml-0.5"
                      fill="black"
                    />
                  </div>
                </div>
                {/* Resolution badge */}
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                  {video.resolution}
                </span>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium text-foreground truncate">
                  {video.title}
                </p>
                <p className="text-xs text-muted-foreground">{video.duration}</p>
                <button
                  onClick={() => setPreviewVideo(video)}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Play size={12} />
                  Preview Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hooks */}
      <section>
        <div className="flex items-center gap-2 mb-15">
          <Type size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Hooks ({project.hooks.length})
          </h2>
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {project.hooks.map((hook, i) => (
            <div key={i} className="px-4 py-3 text-sm text-foreground">
              &ldquo;{hook}&rdquo;
            </div>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <MousePointerClick size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            CTAs ({project.ctas.length})
          </h2>
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {project.ctas.map((cta, i) => (
            <div key={i} className="px-4 py-3 text-sm text-foreground">
              {cta}
            </div>
          ))}
        </div>
      </section>

      {/* Subtitles */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Subtitles size={18} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Subtitles ({project.subtitles.length})
          </h2>
        </div>
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          {project.subtitles.map((sub, i) => (
            <div key={i} className="px-4 py-3 text-sm text-foreground">
              {sub}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
