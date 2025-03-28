import { Button } from "@/components/ui/button";
import { Menu, Home, Info, Briefcase, Mail } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  const menuItems = [
    { icon: Home, text: "Home", link: "/" },
    { icon: Info, text: "About", link: "/about" },
    { icon: Briefcase, text: "Services", link: "/services" },
    { icon: Mail, text: "Contact", link: "/contact" },
  ];

  return (
    <nav className="flex items-center justify-between py-3 px-5 md:px-32 shadow-md bg-white/20 dark:bg-neutral-950/20 backdrop-blur-md outline z-10">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
        My App
      </h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-4">
        {menuItems.map((item, index) => (
          <Link to={item.link} key={index}>
            <Button variant="ghost" className="flex items-center gap-2 text-md">
              <item.icon className="w-5 h-5" />
              {item.text}
            </Button>
          </Link>
        ))}
        <ModeToggle />
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden gap-1">
        <Sheet>
          {/* Mobile Trigger Button */}
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          {/* Sidebar Content */}
          <SheetContent
            side="left"
            className="w-72 p-6 bg-white dark:bg-black/30 backdrop-blur-lg border-none shadow-lg rounded-r-2xl"
          >
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
              Menu
            </h2>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col gap-3">
              {menuItems.map((item, index) => (
                <Link to={item.link} key={index}>
                  <Button variant="ghost" className="flex items-center gap-2 text-md w-full">
                    <item.icon className="w-5 h-5" />
                    {item.text}
                  </Button>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
