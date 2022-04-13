import styles from "./Menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.menuList}>
        <a href="https://github.com/andrewparr/azordle" id="src">
          <div className={styles.navItem}>
            <img
              className={styles.navIcon}
              src="./GitHub-Mark-32px.png"
              alt="github"
            />
            Go to source code.
          </div>
        </a>
      </div>
    </div>
  );
}

export default Menu;
