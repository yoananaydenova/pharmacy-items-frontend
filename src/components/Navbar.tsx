import { NavLink, useNavigate } from "react-router-dom";
import { setAuthHeader } from "../helpers/axios_helper";

type NavbarProps = {
    isLoggedIn: boolean,
    setIsLoggedIn: Function
}


const Navbar = ({ isLoggedIn, setIsLoggedIn }: NavbarProps) => {

    const navigate = useNavigate();

    const logout = () => {
        setAuthHeader(null);
        setIsLoggedIn(false);
        navigate("/");
    };

    return (
        <nav className="navbar bg-light rounded px-5">
            <NavLink to="/" className="navbar-brand">Pharmacy Item App</NavLink>
            <div className="d-flex flex-row justify-content-between w-25 align-items-center">

                <NavLink to="/" className="nav-link" >Search</NavLink>
                {isLoggedIn ? <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink> : null}
                {isLoggedIn ?
                    <button onClick={logout} className="btn btn-outline-secondary px-2 py-1">Logout</button>
                    :
                    <NavLink to="/login" className="btn btn-secondary px-2 py-1" >Login</NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar