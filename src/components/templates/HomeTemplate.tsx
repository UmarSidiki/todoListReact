import { cn } from "@/lib/utils";
import React from "react";

interface HomeTemplateProps {
  children: React.ReactNode;
  className?: string;
}

const HomeTemplate = ({ children, className }: HomeTemplateProps) => {
  return (
    <>

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
