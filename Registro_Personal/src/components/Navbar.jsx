import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Mi Registro</h1>
        <ul className="navbar-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Registrar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lista"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Lista
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resumen"
              className={({ isActive }) =>
                isActive
                  ? "navbar-link active"
                  : "navbar-link"
              }
            >
              Resumen
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
