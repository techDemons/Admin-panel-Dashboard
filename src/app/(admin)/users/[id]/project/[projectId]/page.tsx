"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { mockProjects } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string; projectId: string }>;
}) {
  const { id, projectId } = use(params);
  const router = useRouter();
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">Project not found</p>
        <button
          onClick={() => router.push(`/users/${id}`)}
          className="mt-4 text-primary hover:underline text-sm"
        >
          Back to User
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/users/${id}`)}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Project ID: {project.id}
          </p>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Project Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Status
            </p>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                project.status === "generated"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : project.status === "generating"
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {project.status}
            </span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Total Videos
            </p>
            <p className="text-sm font-medium text-foreground">
              {project.totalVideos}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Total Combinations
            </p>
            <p className="text-sm font-medium text-foreground">
              {project.totalCombinations}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Created
            </p>
            <p className="text-sm font-medium text-foreground">
              {project.createdAt}
            </p>
          </div>
        </div>
      </div>

      {/* Hooks, CTAs, Subtitles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Hooks</h3>
          <div className="space-y-2">
            {project.hooks.map((hook, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg bg-muted/50 text-sm text-foreground"
              >
                {hook}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">CTAs</h3>
          <div className="space-y-2">
            {project.ctas.map((cta, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg bg-muted/50 text-sm text-foreground"
              >
                {cta}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Subtitles
          </h3>
          <div className="space-y-2">
            {project.subtitles.map((sub, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded-lg bg-muted/50 text-sm text-foreground"
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Videos</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {project.videos.length} video
            {project.videos.length !== 1 ? "s" : ""} in this project
          </p>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {project.videos.slice(0, 6).map((video) => (
            <div
              key={video.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Video player / thumbnail */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden">
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
              {/* Video info */}
              <div className="p-3 space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {video.title}
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium text-foreground/70">
                      Hook:
                    </span>{" "}
                    {video.hook}
                  </p>
                  <p>
                    <span className="font-medium text-foreground/70">CTA:</span>{" "}
                    {video.cta}
                  </p>
                  <p>
                    <span className="font-medium text-foreground/70">
                      Subtitle:
                    </span>{" "}
                    {video.subtitle}
                  </p>
                  <p>
                    <span className="font-medium text-foreground/70">
                      Duration:
                    </span>{" "}
                    {video.duration} |{" "}
                    <span className="font-medium text-foreground/70">
                      Res:
                    </span>{" "}
                    {video.resolution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
