export interface Match {
  key: string;
  exists: boolean;
  match: boolean;
}

export interface Guess {
  wordGuessed: string;
  matches: Match[];
}

export interface Matches {
  [key: string]: { match: boolean; index: number | null };
}

export type GuessList = string[];

export interface KeyboardRow {
  keys: string[];
}
