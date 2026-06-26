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
    <div className="min-h-screen bg-[#07070f] text-white flex flex-col">

      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[20%] w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[100px]" />
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-0.5 bg-white/[0.06]">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="relative px-6 py-5 flex items-center justify-between max-w-2xl mx-auto w-full">
        <span className="text-sm font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">ma</span>
          <span className="text-white">vocation</span>
        </span>
        <span className="text-xs font-mono text-slate-600 tracking-widest">
          {String(step + 1).padStart(2, "0")} / {QUESTIONS.length}
        </span>
      </div>

      {/* Question */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-16">
        <div className="w-full max-w-2xl">

          {/* Step indicator */}
          <div className="flex gap-1 mb-8">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
                  i < step ? "bg-violet-500" : i === step ? "bg-violet-400" : "bg-white/[0.08]"
                }`}
              />
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 leading-snug">
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
                      ? "border-violet-500/80 bg-violet-500/15 text-white"
                      : "border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-violet-500/40 hover:bg-violet-500/08 hover:text-white"
                    }
                    ${animating && !isSelected ? "opacity-30" : ""}
                  `}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors
                        ${isSelected
                          ? "bg-violet-500 text-white"
                          : "bg-white/[0.06] text-slate-600 group-hover:text-slate-400"
                        }
                      `}
                    >
                      {letters[idx]}
                    </span>
                    <span>{option.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-violet-400">✓</span>
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
