import { ReactNode, useMemo } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useTheme } from "@/lib/ThemeProvider.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

interface Props {
  children: ReactNode;
}

// Function to determine the effective theme
const getEffectiveTheme = (theme: string) => {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
};

const ClerkWrapper: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  // Memoize theme calculation to reduce re-renders
  const effectiveTheme = useMemo(() => getEffectiveTheme(theme), [theme]);

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: effectiveTheme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default ClerkWrapper;
