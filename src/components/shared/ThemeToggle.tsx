"use client";

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

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 relative color-[#f1765b]"
        >
          <Sun className={`h-5 w-5 transition-all ${
            theme === 'light' ? 'rotate-0 scale-100 text-[#f1765b]' : 'rotate-90 scale-0 text-[#f1765b]'
          }`} />
          <Moon className={`absolute h-5 w-5 transition-all ${
            theme === 'dark' ? 'rotate-0 scale-100 text-[#f1765b]' : '-rotate-90 scale-0 text-[#f1765b]'
          }`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={theme === 'light' ? 'bg-accent' : ''}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={theme === 'dark' ? 'bg-accent' : ''}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={theme === 'system' ? 'bg-accent' : ''}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}