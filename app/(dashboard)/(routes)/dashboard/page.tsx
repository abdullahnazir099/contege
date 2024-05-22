"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { tools } from "@/constants";
import "./dashboard.css"

export default function HomePage() {
  const router = useRouter();

  return (
    <div>
    <div className="mb-8 space-y-4 dash-heading">
      <h2 className="text-2xl md:text-4xl font-bold text-slate-50">
      Experience the real power of AI
      </h2>
      <p className="text-muted-foreground font-light text-sm md:text-lg text-slate-400">
      Your favourite AI tools combined  at one single platform
      </p>
    </div>
    <h2 className="popular ml-24 font-semibold">Popular tools</h2>
    <div id="dash-items" className="px-4 md:px-20 lg:px-16 space-y-4">
      {tools.map((tool) => (
        <Card onClick={() => router.push(tool.href)} key={tool.href} id="dashboard-card">
          <div className="card-design">
            <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
              <tool.icon className={cn("w-8 h-8", tool.color)} />
            </div>
          </div>
            <div className="font-semibold">
              {tool.label}
            </div>
            <div className="sub-title font-light">
              {tool.sublabel}
            </div>
          <ArrowRight className="w-5 h-5" />
        </Card>
      ))}
    </div>
  </div>
  );
}
