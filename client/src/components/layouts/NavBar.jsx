import Logo from "./Logo";
import Input from "./Input";
import ProfileDropdown from "./ProfileDropdown";

function NavBar() {
    return (
        <nav className="flex justify-between h-15 items-center gap-10 bg-gray-50 shadow-md">
            <Logo />
            <Input />
            <ProfileDropdown />
        </nav>
    );
}

export default NavBar;
