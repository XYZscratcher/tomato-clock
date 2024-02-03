import { useRouteError, Link } from "react-router-dom";

function ErrorPage() {
    type Error = {
        statusText: string,
        message: string
    }
    /* 之所以要添加一个中间变量，是因为 err 是 unknown 类型，
    直接读取其中的属性，TS 会报错。
     */
    let err = useRouteError();
    const error = err as Error;

    console.error(error);
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/">home</Link>
        </div>
    )
}
export default ErrorPage;