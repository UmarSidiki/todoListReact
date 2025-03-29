import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Home, Info, Briefcase, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeToggle";
import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SignInButton from "@/components/atoms/SignInButton";

const menuItems = [
  { icon: Home, text: "Home", link: "/" },
  { icon: Info, text: "About", link: "/about" },
  { icon: Briefcase, text: "Services", link: "/services" },
  { icon: Mail, text: "Contact", link: "/contact" },
];

interface NavItemProps {
  item: {
    icon: React.ElementType;
    text: string;
    link: string;
  };
}

const NavItem = ({ item }: NavItemProps) => (
  <NavLink to={item.link} className="text-neutral-900 dark:text-white">
    <Button variant="ghost" className="flex items-center gap-2 text-md">
      <item.icon className="w-5 h-5" />
      {item.text}
    </Button>
  </NavLink>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "mt-2 mx-8 py-3 bg-white/60 dark:bg-neutral-900/70 shadow-lg rounded-xl border border-neutral-200 dark:border-neutral-800 backdrop-blur-lg"
            : "py-3 bg-white/20 dark:bg-neutral-950/50 border-b border-neutral-200 dark:border-neutral-800 backdrop-blur-lg"
        }`}
      >
        <div className="flex justify-between items-center px-4 max-w-7xl mx-auto">
          {/* Logo */}
          <h1
            className={`font-bold text-neutral-900 dark:text-white ${
              isScrolled ? "text-xl" : "text-2xl"
            }`}
          >
            <NavLink to="/">RexTodo</NavLink>
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {menuItems.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ModeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/20"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-72 p-6 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg border-none shadow-lg rounded-r-2xl z-[60]"
              >
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                  Menu
                </h2>
                <nav className="flex flex-col gap-3">
                  {menuItems.map((item, index) => (
                    <NavItem key={index} item={item} />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
