"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Grid3X3, BookOpen, Play, AlertTriangle, Trophy, Wrench, FileText } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Grid3X3 },
  { href: "/catalog", label: "Eval Catalog", icon: BookOpen },
  { href: "/testing", label: "Model Testing", icon: Play },
  { href: "/dangerous-caps", label: "Dangerous Capabilities", icon: AlertTriangle },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/builder", label: "Custom Eval Builder", icon: Wrench },
  { href: "/reports", label: "Automated Reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <FlaskConical className="w-8 h-8 text-purple-500" />
        <div><h1 className="text-lg font-bold text-white">EvalLab</h1><p className="text-xs text-gray-500">Model Evaluation</p></div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-purple-600/20 text-purple-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}>
              <Icon className="w-4 h-4" />{item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-800"><p className="text-xs text-gray-600 px-2">EvalLab v1.0</p></div>
    </aside>
  );
}
