import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "EvalLab - Model Evaluation Platform", description: "Comprehensive AI model evaluation and benchmarking platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
