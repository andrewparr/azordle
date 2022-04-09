export interface IGameState {
  boardState: Array<string>;
  evaluations: Array<Array<string> | null>;
  rowIdx: number;
  solution: string;
  gameStatus: string;
  lastPlayedTs: number | null;
  lastCompletedTs: number | null;
  hardMode: boolean;
}

const defaultState: IGameState = {
  boardState: ["", "", "", "", "", ""],
  evaluations: [null, null, null, null, null, null],
  rowIdx: 0,
  solution: "",
  gameStatus: "IN_PROGRESS",
  lastPlayedTs: null,
  lastCompletedTs: null,
  hardMode: false,
};

export default defaultState;
