import React  from "react";
export default function Navbar() {
    return (
    <header className="header">
        <img src="/logo.jpg" alt="" className="header--image"></img>
        <h2>ShortQR</h2>
        <h4 className="header--title">URL Shortener With QR Code</h4>
    </header>
    )
}