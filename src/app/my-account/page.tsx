
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function MyAccount(){
        const [year, setYear] = useState<number | null>(null);
    
      useEffect(() => {
        setYear(new Date().getFullYear());
      }, []);

    return(
        <>
        <nav className="adminNav">
            <div className="container-fluid">
                <button type="button" title="navbtn" className="mainBtn navbtn second"><i className="fa-solid fa-bars"></i></button>
                <ul className="navList">
              <li>
                <Link href="/" className="link">Home</Link>
              </li>
              <li>
                <Link href="/about" className="link">About</Link>
              </li>
              <li>
                <Link href="/my-account" className="link">Services</Link>
              </li>
              <li>
                <a href="#" className="link">Packages</a>
              </li>
            </ul>
                <Link href="" className="mainBtn ms-auto">Sign Out</Link>
            </div>
        </nav>
        <aside className="adminSideNav">
                <a href="#" className="navLogo">
                    <img src="./logo-dark-color.svg" alt="logo" className="img-fluid" />
                </a>
                <ul>
                    <li className="active"><Link href="" ><i className="fa-solid fa-dashboard"></i><span>Dashboard</span></Link></li>
                    <li><Link href="" ><i className="fa-solid fa-tower-cell"></i><span>Coverage</span></Link></li>
                    <li><Link href="" ><i className="fa-solid fa-chart-simple"></i><span>Usage</span></Link></li>
                    <li><Link href="" ><i className="fa-solid fa-database"></i><span>Free</span> Data</Link></li>
                    <li><Link href="" ><i className="fa-solid fa-cog"></i><span>Settings</span></Link></li>
                </ul>
        </aside>
        <main className="adminMain">
            <div className="container-fluid">
                <h3 className="fw-bold text-dark">Dashboard</h3>
                
            </div>
        </main>
        <footer className="adminFooter">
            <div className="container">© {year ?? ""} SafariSim | All Rights Reserved</div>
        </footer>
        </>
    );
}