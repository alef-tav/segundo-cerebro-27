
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Target,
  Brain,
  BookOpen,
  Heart,
  Pencil,
  DollarSign,
  Dumbbell,
  Timer,
  SunMedium,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resumo do Dia", href: "/resumo", icon: SunMedium },
  { name: "Flow Caverna", href: "/flow", icon: Timer },
  { name: "Meta", href: "/meta", icon: Target },
  { name: "Financeiro", href: "/financeiro", icon: DollarSign },
  { name: "Anotações", href: "/anotacoes", icon: Pencil },
  { name: "Compromissos", href: "/compromissos", icon: Calendar },
  { name: "Conhecimento", href: "/conhecimento", icon: BookOpen },
  { name: "Hábitos", href: "/habitos", icon: Brain },
  { name: "Mindfulness", href: "/mindfulness", icon: Heart },
  { name: "Treino", href: "/treino", icon: Dumbbell },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <h1 className="font-display text-xl font-bold">Segundo Cérebro</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-primary"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
