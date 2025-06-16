import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Upload, Trash2, AlertCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Meta {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  progresso: number;
  prazo: string;
}

interface VisionImage {
  id: string;
  titulo: string;
  imagem: string;
  descricao: string;
}

const Meta = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [visionImages, setVisionImages] = useState<VisionImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());

  const [novaMetaOpen, setNovaMetaOpen] = useState(false);
  const [novaImagemOpen, setNovaImagemOpen] = useState(false);
  const [novaMeta, setNovaMeta] = useState({
    titulo: "",
    categoria: "",
    descricao: "",
    prazo: ""
  });
  const [novaImagem, setNovaImagem] = useState({
    titulo: "",
    imagem: "",
    descricao: ""
  });

  const categorias = ["Saúde", "Finanças", "Pessoal", "Profissional", "Educação", "Viagem"];

  const getCategoriaColor = (categoria: string) => {
    const colors: { [key: string]: string } = {
      "Saúde": "text-green-500",
      "Finanças": "text-blue-500",
      "Pessoal": "text-purple-500",
      "Profissional": "text-orange-500",
      "Educação": "text-indigo-500",
      "Viagem": "text-pink-500"
    };
    return colors[categoria] || "text-gray-500";
  };

  // Função para validar se a URL é uma imagem válida
  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url || !url.trim()) {
        resolve(false);
        return;
      }

      // Verificar se é uma URL válida
      try {
        new URL(url);
      } catch {
        resolve(false);
        return;
      }

      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout após 10 segundos
      setTimeout(() => resolve(false), 10000);
    });
  };

  // Função para lidar com erro de carregamento de imagem
  const handleImageError = (imageId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(imageId));
  };

  // Componente para exibir imagem com fallback
  const ImageWithFallback = ({ src, alt, imageId, className }: { src: string; alt: string; imageId: string; className?: string }) => {
    const hasError = imageLoadErrors.has(imageId);

    if (hasError) {
      return (
        <div className={`${className} bg-muted border-2 border-dashed border-border flex items-center justify-center`}>
          <div className="text-center p-4">
            <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Erro ao carregar imagem</p>
            <p className="text-xs text-muted-foreground mt-1">Verifique se a URL está correta</p>
          </div>
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => handleImageError(imageId)}
        loading="lazy"
      />
    );
  };

  // Carregar metas do Supabase
  const carregarMetas = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('metas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar metas:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar as metas."
        });
        return;
      }

      setMetas(data || []);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    }
  };

  // Carregar imagens do quadro de visão
  const carregarImagens = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('vision_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar imagens:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar as imagens do quadro de visão."
        });
        return;
      }

      setVisionImages(data || []);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  };

  useEffect(() => {
    const inicializar = async () => {
      if (user) {
        setLoading(true);
        await Promise.all([carregarMetas(), carregarImagens()]);
        setLoading(false);
      }
    };

    inicializar();
  }, [user]);

  const adicionarMeta = async () => {
    if (!novaMeta.titulo || !novaMeta.categoria || !user) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha pelo menos o título e a categoria."
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('metas')
        .insert([
          {
            user_id: user.id,
            titulo: novaMeta.titulo,
            categoria: novaMeta.categoria,
            descricao: novaMeta.descricao || null,
            prazo: novaMeta.prazo || null,
            progresso: 0
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar meta:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível adicionar a meta."
        });
        return;
      }

      setMetas(prev => [data, ...prev]);
      setNovaMeta({ titulo: "", categoria: "", descricao: "", prazo: "" });
      setNovaMetaOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Meta adicionada com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao adicionar meta:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar a meta."
      });
    }
  };

  const adicionarImagem = async () => {
    if (!novaImagem.titulo || !novaImagem.imagem || !user) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Preencha pelo menos o título e adicione uma imagem."
      });
      return;
    }

    // Validar URL da imagem antes de salvar
    const isValidImage = await validateImageUrl(novaImagem.imagem);
    if (!isValidImage) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "URL da imagem inválida ou inacessível. Verifique se a URL está correta e tente novamente."
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('vision_images')
        .insert([
          {
            user_id: user.id,
            titulo: novaImagem.titulo,
            imagem: novaImagem.imagem,
            descricao: novaImagem.descricao || null
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Erro ao adicionar imagem:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível adicionar a imagem."
        });
        return;
      }

      setVisionImages(prev => [data, ...prev]);
      setNovaImagem({ titulo: "", imagem: "", descricao: "" });
      setNovaImagemOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Imagem adicionada ao quadro de visão!"
      });
    } catch (error) {
      console.error('Erro ao adicionar imagem:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar a imagem."
      });
    }
  };

  const removerImagem = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('vision_images')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao remover imagem:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível remover a imagem."
        });
        return;
      }

      setVisionImages(prev => prev.filter(img => img.id !== id));
      
      toast({
        title: "Sucesso",
        description: "Imagem removida do quadro de visão!"
      });
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível remover a imagem."
      });
    }
  };

  const removerMeta = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('metas')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Erro ao remover meta:', error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível remover a meta."
        });
        return;
      }

      setMetas(prev => prev.filter(meta => meta.id !== id));
      
      toast({
        title: "Sucesso",
        description: "Meta removida com sucesso!"
      });
    } catch (error) {
      console.error('Erro ao remover meta:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível remover a meta."
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNovaImagem(prev => ({
          ...prev,
          imagem: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-in">
        <div className="space-y-2">
          <h1 className="font-display text-4xl font-bold">Metas</h1>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="space-y-2">
        <h1 className="font-display text-4xl font-bold">Metas</h1>
        <p className="text-muted-foreground">
          Defina e acompanhe suas metas pessoais e profissionais. Visualize seus sonhos!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Metas Anuais */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Metas Anuais</CardTitle>
            </div>
            <Dialog open={novaMetaOpen} onOpenChange={setNovaMetaOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Meta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Nova Meta</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select value={novaMeta.categoria} onValueChange={(value) => setNovaMeta(prev => ({...prev, categoria: value}))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="titulo">Título da Meta</Label>
                    <Input
                      id="titulo"
                      value={novaMeta.titulo}
                      onChange={(e) => setNovaMeta(prev => ({...prev, titulo: e.target.value}))}
                      placeholder="Ex: Correr uma maratona"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Input
                      id="descricao"
                      value={novaMeta.descricao}
                      onChange={(e) => setNovaMeta(prev => ({...prev, descricao: e.target.value}))}
                      placeholder="Descreva sua meta..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="prazo">Prazo</Label>
                    <Input
                      id="prazo"
                      value={novaMeta.prazo}
                      onChange={(e) => setNovaMeta(prev => ({...prev, prazo: e.target.value}))}
                      placeholder="Ex: Dezembro 2024"
                    />
                  </div>
                  <Button onClick={adicionarMeta} className="w-full">
                    Adicionar Meta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {metas.length === 0 ? (
              <div className="text-center py-8">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma meta definida ainda</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Clique em "Nova Meta" para começar
                </p>
              </div>
            ) : (
              metas.map((meta) => (
                <div key={meta.id} className="space-y-3 p-4 rounded-lg border bg-card">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{meta.titulo}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getCategoriaColor(meta.categoria)}`}>
                        {meta.categoria}
                      </span>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Excluir Meta</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a meta "{meta.titulo}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => removerMeta(meta.id)} 
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{meta.descricao}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span className="font-medium">{meta.progresso}%</span>
                    </div>
                    <Progress value={meta.progresso} className="h-2" />
                  </div>
                  {meta.prazo && (
                    <p className="text-xs text-muted-foreground">Prazo: {meta.prazo}</p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quadro de Visão */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Quadro de Visão</CardTitle>
            <Dialog open={novaImagemOpen} onOpenChange={setNovaImagemOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Adicionar Imagem
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar ao Quadro de Visão</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo-imagem">Título</Label>
                    <Input
                      id="titulo-imagem"
                      value={novaImagem.titulo}
                      onChange={(e) => setNovaImagem(prev => ({...prev, titulo: e.target.value}))}
                      placeholder="Ex: Casa dos Sonhos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="upload-imagem">Imagem</Label>
                    <Input
                      id="upload-imagem"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    {!novaImagem.imagem && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Ou cole o URL da imagem abaixo:
                      </p>
                    )}
                    <Input
                      value={novaImagem.imagem}
                      onChange={(e) => setNovaImagem(prev => ({...prev, imagem: e.target.value}))}
                      placeholder="https://exemplo.com/imagem.jpg"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricao-imagem">Descrição</Label>
                    <Input
                      id="descricao-imagem"
                      value={novaImagem.descricao}
                      onChange={(e) => setNovaImagem(prev => ({...prev, descricao: e.target.value}))}
                      placeholder="Descreva seu sonho..."
                    />
                  </div>
                  {novaImagem.imagem && (
                    <div>
                      <Label>Preview:</Label>
                      <AspectRatio ratio={4/3} className="bg-muted rounded-md overflow-hidden">
                        <ImageWithFallback
                          src={novaImagem.imagem}
                          alt="Preview"
                          imageId="preview"
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  )}
                  <Button onClick={adicionarImagem} className="w-full">
                    Adicionar ao Quadro
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visionImages.length === 0 ? (
                <div className="col-span-full">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                    <div className="text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Adicione imagens dos seus sonhos ao quadro de visão
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        O que você visualiza, você atrai para sua realidade
                      </p>
                    </div>
                  </AspectRatio>
                </div>
              ) : (
                visionImages.map((img) => (
                  <div key={img.id} className="group relative">
                    <AspectRatio ratio={4/3} className="bg-muted rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={img.imagem}
                        alt={img.titulo}
                        imageId={img.id}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removerImagem(img.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </AspectRatio>
                    <div className="mt-2">
                      <h4 className="font-medium text-sm">{img.titulo}</h4>
                      {img.descricao && (
                        <p className="text-xs text-muted-foreground">{img.descricao}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Motivação */}
      <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-display text-xl font-bold">💫 Lembre-se</h3>
            <p className="text-muted-foreground">
              "O que você visualiza mentalmente e acredita emocionalmente, torna-se sua realidade física."
            </p>
            <p className="text-sm text-muted-foreground">
              Visualize seus objetivos todos os dias. Suas metas são o mapa do seu futuro!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Meta;
