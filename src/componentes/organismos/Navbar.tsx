import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand">Los Maestros</span>
            

                <div className="navbar-nav">
                    <Link className="nav-link" to="/">Inicio</Link>
                </div>

                <div className="navbar-nav">
                    <Link className="nav-link" to="/productos">Productos</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar