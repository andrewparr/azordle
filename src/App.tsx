import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Overlay from "./Overlay";
import styles from "./App.module.css";
import defaultState, { IGameState } from "./State";
import game from "./gameLogic";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Awards = [
  "Genius",
  "Magnificent",
  "Impressive",
  "Splendid",
  "Great",
  "Phew",
];

export const GameState = React.createContext<IGameState>(defaultState);

function App() {
  const [gameState, setGameState] = useState(defaultState);

  const [, setDark] = useState(false);

  const [shake, setShake] = useState(false);

  const [overlayState, setOverlayState] = useState({
    show: false,
    type: "instructions",
  });

  function animationStopped() {
    setShake(false);
  }

  function showOverlay(s: string) {
    setOverlayState({ show: true, type: s });
  }

  function hideOverlay() {
    setOverlayState({ ...overlayState, show: false });
  }

  function setHardMode(value: boolean) {
    gameState.hardMode = value;
    game.saveState(gameState);
  }

  function setDarkMode(value: boolean) {
    // This is only needed to force a re-render so that the included svg icons
    // are inverted when the darkMode is enabled. Otherwise they don't update
    // until you close the Overlay.
    setDark(value);
  }

  function addToast(msg: string, duration: number) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: duration,
      hideProgressBar: true,
      pauseOnHover: false,
      transition: Slide,
    });
  }

  useEffect(() => {
    // Runs once when component first mounts
    setGameState(game.loadState());
    if (game.getDarkMode()) {
      var a = document.querySelector("body");
      if (a !== null) a.classList.add("nightmode");
    }
    if (game.getHCMode()) {
      var a2 = document.querySelector("body");
      if (a2 !== null) a2.classList.add("colorblind");
    }
  }, []);

  useEffect(() => {
    game.saveState(gameState);
  }, [gameState]);

  const processKey = useCallback(
    (e: string) => {
      if (gameState.gameStatus !== "IN_PROGRESS") return;
      e = e.toUpperCase();
      var board = gameState.boardState;
      var guess = gameState.boardState[gameState.rowIdx];
      if (e === "DEL" || e === "DELETE" || e === "BACKSPACE") {
        if (gameState.boardState[gameState.rowIdx].length > 0) {
          board[gameState.rowIdx] = board[gameState.rowIdx].slice(0, -1);
          setGameState({ ...gameState, boardState: board });
        }
      } else if (e === "ENTER" && guess.length === 5) {
        if (!game.isValid(guess)) {
          addToast("Not in word list", 1000);
          setShake(true);
        } else {
          var evaluations = gameState.evaluations;
          evaluations[gameState.rowIdx] = game.evaluate(guess);
          if (guess === game.todaysWord().toUpperCase()) {
            setGameState({ ...gameState, gameStatus: "WIN" });
            var prev =
              gameState.lastCompletedTs === null
                ? 0
                : game.tsToDayNum(gameState.lastCompletedTs);
            var isStreak = game.dayNum() === prev + 1;
            game.saveStats(true, isStreak, gameState.rowIdx + 1);
            addToast(Awards[gameState.rowIdx], 1000);
            setTimeout(function () {
              showOverlay("statistics");
            }, 1000);
          } else {
            if (gameState.rowIdx < gameState.boardState.length - 1) {
              setGameState({ ...gameState, rowIdx: gameState.rowIdx + 1 });
            } else {
              setGameState({ ...gameState, gameStatus: "FAIL" });
              game.saveStats(false, false, 7);
              addToast(game.todaysWord().toUpperCase(), 1000);
              setTimeout(function () {
                showOverlay("statistics");
              }, 1000);
            }
          }
        }
      } else if (e >= "A" && e <= "Z" && e.length === 1 && guess.length < 5) {
        if (gameState.hardMode) {
          var min = "A".charCodeAt(0) - 1;
          var max = "Z".charCodeAt(0) + 1;
          var exact = undefined;
          for (var r = 0; r < gameState.rowIdx; ++r) {
            var evaluation = gameState.evaluations[r];
            var board_row = gameState.boardState[r];
            var col = gameState.boardState[gameState.rowIdx].length;
            if (evaluation !== null && evaluation[col] !== null) {
              if (evaluation[col] === "correct") exact = board_row[col];
              else if (evaluation[col] === "before")
                min = Math.max(min, board_row[col].charCodeAt(0));
              else if (evaluation[col] === "after")
                max = Math.min(max, board_row[col].charCodeAt(0));
            }
          }
          if (exact !== undefined && e !== exact) {
            addToast("Not in hard mode", 1000);
            return;
          }
          if (e.charCodeAt(0) <= min || e.charCodeAt(0) >= max) {
            addToast("Not in hard mode", 1000);
            return;
          }
        }
        board[gameState.rowIdx] = board[gameState.rowIdx].concat(e);
        setGameState({ ...gameState, boardState: board });
      }
    },
    [gameState]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      processKey(e.key);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [processKey]);

  return (
    <GameState.Provider value={gameState}>
      <div className={styles.root}>
        <Header callback={showOverlay} />
        <div className={styles.game}>
          <Board shake={shake} animationStopped={animationStopped} />
          <Keyboard processKey={processKey} />
        </div>
      </div>
      <Overlay
        show={overlayState.show}
        type={overlayState.type}
        callback={hideOverlay}
        setHardMode={setHardMode}
        setDarkMode={setDarkMode}
      />
    </GameState.Provider>
  );
}

export default App;
