import Logo from "./Logo";
import Input from "./Input";
import ProfileDropdown from "./ProfileDropdown";

function NavBar() {
    return (
        <nav className="flex fixed top-0 left-0 right-0 z-10 justify-between h-15 items-center gap-10 bg-gray-50 shadow-md">
            <Logo />
            <Input />
            <ProfileDropdown />
        </nav>
    );
}

export default NavBar;
