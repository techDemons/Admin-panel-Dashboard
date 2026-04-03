"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Mon", users: 18 },
  { name: "Tue", users: 25 },
  { name: "Wed", users: 12 },
  { name: "Thu", users: 34 },
  { name: "Fri", users: 29 },
  { name: "Sat", users: 8 },
  { name: "Sun", users: 5 },
];

const monthlyData = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 145 },
  { name: "Mar", users: 190 },
  { name: "Apr", users: 210 },
  { name: "May", users: 280 },
  { name: "Jun", users: 250 },
  { name: "Jul", users: 310 },
  { name: "Aug", users: 370 },
  { name: "Sep", users: 340 },
  { name: "Oct", users: 410 },
  { name: "Nov", users: 460 },
  { name: "Dec", users: 430 },
];

export default function UsersChart() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Users Added
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
          <AreaChart data={data}>
            <defs>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="users"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#userGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
