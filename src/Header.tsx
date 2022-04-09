import nav from "./nav.svg";
import help from "./help.svg";
import statistics from "./statistics.svg";
import settings from "./settings.svg";
import styles from "./Header.module.css";
import gameLogic from "./gameLogic";

interface Props {
  callback: any;
}

function Header(props: Props) {
  return (
    <header className={[styles.header, styles.headerTitle].join(" ")}>
      <div className={styles.menuLeft}>
        <button
          className={[styles.buttonIcon, styles.navButton].join(" ")}
          id="nav-button"
          aria-label="Navigation menu."
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            // props.callback("nav");
          }}
        >
          <img
            style={
              gameLogic.getDarkMode() ? { filter: "invert(100%)" } : undefined
            }
            src={nav}
            className={styles.icon}
            alt="nav"
          />
        </button>
        <button
          id="help-button"
          className={[styles.buttonIcon, styles.helpButton].join(" ")}
          aria-label="Help"
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            props.callback("intructions");
          }}
        >
          <img
            style={
              gameLogic.getDarkMode() ? { filter: "invert(100%)" } : undefined
            }
            src={help}
            className={styles.icon}
            alt="help"
          />
        </button>
      </div>
      <div className={styles.title}>Azordle</div>
      <div className={styles.menuRight}>
        <button
          id="statistics-butt on"
          className={[styles.buttonIcon, styles.statisticsButton].join(" ")}
          aria-label="Statistics"
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            props.callback("statistics");
          }}
        >
          <img
            style={
              gameLogic.getDarkMode() ? { filter: "invert(100%)" } : undefined
            }
            src={statistics}
            className="statistics-icon"
            alt="statistics"
          />
        </button>
        <button
          id="settings-button"
          className={[styles.buttonIcon, styles.settingsButton].join(" ")}
          aria-label="Settings"
          tabIndex={-1}
          onClick={(e) => {
            e.preventDefault();
            props.callback("settings");
          }}
        >
          <img
            style={
              gameLogic.getDarkMode() ? { filter: "invert(100%)" } : undefined
            }
            src={settings}
            className="settings-icon"
            alt="settings"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
