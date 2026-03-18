"use client";

import Sidebar from "@/components/Sidebar";
import { FileText, Download, Eye, Clock, Plus } from "lucide-react";

const reports = [
  { id: "r1", title: "GPT-4o Comprehensive Evaluation Report", model: "GPT-4o", date: "2026-03-16", evals: 8, pages: 24, status: "final" },
  { id: "r2", title: "Claude 3.5 Sonnet Safety Assessment", model: "Claude 3.5 Sonnet", date: "2026-03-15", evals: 5, pages: 18, status: "final" },
  { id: "r3", title: "Llama 3 70B Dangerous Capabilities Report", model: "Llama 3 70B", date: "2026-03-14", evals: 6, pages: 20, status: "draft" },
  { id: "r4", title: "Weekly Model Comparison Report", model: "Multiple", date: "2026-03-13", evals: 12, pages: 32, status: "final" },
  { id: "r5", title: "Gemini Pro Evaluation Summary", model: "Gemini Pro", date: "2026-03-12", evals: 7, pages: 16, status: "generating" },
];

export default function Reports() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Automated Reports</h1>
            <p className="text-gray-400 mt-1">Auto-generated evaluation reports</p>
          </div>
          <button className="btn-primary flex items-center gap-2"><Plus className="w-4 h-4" /> Generate Report</button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card text-center"><p className="text-2xl font-bold text-white">{reports.length}</p><p className="text-xs text-gray-500">Total Reports</p></div>
          <div className="card text-center"><p className="text-2xl font-bold text-green-400">{reports.filter((r) => r.status === "final").length}</p><p className="text-xs text-gray-500">Finalized</p></div>
          <div className="card text-center"><p className="text-2xl font-bold text-yellow-400">{reports.filter((r) => r.status === "draft" || r.status === "generating").length}</p><p className="text-xs text-gray-500">In Progress</p></div>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="card flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-white">{report.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">{report.model}</span>
                    <span className="text-xs text-gray-500">{report.evals} evaluations</span>
                    <span className="text-xs text-gray-500">{report.pages} pages</span>
                    <span className="text-xs text-gray-500">{report.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={
                  report.status === "final" ? "badge-green" :
                  report.status === "draft" ? "badge-yellow" : "badge-blue"
                }>{report.status}</span>
                <button className="p-2 hover:bg-gray-800 rounded-lg"><Eye className="w-4 h-4 text-gray-400" /></button>
                <button className="p-2 hover:bg-gray-800 rounded-lg"><Download className="w-4 h-4 text-gray-400" /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
