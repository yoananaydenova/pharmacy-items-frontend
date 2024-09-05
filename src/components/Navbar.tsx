import { NavLink } from "react-router-dom";

type NavbarProps = {isLoggedIn:boolean}


const Navbar = ({ isLoggedIn}: NavbarProps ) => {

    return (
        <nav className="navbar bg-light rounded px-5">
            <NavLink to="/" className="navbar-brand">Pharmacy Item App</NavLink>
            <div className="d-flex flex-row justify-content-between w-25 align-items-center">

                <NavLink to="/" className="nav-link" >Search</NavLink>
                {isLoggedIn ?
                    <NavLink to="/" className="btn btn-outline-secondary px-2 py-1">Logout</NavLink>
                    :
                    <NavLink to="/login" className="btn btn-secondary px-2 py-1" >Login</NavLink>
                }
            </div>
        </nav>
    )
}

export default Navbar