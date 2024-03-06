import { Outlet, Link } from "react-router-dom";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";

//import localforage from "localforage";

import "./Menu.css"

appWindow.setDecorations(false);
appWindow.setSize(new LogicalSize(400, 500));
appWindow.setResizable(false);

//localforage.clear()
/*localforage.keys().then((v)=>{
    console.log(v)
    if(v.indexOf("work")===-1){
        localforage.setItem("work",25);
        localforage.setItem("rest",5);
        localforage.setItem("round",4);
    }
}).catch((e)=>console.log(e))*/
if (localStorage.length === 0) {
    localStorage.setItem("work", "25");
    localStorage.setItem("rest", "5");
    localStorage.setItem("round", "4");
}
localStorage.setItem("timer", "25");

//TODO:创建一个被App.tsx调用的函数，使得计时器在“后台”继续计时
function timerInBack() {

}

const home =
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" /></svg>
const settings =
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" /></svg>
const info =
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>

function Tab(props: React.ComponentProps<any>) {
    return (
        <div style={{ flex: "auto", textAlign: "center" }}>
            <Link to={"/" + props.href}>{props.children}</Link>
        </div>
    )
}

function Menu() {
    //TODO:
    return (<>
        <div style={{ textAlign: "right" }}>
            <span id="title">小巧番茄钟</span>
            <button onClick={() => { appWindow.minimize(); }} className="window" id="minimize">─</button>
            <button onClick={() => { appWindow.close(); }} className="window" id="close">✖</button>
        </div>
        <div className="container">
            <Outlet />
        </div>
        {/*<Link to="/">🏠</Link><Link to="/about">ℹ</Link>*/}
        <div id="footer">
            <nav>
                {[["settings", settings], ["", home], ["about", info]].map((v) => <Tab href={v[0]}>{v[1]}</Tab>)}
            </nav></div>
    </>
    )
}
export { Menu, timerInBack };