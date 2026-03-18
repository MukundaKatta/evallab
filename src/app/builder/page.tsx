"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Plus, Trash2, Save, Play, GripVertical } from "lucide-react";

interface EvalTask { id: string; input: string; expectedOutput: string; scoringMethod: string; weight: number; }

interface CustomEval { id: string; name: string; description: string; category: string; scoringType: string; tasks: EvalTask[]; }

const SCORING_METHODS = ["Exact Match", "Contains", "Semantic Similarity", "LLM Judge", "Regex Match", "Numeric Range"];
const CATEGORIES = ["Safety", "Knowledge", "Coding", "Reasoning", "Instruction Following", "Custom"];

export default function Builder() {
  const [eval_, setEval] = useState<CustomEval>({
    id: "new", name: "My Custom Evaluation", description: "Description of what this evaluation tests",
    category: "Custom", scoringType: "LLM Judge",
    tasks: [
      { id: "t1", input: "What is the capital of France?", expectedOutput: "Paris", scoringMethod: "Contains", weight: 1 },
      { id: "t2", input: "Write a Python function to reverse a string", expectedOutput: "def reverse(s): return s[::-1]", scoringMethod: "LLM Judge", weight: 1 },
    ],
  });

  const addTask = () => {
    setEval({ ...eval_, tasks: [...eval_.tasks, { id: `t${Date.now()}`, input: "", expectedOutput: "", scoringMethod: "LLM Judge", weight: 1 }] });
  };

  const updateTask = (id: string, updates: Partial<EvalTask>) => {
    setEval({ ...eval_, tasks: eval_.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)) });
  };

  const removeTask = (id: string) => {
    setEval({ ...eval_, tasks: eval_.tasks.filter((t) => t.id !== id) });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Custom Eval Builder</h1>
            <p className="text-gray-400 mt-1">Create custom evaluation benchmarks</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
            <button className="btn-primary flex items-center gap-2"><Play className="w-4 h-4" /> Run Eval</button>
          </div>
        </div>

        {/* Eval Config */}
        <div className="card mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Eval Name</label>
              <input value={eval_.name} onChange={(e) => setEval({ ...eval_, name: e.target.value })} className="input-field w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Category</label>
                <select value={eval_.category} onChange={(e) => setEval({ ...eval_, category: e.target.value })} className="input-field w-full">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Default Scoring</label>
                <select value={eval_.scoringType} onChange={(e) => setEval({ ...eval_, scoringType: e.target.value })} className="input-field w-full">
                  {SCORING_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xs text-gray-500 block mb-1">Description</label>
            <textarea value={eval_.description} onChange={(e) => setEval({ ...eval_, description: e.target.value })} className="input-field w-full h-16" />
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Tasks ({eval_.tasks.length})</h3>
            <button onClick={addTask} className="btn-secondary text-sm flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add Task
            </button>
          </div>

          {eval_.tasks.map((task, idx) => (
            <div key={task.id} className="card">
              <div className="flex items-start gap-3">
                <GripVertical className="w-4 h-4 text-gray-600 mt-2 flex-shrink-0" />
                <span className="w-6 h-6 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">{idx + 1}</span>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Input Prompt</label>
                    <textarea value={task.input} onChange={(e) => updateTask(task.id, { input: e.target.value })} className="input-field w-full h-20" placeholder="Enter the prompt to send to the model..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Expected Output / Reference</label>
                    <textarea value={task.expectedOutput} onChange={(e) => updateTask(task.id, { expectedOutput: e.target.value })} className="input-field w-full h-20" placeholder="Enter the expected response or reference..." />
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">Scoring Method</label>
                      <select value={task.scoringMethod} onChange={(e) => updateTask(task.id, { scoringMethod: e.target.value })} className="input-field w-full">
                        {SCORING_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-gray-500 block mb-1">Weight</label>
                      <input type="number" min={0.1} step={0.1} value={task.weight} onChange={(e) => updateTask(task.id, { weight: parseFloat(e.target.value) })} className="input-field w-full" />
                    </div>
                  </div>
                </div>
                <button onClick={() => removeTask(task.id)} className="text-gray-600 hover:text-red-400 mt-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button onClick={addTask} className="w-full card border-dashed flex items-center justify-center gap-2 text-gray-500 hover:text-gray-300">
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
      </main>
    </div>
  );
}
