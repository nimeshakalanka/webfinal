import React from "react";
import { Button } from "./Button";
import './Footer.scss';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join with us to recieve exclusive offers.
        </p>
        <div className="input-areas">
          <form>
            <input type="email" name="email" placeholder="Your Email" className="footer-input" />
            <Button children="Subscribe" buttonStyle="btn--outline" />
          </form>
        </div>
      </section>
      <section className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to='/about-us'>Our Crew</Link>
            <Link to='/'>Archivements</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Info</h2>
            <Link to='/'>Get Support</Link>
            <Link to='/'>Contact US</Link>
          </div>
          <div className="footer-link-items">
            <h2>Our Assets</h2>
            <Link to='/'>Submit Videos</Link>
            <Link to='/'>Ambassadors</Link>
          </div>
        </div>
      </section>
      <section className="social-media">
          <small className="website-rights">
            Group 03 &copy; 2024
          </small>
      </section>
    </div>
  );
}

export default Footer;
