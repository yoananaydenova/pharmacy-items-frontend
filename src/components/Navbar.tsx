import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar bg-light rounded px-5">
            <NavLink to="/" className="navbar-brand">Pharmacy Item App</NavLink>
            <div className="d-flex flex-row justify-content-between w-25">

                <NavLink to="/" className="nav-link" >Search</NavLink>
                <NavLink to="/login" className="nav-link" >Login</NavLink>
            </div>
        </nav>
    )
}

export default Navbar