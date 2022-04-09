export interface IGameStatistics {
  currentStreak: number;
  maxStreak: number;
  guesses: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    fail: number;
  };
  last_guess: number;
  winPercentage: number;
  gamesPlayed: number;
  gamesWon: number;
  averageGuesses: number;
}

const defaultStatistics: IGameStatistics = {
  currentStreak: 0,
  maxStreak: 0,
  guesses: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    fail: 0,
  },
  last_guess: 0,
  winPercentage: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  averageGuesses: 0,
};

export default defaultStatistics;
