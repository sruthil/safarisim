"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  useEffect(() => {
    // Scroll effect
    const handleScroll = () => {
      const mainNav = document.getElementById("mainNav");
      if (mainNav) {
        mainNav.classList.toggle("scrolled", window.pageYOffset > 200);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Mobile nav toggle logic
    const navButton = document.querySelector(".navbutton");
    const navClose = document.querySelector(".navClose");
    const navCollapse = document.querySelector(".navCollapse");
    const navLinks = document.querySelectorAll(".navLink");

    navButton?.addEventListener("click", () => {
      navCollapse?.classList.add("active");
    });

    navClose?.addEventListener("click", () => {
      navCollapse?.classList.remove("active");
    });

    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        navCollapse?.classList.remove("active");
      })
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="mainNav">
      <nav>
        <div className="container">
          <a href="#" className="navLogo">
            <img src="./dark-logo.svg" alt="logo" className="img-fluid" />
          </a>
          <button
            type="button"
            className="navbutton"
            title="navigation button"
            aria-label="Open Navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="navCollapse">
            <button
              type="button"
              className="navClose"
              title="navigation close"
              aria-label="Close Navigation"
            >
              <i className="fa-solid fa-times"></i>
            </button>
            <ul className="navList">
              <li>
                <Link href="/" className="navLink">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="navLink">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="navLink">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="navLink">
                  Packages
                </a>
              </li>
              <li>
                <a href="#" className="navLink">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="outlineBtn">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}