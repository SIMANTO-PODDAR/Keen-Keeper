import { NavLink } from 'react-router';
import LogoImg from '../../assets/imgs/logo.png';
import { RiHome2Line } from 'react-icons/ri';
import { IoTimeOutline } from 'react-icons/io5';
import { ImStatsDots } from 'react-icons/im';

const Navbar = () => {





    return (
        <div className="sticky top-0 z-50 w-full px-4 py-3">
            <div className="navbar max-w-7xl mx-auto glass-panel rounded-full px-6 py-2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center shadow-md">
                <div className="flex-1 flex justify-start items-center">
                    <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                            KeenKeeper
                        </span>
                    </NavLink>
                </div>
                <div className="flex-none">
                    <nav className="flex items-center gap-1.5">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `btn btn-sm border-0 rounded-full px-4 flex items-center gap-2 transition-all duration-300 ${isActive
                                    ? 'nav-active'
                                    : 'btn-ghost text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`
                            }
                        >
                            <RiHome2Line className="text-lg" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/timeLine"
                            className={({ isActive }) =>
                                `btn btn-sm border-0 rounded-full px-4 flex items-center gap-2 transition-all duration-300 ${isActive
                                    ? 'nav-active'
                                    : 'btn-ghost text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`
                            }
                        >
                            <IoTimeOutline className="text-lg" />
                            <span>Timeline</span>
                        </NavLink>

                        <NavLink
                            to="/stats"
                            className={({ isActive }) =>
                                `btn btn-sm border-0 rounded-full px-4 flex items-center gap-2 transition-all duration-300 ${isActive
                                    ? 'nav-active'
                                    : 'btn-ghost text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                                }`
                            }
                        >
                            <ImStatsDots className="text-lg" />
                            <span>Stats</span>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;