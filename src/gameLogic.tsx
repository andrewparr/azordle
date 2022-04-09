import allowedWords from "./allowedWords";
import candidateWords from "./candidateWords";
import defaultState, { IGameState } from "./State";
import defaultStats from "./GameStats";

const LOCAL_STORAGE_STATE_NAME = "azordle-state";
const LOCAL_STORAGE_STATS_NAME = "azordle-statistics";
const LOCAL_STORAGE_DARK_MODE_NAME = "azordle-darkmode";
const LOCAL_STORAGE_HC_MODE_NAME = "azordle-hcmode";

const gameLogic = {
  todaysWord: () => {
    var now = new Date();
    var today = now.setHours(0, 0, 0, 0);
    var idx = Math.round(today / 864e5); // 864e5 = number of miliseconds in a day
    return candidateWords[idx % candidateWords.length];
  },

  dayNum: () => {
    var now = new Date().setHours(0, 0, 0, 0).valueOf();
    return gameLogic.tsToDayNum(now);
  },

  tsToDayNum: (ts: number) => {
    const day_one = 19087;
    var epoch = Math.floor(ts / 8.64e7);
    var num = epoch - day_one;
    return num;
  },

  isValid: (word: string) => {
    word = word.toLowerCase();
    return candidateWords.includes(word) || allowedWords.includes(word);
  },

  evaluate: (word: string) => {
    word = word.toLowerCase();
    var ret = Array<string>();
    var solution = gameLogic.todaysWord();
    if (word.length !== solution.length) return ret;
    for (var i = 0; i < word.length; ++i)
      if (word[i] === solution[i]) ret.push("correct");
      else if (word[i] < solution[i]) ret.push("before");
      else ret.push("after");
    return ret;
  },

  loadState: () => {
    var str = localStorage.getItem(LOCAL_STORAGE_STATE_NAME);
    var state = str === null ? defaultState : JSON.parse(str);
    var now = new Date();
    var today = now.setHours(0, 0, 0, 0);
    if (state.lastPlayedTs !== today) {
      state = { ...defaultState, lastCompletedTs: state.lastCompletedTs };
    }
    return state;
  },

  saveState: (state: IGameState) => {
    var now = new Date();
    var today = now.setHours(0, 0, 0, 0);
    state.lastPlayedTs = today;
    if (state.gameStatus === "WIN") {
      state.lastCompletedTs = today;
    }
    localStorage.setItem(LOCAL_STORAGE_STATE_NAME, JSON.stringify(state));
  },

  loadStats: () => {
    var str = localStorage.getItem(LOCAL_STORAGE_STATS_NAME);
    return str === null ? defaultStats : JSON.parse(str);
  },

  saveStats: (isWin: boolean, isStreak: boolean, numGuesses: number) => {
    var stats = gameLogic.loadStats();
    if (isWin) {
      stats.guesses[numGuesses] += 1;
      stats.gamesWon += 1;
      if (isStreak) stats.currentStreak += 1;
      else stats.currentStreak = 1;
    } else {
      stats.currentStreak = 0;
      stats.guesses.fail += 1;
    }
    stats.maxStreak = Math.max(stats.currentStreak, stats.maxStreak);
    stats.gamesPlayed += 1;
    stats.winPercentage = Math.round(
      (stats.gamesWon / stats.gamesPlayed) * 100
    );
    if (isWin) {
      var sum =
        stats.guesses[1] +
        2 * stats.guesses[2] +
        3 * stats.guesses[3] +
        4 * stats.guesses[4] +
        5 * stats.guesses[5] +
        6 * stats.guesses[6];
      stats.averageGuesses = Math.round(sum / stats.gamesWon);
    }
    stats.last_guess = numGuesses;
    localStorage.setItem(LOCAL_STORAGE_STATS_NAME, JSON.stringify(stats));
  },

  setDarkMode(value: boolean) {
    localStorage.setItem(LOCAL_STORAGE_DARK_MODE_NAME, JSON.stringify(value));
  },

  getDarkMode() {
    var str = localStorage.getItem(LOCAL_STORAGE_DARK_MODE_NAME);
    return str === null ? false : JSON.parse(str);
  },

  setHCMode(value: boolean) {
    localStorage.setItem(LOCAL_STORAGE_HC_MODE_NAME, JSON.stringify(value));
  },

  getHCMode() {
    var str = localStorage.getItem(LOCAL_STORAGE_HC_MODE_NAME);
    return str === null ? false : JSON.parse(str);
  },
};

export default gameLogic;
