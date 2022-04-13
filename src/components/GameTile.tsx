import React, { useEffect, useState } from "react";
import styles from "./App.module.css";
import { IAnimationState } from "../library/AnimationState";

interface Props {
  evaluation?: string;
  letter: string;
  row: number;
  col: number;
  animState: IAnimationState;
}

function GameTile(props: Props) {
  const [animation, setAnimation] = useState("idle");

  useEffect(() => {
    if (
      props.animState.row === props.row &&
      (props.animState.col === props.col || props.animState.col === -1)
    ) {
      if (props.animState.type === "pop") {
        setAnimation("pop");
      } else if (props.animState.type === "flip-in") {
        if (animation !== "flip-in") setAnimation("flip-in");
      } else if (props.animState.type === "flip-out") {
        if (animation !== "flip-out") setAnimation("flip-out");
      } else if (props.animState.type === "bounce") {
        if (animation !== "bounce") setAnimation("bounce");
      } else {
        setAnimation("idle");
      }
    } else {
      setAnimation("idle");
    }
  }, [props, animation]);

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
      style={
        animation === "bounce"
          ? { animationDelay: `${props.col * 100}ms` }
          : undefined
      }
    >
      {props.letter}
    </div>
  );
}

export default GameTile;
