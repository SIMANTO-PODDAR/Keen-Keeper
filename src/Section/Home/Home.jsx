import { Suspense } from "react";
import Banner from "../../Components/Banner/Banner";
import YourFriends from "../../Components/YourFriends/YourFriends";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";

const friendsPromise = fetch('/data.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <Banner />

            <Suspense fallback={<LoadingSpinner />} >

                <YourFriends friendsPromise={friendsPromise} />

            </Suspense>


        </div>
    );
};

export default Home;