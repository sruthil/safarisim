"use client";
import { useEffect, useState } from "react";

export default function Footer() {
    const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
        <div className="topFooter">
            <div className="container">
                <div className="row">
                    <div className="logoSection col-lg-4">
                        <img src="./frontend/logo-dark-color.svg" alt="logo"/>
                        <p>Stay connected worldwide with our eSIM solutions. No roaming charges, just simple connectivity.</p>
                        <ul className="socialList">
                            <li><a title="facebook" href=""><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a title="twitter" href=""><i className="fa-brands fa-x-twitter"></i></a></li>
                            <li><a title="instagram" href=""><i className="fa-brands fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div className="otherSections col-lg-2 col-md-4 col-sm-6">
                        <h4>Company</h4>
                        <ul className="unList">
                            <li><a href="" className="link">About Us</a></li>
                            <li><a href="" className="link">Privacy Policy</a></li>
                            <li><a href="" className="link">Terms of Services</a></li>
                            <li><a href="" className="link">Refund Policy</a></li>
                        </ul>
                    </div>
                    <div className="otherSections col-lg-3 col-md-4 col-sm-6">
                        <h4>Popular Destinations</h4>
                        <ul className="unList">
                            <li><a href="" className="link">United States</a></li>
                            <li><a href="" className="link">Europe</a></li>
                            <li><a href="" className="link">Asia</a></li>
                            <li><a href="" className="link">Japan</a></li>
                        </ul>
                    </div>
                    <div className="otherSections col-lg-3 col-md-4">
                        <h4>Reach Us</h4>
                        <ul className="unList">
                            <li>
                                <a href="" className="link">
                                    <div className="icon"><i className="fa-solid fa-envelope"></i></div>
                                    support@esim-platform.com
                                </a>
                            </li>
                            <li>
                                <a href="" className="link">
                                    <div className="icon"><i className="fa-solid fa-phone"></i></div>
                                    +1 (555) 123-4567<br/>
                                    <small>For urgent activation issues only</small>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="copy">
            <div className="container">© {year ?? ""} SafariSim | All Rights Reserved</div>
        </div>
    </footer>
  )
}