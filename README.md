# EvalLab

> AI Model Evaluation and Benchmarking Laboratory

EvalLab is a platform for systematically evaluating AI models across safety, reasoning, coding, and knowledge benchmarks. Run evaluations, compare model performance, track dangerous capabilities, and generate reports.

## Features

- **Evaluation Dashboard** -- Overview of total evaluations, models tested, and capability flags
- **Model Comparison** -- Side-by-side bar charts across safety, reasoning, and coding metrics
- **Evaluation Catalog** -- Browse available benchmarks (MMLU-Pro, HumanEval+, TruthfulQA, etc.)
- **Testing Runner** -- Execute evaluation runs against models with progress tracking
- **Dangerous Capabilities** -- Monitor and flag potentially hazardous model behaviors
- **Leaderboard** -- Ranked model scores across all benchmark dimensions
- **Custom Eval Builder** -- Design custom evaluation suites for domain-specific testing
- **Reports** -- Generate and export evaluation reports with charts and analysis

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase SSR
- **Charts:** Recharts
- **State Management:** Zustand
- **Date Utilities:** date-fns
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL and SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx            # Dashboard with charts and recent runs
    catalog/            # Benchmark catalog browser
    testing/            # Evaluation run execution
    dangerous-caps/     # Dangerous capabilities monitor
    leaderboard/        # Model ranking leaderboard
    builder/            # Custom evaluation suite builder
    reports/            # Report generation and export
  components/
    Sidebar.tsx         # Navigation sidebar
  lib/                  # Supabase client, utilities
```

## License

MIT
