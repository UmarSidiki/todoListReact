import { SignInButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";

export default function Example() {
  return (
    <SignInButton>
      <Button
        variant="outline"
        className="bg-black/80 dark:bg-white/80 text-white dark:text-black 
             border border-neutral-700 dark:border-neutral-300 
             backdrop-blur-lg shadow-xl px-6 py-2 rounded-lg 
             hover:bg-black/90 dark:hover:bg-white/90 hover:text-white
             transition-all duration-200"
      >
        Sign In
      </Button>
    </SignInButton>
  );
}
