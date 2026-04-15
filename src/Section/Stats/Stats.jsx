import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle/PieChartWithPaddingAngle";


const Stats = () => {
    return (
        <div className="mt-5 sm:mt-20">
            <h1 className="text-3xl sm:text-5xl font-bold">Friendship Analytics</h1>
            <div className="bg-base-100 shadow-sm mt-3 sm:mt-6 p-2.5">
                <h1 className="text-[#244d3f] font-bold text-xl">By Interaction Type</h1>
                <PieChartWithPaddingAngle />
            </div>
        </div>
    );
};

export default Stats;