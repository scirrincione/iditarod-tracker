import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/iditarod_logo.jpg";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  const { user, login, logout } = useContext(UserContext);

  async function handleLogout() {
    logout();
  }
  return (
    <div>
      <nav className="flex justify-between items-center mb-2 mt-2">
        <NavLink to="/">
          <img alt="Iditarod logo" className="hidden md:block h-30" src={logo}></img>
        </NavLink>
        <h1 className="font-bold text-4xl px-2 md:px-0 md:text-5xl">Iditarod Training Tracker</h1>
        {!user && <div className="items-right">
          <NavLink
            className="mr-2 mb-1 inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/signup">
            Sign up
          </NavLink>
          <NavLink
            className="mr-2 mb-1 inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/login">
            Log in
          </NavLink>
        </div>}
        {user && <div>
          <NavLink
            className="mr-2 mb-1 inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to="/editprofile">
            Profile
          </NavLink>
          <button className="mr-2 mb-1 inline-flex items-center justify-center whitespace-nowrap text-md font-medium border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            onClick={handleLogout}
            title="Sign out"
            accessibilityLabel="Sign out of your account">
            Sign out
          </button>
        </div>}
      </nav>
    </div>
  );
}