import React from "react";
import GameRow from "./GameRow";
import styles from "./App.module.css";
import { IAnimationState } from "../library/AnimationState";

interface Props {
  animState: IAnimationState;
}

function Board(props: Props) {
  let height = window.innerHeight - (190 + 51 + 24);
  var w = Math.min(Math.floor(height * (5 / 6)), 350);
  var h = 6 * Math.floor(w / 5);

  const [boardContainerStyle, setBoardContainerStyle] = React.useState({
    height: h + "px",
  });

  const [boardStyle, setBoardStyle] = React.useState({
    width: w + "px",
    height: h + "px",
  });

  React.useEffect(() => {
    function handleResize() {
      let height2 = window.innerHeight - 260;
      setBoardContainerStyle({
        height: height2 + "px",
      });

      let height = window.innerHeight - 255;
      var w = Math.min(Math.floor(height * (5 / 6)), 350);
      var h = 6 * Math.floor(w / 5);

      setBoardStyle({
        width: w + "px",
        height: h + "px",
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.boardContainer} style={boardContainerStyle}>
      <div className={styles.board} style={boardStyle}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <GameRow row={i} key={i} animState={props.animState}></GameRow>
        ))}
      </div>
    </div>
  );
}

export default Board;
