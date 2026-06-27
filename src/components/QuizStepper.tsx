"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/vocation-questions";
import { computeProfile, recommendCareers } from "@/lib/vocation-scoring";
import type { DimensionWeights } from "@/lib/vocation-scoring";

export default function QuizStepper() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<DimensionWeights>[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  function handleSelect(idx: number) {
    if (animating) return;
    setSelected(idx);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = [...answers, question.options[idx].weights];
      if (step + 1 >= QUESTIONS.length) {
        const profile = computeProfile(newAnswers);
        const careers = recommendCareers(profile, 3);
        sessionStorage.setItem("quiz_result", JSON.stringify({ profile, careers }));
        router.push("/quiz/result");
      } else {
        setAnswers(newAnswers);
        setStep(step + 1);
        setSelected(null);
        setAnimating(false);
      }
    }, 350);
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* Progress bar */}
      <div className="w-full h-1 bg-zinc-100 dark:bg-white/[0.06]">
        <div
          className="h-full bg-violet-600 dark:bg-violet-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between max-w-2xl mx-auto w-full">
        <span className="text-sm font-bold tracking-tight">
          <span className="text-violet-600 dark:text-violet-400">ma</span>
          <span>vocation</span>
        </span>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 tracking-widest">
          {String(step + 1).padStart(2, "0")} / {QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-2xl">

          {/* Step indicators */}
          <div className="flex gap-1 mb-8">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i < step
                    ? "bg-violet-600 dark:bg-violet-500"
                    : i === step
                    ? "bg-violet-400 dark:bg-violet-400"
                    : "bg-zinc-200 dark:bg-white/[0.08]"
                }`}
              />
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-10 leading-snug">
            {question.text}
          </h2>

          <div className="grid gap-3">
            {question.options.map((option, idx) => {
              const isSelected = selected === idx;
              const letters = ["A", "B", "C", "D"];
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={animating}
                  className={`
                    group w-full text-left px-5 py-4 rounded-xl border text-sm font-medium
                    transition-all duration-200 cursor-pointer disabled:cursor-not-allowed
                    ${isSelected
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-500/15 text-violet-900 dark:text-white"
                      : "border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] text-zinc-700 dark:text-zinc-300 hover:border-violet-300 dark:hover:border-violet-500/40 hover:bg-violet-50 dark:hover:bg-violet-500/[0.08]"
                    }
                    ${animating && !isSelected ? "opacity-40" : ""}
                  `}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors
                        ${isSelected
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-100 dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-400"
                        }
                      `}
                    >
                      {letters[idx]}
                    </span>
                    <span>{option.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-violet-600 dark:text-violet-400 font-bold">✓</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
