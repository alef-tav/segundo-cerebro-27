import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Olá! Eu sou seu assistente pessoal. Como posso ajudar você hoje?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Simula resposta do bot (em um cenário real, isso seria uma chamada à API)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "Estou aqui para ajudar você a organizar melhor seu dia e alcançar seus objetivos!" 
      }]);
    }, 1000);
    
    setInput("");
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">Assistente IA</h2>
      </div>
      
      <ScrollArea className="h-[300px] mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <Bot className="h-6 w-6 text-primary" />
              )}
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-accent'
                }`}
              >
                {message.content}
              </div>
              {message.type === 'user' && (
                <User className="h-6 w-6 text-primary" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}