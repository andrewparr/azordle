import React from "react";
import KeyboardKey from "./KeyboardKey";
import styles from "./App.module.css";

interface IAppProps {
  processKey: any;
}

interface IAppState {}

class Keyboard extends React.Component<IAppProps, IAppState> {
  private key_rows: Array<Array<string>>;

  constructor(props: IAppProps) {
    super(props);
    this.key_rows = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"],
    ];
  }

  render() {
    return (
      <div className={styles.keyboardGame}>
        <div key="keyboard" className={styles.keyboard}>
          <div className={styles.row} key="keyrow1">
            {this.key_rows[0].map((key: string) => {
              return (
                <KeyboardKey
                  key={key}
                  letter={key}
                  onClick={() => {
                    this.props.processKey(key);
                  }}
                />
              );
            })}
          </div>
          <div className={styles.row} key="keyrow2">
            <div className={styles.half}></div>
            {this.key_rows[1].map((key: string) => {
              return (
                <KeyboardKey
                  letter={key}
                  key={key}
                  onClick={() => {
                    this.props.processKey(key);
                  }}
                />
              );
            })}
            <div className={styles.half}></div>
          </div>
          <div className={styles.row} key="keyrow3">
            {this.key_rows[2].map((key: string) => {
              return (
                <KeyboardKey
                  key={key}
                  letter={key}
                  onClick={() => {
                    this.props.processKey(key);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Keyboard;
