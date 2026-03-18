"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Play, Loader2, CheckCircle, XCircle } from "lucide-react";

interface TestConfig {
  model: string;
  benchmark: string;
  apiKey: string;
  temperature: number;
  maxTokens: number;
  samples: number;
}

interface TestResult {
  id: string;
  model: string;
  benchmark: string;
  score: number;
  metrics: { name: string; value: number }[];
  startedAt: string;
  duration: number;
  status: "completed" | "failed";
  sampleResults: { input: string; expected: string; actual: string; correct: boolean }[];
}

const MODELS = ["GPT-4o", "GPT-4o-mini", "Claude 3.5 Sonnet", "Claude 3 Opus", "Llama 3 70B", "Gemini Pro", "Mistral Large"];
const BENCHMARKS = ["MMLU-Pro", "HumanEval+", "TruthfulQA", "SafetyBench", "MT-Bench", "GPQA Diamond"];

const pastResults: TestResult[] = [
  {
    id: "tr1", model: "GPT-4o", benchmark: "MMLU-Pro", score: 88.2, status: "completed",
    metrics: [{ name: "Accuracy", value: 88.2 }, { name: "Calibration", value: 0.92 }],
    startedAt: "2026-03-16T10:00:00", duration: 3600,
    sampleResults: [
      { input: "What is the capital of France?", expected: "Paris", actual: "Paris", correct: true },
      { input: "Solve: integral of x^2 dx", expected: "x^3/3 + C", actual: "x^3/3 + C", correct: true },
      { input: "What causes tides?", expected: "Gravitational pull of Moon and Sun", actual: "Gravitational pull of the Moon", correct: false },
    ],
  },
  {
    id: "tr2", model: "Claude 3.5 Sonnet", benchmark: "HumanEval+", score: 92.1, status: "completed",
    metrics: [{ name: "Pass@1", value: 92.1 }, { name: "Pass@10", value: 97.5 }],
    startedAt: "2026-03-16T08:00:00", duration: 1800,
    sampleResults: [
      { input: "def add(a, b): ...", expected: "return a + b", actual: "return a + b", correct: true },
      { input: "def fibonacci(n): ...", expected: "correct implementation", actual: "correct implementation", correct: true },
    ],
  },
];

export default function Testing() {
  const [config, setConfig] = useState<TestConfig>({
    model: MODELS[0], benchmark: BENCHMARKS[0], apiKey: "", temperature: 0.0, maxTokens: 2048, samples: 100,
  });
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>(pastResults);
  const [selectedResult, setSelectedResult] = useState<string>(pastResults[0].id);

  const runTest = () => {
    setRunning(true);
    setTimeout(() => {
      const newResult: TestResult = {
        id: `tr${Date.now()}`, model: config.model, benchmark: config.benchmark,
        score: Math.floor(Math.random() * 20) + 75, status: "completed",
        metrics: [{ name: "Accuracy", value: Math.floor(Math.random() * 20) + 75 }],
        startedAt: new Date().toISOString(), duration: Math.floor(Math.random() * 3600) + 600,
        sampleResults: [
          { input: "Sample question 1", expected: "Expected answer", actual: "Model response", correct: Math.random() > 0.3 },
          { input: "Sample question 2", expected: "Expected answer", actual: "Model response", correct: Math.random() > 0.3 },
        ],
      };
      setResults([newResult, ...results]);
      setSelectedResult(newResult.id);
      setRunning(false);
    }, 3000);
  };

  const result = results.find((r) => r.id === selectedResult);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Model Testing</h1>
          <p className="text-gray-400 mt-1">Run evaluations against models via API</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Config */}
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-4">Test Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1">Model</label>
                <select value={config.model} onChange={(e) => setConfig({ ...config, model: e.target.value })} className="input-field w-full">
                  {MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Benchmark</label>
                <select value={config.benchmark} onChange={(e) => setConfig({ ...config, benchmark: e.target.value })} className="input-field w-full">
                  {BENCHMARKS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">API Key</label>
                <input type="password" value={config.apiKey} onChange={(e) => setConfig({ ...config, apiKey: e.target.value })} className="input-field w-full" placeholder="sk-..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Temperature</label>
                  <input type="number" step="0.1" min="0" max="2" value={config.temperature} onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })} className="input-field w-full" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">Max Tokens</label>
                  <input type="number" value={config.maxTokens} onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })} className="input-field w-full" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Samples</label>
                <input type="number" value={config.samples} onChange={(e) => setConfig({ ...config, samples: parseInt(e.target.value) })} className="input-field w-full" />
              </div>
              <button onClick={runTest} disabled={running} className="btn-primary w-full flex items-center justify-center gap-2">
                {running ? <><Loader2 className="w-4 h-4 animate-spin" /> Running...</> : <><Play className="w-4 h-4" /> Run Test</>}
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800">
              <h4 className="text-sm font-semibold text-white mb-3">History</h4>
              <div className="space-y-2">
                {results.map((r) => (
                  <button key={r.id} onClick={() => setSelectedResult(r.id)}
                    className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${r.id === selectedResult ? "bg-purple-600/20" : "hover:bg-gray-800"}`}>
                    <div className="flex justify-between"><span className="text-white">{r.model}</span><span className={`font-bold ${r.score >= 85 ? "text-green-400" : "text-yellow-400"}`}>{r.score}%</span></div>
                    <span className="text-gray-500">{r.benchmark}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="col-span-2 space-y-6">
            {result && (
              <>
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-white">{result.model} - {result.benchmark}</h2>
                      <p className="text-sm text-gray-400">{new Date(result.startedAt).toLocaleString()} &middot; {Math.round(result.duration / 60)}min</p>
                    </div>
                    <p className={`text-4xl font-bold ${result.score >= 85 ? "text-green-400" : result.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>{result.score}%</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {result.metrics.map((m) => (
                      <div key={m.name} className="bg-gray-800 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-white">{typeof m.value === "number" && m.value < 1 ? m.value.toFixed(2) : m.value}</p>
                        <p className="text-xs text-gray-500">{m.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Sample Results</h3>
                  <div className="space-y-3">
                    {result.sampleResults.map((s, i) => (
                      <div key={i} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {s.correct ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                          <span className="text-xs text-gray-500">Sample {i + 1}</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-1"><span className="text-gray-600">Input:</span> {s.input}</p>
                        <p className="text-xs text-gray-400 mb-1"><span className="text-gray-600">Expected:</span> {s.expected}</p>
                        <p className="text-xs text-gray-400"><span className="text-gray-600">Actual:</span> {s.actual}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
