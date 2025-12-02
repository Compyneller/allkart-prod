"use client";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "store/hook";

import BackButton from "@/components/store/back-button";
import { cn } from "@/lib/utils";

const Steppers = ({
  steps,
  className,
}: {
  steps: { comp: React.ReactNode; title: string }[];
  className?: string;
}) => {
  const { currentStep } = useAppSelector((state) => state.storeCreation);

  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      scale: 0.8,
      opacity: 0,
    },
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className=" mx-auto">
        <Stepper className="items-start gap-4 mb-10" value={currentStep}>
          {steps.map((step, index) => (
            <StepperItem className="flex-1" key={index} step={index + 1}>
              <StepperTrigger className="w-full flex-col items-start gap-2 rounded">
                <StepperIndicator asChild className="h-1 w-full bg-border">
                  <span className="sr-only">{index + 1}</span>
                </StepperIndicator>
                <div className="space-y-0.5">
                  <StepperTitle>{step.title}</StepperTitle>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>
      </div>

      <div className={cn("relative overflow-hidden mx-auto", className)}>
        <div className="mb-3">
          <BackButton />
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentStep}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              ease: "easeInOut",
              duration: 0.3,
              opacity: {
                duration: 0.2,
              },
            }}>
            {steps[currentStep - 1]?.comp}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Steppers;
