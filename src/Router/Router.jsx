import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import NotFound from "../UI/NotFound/NotFound";
import Home from "../Section/Home/Home";

const Router = createBrowserRouter([

    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true, Component: Home
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }

]);

export default Router;