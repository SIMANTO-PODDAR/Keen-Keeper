import { use, useContext } from "react";
import { FaHistory } from "react-icons/fa";
import { FiArchive, FiPhoneCall } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdOutlineTextsms } from "react-icons/md";
import { RiDeleteBinLine, RiNotificationSnoozeLine } from "react-icons/ri";
import { useParams } from "react-router";
import NotFound from "../../UI/NotFound/NotFound";
import { TLContext } from "../../TimeLineContext/TimeLineContext";

const Friend = ({ friendsPromise }) => {
    const allFriendsData = use(friendsPromise);
    const { id } = useParams();

    const { TimeLineData, setTimeLineData } = useContext(TLContext);

    const expectedFriend = allFriendsData.find(friend => friend.id == id);

    if (!expectedFriend) {
        return (
            <div>
                <NotFound />
            </div>
        )
    }

    const UpdateTimeDate = (date = new Date()) => {
        const hours = date.getHours();
        const minute = date.getMinutes().toString().padStart(2, '0');

        const amORpm = hours >= 12 ? 'pm' : 'am';
        const hour = hours % 12 || 12;

        const day = date.getDate();
        const year = date.getFullYear();

        const month = date.toLocaleString('en-US', { month: 'long' });

        return `${hour}:${minute} ${amORpm} ${day} ${month} ${year}`;
    }

    const handleAction = (sm) => {
        let friendObj = {
            "sm": `${sm}`,
            "name": `${expectedFriend.name}`,
            "date": `${UpdateTimeDate()}`,
            "id": `${expectedFriend.id}`
        }

        setTimeLineData([friendObj, ...TimeLineData])

    }

    const RecentInteractionData = TimeLineData.filter(itm => itm.id == expectedFriend.id);

    return (
        <div className="mt-5 sm:mt-20 flex-1 sm:flex justify-between">
            <div className="w-80 grid gap-3 mx-auto sm:mx-0 sm:h-50"> {/* Left Side */}
                <div className="card bg-base-100 shadow-sm">
                    <figure className="mx-auto py-2">
                        <img
                            src={expectedFriend.picture}
                            alt={expectedFriend.name}
                            className="rounded-full h-20 w-20 object-cover scale-90" />
                    </figure>
                    <div className="card-body items-center text-center p-2">
                        <h2 className="card-title">{expectedFriend.name}</h2>

                        <div className="card-actions">
                            <div className={`btn rounded-full text-white outline-0 mx-2 
                    ${expectedFriend.status == 'Overdue' ? 'bg-[#ef4444]' : ''}
                    ${expectedFriend.status == 'On-track' ? 'bg-[#244d3f]' : ''} 
                    ${expectedFriend.status == 'Almost Due' ? 'bg-[#efad44]' : ''} 
                    `}
                            >{expectedFriend.status}</div>
                        </div>

                        <div className="flex justify-center">
                            {
                                expectedFriend.tags.map((tag, ind) => <div key={ind} className="btn rounded-full bg-green-200 text-green-900 outline-0 mx-2 py-0 text-[10px] sm:text-xs"
                                > {tag.toUpperCase()} </div>)
                            }
                        </div>
                        <div>
                            <p className="text-black/50 ">{expectedFriend.bio}</p>
                            <p className="text-black/50 ">Preferred: {expectedFriend.email}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button className="btn w-full text-sm bg-base-100">
                        <span className="text-xl"><RiNotificationSnoozeLine /></span>
                        Snooze 2 weeks
                    </button>

                    <button className="btn w-full text-sm bg-base-100">
                        <span className="text-xl"><FiArchive /></span>
                        Archive
                    </button>

                    <button className="btn w-full text-sm bg-base-100 text-red-600">
                        <span className="text-xl"><RiDeleteBinLine /></span>
                        Delete
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mr-0 sm:mr-10 mx-auto mt-5 sm:mt-0"> {/* Right Side */}

                {/* info */}
                <div className="text-black/50 grid grid-cols-3 gap-6  text-center">

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-xl sm:text-2xl text-[#244d3f] font-bold">{expectedFriend.days_since_contact}</h1>
                            <p className="text-xs sm:text-[18px]">Days Since Contact</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-xl sm:text-2xl text-[#244d3f] font-bold">{expectedFriend.goal}</h1>
                            <p className="text-xs sm:text-[18px]">Goal (Days)</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-[16px] sm:text-2xl text-[#244d3f] font-bold">
                                {new Date(expectedFriend.next_due_date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}</h1>
                            <p className="text-xs sm:text-[18px]">Next Due</p>
                        </div>
                    </div>

                </div>

                {/* Relationship Goal */}
                <div className="card bg-base-100 card-md shadow-sm mt-3 sm:mt-6">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h1 className="text-xs sm:text-xl text-[#244d3f] font-bold">Relationship Goal</h1>
                            <button className="btn">Edit</button>
                        </div>

                        <p className="text-xs sm:text-[18px]">
                            <span className="text-black/50">Connect every</span>
                            <span className="font-bold">
                                <span> {expectedFriend.goal} </span>days
                            </span>
                        </p>

                    </div>
                </div>

                {/* Quick Check-In */}
                <div className="card bg-base-100 card-md shadow-sm mt-3 sm:mt-6">
                    <div className="card-body">
                        <h1 className="text-xs sm:text-xl text-[#244d3f] font-bold">Quick Check-In</h1>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div onClick={() => { handleAction('Call') }}
                                className="btn h-24 grid p-0 m-0 gap-0">
                                <span className="text-2xl"><FiPhoneCall /></span>
                                <p>Call</p>
                            </div>

                            <div onClick={() => { handleAction('Text') }}
                                className="btn h-24 grid p-0 m-0 gap-0">
                                <span className="text-2xl"><MdOutlineTextsms /></span>
                                <p>Text</p>
                            </div>

                            <div onClick={() => { handleAction('Video') }}
                                className="btn h-24 grid p-0 m-0 gap-0">
                                <span className="text-2xl text-center"><LuVideo /></span>
                                <p>Video</p>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Recent Interactions */}
                <div className="card bg-base-100 card-md shadow-sm mt-3 sm:mt-6">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h1 className="text-xs sm:text-xl text-[#244d3f] font-bold">Recent Interactions</h1>
                            <button className="btn"><FaHistory />Full History</button>
                        </div>

                        <div>

                            {
                                RecentInteractionData.map((itm, ind) => <RecentInteractionItem key={ind} friend={itm} />)
                            }

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Friend;


const RecentInteractionItem = ({ friend }) => {
    return (
        <div className="rounded-xl bg-base-100 shadow-sm my-3 sm:my-6 flex justify-start items-center gap-4 p-2">

            <div className="text-2xl">

                <h1 className={`${friend.sm == "Call" ? 'grid' : 'hidden'}`}>
                    <FiPhoneCall />
                </h1>

                <h1 className={`${friend.sm == "Text" ? 'grid' : 'hidden'}`}>
                    <MdOutlineTextsms />
                </h1>

                <h1 className={`${friend.sm == "Video" ? 'grid' : 'hidden'}`}>
                    <LuVideo />
                </h1>

            </div>

            <div className="text-sm">
                <h2>
                    <span className="font-bold">{friend.sm}</span> with <span>{friend.name}</span>
                </h2>

                <p>{friend.date}</p>
            </div>

        </div>
    )
}