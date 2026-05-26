import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import NotFound from "../UI/NotFound/NotFound";
import Home from "../Section/Home/Home";
import Friend from "../Components/Friend/Friend";
import TimeLine from "../Section/TimeLine/TimeLine";
import Stats from "../Section/Stats/Stats";

const Router = createBrowserRouter([

    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true, 
                Component: Home
            },
            {
                path: 'friend/:id',
                Component: Friend
            },
            {
                path: 'timeLine',
                Component: TimeLine
            },
            {
                path: 'stats',
                Component: Stats
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }

]);

export default Router;