import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link collapsed">
              <i className="bi bi-grid" /> <span>Home</span>{" "}
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Users</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="tables-nav"
              className="nav-content collapse"
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to="/add-user">
                  <i className="bi bi-circle" />
                  <span>Add User</span>
                </Link>
              </li>
              <li>
                <Link to="/list">
                  <i className="bi bi-circle" />
                  <span>Users List</span>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/user-contact" className="nav-link collapsed">
              <i className="bi bi-grid" /> <span>Contact</span>{" "}
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
