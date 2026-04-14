import { FaHistory } from "react-icons/fa";
import { FiArchive, FiPhoneCall } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdOutlineTextsms } from "react-icons/md";
import { RiDeleteBinLine, RiNotificationSnoozeLine } from "react-icons/ri";

const Friend = () => {
    return (
        <div className="mt-5 sm:mt-20 flex-1 sm:flex justify-between">
            <div className="w-80 grid gap-3 mx-auto sm:mx-0"> {/* Left Side */}
                <div className="card bg-base-100 shadow-sm">
                    <figure className="mx-auto py-2">
                        <img
                            src="https://i.ibb.co.com/tTtCfB7B/83287d6f80f08f42206eeb2274eb0de5fd2ad5fd.webp"
                            alt="Shoes"
                            className="rounded-full h-20 w-20 object-cover scale-90" />
                    </figure>
                    <div className="card-body items-center text-center p-2">
                        <h2 className="card-title">{`name`}</h2>

                        <div className="card-actions">
                            <div className={`btn rounded-full bg-[#efad44] text-white outline-0 mx-2`}
                            >{`status`}</div>
                        </div>

                        {
                            <div className="btn rounded-full bg-green-200 text-green-900 outline-0 mx-2"
                            > {`tag`} </div>
                        }

                        <p>{`bio`}</p>
                        <p>Preferred: {`email`}</p>
                    </div>
                </div>

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

            <div className="max-w-3xl mr-0 sm:mr-10 mx-auto mt-5 sm:mt-0"> {/* Right Side */}

                <div className="text-black/50 grid grid-cols-3 gap-6  text-center">

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-xl sm:text-2xl text-[#244d3f] font-bold">62</h1>
                            <p className="text-xs sm:text-[18px]">Days Since Contact</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-xl sm:text-2xl text-[#244d3f] font-bold">30</h1>
                            <p className="text-xs sm:text-[18px]">Goal (Days)</p>
                        </div>
                    </div>

                    <div className="card bg-base-100 card-md shadow-sm">
                        <div className="card-body">
                            <h1 className="text-[16px] sm:text-2xl text-[#244d3f] font-bold">Feb 27, 2026</h1>
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
                                <span> 30 </span>days
                            </span>
                        </p>

                    </div>
                </div>

                {/* Quick Check-In */}
                <div className="card bg-base-100 card-md shadow-sm mt-3 sm:mt-6">
                    <div className="card-body">
                        <h1 className="text-xs sm:text-xl text-[#244d3f] font-bold">Quick Check-In</h1>

                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="btn h-24 grid p-0 m-0 gap-0">
                                <span className="text-2xl"><FiPhoneCall /></span>
                                <p>Call</p>
                            </div>

                            <div className="btn h-24 grid p-0 m-0 gap-0">
                                <span className="text-2xl"><MdOutlineTextsms /></span>
                                <p>Text</p>
                            </div>

                            <div className="btn h-24 grid p-0 m-0 gap-0">
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
                            <div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Friend;