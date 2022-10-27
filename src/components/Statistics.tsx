import React, { useRef, useEffect } from "react";
import styles from "./Statistics.module.css";
import game from "../library/gameLogic";
import share from "../svg/share.svg";
import CountdownTimer from "./CountdownTimer";
import { toast, Zoom } from "react-toastify";

function Statistics() {
  var stats = game.loadStats();

  const clipboard = useRef<HTMLTextAreaElement>(null);

  function onClick() {
    var stats = game.loadStats();
    var state = game.loadState();
    if (clipboard.current !== null) {
      var num = game.dayNum();
      var str =
        "#Azordle " +
        num +
        " " +
        (stats.last_guess === 7 ? "X" : stats.last_guess) +
        "/6\n\n";
      for (var r = 0; r < Math.min(stats.last_guess, 6); ++r) {
        for (var c = 0; c < 5; ++c) {
          switch (state.evaluations[r][c]) {
            case "correct":
              str = str.concat("🟩");
              break;
            case "before":
              str = str.concat("🟥");
              break;
            case "after":
              str = str.concat("🟦");
              break;
          }
        }
        str = str.concat("\n");
      }
      clipboard.current.value = str;
      clipboard.current.select();
      const onCopy = (e: ClipboardEvent) => {
        var state = game.loadState();
        var t = state.hardMode ? toast : toast.dark;
        t("Copied results to clipboard", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          transition: Zoom,
        });
      };
      document.addEventListener("copy", onCopy);
      try {
        document.execCommand("copy");
      } finally {
        document.removeEventListener("copy", onCopy);
      }
    }
  }

  const [style1, setStyle1] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });
  const [style2, setStyle2] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });
  const [style3, setStyle3] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });
  const [style4, setStyle4] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });
  const [style5, setStyle5] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });
  const [style6, setStyle6] = React.useState({
    width: "7%",
    backgroundColor: "var(--color-absent)",
  });

  useEffect(() => {
    var max = stats.guesses[1];
    for (let i = 2; i < 7; i++) max = Math.max(max, stats.guesses[i]);
    setStyle1({
      width: 7 + (100 * stats.guesses[1]) / max + "%",
      backgroundColor:
        stats.last_guess === 1 ? "var(--color-correct)" : "var(--color-absent)",
    });
    setStyle2({
      width: 7 + (100 * stats.guesses[2]) / max + "%",
      backgroundColor:
        stats.last_guess === 2 ? "var(--color-correct)" : "var(--color-absent)",
    });
    setStyle3({
      width: 7 + (100 * stats.guesses[3]) / max + "%",
      backgroundColor:
        stats.last_guess === 3 ? "var(--color-correct)" : "var(--color-absent)",
    });
    setStyle4({
      width: 7 + (100 * stats.guesses[4]) / max + "%",
      backgroundColor:
        stats.last_guess === 4 ? "var(--color-correct)" : "var(--color-absent)",
    });
    setStyle5({
      width: 7 + (100 * stats.guesses[5]) / max + "%",
      backgroundColor:
        stats.last_guess === 5 ? "var(--color-correct)" : "var(--color-absent)",
    });
    setStyle6({
      width: 7 + (100 * stats.guesses[6]) / max + "%",
      backgroundColor:
        stats.last_guess === 6 ? "var(--color-correct)" : "var(--color-absent)",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <h1>Statistics</h1>
      <div className={styles.statistics}>
        <div className={styles.statisticContainer}>
          <div className={styles.statistic}>{stats.gamesPlayed}</div>
          <div className={styles.label}>Played</div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className={styles.statisticContainer}>
          <div className={styles.statistic}>{stats.winPercentage}</div>
          <div className={styles.label}>Win %</div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className={styles.statisticContainer}>
          <div className={styles.statistic}>{stats.currentStreak}</div>
          <div className={styles.label}>
            Current <br /> Streak
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div className={styles.statisticContainer}>
          <div className={styles.statistic}>{stats.maxStreak}</div>
          <div className={styles.label}>
            Max <br />
            Streak
          </div>
        </div>
      </div>
      <h1>Guess Distribution</h1>
      {stats.gamesPlayed === 0 ? (
        <p>No Data</p>
      ) : (
        <React.Fragment>
          <div id={styles.guessDistribution}>
            <div className={styles.graphContainer}>
              <div className={styles.guess}>1</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style1}>
                  <div className={styles.numGuesses}>{stats.guesses[1]}</div>
                </div>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.guess}>2</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style2}>
                  <div className={styles.numGuesses}>{stats.guesses[2]}</div>
                </div>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.guess}>3</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style3}>
                  <div className={styles.numGuesses}>{stats.guesses[3]}</div>
                </div>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.guess}>4</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style4}>
                  <div className={styles.numGuesses}>{stats.guesses[4]}</div>
                </div>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.guess}>5</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style5}>
                  <div className={styles.numGuesses}>{stats.guesses[5]}</div>
                </div>
              </div>
            </div>

            <div className={styles.graphContainer}>
              <div className={styles.guess}>6</div>
              <div className={styles.graph}>
                <div className={styles.graphBar} style={style6}>
                  <div className={styles.numGuesses}>{stats.guesses[6]}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.countdown}>
              <h1>Next AZORDLE</h1>
              <div id="timer">
                <div className={styles.statisticContainer}>
                  <div className={styles.statisticTimer}>
                    <CountdownTimer />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.share}>
              <button
                className={styles.shareButton}
                onClick={(e) => {
                  e.preventDefault();
                  onClick();
                }}
              >
                Share
                <img src={share} className={styles.gameIcon} alt="share" />
              </button>
            </div>
          </div>
          <textarea ref={clipboard} inputMode="none" className={styles.hide} />
        </React.Fragment>
      )}
    </div>
  );
}

export default Statistics;
