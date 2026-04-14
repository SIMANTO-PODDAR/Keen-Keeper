import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import NotFound from "../UI/NotFound/NotFound";
import Home from "../Section/Home/Home";
import Friend from "../Components/Friend/Friend";
import { Suspense } from "react";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import TimeLine from "../Section/TimeLine/TimeLine";


const friendsPromise = fetch('/data.json').then(res => res.json());

const Router = createBrowserRouter([

    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true, Component: Home
            },
            {
                path: '/friend/:id',
                element:
                    <Suspense fallback={<LoadingSpinner />}>
                        <Friend friendsPromise={friendsPromise} />
                    </Suspense>
            },
            {
                path: 'timeLine',
                Component: TimeLine
            }
        ]
    },
    {
        path: '*',
        Component: NotFound
    }

]);

export default Router;