const YourFriends = () => {
    return (
        <div>
            <h1 className="font-bold text-2xl p-5 sm:p-10 lg:p-0 ">Your Friends</h1>

            <div className="mt-2">
                {
                    <div className="
                    grid grid-cols-1 text-center gap-6 mt-10 text-black/50 justify-between p-15
                    sm:grid-cols-2 sm:p-20
                    lg:grid-cols-4 lg:p-0">
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                    </div>
                }
            </div>

        </div>
    );
};

export default YourFriends;

const Friend = () => {
    return (
        <div className="card bg-base-100  h-64 shadow-sm">
            <figure className="mx-auto py-2">
                <img
                    src="https://i.ibb.co.com/tTtCfB7B/83287d6f80f08f42206eeb2274eb0de5fd2ad5fd.webp"
                    alt="Shoes"
                    className="rounded-full h-20 w-20 object-cover scale-90" />
            </figure>
            <div className="card-body items-center text-center p-2">
                <h2 className="card-title">{`name`}</h2>

                <p className="text-black/60"
                >{`days_since_contact`} d ago</p>

                {
                    <div className="btn rounded-full bg-green-200 text-green-900 outline-0 mx-2"
                    > {`tag`} </div>
                }

                <div className="card-actions">
                    <div className={`btn rounded-full bg-[#efad44] text-white outline-0 mx-2`}
                    >{`status`}</div>
                </div>
            </div>
        </div>
    )

}