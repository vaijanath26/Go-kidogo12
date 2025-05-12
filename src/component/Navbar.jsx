import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; // Make sure this path is correct
import LoginModal from "../pages/Login";

export default function Navbar({ openLoginModal }) {
  // State to control the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className={`${styles["nav-menu"]}`}>
      <div className={styles["dropdown"]}>
        <NavLink
          to="/city"
          className={styles["nav-link"]}
          activeClassName={styles.active}
        >
          CITY
        </NavLink>
        <ul className={styles["dropdown-menu"]}>
          <li>
            <NavLink
              to="/city/BAD VILBEL"
              className={styles["dropdown-item"]}
              activeClassName={styles.active}
            >
              BAD VILBEL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/city/HANAU"
              className={styles["dropdown-item"]}
              activeClassName={styles.active}
            >
              HANAU
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/city/MAINZ"
              className={styles["dropdown-item"]}
              activeClassName={styles.active}
            >
              MAINZ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/city/BAD NAUHEIM"
              className={styles["dropdown-item"]}
              activeClassName={styles.active}
            >
              BAD NAUHEIM
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/city/FRANKFURT AM MAIN"
              className={styles["dropdown-item"]}
              activeClassName={styles.active}
            >
              FRANKFURT AM MAIN
            </NavLink>
          </li>
        </ul>
      </div>

      <NavLink
        to="/partner"
        className={styles["nav-link"]}
        activeClassName={styles.active}
      >
        PARTNER
      </NavLink>
      <NavLink
        to="/about"
        className={styles["nav-link"]}
        activeClassName={styles.active}
      >
        ABOUT US
      </NavLink>
      <NavLink
        to="/gokido-tool"
        className={styles["nav-link"]}
        activeClassName={styles.active}
      >
        GOKIDO TOOL
      </NavLink>
      <NavLink
        to="/contact"
        className={styles["nav-link"]}
        activeClassName={styles.active}
      >
        CONTACT
      </NavLink>

      <div className={styles["language-selector"]}>
        <button className={styles["language-button"]} onClick={toggleDropdown}>
          German (DE)
          <svg
            className={styles["dropdown-icon"]}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        {/* Display dropdown if isDropdownOpen is true */}
        {isDropdownOpen && (
          <div className={styles["language-dropdown"]}>
            <NavLink to="#" className={styles["dropdown-item"]}>
              English (EN)
            </NavLink>
            <NavLink to="#" className={styles["dropdown-item"]}>
              German (DE)
            </NavLink>
          </div>
        )}
      </div>

      <button onClick={openLoginModal} className={styles["login-button"]}>
        Log in
      </button>
    </nav>
  );
}