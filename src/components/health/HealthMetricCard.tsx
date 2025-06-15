
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { EditMetricDialog } from "./EditMetricDialog";

interface HealthMetricCardProps {
  title: string;
  value: number;
  unit: string;
  goal: number;
  icon: React.ReactNode;
  onEdit: (value: number, goal: number) => void;
}

export const HealthMetricCard = ({ title, value, unit, goal, icon, onEdit }: HealthMetricCardProps) => {
  const progressValue = Math.min((value / goal) * 100, 100);
  
  return (
    <Card className="relative group">
      <EditMetricDialog
        title={title}
        value={value}
        unit={unit}
        goal={goal}
        onSave={onEdit}
        icon={icon}
      />
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="text-3xl font-bold mb-2">
          {value} {unit}
        </div>
        <Progress value={progressValue} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          Meta: {goal} {unit}
        </p>
      </CardContent>
    </Card>
  );
};
