
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFinancialContext } from "@/contexts/FinancialContext";

export function FinancialTypeSelector() {
  const { financialType, setFinancialType } = useFinancialContext();

  return (
    <Tabs value={financialType} onValueChange={(value) => setFinancialType(value as 'pessoal' | 'empresarial')}>
      <TabsList className="grid w-full max-w-sm grid-cols-2">
        <TabsTrigger value="pessoal">Finanças Pessoais</TabsTrigger>
        <TabsTrigger value="empresarial">Finanças Empresariais</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
