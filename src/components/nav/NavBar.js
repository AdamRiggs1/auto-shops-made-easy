import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link__profile" to="/profile">Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link__list" to="/stores/StoreContainer">List of Stores</Link>
            </li>
            {
                localStorage.getItem("auto_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link__logout" to="" onClick={() => {
                            localStorage.removeItem("auto_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}