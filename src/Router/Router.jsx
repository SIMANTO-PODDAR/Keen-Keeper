import { createBrowserRouter, href } from "react-router";
import Root from "../Root/Root";
import NotFound from "../UI/NotFound/NotFound";

const Router = createBrowserRouter([

    {
        path: "/",
        Component: Root
    },
    {
        path: '*',
        Component: NotFound
    }

]);

export default Router;