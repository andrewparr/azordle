import React, { useEffect, useState } from "react";
import styles from "./App.module.css";

interface Props {
  evaluation?: string;
  letter: string;
}

function GameTile(props: Props) {
  const [animation, setAnimation] = useState("idle");

  useEffect(() => {
    if (props.letter === " ") setAnimation("idle");
    else setAnimation("pop");
  }, [props.letter]);

  return (
    <div
      className={styles.tile}
      data-state={
        props.evaluation === undefined
          ? props.letter === " "
            ? "empty"
            : "tbd"
          : props.evaluation
      }
      data-animation={animation}
    >
      {props.letter}
    </div>
  );
}

export default GameTile;
