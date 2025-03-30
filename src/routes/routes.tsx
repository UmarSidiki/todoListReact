import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Home from "@/(pages)/Home";
import About from "@/(pages)/about";
import Contact from "@/(pages)/contact";
import NotFound from "@/(pages)/NotFoundPage";
import SignInPage from "@/(pages)/signin";
import SignUpPage from "@/(pages)/signup";
import UserProfilePage from "@/(pages)/UserProfilePage";

// Custom ProtectedRoute component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Don't make a decision until Clerk has finished loading
  if (!isLoaded) {
    return <div>Loading authentication...</div>;
  }

  if (!isSignedIn) {
    // Redirect to sign-in page, preserving the original URL as a redirect param
    return <Navigate to="/sign-in" state={{ from: "/profile" }} replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;