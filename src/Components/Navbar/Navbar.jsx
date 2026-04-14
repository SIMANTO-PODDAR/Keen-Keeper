import { NavLink } from 'react-router';
import LogoImg from '../../assets/imgs/logo.png'
import { RiHome2Line } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';
const Navbar = () => {
    return (
        <div className="container mx-auto">
            <div className="flex-col sm:flex-row navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <img src={LogoImg} alt="logo" />
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1 gap-x-1">
                        <NavLink to='/' className='btn btn-ghost'>
                            <RiHome2Line /> Home </NavLink>
                        <NavLink to='/timeLine' className='btn btn-ghost'>
                            <IoTimeOutline />  TimeLine </NavLink>
                        <NavLink to='/friend/sdkfd' className='btn btn-ghost'>
                            <ImStatsDots />  Stats </NavLink>


                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;