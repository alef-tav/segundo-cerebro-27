
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Activity, Droplets, Clock, Plus, Utensils, X } from "lucide-react";
import { HealthMetricCard } from "@/components/health/HealthMetricCard";
import { useToast } from "@/hooks/use-toast";

const Treino = () => {
  const { toast } = useToast();
  
  // Estados para métricas editáveis
  const [weightData, setWeightData] = useState({ value: 70, goal: 65 });
  const [waterData, setWaterData] = useState({ value: 1.5, goal: 2.5 });
  const [exerciseData, setExerciseData] = useState({ value: 30, goal: 60 });
  
  const [weight, setWeight] = useState(70);
  const [waterIntake, setWaterIntake] = useState(1.5);
  const [exerciseTime, setExerciseTime] = useState(30);
  const [heartRate, setHeartRate] = useState(60);
  const [bloodPressure, setBloodPressure] = useState({ systolic: 120, diastolic: 80 });
  const [sleepHours, setSleepHours] = useState(8);

  const [exercises, setExercises] = useState([
    { name: "Corrida", duration: 30 },
    { name: "Yoga", duration: 45 },
  ]);

  const [meals, setMeals] = useState([
    { name: "Café da manhã", calories: 350, protein: 20, carbs: 40, fat: 15 },
    { name: "Almoço", calories: 600, protein: 35, carbs: 70, fat: 20 },
    { name: "Jantar", calories: 500, protein: 30, carbs: 60, fat: 18 },
  ]);

  const [newExercise, setNewExercise] = useState({ name: "", duration: "" });
  const [newMeal, setNewMeal] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "" });

  // Funções para editar métricas
  const updateWeightData = (value: number, goal: number) => {
    setWeightData({ value, goal });
    toast({
      title: "Peso atualizado!",
      description: `Valor atual: ${value}kg, Meta: ${goal}kg`,
    });
  };

  const updateWaterData = (value: number, goal: number) => {
    setWaterData({ value, goal });
    toast({
      title: "Ingestão de água atualizada!",
      description: `Valor atual: ${value}L, Meta: ${goal}L`,
    });
  };

  const updateExerciseData = (value: number, goal: number) => {
    setExerciseData({ value, goal });
    toast({
      title: "Tempo de exercício atualizado!",
      description: `Valor atual: ${value}min, Meta: ${goal}min`,
    });
  };

  const addExercise = () => {
    if (newExercise.name && newExercise.duration) {
      setExercises([...exercises, { name: newExercise.name, duration: parseInt(newExercise.duration) }]);
      setNewExercise({ name: "", duration: "" });
    }
  };

  const addMeal = () => {
    if (newMeal.name && newMeal.calories) {
      setMeals([...meals, {
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        protein: parseInt(newMeal.protein) || 0,
        carbs: parseInt(newMeal.carbs) || 0,
        fat: parseInt(newMeal.fat) || 0,
      }]);
      setNewMeal({ name: "", calories: "", protein: "", carbs: "", fat: "" });
    }
  };

  const deleteMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
    toast({
      title: "Refeição removida!",
      description: "A refeição foi excluída com sucesso.",
    });
  };

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Saúde e Bem-estar</h1>
        <p className="text-muted-foreground">
          Acompanhe seus treinos, nutrição e métricas de saúde. Clique no ícone de edição para personalizar suas metas.
        </p>
      </div>

      {/* Métricas de Saúde Editáveis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthMetricCard
          title="Peso"
          value={weightData.value}
          unit="kg"
          goal={weightData.goal}
          icon={<Activity className="h-6 w-6 text-primary" />}
          onEdit={updateWeightData}
        />
        
        <HealthMetricCard
          title="Ingestão de Água"
          value={waterData.value}
          unit="L"
          goal={waterData.goal}
          icon={<Droplets className="h-6 w-6 text-primary" />}
          onEdit={updateWaterData}
        />
        
        <HealthMetricCard
          title="Exercícios"
          value={exerciseData.value}
          unit="min"
          goal={exerciseData.goal}
          icon={<Clock className="h-6 w-6 text-primary" />}
          onEdit={updateExerciseData}
        />
      </div>

      {/* Tabs para Exercícios e Nutrição */}
      <Tabs defaultValue="exercicios" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercicios">Exercícios</TabsTrigger>
          <TabsTrigger value="nutricao">Nutrição</TabsTrigger>
        </TabsList>

        <TabsContent value="exercicios" className="space-y-6">
          {/* Registro de Exercícios */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Exercícios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>{exercise.name}</span>
                  </div>
                  <span className="text-muted-foreground">{exercise.duration} min</span>
                </div>
              ))}
              
              <div className="flex space-x-2 mt-4">
                <Input
                  placeholder="Nome do exercício"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                />
                <Input
                  placeholder="Duração (min)"
                  type="number"
                  value={newExercise.duration}
                  onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                />
                <Button onClick={addExercise}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Saúde */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Saúde</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Frequência Cardíaca em Repouso (bpm)</label>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <Input
                    type="number"
                    value={heartRate}
                    onChange={(e) => setHeartRate(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pressão Arterial (mmHg)</label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={bloodPressure.systolic}
                    onChange={(e) => setBloodPressure({...bloodPressure, systolic: parseInt(e.target.value)})}
                    className="w-20"
                  />
                  <span>/</span>
                  <Input
                    type="number"
                    value={bloodPressure.diastolic}
                    onChange={(e) => setBloodPressure({...bloodPressure, diastolic: parseInt(e.target.value)})}
                    className="w-20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Horas de Sono</label>
                <Input
                  type="number"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(parseInt(e.target.value))}
                  className="w-20"
                />
              </div>

              <Button>Salvar Métricas</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutricao" className="space-y-6">
          {/* Registro de Refeições */}
          <Card>
            <CardHeader>
              <CardTitle>Registro de Refeições</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {meals.map((meal, index) => (
                <div key={index} className="p-4 rounded-lg border relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => deleteMeal(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="flex justify-between items-center mb-2 pr-8">
                    <div className="flex items-center space-x-3">
                      <Utensils className="h-5 w-5 text-primary" />
                      <span className="font-medium">{meal.name}</span>
                    </div>
                    <span className="text-muted-foreground">{meal.calories} kcal</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    P: {meal.protein}g | C: {meal.carbs}g | G: {meal.fat}g
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-5 gap-2 mt-4">
                <Input
                  placeholder="Nome da refeição"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                />
                <Input
                  placeholder="Calorias"
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                />
                <Input
                  placeholder="Proteínas (g)"
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                />
                <Input
                  placeholder="Carboidratos (g)"
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                />
                <Input
                  placeholder="Gorduras (g)"
                  type="number"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                />
              </div>
              <Button onClick={addMeal} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Refeição
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Treino;
