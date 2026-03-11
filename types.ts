
export enum Category {
  BIKES = 'Bikes',
  CARS = 'Cars',
  HEAVY = 'Heavy Vehicles',
  ANIMALS = 'Animals',
  EFFECTS = 'Effects',
  CHARACTERS = 'Characters',
  RGS = 'RGS Load Files',
  AIR_WATER = 'Air, Water & Special',
  DANCE = 'Dance'
}

export interface CheatCode {
  id: string;
  name: string;
  code: string;
  category: Category;
  isNew?: boolean;
}

export interface RgsFile {
  id: string;
  name: string;
  url: string;
  category: Category;
  size?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  isLoggedIn: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ThemeMode = 'dark' | 'light';

export interface AppState {
  theme: ThemeMode;
  user: UserProfile | null;
  favorites: string[]; // IDs of cheats/rgs
  chatHistory: ChatMessage[];
}
