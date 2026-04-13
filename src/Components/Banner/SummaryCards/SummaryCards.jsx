const SummaryCards = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        px-10 sm:px-0 text-center gap-6 mt-10 text-black/50 justify-between">

            <div className="card bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h1 className="text-2xl sm:text-3xl text-[#244d3f] font-bold">10</h1>
                    <p className="text-[18px]">Total Friends</p>
                </div>
            </div>

            <div className="card bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h1 className="text-2xl sm:text-3xl text-[#244d3f] font-bold">3</h1>
                    <p className="text-[18px]">On Track</p>
                </div>
            </div>

            <div className="card bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h1 className="text-2xl sm:text-3xl text-[#244d3f] font-bold">6</h1>
                    <p className="text-[18px]">Need Attention</p>
                </div>
            </div>

            <div className="card bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <h1 className="text-2xl sm:text-3xl text-[#244d3f] font-bold">12</h1>
                    <p className="text-[18px]">Interactions This Month</p>
                </div>
            </div>

        </div>
    );
};

export default SummaryCards;