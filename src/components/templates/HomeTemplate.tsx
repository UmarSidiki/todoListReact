import { cn } from "@/lib/utils";
import React from "react";

interface HomeTemplateProps {
  children: React.ReactNode;
  className?: string;
}

const HomeTemplate = ({ children, className }: HomeTemplateProps) => {
  return (
    <>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-50 to-green-50 dark:from-neutral-900 dark:via-neutral-900/20 dark:to-green-900/20 -z-10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-neutral-400/20 rounded-full blur-3xl animate-pulse delay-500" />
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1500" />
        </div>
      </div>
      <div className="w-full h-full overflow-hidden">
        <main
          className={cn(
            "flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden pt-20",
            className
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default HomeTemplate;
