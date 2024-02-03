import { Slider } from '@douyinfe/semi-ui';
import "./Settings.css"
function Card(){
    let value;
    return(
        <div className='card'>
            <p>工作</p>
            <Slider showBoundary={false} defaultValue={40} railStyle={{backgroundColor:"white"}} value={value}></Slider>
        </div>
    )
}
function Settings() {
    return (
        <>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </>
    )
}
export default Settings;