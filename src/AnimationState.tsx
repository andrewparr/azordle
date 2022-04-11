export interface IAnimationState {
  type: string;
  row: number;
  col: number;
}

export const defaultAnimState: IAnimationState = {
  type: "",
  row: 0,
  col: 0,
};

export default defaultAnimState;
