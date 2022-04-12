import React from "react";
import close from "../svg/close.svg";
import styles from "./Overlay.module.css";
import Instructions from "./Instructions";
import Statistics from "./Statistics";
import Settings from "./Settings";
import game from "../library/gameLogic";

interface Props {
  show: boolean;
  type: string;
  callback: any;
  setHardMode: any;
  setDarkMode: any;
}

function Overlay(props: Props) {
  return (
    <div
      className={styles.overlay}
      style={props.show ? { display: "flex" } : undefined}
    >
      <div className={styles.content}>
        <slot>
          {props.type === "instructions" ? <Instructions /> : undefined}
          {props.type === "statistics" ? <Statistics /> : undefined}
          {props.type === "settings" ? (
            <Settings
              setHardMode={props.setHardMode}
              setDarkMode={props.setDarkMode}
            />
          ) : undefined}
        </slot>
        <div
          className={styles.closeIcon}
          onClick={(e) => {
            props.callback();
          }}
        >
          <img
            style={game.getDarkMode() ? { filter: "invert(100%)" } : undefined}
            src={close}
            alt="close"
          />
        </div>
      </div>
    </div>
  );
}

export default Overlay;
