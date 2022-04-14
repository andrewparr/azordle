import styles from "./Instructions.module.css";

function Instructions() {
  return (
    <div className={styles.instructions}>
      <h1>HOW TO PLAY</h1>
      <p>
        Guess the <strong>AZORDLE</strong> in six tries.
      </p>
      <p>
        Each guess must be a valid five-letter word. Hit the enter button to
        submit.
      </p>
      <p>
        After each guess, the colour of the tiles will change to show how close
        your guess was to the word.
      </p>
      <div className={styles.examples}>
        <p>
          <strong>Example</strong>
        </p>
        <div className={styles.example}>
          <div className={styles.row}>
            <div className={styles.tile} data-state="before">
              H
            </div>
            &nbsp;
            <div className={styles.tile} data-state="before">
              E
            </div>
            &nbsp;
            <div className={styles.tile} data-state="before">
              L
            </div>
            &nbsp;
            <div className={styles.tile} data-state="correct">
              L
            </div>
            &nbsp;
            <div className={styles.tile} data-state="after">
              O
            </div>
          </div>
          <p>
            The first letter <strong>H</strong> is before the actual letter in
            the alphabet. Thus the first letter in the word comes after{" "}
            <strong>H</strong> in the alphabet.
          </p>
          <p>
            Likewise the second letter comes after <strong>E</strong> in the
            alphabet and the third letter comes after <strong>L</strong> in the
            alphabet.
          </p>
          <p>
            {" "}
            The forth letter <strong>L</strong> is correct. The fifth letter{" "}
            <strong>O</strong> is after the actual letter. So the fifth letter
            in the word comes before <strong>O</strong> in the alphabet. Based
            on these hints a second guess could be
          </p>
          <div className={styles.row}>
            <div className={styles.tile} data-state="correct">
              W
            </div>
            &nbsp;
            <div className={styles.tile} data-state="correct">
              O
            </div>
            &nbsp;
            <div className={styles.tile} data-state="correct">
              R
            </div>
            &nbsp;
            <div className={styles.tile} data-state="correct">
              L
            </div>
            &nbsp;
            <div className={styles.tile} data-state="correct">
              D
            </div>
          </div>
          <p>Which in this case is the correct word.</p>
        </div>
      </div>
      <p>
        <strong>A new AZORDLE will be available each day!</strong>
      </p>
    </div>
  );
}

export default Instructions;
