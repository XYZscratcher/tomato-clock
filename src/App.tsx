import { useState } from "react";

import dayjs from "dayjs"
import duration, { Duration } from "dayjs/plugin/duration"
//import localforage from "localforage";

import "./App.css";

dayjs.extend(duration);

const times = 4;
const playbtn = <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" /></svg>
const pausebtn = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;

const work = dayjs.duration({ minutes: 25 }).add({ seconds: 0 });
const rest = dayjs.duration({ seconds: 2 }).add({ seconds: 0 });
let timer = work;

function App() {
  const [time, setTime] = useState(timer.format("mm:ss"));
  const [button, setButton] = useState(true);

  const stateList = ["工作", "休息"/*,"长休息"*/];
  const stateMap = new Map<string, Duration>([
    ["工作", work],
    ["休息", rest]
  ])
  let s = 0;
  const [state, setState] = useState("工作");
  const [id, setId] = useState(0);

  document.addEventListener("end", () => {
    clearInterval(id);
  })

  function start() {
    if (s === times * 2) s = 0;
    console.log(id, button, timer.asSeconds());
    if (button) {
      setId(setInterval(() => {
        //localforage.setItem("timer", timer);
        timer = timer.add({ seconds: -1 });
        setTime(timer.format("mm:ss"));

        if (timer.asSeconds() === 0) {
          //切换下一个状态，如工作换成休息
          setTimeout(() => {
            timer = rest
            setTime(timer.format("mm:ss"));
            setState(stateList[++s % 2]);
          }, 1000)
        }
        if (s === 4 * 2) {
          //传播事件到外层，结束计时
          let e = new CustomEvent("end");
          document.dispatchEvent(e);
        }
      }, 1000))
    }
    else clearInterval(id);
    setButton(!button);
  }


  return (
    <>
      <h1 id="show_time">{time}</h1>
      <p id="state">{state}</p>
      <progress
        max={stateMap.get(stateList[s % 2])!.asSeconds()}
        value={stateMap.get(stateList[s % 2])!.asSeconds() - timer.asSeconds()}
      ></progress>
      <button onClick={start} id="time_btn">{button ? playbtn : pausebtn}</button>
    </>
  );
}

export default App;
