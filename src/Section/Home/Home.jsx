import { useState } from "react";
import Banner from "../../Components/Banner/Banner";
import YourFriends from "../../Components/YourFriends/YourFriends";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import AddFriendModal from "../../Components/AddFriendModal/AddFriendModal";
import { useApp } from "../../Context/AppContext";

const Home = () => {
    const { loading } = useApp();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <Banner onAddFriendClick={() => setIsAddModalOpen(true)} />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <YourFriends />
            )}

            <AddFriendModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
            />
        </div>
    );
};

export default Home;