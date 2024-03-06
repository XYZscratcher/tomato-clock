import { useState } from 'react';

import { Slider } from '@douyinfe/semi-ui';

//import localforage from 'localforage';

import "./Settings.css"


type Prop = {
    lfName: string,
    name?: string,
    min?: number,
    max?: number,
    type?: string,
    d: number
}
/*const m={
    work:await localforage.getItem('work'),
    rest:await localforage.getItem('rest'),
    round:await localforage.getItem('round')
}*///TODO:CHANGE TO LOCAL STORAGE
function Card(p: Prop) {
    let dft=Number(localStorage.getItem(p.lfName));
    console.log(dft)
    let [value, setValue] = useState(dft);
    return (
        <div className='card'>
            <p>{p.name ?? "工作"}</p>
            <p>{p.type ? value : value + " 分"}</p>
            <Slider showBoundary={true}
                defaultValue={dft}
                railStyle={{ backgroundColor: "white" }}
                onChange={(v) => { setValue(v as number); localStorage.setItem(p.lfName,String(v)) }}
                min={p.min ?? 1}
                max={p.max ?? 59} />
        </div>
    )
}
function Settings() {
    return (
        <>
            <Card lfName='work' d={25}></Card>
            <Card name="休息" lfName='rest' d={5}></Card>
            <Card name="轮数" max={6} type="num" d={4} lfName='round'></Card>
        </>
    )
}
export default Settings;