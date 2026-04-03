"use client";

import {
  mockContentVideos,
  // mockHooks,
  // mockCTAs,
  // mockSubtitles,
} from "@/lib/mockData";
export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Library</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Browse all generated content across your platform
        </p>
      </div>

      {/* Videos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {mockContentVideos.map((video) => (
          <div
            key={video.id}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <div className="relative aspect-[9/16] bg-black overflow-hidden">
              <video
                src={video.videoUrl}
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-foreground truncate">
                {video.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {video.duration} &middot; {video.project}
              </p>
              <p className="text-xs text-muted-foreground">
                {video.createdAt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hooks Tab - commented out
      {activeTab === "hooks" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Hook Text</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Used In</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Conversion Rate</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created By</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockHooks.map((hook) => (
                  <tr key={hook.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-foreground max-w-xs truncate">&ldquo;{hook.text}&rdquo;</td>
                    <td className="px-4 py-3"><CategoryTag tag={hook.category} /></td>
                    <td className="px-4 py-3 text-foreground">{hook.usedInProjects} projects</td>
                    <td className="px-4 py-3 text-foreground">{hook.conversionRate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{hook.createdBy}</td>
                    <td className="px-4 py-3 text-muted-foreground">{hook.createdAt}</td>
                    <td className="px-4 py-3"><StatusBadge status={hook.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      */}

      {/* CTAs Tab - commented out
      {activeTab === "ctas" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">CTA Text</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Used In</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Click Rate</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created By</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockCTAs.map((cta) => (
                  <tr key={cta.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-foreground">&ldquo;{cta.text}&rdquo;</td>
                    <td className="px-4 py-3"><CategoryTag tag={cta.type} /></td>
                    <td className="px-4 py-3 text-foreground">{cta.usedInProjects} projects</td>
                    <td className="px-4 py-3 text-foreground">{cta.clickRate}</td>
                    <td className="px-4 py-3 text-muted-foreground">{cta.createdBy}</td>
                    <td className="px-4 py-3 text-muted-foreground">{cta.createdAt}</td>
                    <td className="px-4 py-3"><StatusBadge status={cta.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      */}

      {/* Subtitles Tab - commented out
      {activeTab === "subtitles" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Style Name</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Font Preview</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Used In</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created By</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSubtitles.map((sub) => (
                  <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{sub.styleName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-3 py-1 rounded text-sm"
                        style={{ fontFamily: sub.fontFamily, fontWeight: sub.fontWeight, color: sub.color,
                          backgroundColor: sub.bgColor === "transparent" ? undefined : sub.bgColor,
                          textShadow: sub.bgColor === "transparent" ? "0 1px 4px rgba(0,0,0,0.5)" : undefined }}>
                        Sample Text
                      </span>
                    </td>
                    <td className="px-4 py-3 text-foreground">{sub.usedInProjects} projects</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.createdBy}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.createdAt}</td>
                    <td className="px-4 py-3"><StatusBadge status={sub.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      */}
    </div>
  );
}
