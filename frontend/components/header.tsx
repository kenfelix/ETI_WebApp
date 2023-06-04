import { FC } from 'react';
import Logo from './sub/logo';
import Navigation from './sub/navigation';
import RightNavigation from './sub/right-nav';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    return (
        <header className='px-[30px] py-[14px] flex flex-row items-center
         justify-between text-[15px] sticky z-50 top-0 bg-white'>
            {/* logo */}
            <Logo/>

            {/* main navigation */}

            <Navigation/>
            {/* right navigatin */}

            <RightNavigation/>
        </header>
    );
};

export default Header;