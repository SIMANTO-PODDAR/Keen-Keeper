import { FiPhoneCall } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { MdClearAll, MdOutlineTextsms } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { GrDocumentOutlook } from "react-icons/gr";
import { useContext, useState } from "react";
import { TLContext } from "../../TimeLineContext/TimeLineContext";

const TimeLine = () => {
    const { TimeLineData } = useContext(TLContext);

    const VideoData = TimeLineData.filter(vdata => vdata.sm == "Video");
    const CallData = TimeLineData.filter(cdata => cdata.sm == "Call");
    const TextData = TimeLineData.filter(tdata => tdata.sm == "Text");

    const [showTimeLineData, setShowTimeLineData] = useState('All')

    const handleShowData = (show) => {
        setShowTimeLineData(`${show}`)
    }

    return (
        <div className="mt-5 sm:mt-20">
            <h1 className="text-3xl sm:text-5xl font-bold">Timeline</h1>

            <div className="dropdown mt-3 sm:mt-6">
                <div tabIndex={0} role="button" className="btn m-1 w-50 sm:w-87 flex justify-between text-black/50">
                    <span>Filter timeline  ({showTimeLineData})</span>
                    <span className="font-bold text-2xl"><RiArrowDropDownLine /></span>
                </div>

                <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-50 sm:w-87 p-2 shadow-sm">
                    <li onClick={() => handleShowData('All')}>
                        <a><MdClearAll /> All ({TimeLineData.length})</a></li>
                    <li onClick={() => handleShowData('Call')}>
                        <a><FiPhoneCall /> Call ({CallData.length})</a></li>
                    <li onClick={() => handleShowData('Text')}>
                        <a><MdOutlineTextsms /> Text ({TextData.length})</a></li>
                    <li onClick={() => handleShowData('Video')}>
                        <a><LuVideo /> Video ({VideoData.length})</a></li>
                </ul>
            </div>

            {
                showTimeLineData == 'All' && (TimeLineData.map((data, ind) =>
                    <TimeLineItem key={ind} friend={data} />))
            }

            {
                showTimeLineData == 'Call' && (CallData.map((data, ind) =>
                    <TimeLineItem key={ind} friend={data} />))
            }

            {
                showTimeLineData == 'Text' && (TextData.map((data, ind) =>
                    <TimeLineItem key={ind} friend={data} />))
            }

            {
                showTimeLineData == 'Video' && (VideoData.map((data, ind) =>
                    <TimeLineItem key={ind} friend={data} />))
            }

            {
                <div className={`${TimeLineData.length == 0 ?
                    'grid' : 'hidden'
                    }`}>
                    <h1 className="text-3xl font-bold text-center py-15 sm:py-3"> <GrDocumentOutlook className="text-center mx-auto m-3" />No Time Line Data Available!</h1>
                </div>

            }


        </div>
    );
};

export default TimeLine;

const TimeLineItem = ({ friend }) => {
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