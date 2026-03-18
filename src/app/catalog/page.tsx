"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Search, Filter, BookOpen, Star } from "lucide-react";

interface EvalBenchmark {
  id: string;
  name: string;
  category: string;
  description: string;
  tasks: number;
  metrics: string[];
  difficulty: "easy" | "medium" | "hard" | "expert";
  popular: boolean;
  source: string;
}

const benchmarks: EvalBenchmark[] = [
  { id: "b1", name: "MMLU-Pro", category: "Knowledge", description: "Massive Multitask Language Understanding - enhanced version with harder questions across 57 subjects", tasks: 12000, metrics: ["Accuracy", "Calibration"], difficulty: "hard", popular: true, source: "Princeton/NYU" },
  { id: "b2", name: "HumanEval+", category: "Coding", description: "Python code generation benchmark with extended test cases for functional correctness", tasks: 164, metrics: ["Pass@1", "Pass@10"], difficulty: "medium", popular: true, source: "OpenAI + CodiumAI" },
  { id: "b3", name: "TruthfulQA", category: "Honesty", description: "Measures tendency to generate truthful answers rather than imitating common misconceptions", tasks: 817, metrics: ["Truthfulness", "Informativeness"], difficulty: "medium", popular: true, source: "University of Oxford" },
  { id: "b4", name: "BBQ (Bias Benchmark)", category: "Fairness", description: "Measures social biases in question answering across 9 categories of social bias", tasks: 58492, metrics: ["Accuracy", "Bias Score"], difficulty: "medium", popular: false, source: "Google Research" },
  { id: "b5", name: "GPQA Diamond", category: "Reasoning", description: "Graduate-level STEM questions that require expert-level reasoning", tasks: 448, metrics: ["Accuracy"], difficulty: "expert", popular: true, source: "NYU" },
  { id: "b6", name: "SafetyBench", category: "Safety", description: "Comprehensive safety evaluation across harmful content categories", tasks: 5000, metrics: ["Refusal Rate", "Safety Score"], difficulty: "hard", popular: false, source: "Internal" },
  { id: "b7", name: "AgentBench", category: "Agency", description: "Evaluates LLM-as-agent capabilities across operating systems, databases, and web environments", tasks: 800, metrics: ["Success Rate", "Efficiency"], difficulty: "expert", popular: false, source: "Tsinghua" },
  { id: "b8", name: "MT-Bench", category: "Instruction Following", description: "Multi-turn conversation benchmark judged by GPT-4", tasks: 80, metrics: ["Average Score", "Turn Quality"], difficulty: "medium", popular: true, source: "LMSYS" },
  { id: "b9", name: "WMDP (Weapons of Mass Destruction)", category: "Dangerous Capabilities", description: "Evaluates knowledge related to weapons of mass destruction creation", tasks: 3260, metrics: ["Accuracy (lower is safer)"], difficulty: "expert", popular: false, source: "CAIS" },
  { id: "b10", name: "Persuasion Eval", category: "Persuasion", description: "Measures AI persuasion capability and resistance to manipulation requests", tasks: 1200, metrics: ["Persuasion Index", "Manipulation Resistance"], difficulty: "hard", popular: false, source: "Internal" },
];

const categories = [...new Set(benchmarks.map((b) => b.category))];
const difficultyColors: Record<string, string> = { easy: "badge-green", medium: "badge-yellow", hard: "badge-orange", expert: "badge-red" };

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selected, setSelected] = useState<string>(benchmarks[0].id);

  const filtered = benchmarks.filter((b) => {
    if (filterCategory !== "all" && b.category !== filterCategory) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const bench = benchmarks.find((b) => b.id === selected)!;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Eval Catalog</h1>
          <p className="text-gray-400 mt-1">Browse and manage evaluation benchmarks</p>
        </div>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search benchmarks..." className="input-field w-full pl-10" />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="input-field">
            <option value="all">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {filtered.map((b) => (
              <button key={b.id} onClick={() => setSelected(b.id)}
                className={`text-left p-4 rounded-xl border transition-colors ${b.id === selected ? "bg-purple-600/20 border-purple-500/50" : "bg-gray-900 border-gray-800 hover:border-gray-700"}`}>
                <div className="flex items-center gap-2 mb-2">
                  {b.popular && <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />}
                  <span className="badge-purple">{b.category}</span>
                  <span className={difficultyColors[b.difficulty]}>{b.difficulty}</span>
                </div>
                <p className="text-sm font-medium text-white">{b.name}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{b.description}</p>
                <p className="text-xs text-gray-600 mt-2">{b.tasks.toLocaleString()} tasks</p>
              </button>
            ))}
          </div>

          <div className="card h-fit sticky top-8">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              {bench.popular && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{bench.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-purple">{bench.category}</span>
              <span className={difficultyColors[bench.difficulty]}>{bench.difficulty}</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">{bench.description}</p>
            <div className="space-y-3 text-sm">
              <div><p className="text-gray-500">Tasks</p><p className="text-white">{bench.tasks.toLocaleString()}</p></div>
              <div><p className="text-gray-500">Source</p><p className="text-white">{bench.source}</p></div>
              <div><p className="text-gray-500">Metrics</p><div className="flex flex-wrap gap-1 mt-1">{bench.metrics.map((m) => <span key={m} className="badge-blue">{m}</span>)}</div></div>
            </div>
            <button className="btn-primary w-full mt-4">Run Evaluation</button>
          </div>
        </div>
      </main>
    </div>
  );
}
