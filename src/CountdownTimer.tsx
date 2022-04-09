import React, { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

function CountdownTimer() {
  const [time, setTime] = useState("00:00:00");

  function updateTime() {
    var d = new Date();
    var h = 24 - d.getHours();
    var m = 60 - d.getMinutes();
    if (m > 0) h--;
    var s = 60 - d.getSeconds();
    if (s > 0) m--;
    const pad = (num: number, places: number) =>
      String(num).padStart(places, "0");
    var str = pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2);

    setTime(str);
  }

  useEffect(() => {
    updateTime();
    const timerId = setTimeout(() => {
      updateTime();
    }, 1000);
    return () => clearTimeout(timerId);
  });

  return <div id={styles.timer}>{time}</div>;
}

export default CountdownTimer;
