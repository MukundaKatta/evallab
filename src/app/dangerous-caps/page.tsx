"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { AlertTriangle, Shield } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface CapabilityAssessment {
  id: string;
  model: string;
  category: string;
  score: number;
  maxScore: number;
  level: "safe" | "monitor" | "warning" | "critical";
  details: string;
  testDate: string;
}

const assessments: CapabilityAssessment[] = [
  { id: "c1", model: "GPT-4o", category: "Cyberattack Generation", score: 35, maxScore: 100, level: "monitor", details: "Can suggest common attack vectors but cannot generate novel exploits", testDate: "2026-03-16" },
  { id: "c2", model: "GPT-4o", category: "Bioweapon Knowledge", score: 18, maxScore: 100, level: "safe", details: "General biology knowledge; refuses synthesis-related queries", testDate: "2026-03-16" },
  { id: "c3", model: "GPT-4o", category: "Autonomous Planning", score: 42, maxScore: 100, level: "monitor", details: "Capable multi-step planner but cannot independently execute", testDate: "2026-03-16" },
  { id: "c4", model: "GPT-4o", category: "Persuasion/Manipulation", score: 65, maxScore: 100, level: "warning", details: "Shows significant persuasive capability; needs monitoring", testDate: "2026-03-16" },
  { id: "c5", model: "GPT-4o", category: "Self-Replication", score: 5, maxScore: 100, level: "safe", details: "No meaningful self-replication capability detected", testDate: "2026-03-16" },
  { id: "c6", model: "GPT-4o", category: "Chemical Weapons", score: 12, maxScore: 100, level: "safe", details: "Basic chemistry knowledge only; refuses dangerous synthesis", testDate: "2026-03-16" },
  { id: "c7", model: "Claude 3.5 Sonnet", category: "Cyberattack Generation", score: 22, maxScore: 100, level: "safe", details: "Lower capability; consistently refuses attack generation", testDate: "2026-03-15" },
  { id: "c8", model: "Claude 3.5 Sonnet", category: "Persuasion/Manipulation", score: 48, maxScore: 100, level: "monitor", details: "Moderate persuasive ability; strong refusal of manipulation requests", testDate: "2026-03-15" },
];

const radarData = [
  { category: "Cyber", "GPT-4o": 35, "Claude 3.5": 22 },
  { category: "Bio", "GPT-4o": 18, "Claude 3.5": 12 },
  { category: "Autonomy", "GPT-4o": 42, "Claude 3.5": 30 },
  { category: "Persuasion", "GPT-4o": 65, "Claude 3.5": 48 },
  { category: "Self-Rep", "GPT-4o": 5, "Claude 3.5": 3 },
  { category: "Chemical", "GPT-4o": 12, "Claude 3.5": 8 },
];

const levelColors: Record<string, string> = { safe: "badge-green", monitor: "badge-yellow", warning: "badge-orange", critical: "badge-red" };

export default function DangerousCaps() {
  const [filterModel, setFilterModel] = useState("all");
  const models = [...new Set(assessments.map((a) => a.model))];

  const filtered = filterModel === "all" ? assessments : assessments.filter((a) => a.model === filterModel);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dangerous Capability Assessment</h1>
            <p className="text-gray-400 mt-1">Evaluate models for potentially dangerous capabilities</p>
          </div>
          <select value={filterModel} onChange={(e) => setFilterModel(e.target.value)} className="input-field">
            <option value="all">All Models</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Capability Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="category" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6b7280" }} />
                <Radar name="GPT-4o" dataKey="GPT-4o" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
                <Radar name="Claude 3.5" dataKey="Claude 3.5" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Levels Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {["safe", "monitor", "warning", "critical"].map((level) => {
                const count = filtered.filter((a) => a.level === level).length;
                return (
                  <div key={level} className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white">{count}</p>
                    <span className={levelColors[level]}>{level}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Assessment Details</h3>
          <div className="space-y-3">
            {filtered.map((a) => (
              <div key={a.id} className="p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white">{a.model}</span>
                    <span className="badge-purple">{a.category}</span>
                    <span className={levelColors[a.level]}>{a.level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${a.score >= 50 ? "text-red-400" : a.score >= 25 ? "text-yellow-400" : "text-green-400"}`}>{a.score}/{a.maxScore}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{a.details}</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${a.score >= 50 ? "bg-red-500" : a.score >= 25 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${a.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
