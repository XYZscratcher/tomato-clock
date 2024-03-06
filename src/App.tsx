import { useRef, useState } from "react";

import dayjs from "dayjs"
import duration, { Duration } from "dayjs/plugin/duration"
//import localforage from "localforage";

import "./App.css";


dayjs.extend(duration);

const times = /*localforage*/Number(localStorage.getItem("round"));
const playbtn = <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" /></svg>
const pausebtn = <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>;

// const work = dayjs.duration({ minutes: await localforage.getItem("work") as number }).add({ seconds: 0 });
// const rest = dayjs.duration({ minutes: await localforage.getItem("rest") as number }).add({ seconds: 0 });


function App() {
  const work = dayjs.duration({ minutes: Number(localStorage.getItem("work")) }).add({ seconds: 0 });
  const rest = dayjs.duration({ minutes: Number(localStorage.getItem("rest")) }).add({ seconds: 0 });

  //const [timer.current,settimer.current] = useState(work);
  //let timer.current2=work;
  const timer = useRef(work);

  const [time, setTime] = useState(timer.current.format("mm:ss"));
  const [button, setButton] = useState(true);

  const stateList = ["工作", "休息"/*,"长休息"*/];
  const stateMap = new Map<string, Duration>([
    ["工作", work],
    ["休息", rest]
  ])
  let s = useRef(0);
  const [state, setState] = useState("工作");
  const [id, setId] = useState(0);
  let myAudio = useRef<HTMLAudioElement>(null);

  document.addEventListener("end", () => {
    clearInterval(id);
  })

  function start() {
    console.log(s.current)
    // if (s.current == 0) {
    //   myAudio.current!.src="../public/alert-work.mp3";
    //   myAudio.current!.play();
    // }
    if (s.current === times * 2) s.current = 0;
    console.log(id, button, timer.current.asSeconds());
    if (button) {
      setId(setInterval(() => {
        localStorage.setItem("timer.current", String(timer.current.asSeconds()));//保存当前计时器的值
        timer.current=timer.current.add({ seconds: -1 });
        //settimer.current(timer.current=>timer.current.add({ seconds: -1 }));
        //timer.current2=timer.current2.add({ seconds: -1 });

        console.log("set:", timer.current)
        let lst=timer.current;
        setTime(lst.format("mm:ss"));

        if (timer.current.asSeconds() === 0) {
          //切换下一个状态，如工作换成休息
          setTimeout(() => {
            timer.current=rest;
            //settimer.current(rest)
            setTime(timer.current.format("mm:ss"));
            s.current += 1;
            setState(stateList[s.current % 2]);
            if (s.current % 2 == 0) {
              myAudio.current!.src = "../public/alert-work.mp3";
            } else {
              myAudio.current!.src = "../public/alert-short-break.mp3";
            }
            myAudio.current!.play();
          }, 1000)
        }
        if (s.current === times * 2) {
          //传播事件到外层，结束计时
          let e = new CustomEvent("end");
          document.dispatchEvent(e);
        }
      }, 1000))
    }
    else clearInterval(id);
    setButton(!button);
  }

  //console.log("timer.current",timer.current.asSeconds())
  return (
    <>
      <h1 id="show_time">{time}</h1>
      <p id="state">{state}</p>
      <progress
        className={s.current % 2 == 0 ? "work" : "rest"}
        max={stateMap.get(stateList[s.current % 2])!.asSeconds()}
        value={stateMap.get(stateList[s.current % 2])!.asSeconds() - timer.current.asSeconds()}
      ></progress>
      <button onClick={start} id="time_btn">{button ? playbtn : pausebtn}</button>
      <audio src="" ref={myAudio}></audio>
    </>
  );
}

export default App;
