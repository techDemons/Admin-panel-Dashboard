"use client";

import { CreditCard, DollarSign, Users, TrendingDown } from "lucide-react";

const stats = [
  {
    label: "Total Active Subscriptions",
    value: "1,240",
    trend: "↑12% from last month",
    trendUp: true,
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Monthly Revenue (MRR)",
    value: "$4,850",
    trend: "↑8% from last month",
    trendUp: true,
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "Free Plan Users",
    value: "890",
    trend: "↑5% from last month",
    trendUp: true,
    icon: Users,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    label: "Churn Rate",
    value: "3.2%",
    trend: "↑0.4% from last month",
    trendUp: false,
    icon: TrendingDown,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-start gap-4"
        >
          <div className={`p-2.5 rounded-lg ${stat.bg}`}>
            <stat.icon size={22} className={stat.color} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              {stat.label}
            </p>
            <p
              className={`text-xs mt-1 font-medium ${
                stat.trendUp ? "text-emerald-500" : "text-destructive"
              }`}
            >
              {stat.trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
