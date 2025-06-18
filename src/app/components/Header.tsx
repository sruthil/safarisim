"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { toast } from 'react-toastify';

export default function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.data.message || "Failed to send OTP.");
      }

      console.log("OTP sent successfully:", data);
      setStep("otp");
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify OTP.");
      }

      // Save token if returned
      if (data.data.token) {
        localStorage.setItem("authToken", data.data.token);
      }
      toast.success("Login successful!");
      setIsLoggedIn(true);
      setIsOpen(false); // Close modal
      // Optionally redirect: router.push("/dashboard");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
            <img src="./frontend/dark-logo.svg" alt="logo" className="img-fluid" />
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
                {!isLoggedIn && (
                  <button type="button" onClick={() => { setStep("email"); setIsOpen(true); }}
                    className="outlineBtn"> Login </button>
                )}
                
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
                
                <button onClick={handleSendOtp} className="mainBtn" disabled={loading}>
                  {loading ? "Sending OTP..." : "Get OTP"}
                </button>
              </>
            ) : (
              <>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label text-dark">Enter OTP</label>
                <input type="text" id="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control"/>
              </div>
              
                <button onClick={handleVerifyOtp} className="mainBtn" disabled={loading}>
                  {loading ? "Authenticating..." : "Login"}
                </button>
                
              </>
            )}
            <button onClick={() => setIsOpen(false)} className="close-btn" title="close-popup"><i className="fa-solid fa-times"></i></button>
          </div>
        </div>
      )}
      </>
  );
}