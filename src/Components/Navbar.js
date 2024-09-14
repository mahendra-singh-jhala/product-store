import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-cyan-400 text-white px-4 py-3">
            <h1 className="text-2xl font-bold ps-4">Product-store</h1>
            <ul className="flex justify-between">
                <li className="me-4 text-lg font-bold hover:text-orange-200"><Link to="/" > Product </Link></li>
                <li className="me-4 text-lg font-bold hover:text-orange-200"><Link to="/cart" > Cart  </Link></li>
            </ul>
        </nav>
    )
}

export default Navbar