import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineArrowRight } from "react-icons/hi";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const pages = [
    {
      id: 1,
      page: "Home",
      href: "/",
    },
    {
      id: 2,
      page: "Login",
      href: "/login",
    },
    {
      id: 3,
      page: "Wardrobe",
      href: "/wardrobe",
    },
    {
      id: 4,
      page: "Get Recommendation",
      href: "/get-recommendation",
    },
    {
      id: 5,
      page: "Account",
      href: "/account",
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles["no-scroll"]);
    } else {
      document.body.classList.remove(styles["no-scroll"]);
    }
  }, [menuOpen]);

  return (
    <>
      <div
        className={`${styles.backgroundTintCommon} ${
          menuOpen ? styles.backgroundTintOn : styles.backgroundTintOff
        }`}
        onClick={() => {
          setMenuOpen(false);
        }}
      />

      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          logo
        </Link>

        <button
          onClick={() => {
            setMenuOpen(true);
          }}
          className={styles.menuIcon}
        >
          <HiOutlineMenuAlt3 size="2.5rem" />
        </button>
      </div>

      <div
        className={`${styles.sideBar} ${!menuOpen ? styles.sideBarClosed : ""}`}
      >
        <div className={styles.menuHeader}>
          <h2>Sections</h2>
          <button
            onClick={() => {
              setMenuOpen(false);
            }}
            className={`${styles.menuIcon} ${styles.closeMenuIcon}`}
          >
            <HiOutlineArrowRight size="2.5rem" />
          </button>
        </div>

        <ul className={styles.sectionsContainer}>
          {pages.map(({ id, page, href }) => (
            <li key={id}>
              <Link to={href}>
                <h4>{page}</h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
