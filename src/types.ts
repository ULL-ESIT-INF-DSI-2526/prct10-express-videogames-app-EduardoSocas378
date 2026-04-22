export type Platform = "PC" | "PlayStation 5" | "Xbox Series X/S" | "Nintendo Switch" | "Steam Deck";
export type Genre = "Acción" | "Aventura" | "Rol" | "Estrategia" | "Deportes" | "Simulación";

export type Videogame = {
  id: number;
  name: string;
  description: string;
  platform: Platform;
  genre: Genre;
  developer: string;
  releaseYear: number;
  multiplayer: boolean;
  estimatedHours: number;
  marketValue: number;
};

export type ResponseType = {
  success: boolean;
  videogames?: Videogame[];
  error?: string; 
};