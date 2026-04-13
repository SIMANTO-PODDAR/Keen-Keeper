import { RiInstagramFill } from 'react-icons/ri';
import FooterLogo from './../../assets/imgs/logo-xl.png'
import { Link } from 'react-router';
const Footer = () => {
    return (
        <div className="bg-[#244d3f] text-[#f0ffff] sm:mt-20">
            <div className='max-w-300 mx-auto'>

                <footer className="footer footer-horizontal footer-center p-10 border-b border-white/15">
                    <img className='mt-10 scale-70 md:scale-100 sm:mt-20' src={FooterLogo}
                        alt="FooterLogo" />
                    <p className='mt-3 text-sm font-bold text-[#f0ffff]/70' >Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>

                    <div>
                        <h3 className='text-xl'>Social Links</h3>
                        <div className='flex gap-4 justify-center mt-4'>

                            <Link
                                className="fill-current bg-amber-50 text-black text-2xl p-2 rounded-full">
                                <RiInstagramFill />
                            </Link>
                            <Link
                                className="fill-current bg-amber-50 text-black text-2xl p-2 rounded-full">
                                <RiInstagramFill />
                            </Link>
                            <Link
                                className="fill-current bg-amber-50 text-black text-2xl p-2 rounded-full">
                                <RiInstagramFill />
                            </Link>
                        </div>
                    </div>

                </footer>



                <aside className='grid justify-center sm:flex sm:justify-between text-[#f0ffff]/40 py-5'>
                    <p>© {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
                    <div className='grid justify-center sm:flex gap-5'>
                        <p className='link link-hover'>Privacy Policy</p>
                        <p className='link link-hover'>Terms of Service</p>
                        <p className='link link-hover'>Cookies</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Footer;