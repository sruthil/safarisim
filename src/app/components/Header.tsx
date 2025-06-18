"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { getBaseUrl } from "@/utils/baseUrl";
import { useUser } from "@/context/UserContext";

const baseUrl = getBaseUrl();

export default function Header() {
  const { user, setUser } = useUser();

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const [showDemoModal, setShowDemoModal] = useState(false);
  // -------------------------
  // Auth: Send OTP
  // -------------------------
  const handleSendOtp = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.data.message || "Failed to send OTP.");

      toast.success("OTP sent successfully.");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Auth: Verify OTP
  // -------------------------
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "OTP verification failed.");

      // Store user and token
      localStorage.setItem("user", JSON.stringify(data.data.user));
      localStorage.setItem("authToken", data.data.token);
      setUser(data.data.user);

      toast.success("Login successful!");
      setIsOpen(false);
      setEmail("");
      setOtp("");
      setStep("email");
    } catch (error: any) {
      toast.error(error.message || "Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Handle modal click outside to close
  // -------------------------
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

  // -------------------------
  // Header scroll & mobile nav behavior
  // -------------------------
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("mainNav");
      nav?.classList.toggle("scrolled", window.pageYOffset > 200);
    };

    window.addEventListener("scroll", handleScroll);

    const navButton = document.querySelector(".navbutton");
    const navClose = document.querySelector(".navClose");
    const navCollapse = document.querySelector(".navCollapse");
    const navLinks = document.querySelectorAll(".navLink");

    navButton?.addEventListener("click", () => navCollapse?.classList.add("active"));
    navClose?.addEventListener("click", () => navCollapse?.classList.remove("active"));
    navLinks.forEach((link) =>
      link.addEventListener("click", () => navCollapse?.classList.remove("active"))
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let totalCredit = 0;
  let usedLimit = 0;

  const handleProceedToBuy = () => {
    // Show the credit section
    const section = document.getElementById("creditSection");
    if (section) section.style.display = "block";
  };
  const handleAddCredit = async () => {
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const amount = parseFloat(amountInput.value);

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (!user) {
      toast.error("Please login to add credit.");
      return;
    }
    const postData = {
      email: user.email,
      amount: amount,
      description: "Credit added via demo purchase",
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/telco/add-subscriber-credit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ ...postData }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        toast.error(data?.error || "Error adding credit.");
        return;
      }
      
      toast.success("Credit added successfully!");
      totalCredit += amount;

      const totalEl = document.getElementById("totalCredit");
      const usedEl = document.getElementById("usedLimit");

      if (totalEl) totalEl.innerText = totalCredit.toFixed(2);
      if (usedEl) usedEl.innerText = usedLimit.toFixed(2);

      amountInput.value = "";
      const ready = document.getElementById("readySection");
      if (ready) ready.style.display = "block";
    } catch (err) {
      console.error("Error adding credit:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // -------------------------
  // Render UI
  // -------------------------
  return (
    <>
      <header id="mainNav">
        <nav>
          <div className="container">
            <a href="#" className="navLogo">
              <img src={`${baseUrl}/logo-dark-color.svg`} alt="logo" className="img-fluid" />
            </a>
            <button type="button" className="navbutton" aria-label="Open Navigation">
              <i className="fa-solid fa-bars"></i>
            </button>

            <div className="navCollapse">
              <button type="button" className="navClose" aria-label="Close Navigation">
                <i className="fa-solid fa-times"></i>
              </button>
              <ul className="navList">
                <li><Link href="/" className="navLink">Home</Link></li>
                <li><Link href="/about" className="navLink">About</Link></li>
                <li><Link href="/" className="navLink">Services</Link></li>
                <li><a href="#" className="navLink">Packages</a></li>
                <li><a href="#" className="navLink">FAQs</a></li>
                <li><button className="navLink mainBtn" onClick={(e) => { e.preventDefault(); setShowDemoModal(true); }}> Demo </button> </li>
                <li>
                  {!user ? (
                    <button type="button" onClick={() => { setStep("email"); setIsOpen(true); }} className="outlineBtn">Login</button>
                  ) : (
                    <span className="navLink">Welcome, {user.name}</span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      {isOpen && (
        <div className="modalBg">
          <div className="modalWrapper" ref={modalRef}>
            <h3 className="sectionHead">Login</h3>
            <p className="small">Login using OTP sent to your email.</p>

            {step === "email" ? (
              <>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button onClick={handleSendOtp} className="mainBtn" disabled={loading}>
                  {loading ? "Sending OTP..." : "Get OTP"}
                </button>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label text-dark">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button onClick={handleVerifyOtp} className="mainBtn" disabled={loading}>
                  {loading ? "Authenticating..." : "Login"}
                </button>
              </>
            )}

            <button onClick={() => setIsOpen(false)} className="close-btn" title="Close Modal">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
      )}
      {showDemoModal && (
        <div className="modalBg">
          <div className="modalWrapper">
            <h2>Buy SIM</h2>

            <button onClick={handleProceedToBuy}>Proceed to Buy SIM</button>

            <div id="creditSection" style={{ display: "none", marginTop: "20px" }}>
              <h3>Add Credit</h3>
              <label htmlFor="amount">Amount to Add:</label>
              <input type="number" id="amount" placeholder="Enter amount" min="1" />
              <button onClick={handleAddCredit}>Add</button>
            </div>

            <div id="readySection" style={{ display: "none", marginTop: "20px" }}>
              <h3>Status: Ready to Use</h3>
              <p>Total Credit Added: $<span id="totalCredit">0</span></p>
              <p>Used Limit: $<span id="usedLimit">0</span></p>
            </div>

            <button onClick={() => setShowDemoModal(false)} className="close-btn" title="Close">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
        </div>
      )}


    </>
  );
}
