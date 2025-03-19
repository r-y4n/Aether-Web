import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    switch (newTheme) {
      case "light":
        setTheme("light");
        localStorage.setItem("theme", "light");
        break;
      case "dark":
        setTheme("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "system":
        setTheme("system");
        localStorage.setItem("theme", "system");
        break;
      default:
        // Handle invalid theme selection (optional)
        console.warn("Invalid theme selected:", newTheme);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* ... (rest of your JSX remains the same) ... */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
