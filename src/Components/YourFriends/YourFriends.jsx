import { use } from "react";

const YourFriends = ({ friendsPromise }) => {
    const friends = use(friendsPromise);
    return (
        <div>
            <h1 className="font-bold text-2xl p-3 sm:p-10 lg:p-0 ">Your Friends</h1>

            <div className="
                    grid grid-cols-1 text-center gap-6 mt-5 text-black/50 justify-between py-5
                    sm:grid-cols-2 sm:py-20 sm:mt-10
                    lg:grid-cols-4 lg:py-0">
                {
                    friends.map((friend, ind) => <Friend key={ind} friend={friend} />)
                }
            </div>

        </div>
    );
};

export default YourFriends;

const Friend = ({ friend }) => {
    return (
        <div className="card bg-base-100  h-64 shadow-sm hover:scale-107 transform transition-transform duration-300 ease-in-out">
            <figure className="mx-auto py-2">
                <img
                    src={friend.picture}
                    alt={friend.name}
                    className="rounded-full h-20 w-20 object-cover scale-90" />
            </figure>
            <div className="card-body items-center text-center p-2">
                <h2 className="card-title text-black">{friend.name}</h2>

                <p className="text-black/60"
                >{friend.days_since_contact}d ago</p>
                <div className="flex justify-center">
                    {
                        friend.tags.map((tag, ind) => <div key={ind} className="btn rounded-full bg-green-200 text-green-900 outline-0 mx-2 py-0 text-[10px] sm:text-xs"
                        > {tag.toUpperCase()} </div>)
                    }
                </div>

                <div className="card-actions">
                    <div className={`btn rounded-full text-white outline-0 mx-2 
                    ${friend.status == 'Overdue' ? 'bg-[#ef4444]' : ''}
                    ${friend.status == 'On-track' ? 'bg-[#244d3f]' : ''} 
                    ${friend.status == 'Almost Due' ? 'bg-[#efad44]' : ''} 
                    `}
                    >{friend.status}</div>
                </div>
            </div>
        </div>
    )

}