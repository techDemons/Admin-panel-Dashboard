"use client";

import { Users, FolderKanban, Video, Shuffle } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up" as const,
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Projects",
    value: "1,423",
    change: "+8%",
    trend: "up" as const,
    icon: FolderKanban,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Total Videos Uploaded",
    value: "8,641",
    change: "+23%",
    trend: "up" as const,
    icon: Video,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Total Variations Generated",
    value: "34,219",
    change: "+31%",
    trend: "up" as const,
    icon: Shuffle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
        >
          <div className={`p-2.5 rounded-lg ${stat.bg}`}>
            <stat.icon size={22} className={stat.color} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
            <p
              className={`text-xs mt-1 font-medium ${
                stat.trend === "up" ? "text-emerald-500" : "text-destructive"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
