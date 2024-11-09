import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Resumo from "./pages/Resumo";
import Flow from "./pages/Flow";
import Meta from "./pages/Meta";
import Compromissos from "./pages/Compromissos";
import Habitos from "./pages/Habitos";
import Conhecimento from "./pages/Conhecimento";
import Mindfulness from "./pages/Mindfulness";
import Anotacoes from "./pages/Anotacoes";
import Financeiro from "./pages/Financeiro";
import Treino from "./pages/Treino";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resumo" element={<Resumo />} />
            <Route path="/flow" element={<Flow />} />
            <Route path="/meta" element={<Meta />} />
            <Route path="/compromissos" element={<Compromissos />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/conhecimento" element={<Conhecimento />} />
            <Route path="/mindfulness" element={<Mindfulness />} />
            <Route path="/anotacoes" element={<Anotacoes />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/treino" element={<Treino />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;