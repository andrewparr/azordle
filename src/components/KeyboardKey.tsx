import React, { useContext } from "react";
import styles from "./App.module.css";
import del from "../svg/del.svg";
import gameLogic from "../library/gameLogic";

import { GameState } from "./App";

interface Props {
  letter: string;
  onClick: any;
}

function KeyboardKey(props: Props) {
  const context = useContext(GameState);

  const getkeyState = (letter: string) => {
    if (context.gameStatus !== "IN_PROGRESS") return "absent";
    var col = context.boardState[context.rowIdx].length;
    if (letter === "ENTER") return col === 5 ? undefined : "absent";
    if (letter === "DEL") return col === 0 ? "absent" : undefined;
    if (col === 5) return "absent";
    var min = "A".charCodeAt(0) - 1;
    var max = "Z".charCodeAt(0) + 1;
    var exact = undefined;
    for (var r = 0; r < context.rowIdx; ++r) {
      var evaluation = context.evaluations[r];
      var board_row = context.boardState[r];
      if (evaluation !== null && evaluation[col] !== null) {
        if (evaluation[col] === "correct") exact = board_row[col];
        else if (evaluation[col] === "before")
          min = Math.max(min, board_row[col].charCodeAt(0));
        else if (evaluation[col] === "after")
          max = Math.min(max, board_row[col].charCodeAt(0));
      }
    }
    if (exact !== undefined) return letter === exact ? "correct" : "absent";
    return letter.charCodeAt(0) > min && letter.charCodeAt(0) < max
      ? undefined
      : "absent";
  };

  return (
    <button
      key={props.letter}
      data-key={props.letter}
      className={
        props.letter === "ENTER" || props.letter === "DEL"
          ? [styles.buttonKey, styles.oneAndAHalf].join(" ")
          : styles.buttonKey
      }
      data-state={getkeyState(props.letter)}
      onClick={() => {
        props.onClick(props.letter);
      }}
    >
      {props.letter === "DEL" ? (
        <img
          style={
            gameLogic.getDarkMode() ||
            context.boardState[context.rowIdx].length === 0 ||
            context.gameStatus !== "IN_PROGRESS"
              ? { filter: "invert(100%)" }
              : undefined
          }
          src={del}
          alt="del"
        />
      ) : (
        props.letter
      )}
    </button>
  );
}

export default KeyboardKey;
