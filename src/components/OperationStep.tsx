import type { OperationStep as OperationStepType } from "@/types";

export function OperationStep({ step }: { step: OperationStepType }) {
  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ember/50 font-display text-lg font-light text-ember">
          {String(step.order).padStart(2, "0")}
        </span>
        <span className="mt-2 h-full w-px flex-1 bg-sanctuary-700 last:hidden" aria-hidden />
      </div>
      <div className="pb-10">
        <h3 className="font-display text-xl">{step.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-parchment/70">
          {step.description}
        </p>
      </div>
    </div>
  );
}
