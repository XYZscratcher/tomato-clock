// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import Menu from "./Menu";
import ErrorPage from "./ErrorPage";
import About from "./About";
import "./styles.css";
import Settings from "./Settings";

const router = createBrowserRouter([
  {
    path: "/",
    //element: <App />,
    element: <Menu />,
    errorElement: <ErrorPage />,
    children:[{
      index: true,
      element:<App />
    },{
      path:"/about",
      element:<About />
    },{
      path:"/settings",
      element:<Settings />
    }]
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
