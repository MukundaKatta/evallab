"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Trophy, ArrowUp, ArrowDown, Minus } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  model: string;
  provider: string;
  overallScore: number;
  previousRank: number;
  scores: Record<string, number>;
  params: string;
  openSource: boolean;
}

const entries: LeaderboardEntry[] = [
  { rank: 1, model: "Claude 3.5 Sonnet", provider: "Anthropic", overallScore: 91.2, previousRank: 2, scores: { Safety: 93, Reasoning: 89, Coding: 88, Knowledge: 86, Instruction: 94, Honesty: 95 }, params: "Unknown", openSource: false },
  { rank: 2, model: "GPT-4o", provider: "OpenAI", overallScore: 89.8, previousRank: 1, scores: { Safety: 87, Reasoning: 92, Coding: 90, Knowledge: 88, Instruction: 91, Honesty: 88 }, params: "Unknown", openSource: false },
  { rank: 3, model: "Gemini 1.5 Pro", provider: "Google", overallScore: 86.5, previousRank: 3, scores: { Safety: 84, Reasoning: 86, Coding: 82, Knowledge: 90, Instruction: 85, Honesty: 86 }, params: "Unknown", openSource: false },
  { rank: 4, model: "Mistral Large", provider: "Mistral", overallScore: 83.2, previousRank: 5, scores: { Safety: 80, Reasoning: 84, Coding: 85, Knowledge: 80, Instruction: 82, Honesty: 82 }, params: "Unknown", openSource: false },
  { rank: 5, model: "Llama 3 70B", provider: "Meta", overallScore: 79.4, previousRank: 4, scores: { Safety: 76, Reasoning: 80, Coding: 78, Knowledge: 82, Instruction: 79, Honesty: 78 }, params: "70B", openSource: true },
  { rank: 6, model: "Qwen 2 72B", provider: "Alibaba", overallScore: 78.8, previousRank: 6, scores: { Safety: 74, Reasoning: 82, Coding: 80, Knowledge: 78, Instruction: 76, Honesty: 75 }, params: "72B", openSource: true },
  { rank: 7, model: "Command R+", provider: "Cohere", overallScore: 76.1, previousRank: 8, scores: { Safety: 78, Reasoning: 74, Coding: 70, Knowledge: 80, Instruction: 78, Honesty: 77 }, params: "Unknown", openSource: false },
  { rank: 8, model: "Mixtral 8x22B", provider: "Mistral", overallScore: 74.5, previousRank: 7, scores: { Safety: 72, Reasoning: 76, Coding: 78, Knowledge: 74, Instruction: 72, Honesty: 71 }, params: "141B MoE", openSource: true },
];

const categories = ["Safety", "Reasoning", "Coding", "Knowledge", "Instruction", "Honesty"];

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<string>("overallScore");

  const sorted = [...entries].sort((a, b) => {
    if (sortBy === "overallScore") return b.overallScore - a.overallScore;
    return (b.scores[sortBy] || 0) - (a.scores[sortBy] || 0);
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Model Leaderboard</h1>
              <p className="text-gray-400 mt-1">Comprehensive model ranking across evaluations</p>
            </div>
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field">
            <option value="overallScore">Overall Score</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Rank</th>
                <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Model</th>
                <th className="text-center px-4 py-3 text-xs text-gray-500 font-medium">Overall</th>
                {categories.map((c) => (
                  <th key={c} className="text-center px-3 py-3 text-xs text-gray-500 font-medium cursor-pointer hover:text-gray-300" onClick={() => setSortBy(c)}>{c}</th>
                ))}
                <th className="text-center px-4 py-3 text-xs text-gray-500 font-medium">Params</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry, idx) => {
                const rankChange = entry.previousRank - (idx + 1);
                return (
                  <tr key={entry.model} className="border-b border-gray-800/50 hover:bg-gray-800/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-300" : idx === 2 ? "text-orange-400" : "text-gray-500"}`}>
                          #{idx + 1}
                        </span>
                        {rankChange > 0 && <ArrowUp className="w-3 h-3 text-green-400" />}
                        {rankChange < 0 && <ArrowDown className="w-3 h-3 text-red-400" />}
                        {rankChange === 0 && <Minus className="w-3 h-3 text-gray-600" />}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div>
                        <span className="text-sm font-medium text-white">{entry.model}</span>
                        {entry.openSource && <span className="ml-2 badge-green">Open</span>}
                        <p className="text-xs text-gray-500">{entry.provider}</p>
                      </div>
                    </td>
                    <td className="text-center px-4 py-4">
                      <span className={`text-lg font-bold ${entry.overallScore >= 85 ? "text-green-400" : entry.overallScore >= 75 ? "text-yellow-400" : "text-orange-400"}`}>
                        {entry.overallScore}
                      </span>
                    </td>
                    {categories.map((cat) => (
                      <td key={cat} className="text-center px-3 py-4">
                        <span className={`text-sm ${entry.scores[cat] >= 85 ? "text-green-400" : entry.scores[cat] >= 75 ? "text-yellow-400" : "text-orange-400"}`}>
                          {entry.scores[cat]}
                        </span>
                      </td>
                    ))}
                    <td className="text-center px-4 py-4 text-xs text-gray-500">{entry.params}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
