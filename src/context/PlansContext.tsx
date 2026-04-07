"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type Plan = {
  name: string;
  price: number;
  credits: number;
  usage: string;
  period: string;
  color: string;
  badge: string;
  buttonStyle: string;
  benefits: string[];
  popular?: boolean;
};

interface PlansContextType {
  plans: Plan[];
  updatePlan: (index: number, plan: Plan) => void;
}

const PlansContext = createContext<PlansContextType | undefined>(undefined);

const initialPlans: Plan[] = [
  {
    name: "Basic",
    price: 99,
    credits: 100,
    usage: "included",
    period: "year",
    color: "border-gray-300 dark:border-gray-600",
    badge: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    buttonStyle:
      "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
    benefits: [
      "Up to 100 credits per year",
      "5 projects included",
      "Basic video generation",
      "Email support",
      "Standard subtitle styles",
    ],
  },
  {
    name: "Pro",
    price: 249,
    credits: 500,
    usage: "included",
    period: "year",
    color: "border-violet-400 dark:border-violet-500",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    buttonStyle: "bg-violet-600 text-white hover:bg-violet-700",
    popular: true,
    benefits: [
      "Up to 500 credits per year",
      "Unlimited projects",
      "Advanced video generation",
      "Priority email & chat support",
      "All subtitle styles",
      "Custom hooks & CTAs",
      "Team collaboration (up to 5)",
    ],
  },
  {
    name: "Prime",
    price: 499,
    credits: 2000,
    usage: "included",
    period: "year",
    color: "border-[#32d2a6]",
    badge: "bg-[#32d2a6]/10 text-[#32d2a6]",
    buttonStyle: "bg-[#32d2a6] text-black hover:bg-[#28b893]",
    benefits: [
      "Up to 2,000 credits per year",
      "Unlimited projects",
      "Premium video generation with AI",
      "Dedicated account manager",
      "All subtitle styles + custom fonts",
      "Custom hooks & CTAs library",
      "Team collaboration (unlimited)",
      "API access",
      "White-label exports",
      "Advanced analytics & reporting",
    ],
  },
];

export function PlansProvider({ children }: { children: ReactNode }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);

  const updatePlan = useCallback((index: number, plan: Plan) => {
    setPlans((prev) => prev.map((p, i) => (i === index ? plan : p)));
  }, []);

  return (
    <PlansContext.Provider value={{ plans, updatePlan }}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans() {
  const ctx = useContext(PlansContext);
  if (!ctx) throw new Error("usePlans must be used within PlansProvider");
  return ctx;
}
