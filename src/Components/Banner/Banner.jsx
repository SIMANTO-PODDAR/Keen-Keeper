import { FaPlus } from "react-icons/fa";
import SummaryCards from "./SummaryCards/SummaryCards";

const Banner = () => {
    return (
        <div>
            <div className="mx-auto text-center pt-10 sm:20">
                <h1 className="text-3xl sm:text-5xl">Friends to keep close in your life</h1>
                <p className="px-10  sm:py-4 text-black/50 text-justify sm:text-center">Your personal shelf of meaningful connections. Browse, tend, and nurture the <br />
                    relationships that matter most.</p>

                <button className="btn bg-[#244d3f] text-[#f0ffff]">
                    <FaPlus /> Add a Friend</button>
            </div>

            <SummaryCards />

            <div className="my-10 h-0.5 bg-black/15"></div>
        </div>
    );
};

export default Banner;