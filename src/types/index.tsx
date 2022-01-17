export interface Match {
  key: string;
  exists: boolean;
  match: boolean;
}

export interface Guess {
  wordGuessed: string;
  matches: Match[];
}

export interface KeyboardRow {
  keys: string[];
}
