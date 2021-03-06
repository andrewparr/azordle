import React, { useContext } from "react";
import GameTile from "./GameTile";
import styles from "./App.module.css";
import { IAnimationState } from "../library/AnimationState";

import { GameState } from "./App";

interface Props {
  row: number;
  animState: IAnimationState;
}

function GameRow(props: Props) {
  const context = useContext(GameState);

  const getLetter = (row: number, col: number) => {
    return context.boardState[row].length > col
      ? context.boardState[row][col]
      : " ";
  };

  const getEvaluation = (row: number, col: number) => {
    if (row > context.rowIdx) {
      return undefined;
    }
    var temp = context.evaluations[row];
    if (temp !== null && temp.length > col) {
      return temp[col];
    }
    return undefined;
  };

  return (
    <div
      key={props.row}
      className={styles.gridRow}
      data-animation={
        props.animState.type === "shake" && props.animState.row === props.row
          ? "shake"
          : null
      }
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <GameTile
          key={props.row * 10 + i}
          letter={getLetter(props.row, i)}
          evaluation={getEvaluation(props.row, i)}
          row={props.row}
          col={i}
          animState={props.animState}
        ></GameTile>
      ))}
    </div>
  );
}

export default GameRow;
