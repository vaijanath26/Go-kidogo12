// Header.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Navbar from "./Navbar";
import logo from "../assets/logo-new.svg";
import LoginModal from "../pages/Login"; // Import LoginModal

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles["header-container"]}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <Navbar openLoginModal={openLoginModal} />

          {/* Login button triggers the modal */}
          
        </div>
      </header>

      {/* Show the LoginModal if showLoginModal is true */}
      <LoginModal isOpen={showLoginModal} onClose={closeLoginModal} />
    </>
  );
}
