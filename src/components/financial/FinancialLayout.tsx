
import { FinancialNavigation } from "./FinancialNavigation";

interface FinancialLayoutProps {
  children: React.ReactNode;
}

export function FinancialLayout({ children }: FinancialLayoutProps) {
  return (
    <div className="space-y-0">
      <FinancialNavigation />
      <div className="container py-6">
        {children}
      </div>
    </div>
  );
}
