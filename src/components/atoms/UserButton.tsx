import { UserButton } from "@clerk/clerk-react";

const UserButton2 = () => {
  return (
    <UserButton
      userProfileUrl="/profile"
      appearance={{
        variables: {
          colorPrimary: "#4CAF50", // Green accent
          colorTextOnPrimaryBackground: "#FFFFFF", // White on green buttons
          borderRadius: "12px", // Rounded corners
          fontFamily: "Inter, sans-serif", // Modern font
          colorBackground: "transparent", // Light background
        },
        elements: {
          // User Button (the avatar/icon itself)
          userButtonTrigger:
            "bg-white/30 dark:bg-neutral-800/50 backdrop-blur-sm border border-white/20 dark:border-neutral-600 rounded-full p-1 hover:bg-white/40 dark:hover:bg-neutral-700/50 transition-all duration-200",

          // Dropdown Card (Outer Container)
          userButtonPopoverCard:
            "bg-white/20 dark:bg-neutral-800/30 backdrop-blur-lg border border-white/30 dark:border-neutral-700 rounded-xl shadow-xl max-w-xs w-full",

          // Menu Items
          userButtonPopoverActionButton:
            "text-neutral-700 dark:text-neutral-200 hover:bg-white/10 dark:hover:bg-neutral-900/20 rounded-lg p-2 transition-all duration-200",
          userButtonPopoverActionButtonIcon:
            "text-neutral-600 dark:text-neutral-300",

          // Footer (e.g., Sign Out button area)
          userButtonPopoverFooter:
            "bg-white/10 dark:bg-neutral-900/30 backdrop-blur-md rounded-b-lg p-2",
          footerActionLink:
            "text-green-500 hover:text-green-600 font-medium transition-colors duration-200",
          footerActionText: "text-neutral-600 dark:text-neutral-300",

          // General Text
          text: "text-neutral-700 dark:text-neutral-200",
        },
      }}
    />
  );
};

export default UserButton2;
