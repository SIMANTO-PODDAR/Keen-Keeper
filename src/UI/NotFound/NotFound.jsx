import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="grid justify-center">
            <h1 className="text-4xl text-center mt-50">{`404 Page Not Found ;(`}</h1>
            <Link to='/'><button className="btn">Home</button></Link>
        </div>
    );
};

export default NotFound;