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
        After each guess, the color of the tiles will change to show how close
        your guess was to the word.
      </p>
      <div className={styles.examples}>
        <p>
          <strong>Example</strong>
        </p>
        <div className={styles.example}>
          <div className={styles.row}>
            <div className={styles.tile} data-state="correct">
              H
            </div>
            &nbsp;
            <div className={styles.tile} data-state="before">
              E
            </div>
            &nbsp;
            <div className={styles.tile} data-state="after">
              L
            </div>
            &nbsp;
            <div className={styles.tile} data-state="before">
              L
            </div>
            &nbsp;
            <div className={styles.tile} data-state="after">
              O
            </div>
          </div>
          <p>
            The first letter <strong>H</strong> is correct. <br />
            The second letter <strong>E</strong> is before the actual letter in
            the alphabet. Thus the second letter in the word comes after{" "}
            <strong>E</strong> in the alphabet. <br />
            The third letter <strong>L</strong> is after the actual letter in
            the alphabet. Thus the third letter in the word comes before{" "}
            <strong>L</strong> in the alphabet.
          </p>
        </div>
      </div>
      <p>
        <strong>A new AZORDLE will be available each day!</strong>
      </p>
    </div>
  );
}

export default Instructions;
