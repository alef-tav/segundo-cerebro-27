
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Music, Volume2, ExternalLink } from "lucide-react";

export function MusicPlayer() {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [volume, setVolume] = useState([70]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSavePlaylist = () => {
    if (spotifyUrl.trim()) {
      // Salvar URL do Spotify no localStorage ou estado global
      localStorage.setItem('spotify-playlist', spotifyUrl);
      console.log('Playlist salva:', spotifyUrl);
    }
  };

  const openSpotify = () => {
    if (spotifyUrl) {
      window.open(spotifyUrl, '_blank');
    }
  };

  return (
    <Card className="p-6 bg-secondary border-0">
      <h2 className="font-display text-xl font-semibold mb-6">Playlist Integrada</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="spotify-url">Link da Playlist do Spotify</Label>
          <div className="flex gap-2">
            <Input
              id="spotify-url"
              placeholder="Cole aqui o link da sua playlist do Spotify"
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
              className="bg-background border-0"
            />
            <Button onClick={handleSavePlaylist} variant="outline">
              Salvar
            </Button>
          </div>
        </div>

        {spotifyUrl && (
          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                <span className="font-medium">Playlist de Foco</span>
              </div>
              <Button onClick={openSpotify} variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir no Spotify
              </Button>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Sugestões de Foco:</div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>1. Foco Profundo</div>
                <div>2. Sons Ambientes</div>
                <div>3. Melodias da Natureza</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Volume2 className="h-4 w-4" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-12">
                {volume[0]}%
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
