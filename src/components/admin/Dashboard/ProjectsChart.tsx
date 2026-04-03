"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Mon", projects: 24 },
  { name: "Tue", projects: 31 },
  { name: "Wed", projects: 18 },
  { name: "Thu", projects: 42 },
  { name: "Fri", projects: 37 },
  { name: "Sat", projects: 15 },
  { name: "Sun", projects: 12 },
];

const monthlyData = [
  { name: "Jan", projects: 320 },
  { name: "Feb", projects: 280 },
  { name: "Mar", projects: 410 },
  { name: "Apr", projects: 390 },
  { name: "May", projects: 520 },
  { name: "Jun", projects: 480 },
  { name: "Jul", projects: 560 },
  { name: "Aug", projects: 610 },
  { name: "Sep", projects: 540 },
  { name: "Oct", projects: 670 },
  { name: "Nov", projects: 720 },
  { name: "Dec", projects: 690 },
];

export default function ProjectsChart() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Projects Generated
        </h3>
        <div className="flex bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              view === "weekly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              view === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={view === "weekly" ? 32 : 24}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                fontSize: "13px",
              }}
            />
            <Bar dataKey="projects" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
