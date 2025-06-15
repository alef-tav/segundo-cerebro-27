
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Calendar,
  Settings 
} from "lucide-react";

const financialNavigation = [
  { name: "Dashboard", href: "/financeiro", icon: LayoutDashboard },
  { name: "Contas", href: "/financeiro/contas", icon: Wallet },
  { name: "Relatórios", href: "/financeiro/relatorios", icon: BarChart3 },
  { name: "Calendário", href: "/financeiro/calendario", icon: Calendar },
];

export function FinancialNavigation() {
  const location = useLocation();

  return (
    <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="container px-6">
        <div className="flex items-center justify-between">
          {/* Logo/Brand específico do módulo financeiro */}
          <div className="flex items-center space-x-6">
            <div className="py-4">
              <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                FinTrack
              </h2>
              <p className="text-xs text-muted-foreground">Dashboard Financeiro</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-1">
            {financialNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <Link
              to="/financeiro/configuracoes"
              className="flex items-center px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
            >
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
