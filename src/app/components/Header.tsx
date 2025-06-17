"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { BASE_URL } from "@/utils/baseUrl";
const baseUrl = `${BASE_URL}`;

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setStep("email");
        setEmail("");
        setOtp("");
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


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
    <>
    <header id="mainNav">
      <nav>
        <div className="container">
          <a href="#" className="navLogo">
            <img src={baseUrl+"/logo-dark-color.svg"} alt="logo" className="img-fluid" />
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
                <Link href="/" className="navLink">
                  Services
                </Link>
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
                <button type="button" onClick={() => {setStep("email"); setIsOpen(true)}} className="outlineBtn">
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    
      {isOpen && (
        
        <div className="modalBg">
          <div className="modalWrapper" ref={modalRef}>
            <h3 className="sectionHead">Login</h3>
            <p className="small">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo dolores modi magnam.</p>
            {step === "email" ? (
              <>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">Enter your Email</label>
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
                <button onClick={() => setStep("otp")} className="mainBtn">Get OTP</button>
              </>
            ) : (
              <>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label text-dark">Enter OTP</label>
                <input type="text" id="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control"/>
              </div>
                <button onClick={() => console.log("Login with", { email, otp })} className="mainBtn">Login</button>
              </>
            )}
            <button onClick={() => setIsOpen(false)} className="close-btn" title="close-popup"><i className="fa-solid fa-times"></i></button>
          </div>
        </div>
      )}
      </>
  );
}