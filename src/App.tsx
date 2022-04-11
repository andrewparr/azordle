import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import Board from "./Board";
import Keyboard from "./Keyboard";
import Overlay from "./Overlay";
import styles from "./App.module.css";
import defaultState, { IGameState } from "./State";
import defaultAnimState, { IAnimationState } from "./AnimationState";
import game from "./gameLogic";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IGameStatistics } from "./GameStats";

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
  const [animState, setAnimState] = useState<IAnimationState>(defaultAnimState);

  const [, setDark] = useState(false);

  const [revealing, setRevaling] = useState(false);

  const [overlayState, setOverlayState] = useState({
    show: false,
    type: "instructions",
  });

  const animationStopped = useCallback(
    (e: React.AnimationEvent<HTMLDivElement>) => {
      var guess = gameState.boardState[animState.row];
      if (e.animationName === styles.PopIn) {
        setAnimState({ ...animState, type: "" });
      } else if (e.animationName === styles.Shake) {
        setAnimState({ ...animState, type: "" });
      } else if (e.animationName === styles.FlipIn) {
        var evaluations = gameState.evaluations;
        evaluations[animState.row].push(game.evaluate(guess, animState.col));
        setGameState({ ...gameState, evaluations: evaluations });
        game.saveState(gameState);
        setAnimState({ ...animState, type: "flip-out" });
      } else if (e.animationName === styles.FlipOut) {
        if (animState.col < 4) {
          setAnimState({
            ...animState,
            type: "flip-in",
            col: animState.col + 1,
          });
        } else {
          setRevaling(false);
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
      }
    },
    [gameState, animState]
  );

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
    var stats: IGameStatistics = game.loadStats();
    if (stats.gamesPlayed === 0) showOverlay("instructions");
  }, []);

  useEffect(() => {
    game.saveState(gameState);
  }, [gameState]);

  const processKey = useCallback(
    (e: string) => {
      if (gameState.gameStatus !== "IN_PROGRESS") return;
      if (revealing) return;
      e = e.toUpperCase();
      var board = gameState.boardState;
      var guess = gameState.boardState[gameState.rowIdx];
      if (e === "DEL" || e === "DELETE" || e === "BACKSPACE") {
        if (gameState.boardState[gameState.rowIdx].length > 0) {
          board[gameState.rowIdx] = board[gameState.rowIdx].slice(0, -1);
          setGameState({ ...gameState, boardState: board });
        }
      } else if (e === "ENTER" && guess.length === 5) {
        if (animState.type !== "") return;
        if (!game.isValid(guess)) {
          console.log("setting animState to shake");
          setAnimState({ type: "shake", row: gameState.rowIdx, col: 0 });
          addToast("Not in word list", 1000);
        } else {
          setRevaling(true);
          setAnimState({ type: "flip-in", row: gameState.rowIdx, col: 0 });
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
        var ncol = board[gameState.rowIdx].length - 1;
        setGameState({ ...gameState, boardState: board });
        setAnimState({
          type: "pop",
          row: gameState.rowIdx,
          col: ncol,
        });
      }
    },
    [gameState, animState, revealing]
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
        <div
          className={styles.game}
          onAnimationEnd={(e: React.AnimationEvent<HTMLDivElement>) => {
            animationStopped(e);
          }}
        >
          <Board animState={animState} />
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
