import { cn } from "@/lib/utils";
import React from "react";

interface HomeTemplateProps {
  children: React.ReactNode;
  className?: string;
}

const HomeTemplate = ({ children, className }: HomeTemplateProps) => {
  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] overflow-hidden",
        className
      )}
    >
      <div className="custom-bg w-full h-full overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default HomeTemplate;