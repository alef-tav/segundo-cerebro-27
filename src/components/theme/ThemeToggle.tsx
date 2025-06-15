
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Verifica o tema atual no localStorage ou usa dark como padrão
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    const root = document.documentElement;
    
    if (newTheme === "light") {
      root.style.setProperty("--background", "0 0% 100%");
      root.style.setProperty("--foreground", "0 0% 3.9%");
      root.style.setProperty("--card", "0 0% 100%");
      root.style.setProperty("--card-foreground", "0 0% 3.9%");
      root.style.setProperty("--popover", "0 0% 100%");
      root.style.setProperty("--popover-foreground", "0 0% 3.9%");
      root.style.setProperty("--primary", "262 83% 66%");
      root.style.setProperty("--primary-foreground", "0 0% 100%");
      root.style.setProperty("--secondary", "0 0% 96.1%");
      root.style.setProperty("--secondary-foreground", "0 0% 9%");
      root.style.setProperty("--muted", "0 0% 96.1%");
      root.style.setProperty("--muted-foreground", "0 0% 45.1%");
      root.style.setProperty("--accent", "0 0% 96.1%");
      root.style.setProperty("--accent-foreground", "0 0% 9%");
      root.style.setProperty("--destructive", "0 84% 60%");
      root.style.setProperty("--destructive-foreground", "0 0% 100%");
      root.style.setProperty("--border", "0 0% 89.8%");
      root.style.setProperty("--input", "0 0% 89.8%");
      root.style.setProperty("--ring", "262 83% 66%");
    } else {
      // Tema escuro (valores originais)
      root.style.setProperty("--background", "0 0% 0%");
      root.style.setProperty("--foreground", "0 0% 100%");
      root.style.setProperty("--card", "0 0% 10%");
      root.style.setProperty("--card-foreground", "0 0% 100%");
      root.style.setProperty("--popover", "0 0% 10%");
      root.style.setProperty("--popover-foreground", "0 0% 100%");
      root.style.setProperty("--primary", "262 83% 66%");
      root.style.setProperty("--primary-foreground", "0 0% 100%");
      root.style.setProperty("--secondary", "0 0% 10%");
      root.style.setProperty("--secondary-foreground", "0 0% 100%");
      root.style.setProperty("--muted", "0 0% 16%");
      root.style.setProperty("--muted-foreground", "0 0% 63%");
      root.style.setProperty("--accent", "0 0% 23%");
      root.style.setProperty("--accent-foreground", "0 0% 100%");
      root.style.setProperty("--destructive", "0 84% 60%");
      root.style.setProperty("--destructive-foreground", "0 0% 100%");
      root.style.setProperty("--border", "0 0% 16%");
      root.style.setProperty("--input", "0 0% 16%");
      root.style.setProperty("--ring", "262 83% 66%");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
