"use client";

import Sidebar from "@/components/Sidebar";
import { FlaskConical, TrendingUp, Play, Trophy, AlertTriangle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

const modelPerformance = [
  { model: "GPT-4o", safety: 87, reasoning: 92, coding: 90, knowledge: 88, instruction: 91 },
  { model: "Claude 3.5", safety: 93, reasoning: 89, coding: 88, knowledge: 86, instruction: 94 },
  { model: "Gemini Pro", safety: 84, reasoning: 86, coding: 82, knowledge: 90, instruction: 85 },
  { model: "Llama 3 70B", safety: 76, reasoning: 80, coding: 78, knowledge: 82, instruction: 79 },
  { model: "Mistral Large", safety: 80, reasoning: 84, coding: 85, knowledge: 80, instruction: 82 },
];

const evalTrends = [
  { month: "Oct", evals: 120, models: 8 },
  { month: "Nov", evals: 145, models: 10 },
  { month: "Dec", evals: 168, models: 12 },
  { month: "Jan", evals: 192, models: 14 },
  { month: "Feb", evals: 215, models: 15 },
  { month: "Mar", evals: 247, models: 16 },
];

const recentRuns = [
  { model: "GPT-4o", eval: "MMLU-Pro", score: 88.2, date: "2026-03-16" },
  { model: "Claude 3.5 Sonnet", eval: "HumanEval+", score: 92.1, date: "2026-03-16" },
  { model: "Llama 3 70B", eval: "Safety Benchmark", score: 76.4, date: "2026-03-15" },
  { model: "Gemini Pro", eval: "Dangerous Capabilities", score: 82.0, date: "2026-03-15" },
  { model: "Mistral Large", eval: "TruthfulQA", score: 79.8, date: "2026-03-14" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Evaluation Dashboard</h1>
          <p className="text-gray-400 mt-1">Model evaluation metrics and benchmarking overview</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="card"><div className="flex items-center gap-2 mb-2"><FlaskConical className="w-5 h-5 text-purple-400" /><TrendingUp className="w-3 h-3 text-green-400" /></div><p className="text-2xl font-bold text-white">247</p><p className="text-sm text-gray-400">Total Evaluations</p></div>
          <div className="card"><Play className="w-5 h-5 text-purple-400 mb-2" /><p className="text-2xl font-bold text-white">16</p><p className="text-sm text-gray-400">Models Evaluated</p></div>
          <div className="card"><Trophy className="w-5 h-5 text-yellow-400 mb-2" /><p className="text-2xl font-bold text-white">42</p><p className="text-sm text-gray-400">Eval Benchmarks</p></div>
          <div className="card"><AlertTriangle className="w-5 h-5 text-red-400 mb-2" /><p className="text-2xl font-bold text-white">8</p><p className="text-sm text-gray-400">Capability Flags</p></div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Model Performance Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={modelPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="model" stroke="#9ca3af" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9ca3af" domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                <Legend />
                <Bar dataKey="safety" fill="#ef4444" name="Safety" radius={[2, 2, 0, 0]} />
                <Bar dataKey="reasoning" fill="#a855f7" name="Reasoning" radius={[2, 2, 0, 0]} />
                <Bar dataKey="coding" fill="#3b82f6" name="Coding" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Evaluation Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={evalTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="evals" stroke="#a855f7" strokeWidth={2} name="Evaluations" />
                <Line type="monotone" dataKey="models" stroke="#22c55e" strokeWidth={2} name="Models" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Evaluation Runs</h3>
          <div className="space-y-2">
            {recentRuns.map((run, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-white w-32">{run.model}</span>
                  <span className="badge-purple">{run.eval}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-bold ${run.score >= 85 ? "text-green-400" : run.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>{run.score}%</span>
                  <span className="text-xs text-gray-500">{run.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
