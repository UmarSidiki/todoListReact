// App.jsx
import { ThemeProvider } from "./lib/ThemeProvider"; // Assuming this is your ThemeProvider
import Header from "./components/atoms/Header";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-50 to-green-50 dark:from-neutral-900 dark:via-neutral-900/20 dark:to-green-900/20" />
          <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-neutral-400/20 rounded-full blur-3xl animate-pulse delay-500" />
            <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1500" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <div className="pt-20">
            <AppRoutes />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
