import React, { useRef } from "react";
import style from "./Settings.module.css";
import game from "./gameLogic";

interface Props {
  setHardMode: any;
  setDarkMode: any;
}

function Settings(props: Props) {
  const darkModeRef = useRef<HTMLDivElement>(null);
  const hcModeRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (game.getDarkMode() && darkModeRef.current !== null) {
      darkModeRef.current.setAttribute("checked", "");
      darkModeRef.current.children[0].setAttribute("checked", "");
    }
    if (game.getHCMode() && hcModeRef.current !== null) {
      hcModeRef.current.setAttribute("checked", "");
      hcModeRef.current.children[0].setAttribute("checked", "");
    }
  });

  function doSwitch(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.hasAttribute("checked")
      ? e.currentTarget.removeAttribute("checked")
      : e.currentTarget.setAttribute("checked", "");
    e.currentTarget.children[0].hasAttribute("checked")
      ? e.currentTarget.children[0].removeAttribute("checked")
      : e.currentTarget.children[0].setAttribute("checked", "");
  }

  function hardMode(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    doSwitch(e);
    props.setHardMode(e.currentTarget.hasAttribute("checked"));
  }

  function darkMode(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    doSwitch(e);
    props.setDarkMode(e.currentTarget.hasAttribute("checked"));

    var a = document.querySelector("body");
    if (a !== null) {
      a.classList.contains("nightmode")
        ? a.classList.remove("nightmode")
        : a.classList.add("nightmode");
      game.setDarkMode(a.classList.contains("nightmode"));
    }
  }

  function highContrastMode(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    doSwitch(e);

    var a = document.querySelector("body");
    if (a !== null) {
      a.classList.contains("colorblind")
        ? a.classList.remove("colorblind")
        : a.classList.add("colorblind");
      game.setHCMode(a.classList.contains("colorblind"));
    }
  }

  return (
    <div className={style.settings}>
      <h1>SETTINGS</h1>
      <div className={style.sections}>
        <section>
          <div className={style.setting}>
            <div className={style.text}>
              <div className={style.title}>Hard Mode</div>
              <div className={style.description}>
                Any revealed hints must be used in subsequent guesses
              </div>
            </div>
            <div className={style.control}>
              <div
                className={style.switch}
                onClick={(e) => {
                  hardMode(e);
                }}
              >
                <span className={style.knob}></span>
              </div>
            </div>
          </div>
          <div className={style.setting}>
            <div className={style.text}>
              <div className={style.title}>Dark Theme</div>
            </div>
            <div className={style.control}>
              <div
                ref={darkModeRef}
                custom-attribute="checked"
                className={style.switch}
                onClick={(e) => {
                  darkMode(e);
                }}
              >
                <span custom-attribute="checked" className={style.knob}></span>
              </div>
            </div>
          </div>
          <div className={style.setting}>
            <div className={style.text}>
              <div className={style.title}>High Contrast Mode</div>
              <div className={style.description}>For improved color vision</div>
            </div>
            <div className={style.control}>
              <div
                ref={hcModeRef}
                className={style.switch}
                onClick={(e) => {
                  highContrastMode(e);
                }}
              >
                <span className={style.knob}></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
