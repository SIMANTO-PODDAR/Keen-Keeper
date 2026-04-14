import { FiPhoneCall } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdOutlineTextsms } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

const TimeLine = () => {
    return (
        <div className="mt-5 sm:mt-20">
            <h1 className="text-3xl sm:text-5xl font-bold">Timeline</h1>
            <div className="dropdown mt-3 sm:mt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-50 sm:w-87 flex justify-between text-black/50">
                    <span>Filter timeline</span>
                    <span className="font-bold text-2xl"><RiArrowDropDownLine /></span>
                </div>

                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-50 sm:w-87 p-2 shadow-sm">
                    <li><a><FiPhoneCall /> Call </a></li>
                    <li><a><MdOutlineTextsms /> Text </a></li>
                    <li><a><LuVideo /> Video </a></li>
                </ul>
            </div>

            {
                <TimeLineItem />
            }

        </div>
    );
};

export default TimeLine;

const TimeLineItem = () => {
    return (
        <div className="rounded-xl bg-base-100 shadow-sm my-3 sm:my-6 flex justify-start items-center gap-4 p-2">

            <div className="text-2xl">

                <h1 className={`${true ? 'grid' : 'hidden'}`}>
                    <FiPhoneCall />
                </h1>

                <h1 className={`${false ? 'grid' : 'hidden'}`}>
                    <MdOutlineTextsms />
                </h1>

                <h1 className={`${false ? 'grid' : 'hidden'}`}>
                    <LuVideo />
                </h1>

            </div>

            <div className="text-sm">
                <h2>
                    <span className="font-bold">meetup</span> with <span>Tom Baker</span>
                </h2>


                <p>March 29, 2026</p>
            </div>

        </div>
    )
}