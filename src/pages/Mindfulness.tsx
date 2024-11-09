import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

const Mindfulness = () => {
  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Mindfulness</h1>
        <p className="text-muted-foreground">
          Pratique meditação e cultive o bem-estar mental.
        </p>
      </div>
      <Card className="p-6 bg-secondary">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-xl font-semibold">Meditação</h2>
        </div>
        <p className="text-muted-foreground">
          Acesse práticas guiadas de meditação e relaxamento.
        </p>
      </Card>
    </div>
  );
};

export default Mindfulness;